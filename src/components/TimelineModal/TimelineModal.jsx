import { useEffect } from 'react'
import styles from './TimelineModal.module.css'

export default function TimelineModal({ item, onClose }) {
  const isOpen = !!item

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.overlayActive : ''}`} onClick={onClose} />
      <div className={`${styles.modal} ${isOpen ? styles.modalActive : ''}`} role="dialog" aria-modal="true">
        {item && (
          <>
            <div className={styles.imageWrap}>
              <img src={item.img} alt={item.region} className={styles.image} />
              <div className={styles.imageGradient} />
              <div className={styles.imageMeta}>
                <span className={styles.year}>{item.year}</span>
                <span className={styles.edition}>{item.detail.edition}</span>
              </div>
              <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
            </div>

            <div className={styles.body}>
              <div className={styles.locationRow}>
                <span className={styles.locationPin}>◎</span>
                <span className={styles.location}>{item.region}</span>
              </div>

              <h2 className={styles.theme}>{item.detail.theme}</h2>

              <blockquote className={styles.tagline}>
                <span className={styles.taglineDash}>——</span>
                {item.detail.tagline}
              </blockquote>

              <div className={styles.divider} />

              <div className={styles.paragraphs}>
                {item.detail.paragraphs.map((p, i) => (
                  <p key={i} className={styles.paragraph}>{p}</p>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
