
import { loadCache, saveCache } from "./plugins/cache.mjs"
import { loadShowcase, loadCaseStudies, loadSingles } from "./plugins/loadContent.mjs"
import processRepos from "./plugins/processRepos.mjs"
import buildManifest from "./plugins/buildManifest.mjs"
import profileJson from "../src/data/portfolio.json" with { type: "json" }

const cache = loadCache()

const showcaseItems = await loadShowcase(cache)
await loadCaseStudies(cache)
await loadSingles(cache)
await processRepos(profileJson, cache)
await buildManifest(showcaseItems)

saveCache(cache)

console.log("✅ Parallel ESM plugin build complete.")
