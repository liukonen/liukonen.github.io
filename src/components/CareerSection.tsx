import MoreFooter  from "./MoreFooter"
import Tags from "./Tags"

export default function CareerSection({ eras }: Readonly<any>) {
    return (
      <section id="eras" className="l-showcase-grid">
        <span className="f-label-mono f-clr-accent">~/ RECENT_CAREER</span>
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
      <span className={"f-hd-md f-clr-muted"}>
        // {era.company.toUpperCase()}
      </span>
      <h4 className={"mt-1 c-link-interactive"}>
        {era.title}
      </h4>
      <p>
        {era.scope}
      </p>
      <p>
        {era.role}
      </p>
      <Tags tags={era.tech} />
    </div>
  </a>
)