# liukonen.dev
### High-Performance Headless Content Engine & Developer Portfolio

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

---

## ⚙️ How It Does It (The Automation Engine)
The site's delivery pipeline is completely hands-off, driven by a server-side build script (`compile-content.cjs`) executed automatically via GitHub Actions whenever code changes are pushed.

* **Smart Pipeline Compilation:** The compiler processes local content fields, automatically handles casing fallbacks for cross-platform files, isolates clean data scopes, and aggregates attributes into a structured global site discovery manifest.
* **Mermaid-to-SVG Flattening:** The build script extracts raw text-based `Mermaid` architecture blocks, wraps them securely into encrypted payloads, fetches crisp dark-mode vectors via an upstream endpoint, and drops them directly into the deployment bundle. This prevents visual layout shifts on the browser.
* **Build-Cache Optimization:** To keep deployment speeds incredibly fast, a localized caching layer tracks asset changes across builds, rendering new diagrams only when code configurations or layouts are modified.
* **Font Asset Isolation:** Local automation routines extract specific Latin sub-ranges of `IBM Plex Sans` (for readable narrative elements) and `Cascadia Code` (for precise engineering data) out of local node dependencies, hosting them completely on the edge to protect user privacy.

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
