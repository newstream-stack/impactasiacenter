import { useI18n } from '../../i18n/I18nContext';
import SectionHeader from '../SectionHeader/SectionHeader';
import styles from './Timeline.module.css';

export default function Timeline() {
  const { t } = useI18n();
  const timelineSection = t('timelineSection');
  const timelineData = t('timeline');
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeader
          title={timelineSection.title}
          subtitle={timelineSection.subtitle}
          showLine={false}
          style={{ marginBottom: '6rem' }}
        />

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
