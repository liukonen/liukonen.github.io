import { h } from "preact"
import portfolioData from "../data/portfolio.json"
import Breadcrumb from "../components/Breadcrumb"

export default function EraDetail({ id }: Props) {
  const era = portfolioData.eras.find(e => e.id === id)

  if (!era) return <div className="page-layer">Error: Era Not Found</div>

  return (
    <div className="page-layer detail-view" key={id}>
      <div className="era-container">
        <Breadcrumb path={`#/ERA/${id}`} />

        <header className="era-header">
          <div className="brand-box">
            <img
              src={era.logoUrl}
              alt={era.company}
              className="company-logo-large"
              onError={e => (e.currentTarget.style.display = "none")}
            />
            <div className="header-text">
              <h1 className="gold-text">
                {era.company}
              </h1>
              <a href={era.website} target="_blank" className="external-link">
                {era.website.replace("https://", "")} ↗
              </a>
            </div>
          </div>

          <div className="meta-strip">
            <div className="meta-item">
              <label>TENURE</label>
              <span>
                {era.year}
              </span>
            </div>
            <div className="meta-item">
              <label>FUNCTIONAL ROLE</label>
              <span>
                {era.role}
              </span>
            </div>
            <div className="meta-item">
              <label>OFFICIAL TITLE</label>
              <span className="brass-text">
                {era.title}
              </span>
            </div>
          </div>
          <div style={{ marginTop: "5px" }}>
            {era.tech.map(t =>
              <span key={t} className="tag">
                {t}
              </span>
            )}
          </div>
        </header>

        <section className="era-content">
          <span className="section-label">~/ THE_DOSSIER</span>
          <div className="description-container">
            {era.long_description.map((paragraph, index) =>
              <p key={index} className="era-paragraph">
                {paragraph}
              </p>
            )}
          </div>
        </section>

        <footer className="detail-footer">
          <button onClick={() => window.history.back()} className="btn">
            RETURN_TO_TIMELINE
          </button>
        </footer>
      </div>
    </div>
  )
}
