import { useEffect, useState } from 'preact/hooks'
import portfolioData from '../data/portfolio.json'
import { parseRoute } from '../routes'
import { requestHomeSection } from '../services/homeNavigation'

const homeSectionByPath: Record<string, string> = {
  '': 'about',
  TECH_SHOWCASE: 'showcase',
  ARTICLES: 'writeups',
  OPEN_SOURCE_PROJECTS: 'featured-labs',
  ERA: 'eras',
  CONTACT: 'contact'
}

export default function SidebarLinks({ currentRoute }: Readonly<{currentRoute: string}>) {
  const { path: currentPath } = parseRoute(currentRoute)
  const isHomeRoute = currentPath === ''
  const [scrollPath, setScrollPath] = useState('')
  const links = [{ label: 'Home', path: '#/' }, ...portfolioData.sidebar]

  useEffect(() => {
    if (!isHomeRoute) {
      setScrollPath('')
      return
    }

    const main = document.querySelector<HTMLElement>('.l-scroll-y')
    const desktop = window.matchMedia('(min-width: 1101px)')
    if (!main) return

    const sections = [
      { id: 'about', path: '' },
      { id: 'showcase', path: 'TECH_SHOWCASE' },
      { id: 'writeups', path: 'ARTICLES' },
      { id: 'featured-labs', path: 'OPEN_SOURCE_PROJECTS' },
      { id: 'eras', path: 'ERA' },
      { id: 'contact', path: 'CONTACT' }
    ]
    let frame = 0

    const updateActiveSection = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (!desktop.matches) return
        const atBottom = main.scrollTop + main.clientHeight >= main.scrollHeight - 3
        if (atBottom) {
          setScrollPath('CONTACT')
          return
        }
        const marker = main.getBoundingClientRect().top + Math.min(180, main.clientHeight * 0.22)
        let active = sections[0]

        for (const section of sections) {
          const element = document.getElementById(section.id)
          if (element && element.getBoundingClientRect().top <= marker) active = section
        }

        setScrollPath(active.path)
      })
    }

    const observer = new MutationObserver(updateActiveSection)
    observer.observe(main, { childList: true, subtree: true })
    main.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    updateActiveSection()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      main.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [isHomeRoute])

  const activePath = isHomeRoute ? scrollPath : currentPath

  return (
    <nav className="l-nav-links" aria-label="Primary navigation">
      <ul className="sidebar-ul">
        {links.map(({ label, path }) => {
          const isActive = activePath === parseRoute(path).path
          const targetSection = homeSectionByPath[parseRoute(path).path]
          return (
            <li className="sidebar-li" key={path}>
              <a
                href={path}
                className={isActive ? 'active' : undefined}
                aria-current={isActive ? 'location' : undefined}
                onClick={event => {
                  if (!targetSection || !window.matchMedia('(min-width: 1101px)').matches) return
                  event.preventDefault()
                  setScrollPath(parseRoute(path).path)

                  const target = document.getElementById(targetSection)
                  if (target) {
                    target.scrollIntoView({ block: 'start', behavior: 'smooth' })
                    return
                  }

                  requestHomeSection(targetSection)
                  if (currentPath !== '' && currentPath !== 'CONTACT') location.hash = '#/'
                }}
              >
                <span className="line" aria-hidden="true" />{label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
