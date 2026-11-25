import MoreFooter from "./MoreFooter"
import Tags from "./Tags"

type Era = Readonly<{
  id: string; company: string; year: string; title: string; scope: string; role: string;
  tech: string[]; concepts?: string[]
}>

export default function CareerSection({ eras }: Readonly<{ eras: Era[] }>) {
  return (
    <section id="eras" className="l-showcase-grid">
      <div className="home-section-heading">
        <h2 className="home-section-title">Recent Career</h2>
        <span className="home-section-meta">20+ years engineering</span>
      </div>
      <div className="home-card-grid home-career-grid">
        {eras.slice(0, 3).map(era => (
          <a key={era.id} href={`#/ERA/${era.id}`} className="card f-no-decor">
            <div className="home-career-card-heading">
              <span className="home-career-company">{era.company}</span>
              <time>{era.year}</time>
            </div>
            <h3>{era.title}</h3>
            <p>{era.scope}</p>
            <p className="home-card-meta">{era.role}</p>
            <Tags tags={era.tech} concepts={era.concepts} />
          </a>
        ))}
      </div>
      <MoreFooter path="#/career" label="View More Career History" />
    </section>
  )
}
