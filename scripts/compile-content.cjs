const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const https = require('node:https');
const { parse } = require('marked'); // Build-time dependency only

const profileJson = require('../src/data/portfolio.json')


const DIRS = {
  showcase: { src: './content/showcase', dest: './public/showcase' },
  studies: { src: './content/case-studies', dest: './public/case-studies' }
};
const RELPATHS = {
  showcase: '/showcase',
  studies: '/case-studies'
}

const FILES = {
  about: { src: './content/about.md', dest: './src/data/about.json' },
  footer: { src: './content/footer.md', dest: './src/data/footer.json' }
};

const MANIFEST_PATH = './src/data/showcase.json';
const CACHE_FILE = './.build-cache.json';

// Initialize
let cache = fs.existsSync(CACHE_FILE) ? JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8')) : {};
Object.values(DIRS).forEach(d => !fs.existsSync(d.dest) && fs.mkdirSync(d.dest, { recursive: true }));

const getHash = (str) => crypto.createHash('md5').update(str).digest('hex');

function parseMarkdown_IKD(fileContent) {
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

function parseMarkdown(fileContent) {
  const regex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = fileContent.match(regex);
  if (!match) return { data: {}, content: fileContent };

  const data = {};
  let currentParent = null;

  match[1].split('\n').forEach(line => {
    if (!line.trim()) return;

    // 1. Detect Indentation (two spaces or a tab)
    const isIndented = line.startsWith('  ') || line.startsWith('\t');
    const colonIndex = line.indexOf(':');

    if (colonIndex !== -1) {
      const k = line.slice(0, colonIndex).trim().toLowerCase();
      const v = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, '');

      if (isIndented && currentParent) {
        // It's a child (e.g., a term inside the glossary)
        data[currentParent][k] = v;
      } else {
        // It's a top-level key
        if (v === "") {
          // If value is empty, treat as a new parent container
          data[k] = {};
          currentParent = k;
        } else {
          data[k] = v;
          currentParent = null; // Reset if the next line isn't indented
        }
      }
    }
  });

  return { data, content: match[2].trim() };
}

function enrichProjectContent(fullHtml, glossary) {
  // Add ?: inside the parentheses to make it a non-capturing group
  const splitMarker = /<h[1-6][^>]*>The Appendix\s*\(Plain English Glossary\)<\/h[1-6]>/i;

  const parts = fullHtml.split(splitMarker);

  if (parts.length < 2) {
    return tagGlossaryTerms(fullHtml, glossary);
  }

  const mainBody = parts[0];
  // Since we aren't capturing groups anymore, parts[1] is the actual content
  const appendixHeader = fullHtml.match(splitMarker)[0];
  const appendixContent = parts.slice(1).join('');

  const taggedBody = tagGlossaryTerms(mainBody, glossary);

  return `${taggedBody}\n${appendixHeader}\n${appendixContent}`;
}

function tagGlossaryTerms(html, glossary) {
  if (!glossary) return html;

  // Sort longest first so "Vector Database" doesn't get caught by "Vector"
  const terms = Object.keys(glossary).sort((a, b) => b.length - a.length);
  let enrichedHtml = html;

  terms.forEach(term => {
    // Regex: Match whole word, ignore if already inside a tag
    const regex = new RegExp(`\\b(${term})\\b(?![^<]*>)`, 'gi');

    // Wrap in a span with the definition in a data attribute
    enrichedHtml = enrichedHtml.replace(regex,
      `<span class="tooltip-trigger" data-tooltip="${glossary[term]}">$1</span>`
    );
  });

  return enrichedHtml;
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

    const enrichedHtml = enrichProjectContent(htmlContent, data.glossary);

    // 3. Write JSON with HTML content
    const hasStudy = fs.existsSync(path.join(DIRS.studies.src, `${id}.md`));
    const outputData = { ...data, content: enrichedHtml, hasCaseStudy: hasStudy, id };

    fs.writeFileSync(path.join(dest, `${id}.json`), JSON.stringify(outputData, null, 2));
    results.push(outputData);
  }
  return results;
}

async function processRepos() {
  for (const [id, project] of Object.entries(profileJson.labs)) {
    await processRepo(project.repo, project.branch);
  }
  console.log("done with processRepos")
return true
}

