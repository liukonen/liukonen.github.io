import CodeSlash from '~icons/bi/code-slash'
import Github from '~icons/bi/github'
import Linkedin from '~icons/bi/linkedin'
import { lazy, Suspense } from 'preact/compat'
import useIsMobile from '../services/isMobile'

export default function Sidebar({ currentRoute }: Readonly<{ currentRoute: string }>) {
  
  const isMobileDevice = useIsMobile()

  const SidebarLinks = lazy(() => import('./SidebarLinks'))

  return (
    <aside className="sidebar">
      <div className="brand-logo">Liukonen.dev</div>
      <img src="/profile_image.webp" alt="Luke Liukonen" className="profile-img" fetchpriority="high" decoding="async" />
      
      <div className="hero-intro">
        <h1>Luke Liukonen</h1>
        <p className="subtitle">Senior Software Engineer // Technical Lead // AI Strategy // Infrastructure</p>
      </div>

      {!isMobileDevice && (
      <Suspense fallback={null}>
        <SidebarLinks currentRoute={currentRoute} />
      </Suspense>
      )}
      <div className="social-links">
        <a href="https://github.com/liukonen" target="_blank"><Github /></a>
        <a href="https://linkedin.com/in/lukeliukonen" target="_blank"><Linkedin /></a>
        <a href="https://dev.to/liukonen" target="_blank"><CodeSlash /></a>
      </div>
    </aside>
  )
}