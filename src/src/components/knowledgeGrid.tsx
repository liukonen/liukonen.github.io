import { FunctionalComponent, JSX } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

interface Item {
  img: string
  title: string
  level: number
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
        <div className="row text-dark mt-5" id="vbackend">
          {items.map((category, idx) => (
            <div className="col-md-4" key={idx}>
              <ul className="list-group shadow ml-2 mt-4 whiteGlass">
                <li className="list-group-item list-group-item-dark">
                  {category.name}
                </li>

                {category.items.map((item, i) => (
                  <li
                    className="list-group-item pane d-flex justify-content-between align-items-center"
                    key={i}
                  >
                    <div className="image-parent">
                      <LazyImage
                        src={item.img}
                        alt={item.title}
                        style={{ width: '32px' }}
                      />
                    </div>
                    {item.title}
                    
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default KnowledgeGrid
