import styles from './Hero.module.css';
import { useI18n } from '../../i18n/I18nContext';
import Countdown from '../Countdown/Countdown';

const HERO_IMG = '/temp.jpg';        // desktop: artwork only, text is live DOM
const HERO_IMG_MOBILE = '/temp1.jpg'; // phones: full invitation poster, headline text baked in
const HOTEL_IMG = '/hotel.png';
const HOTEL_BOOKING_URL = 'https://www.hilton.com/en/attend-my-event/phxtpes-91l-89df9ea1-a620-4440-b972-8c30e85323bc/';

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function Hero() {
  const { t, language } = useI18n();
  const hero = t('hero');
  const venue = t('venue');
  const hotel = venue.hotels.find((h) => h.recommended);
  const [location, date] = hero.subtitle.split(' | ');

  return (
    <section id="hero-section" className={styles.hero}>
      <div className={`${styles.media} ${styles.mediaDesktop}`} style={{ backgroundImage: `url('${HERO_IMG}')` }} aria-hidden="true" />
      <div className={`${styles.media} ${styles.mediaMobile}`} style={{ backgroundImage: `url('${HERO_IMG_MOBILE}')` }} aria-hidden="true" />
      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.content}>
        {/* On phones the poster image carries this headline block, so it's hidden
            visually there but kept in the DOM for search engines and screen readers. */}
        <div className={styles.headline}>
          <p className={styles.eventName}>{hero.eventName}</p>

          <p className={styles.eyebrow}>
            <span>{location}</span>
            <span className={styles.dot} aria-hidden="true" />
            <span>{date}</span>
          </p>

          <h1 className={styles.title}>
            {language === 'en' ? (
              <>
                From Wilderness
                <span className={styles.titleLine2}>to Rebirth</span>
              </>
            ) : (
              hero.title
            )}
          </h1>

          <p className={styles.lead}>{hero.tagline}</p>
          <p className={styles.sub}>{hero.tagline2}</p>

          <div className={styles.creed}>
            {hero.tagline3.split('\n').filter(Boolean).map((line) => (
              <span key={line}>{line.trim()}</span>
            ))}
          </div>
        </div>

        <Countdown />

        {hero.meta && (
          <dl className={styles.meta}>
            <div className={styles.metaItem}>
              <dt>{hero.meta.dateLabel}</dt>
              <dd>{hero.meta.dateValue}</dd>
            </div>
            <div className={styles.metaItem}>
              <dt>{hero.meta.deadlineLabel}</dt>
              <dd className={styles.metaUrgent}>{hero.meta.deadlineValue}</dd>
            </div>
          </dl>
        )}

        <div className={styles.cta}>
          <a
            href={language === 'en'
              ? 'https://ct.org.tw/html/activity/6-3-eng.php?article=39&area=&id=&parentid='
              : 'https://ct.org.tw/html/activity/6-3.php?article=38&area=&id=&parentid='}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnPrimary}
          >
            {t('btnRegister')}
          </a>
          <a href="#schedule" className={styles.btnGhost}>{t('navSchedule')}</a>
        </div>

        {/* Official hotel partner — contractual placement, kept above the fold */}
        {hotel && (
          <a
            href={HOTEL_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.hotelBand}
          >
            <img src={HOTEL_IMG} alt="" className={styles.hotelPhoto} loading="lazy" />
            <span className={styles.hotelBody}>
              <span className={styles.hotelLabel}>{hero.recommendedHotelLabel}</span>
              <span className={styles.hotelName}>{hotel.name}</span>
              <span className={styles.hotelMeta}>
                {hotel.address}
                <span className={styles.hotelSep} aria-hidden="true" />
                {hotel.driveTime}
              </span>
            </span>
            <span className={styles.hotelAction}>
              {hero.viewMoreHotels}
              <ArrowIcon />
            </span>
          </a>
        )}
      </div>

      <a href="#vision" className={styles.scrollCue} aria-label="Scroll">
        <span className={styles.scrollLine} />
      </a>
    </section>
  );
}
