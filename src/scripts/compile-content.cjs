const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');
const { parse } = require('marked'); // Build-time dependency only

const DIRS = {
  showcase: { src: './content/showcase', dest: './public/showcase' },
  studies: { src: './content/case-studies', dest: './public/case-studies' }
};
const RELPATHS = {
  showcase: '/showcase',
  studies: '/case-studies'
}

const MANIFEST_PATH = './src/data/showcase.json';
const CACHE_FILE = './.build-cache.json';

// Initialize
let cache = fs.existsSync(CACHE_FILE) ? JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8')) : {};
Object.values(DIRS).forEach(d => !fs.existsSync(d.dest) && fs.mkdirSync(d.dest, { recursive: true }));

const getHash = (str) => crypto.createHash('md5').update(str).digest('hex');

function parseMarkdown(fileContent) {
  const regex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = fileContent.match(regex);
  if (!match) return { data: {}, content: fileContent };
  const data = {};
  match[1].split('\n').forEach(line => {
    const [k, ...v] = line.split(':');
    if (k && v) {
      // Clean up values: trim, remove surrounding quotes or brackets
      data[k.trim().toLowerCase()] = v.join(':').trim().replace(/^["'\[]|["'\]]$/g, '');
    }
  });
  return { data, content: match[2] };
}

async function fetchDiagram(code, dest) {
  const payload = Buffer.from(JSON.stringify({ code, mermaid: { theme: 'dark' } })).toString('base64');
  return new Promise((resolve) => {
    https.get(`https://mermaid.ink/svg/${payload}`, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => { fs.writeFileSync(dest, Buffer.concat(chunks)); resolve(); });
    }).on('error', () => resolve());
  });
}

async function processFiles(type) {
  const { src, dest } = DIRS[type];
  const files = fs.readdirSync(src).filter(f => f.endsWith('.md'));
  const results = [];

  for (const file of files) {
    const id = file.replace('.md', '');
    let { data, content } = parseMarkdown(fs.readFileSync(path.join(src, file), 'utf8'));
    
    // 1. Process Mermaid blocks (Pre-HTML conversion)
    const matches = [...content.matchAll(/```mermaid([\s\S]*?)```/g)];
    for (const m of matches) {
      const code = m[1].trim();
      const dHash = getHash(code);
      const svgName = `${id}-${dHash.slice(0, 8)}.svg`;
      const svgPath = path.join(dest, svgName);
      console.log(type)
      if (cache[id + dHash] !== dHash || !fs.existsSync(svgPath)) {
        console.log(`[RENDER] ${type}/${id} diagram...`);
        await fetchDiagram(code, svgPath);
        cache[id + dHash] = dHash;
      }
      content = content.replace(m[0], `![Architecture Diagram](./${RELPATHS[type]}/${svgName})`);
      //content = content.replace(m[0], `![Architecture Diagram]/${type}/${svgName})`);
    }

    // 2. THE FIX: Compile Markdown Content to HTML
    const htmlContent = parse(content);

    // 3. Write JSON with HTML content
    const hasStudy = fs.existsSync(path.join(DIRS.studies.src, `${id}.md`));
    const outputData = { ...data, content: htmlContent, hasCaseStudy: hasStudy, id };
    
    fs.writeFileSync(path.join(dest, `${id}.json`), JSON.stringify(outputData, null, 2));
    results.push(outputData);
  }
  return results;
}

async function run() {
  const showcaseItems = await processFiles('showcase');
  await processFiles('studies');

  // Build Manifest
  const manifest = {};
  showcaseItems.forEach(item => {
    manifest[item.title || item.id] = {
      id: item.id,
      weight: parseInt(item.weight) || 99,
      tags: item.tech ? item.tech.split(',').map(t => t.trim()) : [],
      role: item.role || "",
      impact: item.impact || "",
      hasCaseStudy: item.hasCaseStudy
    };
  });

  const sorted = Object.fromEntries(Object.entries(manifest).sort(([, a], [, b]) => a.weight - b.weight));
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(sorted, null, 2));
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
  console.log('✅ Compiled: Public assets contain ready-to-use HTML.');
}

run();