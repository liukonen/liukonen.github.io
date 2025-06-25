import { FunctionalComponent } from 'preact'
import { useEffect, useState } from 'preact/hooks'

interface BlogItem {
  title: string
  link: string
  published: string
}

interface DisplayItem {
  title: string
  link: string
  timestamp: string
  index: number
}

const Blogs: FunctionalComponent = () => {
  const [items, setItems] = useState<DisplayItem[] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const getImg = (index: number) => `./img/blog/blog${index}.webp`

  const getItems = (blogItems: BlogItem[]): DisplayItem[] =>
    blogItems.slice(0, 3).map((item, i) => ({
      title: item.title,
      link: item.link,
      timestamp: item.published,
      index: i,
    }))

  const nextSlide = () => {
    if (items) setCurrentIndex((currentIndex + 1) % items.length)
  }

  const prevSlide = () => {
    if (items) setCurrentIndex((currentIndex - 1 + items.length) % items.length)
  }

  useEffect(() => {
    const cache = sessionStorage.getItem('dev.liukonen.blogstore')
    if (cache) {
      setItems(JSON.parse(cache))
      console.log('blog items pulled from cache')
    } else {
      fetch('./json/feeds.json')
        .then((res) => res.json())
        .then((data) => {
          const fetchedItems = getItems(data.items)
          setItems(fetchedItems)
          sessionStorage.setItem('dev.liukonen.blogstore', JSON.stringify(fetchedItems))
          console.log(fetchedItems)
        })
        .catch((err) => console.error('Error loading JSON:', err))
    }
  }, [])

  return (
    <div id="Blogs" className="container glass">
      <h3 className="text-center h3 mt-5 tshadow">Recent Articles / Blogs</h3>

      {items && (
        <div id="blogCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {items.map((article, index) => (
              <div
                className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
                key={index}
              >
                <img
                  src={getImg(article.index)}
                  className="rImage250 d-block w-100 white-overlay"
                  alt={article.title}
                />
                <div className="carousel-caption d-none d-md-block whiterGlass text-dark">
                  <h5>{article.title}</h5>
                  <p>{article.timestamp.slice(0, -9)}</p>
                  <a
                    href={article.link}
                    rel="noreferrer"
                    target="_blank"
                    className="btn btn-primary"
                  >
                    Go to article.
                  </a>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" onClick={prevSlide}>
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" onClick={nextSlide}>
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      )}

      <div className="row mt-3">
        <h5>
          Want more? Check out my feed on DEV Community:{' '}
          <a
            className="btn btn-light"
            href="https://dev.to/liukonen"
            rel="noreferrer"
            target="_blank"
          >
            <i className="bi bi-file-code-fill"></i> Dev.To/Liukonen
          </a>
        </h5>
      </div>

      {/* Optional: Inline style can be moved to CSS */}
      <style>
        {`
          .white-overlay {
            position: relative;
          }
          .white-overlay::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.6);
            pointer-events: none;
          }
        `}
      </style>
    </div>
  )
}

export default Blogs
