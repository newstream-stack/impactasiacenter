import { timelineData } from '../data/timeline';
import styles from './Timeline.module.css';

export default function Timeline() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>亞洲信仰新世代</h2>
          <p className={styles.subtitle}>OUR JOURNEY (2022 - 2026)</p>
        </div>

        <div className={styles.timeline}>
          <div className={styles.line} />
          {timelineData.map((item, index) => (
            <div
              key={index}
              className={`${styles.item} ${index % 2 === 0 ? styles.even : styles.odd} ${item.active ? styles.activeItem : ''}`}
            >
              <div className={styles.dot} />

              <div className={styles.content}>
                <div className={styles.textContent}>
                  <div className={styles.location}>
                    <h3>{item.region}</h3>
                    <span className={styles.year}>{item.year}</span>
                  </div>
                  <p className={styles.description}>{item.description}</p>
                </div>

                <div className={styles.imageContainer}>
                  <img src={item.img} alt={item.region} className={styles.image} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
