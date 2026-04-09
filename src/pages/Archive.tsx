import portfolioData from '../data/portfolio.json'
import Header from '../components/Header'
import Breadcrumb from '../components/Breadcrumb'
import FooterCounter from '../components/FooterCounter'
import BoxArrowUpRight from '~icons/bi/box-arrow-up-right'

export default function Labs() {

  const labEntries = Object.entries(portfolioData.archive)

  return (
    <div className="page-layer">
      <Breadcrumb path="#/ARCHIVE" />

      <div class="default-margin">
        <Header title='The Archive'
        subtitle="A collection of versions of this website, showcasing the evolution of design and content over time. Each entry represents a snapshot of the site's development, reflecting changes in layout, features, and overall aesthetic. Explore the archive to see how the site has transformed and to gain insights into the design decisions made throughout its history."
        >          
        </Header>
        <p>Versions below V1 reflect and are copies of my personal site that I had at UWM while I was a student.</p>
        <p>All links open in a new tab.</p>
      </div>

      {/* The Full Bento Grid */}
      <section className="grid-2">
     
      {labEntries.map(([id, project]) => (
        <a href={'https://liukonen.github.io/archive/' + project.id + '/'} target='_blank' style={{ textDecoration: 'none', color: 'inherit' }}>
        <div key={id} className="card archive">
          <div className={"archive-header"}>
            <span className={"archive-id"}>
              // {project.id.toUpperCase()}
            </span>
          </div>
          <h4><BoxArrowUpRight /> {project.title}</h4>
          <p>
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