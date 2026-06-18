import fs from "node:fs"
import path from "node:path"
import https from "node:https"
import { parse } from "marked"

async function fetchReadme(repo, branch, lower = false) {
  const file = lower ? "readme.md" : "README.md"
  const url = `https://raw.githubusercontent.com/liukonen/${repo}/refs/heads/${branch}/${file}`

  return new Promise((resolve, reject) => {
    https.get(url, { agent: false }, res => {
      if (res.statusCode === 404 && !lower) {
        res.resume()
        return resolve(fetchReadme(repo, branch, true))
      }

      if (res.statusCode < 200 || res.statusCode >= 300) {
        res.resume()
        return reject(new Error(`Status ${res.statusCode}`))
      }

      let data = ""
      res.on("data", c => (data += c))
      res.on("end", () => resolve(data))
    }).on("error", reject)
  })
}

export default async function processRepos(profileJson) {
  const repos = Object.values(profileJson.labs)

  await Promise.all(
    repos.map(async ({ repo, branch }) => {
      let md = await fetchReadme(repo, branch)

      // Strip leading H1 (your original behavior)
      let lines = md.split(/\r?\n/).map(l => l.trimEnd())
      if (lines[0]?.startsWith("# ")) lines.shift()

      const html = parse(lines.join("\n"))

      const dest = path.join("./public/open-source", `${repo}.json`)
      fs.writeFileSync(dest, JSON.stringify({ id: repo, content: html }, null, 2))
    })
  )
}
