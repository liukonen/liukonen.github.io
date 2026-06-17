import { useState, useEffect } from 'preact/hooks';

export default function ShowcaseDetail({ id }) {
  const [showcase, setShowcase] = useState(null);

  useEffect(() => {
    fetch(`/showcase/${id}.json`)
      .then((r) => r.json())
      .then(setShowcase)
      .catch((err) => console.error("Failed to load project data:", err));
    window.scrollTo(0, 0);
  }, [id]);

  if (!showcase) return <div className="loader">// DECRYPTING_PROJECT_DATA...</div>;

  return (
    <article className="showcase-view page-layer">
      <header className="showcase-header">
        <h1>{showcase.title}</h1>
        <div className="impact-callout">RESULT: {showcase.impact}</div>
        
        {/* RE-ADDED ROLE & STACK BLOCK */}
        <div className="project-meta-top">
          <div className="meta-item"><strong>ROLE:</strong> {showcase.role}</div>
          <div className="meta-item"><strong>STACK:</strong> {showcase.tech}</div>
        </div>
      </header>

      <div className="showcase-main-layout">
        
        {/* Left Column: Technical Specs Grid */}
        <aside className="specs-blueprint-sidebar mono">
          <h3>~/TECHNICAL_SPECS</h3>
          {showcase.specs && (
            <table>
              <tbody>
                {Object.entries(showcase.specs).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key.replace(/_/g, ' ')}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </aside>

        {/* Right Column: Narrative Content */}
        <div className="showcase-content-stream">
          <section 
            className="technical-body" 
            dangerouslySetInnerHTML={{ __html: showcase.content }} 
          />

          <section className="action-section">
            {showcase.hasCaseStudy && (
              <button className="btn" onClick={() => window.location.hash = `#/CASE_STUDIES/${id}`}>
                READ_CASE_STUDY
              </button>
            )}
          </section>
        </div>

        {/* Bento Grid Layer */}
        {showcase.features && Object.keys(showcase.features).length > 0 && (
          <section className="bento-showcase-section">
            <h2 className="section-title">// KEY FEATURES & IMPACT</h2>
            <div className="grid-2">
              {Object.entries(showcase.features).map(([title, itemsString], index) => {
                const formattedTitle = title
                  .replace(/_/g, ' ')
                  .replace(/\b\w/g, (char) => char.toUpperCase());
                
                const items = itemsString.split(';').map(i => i.trim());

                return (
                  <div className="bento" key={index}>
                    <strong className="gold-bullet">{formattedTitle}</strong>
                    <ul className="">
                      {items.map((item, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}