import { h } from 'preact';
import portfolioData from '../data/portfolio.json';
import CompanyCard from '../components/CompanyCard';
import FooterCounter from '../components/FooterCounter'
import Breadcrumb from '../components/Breadcrumb'
import Header from '../components/Header'

export default function Home() {
  const { profile, eras, labs } = portfolioData;

  return (
    <div className="page-layer">
      <Breadcrumb path="#/ERA" />
      <section id="eras" className="showcase-grid">
        <Header title='Career' subtitle="My Professional career so far" />
        {eras.map((era) => (
          <EraEntry key={era.id} era={era} />
        ))}
      </section>
      <FooterCounter count={eras.length} />
    </div>
  );
}

const EraEntry = ({ era }) => (<CompanyCard era={era} />);
