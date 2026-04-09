import MoreFooter from "./MoreFooter";
import showcaseData from  '../data/showcase.json'

export default function ShowcaseSection() {
  return (
    <section className="showcase-grid">
      <span className="section-label">
        ~/ SHOWCASE_PROJECTS
      </span>
      {
        Object.entries(showcaseData).splice(0, 3).map(([title, item]) => 
          (
            <div key={item.id} className="card" onClick={() => window.location.hash = `#/TECH_SHOWCASE/${item.id}`}>
              <span class="">{item.impact}</span>
          </div>
          )
        )
    }
    <MoreFooter path={'#/TECH_SHOWCASE'} />
    </section>
  );
}
