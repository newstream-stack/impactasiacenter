import { useEffect } from 'react'
import styles from './VideoModal.module.css'

export default function VideoModal({ isOpen, onClose }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="關閉預告">×</button>
        <div className={styles.videoResponsive}>
          <iframe
            src="https://www.youtube.com/embed/2IvNbOhBPwA?autoplay=1"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Impact Asia 2026 Trailer"
          />
        </div>
      </div>
    </div>
  )
}
