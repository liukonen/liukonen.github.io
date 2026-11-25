import Tags from './Tags'

export default function CompanyCard({era}: Readonly<any>) {

    return (
          <a className="comp-card no-decor" href={`#/ERA/${era.id}`}>
              <div className="c-career-card-heading">
                <span className="c-career-company">{era.company}</span>
                <time>{era.year}</time>
              </div>
              <h4 class="c-link-interactive">{era.title}</h4>
              <p>{era.scope}</p>
              <p>{era.role}</p>
              <Tags tags={era.tech} concepts={era.concepts} />
          </a>
    )
}
