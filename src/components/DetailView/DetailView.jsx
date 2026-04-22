import { useEffect } from 'react'
import styles from './DetailView.module.css'

export default function DetailView({ theme, onClose }) {
  const isOpen = !!theme

  // lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.overlayActive : ''}`} onClick={onClose} />
      <aside className={`${styles.panel} ${isOpen ? styles.panelActive : ''}`} aria-hidden={!isOpen}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="關閉">×</button>
        {theme && (
          <div className={styles.content}>
            <h2 className={styles.heading}>{theme.detail.heading}</h2>
            <p className={styles.intro}>{theme.detail.intro}</p>
            <ul className={styles.points}>
              {theme.detail.points.map((p, i) => (
                <li key={i} className={styles.point}>
                  <strong>{p.title}</strong>
                  <span>{p.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </>
  )
}
