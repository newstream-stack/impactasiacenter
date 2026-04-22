import styles from './ThemeCard.module.css'
import { useI18n } from '../../i18n/I18nContext'

export default function ThemeCard({ theme, onClick }) {
  const { language } = useI18n()
  const ctaText = language === 'zh' ? '了解更多 →' : 'Learn More →'
  return (
    <div className={styles.card} onClick={() => onClick(theme)}>
      <h3 className={styles.title}>{theme.title}</h3>
      <p className={styles.summary}>{theme.summary}</p>
      <div className={styles.cta}>{ctaText}</div>
    </div>
  )
}
