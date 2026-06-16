import { useEffect, useState } from 'preact/hooks'
import { createPortal } from 'preact/compat'

interface LinkModalProps {
  articleId?: number
  onClose: () => void
  title?: string
  url?: string
  onContentLoad?: (html: string) => void
}

export default function LinkModal({ articleId, onClose, title, url, onContentLoad }: LinkModalProps) {
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (articleId) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
      setLoading(true)
      
      // Dynamically import the service to fetch content
      import('../services/devToService').then(({ fetchDevArticleContent }) => {
        fetchDevArticleContent(articleId).then((html) => {
          if (html) {
            setContent(html)
            onContentLoad?.(html)
          }
          setLoading(false)
        })
      })

      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = ''
      }
    }
  }, [articleId, onClose, onContentLoad])

  if (!articleId) return null

  const modalContent = (
    <div className="link-modal-overlay" onClick={onClose}>
      <div className="link-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="link-modal-header">
          {url ? (
            <a href={url} target="_blank" rel="noopener noreferrer" className="link-modal-title-link">
              <h3>{title || 'Article'}</h3>
            </a>
          ) : (
            <h3>{title || 'Article'}</h3>
          )}
          <button 
            className="link-modal-close" 
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        <div className="link-modal-content">
          {loading ? (
            <div className="link-modal-loading">Loading article...</div>
          ) : content ? (
            <div 
              className="link-modal-body"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <div className="link-modal-error">Failed to load article content</div>
          )}
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
