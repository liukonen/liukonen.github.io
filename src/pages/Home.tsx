import { lazy, Suspense } from "preact/compat"

import portfolioData from "../data/portfolio.json"
import aboutData from "../data/about.json"
import footerData from "../data/footer.json"
import Breadcrumb from "../components/Breadcrumb"

const CareerSection = lazy(() => import("../components/CareerSection"))
const OpenSourceSection = lazy(() => import("../components/OpenSourceSection"))
const ArticlesSection = lazy(() => import("../components/ArticlesSection"))
const ShowcaseSection = lazy(() => import("../components/ShowcaseSection"))
import { LeadershipSection } from "../components/LeadershipSection"

export default function Home() {
  const { profile, eras, labs } = portfolioData
  return (
    <div>
      <Breadcrumb path="#/" />

      {/* --- ABOUT SECTION --- */}

      <section
        id="about"
        className={"markdown-engine"}
        dangerouslySetInnerHTML={{ __html: aboutData.content }}
      />
      <div class="gold-spacer" aria-hidden="true" />
      <section id="leadership">
        <LeadershipSection />
      </section>
      {/* --- SHOWCASE  SECTIONS --- */}
      <div class="gold-spacer" aria-hidden="true" />
      <Suspense fallback={null}>
        <ShowcaseSection />
      </Suspense>
      <div class="gold-spacer" aria-hidden="true" />
      <Suspense fallback={null}>
        <ArticlesSection />
      </Suspense>
      <div class="gold-spacer" aria-hidden="true" />
      <Suspense fallback={null}>
        <OpenSourceSection repos={labs} />
      </Suspense>
      <div class="gold-spacer" aria-hidden="true" />
      <Suspense fallback={null}>
        <CareerSection eras={eras} />
      </Suspense>
        <div class="gold-spacer" aria-hidden="true"></div>
      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="showcase-grid">
        <button className="btn" onClick={() => (location.hash = "#/CONTACT")}>
          GET_IN_TOUCH
        </button>
      </section>

      <footer>
        &copy; 2026 {profile.brand} // Liukonen.dev
        <section
          className={"markdown-engine "}
          id="footer"
          dangerouslySetInnerHTML={{ __html: footerData.content }}
        />
      </footer>
    </div>
  )
}
