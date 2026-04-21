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
      </div>
    </section>
  )
}
