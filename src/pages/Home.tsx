import ArchiveIcon from "~icons/bi/archive"

import portfolioData from "../data/portfolio.json"
import aboutData from "../data/about.json"
import footerData from "../data/footer.json"
import Breadcrumb from "../components/Breadcrumb"
import CareerSection from "../components/CareerSection"
import OpenSourceSection from "../components/OpenSourceSection"
import ArticlesSection from "../components/ArticlesSection"
import ShowcaseSection from "../components/ShowcaseSection"
import ContactSection from "../components/ContactSection"

export default function Home({ contactHash }: Readonly<{ contactHash?: string }>) {
  const { profile, eras, labs } = portfolioData
  return (
    <div className="home-content">
      <Breadcrumb path="#/" />

      {/* --- ABOUT SECTION --- */}

      <section
        id="about"
        className={"prose-engine"}
        dangerouslySetInnerHTML={{ __html: aboutData.content }}
      />
      <div className="home-tag-key" aria-label="Technology tag key">
        <span className="home-tag-key-label">Tag key</span>
        <span className="tag c-topic-tag c-topic-tag--concept">Architectural Concept / Role</span>
        <span className="tag c-topic-tag">Concrete Tech / Runtime</span>
      </div>
      <ShowcaseSection />
      <ArticlesSection />
      <OpenSourceSection repos={labs} />
      <CareerSection eras={eras} />
      <ContactSection contactHash={contactHash} />

      <footer className="site-colophon">
        &copy; 2026 {profile.brand} // Liukonen.dev
        <section
          className={"prose-engine "}
          id="footer"
          dangerouslySetInnerHTML={{ __html: footerData.content }}
        />
        <a className="c-archive-link" href="#/archive" aria-label="Archive" title="Archive">
          <ArchiveIcon aria-hidden="true" />
        </a>
      </footer>
    </div>
  )
}
