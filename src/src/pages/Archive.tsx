import portfolioData from '../data/portfolio.json'

export default function Labs() {

  const labEntries = Object.entries(portfolioData.archive)

  return (
    <div className="page-layer">
      <nav className="breadcrumb">
        <a href="#/">~/root</a>
        <span style={{ margin: '0 10px', color: 'var(--brass-muted)' }}>/</span>
        <span style={{ color: 'var(--gold-accent)' }}>the_lab_projects</span>
      </nav>
      <header style={{ marginBottom: '60px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '600' }}>The Archive</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '10px', maxWidth: '600px' }}>
          A collection of versions of this website, showcasing the evolution of design and content over time. Each entry represents a snapshot of the site's development, reflecting changes in layout, features, and overall aesthetic. Explore the archive to see how the site has transformed and to gain insights into the design decisions made throughout its history.
        </p>
        <p>Versions below V1 reflect and are copies of my personal site that I had at UWM while I was a student.</p>
        <p>All links open in a new tab.</p>
      </header>

      {/* The Full Bento Grid */}
      <section className="grid-2">
     
      {labEntries.map(([id, project]) => (
        <a href={'https://liukonen.github.io/archive/' + project.id + '/'} target='_blank' style={{ textDecoration: 'none', color: 'inherit' }}>
        <div key={id} 
          className="card" 
          
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', color: 'var(--brass-muted)' }}>
              // {project.id.toUpperCase()}
            </span>
          </div>
          
          <h4 style={{ marginTop: '15px' }}>{project.title}</h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '8px' }}>
            {project.description}
          </p>
        </div>
        </a>
      ))}
      </section>

      <footer style={{ marginTop: '100px', opacity: 0.5 }}>
        <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem' }}>
          END_OF_LIST // TOTAL_ENTRIES: {labEntries.length}
        </p>
      </footer>
    </div>
  )
}