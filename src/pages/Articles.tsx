import { useState, useEffect } from 'preact/hooks'
import { fetchDevArticles, DevArticle } from '../services/devToService'
import Breadcrumb from '../components/Breadcrumb'
import FooterCounter from '../components/FooterCounter'
import Header from '../components/Header'
import LinkModal from '../components/LinkModal'
import useIsMobile from '../services/isMobile'

import BoxArrowUpRight from '~icons/bi/box-arrow-up-right'


export default function Articles() {
  const [articles, setArticles] = useState<DevArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [modalArticleId, setModalArticleId] = useState<number | null>(null)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalUrl, setModalUrl] = useState<string>('')
  const isMobile = useIsMobile()

  useEffect(() => {
    // 1000 is the max limit for a single page on the Dev.to API
    fetchDevArticles('liukonen', 30)
      .then(data => {
        setArticles(data)
        setLoading(false)
      })
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
    <div>
      <Breadcrumb path="#/ARTICLES" />

      <Header title="Writeups, Guides, and Tutorials" subtitle="Technical documentation and architectural insights from my dev.to profile" />

      {loading ? (
        <div>PULLING_REMOTE_DATA...</div>
      ) : (
        <div className="full-article-grid grid-2">
          {articles.map(article => (
            <div key={article.id} className="art-card">
              <a 
                href={article.url} 
                target={isMobile ? "_blank" : undefined}
                onClick={(e) => handleArticleClick(e as any, article)}
                className={"no-decor"}
              >
                <h3><BoxArrowUpRight /> {article.title}</h3>
              </a>
              <p>{article.description}</p>
              <div>
                {article.tag_list.map(tag => <span key={tag} className="tag">#{tag}</span>)}
              </div>
              <div className="date">
                {new Date(article.published_at).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: '2-digit', 
                  year: '2-digit' 
                })} • {article.reading_time_minutes} min read
              </div>
            </div>
          ))}
          <FooterCounter count={articles.length} />
        </div>

      )}

      <LinkModal articleId={modalArticleId || undefined} onClose={() => {
        setModalArticleId(null)
        setModalUrl('')
      }} title={modalTitle} url={modalUrl} />
    </div>
  )
}
