import { h } from 'preact'
import portfolioData from '../data/portfolio.json'
import Tags from '../components/Tags'
import Breadcrumb from '../components/Breadcrumb'
import { useState, useEffect } from 'preact/hooks'
type Project = { repo: string; title: string; buttons: { type: string; url: string }[]; tech: string[]; concepts?: string[]; description: string }
const labs: Record<string, Project | undefined> = portfolioData.labs

export default function LabDetail({ id }: Readonly<{ id: string }>) {
  const project = labs[id]
  const [projectData, setProjectData] = useState<{ content: string } | null>(null)
  useEffect(() => {
    if (!project) return
    fetch(`/open-source/${project.repo}.json`).then(r => r.json()).then(setProjectData)
    window.scrollTo(0, 0)
  }, [project])
  if (!project) return <div>Project Not Found</div>
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
        <Tags tags={project.tech} concepts={project.concepts} />
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
