import styles from './ThemeCard.module.css'
import { useI18n } from '../../i18n/I18nContext'

export default function ThemeCard({ theme, onClick, index = 0 }) {
  const { t } = useI18n()
  const num = String(index + 1).padStart(2, '0')
  return (
    <div className={styles.card} onClick={() => onClick(theme)}>
      <div className={styles.topRow}>
        <span className={styles.num}>{num}</span>
        <span className={styles.arrow}>→</span>
      </div>
      <h3 className={styles.title}>{theme.title}</h3>
      <p className={styles.summary}>{theme.summary}</p>
      <div className={styles.cta}>{t('about.btnMore')}</div>
    </div>
  )
}
