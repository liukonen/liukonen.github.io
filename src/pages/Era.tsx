import { h } from 'preact'
import portfolioData from '../data/portfolio.json'
import CompanyCard from '../components/CompanyCard'
import FooterCounter from '../components/FooterCounter'
import Breadcrumb from '../components/Breadcrumb'
import Header from '../components/Header'

export default function Home() {
  const { profile, eras, labs } = portfolioData

  return (
    <div>
      <Breadcrumb path="#/ERA" />
      <section id="eras" className="l-showcase-grid">
        <div className="c-career-page-heading">
          <Header title='Career' subtitle="My professional career so far" />
          <span>20+ years engineering</span>
        </div>
        {eras.map((era) => (
          <CompanyCard key={era.id} era={era} />
        ))}
      </section>
      <FooterCounter count={eras.length} />
    </div>
  )
}
