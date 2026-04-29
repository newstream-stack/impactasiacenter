import { useI18n } from '../../i18n/I18nContext'
import styles from './IAAIntro.module.css'

export default function IAAIntro() {
  const { t } = useI18n()
  const data = t('iaaIntro')

  if (!data) return null

  return (
    <section id="iaa-intro" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{data.title}</h2>
          <p className={styles.subtitle}>{data.subtitle}</p>
          <div className={styles.line} />
        </div>

        <div className={styles.content}>
          {data.blocks.map((block, index) => (
            <div key={index} className={styles.block}>
              <h3 className={styles.blockTitle}>{block.title}</h3>
              <div className={styles.paragraphs}>
                {block.paragraphs.map((p, pIndex) => (
                  <p key={pIndex}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
