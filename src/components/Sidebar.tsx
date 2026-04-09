import CodeSlash from '~icons/bi/code-slash'
import Github from '~icons/bi/github'
import Linkedin from '~icons/bi/linkedin'
import portfolioData from '../data/portfolio.json'


export default function Sidebar({ currentRoute }) {
  const isActive = (path) => {
    console.log(currentRoute, path, currentRoute.includes(path))
    return currentRoute.includes(path) ? 'active' : ''
  }

  console.log(portfolioData.sidebar)

  return (
    <aside className="sidebar">
      <div className="brand-logo">Liukonen.dev</div>
      <img src="/profile_image.webp" alt="Luke Liukonen" className="profile-img" />
      
      <div className="hero-intro">
        <h1>Luke Liukonen</h1>
        <p className="subtitle">Senior Software Engineer // Technical Lead :: AI Strategy :: Infrastructure</p>
      </div>

      <nav className="nav-links">
        <ul>
          <li><a href="#/" className={currentRoute === '#/' ? 'active' : ''}><span className="line"></span>/ HOME</a></li>
          {portfolioData.sidebar.map((item, index) => (
            <li><a href={item.path} className={isActive(item.path)}><span className="line"></span>/ {item.id}</a></li>
          ))}
        </ul>
      </nav>
      <div className="social-links">
        <a href="https://github.com/liukonen" target="_blank"><Github /></a>
        <a href="https://linkedin.com/in/lukeliukonen" target="_blank"><Linkedin /></a>
        <a href="https://dev.to/liukonen" target="_blank"><CodeSlash /></a>
      </div>
    </aside>
  );
}