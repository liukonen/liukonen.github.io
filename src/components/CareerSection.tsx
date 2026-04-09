import MoreFooter  from "./MoreFooter"
import Tags from "./Tags"

export default function CareerSection({ eras }: any) {
    return (
      <section id="eras" className="showcase-grid">
        <span className="section-label">~/ RECENT_CAREER</span>
        {eras.slice(0, 3).map((era: any) => (
          <EraEntry key={era.id} era={era} />
        ))}
        <MoreFooter path="#/ERA" />
      </section>
    )
}

const EraEntry = ({ era } : any) => (
  <a href={`#/ERA/${era.id}`} className={"no-decor"}>
    <div className="card" key={era.id}>    
      <span className={"golden-header"}>
        // {era.company.toUpperCase()}
      </span>
      <h4 className={"top-buffer-10"}>
        {era.title}
      </h4>
      <p>
        {era.role}
      </p>
      <Tags tags={era.tech} />
    </div>
  </a>
)