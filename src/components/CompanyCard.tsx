import { h } from 'preact';

export default function CompanyCard({era}: any) {

    return (
          <div className="card company-card" key={era.id} onClick={() => window.location.hash = `#/ERA/${era.id}`}>    
  <span class="golden-header">
                // {era.company.toUpperCase()}
              </span>
              <h4>{era.title}</h4>
              <p>{era.role}</p>
              <div>
                {era.tech.map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
    )
}