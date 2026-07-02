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
      <span className="f-label-mono f-clr-accent">~/ RECENT_WRITEN_ARTICLES</span>
      <p>
        // Technical spikes, systems research, and engineering explorations.<br />
        // Evaluating sandbox experiments and homelab architectures for enterprise production viability.
      </p>
      < br />
      <section>
        <div className="l-grid-2">
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
    <a
      href={article.url}
      key={article.id}
      className="c-art-row"
      target={isMobile ? "_blank" : undefined}
      onClick={(e) => onArticleClick(e, article)}
    >
    <div className="card">
        <span>
          <BoxArrowUpRight />
        </span>
        <div class="lnk">
           {article.title.length > 80 ? article.title.slice(0, 77) + "..." : article.title}
        </div>
        <span className="f-mono-muted">
          {new Date(article.published_at).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "2-digit"
          })}
        </span>
      </div>
     </a>