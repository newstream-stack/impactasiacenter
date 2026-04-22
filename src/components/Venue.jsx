import styles from './Venue.module.css'
import { useI18n } from '../i18n/I18nContext'

const VENUE_IMG = 'https://media.ct.org.tw/upload/news_article_cms/2026/04/21/59235_2.jpg'

export default function Venue() {
  const { t } = useI18n()
  const venue = t('venue')
  return (
    <section id="venue" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{venue.title}</h2>
          <div className={styles.line} />
        </div>
        <div className={styles.showcase}>
          <div className={styles.main} style={{ backgroundImage: `url('${VENUE_IMG}')` }}>
            <div className={styles.tag}>{venue.name}</div>
          </div>
          <div className={styles.info}>
            <h3>{venue.heading}</h3>
            <p>{venue.desc}</p>
            <ul className={styles.list}>
              <li><span>📍</span> {venue.name}</li>
              <li><span>📅</span> {venue.date}</li>
              {/* <li><span>🛏️</span> 尊榮住宿體驗與頂級餐飲</li> */}
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
