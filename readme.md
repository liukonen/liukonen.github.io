# liukonen.dev

**High-Performance Headless Content Engine & Developer Portfolio**

---

## 💼 Executive Summary

This repository contains the architecture behind `liukonen.dev`. Engineered as a lightweight, zero-runtime platform using **Preact** and **Vite**, it functions as a lightweight headless content engine. Rather than relying on heavy third-party content management systems (CMS) or live database layers, the platform uses custom automation scripts at build time to translate flat files and remote source data into optimized, secure static distribution assets.

---

## 🔍 What It Is & What It Can Do

The platform acts as an automated static pipeline that serves highly polished technical documents, multi-tier architectural deep dives, and system logs with sub-second page delivery. 

### Key Capabilities:

* **Asynchronous Remote Ingestion:** Automatically pulls raw project documentation directly from external GitHub repository branches on check-in, transforming remote source code assets into live portfolio entries.
* **On-the-Fly Architecture Mapping:** Scans text-based diagrams within raw documents and pre-renders them into flat visual elements, eliminating heavy rendering steps for the end-user.
* **Smart Glossary Parsing:** Automatically scans text for complex industry terminology, cross-references an internal definitions dictionary, and dynamically injects localized tooltips directly into the content structure.
* **Living Style Architecture Documentation:** Automatically parses un-bracketed SASS source stylesheets at the boundary level, extracting documentation comments and compound nesting structures to build a self-updating, complete style inventory [STYLES.md](STYLES.md).
* **Decoupled Asset Lightboxing:** Leverages an asynchronous browser event pipeline to cleanly project complex structural diagrams into full-screen immersive viewports without overloading the core application context or utilizing heavy DOM crawling.

---

## ⚙️ How It Does It (The Automation Engine)
The site's delivery pipeline is completely hands-off, driven by a server-side build script (`compile-content.cjs`) executed automatically via GitHub Actions whenever code changes are pushed.

* **Smart Pipeline Compilation:** The compiler processes local content fields, automatically handles casing fallbacks for cross-platform files, isolates clean data scopes, and aggregates attributes into a structured global site discovery manifest.
* **Mermaid-to-SVG Flattening:** The build script extracts raw text-based `Mermaid` architecture blocks, wraps them securely into encrypted payloads, fetches crisp dark-mode vectors via an upstream endpoint, and drops them directly into the deployment bundle. This prevents visual layout shifts on the browser.
* **Build-Cache Optimization:** To keep deployment speeds incredibly fast, a localized caching layer tracks asset changes across builds, rendering new diagrams only when code configurations or layouts are modified.
* **Font Asset Isolation:** Local automation routines extract specific Latin sub-ranges of `IBM Plex Sans` (for readable narrative elements) and `Cascadia Code` (for precise engineering data) out of local node dependencies, hosting them completely on the edge to protect user privacy.
* **O(N) Component Usage Mapping:** Features an inverted codebase scanning matrix that processes React/TSX component trees exactly once into an in-memory string-cache. It performs rapid set intersections to instantly trace exactly which application views consume specific style classes.
* **Pre-Commit Pipeline Automation:** Utilizes localized Git hooks to automatically intercept asset workflows on check-in. The pipeline hooks directly into font extraction, markdown compilation, and style documentation routines sequentially—ensuring deployable assets are strictly unified and up-to-date before code hits the staging index.
* **Event-Driven UI Boundaries: Shipped a highly decoupled event dispatch system inside the markdown-to-HTML parser. Instead of tracking global page clicks via structural DOM scanning, inline-compiled diagram nodes declare their own explicit, lightweight dispatch events directly to the global application state machine.

#### 🧰 Developer / AI Utilities:

* **Automated Refactoring & Token Synchronization:** Features hidden AST-adjacent tooling that can instantly parse, rename, and synchronize CSS class targets across both fluid SASS sheets and TSX layout components in a single transaction, eliminating manual search-and-replace overhead.
* **Semantic LLM Ingestion Layer:** Includes dedicated one-off pipelines engineered to flatten system styles and layout trees into structured JSON schema and vector-ready payloads. This provides a clean, token-optimized context window for AI engines to perform advanced SASS structural analysis and optimization audits

---

```json
{
  "professional_profile": {
    "name": "Luke Liukonen",
    "role": "Senior Software Engineer / Technical Lead",
    "specialties": ["Backend Architecture", "Systems Modernization", "Developer Velocity"],
    "availability": "Open to Strategic Initiatives",
    "digital_footprint": "[https://liukonen.dev](https://liukonen.dev)"
  }
}
```