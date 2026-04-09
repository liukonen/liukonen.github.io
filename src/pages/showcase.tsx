import showcaseData from  '../data/showcase.json'
import Header from '../components/Header'
import FooterCounter from '../components/FooterCounter'
import Breadcrumb from '../components/Breadcrumb'
import Tags from '../components/Tags'

export default function Showcase() {
  return (
  <section className="showcase-container page-layer">
    <Breadcrumb path="#/SHOWCASE" />
        <Header title='Showcase' subtitle="Larger projects I Architected, Managed, and Led" />
    <div className="showcase-grid">
    {Object.entries(showcaseData).map(([title, item]) => (
      <div key={item.id} className="card" onClick={() => window.location.hash = `#/TECH_SHOWCASE/${item.id}`}>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', color: 'var(--brass-muted)' }}>
          // {title.toUpperCase()}
        </span>

        <span class="golden-header">{item.impact.toUpperCase()}</span>
        <p>Role: {item.role} </p>
        <Tags tags={item.tags} />
      </div>
    ))}
    </div>
    <FooterCounter count={Object.entries(showcaseData).length} />
  </section>
  )
}
