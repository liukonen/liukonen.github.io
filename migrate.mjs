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
        sourceFile: sourceFile,
        newToken: newToken,
        destFile: destFile,
        folder: folder
      };
    }
  }
  return { mappings, fileTargets };
}

// 2. Pass 1 Safeguard Check
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
        if (content.includes(`className="${token}"`) || content.includes(`className={${token}}`)) {
          throw new Error(`SAFEGUARD BREACH: Token '${token}' already active in '${resPath}'. Run aborted.`);
        }
      }
    }
  }
}

// 3. Pass 2 Execution: Class attribute updates in TSX
async function updateTsxFiles(dir, mappings) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  const classNamePattern = /className="([^"]*)"/g;

  for (const file of files) {
    const resPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      if (IGNORE_DIRS.has(file.name)) continue;
      await updateTsxFiles(resPath, mappings);
    } else if (file.isFile() && /\.(tsx|ts|jsx|js)$/.test(file.name)) {
      const content = await fs.readFile(resPath, 'utf-8');
      let fileChanged = false;

      const newContent = content.replace(classNamePattern, (fullMatch, classString) => {
        const currentClasses = classString.trim().split(/\s+/);
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
          return `className="${flattenedString}"`;
        }

        return fullMatch;
      });

      if (fileChanged) {
        await fs.writeFile(resPath, newContent, 'utf-8');
        console.log(`  Safely transformed class tokens in: ${resPath}`);
      }
    }
  }
}

// 4. Extract, Clean Indentation, and Move SASS Blocks
async function moveSassBlocks(fileTargets) {
  console.log('Migrating physical SASS declaration blocks...');

  for (const [oldClass, target] of Object.entries(fileTargets)) {
    if (!target.sourceFile || !target.destFile) continue;

    const sourcePath = path.join(STYLES_DIR, target.sourceFile);
    const folderPath = path.join(STYLES_DIR, target.folder);
    const destPath = path.join(folderPath, target.destFile);

    if (!existsSync(sourcePath)) {
      console.warn(`  Warning: Source SASS file missing, skipping extraction: ${sourcePath}`);
      continue;
    }

    let sourceContent = await fs.readFile(sourcePath, 'utf-8');

    const escapedClass = oldClass.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const sassBlockPattern = new RegExp(`^[ \t]*\\.${escapedClass}\\b[^\\n]*\\n((?:[ \t]+[^\\n]*\\n|\\s*\\n)*)`, 'm');

    const match = sourceContent.match(sassBlockPattern);

    if (match) {
      const fullMatchedBlock = match[0];
      const blockBody = match[1];

      const bodyLines = blockBody.split('\n');
      const firstIndentedLine = bodyLines.find(l => l.trim().length > 0);
      let baseIndentLength = 0;
      
      if (firstIndentedLine) {
        const indentMatch = firstIndentedLine.match(/^([ \t]*)/);
        if (indentMatch) baseIndentLength = indentMatch[1].length;
      }

      const normalizedBodyLines = bodyLines.map(line => {
        if (!line.trim()) return ''; 
        const lineIndent = line.match(/^([ \t]*)/)[1].length;
        const relativeIndent = Math.max(0, lineIndent - baseIndentLength);
        return '  ' + ' '.repeat(relativeIndent) + line.trim();
      });

      const cleanedBody = normalizedBodyLines.join('\n');
      const restructuredSass = `.${target.newToken}\n${cleanedBody}\n`;

      await fs.mkdir(folderPath, { recursive: true });
      if (!existsSync(destPath)) {
        await fs.writeFile(destPath, "@use '../shared' as *\n\n", 'utf-8');
      }

      await fs.appendFile(destPath, restructuredSass, 'utf-8');
      console.log(`  Moved SASS properties for .${oldClass} -> .${target.newToken} inside: ${destPath}`);

      sourceContent = sourceContent.replace(fullMatchedBlock, `// Migrated .${oldClass} to ${target.folder}/${target.destFile}\n`);
      await fs.writeFile(sourcePath, sourceContent, 'utf-8');
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

    // Print proposed main.sass changes to terminal cleanly
    const uniqueFolders = new Set(Object.values(fileTargets).map(t => t.folder).filter(Boolean));
    if (uniqueFolders.size > 0) {
      console.log('\n======================================================');
      console.log('👉 ACTION REQUIRED: Add/Verify these imports in main.sass:');
      console.log('======================================================\n');
      uniqueFolders.forEach(folder => {
        console.log(`@use '${folder}/index' as *`);
      });
      console.log('\n======================================================\n');
    }

  } catch (error) {
    console.error('\nExecution Halted:', error.message);
    process.exit(1);
  }
})();