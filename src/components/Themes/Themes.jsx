import ThemeCard from '../ThemeCard/ThemeCard'
import { useI18n } from '../../i18n/I18nContext'
import SectionHeader from '../SectionHeader/SectionHeader'
import styles from './Themes.module.css'

export default function Themes({ onThemeClick }) {
  const { t } = useI18n()
  const themesSection = t('themesSection')
  const themes = t('themes')
  return (
    <section id="themes" className={styles.section}>
      <div className={styles.container}>
        <SectionHeader title={themesSection.title} />
        <div className={styles.grid}>
          {themes.map((theme, i) => (
            <ThemeCard key={theme.id} theme={theme} onClick={onThemeClick} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
