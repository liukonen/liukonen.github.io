import portfolioData from '../data/portfolio.json'
import Header from '../components/Header'
import Breadcrumb from '../components/Breadcrumb'
import FooterCounter from '../components/FooterCounter'

export default function Labs() {

  const labEntries = Object.entries(portfolioData.archive)

  return (
    <div className="page-layer">
      <Breadcrumb path="#/ARCHIVE" />

      <div style={{ marginBottom: '60px' }}>
        <Header title='The Archive'
        subtitle="A collection of versions of this website, showcasing the evolution of design and content over time. Each entry represents a snapshot of the site's development, reflecting changes in layout, features, and overall aesthetic. Explore the archive to see how the site has transformed and to gain insights into the design decisions made throughout its history."
        ></Header>
        <p>Versions below V1 reflect and are copies of my personal site that I had at UWM while I was a student.</p>
        <p>All links open in a new tab.</p>
      </div>

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
          
          <h4 style={{ marginTop: '15px' }}><span class="bi bi-box-arrow-up-right"></span> {project.title}</h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '8px' }}>
            {project.description}
          </p>
        </div>
        </a>
      ))}
      </section>
      <FooterCounter count={labEntries.length} />
    </div>
  )
}