import styles from './SectionHeader.module.css'

export default function SectionHeader({ eyebrow, title, subtitle, showLine = true, accent = false, style }) {
  return (
    <div className={styles.header} style={style}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h2 className={`${styles.title} ${accent ? styles.accent : ''}`}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {showLine && <div className={styles.line} />}
    </div>
  )
}
