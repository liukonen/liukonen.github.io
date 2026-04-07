import { h } from 'preact';
import portfolioData from '../data/portfolio.json';

interface Props {
  id: string;
}

export default function LabDetail({ id }: Props) {
  const project = portfolioData.labs[id];

  if (!project) {
    return <div className="page-layer">Project Not Found</div>;
  }

  return (
    <div className="page-layer">
      <nav className="breadcrumb">
        <a href="#/">~/root </a>
        <span className="sep">/</span>
        <a href="#/OPEN_SOURCE_PROJECTS">OPEN_SOURCE_PROJECTS</a>
        <span className="sep">/</span>
        <span className="current">{id}</span>
      </nav>

      <header className="project-header">
        <h1 style={{ fontSize: '3.5rem', color: 'var(--gold-accent)' }}>
          {project.title}
        </h1>
        <div className="tech-stack" style={{ marginTop: '10px' }}>
          {project.tech.map(t => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>
      </header>

      <section className="project-body" style={{ marginTop: '40px' }}>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
          {project.description}
        </p>

        <p style={{ marginTop: '20px' }}>{project.long_description}</p>
        
        {/* New Actions Section */}
        {project.buttons && project.buttons.length > 0 && (
          <div className="project-actions" style={{ marginTop: '40px', display: 'flex', gap: '20px' }}>
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
      </section>

      <button 
        className="btn" 
        style={{ marginTop: '60px' }} 
        onClick={() => window.location.hash = '#/OPEN_SOURCE_PROJECTS'}
      >
        ← RETURN_TO_LAB
      </button>
    </div>
  );
}