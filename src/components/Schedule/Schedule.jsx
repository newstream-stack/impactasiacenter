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
              <header className={styles.dayHeader}>
                <p className={styles.dayNumber}>{day.dayNumber}</p>
                <div>
                  <p className={styles.weekday}>{day.weekday}</p>
                  <p className={styles.theme}>{day.theme}</p>
                </div>
              </header>
              <div className={styles.divider} />
              <ul className={styles.sessions}>
                {day.sessions.map((session) => (
                  <li className={styles.session} key={`${day.date}-${session.time}-${session.label}`}>
                    {session.time && <span className={styles.time}>{session.time}</span>}
                    <span className={styles.label}>{session.label}</span>
                    {session.note && <span className={styles.note}>{session.note}</span>}
                    {session.program && (
                      <details className={styles.program}>
                        <summary className={styles.programSummary}>{schedule.programToggle}</summary>
                        <ol className={styles.programList}>
                          {session.program.map((item, index) => (
                            <li
                              className={item.highlight ? styles.programItemHighlight : styles.programItem}
                              key={`${item.title}-${index}`}
                            >
                              <span className={styles.programTitle}>{item.title}</span>
                              {item.note && <span className={styles.programNote}>{item.note}</span>}
                            </li>
                          ))}
                        </ol>
                      </details>
                    )}
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
