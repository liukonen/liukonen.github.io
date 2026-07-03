import { useState } from 'preact/hooks'
import { lazy, Suspense } from 'preact/compat'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const LazyNavLinks = lazy(() => import('./NavBarLinks'))

  return (
    <nav className="l-nav-container">
      {/* --- MOBILE TOP BAR --- */}
      <div className="l-mobile-topbar">
        <span className="c-nav-brand">Liukonen.dev</span>
        <button 
          className="c-hamburger" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? '[ x ]' : '[ = ]'}
        </button>
      </div>
      {isOpen && (
        <Suspense fallback={null}>
          <LazyNavLinks onClose={() => setIsOpen(false)} />
        </Suspense>
      )}
    </nav>
  )
}