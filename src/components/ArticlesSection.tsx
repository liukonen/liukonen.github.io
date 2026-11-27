import MoreFooter from "./MoreFooter"
import LinkModal from "./LinkModal"
import { useState, useEffect } from "preact/hooks"
import { fetchDevArticles, DevArticle } from "../services/devToService"
import useIsMobile from "../services/isMobile"
import ArrowRight from '~icons/bi/arrow-right'


export default function ArticlesSection() {
  const [articles, setArticles] = useState<DevArticle[]>([])
  const [modalArticleId, setModalArticleId] = useState<number | null>(null)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalUrl, setModalUrl] = useState<string>('')
  const isMobile = useIsMobile()

  useEffect(() => {
    fetchDevArticles("liukonen", 4).then(setArticles).catch(console.error)
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
    <section id="writeups" className="l-showcase-grid">
      <div className="home-section-heading">
        <h2 className="home-section-title">Recent Writeups</h2>
        <a href="https://dev.to/liukonen" target="_blank" rel="noopener noreferrer">dev.to/liukonen ↗</a>
      </div>
      <p>
        Technical spikes, systems research, and a look at what it takes to bring sandbox experiments and homelab architectures into production.
      </p>
      <div className="home-article-list">
        {articles.map(article => <ArticleEntry key={article.id} article={article} onArticleClick={handleArticleClick} isMobile={isMobile} />)}
      </div>
      <MoreFooter path="#/writeups" label="View More Writeups" />
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

const ArticleEntry = ({ article, onArticleClick, isMobile }: {
  article: DevArticle
  onArticleClick: (event: MouseEvent, article: DevArticle) => void
  isMobile: boolean
}) =>
    <a
      href={article.url}
      className="c-art-row"
      target={isMobile ? "_blank" : undefined}
      onClick={(e) => onArticleClick(e, article)}
    >
    <div className="home-article-entry">
      <div className="home-article-copy">
        <h3>{article.title}</h3>
        {article.tag_list.length > 0 && <div className="home-article-tags">
          {article.tag_list.slice(0, 4).map(tag => <span className="tag c-topic-tag c-topic-tag--concept" key={tag}>{tag}</span>)}
        </div>}
      </div>
      <div className="home-article-meta">
        <time dateTime={article.published_at}>
          {new Date(article.published_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "2-digit" })}
        </time>
        <span className="home-preview-label">Preview <ArrowRight aria-hidden="true" /></span>
      </div>
    </div>
     </a>
