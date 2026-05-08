import { useEffect } from 'react'
import styles from './DetailView.module.css'
import { useI18n } from '../../i18n/I18nContext'

export default function DetailView({ theme, onClose }) {
  const { t } = useI18n()
  const isOpen = !!theme

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
      <aside className={`${styles.panel} ${isOpen ? styles.panelActive : ''}`} aria-hidden={!isOpen}>
        <div className={styles.panelInner}>
          <div className={styles.panelTopBar}>
            <span className={styles.panelTag}>IMPACT ASIA 2026</span>
            <button className={styles.closeBtn} onClick={onClose} aria-label={t('ariaClose')}>✕</button>
          </div>

          {theme && (
            <div className={styles.content}>
              <h2 className={styles.heading}>{theme.detail?.heading || theme.title}</h2>
              {theme.detail?.intro && <p className={styles.intro}>{theme.detail.intro}</p>}

              {theme.detail?.points ? (
                <ul className={styles.points}>
                  {theme.detail.points.map((p, i) => (
                    <li key={i} className={styles.point}>
                      <strong>{p.title}</strong>
                      <span>{p.desc}</span>
                    </li>
                  ))}
                </ul>
              ) : theme.paragraphs ? (
                <div className={styles.paragraphs}>
                  {theme.paragraphs.map((p, i) => (
                    <p key={i} className={styles.paragraph}>{p}</p>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
