import ThemeCard from './ThemeCard'
import { useI18n } from '../i18n/I18nContext'
import styles from './Themes.module.css'

export default function Themes({ onThemeClick }) {
  const { t } = useI18n()
  const themesSection = t('themesSection')
  const themes = t('themes')
  return (
    <section id="themes" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{themesSection.title}</h2>
          <div className={styles.line} />
        </div>
        <div className={styles.grid}>
          {themes.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} onClick={onThemeClick} />
          ))}
        </div>
      </div>
    </section>
  )
}
