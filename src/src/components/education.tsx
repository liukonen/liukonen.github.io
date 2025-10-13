import { FunctionalComponent } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

interface School {
  img: string
  name: string
  title: string
  timeworked: string
  summary: string
}

interface EducationProps {
  items: School[]
}

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

const Education: FunctionalComponent<EducationProps> = ({ items }) => {
  return (
    <div className="container" id="edu">
      <h3 className="text-center h3 mt-5 tshadow">Education</h3>
      {items.map((school, index) => (
        <div className="row justify-content-md-center" key={index}>
          <div className="col-md-2 mt-3">
            <LazyImage
              src={school.img}
              alt={school.name}
              className="lzy ImgRoundCorner border-right shadow"
            />
          </div>
          <div className="col-md-6 mt-3 offset-md-1">
            <h4 className="card-title">{school.name}</h4>
            <h5>
              {school.title}, {school.timeworked}
            </h5>
            <p className="card-text">{school.summary}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Education
