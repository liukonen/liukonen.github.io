export default function CompanyCard({era}: Readonly<any>) {

    return (
          <div className="comp-card" key={era.id} onClick={() => location.hash = `#/ERA/${era.id}`}>    
  <span class="golden-header">
                // {era.company.toUpperCase()}
              </span>
              <h4 class="lnk">{era.title}</h4>
              <p>{era.scope}</p>
              <p>{era.role}</p>
              <div>
                {era.tech.map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
    )
}