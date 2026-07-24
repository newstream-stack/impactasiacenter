import { useState } from 'react'
import { useI18n } from '../../i18n/I18nContext'
import SectionHeader from '../SectionHeader/SectionHeader'
import styles from './IAAIntro.module.css'

function RichText({ text }) {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className={styles.emphasis}>{part}</strong> : part
  )
}

export default function IAAIntro() {
  const { t } = useI18n()
  const data = t('iaaIntro')
  const [openIndex, setOpenIndex] = useState(0)

  if (!data) return null

  return (
    <section id="iaa-intro" className={styles.section}>
      <div className={styles.container}>
        <SectionHeader
          title={data.title}
          subtitle={data.subtitle}
          accent
          style={{ marginBottom: '2.5rem' }}
        />

        {data.highlight && (
          <div className={styles.highlight}>
            <h3 className={styles.highlightTitle}>{data.highlight.title}</h3>
            <p className={styles.highlightText}>{data.highlight.text}</p>
          </div>
        )}

        {data.tagline && (
          <p className={styles.tagline}>
            {data.tagline.split('\n').map((line, i) => <span key={i}>{line}</span>)}
          </p>
        )}

        <div className={styles.accordion}>
          {data.blocks.map((block, index) => {
            const isOpen = openIndex === index
            const points = block.detail?.points
            const intro = block.detail?.intro
            const introLabel = block.detail?.introLabel

            return (
              <div key={index} className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
                <button
                  type="button"
                  className={styles.itemHeader}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.itemNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.itemTitle}>
                    {block.title}
                    {block.tag && <span className={styles.itemTag}>{block.tag}</span>}
                  </span>
                  <span className={styles.itemIcon}>{isOpen ? '−' : '+'}</span>
                </button>

                <div className={styles.itemBody}>
                  <div className={styles.itemBodyInner}>
                    {intro && (
                      <div className={styles.introBlock}>
                        {introLabel && <span className={styles.introLabel}>{introLabel}</span>}
                        <p className={styles.intro}><RichText text={intro} /></p>
                      </div>
                    )}

                    {points ? (
                      <ul className={styles.points}>
                        {points.map((p, i) => (
                          <li key={i} className={styles.point}>
                            <strong className={styles.pointTitle}>{p.title}</strong>
                            <span><RichText text={p.desc} /></span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className={styles.paragraphs}>
                        {block.paragraphs.map((p, i) => (
                          <p key={i} className={styles.paragraph}><RichText text={p} /></p>
                        ))}
                      </div>
                    )}

                    {block.detail?.outro && (
                      <div className={styles.introBlock}>
                        {block.detail.outroLabel && (
                          <span className={styles.introLabel}>{block.detail.outroLabel}</span>
                        )}
                        <p className={styles.intro}><RichText text={block.detail.outro} /></p>
                      </div>
                    )}

                    {block.detail?.quote && (
                      <div className={styles.quoteBox}>
                        {block.detail.quoteLabel && (
                          <span className={styles.quoteLabel}>{block.detail.quoteLabel}</span>
                        )}
                        <p className={styles.quoteText}><RichText text={block.detail.quote} /></p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
