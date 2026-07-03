import fs from 'fs';
import path from 'path';
import glob from 'fast-glob';

const SASS_DIR = './src/styles';
const CODE_GLOBS = ['./src/**/*.tsx', './src/**/*.ts'];

/**
 * Parses a single .sass file line-by-line using a clean state machine.
 * Isolates documentation comments and handles indentation nesting paths cleanly.
 */
function parseSassFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  
  const fileMetadata = {};
  let commentBuffer = [];
  let selectorStack = [];
  let lastLineWasComment = false;

  lines.forEach(line => {
    const trimmed = line.trim();
    const leadingSpaces = line.search(/\S/);

    // Spacer boundary rule: clear comment buffer on empty line spaces
    if (leadingSpaces === -1) {
      commentBuffer = [];
      lastLineWasComment = false;
      return;
    }

    // Capture doc tags
    if (trimmed.startsWith('///')) {
      const cleanComment = trimmed.replace(/^\/\/\/\s*/, '').trim();
      if (!cleanComment.startsWith('=====')) {
        if (!lastLineWasComment) {
          commentBuffer = [];
        }
        commentBuffer.push(cleanComment);
        lastLineWasComment = true;
      }
      return;
    }

    // Match targets
    if (trimmed.startsWith('.') || trimmed.startsWith('&')) {
      let rawSelector = trimmed.split('{')[0].split(':')[0].split(',')[0].trim();
      
      if (rawSelector.startsWith('.') || (rawSelector.startsWith('&') && selectorStack.length > 0)) {
        while (selectorStack.length > 0 && leadingSpaces <= selectorStack[selectorStack.length - 1].indent) {
          selectorStack.pop();
        }

        const parent = selectorStack[selectorStack.length - 1];
        const fullSelector = parent
          ? (rawSelector.startsWith('&') ? parent.selector + rawSelector.slice(1) : `${parent.selector} ${rawSelector}`)
          : rawSelector;

        selectorStack.push({ indent: leadingSpaces, selector: fullSelector });

        if (fullSelector.includes('.')) {
          if (commentBuffer.length > 0 && lastLineWasComment) {
            fileMetadata[fullSelector] = commentBuffer.join(' ');
            commentBuffer = [];
          } else if (!fileMetadata[fullSelector]) {
            fileMetadata[fullSelector] = '*No description provided.*';
          }
        }

        lastLineWasComment = false;
        return;
      }
    }

    // Fallback Property Anchor
    if (trimmed.includes(':')) {
      lastLineWasComment = false;
    }
  });

  return fileMetadata;
}

/**
 * Scans all component files exactly once to build a fast memory-cached usage map.
 * Returns an object where keys are clean classNames and values are Sets of file basenames.
 */
async function buildUsageMap() {
  const codeFiles = await glob(CODE_GLOBS);
  const usageMap = {};

  for (const file of codeFiles) {
    const content = await fs.promises.readFile(file, 'utf8');
    const filename = path.basename(file);

    // Match alphanumeric words, hyphens, and underscores used inside class names
    const words = content.match(/[a-zA-Z0-9_-]+/g) || [];
    const uniqueWords = new Set(words);

    uniqueWords.forEach(word => {
      if (!usageMap[word]) {
        usageMap[word] = new Set();
      }
      usageMap[word].add(filename);
    });
  }
  return usageMap;
}

/**
 * Resolves component file listings using the memory-cached map buffer.
 * Gracefully isolates compound selector chains down to individual class chunks.
 */
function getUsagesFromMap(selector, usageMap) {
  // Extract all standalone classes from the selector string (e.g., ".art-card .date" -> ["art-card", "date"])
  const targetedClasses = selector.match(/\.[a-zA-Z0-9_-]+/g)?.map(c => c.slice(1)) || [];
  if (targetedClasses.length === 0) return 'None';

  // For compound paths, locate the component files that contain ALL target class handles
  let intersectingFiles = null;

  for (const className of targetedClasses) {
    const filesWithClass = usageMap[className] || new Set();
    
    if (intersectingFiles === null) {
      intersectingFiles = new Set(filesWithClass);
    } else {
      // Retain only files that contain the subsequent classes in the selector chain
      intersectingFiles = new Set([...intersectingFiles].filter(f => filesWithClass.has(f)));
    }

    if (intersectingFiles.size === 0) break;
  }

  return (intersectingFiles && intersectingFiles.size > 0)
    ? Array.from(intersectingFiles).sort().join(', ')
    : 'None';
}

/**
 * Main orchestration pipeline.
 */
async function generateMarkdown() {
  console.log('🔍 Building codebase component map cache...');
  const usageMap = await buildUsageMap();

  console.log('🎨 Scanning system stylesheets...');
  const sassFiles = await glob(`${SASS_DIR}/**/*.sass`);
  let md = '# Style System Documentation\n\n';

  sassFiles.sort();

  for (const filePath of sassFiles) {
    const filename = path.basename(filePath);
    const fileMetadata = parseSassFile(filePath);

    if (Object.keys(fileMetadata).length === 0) continue;

    md += `## ${filename}\n\n`;
    md += `| Class Path | Description | Files Using Tag |\n`;
    md += `| :--- | :--- | :--- |\n`;

    const sortedSelectors = Object.keys(fileMetadata).sort();
    for (const selector of sortedSelectors) {
      const usages = getUsagesFromMap(selector, usageMap);
      const description = fileMetadata[selector];
      md += `| \`${selector}\` | ${description} | ${usages} |\n`;
    }

    md += '\n';
  }

  await fs.promises.writeFile('STYLES.md', md);
  console.log('✨ STYLES.md built cleanly and instantly via memory caches!');
}

generateMarkdown().catch(console.error);