import showcaseData from  '../data/showcase.json'
import Header from '../components/Header'
import FooterCounter from '../components/FooterCounter'
import Breadcrumb from '../components/Breadcrumb'
import Tags from '../components/Tags'

export default function Showcase() {
  return (
  <section className="showcase-container page-layer">
    <Breadcrumb path="#/CASE_STUDIES" />
    <Header title='Case Studies' subtitle="Larger projects I Architected, Managed, and Led" />
    <div className="showcase-grid">
    {Object.entries(showcaseData).filter(([title, item]) => item.hasCaseStudy).map(([title, item]) => (        
      <div key={item.id} className="card archive" onClick={() => window.location.hash = `#/CASE_STUDIES/${item.id}`}>
        <span className={"archive-id"}>
          // {title.toUpperCase()}
        </span>

        <span class="golden-header">{item.impact.toUpperCase()}</span>
        <p>Role: {item.role}</p>
        <Tags tags={item.tags} />
      </div>
    
    ))}
    </div>
        <FooterCounter count={Object.entries(showcaseData).filter(([title, item]) => item.hasCaseStudy).length} />
  </section>
  )
}