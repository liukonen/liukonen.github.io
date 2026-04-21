import { useState } from 'preact/hooks'
import { lazy, Suspense } from 'preact/compat'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const LazyNavLinks = lazy(() => import('./NavBarLinks'))

  return (
    <nav className="nav-container">
      {/* --- MOBILE TOP BAR --- */}
      <div className="mobile-top-bar">
        <span className="brand">Liukonen.dev</span>
        <button 
          className="hamburger" 
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