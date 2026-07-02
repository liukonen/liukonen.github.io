import fs from 'fs';
import path from 'path';

const SASS_DIR = './src/styles';
const CODE_DIRS = ['./src'];

// Helper: Recursively get all files
function getFiles(dir, ext) {
  let files = [];
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) files = files.concat(getFiles(fullPath, ext));
    else if (file.endsWith(ext)) files.push(fullPath);
  });
  return files;
}

// Pass 1: Parse SASS for classes and descriptions
function getSassMetadata() {
  const metadata = {};
  const files = getFiles(SASS_DIR, '.sass');
  
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    let buffer = [];
    
    lines.forEach(line => {
      const t = line.trim();
      if (t.startsWith('///')) buffer.push(t.replace(/\/\/\//g, '').trim());
      else if (t.startsWith('.') && !t.includes('@')) {
        const className = t.split('{')[0].trim().replace('.', '');
        metadata[className] = { desc: buffer.join(' '), file: path.basename(file) };
        buffer = [];
      } else if (t === '') buffer = [];
    });
  });
  return metadata;
}

// Pass 2: Find usage in code
function findUsages(className) {
  const codeFiles = getFiles('./src', '.tsx').concat(getFiles('./src', '.ts'));
  const usages = [];
  codeFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes(className)) usages.push(path.basename(file));
  });
  return [...new Set(usages)].join(', ');
}

// Generate Markdown
function generateMarkdown() {
  const metadata = getSassMetadata();
  let md = '# Style System Documentation\n\n| Class | Description | Files Using Tag |\n| :--- | :--- | :--- |\n';
  
  Object.keys(metadata).forEach(className => {
    const usages = findUsages(className) || 'None';
    md += `| \`.${className}\` | ${metadata[className].desc} | ${usages} |\n`;
  });

  fs.writeFileSync('STYLES.md', md);
  console.log('✨ STYLES.md generated with usage tracking!');
}

generateMarkdown();