import fs from "node:fs"
import https from "node:https"
import { getHash } from "./utils.mjs"

export default async function renderMermaid(code, id, destDir, cache) {
  const dHash = getHash(code)
  const svgName = `${id}-${dHash.slice(0, 8)}.svg`
  const svgPath = `${destDir}/${svgName}`

  // If cached, return early with metadata
  if (cache[id + dHash] === dHash && fs.existsSync(svgPath)) {
    return {
      svgName,
      svgPath,
      rendered: false,
      cached: true
    }
  }

  const payload = Buffer.from(
    JSON.stringify({ code, mermaid: { theme: "dark" } })
  ).toString("base64")

  await new Promise((resolve) => {
    https
      .get(`https://mermaid.ink/svg/${payload}`, (res) => {
        const chunks = []
        res.on("data", (c) => chunks.push(c))
        res.on("end", () => {
          fs.writeFileSync(svgPath, Buffer.concat(chunks))
          resolve()
        })
      })
      .on("error", () => resolve())
  })

  cache[id + dHash] = dHash

  return {
    svgName,
    svgPath,
    rendered: true,
    cached: false
  }
}
