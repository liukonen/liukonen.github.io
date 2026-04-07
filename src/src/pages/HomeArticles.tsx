import { useState, useEffect } from "preact/hooks"
import { fetchDevArticles, DevArticle } from "../services/devToService"

export default function HomeArticles() {
  const [articles, setArticles] = useState<DevArticle[]>([])

  useEffect(() => {
    fetchDevArticles("liukonen", 3).then(setArticles).catch(console.error)
  }, [])

  return (
    <section className="home-articles-section">
      <div className="mini-article-list">
        {articles.map(article =>
          <a
            href={article.url}
            key={article.id}
            className="mini-article-row"
            target="_blank"
          >
            <span className="article-date-mono">
              {new Date(article.published_at).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "2-digit"
              })}
            </span>
            <span className="article-title-truncate">
              <span class="bi bi-box-arrow-up-right"></span> {article.title}
            </span>
          </a>
        )}
      </div>
    </section>
  )
}
