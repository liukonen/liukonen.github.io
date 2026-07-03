/// GENERATES A bloat.json file trying to identify bloat styles

import fs from 'fs'
import path from 'path'
const ROOT_DIR = './src/styles'
const data = {
    placeholders: {}, // %name: { file: '', extendedBy: [] }
    hardcodedBloat: [], // List of instances where a value is duplicated across files
    dependencyMap: {}  // File-to-file relationships
}
function scan(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file)
        if (fs.statSync(fullPath).isDirectory()) scan(fullPath)
        else if (file.endsWith('.sass')) processFile(fullPath)
    })
}
function processFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8')

    // 1. Map Placeholders
    const phRegex = /^%([\w-]+)/gm
    let match
    while ((match = phRegex.exec(content)) !== null) {
        data.placeholders[match[1]] = { file: filePath, extendedBy: [] }
    }
    // 2. Identify Potential Bloat (Hardcoded values that appear in > 1 file)
    // This looks for common patterns that should be %placeholders
    const potentialBloat = ['padding: 18px', 'border-radius: 4px', 'margin-bottom: 3rem']
    potentialBloat.forEach(val => {
        if (content.includes(val)) {
            data.hardcodedBloat.push({ file: filePath, val })
        }
    })
}
scan(ROOT_DIR)
fs.writeFileSync('bloat.json', JSON.stringify(data, null, 2))
console.log('Analysis complete: bloat.json generated.')