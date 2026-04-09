import FooterCounter from '../components/FooterCounter';
import portfolioData from '../data/portfolio.json';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import Tags from '../components/Tags';

export default function OpenSourceProjects() {
  // Extracting all lab projects from the JSON object
  const labEntries = Object.entries(portfolioData.labs);

  return (
    <div className="page-layer">
      <Breadcrumb path="#/OPEN_SOURCE_PROJECTS" />
      <Header 
        title="Open Source Projects" 
        subtitle="A collection of specialized utilities, hardware monitors, and architectural experiments." 
      />
      <section className="grid-2 showcase-grid">
        {labEntries.map(([id, project]) => (
          <div 
            key={id} 
            className="card" 
            onClick={() => window.location.hash = `#/OPEN_SOURCE_PROJECTS/${id}`}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', color: 'var(--brass-muted)' }}>
                // {id.toUpperCase()}
              </span>
            </div>
            
            <h4 style={{ marginTop: '15px' }}>{project.title}</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              {project.description}
            </p>
            <Tags tags={project.tech.slice(0,3)} />

            
          </div>
        ))}
      </section>

    <FooterCounter count={labEntries.length} />

    </div>
  );
}