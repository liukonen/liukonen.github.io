import MoreFooter from "./MoreFooter"
import Tags from "./Tags"

type Project = Readonly<{ title: string; description: string; tech: string[]; concepts?: string[] }>

export default function OpenSourceSection({ repos }: Readonly<{ repos: Record<string, Project> }>) {
  return (
    <section id="featured-labs" className="l-showcase-grid">
      <div className="home-section-heading">
        <h2 className="home-section-title">Open Source Projects</h2>
        <a href="https://github.com/liukonen" target="_blank" rel="noopener noreferrer">github.com/liukonen ↗</a>
      </div>
      <p>Utilities, legacy tools, and experiments focused on local-first execution, minimal dependencies, and systems craft.</p>
      <div className="l-grid-2 home-card-grid home-open-source-grid">
        {Object.entries(repos).slice(0, 4).map(([id, project]) => (
          <a key={id} href={`#/OPEN_SOURCE_PROJECTS/${id}`} className="card f-no-decor">
            <span className="home-card-meta">// PROJ_{id.toUpperCase()}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <Tags tags={project.tech.slice(0, 3)} concepts={project.concepts?.slice(0, 2)} />
          </a>
        ))}
      </div>
      <MoreFooter path="#/open_source" label="View More Open Source Projects" />
    </section>
  )
}
