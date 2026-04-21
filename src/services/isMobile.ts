import { useEffect, useState } from 'preact/hooks';

const query = '(max-width: 1100px)'

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = matchMedia(query)

    const update = () => setIsMobile(media.matches)
    update() // Set initial value
    
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, []);

  return isMobile;
}