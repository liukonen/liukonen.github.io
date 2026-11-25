import MoreFooter from "./MoreFooter"
import Tags from "./Tags"
import showcaseData from "../data/showcase.json"

export default function ShowcaseSection() {
  return (
    <section id="showcase" className="l-showcase-grid">
      <div className="home-section-heading">
        <h2 className="home-section-title">Showcase Projects</h2>
        <span className="home-section-meta">Production outcomes</span>
      </div>
      <div className="home-showcase-list">
        {Object.entries(showcaseData).slice(0, 3).map(([title, item]) => (
          <a key={item.id} href={`#/TECH_SHOWCASE/${item.id}`} className="home-showcase-card f-no-decor">
            <div className="home-showcase-stack">
              <h3>{title}</h3>
              <Tags tags={item.tags.slice(0, 4)} concepts={item.concepts} />
            </div>
            <div className="home-showcase-outcome">
              <span>Production outcome</span>
              <p>{item.impact}</p>
            </div>
          </a>
        ))}
      </div>
      <MoreFooter path="#/showcase" label="View More Showcase Projects" />
    </section>
  )
}
