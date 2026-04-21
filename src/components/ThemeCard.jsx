import styles from './ThemeCard.module.css'

export default function ThemeCard({ theme, onClick }) {
  return (
    <div className={styles.card} onClick={() => onClick(theme)}>
      <h3 className={styles.title}>{theme.title}</h3>
      <p className={styles.summary}>{theme.summary}</p>
      <div className={styles.cta}>了解更多 →</div>
    </div>
  )
}
