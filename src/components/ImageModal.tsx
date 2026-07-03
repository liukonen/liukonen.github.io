import { h } from 'preact'

export const ImageModal = ({ src, onClose }: { src: string | null; onClose: () => void }) => {
  if (!src) return null

  return (
    <div className="modal-image-view" onClick={onClose}>
      
      {/* Explicit Close Button */}
      <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <img src={src} alt="Architecture Diagram" />
      </div>
    </div>
  )
}