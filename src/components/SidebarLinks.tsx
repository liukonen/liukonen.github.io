import portfolioData from '../data/portfolio.json'

export default function SidebarLinks({ currentRoute }: Readonly<{currentRoute: string}>) {
  const isActive = (path: Readonly<string>) => {
    return currentRoute.includes(path) ? 'active' : ''
  }

    return (
        <nav className="l-nav-links">
        <ul className="sidebar-ul">
          <li className="sidebar-li"><a href="#/" className={currentRoute === '#/' ? 'active' : ''}><span className="line"></span>/ HOME</a></li>
          {portfolioData.sidebar.map((item, index) => (
            <li className="sidebar-li"><a href={item.path} className={isActive(item.path)}><span className="line"></span>/ {item.id}</a></li>
          ))}
        </ul>
      </nav>
    )
}