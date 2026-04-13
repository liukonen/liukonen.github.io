import { h } from 'preact'
import portfolioData from '../data/portfolio.json'
import Tags from '../components/Tags'
import Breadcrumb from '../components/Breadcrumb'
import { useState, useEffect } from 'preact/hooks'
interface Props {
  id: string;
}




export default function LabDetail({ id }: Props) {
  const project = portfolioData.labs[id]
  if (!project) {
    return <div className="page-layer">Project Not Found</div>
  }

  const [projectData, setProjectData] = useState(null)

  useEffect(() => {
    fetch(`/open-source/${project.repo}.json`).then(r => r.json()).then(setProjectData)
    window.scrollTo(0, 0)
  }, [id])
  if (!projectData) return <div className="loader">// DECRYPTING_TECHNICAL_LOGS...</div>


  return (
    <div className="page-layer">
      <Breadcrumb path={`#/OPEN_SOURCE_PROJECTS/${id}`} />

      <header className="project-header">
        <h1 style={{ fontSize: '3.5rem', color: 'var(--gold-accent)' }}>
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

        <div className="top-buffer-10">
        <Tags tags={project.tech} />
        </div>
      </header>

      <section className="project-body top-buffer-40">
        <p className="top-buffer-20" style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
          {project.description}
        </p>
        <section className="technical-body markdown-engine" dangerouslySetInnerHTML={{ __html: projectData.content }} />
      </section>

      <button 
        className="btn" 
        style={{ marginTop: '60px' }} 
        onClick={() => window.location.hash = '#/OPEN_SOURCE_PROJECTS'}
      >
        ← RETURN_TO_LAB
      </button>
    </div>
  )
}