import { h } from 'preact';
import portfolioData from '../data/portfolio.json';

export default function Home() {
  const { profile, eras, labs } = portfolioData;

  return (
    <div className="page-layer">
              {/* Navigation Breadcrumb */}
      <nav className="breadcrumb">
        <a href="#/">~/root</a>
        <span style={{ margin: '0 10px', color: 'var(--brass-muted)' }}>/</span>
        <span style={{ color: 'var(--gold-accent)' }}>ERA</span>
      </nav>
      
      <section id="eras" style={{ marginBottom: '100px' }}>
        <span className="section-label">~/ PROFESSIONAL_ERAS</span>
        {eras.map((era) => (
          <EraEntry key={era.id} era={era} />
        ))}
      </section>

      <footer style={{ marginTop: '100px', opacity: 0.5 }}>
        <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem' }}>
          END_OF_LIST // TOTAL_ENTRIES: {eras.length}
        </p>
      </footer>

    </div>
  );
}

const EraEntry = ({ era }) => (
  <div className="card" key={era.id} onClick={() => window.location.hash = `#/ERA/${era.id}`}>    
  <span style={{ fontFamily: 'JetBrains Mono', fontSize: '1.6rem', color: 'var(--brass-muted)' }}>
                // {era.company.toUpperCase()}
              </span>
              <h4 style={{ marginTop: '10px' }}>{era.title}</h4>
              <p>{era.role}</p>
              <div style={{ marginTop: '15px' }}>
                {era.tech.map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
);
