import { Link, useParams } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nContext';
import styles from './DailyProgram.module.css';

export default function DailyProgram() {
  const { dayId } = useParams();
  const { t, language, toggleLanguage } = useI18n();
  const program = t('dailyProgram');
  const day = program.days.find((d) => String(d.id) === dayId);

  if (!day) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.title}>{program.notFoundTitle}</h1>
          <p className={styles.notFoundBody}>{program.notFoundBody}</p>
          <Link className={styles.backLink} to="/#schedule">{program.backLabel}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <button type="button" className={styles.langToggle} onClick={toggleLanguage}>
          {language === 'zh' ? 'EN' : '中文'}
        </button>

        <p className={styles.weekday}>{day.weekday}</p>
        <h1 className={styles.title}>{day.title}</h1>
        <p className={styles.date}>{day.date}</p>

        <nav className={styles.dayNav}>
          {program.days.map((d) => (
            <Link
              key={d.id}
              to={`/day/${d.id}`}
              className={`${styles.dayTab} ${d.id === day.id ? styles.dayTabActive : ''}`}
            >
              {program.dayLabel} {d.id}
            </Link>
          ))}
        </nav>

        <ul className={styles.sessions}>
          {day.sessions.map((session, index) => (
            <li className={styles.session} key={`${day.id}-${index}`}>
              <span className={styles.time}>{session.time}</span>
              <div className={styles.sessionBody}>
                <p className={styles.sessionTitle}>{session.title}</p>
                {session.location && <p className={styles.sessionLocation}>{session.location}</p>}
              </div>
            </li>
          ))}
        </ul>

        <Link className={styles.backLink} to="/#schedule">{program.backLabel}</Link>
      </div>
    </div>
  );
}
