// Attempts to analyze where to flatten SASS and what elements might be safe to remove
import fs from 'fs'
import path from 'path'

const ROOT_DIR = './src/styles'
const OUT_FILE = 'analysis.json'

function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles
  const files = fs.readdirSync(dirPath)
  files.forEach(file => {
    const fullPath = path.join(dirPath, file)
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles)
    } else if (file.endsWith('.sass') || file.endsWith('.scss')) {
      arrayOfFiles.push(fullPath)
    }
  })
  return arrayOfFiles
}

function extractPlaceholders(content, file) {
  const placeholders = {}
  // SCSS style: %name { ... }
  const scssRegex = /%([\w-]+)\s*\{([\s\S]*?)\}/g
  let m
  while ((m = scssRegex.exec(content)) !== null) {
    const name = m[1]
    const body = m[2].trim()
    placeholders[name] = placeholders[name] || { definedIn: file, ruleBody: body, raw: m[0] }
  }

  // Indented SASS style: %name then indented block
  const lines = content.split(/\r?\n/)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const match = line.match(/^\s*%([\w-]+)\s*$/)
    if (match) {
      const name = match[1]
      let j = i + 1
      const bodyLines = []
      while (j < lines.length) {
        const l = lines[j]
        if (/^\s*$/.test(l)) { j++; continue }
        // stop when we hit a top-level selector or another placeholder or @rule
        // A top-level selector is a line that starts at column 0 (no leading whitespace)
        if (!/^\s+/.test(l)) break
        if (/^\s*%[\w-]+\s*$/.test(l)) break
        bodyLines.push(l)
        j++
      }
      const body = bodyLines.join('\n').trim()
      placeholders[name] = placeholders[name] || { definedIn: file, ruleBody: body, raw: `%${name}\n${body}` }
      i = j - 1
    }
  }

  return placeholders
}

function findExtendOccurrences(content, file) {
  const occurrences = []
  const extendRegex = /@extend\s+%([\w-]+)/g
  let m
  const lines = content.split(/\r?\n/)
  while ((m = extendRegex.exec(content)) !== null) {
    const name = m[1]
    const idx = m.index
    const before = content.slice(0, idx)
    const lineNumber = before.split(/\r?\n/).length
    // find nearest non-empty line above the extend for selector context
    let selector = null
    for (let i = lineNumber - 2; i >= 0; i--) {
      const l = lines[i].trim()
      if (!l) continue
      // Heuristic: selector lines often start with ., #, &, %, or a tag name or contain '{'
      if (l.includes('{') || /^[.#&%]/.test(l) || /^[a-zA-Z]/.test(l)) {
        selector = l.replace(/\s*{$/, '').trim()
        break
      }
    }
    occurrences.push({ placeholder: name, file, line: lineNumber, selector })
  }
  return occurrences
}

function normalizeProps(ruleBody) {
  const propRegex = /(^|\n)\s*([-\w]+)\s*:/g
  const props = []
  let m
  while ((m = propRegex.exec(ruleBody)) !== null) {
    props.push(m[2])
  }
  return props.sort()
}

function propSignature(ruleBody) {
  return normalizeProps(ruleBody).join('|')
}

function snippet(text, max = 300) {
  if (!text) return ''
  return text.length > max ? text.slice(0, max) + '…' : text
}

function analyze() {
  const allFiles = getAllFiles(ROOT_DIR)
  const placeholders = {}
  const extendsObject = []
  const fileContents = {}

  allFiles.forEach(f => {
    const content = fs.readFileSync(f, 'utf8')
    fileContents[f] = content
    const phs = extractPlaceholders(content, f)
    Object.keys(phs).forEach(k => {
      if (!placeholders[k]) placeholders[k] = phs[k]
      else {
        // record multiple definition locations
        placeholders[k].definedIn = Array.isArray(placeholders[k].definedIn)
          ? placeholders[k].definedIn.concat(f)
          : [placeholders[k].definedIn, f]
      }
    })
  })

  allFiles.forEach(f => {
    const content = fileContents[f]
    const occ = findExtendOccurrences(content, f)
    occ.forEach(o => extendsObject.push(o))
  })

  const analysis = {
    placeholders: {},
    unused: [],
    singleUse: [],
    multiUse: [],
    suggestions: [],
    extendsObject,
    filesScanned: allFiles,
    generatedAt: new Date().toISOString()
  }

  Object.keys(placeholders).forEach(name => {
    const def = placeholders[name]
    const used = extendsObject.filter(e => e.placeholder === name)
    const count = used.length
    const filesUsed = Array.from(new Set(used.map(u => u.file)))
    const signature = propSignature(def.ruleBody || '')
    const ruleLen = (def.ruleBody || '').length
    const snippetText = snippet(def.ruleBody || '', 400)

    const entry = {
      name,
      definedIn: def.definedIn,
      ruleBodySnippet: snippetText,
      ruleBodyLength: ruleLen,
      signature,
      count,
      filesUsed,
      extendsObject: used
    }

    let suggestedAction = 'review'
    let reason = 'needs manual review'

    if (count === 0) {
      suggestedAction = 'delete'
      reason = 'never extended'
    } else if (count === 1) {
      suggestedAction = 'inline'
      reason = 'single use candidate to flatten into parent selector'
    } else {
      // multi-use heuristics
      const propSets = []
      used.forEach(u => {
        const lines = fileContents[u.file].split(/\r?\n/)
        const ln = Math.max(0, u.line - 1)
        let j = ln + 1
        const localLines = []
        while (j < lines.length) {
          const l = lines[j]
          if (!/^\s/.test(l)) break
          localLines.push(l)
          j++
        }
        propSets.push(normalizeProps(localLines.join('\n')))
      })

      const allSignatures = propSets.map(ps => ps.join('|'))
      const uniqueSignatures = Array.from(new Set(allSignatures))
      if (uniqueSignatures.length === 1 && uniqueSignatures[0] !== '') {
        suggestedAction = 'mixin'
        reason = 'same property set used in multiple places consider converting to mixin with params'
      } else if (ruleLen < 80) {
        suggestedAction = 'inline'
        reason = 'small rule used in multiple places consider inlining if duplication cost is low'
      } else {
        suggestedAction = 'review'
        reason = 'multi-use keep as placeholder or convert to mixin depending on duplication and selector merging effects'
      }
    }

    entry.suggestedAction = suggestedAction
    entry.reason = reason

    analysis.placeholders[name] = entry
    if (suggestedAction === 'delete') analysis.unused.push(entry)
    else if (suggestedAction === 'inline') analysis.singleUse.push(entry)
    else analysis.multiUse.push(entry)
    if (suggestedAction === 'mixin') analysis.suggestions.push({ name, suggestedAction, reason })
  })

  fs.writeFileSync(OUT_FILE, JSON.stringify(analysis, null, 2))
  console.log(`Analysis written to ${OUT_FILE}`)
  return analysis
}

try {
  analyze()
} catch (err) {
  console.error('Error during analysis:', err)
  process.exit(1)
}
