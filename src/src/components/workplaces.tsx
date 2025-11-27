import { FunctionalComponent } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

interface JobLocation {
  img: string
  name: string
  title: string
  timeworked: string
  summary: string
  link?: string
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
    <div className="container">
      <div className="row justify-content-center align-items-center text-center mt-3">
        {items.map((jobLocation) => (
          <div
            key={jobLocation.name}
            className="col-4 col-sm-3 col-md-2 mt-2 mb-2 d-flex justify-content-center"
          >
            {jobLocation.link ? (
              <a href={jobLocation.link} target="_blank" rel="noreferrer">
                <LazyImage
                  src={jobLocation.img}
                  alt={jobLocation.name}
                  title={`${jobLocation.name} ${jobLocation.timeworked}`}
                  className="img-fluid rounded shadow"
                />
              </a>
            ) : (
              <LazyImage
                src={jobLocation.img}
                alt={jobLocation.name}
                title={`${jobLocation.name} ${jobLocation.timeworked}`}
                className="img-fluid rounded shadow"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workplaces;
