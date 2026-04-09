import { useState, useEffect } from 'preact/hooks';
import Breadcrumb from '../components/Breadcrumb';

export const ShowcaseDetail = ({ id }) => {
  const [showcase, setShowcase] = useState(null);

  useEffect(() => {
    fetch(`/showcase/${id}.json`).then(r => r.json()).then(setShowcase);
    window.scrollTo(0, 0);
  }, [id]);

  if (!showcase) return <div className="loader">// DECRYPTING_PROJECT_DATA...</div>;

  return (
    <article className="showcase-view page-transition-wrapper">
      <header className="showcase-header">
        <Breadcrumb path={`#/TECH_SHOWCASE/${id}`} />
        <h1>{showcase.title}</h1>
        <div className="impact-callout">RESULT: {showcase.impact}</div>
      </header>

      <aside className="tech-specs">
        <div className="spec"><strong>ROLE:</strong> {showcase.role}</div>
        <div className="spec"><strong>STACK:</strong> {showcase.tech}</div>
      </aside>

      Want to learn more?
      <section id ="contact" style={{marginBottom: '60px'}}>
            <button className="btn" style={{ marginTop: '10px' }} onClick={() => window.location.hash = '#/CONTACT'}>
        GET_IN_TOUCH
      </button>
      {showcase.hasCaseStudy && (
        <button id="Case_Study" className="btn" style={{ marginTop: '10px' }} onClick={() => window.location.hash =`#/CASE_STUDY/${id}`}>
        READ_CASE_STUDY
      </button>
      )}
      </section>

      <section className="technical-body" dangerouslySetInnerHTML={{ __html: showcase.content }} />

      <footer className="showcase-footer">
        <a href={`#/TECH_SHOWCASE`} className="return-link">// RETURN_TO_GALLERY</a>
      </footer>
    </article>
  );
};