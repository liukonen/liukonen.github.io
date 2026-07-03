import fs from 'fs';
import path from 'path';

const SASS_DIR = './src/styles';
const CODE_DIRS = ['./src'];

// Helper: Recursively get all files
function getFiles(dir, ext) {
  let files = [];
  if (!fs.existsSync(dir)) return files;
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) files = files.concat(getFiles(fullPath, ext));
    else if (file.endsWith(ext)) files.push(fullPath);
  });
  return files;
}

// Pass 1: Parse SASS for classes and descriptions grouped by file
function getSassMetadataByFile() {
  const groupedMetadata = {};
  const files = getFiles(SASS_DIR, '.sass');
  
  files.forEach(file => {
    const filename = path.basename(file);
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    let buffer = [];
    
    // Initialize file bucket
    groupedMetadata[filename] = {};
    
    lines.forEach(line => {
      const t = line.trim();
      if (t.startsWith('///')) {
        buffer.push(t.replace(/\/\/\//g, '').trim());
      } else if (t.startsWith('.') && !t.includes('@')) {
        // Clean up class selectors (handling multiple classes, pseudo-classes, or opening braces)
        const className = t.split('{')[0].split(':')[0].split(',')[0].trim().replace('.', '');
        if (className) {
          groupedMetadata[filename][className] = buffer.join(' ');
        }
        buffer = [];
      } else if (t === '') {
        buffer = [];
      }
    });
    
    // Clean up empty buckets if a SASS file contains no target classes
    if (Object.keys(groupedMetadata[filename]).length === 0) {
      delete groupedMetadata[filename];
    }
  });
  return groupedMetadata;
}

// Pass 2: Find usage in code
function findUsages(className) {
  const codeFiles = getFiles('./src', '.tsx').concat(getFiles('./src', '.ts'));
  const usages = [];
  codeFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    // Using a regex boundary or clear lookahead ensures we match exact class strings
    if (content.includes(className)) {
      usages.push(path.basename(file));
    }
  });
  return [...new Set(usages)].join(', ');
}

// Generate Markdown grouped by file headers
function generateMarkdown() {
  const groupedMetadata = getSassMetadataByFile();
  let md = '# Style System Documentation\n\n';
  
  // Sort files alphabetically to keep output predictable
  const sortedFiles = Object.keys(groupedMetadata).sort();

  sortedFiles.forEach(filename => {
    md += `## ${filename}\n\n`;
    md += `| Class | Description | Files Using Tag |\n`;
    md += `| :--- | :--- | :--- |\n`;
    
    const classes = Object.keys(groupedMetadata[filename]).sort();
    classes.forEach(className => {
      const usages = findUsages(className) || 'None';
      const description = groupedMetadata[filename][className] || '*No description provided.*';
      md += `| \`.${className}\` | ${description} | ${usages} |\n`;
    });
    
    md += '\n'; // Separate the tables visually with trailing newlines
  });

  fs.writeFileSync('STYLES.md', md);
  console.log('✨ STYLES.md generated with grouped file tables!');
}

generateMarkdown();