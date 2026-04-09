import portfolioData from '../data/portfolio.json'
import aboutData from '../data/about.json'
import footerData from '../data/footer.json'
import Breadcrumb from '../components/Breadcrumb';
import CareerSection from '../components/CareerSection';
import OpenSourceSection from '../components/OpenSourceSection';
import ArticlesSection from '../components/ArticlesSection';
import ShowcaseSection from '../components/ShowcaseSection';

export default function Home() {
  const { profile, eras, labs } = portfolioData;
  return (
    <div className="page-layer">
      <Breadcrumb path="#/" />
    

      <section id="about" dangerouslySetInnerHTML={{ __html: aboutData.content }}></section>

      {/* --- SHOWCASE  SECTIONS --- */}
      <ShowcaseSection />
      <ArticlesSection />
      <OpenSourceSection repos={labs} />
      <CareerSection eras={eras} />

      {/* --- CONTACT SECTION --- */}
      <section id ="contact" className="showcase-grid">
            <button className="btn" onClick={() => window.location.hash = '#/CONTACT'}>
        GET_IN_TOUCH
      </button>
      </section>
      
      <footer>&copy; 2026 {profile.brand} // Liukonen.dev
      <section id="footer" dangerouslySetInnerHTML={{ __html: footerData.content }}></section>
      </footer>
    </div>
  );
}
