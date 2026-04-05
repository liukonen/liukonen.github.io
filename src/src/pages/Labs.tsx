import portfolioData from '../data/portfolio.json';

export default function Labs() {
  // Extracting all lab projects from the JSON object
  const labEntries = Object.entries(portfolioData.labs);

  return (
    <div className="page-layer">
      {/* Navigation Breadcrumb */}
      <nav className="breadcrumb">
        <a href="#/">~/root</a>
        <span style={{ margin: '0 10px', color: 'var(--brass-muted)' }}>/</span>
        <span style={{ color: 'var(--gold-accent)' }}>OPEN_SOURCE_PROJECTS</span>
      </nav>

      <header style={{ marginBottom: '60px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '600' }}>Open Source Projects</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '10px', maxWidth: '600px' }}>
          A collection of specialized utilities, hardware monitors, and architectural experiments.
        </p>
      </header>

      {/* The Full Bento Grid */}
      <section className="grid-2">
        {labEntries.map(([id, project]) => (
          <div 
            key={id} 
            className="card" 
            onClick={() => window.location.hash = `#/THE_LAB_PROJECTS/${id}`}
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
            <div style={{ marginTop: '20px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {project.tech.slice(0,3).map(t => (
                <span key={t} className="tag" style={{ fontSize: '0.6rem' }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </section>

      <footer style={{ marginTop: '100px', opacity: 0.5 }}>
        <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem' }}>
          END_OF_LIST // TOTAL_ENTRIES: {labEntries.length}
        </p>
      </footer>
    </div>
  );
}