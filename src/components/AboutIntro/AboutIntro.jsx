import styles from './AboutIntro.module.css';
import { useI18n } from '../../i18n/I18nContext';

export default function AboutIntro({ onMoreClick }) {
  const { t } = useI18n();
  const about = t('about');
  const inv = about.invitation;

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <span className={styles.label}>{inv.label}</span>
        <p className={styles.salutation}>{inv.salutation}</p>

        {/* The wrong question / right question pivot is the emotional hook — lead with it */}
        <div className={styles.pivot}>
          <p className={styles.questionIntro}>{inv.questionIntro}</p>
          <p className={styles.wrongQuestion}>{inv.wrongQuestion}</p>
          <p className={styles.questionBridge}>{inv.questionBridge}</p>
          <h2 className={styles.rightQuestion}>{inv.rightQuestion}</h2>
        </div>

        <p className={styles.opening}>{inv.opening}</p>

        {/* Three parallel statements read far better as a row than as a bullet list */}
        <ul className={styles.limits}>
          {inv.techLimits.map((item, i) => {
            const [able, unable] = item.split('，');
            return (
              <li key={i} className={styles.limitCard}>
                <span className={styles.limitNum}>{String(i + 1).padStart(2, '0')}</span>
                <p className={styles.limitAble}>{able}，</p>
                <p className={styles.limitUnable}>{unable}</p>
              </li>
            );
          })}
        </ul>

        <div className={styles.manifesto}>
          <p className={styles.manifestoTitle}>{inv.manifestoTitle}</p>
          <ol className={styles.manifestoList}>
            {inv.manifesto.map((item, i) => (
              <li key={i} className={styles.manifestoItem}>
                <span className={styles.manifestoNum}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.manifestoText}>{item}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.topicsBlock}>
          <p className={styles.topicsTitle}>{inv.topicsTitle}</p>
          <ul className={styles.topicGrid}>
            {inv.topics.map((topic, i) => (
              <li key={topic} className={styles.topicItem}>
                <span className={styles.topicNum}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.topicLabel}>{topic}</span>
              </li>
            ))}
          </ul>
          <p className={styles.inviteText}>{inv.inviteText}</p>
        </div>

        <div className={styles.closingBlock}>
          <p className={styles.closing}>{inv.closing}</p>
          <blockquote className={styles.verse}>
            <p>{inv.verse}</p>
            <cite>{inv.verseRef}</cite>
          </blockquote>
        </div>

        <div className={styles.ctaBlock}>
          <p className={styles.ctaTitle}>{inv.ctaTitle}</p>
          <p className={styles.ctaEvent}>{inv.ctaEvent}</p>
          <p className={styles.ctaLocation}>{inv.ctaLocation}</p>
          <button className={styles.moreBtn} onClick={() => onMoreClick(about)}>
            {about.btnMore} <span className={styles.arrow}>→</span>
          </button>
        </div>

      </div>
    </section>
  );
}
