import styles from './Venue.module.css'

const VENUE_IMG = 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200'

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
            <p>2026 年大會將於美國鳳凰城著名的沙漠度假村舉行。這裡獨特的地貌與現代建築的融合，將為每一位與會者提供深刻的反思空間。</p>
            <ul className={styles.list}>
              <li><span>📍</span> JW Marriott Phoenix Desert Ridge</li>
              <li><span>📅</span> 2026 年 10 月 22-25 日</li>
              <li><span>🛏️</span> 尊榮住宿體驗與頂級餐飲</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
