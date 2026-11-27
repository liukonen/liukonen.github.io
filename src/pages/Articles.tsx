import { useState, useEffect } from 'preact/hooks'
import { fetchDevArticles, DevArticle } from '../services/devToService'
import Breadcrumb from '../components/Breadcrumb'
import FooterCounter from '../components/FooterCounter'
import Header from '../components/Header'
import LinkModal from '../components/LinkModal'
import useIsMobile from '../services/isMobile'

import ArrowRight from '~icons/bi/arrow-right'


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
        <div className="home-article-list">
          {articles.map(article => (
            <a
              key={article.id}
              href={article.url}
              target={isMobile ? "_blank" : undefined}
              rel={isMobile ? "noopener noreferrer" : undefined}
              onClick={(e) => handleArticleClick(e as any, article)}
              className="c-art-row"
            >
              <div className="home-article-entry">
                <div className="home-article-copy">
                  <h3>{article.title}</h3>
                  <p className="home-article-description">{article.description}</p>
                  {article.tag_list.length > 0 && (
                    <div className="home-article-tags">
                      {article.tag_list.map(tag => <span key={tag} className="tag c-topic-tag c-topic-tag--concept">{tag}</span>)}
                    </div>
                  )}
                </div>
                <div className="home-article-meta">
                  <time dateTime={article.published_at}>
                    {new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: '2-digit' })}
                  </time>
                  <span>{article.reading_time_minutes} min read</span>
                  <span className="home-preview-label">Preview <ArrowRight aria-hidden="true" /></span>
                </div>
              </div>
            </a>
          ))}
        </div>

      )}
      {!loading && <FooterCounter count={articles.length} />}

      <LinkModal articleId={modalArticleId || undefined} onClose={() => {
        setModalArticleId(null)
        setModalUrl('')
      }} title={modalTitle} url={modalUrl} />
    </div>
  )
}
