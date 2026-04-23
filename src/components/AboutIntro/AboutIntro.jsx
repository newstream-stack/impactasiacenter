import { useState } from 'react';
import styles from './AboutIntro.module.css';
import { useI18n } from '../../i18n/I18nContext';

export default function AboutIntro() {
  const { t } = useI18n();
  const [isExpanded, setIsExpanded] = useState(false);
  const about = t('about');

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.intro}>
          {about.summary.split('\n').map((line, i) => (
            <p key={i} className={styles.introLine}>{line}</p>
          ))}
        </div>
        
        <button 
          className={styles.moreBtn}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? about.btnLess : about.btnMore}
          <span className={`${styles.arrow} ${isExpanded ? styles.up : ''}`}>↓</span>
        </button>

        <div className={`${styles.details} ${isExpanded ? styles.expanded : ''}`}>
          <div className={styles.detailsContent}>
            {about.details.split('\n').map((line, i) => (
              <p key={i} className={styles.detailLine}>{line || '\u00A0'}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
