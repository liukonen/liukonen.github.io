import showcaseData from  '../data/showcase.json'
import Header from '../components/Header'
import FooterCounter from '../components/FooterCounter'
import Breadcrumb from '../components/Breadcrumb'
import Tags from '../components/Tags'

export default function Showcase() {
  return (
  <section className="showcase-container fade-in">
    <Breadcrumb path="#/CASE_STUDY" />
    <Header title='Case Studies' subtitle="Larger projects I Architected, Managed, and Led" />
    <div className="showcase-grid">
    {Object.entries(showcaseData).filter(([title, item]) => item.hasCaseStudy).map(([title, item]) => (        
      <div key={item.id} className="card" onClick={() => window.location.hash = `#/CASE_STUDY/${item.id}`}>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', color: 'var(--brass-muted)' }}>
          // {title.toUpperCase()}
        </span>

        <span class="company-header">{item.impact.toUpperCase()}</span>
        <p>Role: {item.role}</p>
        <div style={{ marginTop: '20px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Tags tags={item.tags} />
        </div>
      </div>
    
    ))}
    </div>
        <FooterCounter count={Object.entries(showcaseData).filter(([title, item]) => item.hasCaseStudy).length} />
  </section>
  )
}