import styles from './TrailerSection.module.css'

export default function TrailerSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>官方前導預告</h2>
          <p className={styles.subtitle}>OFFICIAL TRAILER 2026</p>
        </div>
        <div className={styles.player}>
          <div className={styles.videoResponsive}>
            <iframe
              src="https://www.youtube.com/embed/2IvNbOhBPwA"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Impact Asia 2026 Official Trailer"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
