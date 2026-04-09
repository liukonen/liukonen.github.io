import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import OpenSourceProjects from './pages/OpenSourceProjects';
import LabDetail from './pages/LabDetail';
import Archive from './pages/Archive';
import Contact from './pages/Contact';
import EraDetail from './pages/EraDetail';
import Era from './pages/Era';
import Articles from './pages/Articles';
import Showcase from './pages/showcase'; 
import { ShowcaseDetail}from './pages/ShowcaseDetail';
import { CaseStudy } from './pages/case-study';
import  CaseStudies from './pages/CaseStudies';
import { Navigation  } from './components/NavBar';

export default function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');


   const renderContent = () => {
    console.log("Current Route:", route); // Debug log to verify current route
     if (route === '#/') return <Home />
     if (route === '#/OPEN_SOURCE_PROJECTS') return <OpenSourceProjects />
     if (route === '#/TECH_SHOWCASE') return <Showcase />
     if (route === '#/ARCHIVE') return <Archive />
     if (route === '#/ERA') return <Era />
     if (route === '#/ARTICLES') return <Articles />
     if (route.startsWith('#/OPEN_SOURCE_PROJECTS/')) {
       const id = route.split('/').pop()
       return <LabDetail id={id} />
     }
     if (route === "#/CASE_STUDIES") {
       return <CaseStudies />;
     }
     if (route.startsWith("#/ERA/")) {
       const id = route.split('/').pop()
       return <EraDetail id={id} />
     }
     if (route.startsWith('#/CASE_STUDIES/')) {
       const id = route.split('/').pop()
       return <CaseStudy id={id} />
     }
     if (route.startsWith('#/TECH_SHOWCASE/')) {
       const id = route.split('/').pop()
       console.log("Showcase ID:", id); // Debug log to verify ID extraction
       return <ShowcaseDetail id={id} />
     }
     if (route === '#/CONTACT') return <Contact />;
     return <Home />;
   };

  useEffect(() => {
    const handleHash = () => {
      const newRoute = window.location.hash || '#/';
      
      // Scroll to top with instant behavior (no visible travel)
      window.scrollTo({ top: 0, behavior: 'instant' });

      // Reset the specific content area (since you have a sidebar layout)
      const contentArea = document.querySelector('.content-area');
      if (contentArea) {
        contentArea.scrollTo({ top: 0, behavior: 'instant' });
      }

      setRoute(newRoute);
    };

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div className="app-shell">
      <Navigation />
      <Sidebar currentRoute={route} />
      <main className="content-area page-transition" key={route}>
        {renderContent()}
      </main>
    </div>
  );
}