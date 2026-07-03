import MoreFooter from "./MoreFooter"

export default function OpenSourceSection({ repos }: Readonly<any>) {
    return (
      <section id="featured-labs" className="l-showcase-grid">
        <span className="f-label-mono f-clr-accent"> ~/ OPEN_SOURCE_PROJECTS</span>
        <p>

          // Secondary utilities, legacy tools, and experimental code.  <br />
          // Focused on local-first execution, minimal dependency footprints, and raw systems craft.
        </p>
        <br />
        <div className="l-grid-2">
          {Object.entries(repos).slice(0, 4).map(([id, project]) => (
            <LabEntry id={id} project={project} />
          ))}
          </div>
          <MoreFooter path={'#/OPEN_SOURCE_PROJECTS'} />
      </section>
    )
}

const LabEntry = ({ project, id }: { project: any, id: string }) => (
    <a href={`#/OPEN_SOURCE_PROJECTS/${id}`} className={"no-decor"}>
    <div className="card" key={id}>
      <span className={"f-hd-xs f-clr-muted"}>
        // PROJ_{id.toUpperCase()}
      </span>
      <h4 className={"mt-1 c-link-interactive"}>{project.title}</h4>
      <p>{project.description}</p>
      <div className="mt-15px">
        {project.tech.slice(0, 3).map(t => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
    </div>
    </a>
)
