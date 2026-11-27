import showcaseData from  '../data/showcase.json'
import Header from '../components/Header'
import FooterCounter from '../components/FooterCounter'
import Breadcrumb from '../components/Breadcrumb'
import Tags from '../components/Tags'

export default function Showcase() {
  return (
  <section>
    <Breadcrumb path="#/showcase" />
        <Header title='Showcase' subtitle="Larger projects I architected, managed, and led" />
    <div className="c-page-card-list">
    {Object.entries(showcaseData).map(([title, item]) => (
      <a key={item.id} href={`#/TECH_SHOWCASE/${item.id}`} className="c-page-card c-page-showcase-card">
        <div>
          <span className="f-meta-xs">{title}</span>
          <h2>{item.role}</h2>
          <Tags tags={item.tags} concepts={item.concepts} />
        </div>
        <div className="c-page-showcase-outcome">
          <span>Production outcome</span>
          <p>{item.impact}</p>
        </div>
      </a>
    ))}
    </div>
    <FooterCounter count={Object.entries(showcaseData).length} />
  </section>
  )
}
