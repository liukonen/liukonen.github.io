import fs from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

// CONFIGURATION
const SRC_DIR = './src';
const STYLES_DIR = './src/styles';
const CSV_FILE = 'migration_map.csv';
const IGNORE_DIRS = new Set(['public', 'node_modules', '.git']);

// 1. Robust CSV Parser
async function loadMigrationMap() {
  const mappings = {};
  const fileTargets = {};
  
  const content = await fs.readFile(CSV_FILE, 'utf-8');
  const lines = content.split(/\r?\n/);
  
  const headers = lines[0].split(',');
  const oldClassIdx = headers.indexOf('old_class');
  const sourceFileIdx = headers.indexOf('source_file');
  const newTokenIdx = headers.indexOf('new_token');
  const destFileIdx = headers.indexOf('dest_file');
  const folderIdx = headers.indexOf('group_folder');

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const row = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    
    const oldClass = row[oldClassIdx]?.trim().replace(/^["']|["']$/g, '');
    const sourceFile = row[sourceFileIdx]?.trim().replace(/^["']|["']$/g, '');
    const newToken = row[newTokenIdx]?.trim().replace(/^["']|["']$/g, '');
    const destFile = row[destFileIdx]?.trim().replace(/^["']|["']$/g, '');
    const folder = row[folderIdx]?.trim().replace(/^["']|["']$/g, '');
    
    if (oldClass && newToken) {
      mappings[oldClass] = newToken;
      fileTargets[oldClass] = {
        sourceFile, newToken, destFile, folder
      };
    }
  }
  return { mappings, fileTargets };
}

// 2. Pass 1: Global Safeguard Word-Boundary Check
async function verifySafeguards(dir, newTokens) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  const tokenSet = new Set();
  for (const tokenStr of newTokens) {
    tokenStr.split(/\s+/).forEach(t => tokenSet.add(t));
  }

  for (const file of files) {
    const resPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      if (IGNORE_DIRS.has(file.name)) continue;
      await verifySafeguards(resPath, newTokens);
    } else if (file.isFile() && /\.(tsx|ts|jsx|js)$/.test(file.name)) {
      const content = await fs.readFile(resPath, 'utf-8');
      for (const token of tokenSet) {
        if (!token) continue;
        const tokenRegex = new RegExp(`(?<![\\w-])${token}(?![\\w-])`);
        if (tokenRegex.test(content)) {
          throw new Error(`SAFEGUARD BREACH: Token '${token}' already active in '${resPath}'. Run aborted to prevent string pollution.`);
        }
      }
    }
  }
}

// 3. Pass 2: Omnivorous Attribute Replacer (class=, className=, quotes, literals)
async function updateTsxFiles(dir, mappings) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  
  // Group 1: captures "class" or "className"
  // Group 2/3: captures quotes and content depending on the syntax pattern
  const classPatterns = [
    /\b(class|className)=(["'])(.*?)\2/g,         // class="a b", className='a b'
    /\b(class|className)=\{`([^`]*)`\}/g,         // className={`a b`}
    /\b(class|className)=\{(["'])(.*?)\2\}/g      // className={"a b"}
  ];

  for (const file of files) {
    const resPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      if (IGNORE_DIRS.has(file.name)) continue;
      await updateTsxFiles(resPath, mappings);
    } else if (file.isFile() && /\.(tsx|ts|jsx|js)$/.test(file.name)) {
      const content = await fs.readFile(resPath, 'utf-8');
      let newContent = content;
      let fileChanged = false;

      const replaceLogic = (fullMatch, attrName, p2, p3) => {
        let classString;
        
        // Differentiate between template literal matches and standard quote matches
        if (fullMatch.includes('`')) {
          classString = p2;
        } else {
          classString = p3;
        }

        if (classString === undefined) return fullMatch;

        const currentClasses = classString.split(/\s+/);
        let lineChanged = false;
        
        const updatedClasses = currentClasses.map(className => {
          if (mappings[className]) {
            lineChanged = true;
            fileChanged = true;
            return mappings[className]; 
          }
          return className;
        });

        if (lineChanged) {
          const flattenedString = updatedClasses.join(' ').replace(/\s+/g, ' ').trim();
          
          // Reconstruct exact original wrapper using dynamic attribute name
          if (fullMatch.startsWith(`${attrName}={\``)) return `${attrName}={\`${flattenedString}\`}`;
          if (fullMatch.startsWith(`${attrName}=\{"`)) return `${attrName}=\{"${flattenedString}"\}`;
          if (fullMatch.startsWith(`${attrName}=\{'`)) return `${attrName}=\{'${flattenedString}'\}`;
          if (fullMatch.startsWith(`${attrName}="`)) return `${attrName}="${flattenedString}"`;
          if (fullMatch.startsWith(`${attrName}='`)) return `${attrName}='${flattenedString}'`;
        }
        return fullMatch;
      };

      classPatterns.forEach(pattern => {
        newContent = newContent.replace(pattern, replaceLogic);
      });

      if (fileChanged) {
        await fs.writeFile(resPath, newContent, 'utf-8');
        console.log(`  Safely transformed class tokens in: ${resPath}`);
      }
    }
  }
}

// 4. Pass 3: Multi-Block SASS Extractor
async function moveSassBlocks(fileTargets) {
  console.log('Migrating physical SASS declaration blocks...');

  for (const [oldClass, target] of Object.entries(fileTargets)) {
    if (!target.sourceFile || !target.destFile) continue;

    const sourcePath = path.join(STYLES_DIR, target.sourceFile);
    const folderPath = path.join(STYLES_DIR, target.folder);
    const destPath = path.join(folderPath, target.destFile);

    if (!existsSync(sourcePath)) {
      console.warn(`  Warning: Source SASS file missing: ${sourcePath}`);
      continue;
    }

    let sourceContent = await fs.readFile(sourcePath, 'utf-8');
    let lines = sourceContent.split(/\r?\n/);
    const targetSelector = `.${oldClass}`;
    
    let blockFound = true;
    let occurrencesProcessed = 0;

    while (blockFound) {
      blockFound = false;
      let targetLineIdx = -1;
      let baseIndent = 0;

      for (let i = 0; i < lines.length; i++) {
        const trimmed = lines[i].trim();
        if (trimmed === targetSelector || trimmed.startsWith(`${targetSelector} `) || trimmed.startsWith(`${targetSelector}:`)) {
          targetLineIdx = i;
          const matchIndent = lines[i].match(/^([ \t]*)/);
          baseIndent = matchIndent ? matchIndent[1].length : 0;
          blockFound = true;
          break; 
        }
      }

      if (targetLineIdx !== -1) {
        const collectedLines = [];
        let nextLineIdx = targetLineIdx + 1;

        while (nextLineIdx < lines.length) {
          const currentLine = lines[nextLineIdx];
          
          if (!currentLine.trim()) {
            collectedLines.push(currentLine);
            nextLineIdx++;
            continue;
          }

          const currentIndent = currentLine.match(/^([ \t]*)/)[0].length;
          if (currentIndent > baseIndent) {
            collectedLines.push(currentLine);
            nextLineIdx++;
          } else {
            break;
          }
        }

        const blockBody = collectedLines.join('\n');
        const bodyLines = blockBody.split('\n');
        const firstRealLine = bodyLines.find(l => l.trim().length > 0);
        let childBaseIndentLength = 0;
        
        if (firstRealLine) {
          childBaseIndentLength = firstRealLine.match(/^([ \t]*)/)[0].length;
        }

        const normalizedBodyLines = bodyLines.map(line => {
          if (!line.trim()) return '';
          const lineIndent = line.match(/^([ \t]*)/)[0].length;
          const relativeIndent = Math.max(0, lineIndent - childBaseIndentLength);
          return '  ' + ' '.repeat(relativeIndent) + line.trim();
        });

        const cleanedBody = normalizedBodyLines.join('\n');
        const restructuredSass = `.${target.newToken}\n${cleanedBody}\n\n`;

        await fs.mkdir(folderPath, { recursive: true });
        if (!existsSync(destPath)) {
          await fs.writeFile(destPath, "@use '../shared' as *\n\n", 'utf-8');
        }

        await fs.appendFile(destPath, restructuredSass, 'utf-8');
        occurrencesProcessed++;

        const deleteCount = nextLineIdx - targetLineIdx;
        lines.splice(targetLineIdx, deleteCount, `// Migrated .${oldClass} to ${target.folder}/${target.destFile}`);
      }
    }

    if (occurrencesProcessed > 0) {
      console.log(`  Moved ${occurrencesProcessed} SASS block(s) for .${oldClass} -> .${target.newToken} inside: ${destPath}`);
      await fs.writeFile(sourcePath, lines.join('\n'), 'utf-8');
    } else {
      console.warn(`  Warning: Could not locate class rule .${oldClass} inside ${target.sourceFile}`);
    }
  }
}

// 5. Scaffolding Folders & Index Forwarding
async function provisionSassArchitecture(fileTargets) {
  console.log('Verifying SASS directory scaffolding and index routing...');
  for (const target of Object.values(fileTargets)) {
    if (!target.folder || !target.destFile) continue;
    
    const folderPath = path.join(STYLES_DIR, target.folder);
    const indexPath = path.join(folderPath, '_index.sass');
    
    await fs.mkdir(folderPath, { recursive: true });
    
    const moduleName = target.destFile.replace(/^_+/, '').replace('.sass', '');
    const forwardStatement = `@forward '${moduleName}'\n`;
    
    let indexContent = '';
    if (existsSync(indexPath)) {
      indexContent = await fs.readFile(indexPath, 'utf-8');
    }
    
    if (!indexContent.includes(forwardStatement)) {
      await fs.appendFile(indexPath, forwardStatement, 'utf-8');
      console.log(`  Forwarded '${moduleName}' in: ${indexPath}`);
    }
  }
}

// Master Orchestrator
(async () => {
  if (!existsSync(CSV_FILE)) {
    console.error(`Error: Could not find ${CSV_FILE} in your current working directory.`);
    process.exit(1);
  }

  try {
    const { mappings, fileTargets } = await loadMigrationMap();
    
    console.log('Running safeguard integrity validations...');
    await verifySafeguards(SRC_DIR, Object.values(mappings));
    console.log('  All clear. No selector collisions detected.');

    console.log('Scanning TSX components for class renames...');
    await updateTsxFiles(SRC_DIR, mappings);
    
    await moveSassBlocks(fileTargets);
    await provisionSassArchitecture(fileTargets);
    
    console.log('\nMigration engine execution complete.');

  } catch (error) {
    console.error('\nExecution Halted:', error.message);
    process.exit(1);
  }
})();