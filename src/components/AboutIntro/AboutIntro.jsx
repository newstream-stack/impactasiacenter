import styles from './AboutIntro.module.css';
import { useI18n } from '../../i18n/I18nContext';

export default function AboutIntro({ onMoreClick }) {
  const { t } = useI18n();
  const about = t('about');
  const inv = about.invitation;

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.label}>{inv.label}</div>

        <p className={styles.salutation}>{inv.salutation}</p>

        <p className={styles.opening}>{inv.opening}</p>

        <div className={styles.questionBlock}>
          <p className={styles.questionIntro}>{inv.questionIntro}</p>
          <p className={styles.wrongQuestion}>{inv.wrongQuestion}</p>
          <p className={styles.questionBridge}>{inv.questionBridge}</p>
          <p className={styles.rightQuestion}>{inv.rightQuestion}</p>
        </div>

        <ul className={styles.bulletList}>
          {inv.techLimits.map((item, i) => (
            <li key={i} className={styles.bulletItem}>{item}</li>
          ))}
        </ul>

        <div className={styles.divider} />

        <p className={styles.manifestoTitle}>{inv.manifestoTitle}</p>
        <ul className={styles.manifestoList}>
          {inv.manifesto.map((item, i) => (
            <li key={i} className={styles.manifestoItem}>{item}</li>
          ))}
        </ul>

        <p className={styles.inviteText}>{inv.inviteText}</p>

        <div className={styles.topicsBlock}>
          <p className={styles.topicsTitle}>{inv.topicsTitle}</p>
          <ul className={styles.topicGrid}>
            {inv.topics.map((topic, i) => (
              <li key={i} className={styles.topicTag}>{topic}</li>
            ))}
          </ul>
        </div>

        <div className={styles.divider} />

        <div className={styles.ctaBlock}>
          <p className={styles.ctaTitle}>{inv.ctaTitle}</p>
          <p className={styles.ctaEvent}>{inv.ctaEvent}</p>
          <p className={styles.ctaLocation}>{inv.ctaLocation}</p>
        </div>

        <p className={styles.closing}>{inv.closing}</p>

        <div className={styles.divider} />

        <blockquote className={styles.verse}>
          <p>{inv.verse}</p>
          <cite>{inv.verseRef}</cite>
        </blockquote>

        <button className={styles.moreBtn} onClick={() => onMoreClick(about)}>
          {about.btnMore} <span className={styles.arrow}>→</span>
        </button>

      </div>
    </section>
  );
}
