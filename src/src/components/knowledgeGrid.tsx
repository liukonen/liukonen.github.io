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
    <div className="container">
      <div className="container" id="Knowledge">
        <h3 className="text-center h3 tshadow mt-5">
          Systems / Ideas I've worked with
        </h3>
        <div className="row justify-content-center g-4 mt-4">
          {items.map((category, idx) => (
            category.items.map((item, idx) =>(
               <div className="col-6 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center" key={item.title}>

                <div 
                className={`skill-card  flex-fill ${item.level >= 2 ? 'gold' : 'silver'} d-flex flex-column align-items-center justify-content-center text-cente`}>
                <LazyImage src={item.img} alt={item.title} />
                <p>{item.title}</p>
            </div></div>
            ))
          ))}
        </div>
        <p>Gold - Worked with professionally for years. Silver, worked with as a hobby or not professionally.</p>
      </div>
    </div>
  )

}

export default KnowledgeGrid
