import { useI18n } from '../../i18n/I18nContext'
import styles from './Presidium.module.css'

export default function Presidium() {
  const { t } = useI18n()
  const data = t('presidium')

  if (!data) return null

  return (
    <section id="presidium" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>{data.subtitle}</span>
          <h2 className={styles.title}>{data.title}</h2>
          <div className={styles.line} />
        </div>

        <div className={styles.mainGrid}>
          {data.main.map((member, index) => (
            <div key={index} className={styles.memberCard}>
              <span className={styles.role}>{member.role}</span>
              <h3 className={styles.name}>{member.name}</h3>
              <p className={styles.memberTitle}>{member.title}</p>
            </div>
          ))}
        </div>

        <div className={styles.coChairsSection}>
          <h3 className={styles.coChairsTitle}>{data.coChairsTitle}</h3>
          <div className={styles.coChairsGrid}>
            {data.coChairs.map((member, index) => (
              <div key={index} className={styles.coChairItem}>
                <div className={styles.coChairName}>{member.name}</div>
                <div className={styles.coChairTitle}>{member.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
