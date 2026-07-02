import MoreFooter from "./MoreFooter"
import showcaseData from  '../data/showcase.json'

export default function ShowcaseSection() {
  return (
    <section className="l-showcase-grid">
      <span className="f-label-mono f-clr-accent">
        ~/ SHOWCASE_PROJECTS
      </span>
      <br />
      <div class="l-grid-3">
      {
        Object.entries(showcaseData).splice(0, 3).map(([title, item]) => 
          (
            <div key={item.id} className="card" onClick={() => window.location.hash = `#/TECH_SHOWCASE/${item.id}`}>
              <span class="lnk">{item.impact}</span>
          </div>
          )
        )
    }
    </div>
    <MoreFooter path={'#/TECH_SHOWCASE'} />
    </section>
  )
}
