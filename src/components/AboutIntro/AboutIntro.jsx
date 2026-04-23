import { useState } from 'react';
import styles from './AboutIntro.module.css';
import { useI18n } from '../../i18n/I18nContext';

export default function AboutIntro({ onMoreClick }) {
  const { t } = useI18n();
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
          onClick={() => onMoreClick(about)}
        >
          {t('about.btnMore') || '了解更多'} <span className={styles.arrow}>→</span>
        </button>
      </div>
    </section>
  );
}
