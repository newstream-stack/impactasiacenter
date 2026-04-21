const THUMBNAIL = 'https://images.unsplash.com/photo-1540039155732-d68f760ceec7?auto=format&fit=crop&q=80&w=1200'

import styles from './TrailerSection.module.css'

export default function TrailerSection({ onPlayVideo }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>官方前導預告</h2>
          <p className={styles.subtitle}>OFFICIAL TRAILER 2026</p>
        </div>
        <div className={styles.player} onClick={onPlayVideo}>
          <div
            className={styles.thumbnail}
            style={{ backgroundImage: `url('${THUMBNAIL}')` }}
          />
          <div className={styles.overlay}>
            <div className={styles.playBtn}>
              <div className={styles.playIcon} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
