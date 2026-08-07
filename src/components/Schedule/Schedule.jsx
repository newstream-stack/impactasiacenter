import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nContext';
import styles from './Schedule.module.css';

export default function Schedule() {
  const { t } = useI18n();
  const schedule = t('scheduleSection');
  const dailyProgram = t('dailyProgram');

  return (
    <section className={styles.section} id="schedule">
      <div className={styles.container}>
        <p className={styles.eyebrow}>{schedule.eyebrow}</p>
        <h2 className={styles.title}>{schedule.title}</h2>
        <div className={styles.scheduleGrid}>
          {schedule.days.map((day) => (
            <article className={styles.dayCard} key={day.date}>
              <p className={styles.date}>{day.date}</p>
              <div className={styles.divider} />
              <ul className={styles.sessions}>
                {day.sessions.map((session) => (
                  <li className={styles.session} key={`${day.date}-${session.time}`}>
                    <span className={styles.time}>{session.time}</span>
                    {session.label && <span className={styles.label}>{session.label}</span>}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Hidden temporarily
        <p className={styles.dailyProgramTitle}>{dailyProgram.homeLinkTitle}</p>
        <div className={styles.dailyProgramLinks}>
          {dailyProgram.days.map((day) => (
            <Link
              className={styles.dailyProgramLink}
              to={`/day/${day.id}`}
              key={day.id}
              target="_blank"
              rel="noopener noreferrer"
            >
              {dailyProgram.dayLabel} {day.id}
            </Link>
          ))}
        </div>
        */}
      </div>
    </section>
  );
}
