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
}> = ({ src, alt, className }) => {
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
    />
  )
}

const Workplaces: FunctionalComponent<WorkplacesProps> = ({ items }) => {
  return (
    <>
      {items.map((jobLocation, index) => (
        <div
          className="row justify-content-md-center mt-3"
          key={index}
        >
          <div className="col-md-2 mt-3">
            <LazyImage
              src={jobLocation.img}
              alt={jobLocation.name}
              className="lzy ImgRoundCorner border-right shadow"
            />
          </div>
          <div className="col-md-9 mt-3 offset-md-1">
            <div class="whiteGlassCardElement">
            <h4 className="card-title">{jobLocation.name}</h4>
            <h5>
              {jobLocation.title}, {jobLocation.timeworked}
            </h5>
            <p>{jobLocation.summary}</p>
          </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Workplaces
