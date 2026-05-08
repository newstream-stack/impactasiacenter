import { useState } from 'react';
import { useI18n } from '../../i18n/I18nContext';
import SectionHeader from '../SectionHeader/SectionHeader';
import TimelineModal from '../TimelineModal/TimelineModal';
import styles from './Timeline.module.css';

export default function Timeline() {
  const { t } = useI18n();
  const timelineSection = t('timelineSection');
  const timelineData = t('timeline');
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
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

                  <div
                    className={`${styles.imageContainer} ${item.detail ? styles.clickable : ''}`}
                    onClick={() => item.detail && setSelectedItem(item)}
                    role={item.detail ? 'button' : undefined}
                    tabIndex={item.detail ? 0 : undefined}
                    onKeyDown={(e) => { if (item.detail && (e.key === 'Enter' || e.key === ' ')) setSelectedItem(item) }}
                    aria-label={item.detail ? item.region : undefined}
                  >
                    <img src={item.img} alt={item.region} className={styles.image} />
                    {item.detail && (
                      <>
                        <div className={styles.imageOverlay}>
                          <span className={styles.readMore}>了解更多 →</span>
                        </div>
                        <span className={styles.readMoreBadge}>了解更多 →</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TimelineModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  );
}
