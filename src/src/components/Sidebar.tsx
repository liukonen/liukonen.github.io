export default function Sidebar({ currentRoute }) {
  const isActive = (path) => currentRoute.includes(path) ? 'active' : '';

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

        </ul>
        <ul>
          <li><a href="#/" className={currentRoute === '#/' ? 'active' : ''}><span className="line"></span>/ HOME</a></li>
          <li><a href="#/TECH_SHOWCASE" className={isActive('SHOWCASE')}><span className="line"></span>/ SHOWCASE</a></li>
          <li><a href="#/ARTICLES" className={isActive('CONTENT')}><span className="line"></span>/ WRITEUPS</a></li>
          <li><a href="#/THE_LAB_PROJECTS" className={isActive('THE_LAB')}><span className="line"></span>/ OPEN_SOURCE</a></li>
          <li><a href="#/ERA" className={isActive('ERA')}><span className="line"></span>/ CAREER</a></li>
          <li><a href="#/CONTACT" className={isActive('CONTACT')}><span className="line"></span>/ CONTACT</a></li>
          <li><a href="#/ARCHIVE" className={isActive('ARCHIVE')}><span className="line"></span>/ WAYBACK</a></li>
        </ul>
      </nav>
      <div className="social-links">
        <a href="https://github.com/liukonen" target="_blank"><i class="bi bi-github" title="Github"></i></a>
        <a href="https://linkedin.com/in/lukeliukonen" target="_blank"><i class="bi bi-linkedin" title="LinkedIn"></i></a>
        <a href="https://dev.to/liukonen" target="_blank"><i class="bi bi-code-slash" title="Dev.to"></i></a>
      </div>
    </aside>
  );
}