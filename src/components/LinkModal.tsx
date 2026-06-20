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
        
        {/* Modal Top HUD Navigation */}
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
            <span className="kbd-hint font-mono">ESC</span>
            <span className="close-icon">×</span>
          </button>
        </div>

        {/* Core Content Body Zone */}
        <div className="link-modal-content">
          {loading ? (
            <div className="link-modal-loading font-mono">LOADING_STREAM_RESOURCES...</div>
          ) : content ? (
            <div 
              className="link-modal-body"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <div className="link-modal-error font-mono">ERROR::FETCH_PIPELINE_FAILED</div>
          )}
        </div>

        {/* Integrated Low-Profile Meta Footer */}
        <div className="link-modal-footer font-mono">
          <span>DOC_SOURCE::DEV_TO_API</span>
          <span className="tag-separator">|</span>
          <span>RENDER_ENGINE::VHTML_RAW_PARSER</span>
        </div>

      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}