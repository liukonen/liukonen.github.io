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
      <section className="l-grid-2 l-showcase-grid">
        {labEntries.map(([id, project]) => (
          <div 
            key={id} 
            className="card" 
            onClick={() => window.location.hash = `#/OPEN_SOURCE_PROJECTS/${id}`}
          >
            <div className="flex-split-top row-align-top row-justify-sb">
              <span className="f-meta-xs">
                // {id.toUpperCase()}
              </span>
            </div>
            
            <h4 class="mt-1 c-link-interactive">{project.title}</h4>
            <p className="clr-muted fs-09 mt-8px">
              {project.description}
            </p>
            <Tags tags={project.tech.slice(0,3)} />

            
          </div>
        ))}
      </section>

    <FooterCounter count={labEntries.length} />

    </div>
  )
}