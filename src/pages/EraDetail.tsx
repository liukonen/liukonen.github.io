import { h } from "preact"
import portfolioData from "../data/portfolio.json"
import Breadcrumb from "../components/Breadcrumb"
import Tags from "../components/Tags"

export default function EraDetail({ id }: Readonly<{ id: string }>) {
  const era = portfolioData.eras.find(e => e.id === id)

  if (!era) return <div>Error: Era Not Found</div>

  return (
    <div className="l-detail-view" key={id}>
      <div className="l-era-container">
        <Breadcrumb path={`#/ERA/${id}`} />

        <header className="l-era-header">
          <div className="brand-box">
            <img
              src={era.logoUrl}
              alt={era.company}
              className="company-logo-large"
              onError={e => (e.currentTarget.style.display = "none")}
            />
            <div>
              <h1>
                {era.company}
              </h1>
              <a href={era.website} target="_blank" className="external-link">
                {era.website.replace("https://", "")} ↗
              </a>
            </div>
          </div>

          <div className="c-meta-strip">
            <div className="c-meta-item">
              <label>TENURE</label>
              <span>
                {era.year}
              </span>
            </div>
            <div className="c-meta-item">
              <label>FUNCTIONAL ROLE</label>
              <span>
                {era.role}
              </span>
            </div>
            <div className="c-meta-item">
              <label>OFFICIAL TITLE</label>
              <span>
                {era.title}
              </span>
            </div>
          </div>
          <Tags tags={era.tech} concepts={era.concepts} />
        </header>

        <section>
          <span className="f-label-mono f-clr-accent">~/ THE_DOSSIER</span>
          <div className="l-description-container">
            {era.long_description.map((paragraph, index) =>
              <p key={index} className="f-body-prose">
                {paragraph}
              </p>
            )}
          </div>
        </section>

        <footer>
          <button onClick={() => window.history.back()} className="c-btn">
            RETURN_TO_TIMELINE
          </button>
        </footer>
      </div>
    </div>
  )
}
