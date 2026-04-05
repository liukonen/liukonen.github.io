import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Labs from './pages/Labs';
import LabDetail from './pages/LabDetail';
import Archive from './pages/Archive';
import Contact from './pages/Contact';
import EraDetail from './pages/EraDetail';
import Era from './pages/Era';
import Articles from './pages/Articles';
import Showcase from './pages/showcase';

export default function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');


   const renderContent = () => {
     if (route === '#/') return <Home />
     if (route === '#/THE_LAB_PROJECTS') return <Labs />
     if (route === '#/TECH_SHOWCASE') return <Showcase />
     if (route === '#/ARCHIVE') return <Archive />
     if (route === '#/ERA') return <Era />
     if (route === '#/ARTICLES') return <Articles />
     if (route.startsWith('#/THE_LAB_PROJECTS/')) {
       const id = route.split('/').pop()
       return <LabDetail id={id} />
     }
     if (route.startsWith("#/ERA/")) {
       const id = route.split('/').pop()
       return <EraDetail id={id} />
     }
     if (route === '#/CONTACT') return <Contact />;
     return <Home />;
   };

  useEffect(() => {
    const handleHash = () => {
      const newRoute = window.location.hash || '#/';
      setRoute(newRoute);

      // --- THE FIX ---
      // Reset the main window
      window.scrollTo(0, 0);

      // Reset the specific content area (since you have a sidebar layout)
      const contentArea = document.querySelector('.content-area');
      if (contentArea) {
        contentArea.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div className="app-shell">
      <Sidebar currentRoute={route} />
      <main className="content-area">
        {renderContent()}
      </main>
    </div>
  );
}