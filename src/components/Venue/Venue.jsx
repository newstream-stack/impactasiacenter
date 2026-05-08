import styles from './Venue.module.css'
import { useI18n } from '../../i18n/I18nContext'
import SectionHeader from '../SectionHeader/SectionHeader'

const VENUE_IMG = 'https://media.ct.org.tw/upload/news_article_cms/2026/04/21/59235_2.jpg'

const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const CalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
)

export default function Venue() {
  const { t } = useI18n()
  const venue = t('venue')
  return (
    <section id="venue" className={styles.section}>
      <div className={styles.container}>
        <SectionHeader title={venue.title} />
        <div className={styles.showcase}>
          <div className={styles.main} style={{ backgroundImage: `url('${VENUE_IMG}')` }}>
            <div className={styles.tag}>{venue.name}</div>
          </div>
          <div className={styles.info}>
            <h3>{venue.heading}</h3>
            <p>{venue.desc}</p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.listIcon}><PinIcon /></span>
                <span className={styles.listText}>{venue.name}</span>
              </li>
              <li className={styles.listItem}>
                <span className={styles.listIcon}><CalIcon /></span>
                <span className={styles.listText}>{venue.date}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.mapContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3331.066479018446!2d-111.9100067!3d33.3768853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b05cf14e7a78b%3A0x8a3ec1d720adb80e!2sFirst%20Baptist%20Church%20Tempe!5e0!3m2!1sen!2stw!4v1713687350000!5m2!1sen!2stw"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map of First Baptist Church Tempe"
          ></iframe>
        </div>
      </div>
    </section>
  )
}
