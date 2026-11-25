import { useState, useEffect } from 'preact/hooks'
import { lazy, Suspense } from 'preact/compat'
import Sidebar from './components/Sidebar'
import { Navigation } from './components/NavBar'
import isMobile from './services/isMobile'
import UptimeModal from './components/UptimeModal'
import {ImageModal} from './components/ImageModal'
import { parseRoute } from './routes'

const Home = lazy(() => import('./pages/Home'))
const OpenSourceProjects = lazy(() => import('./pages/OpenSourceProjects'))
const LabDetail = lazy(() => import('./pages/LabDetail'))
const Archive = lazy(() => import('./pages/Archive'))
const EraDetail = lazy(() => import('./pages/EraDetail'))
const Era = lazy(() => import('./pages/Era'))
const Articles = lazy(() => import('./pages/Articles'))
const Showcase = lazy(() => import('./pages/showcase'))
const CaseStudies = lazy(() => import('./pages/CaseStudies'))
const ShowcaseDetail = lazy(() => import('./pages/ShowcaseDetail'))
const CaseStudy = lazy(() => import('./pages/case-study'))


export default function App() {
  const [route, setRoute] = useState(location.hash || '#/')
  const [modalSrc, setModalSrc] = useState<string | null>(null)
  const { path, param } = parseRoute(route)
  const isContactRoute = path === 'CONTACT' && !param

  const routes = {
    '/': Home,
    '/OPEN_SOURCE_PROJECTS': OpenSourceProjects,
    '/TECH_SHOWCASE': Showcase,
    '/ARCHIVE': Archive,
    '/ERA': Era,
    '/ARTICLES': Articles,
    '/CASE_STUDIES': CaseStudies,
   }

   const matchDynamic = (path: string, param: string | null) => {
    if (path === 'OPEN_SOURCE_PROJECTS' && param) return <LabDetail id={param} />
    if (path === 'ERA' && param) return <EraDetail id={param} />
    if (path === 'CASE_STUDIES' && param) return <CaseStudy id={param} />
    if (path === 'TECH_SHOWCASE' && param) {
      return <ShowcaseDetail id={param} /> 
    }
    return null
   }

   
   const renderContent = () => {
    if (isContactRoute) return <Home contactHash={route} />
    const dynamic = matchDynamic(path, param)
    if (dynamic) return dynamic
    const Page = routes[`/${path}` as keyof typeof routes] || Home
    return <Page />


   }
  // const handleContentClick = (e: MouseEvent) => {
  //   const target = e.target as HTMLElement
    
  //   // Only target images that specifically have the Architecture Diagram alt text
  //   const mediaTarget = target.closest('img[alt="Architecture Diagram"]')
    
  //   if (mediaTarget) {
  //     const src = mediaTarget.getAttribute('src')
  //     if (src) {
  //       setModalSrc(src)
  //     }
  //   }
  // }
  useEffect(() => {
    const handleDiagramOpen = (e: CustomEvent) => {
      if (e.detail) setModalSrc(e.detail)
    }

    globalThis.addEventListener('open-diagram', handleDiagramOpen as EventListener)
    
    return () => {
      globalThis.removeEventListener('open-diagram', handleDiagramOpen as EventListener)
    }
  }, [])
  useEffect(() => {
    const handleHash = () => {
      const newRoute = location.hash || '#/'
      const next = parseRoute(newRoute)
      if (next.path !== 'CONTACT' || next.param) {
        const top: ScrollToOptions = { top: 0, behavior: 'instant' }
        window.scrollTo(top)
        document.querySelector('.l-scroll-y')?.scrollTo(top)
      }
      setRoute(newRoute)
    }

    addEventListener('hashchange', handleHash)
    return () => removeEventListener('hashchange', handleHash)
  }, [])

  const isMobileDevice = isMobile()

  return (
    <div className="l-shell">
      {isMobileDevice  && <Navigation />}
      
      <Sidebar currentRoute={route} />
      <main className={`l-scroll-y${path === '' || isContactRoute ? ' l-scroll-home' : ''}`} key={isContactRoute ? '#/' : route}>
        <Suspense fallback={null}>
        {renderContent()}
        </Suspense>
        <UptimeModal />
        <ImageModal src={modalSrc} onClose={() => setModalSrc(null)} />
      </main>
    </div>
  )
}
