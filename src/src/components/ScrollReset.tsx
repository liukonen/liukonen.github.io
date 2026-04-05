import { useEffect } from 'preact/hooks';
import { useLocation } from 'preact-iso';

export const ScrollReset = () => {
  const { path } = useLocation();

  useEffect(() => {
    // 1. Reset the main window
    window.scrollTo(0, 0);

    // 2. IMPORTANT: If your layout has a scrollable <div> (like .main-content)
    // instead of the whole body scrolling, you must reset that specifically:
    const scrollContainer = document.querySelector('.content-area');
    if (scrollContainer) {
      scrollContainer.scrollTo(0, 0);
    }
  }, [path]); // Only runs when 'path' changes

  return null; // This component renders nothing; it's a "logical" component
};