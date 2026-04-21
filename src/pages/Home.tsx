import { lazy, Suspense } from 'preact/compat'

import portfolioData from '../data/portfolio.json'
import aboutData from '../data/about.json'
import footerData from '../data/footer.json'
import Breadcrumb from '../components/Breadcrumb'

const CareerSection = lazy(() => import('../components/CareerSection'))
const OpenSourceSection = lazy(() => import('../components/OpenSourceSection'))
const ArticlesSection = lazy(() => import('../components/ArticlesSection')) 
const ShowcaseSection = lazy(() => import('../components/ShowcaseSection')) 

export default function Home() {
  const { profile, eras, labs } = portfolioData
  return (
    <div className="page-layer">
      <Breadcrumb path="#/" />
    

      <section id="about" className={"markdown-engine"} dangerouslySetInnerHTML={{ __html: aboutData.content }}></section>

      {/* --- SHOWCASE  SECTIONS --- */}
      <Suspense fallback={null}>
        <ShowcaseSection />
      </Suspense>
      <Suspense fallback={null}>
        <ArticlesSection />
      </Suspense>
      <Suspense fallback={null}>
        <OpenSourceSection repos={labs} />
      </Suspense>
      <Suspense fallback={null}>
        <CareerSection eras={eras} />
      </Suspense>
      {/* --- CONTACT SECTION --- */}
      <section id ="contact" className="showcase-grid">
            <button className="btn" onClick={() => location.hash = '#/CONTACT'}>
        GET_IN_TOUCH
      </button>
      </section>
      
      <footer>&copy; 2026 {profile.brand} // Liukonen.dev
      <section className={"markdown-engine "} id="footer" dangerouslySetInnerHTML={{ __html: footerData.content }}></section>
      </footer>
    </div>
  )
}
