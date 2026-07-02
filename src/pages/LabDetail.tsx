import { h } from 'preact'
import portfolioData from '../data/portfolio.json'
import Tags from '../components/Tags'
import Breadcrumb from '../components/Breadcrumb'
import { useState, useEffect } from 'preact/hooks'
interface Props {
  id: string
}




export default function LabDetail({ id }: Props) {
  const project = portfolioData.labs[id]
  if (!project) {
    return <div>Project Not Found</div>
  }

  const [projectData, setProjectData] = useState(null)

  useEffect(() => {
    fetch(`/open-source/${project.repo}.json`).then(r => r.json()).then(setProjectData)
    window.scrollTo(0, 0)
  }, [id])
  if (!projectData) return <div>// DECRYPTING_TECHNICAL_LOGS...</div>


  return (
    <div>
      <Breadcrumb path={`#/OPEN_SOURCE_PROJECTS/${id}`} />

      <header>
        <h1 class="lab-header">
          {project.title}
        </h1>
        {project.buttons && project.buttons.length > 0 && (
          <div className="project-actions tag-wrapper" >
            {project.buttons.map((btn) => (
              <a 
                key={btn.type}
                href={btn.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="action-link"
              >
                <span className="action-prefix">//</span> {btn.type.toUpperCase()}
              </a>
            ))}
          </div>
        )}

        <div className="f-mt-1">
        <Tags tags={project.tech} />
        </div>
      </header>

      <section className="f-mt-4">
        <p className="f-mt-2 lab-detail-desc">
          {project.description}
        </p>
        <section className="technical-body c-prose-container" dangerouslySetInnerHTML={{ __html: projectData.content }} />
      </section>

      <button 
        className="c-btn mt-60px" 
        onClick={() => window.location.hash = '#/OPEN_SOURCE_PROJECTS'}
      >
        ← RETURN_TO_LAB
      </button>
    </div>
  )
}