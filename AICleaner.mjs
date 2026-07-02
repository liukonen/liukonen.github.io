import fs from 'fs/promises';
import path from 'path';

const STYLES_DIR = './src/styles';
const OUTPUT_FILE = './sass_density_map.json';

// Global Token Dictionary to shrink strings down to short IDs
const dict = [];
function t(str) {
  let idx = dict.indexOf(str);
  if (idx === -1) {
    idx = dict.push(str) - 1;
  }
  return idx;
}

async function scanDir(dir) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  const nodes = [];

  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    const relPath = path.relative(STYLES_DIR, fullPath).replace(/\\/g, '/');

    if (file.isDirectory()) {
      nodes.push(...(await scanDir(fullPath)));
    } else if (file.isFile() && /\.(sass|scss)$/.test(file.name)) {
      const content = await fs.readFile(fullPath, 'utf-8');
      
      const selectors = [];
      // Tokenize selectors, extends, uses, and forwards
      const lines = content.split(/\r?\n/);
      let currentSelector = null;

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        // Detect high-level routing or dependency declarations
        if (trimmed.startsWith('@use ') || trimmed.startsWith('@forward ')) {
          selectors.push([t(trimmed)]); 
          continue;
        }

        // Detect a class selector or placeholder rule
        if (trimmed.startsWith('.') || trimmed.startsWith('%')) {
          currentSelector = trimmed.split(/\s+/)[0]; // get base token
          selectors.push([t(currentSelector)]);
          continue;
        }

        // Detect internal dependencies inside the current block
        if (trimmed.startsWith('@extend ') && currentSelector) {
          const target = trimmed.replace('@extend ', '').trim();
          // Find the last added selector array and push the dependency token ID
          selectors[selectors.length - 1].push(t(`ext:${target}`));
        }
      }

      // Format: [FileNameID, [[SelectorID, DepID, DepID], [Selector2ID]]]
      nodes.push([t(relPath), selectors]);
    }
  }
  return nodes;
}

(async () => {
  try {
    console.log('Encoding SASS graph into ultra-dense payload...');
    const graph = await scanDir(STYLES_DIR);
    
    // The ultimate payload: [Dictionary Array, Graph Matrix Array]
    const packedPayload = [dict, graph];
    
    // Stringify with zero indentation/whitespace
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(packedPayload), 'utf-8');
    
    const stats = await fs.stat(OUTPUT_FILE);
    console.log(`Success! File optimized down to ${(stats.size / 1024).toFixed(2)} KB.`);
    console.log(`Provide the contents of '${OUTPUT_FILE}' when ready for deduplication.`);
  } catch (err) {
    console.error('Extraction failed:', err.message);
  }
})();