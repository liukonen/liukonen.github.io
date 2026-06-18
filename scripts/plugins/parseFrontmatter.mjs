export default function parseFrontmatter(fileContent) {
    const regex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
    const match = fileContent.match(regex)
    if (!match) return { data: {}, content: fileContent }

    const data = {}
    let currentParent = null

    match[1].split("\n").forEach((line) => {
        if (!line.trim()) return

        const isIndented = line.startsWith("  ") || line.startsWith("\t")
        const colonIndex = line.indexOf(":")
        if (colonIndex === -1) return

        const k = line.slice(0, colonIndex).trim().toLowerCase()
        const v = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, "")

        if (isIndented && currentParent) {
            data[currentParent][k] = v
        } else if (v === "") {
            data[k] = {}
            currentParent = k
        } else {
            data[k] = v
            currentParent = null
        }
    })
    return { data, content: match[2].trim() }
}
