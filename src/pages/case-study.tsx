import { useState, useEffect } from 'preact/hooks';
import Breadcrumb from '../components/Breadcrumb';

export const CaseStudy = ({ id }) => {
  const [study, setStudy] = useState(null);

  useEffect(() => {
    fetch(`/case-studies/${id}.json`).then(r => r.json()).then(setStudy);
    window.scrollTo(0, 0);
  }, [id]);

  if (!study) return <div className="loader">// DECRYPTING_TECHNICAL_LOGS...</div>;

  return (
    <article className="case-study-view page-layer">
      <header className="study-header">
        <Breadcrumb path={`#/CASE_STUDIES/${id}`} />
        <h1>{study.title}</h1>
        <div className="impact-callout">RESULT: {study.impact}</div>
      </header>

      <aside className="tech-specs">
        <div className="spec"><strong>LEADERSHIP:</strong> {study.role}</div>
        <div className="spec"><strong>INFRASTRUCTURE:</strong> {study.tech}</div>
      </aside>

      <section className="technical-body" dangerouslySetInnerHTML={{ __html: study.content }} />

      <footer className="case-footer">
        <a href={`#/TECH_SHOWCASE/${id}`} className="return-link btn">// EXIT_TO_SUMMARY</a>
      </footer>
    </article>
  );
};