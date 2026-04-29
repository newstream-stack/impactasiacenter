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
          <div className={styles.line} />
        </div>

        <div className={styles.content}>
          <div className={styles.block}>
            <h3 className={styles.blockTitle}>{data.origin.title}</h3>
            <div className={styles.paragraphs}>
              {data.origin.paragraphs.map((p, index) => (
                <p key={index}>{p}</p>
              ))}
            </div>
          </div>

          <div className={styles.block}>
            <h3 className={styles.blockTitle}>{data.mission.title}</h3>
            <div className={styles.missionGrid}>
              {data.mission.items.map((item, index) => (
                <div key={index} className={styles.missionCard}>
                  <span className={styles.label}>{item.label}</span>
                  <p className={styles.text}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
