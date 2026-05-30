import MoreFooter from "./MoreFooter"
import LinkModal from "./LinkModal"
import { useState, useEffect } from "preact/hooks"
import { fetchDevArticles, DevArticle } from "../services/devToService"
import useIsMobile from "../services/isMobile"
import BoxArrowUpRight from '~icons/bi/box-arrow-up-right'


export default function ArticlesSection() {
  const [articles, setArticles] = useState<DevArticle[]>([])
  const [modalArticleId, setModalArticleId] = useState<number | null>(null)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalUrl, setModalUrl] = useState<string>('')
  const isMobile = useIsMobile()

  useEffect(() => {
    fetchDevArticles("liukonen", 3).then(setArticles).catch(console.error)
  }, [])

  const handleArticleClick = (e: MouseEvent, article: DevArticle) => {
    if (!isMobile) {
      e.preventDefault()
      setModalArticleId(article.id)
      setModalTitle(article.title)
      setModalUrl(article.url)
    }
  }

  return (
    <section id="writeups" className="showcase-grid">
      <span className="section-label">~/ RECENT_WRITEN_ARTICLES</span>
      <p>
        // Technical spikes, systems research, and engineering explorations.<br />
        // Evaluating sandbox experiments and homelab architectures for enterprise production viability.
      </p>
      < br />
      <section className="home-articles-section">
        <div className="mini-article-list">
          {articles.map(article => <ArticleEntry article={article} onArticleClick={handleArticleClick} isMobile={isMobile} />)}
        </div>
      </section>
      <MoreFooter path={"#/ARTICLES"} />
      <LinkModal 
        articleId={modalArticleId || undefined} 
        onClose={() => {
          setModalArticleId(null)
          setModalUrl('')
        }} 
        title={modalTitle} 
        url={modalUrl} 
      />
    </section>
  )
}

const ArticleEntry = ({ article, onArticleClick, isMobile }: any) =>
  <div className="card">
    <a
      href={article.url}
      key={article.id}
      className="mini-article-row"
      target={isMobile ? "_blank" : undefined}
      onClick={(e) => onArticleClick(e, article)}
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
