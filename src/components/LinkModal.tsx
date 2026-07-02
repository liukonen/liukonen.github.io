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
      if (e.key === 'Escape') onClose()
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
    <div className="link-modal-overlay pd-2rm">
      <div
        className="link-modal-container modal-pane-frame-max" 
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Unified Top HUD Navigation Grid */}
        <div 
          className="link-modal-header f-font-mono modal-row-split-gap" 
        >
          <div className="f-hd-md-meta modal-cell-fill">
            {url ? (
              <a href={url} target="_blank" rel="noopener noreferrer" className="link-modal-title-link f-no-decor">
                <h2 className="modal-txt-wrap">
                  {title ? `${title}` : 'DOCUMENT::FETCH_ENTRY'}
                </h2>
              </a>
            ) : (
              <h2 className="modal-txt-wrap">
                {title ? `${title}` : 'DOCUMENT::FETCH_ENTRY'}
              </h2>
            )}
            <div className="f-hd-md-tags">
              <span>STACK::FLUENTBIT_LOKI_GRAFANA</span>
              <span className="tag-separator">|</span>
              <span>INFRA::RASPBERRY_PI_NODES</span>
            </div>
          </div>
          
          <button 
            className="link-modal-close modal-no-shrink" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <span className="kbd-hint">ESC</span>
            <span>×</span>
          </button>
        </div>

        {/* High-Contrast Framing Line (Matches Telemetry Layout Edge) */}
        <div className="link-modal-frame-line" /> 

        {/* Core Scrollzone Container - Isolated Vertical Scroll Context */}
        <div 
          className="link-modal-content-scrollzone modal-scroll-y" 
        >
          {loading ? (
            <div className="link-modal-loading f-font-mono">LOADING_STREAM_RESOURCES...</div>
          ) : content ? (
            <div 
              className="link-modal-body modal-clip-x"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <div className="link-modal-error f-font-mono">ERROR::FETCH_PIPELINE_FAILED</div>
          )}
        </div>

        {/* Integrated Low-Profile Meta Footer */}
        <div className="link-modal-footer f-font-mono">
          <span>DOC_SOURCE::DEV_TO_API</span>
          <span className="tag-separator">|</span>
          <span>RENDER_ENGINE::VHTML_RAW_PARSER</span>
        </div>

      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}