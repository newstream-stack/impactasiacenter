import { useState } from 'react';
import { useI18n } from '../../i18n/I18nContext';
import SectionHeader from '../SectionHeader/SectionHeader';
import TimelineModal from '../TimelineModal/TimelineModal';
import JourneyStory from '../JourneyStory/JourneyStory';
import Letter from '../Letter/Letter';
import styles from './Timeline.module.css';

export default function Timeline() {
  const { t } = useI18n();
  const timelineSection = t('timelineSection');
  const timelineData = t('timeline');
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <div className="reveal"><JourneyStory /></div>
      <div className="reveal"><Letter /></div>
      <section className={`reveal ${styles.section}`}>
        <div className={styles.container}>
          <SectionHeader
            title={timelineSection.title}
            subtitle={timelineSection.subtitle}
            showLine={false}
            style={{ marginBottom: '3.5rem' }}
          />

          {/* Horizontal rail: five editions read as one journey instead of five full-width rows */}
          <div className={styles.rail}>
            <div className={styles.railLine} />
            <ul className={styles.track}>
              {timelineData.map((item, index) => (
                <li
                  key={index}
                  className={`${styles.stop} ${item.active ? styles.activeItem : ''}`}
                >
                  <span className={styles.year}>{item.year}</span>
                  <span className={styles.dot} />

                  <div
                    className={`${styles.card} ${item.detail ? styles.clickable : ''}`}
                    onClick={() => item.detail && setSelectedItem(item)}
                    role={item.detail ? 'button' : undefined}
                    tabIndex={item.detail ? 0 : undefined}
                    onKeyDown={(e) => { if (item.detail && (e.key === 'Enter' || e.key === ' ')) setSelectedItem(item) }}
                    aria-label={item.detail ? item.region : undefined}
                  >
                    <div className={styles.imageContainer}>
                      {/* Blurred copy fills the letterbox bands so nothing is cropped */}
                      <span
                        className={styles.imageBackdrop}
                        style={{ backgroundImage: `url('${item.img}')` }}
                        aria-hidden="true"
                      />
                      <img src={item.img} alt={item.region} className={styles.image} loading="lazy" />
                      <span className={styles.imageOverlay} />
                      {item.detail && <span className={styles.readMore}>了解更多 →</span>}
                    </div>
                    <h3 className={styles.region}>{item.region}</h3>
                    <p className={styles.description}>{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <TimelineModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  );
}
