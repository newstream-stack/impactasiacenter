import styles from './SectionHeader.module.css'

/**
 * @param {{ eyebrow?: string, title: string, subtitle?: string, showLine?: boolean, accent?: boolean, style?: React.CSSProperties }} props
 * - eyebrow: small label rendered above the title
 * - accent: makes the title use var(--accent) colour
 * - showLine: renders the decorative orange underline (default true)
 * - style: pass { marginBottom } to override section spacing
 */
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
