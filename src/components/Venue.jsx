import styles from './Venue.module.css'

const VENUE_IMG = 'https://media.ct.org.tw/upload/news_article_cms/2026/04/21/59235_2.jpg'

export default function Venue() {
  return (
    <section id="venue" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>會場資訊</h2>
          <div className={styles.line} />
        </div>
        <div className={styles.showcase}>
          <div className={styles.main} style={{ backgroundImage: `url('${VENUE_IMG}')` }}>
            <div className={styles.tag}>亞利桑那州鳳凰城 頂級度假村</div>
          </div>
          <div className={styles.info}>
            <h3>曠野中的奢華靜謐</h3>
            <p>2026年前往北美鳳凰城，祝福北美地區與亞太教會的聯合，邀請您與我們一同見證神在沙漠開江河、曠野開道路的奇妙作為！</p>
            <ul className={styles.list}>
              <li><span>📍</span> First Baptist Church Tempe</li>
              <li><span>📅</span> 2026 年 10 月 20-23 日</li>
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
