
// Attempts to generate a vector map for AI to read the full SASS layout
import fs from 'fs'
import path from 'path'

const ROOT_DIR = './src/styles'

// Helper to find all .sass files recursively
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath)
  files.forEach(file => {
    const fullPath = path.join(dirPath, file)
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles)
    } else if (file.endsWith('.sass')) {
      arrayOfFiles.push(fullPath)
    }
  })
  return arrayOfFiles
}

function generateTrueMap() {
  const allFiles = getAllFiles(ROOT_DIR)
  const map = {}

  allFiles.forEach(f => {
    const content = fs.readFileSync(f, 'utf8')
    const fileName = path.basename(f)
    // Find all @extend %patterns
    const matches = [...content.matchAll(/@extend\s+%([\w-]+)/g)]
    map[fileName] = matches.map(m => m[1])
  })
  
  fs.writeFileSync('true_map_for_ai.json', JSON.stringify(map, null, 2))
  console.log('Success! Map generated: true_map_for_ai.json')
}

generateTrueMap()