import MoreFooter from "./MoreFooter"
import { useState, useEffect } from "preact/hooks"
import { fetchDevArticles, DevArticle } from "../services/devToService"
import BoxArrowUpRight from '~icons/bi/box-arrow-up-right'


export default function ArticlesSection() {
  const [articles, setArticles] = useState<DevArticle[]>([])
  useEffect(() => {
    fetchDevArticles("liukonen", 3).then(setArticles).catch(console.error)
  }, [])

  return (
    <section id="writeups" className="showcase-grid">
      <span className="section-label">~/ RECENT_WRITEN_ARTICLES</span>
      <section className="home-articles-section">
        <div className="mini-article-list">
          {articles.map(article => <ArticleEntry article={article} />)}
        </div>
      </section>
      <MoreFooter path={"#/ARTICLES"} />
    </section>
  )
}

const ArticleEntry = ( {article}: any ) =>
  <div className="card">
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
        <BoxArrowUpRight /> {article.title}
      </span>
    </a>
  </div>
