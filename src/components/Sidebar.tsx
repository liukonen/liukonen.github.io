import CodeSlash from '~icons/bi/code-slash'
import Github from '~icons/bi/github'
import Linkedin from '~icons/bi/linkedin'
import { lazy, Suspense } from 'preact/compat'
import useIsMobile from '../services/isMobile'
import Activity from '~icons/bi/activity'

export default function Sidebar({ currentRoute }: Readonly<{ currentRoute: string }>) {
  
  const isMobileDevice = useIsMobile()

  const SidebarLinks = lazy(() => import('./SidebarLinks'))

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">Liukonen.dev</div>
      <img src="/profile_image.webp" alt="Luke Liukonen" className="sidebar-avatar" fetchpriority="high" loading="eager" />
      
      <div className="l-hero-intro">
        <h1 className="sidebar-title">Luke Liukonen</h1>
        <p className="sidebar-subtitle">Senior Full Stack Software Engineer // Technical Lead // AI Strategy // Infrastructure</p>
      </div>

      {!isMobileDevice && (
      <Suspense fallback={null}>
        <SidebarLinks currentRoute={currentRoute} />
      </Suspense>
      )}
      <div className="l-social-links">
        <a href="https://github.com/liukonen" target="_blank" aria-label="Luke's Github page" className="c-hud-status" data-tooltip="Github"><Github /></a>
        <a href="https://linkedin.com/in/lukeliukonen" target="_blank" aria-label="Luke's LinkedIn page" className="c-hud-status" data-tooltip="LinkedIn"><Linkedin /></a>
        <a href="https://dev.to/liukonen" target="_blank" aria-label="Luke's Dev.to page" className="c-hud-status" data-tooltip="Dev.to"><CodeSlash /></a>
        {!isMobileDevice && (
          <button
            className="c-hud-status"
            data-tooltip="System Status"
            onClick={() => globalThis.dispatchEvent(new CustomEvent("open-uptime-modal"))}
            aria-label="System Status"
          >
            <Activity />
          </button>
        )}
      </div>
    </aside>
  )
}