import ThemeCard from './ThemeCard'
import { themes } from '../data/themes'
import styles from './Themes.module.css'

export default function Themes({ onThemeClick }) {
  return (
    <section id="themes" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>大會議題</h2>
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
