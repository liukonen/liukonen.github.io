import fs from "node:fs"
import parseFrontmatter from "./parseFrontmatter.mjs"
import markdownToHtml from "./markdownToHtml.mjs"
import renderMermaid from "./renderMermaid.mjs"

export default async function processMarkdownFile({
  id,
  type,
  srcPath,
  destPath,
  dirs,
  relpaths,
  cache
}) {
  let { data, content } = parseFrontmatter(
    fs.readFileSync(srcPath, "utf8")
  )

  // Mermaid blocks
  const matches = [...content.matchAll(/```mermaid([\s\S]*?)```/g)]
  for (const m of matches) {
    const code = m[1].trim()

    const svgDir =
      type === "about" || type === "footer"
        ? "./public"
        : dirs[type].dest

    const { svgName } = await renderMermaid(code, id, svgDir, cache)

    const rel =
      type === "about" || type === "footer"
        ? `./${svgName}`
        : `.${relpaths[type]}/${svgName}`
    const imgHtml = `<img src="${rel}" alt="Architecture Diagram" style="cursor: zoom-in;" onclick="window.dispatchEvent(new CustomEvent('open-diagram', { detail: '${rel}' }))" />`;
    content = content.replace(m[0], imgHtml);
    //content = content.replace(m[0], `![Architecture Diagram](${rel})`)
  }

  const enrichedHtml = markdownToHtml(content, data.glossary)

  // Showcase-only flag
  const hasCaseStudy =
    type === "showcase" &&
    fs.readdirSync(dirs.studies.src)
      .map(f => f.toLowerCase())
      .includes(`${id.toLowerCase()}.md`)

  const output = {
    ...data,
    content: enrichedHtml,
    ...(type === "showcase" && { hasCaseStudy }),
    id
  }

  fs.writeFileSync(destPath, JSON.stringify(output, null, 2))
  return output
}
