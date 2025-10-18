import { FunctionalComponent, JSX } from "preact"
import { useEffect, useRef, useState } from "preact/hooks"

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

    if (imgRef.current) observer.observe(imgRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <img
      ref={imgRef}
      src={visible ? src : ""}
      alt={alt}
      style={{ width: 80, height: 80, objectFit: "contain", ...style }}
      loading="lazy"
    />
  )
}

const getCardColor = (level: number) =>
  level >= 2 ? "border-warning" : "border-secondary"

const KnowledgeGrid: FunctionalComponent<KnowledgeGridProps> = ({ items }) => {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const posRef = useRef(0)
  const [paused, setPaused] = useState(false)

  const allItems = items.flatMap(c => c.items)
  const cutItems = allItems.slice(4)
  const loopedItems = cutItems.concat(cutItems) // duplicate for seamless scroll
  const topItems = allItems.slice(0, 4)

  useEffect(
    () => {
      const track = trackRef.current
      if (!track) return

      let animationFrame: number
      const speed = 2 // pixels per frame, adjust as needed

      const step = () => {
        if (!paused) {
          posRef.current += speed
          // Total scrollable width of the first set
          const width = track.scrollWidth / 2
          if (posRef.current >= width) posRef.current = 0
          track.style.transform = `translateX(${-posRef.current}px)`
        }
        animationFrame = requestAnimationFrame(step)
      }

      animationFrame = requestAnimationFrame(step)
      return () => cancelAnimationFrame(animationFrame)
    },
    [loopedItems, paused]
  )


  return (
    <div className="container my-5">
      <h3 className="text-center h3 tshadow mb-4">
        Systems / Ideas I've worked with
      </h3>


          <h4>Daily Drivers</h4>
          <div
            className="row p-3 gap-3"
          >
            {topItems.map(item =>
              <div
                key={item.title}
                className={`col skill-card flex-fill ${item.level >= 2
                  ? "gold"
                  : "silver"} d-flex flex-column align-items-center justify-content-center text-center`}
                style={{
                  minWidth: "120px",
                  maxWidth: "160px",
                  flex: "1 1 auto"
                }}
              >
                <LazyImage src={item.img} alt={item.title} />
                <p>
                  {item.title}
                </p>
              </div>
            )}
          </div>


          <h4>Other Tech I work with</h4>
          <div class="carousel-wrapper border rounded-4 overflow-hidden p-3">
            <div
              ref={trackRef}
              className="row flex-nowrap g-4"
              style={{
                willChange: "transform",
                display: "flex",
                flexWrap: "nowrap"
              }}
            >
              {loopedItems.map((item, idx) =>
                <div
                  className="col-6 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center"
                >
                  <div
                    className={`flex-fill d-flex flex-column align-items-center justify-content-center text-center p-3 border rounded ${getCardColor(
                      item.level
                    )}`}
                  >
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                       onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
                    >
                      <LazyImage src={item.img} alt={item.title} />
                    </a>
                    <p className="mt-2 mb-0 small">
                      {item.title}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
  

      <p className="text-center mt-3 small">
        <strong>Gold</strong> = Worked with professionally for years.{" "}
        <strong>Silver</strong> = Hobby / side experience.
      </p>
    </div>
  )
}

export default KnowledgeGrid
