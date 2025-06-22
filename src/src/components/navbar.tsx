import { FunctionalComponent } from 'preact'
import { useState, useEffect } from 'preact/hooks'

interface MenuItem {
  name: string
  value: string
}

interface NavbarProps {
  menuItems: MenuItem[]
}

const Navbar: FunctionalComponent<NavbarProps> = ({ menuItems }) => {
  const [currentPath, setCurrentPath] = useState('')

  useEffect(() => {
    // get current path without leading slash, fallback to 'index.html'
    const path = window.location.pathname.substring(1).toLowerCase() || 'index.html'
    setCurrentPath(path)
  }, [])

  const validatePath = (path: string) => (path === currentPath ? 'active' : '')

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark RoundedBottom">
      <div className="container-fluid">
        <a className="navbar-brand" href="#" aria-label="welcome">
          <img
            src="./img/favicons/favicon-32x32.png"
            alt="logo"
            style={{ paddingLeft: '12px' }}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="navItem">
            {menuItems.map(({ name, value }) => (
              <li key={value} className={validatePath(value)}>
                <a className="nav-link" href={value}>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