async function processRepo(repo, branch) {
  let content = await getProjectContentFromUrl(repo, branch)
  // 1. Process Mermaid blocks (Pre-HTML conversion)
  const matches = [...content.matchAll(/```mermaid([\s\S]*?)```/g)];
  for (const m of matches) {
    const code = m[1].trim();
    const dHash = getHash(code);
    const svgName = `${type}-${dHash.slice(0, 8)}.svg`;
    const svgPath = path.join('./public', svgName);
    if (cache[type + dHash] !== dHash || !fs.existsSync(svgPath)) {
      console.log(`[RENDER] ${type} diagram...`);
      await fetchDiagram(code, svgPath);
      cache[type + dHash] = dHash;
    }
    content = content.replace(m[0], `![Diagram](./${svgName})`);
  }
  // 2. Compile Markdown Content to HTML
  const htmlContent = parse(content);
  //const enrichedHtml = enrichProjectContent(htmlContent, data.glossary);
  // const OutputDadir = path.dirmame('./public/open-source', svgName)');
  const outputData = { content: htmlContent, id: repo };
  const dest = path.join('./public/open-source/', `${repo}.json`);
  fs.writeFileSync(dest, JSON.stringify(outputData, null, 2));
  console.log("done with repo: " + repo)
  return true
}


async function processIndividualFile(type) {
  const { src, dest } = FILES[type];

  if (!fs.existsSync(src)) {
    console.log(`⚠️  File not found: ${src}`);
    return null;
  }

  let { data, content } = parseMarkdown(fs.readFileSync(src, 'utf8'));

  // 1. Process Mermaid blocks (Pre-HTML conversion)
  const matches = [...content.matchAll(/```mermaid([\s\S]*?)```/g)];
  for (const m of matches) {
    const code = m[1].trim();
    const dHash = getHash(code);
    const svgName = `${type}-${dHash.slice(0, 8)}.svg`;
    const svgPath = path.join('./public', svgName);
    if (cache[type + dHash] !== dHash || !fs.existsSync(svgPath)) {
      console.log(`[RENDER] ${type} diagram...`);
      await fetchDiagram(code, svgPath);
      cache[type + dHash] = dHash;
    }
    content = content.replace(m[0], `![Diagram](./${svgName})`);
  }

  // 2. Compile Markdown Content to HTML
  const htmlContent = parse(content);
  const enrichedHtml = enrichProjectContent(htmlContent, data.glossary);

  // 3. Ensure dest directory exists
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // 4. Write JSON with HTML content
  const outputData = { ...data, content: enrichedHtml, id: type };
  fs.writeFileSync(dest, JSON.stringify(outputData, null, 2));
  console.log(`✅ Compiled: ${src} → ${dest}`);
  return outputData;
}



async function getProjectContentFromUrl(repo, branch, useLowercase = false) {
  const fileName = useLowercase ? "readme.md" : "README.md";
  const url = `https://raw.githubusercontent.com/liukonen/${repo}/refs/heads/${branch}/${fileName}`;

  console.log(`fetching: ${repo} (${fileName})`);

  return new Promise((resolve, reject) => {
    // 1. Disable the agent to prevent Keep-Alive hangs
    https.get(url, { agent: false }, (res) => {
      
      // 2. Handle 404 Fallback
      if (res.statusCode === 404 && !useLowercase) {
        res.resume(); // CRITICAL: Consume the 404 response to free the socket
        console.log(`404 on uppercase, retrying lowercase for: ${repo}`);
        return resolve(getProjectContentFromUrl(repo, branch, true));
      }

      // 3. Handle Errors
      if (res.statusCode < 200 || res.statusCode >= 300) {
        res.resume(); // CRITICAL: Consume the error response
        return reject(new Error(`Status Code: ${res.statusCode} from ${url}`));
      }

      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        let lines = data.split(/\r?\n/).map(line => line.trimEnd());

        // Strip initial H1 (Title)
        if (lines[0]?.startsWith('# ')) {
          lines.shift();
        }

        // Find "Context" section
        const contextIndex = lines.findIndex(line => /^#+\s*Context/i.test(line));

        const processedLines = contextIndex !== -1
          ? lines.slice(contextIndex)
          : lines;

        resolve(processedLines.join('\n').trim());
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}


async function run() {
  const showcaseItems = await processFiles('showcase');
  await processFiles('studies');
  await processIndividualFile('about');
  await processIndividualFile('footer');

  await processRepos()
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