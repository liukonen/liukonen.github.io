import { useState, useEffect } from 'preact/hooks'
import Breadcrumb from '../components/Breadcrumb'

export default function CaseStudy({ id }) {
  const [study, setStudy] = useState(null)

  useEffect(() => {
    fetch(`/case-studies/${id}.json`).then(r => r.json()).then(setStudy)
    window.scrollTo(0, 0)
  }, [id])

  if (!study) return <div>// DECRYPTING_TECHNICAL_LOGS...</div>

  return (
    <article className="case-study-view">
      <header className="study-header">
        <Breadcrumb path={`#/CASE_STUDIES/${id}`} />
        <h1>{study.title}</h1>
        <div>RESULT: {study.impact}</div>
      </header>

      <aside className="tech-specs">
        <div className="spec"><strong>LEADERSHIP:</strong> {study.role}</div>
        <div className="spec"><strong>INFRASTRUCTURE:</strong> {study.tech}</div>
      </aside>

      <section className="technical-body" dangerouslySetInnerHTML={{ __html: study.content }} />

      <footer>
        <a href={`#/TECH_SHOWCASE/${id}`} className="c-btn">// EXIT_TO_SUMMARY</a>
      </footer>
    </article>
  )
}