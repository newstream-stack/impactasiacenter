import { useI18n } from '../../i18n/I18nContext'
import styles from './PhoenixIntro.module.css'

const ICONS = {
  chip: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <path d="M9 7V4M12 7V4M15 7V4M9 20v-3M12 20v-3M15 20v-3M7 9H4M7 12H4M7 15H4M20 9h-3M20 12h-3M20 15h-3" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="M7 16l4-4 4 4 4-6" />
    </svg>
  ),
  city: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M5 21V7l7-4 7 4v14" />
      <path d="M9 21v-4h6v4M9 11h1m4 0h1M9 15h1m4 0h1" />
    </svg>
  ),
  location: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21c-4-4-7-7.5-7-11a7 7 0 0 1 14 0c0 3.5-3 7-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  mountain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 20l5.5-9 3.5 5 2.5-3.5L20 20H3z" />
      <path d="M16 6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
    </svg>
  ),
  plane: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16l-9-9-1 3-6-2 3 4-3 1 2 3 4-1 1 3 6-3 3 1z" />
    </svg>
  ),
}

export default function PhoenixIntro() {
  const { t } = useI18n()
  const data = t('phoenix')

  if (!data) return null

  return (
    <section id="phoenix" className={styles.section}>
      <div className={styles.bgText} aria-hidden="true">PHOENIX</div>

      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>{data.subtitle}</span>
          <h2 className={styles.title}>{data.title}</h2>
          <div className={styles.titleLine} />
          <div className={styles.introGrid}>
            {Array.isArray(data.intro) && data.intro.map((item, i) => (
              <div key={i} className={styles.introCard}>
                <div className={styles.introIcon}>{ICONS[item.icon]}</div>
                <div className={styles.introContent}>
                  <span className={styles.introLabel}>{item.label}</span>
                  <p className={styles.introDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.statsRow}>
          {data.stats.map((stat, i) => (
            <div key={i} className={styles.statItem}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div className={styles.grid}>
          {data.categories.map((cat, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.iconWrap}>{ICONS[cat.icon]}</div>
                <span className={styles.cardTag}>{cat.tag}</span>
              </div>
              <h3 className={styles.cardHeading}>{cat.heading}</h3>
              <p className={styles.cardTagline}>{cat.tagline}</p>
              <ul className={styles.itemList}>
                {cat.items.map((item, j) => (
                  <li key={j} className={styles.listItem}>
                    <span className={styles.itemLabel}>{item.label}</span>
                    <span className={styles.itemDesc}>{item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.outro}>
          <div className={styles.outroDivider} />
          <p className={styles.outroText}>{data.outro}</p>
        </div>
      </div>
    </section>
  )
}
