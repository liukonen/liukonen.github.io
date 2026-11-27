import FooterCounter from '../components/FooterCounter'
import portfolioData from '../data/portfolio.json'
import Header from '../components/Header'
import Breadcrumb from '../components/Breadcrumb'
import Tags from '../components/Tags'

export default function OpenSourceProjects() {
  // Extracting all lab projects from the JSON object
  const labEntries = Object.entries(portfolioData.labs)

  return (
    <div>
      <Breadcrumb path="#/OPEN_SOURCE_PROJECTS" />
      <Header 
        title="Open Source Projects" 
        subtitle="A collection of specialized utilities, hardware monitors, and architectural experiments." 
      />
      <section className="c-page-card-grid c-page-card-grid--two l-showcase-grid">
        {labEntries.map(([id, project]) => (
          <a
            key={id} 
            href={`#/OPEN_SOURCE_PROJECTS/${id}`}
            className="c-page-card"
          >
            <div className="flex-split-top row-align-top row-justify-sb">
              <span className="f-meta-xs">
                // {id.toUpperCase()}
              </span>
            </div>
            
            <h2>{project.title}</h2>
            <p className="clr-muted fs-09 mt-8px">
              {project.description}
            </p>
             <Tags tags={project.tech.slice(0, 3)} concepts={'concepts' in project ? project.concepts?.slice(0, 2) : undefined} />

            
          </a>
        ))}
      </section>

    <FooterCounter count={labEntries.length} />

    </div>
  )
}
