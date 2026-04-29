import { useState, useEffect } from 'react'
import { useI18n } from '../../i18n/I18nContext'
import styles from './IAAIntro.module.css'

export default function IAAIntro() {
  const { t } = useI18n()
  const data = t('iaaIntro')
  const [activeBlock, setActiveBlock] = useState(null)

  // Lock scroll when modal is open
  useEffect(() => {
    if (activeBlock) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [activeBlock])

  if (!data) return null

  return (
    <section id="iaa-intro" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{data.title}</h2>
          <p className={styles.subtitle}>{data.subtitle}</p>
          <div className={styles.line} />
        </div>

        <div className={styles.grid}>
          {data.blocks.map((block, index) => (
            <div 
              key={index} 
              className={styles.card}
              onClick={() => setActiveBlock(block)}
            >
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{block.title}</h3>
                <div className={styles.cardText}>
                  {block.paragraphs[0]}
                </div>
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.learnMore}>
                  {t('about.btnMore')} <span className={styles.arrow}>→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <div 
        className={`${styles.overlay} ${activeBlock ? styles.overlayActive : ''}`} 
        onClick={() => setActiveBlock(null)}
      />
      <aside className={`${styles.panel} ${activeBlock ? styles.panelActive : ''}`}>
        <button className={styles.closeBtn} onClick={() => setActiveBlock(null)}>×</button>
        {activeBlock && (
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>{activeBlock.title}</h2>
            <div className={styles.modalParagraphs}>
              {activeBlock.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        )}
      </aside>
    </section>
  )
}
