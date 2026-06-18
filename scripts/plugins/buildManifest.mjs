import fs from "node:fs"

export default async function buildManifest(showcaseItems) {
  const manifest = Object.fromEntries(
    showcaseItems
      .map(item => [
        item.title || item.id,
        {
          id: item.id,
          weight: Number.parseInt(item.weight) || 99,
          tags: item.tech ? item.tech.split(",").map(t => t.trim()) : [],
          role: item.role || "",
          impact: item.impact || "",
          hasCaseStudy: item.hasCaseStudy
        }
      ])
      .sort(([, a], [, b]) => a.weight - b.weight)
  )

  fs.writeFileSync("./src/data/showcase.json", JSON.stringify(manifest, null, 2))
}
