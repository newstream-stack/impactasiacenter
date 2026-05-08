import styles from './TrailerSection.module.css'
import { useI18n } from '../../i18n/I18nContext'

export default function TrailerSection() {
  const { t } = useI18n()
  const trailer = t('trailer')
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>{trailer.subtitle}</span>
            <h2 className={styles.title}>{trailer.title}</h2>
          </div>
        </div>
        <div className={styles.player}>
          <div className={styles.videoResponsive}>
            <iframe
              src="https://www.youtube.com/embed/2IvNbOhBPwA"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Impact Asia 2026 Official Trailer"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
