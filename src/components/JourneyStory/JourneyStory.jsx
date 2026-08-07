import { useState } from 'react'
import { useI18n } from '../../i18n/I18nContext'
import styles from './JourneyStory.module.css'

export default function JourneyStory() {
  const { t } = useI18n()
  const blocks = t('journeyStory')
  const [openIndex, setOpenIndex] = useState(0)

  if (!Array.isArray(blocks)) return null

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.imageWrap}>
          <img src="/S__87826437.jpg" alt="" className={styles.image} />
        </div>

        <div className={styles.accordion}>
          {blocks.map((block, index) => {
            const isOpen = openIndex === index
            return (
              <div key={index} className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
                <button
                  type="button"
                  className={styles.itemHeader}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.itemNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.itemTitleWrap}>
                    <span className={styles.itemTitle}>{block.heading}</span>
                    {block.subheading && <span className={styles.itemSubtitle}>{block.subheading}</span>}
                  </span>
                  <span className={styles.itemIcon}>{isOpen ? '−' : '+'}</span>
                </button>

                <div className={styles.itemBody}>
                  <div className={styles.itemBodyInner}>
                    <div className={styles.paragraphs}>
                      {block.paragraphs.map((p, j) => (
                        <p className={styles.paragraph} key={j}>
                          {p.split('\n').map((line, k) => (
                            <span key={k}>
                              {k > 0 && <br />}
                              {line}
                            </span>
                          ))}
                        </p>
                      ))}
                    </div>
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
