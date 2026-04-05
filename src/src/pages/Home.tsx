import { h } from 'preact';
import portfolioData from '../data/portfolio.json';
import  HomeArticles  from './HomeArticles';


export default function Home() {
  const { profile, eras, labs } = portfolioData;

  return (
    <div className="page-layer">
      <div className="breadcrumb">~/</div>
      
      {/* --- HERO SECTION --- */}
      <section id="about" style={{ marginBottom: '80px' }}>
        <p style={{ marginTop: '20px', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          Hi, I’m Luke. I’m a Software Engineer and Technical Lead with 20 years of experience.
        </p>
        <p style={{ marginTop: '20px', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          I specialize in the "invisible" side of tech: the infrastructure, automation, and system design that makes software stable and scalable. I’ve held Senior roles across different tech stacks, but my goal is always the same: translate high-level business goals into a technical reality that actually works.
        </p>
        <p style={{ marginTop: '20px', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          How I add value:
          <ul>
            <li> I design for the long term. I focus on clean architecture and proactive monitoring so systems don't become "technical debt" in two years.</li>
            <li> I bridge the gap. Because of my background as a technical educator, I’m able to explain complex system designs to executives and junior devs alike.</li>
            <li> I lead through mentorship. I believe the best way to scale a system is to scale the people building it. I use my teaching experience to mentor engineers and drive cross-team standards that raise the bar for the entire department.</li>
            <li> I lead with AI. I’m currently driving AI adoption to modernize how we work and build.</li>
          </ul>
        </p>
        <p style={{ marginTop: '20px', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          Personal: I’m a Milwaukee native who loves local music and biking. I’m also a big believer in using tech for good—I’ve been contributing computing power to scientific research projects for years.
        </p>
      </section>

      {/* --- SHOWCASE  SECTIONS --- */}
      <section id="showcase" style={{ marginBottom: '100px' }}>
        <a href={'#/TECH_SHOWCASE'} style={{ textDecoration: 'none' }}>
          <span className="section-label">~/ SHOWCASE_IN_PROGRESS </span>
        </a>
        <p>I’m currently curating a set of case studies that reflect my work in system design, infrastructure, and technical leadership.</p>
        <p>In the meantime, my Lab projects and writing offer a good view into how I think and build.</p>
      </section>

      {/* --- WRITEUPS SECTION --- */}
      <section id="writeups" style={{ marginBottom: '100px' }}>
                <span className="section-label">
          ~/ RECENT_WRITEN_ARTICLES
        </span>
        <HomeArticles />
          <div style={{ marginTop: '10px' }}>
          <a href={'#/ARTICLES'} style={{ textDecoration: 'none' }} className="section-label interactive-link">
            <span class="bi bi-box-arrow-up-right">View More</span> 
          </a>
        </div>
      </section>

      {/* --- FEATURED LABS SECTION --- */}
      <section id="featured-labs"  style={{ marginBottom: '100px' }}>
        <span className="section-label"> ~/ OPEN_SOURCE_PROJECTS</span>
        <div className="grid-2">
          {/* We take the first 2 projects from the labs object */}
          {Object.entries(labs).slice(0, 4).map(([id, project]) => (
            <a href={`#/THE_LAB_PROJECTS/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card" key={id}>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: 'var(--brass-muted)' }}>
                // PROJ_{id.toUpperCase()}
              </span>
              <h4 style={{ marginTop: '10px' }}>{project.title}</h4>
              <p>{project.description}</p>
              <div style={{ marginTop: '15px' }}>
                {project.tech.slice(0, 3).map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
            </a>
          ))}
          </div>
        <div style={{ marginTop: '10px' }}>
          <a href={'#/THE_LAB_PROJECTS'} style={{ textDecoration: 'none' }} className="section-label interactive-link">
            <span class="bi bi-box-arrow-up-right">View More</span> 
          </a>
        </div>
      </section>

      {/* --- ERAS SECTION (The Career Log) --- */}
      <section id="eras" style={{ marginBottom: '100px' }}>
        <span className="section-label">~/ RECENT_CAREER</span>
        {eras.slice(0, 3).map((era) => (
          <EraEntry key={era.id} era={era} />
        ))}
        <div style={{ marginTop: '10px' }}>
          <a href={'#/ERA'} style={{ textDecoration: 'none' }} className="section-label interactive-link">
            <span class="bi bi-box-arrow-up-right">View More</span> 
          </a>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id ="contact">
            <button className="btn" style={{ marginTop: '60px' }} onClick={() => window.location.hash = '#/CONTACT'}>
        GET_IN_TOUCH
      </button>
      </section>
      
      <footer>&copy; 2026 {profile.brand} // SYSTEM_READY

      <p>Thanks to Google Gemini and OpenAI Copilot for the assist in content writup, proofreading, 
      and styling. Also thank you to <a href="https://brittanychiang.com/">Brittany Chaing</a> for 
      the inspiration. While I dont know Brittany personally, 
      I drew a lot from the site design and flow! </p>

      </footer>
    </div>
  );
}

const EraEntry = ({ era }) => (
  <a href={`#/ERA/${era.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
    <div className="card" key={era.id}>    
      <span style={{ fontFamily: 'JetBrains Mono', fontSize: '1.6rem', color: 'var(--brass-muted)' }}>// {era.company.toUpperCase()}</span>
      <h4 style={{ marginTop: '10px' }}>{era.title}</h4>
      <p>{era.role}</p>
      <div style={{ marginTop: '15px' }}>
        {era.tech.map(t => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
    </div>
  </a>
);
 