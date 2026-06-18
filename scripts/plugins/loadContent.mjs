import fs from "node:fs"
import path from "node:path"
import processMarkdownFile from "./processMarkdownFile.mjs"
import { ensureDir } from "./utils.mjs"

const DIRS = {
  showcase: { src: "./content/showcase", dest: "./public/showcase" },
  studies: { src: "./content/case-studies", dest: "./public/case-studies" }
}

const RELPATHS = {
  showcase: "/showcase",
  studies: "/case-studies"
}

const FILES = {
  about: { src: "./content/about.md", dest: "./src/data/about.json" },
  footer: { src: "./content/footer.md", dest: "./src/data/footer.json" }
}

Object.values(DIRS).forEach(d => ensureDir(d.dest))

export async function loadShowcase(cache) {
  const files = fs.readdirSync(DIRS.showcase.src).filter(f => f.endsWith(".md"))

  const results = await Promise.all(
    files.map(file => {
      const id = file.replace(".md", "")
      return processMarkdownFile({
        id,
        type: "showcase",
        srcPath: path.join(DIRS.showcase.src, file),
        destPath: path.join(DIRS.showcase.dest, `${id}.json`),
        dirs: DIRS,
        relpaths: RELPATHS,
        cache
      })
    })
  )

  return results
}

export async function loadCaseStudies(cache) {
  const files = fs.readdirSync(DIRS.studies.src).filter(f => f.endsWith(".md"))

  await Promise.all(
    files.map(file => {
      const id = file.replace(".md", "")
      return processMarkdownFile({
        id,
        type: "studies",
        srcPath: path.join(DIRS.studies.src, file),
        destPath: path.join(DIRS.studies.dest, `${id}.json`),
        dirs: DIRS,
        relpaths: RELPATHS,
        cache
      })
    })
  )
}

export async function loadSingles(cache) {
  for (const type of ["about", "footer"]) {
    const { src, dest } = FILES[type]
    await processMarkdownFile({
      id: type,
      type,
      srcPath: src,
      destPath: dest,
      dirs: DIRS,
      relpaths: RELPATHS,
      cache
    })
  }
}
