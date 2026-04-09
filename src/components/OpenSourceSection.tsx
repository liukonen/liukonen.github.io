import MoreFooter from "./MoreFooter"

export default function OpenSourceSection({ repos }: any) {
    return (
      <section id="featured-labs" className="showcase-grid">
        <span className="section-label"> ~/ OPEN_SOURCE_PROJECTS</span>
        <div className="grid-2">
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
      <span className={"small-header"}>
        // PROJ_{id.toUpperCase()}
      </span>
      <h4 className={"top-buffer-10"}>{project.title}</h4>
      <p>{project.description}</p>
      <div style={{ marginTop: '15px' }}>
        {project.tech.slice(0, 3).map(t => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
    </div>
    </a>
)
