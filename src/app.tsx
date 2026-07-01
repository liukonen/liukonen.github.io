import { useState, useEffect } from 'preact/hooks'
import { lazy, Suspense } from 'preact/compat'
import Sidebar from './components/Sidebar'
import { Navigation } from './components/NavBar'
import isMobile from './services/isMobile'
import UptimeModal from './components/UptimeModal'

const Home = lazy(() => import('./pages/Home'))
const OpenSourceProjects = lazy(() => import('./pages/OpenSourceProjects'))
const LabDetail = lazy(() => import('./pages/LabDetail'))
const Archive = lazy(() => import('./pages/Archive'))
const Contact = lazy(() => import('./pages/Contact'))
const EraDetail = lazy(() => import('./pages/EraDetail'))
const Era = lazy(() => import('./pages/Era'))
const Articles = lazy(() => import('./pages/Articles'))
const Showcase = lazy(() => import('./pages/showcase'))
const CaseStudies = lazy(() => import('./pages/CaseStudies'))
const ShowcaseDetail = lazy(() => import('./pages/ShowcaseDetail'))
const CaseStudy = lazy(() => import('./pages/case-study'))


export default function App() {
  const [route, setRoute] = useState(location.hash || '#/')

  const routes = {
    '/': Home,
    '/OPEN_SOURCE_PROJECTS': OpenSourceProjects,
    '/TECH_SHOWCASE': Showcase,
    '/ARCHIVE': Archive,
    '/ERA': Era,
    '/ARTICLES': Articles,
    '/CASE_STUDIES': CaseStudies,
    '/CONTACT': Contact,
   }

   const parseRoute = (route:string) => {
    const clean = route.replace('#', '')
    const parts = clean.split('/').filter(Boolean)

    return {
      path: parts[0] || '',
      param: parts[1] || null,
      full: clean
    }
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
    const { path, param } = parseRoute(route)
    const dynamic = matchDynamic(path, param)
    if (dynamic) return dynamic
    const Page = routes[`/${path}` as keyof typeof routes] || Home
    return <Page />


   }
  useEffect(() => {
    const contentArea = document.querySelector('.content-area')
    
    const handleHash = () => {

      const newRoute = location.hash || '#/'
      window.scrollTo(0, 0)

      contentArea?.scrollTo(0,0)
      setRoute(newRoute)
    }

    addEventListener('hashchange', handleHash)
    return () => removeEventListener('hashchange', handleHash)
  }, [])

  const isMobileDevice = isMobile()

  return (
    <div className="app-shell">
      {isMobileDevice  && <Navigation />}
      
      <Sidebar currentRoute={route} />
      <main className="content-area" key={route}>
        <Suspense fallback={null}>
        {renderContent()}
        </Suspense>
        <UptimeModal />
      </main>
    </div>
  )
}