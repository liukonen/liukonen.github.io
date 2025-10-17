import { FunctionalComponent } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

interface JobLocation {
  img: string
  name: string
  title: string
  timeworked: string
  summary: string
}

interface WorkplacesProps {
  items: JobLocation[]
}

// Simple lazy-load component
const LazyImage: FunctionalComponent<{
  src: string
  alt: string
  className?: string
  title?: string
}> = ({ src, alt, className, title }) => {
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
      className={className}
      loading="lazy"
      title={title}
    />
  )
}

const Workplaces: FunctionalComponent<WorkplacesProps> = ({ items }) => {
  return (
    <div class="container">
    <div
          className="row justify-content-md-center mt-3"
    >
      {items.map((jobLocation) => (
        
          <div className="col-md-2 mt-1">
            <LazyImage
              src={jobLocation.img}
              alt={jobLocation.name}
              title={jobLocation.name + ' ' + jobLocation.timeworked}
              className="lzy ImgRoundCorner border-right shadow"
            />
          </div>
      ))}
        </div>
        </div>
  )
}

export default Workplaces
