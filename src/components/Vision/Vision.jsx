import styles from './Vision.module.css'
import { useI18n } from '../../i18n/I18nContext'

const VISION_IMG = '/S__17227799.jpg'

export default function Vision() {
  const { t } = useI18n()
  const vision = t('vision')
  return (
    <section id="vision" className={styles.section}>
      <div className={styles.media} style={{ backgroundImage: `url('${VISION_IMG}')` }} aria-hidden="true" />
      <div className={styles.scrim} aria-hidden="true" />

      <blockquote className={styles.inner}>
        <p className={styles.verse}>
          <span className={styles.line}>{vision.verse1}</span>
          <span className={styles.line}>{vision.verse2}</span>
        </p>
        <cite className={styles.ref}>{vision.ref}</cite>
      </blockquote>
    </section>
  )
}
