import { FunctionalComponent } from "preact"
import { useEffect, useState } from "preact/hooks"

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

  const getItems = (blogItems: BlogItem[]): DisplayItem[] =>
    blogItems.slice(0, 3).map((item, i) => ({
      title: item.title,
      link: item.link,
      timestamp: item.published.slice(0, -9),
      index: i
    }))

  useEffect(() => {
    const cache = sessionStorage.getItem("dev.liukonen.blogstore")
    if (cache) {
      setItems(JSON.parse(cache))
      console.log("blog items pulled from cache")
    } else {
      fetch("./json/feeds.json")
        .then(res => res.json())
        .then(data => {
          const fetchedItems = getItems(data.items)
          setItems(fetchedItems)
          sessionStorage.setItem(
            "dev.liukonen.blogstore",
            JSON.stringify(fetchedItems)
          )
          console.log(fetchedItems)
        })
        .catch(err => console.error("Error loading JSON:", err))
    }
  }, [])



  return (
    <div id="Blogs" className="container section">
      <h3 className="text-center h3 mt-1 tshadow">Recent Articles / Blogs</h3>

      <div class="row mt-4 g-4 justify-content-center">
        {items?.map(article => (
          <div class="col-12 col-md-6 col-lg-4">
            <div class="overflow-hidden skill-card gold h-100">
              <figure key={article.index} class="mb-0">
                <blockquote class="blockquote p-3">
                  <p>
                    {article.title} - 
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    > <i class="bi bi-globe"></i> Read Article
                    </a>
                  </p>
                </blockquote>
                <figcaption class="blockquote-footer p-3 pt-0">
                  { article.timestamp } 
                </figcaption>
              </figure>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Blogs
