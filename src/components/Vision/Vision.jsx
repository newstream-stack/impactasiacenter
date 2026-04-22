import styles from './Vision.module.css'
import { useI18n } from '../../i18n/I18nContext'

export default function Vision() {
  const { t } = useI18n()
  const vision = t('vision')
  return (
    <section id="vision" className={styles.section}>
      <div className={styles.verse}>
        {vision.verse1}
        <br />{vision.verse2}
        <span className={styles.ref}>{vision.ref}</span>
      </div>
    </section>
  )
}
