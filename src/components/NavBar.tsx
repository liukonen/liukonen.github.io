import { useState } from 'preact/hooks'
import { lazy, Suspense } from 'preact/compat'

const LazyNavLinks = lazy(() => import('./NavBarLinks'))

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="l-nav-container" aria-label="Primary navigation">
      {/* --- MOBILE TOP BAR --- */}
      <div className="l-mobile-topbar">
        <span className="c-nav-brand">Liukonen.dev</span>
        <button 
          className="c-hamburger" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
          aria-controls="mobile-nav-links"
          type="button"
        >
          {isOpen ? '[ x ]' : '[ = ]'}
        </button>
      </div>
      <div id="mobile-nav-links" hidden={!isOpen}>
        {isOpen && (
          <Suspense fallback={null}>
            <LazyNavLinks onClose={() => setIsOpen(false)} />
          </Suspense>
        )}
      </div>
    </nav>
  )
}
