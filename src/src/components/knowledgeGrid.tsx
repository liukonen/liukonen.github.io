import { FunctionalComponent, JSX } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

interface Item {
  img: string
  title: string
  level: number
  link: string
}

interface Category {
  name: string
  items: Item[]
}

interface KnowledgeGridProps {
  items: Category[]
}

const LazyImage: FunctionalComponent<{
  src: string
  alt: string
  style?: JSX.CSSProperties
}> = ({ src, alt, style }) => {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <img
      ref={imgRef}
      src={visible ? src : ''}
      alt={alt}
      style={style}
      loading="lazy"
    />
  )
}

const getPill = (item: Item) =>
  item.level > 1
    ? 'badge badge-pill bg-primary bg-purple text-white'
    : 'badge badge-pill bg-success text-white'

const getName = (item: Item) => (item.level > 1 ? 'Pro' : 'Hobby')

const KnowledgeGrid: FunctionalComponent<KnowledgeGridProps> = ({ items }) => {
    return (
    <div className="container glass">
      <div className="container" id="Knowledge">
        <h3 className="text-center h3 tshadow mt-5">
          Systems / Ideas I've worked with
        </h3>
        <div className="list-group shadow mt-5 whiteGlassCardWithLinks">
          {items.map((category, idx) => (
            <div
              className="d-flex justify-content-between align-items-center py-2"
              key={idx}
            >
              <span className="font-weight-bold"><h6>{category.name}</h6></span>
              <span>
                {category.items.map((item, i) => (
                  <span key={i} className="em">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mx-1"
                    >
                      <em>
                      {item.title}</em>
                      </a>
                    {i < category.items.length - 1 && ', '}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

}

export default KnowledgeGrid
