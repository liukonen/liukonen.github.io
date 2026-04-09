import { useState } from 'preact/hooks';
import portfolioData from '../data/portfolio.json'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

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

      {/* --- LINKS LIST --- */}
      <div className={`nav-links ${isOpen ? 'show' : ''}`}>
        <a href="#/" onClick={() => setIsOpen(false)}>— / HOME</a>
        {portfolioData.sidebar.map((item, index) => (
          <a href={item.path} onClick={() => setIsOpen(false)} className={'top-buffer-40'}>— / {item.id}</a>
        ))}
      </div>
    </nav>
  );
}