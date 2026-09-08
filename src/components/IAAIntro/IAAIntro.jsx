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

function ChapterBody({ block }) {
  const points = block.detail?.points
  const intro = block.detail?.intro

  return (
    <div className={styles.body}>
      {intro && <p className={styles.chapterIntro}><RichText text={intro} /></p>}

      {points ? (
        <ul className={styles.points}>
          {points.map((p, i) => (
            <li key={i} className={styles.point}>
              <strong className={styles.pointTitle}>{p.title}</strong>
              <span className={styles.pointDesc}><RichText text={p.desc} /></span>
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

      {block.detail?.quote && (
        <blockquote className={styles.quoteBox}>
          {block.detail.quoteLabel && (
            <span className={styles.quoteLabel}>{block.detail.quoteLabel}</span>
          )}
          <p className={styles.quoteText}><RichText text={block.detail.quote} /></p>
        </blockquote>
      )}
    </div>
  )
}

export default function IAAIntro() {
  const { t } = useI18n()
  const data = t('iaaIntro')
  const [openIndex, setOpenIndex] = useState(null)

  if (!data) return null

  const blocks = data.blocks || []

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

        {/* All chapters collapsed by default — 11 scannable rows instead of a wall */}
        <ol className={styles.list}>
          {blocks.map((block, index) => {
            const isOpen = openIndex === index
            return (
              <li key={block.title} className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
                <button
                  type="button"
                  className={styles.row}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.num}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.rowTitle}>{block.title}</span>
                  {block.tag && <span className={styles.rowTag}>{block.tag}</span>}
                  <span className={styles.chevron} aria-hidden="true" />
                </button>
                {isOpen && <ChapterBody block={block} />}
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
