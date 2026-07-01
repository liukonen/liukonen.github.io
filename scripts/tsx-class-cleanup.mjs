import fs from 'fs';
import { globSync } from 'glob';
import path from 'path';

// 1. Point to your source files (ignoring public directory explicitly)
const TSX_FILES = 'src/**/*.tsx'; 
const SASS_FILES = 'src/**/*.sass';

function getUsedClassNamesAndLocations() {
  const files = globSync(TSX_FILES);
  const classRegex = /(?:class|className)=(?:["']([^"']+)["']|\{\s*["']([^"']+)["']\s*\})/g;
  
  const foundClasses = new Set();
  const classToFileMap = new Map(); // Tracks which files use which class

  files.forEach(file => {
    // Skip any files that happen to sit inside a public directory
    if (file.split(path.sep).includes('public')) return;

    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = classRegex.exec(content)) !== null) {
      const classString = match[1] || match[2];
      if (classString) {
        classString.split(/\s+/).forEach(cls => {
          const cleanClass = cls.trim();
          
          // Skip dynamic module variables or interpolation indicators
          if (cleanClass && !cleanClass.includes('$') && !cleanClass.includes('{') && !cleanClass.includes('.')) {
            foundClasses.add(cleanClass);
            
            // Map the class to the file path
            if (!classToFileMap.has(cleanClass)) {
              classToFileMap.set(cleanClass, new Set());
            }
            classToFileMap.get(cleanClass).add(file);
          }
        });
      }
    }
  });
  return { foundClasses, classToFileMap };
}

function getDefinedSassClasses() {
  const files = globSync(SASS_FILES);
  const definedClasses = new Set();
  const sassClassRegex = /\.([a-zA-Z0-9_-]+)/g;

  files.forEach(file => {
    if (file.split(path.sep).includes('public')) return;

    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = sassClassRegex.exec(content)) !== null) {
      definedClasses.add(match[1]);
    }
  });
  return definedClasses;
}

function audit() {
  console.log('--- Auditing Source Files (.tsx ↔ .sass) [Excluding public/] ---');
  
  const { foundClasses, classToFileMap } = getUsedClassNamesAndLocations();
  const sassClasses = getDefinedSassClasses();
  
  const ghostClasses = [];
  const filesToChange = new Set();

  foundClasses.forEach(cls => {
    if (!sassClasses.has(cls)) {
      ghostClasses.push(cls);
      // Track files associated with this ghost class
      const files = classToFileMap.get(cls);
      if (files) {
        files.forEach(file => filesToChange.add(file));
      }
    }
  });

  console.log(`\nFound ${foundClasses.size} unique classes across your TSX components.`);
  console.log(`Found ${sassClasses.size} unique class rules written across your SASS stylesheets.`);
  console.log('------------------------------------------------------------');

  if (ghostClasses.length === 0) {
    console.log('✅ Clean slate! No unstyled classes found.');
  } else {
    console.log(`❌ Found ${ghostClasses.length} Ghost Classes missing from SASS.`);
    
    console.log('\n📁 Files containing classes that need changes:');
    Array.from(filesToChange).sort().forEach(file => {
      console.log(`  • ${file}`);
      
      // Sub-list the exact bad classes inside this file
      ghostClasses.forEach(cls => {
        if (classToFileMap.get(cls)?.has(file)) {
          console.log(`      └─ Missing class: "${cls}"`);
        }
      });
    });
  }
}

audit();