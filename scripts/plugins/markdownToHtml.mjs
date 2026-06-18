import { parse } from "marked"

function tagGlossaryTerms(html, glossary) {
    if (!glossary) return html

    const terms = Object.keys(glossary).sort((a, b) => b.length - a.length)
    let enriched = html

    terms.forEach((term) => {
        const regex = new RegExp(
            String.raw`\b(${term})\b(?![^<]*>)`,
            "gi"
        )

        enriched = enriched.replace(
            regex,
            `<span class="tooltip-trigger" data-tooltip="${glossary[term]}">$1</span>`
        )
    })

    return enriched
}

export default function markdownToHtml(content, glossary) {
    const html = parse(content)
    return tagGlossaryTerms(html, glossary)
}
