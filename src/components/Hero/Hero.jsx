import styles from './Hero.module.css';
import { useI18n } from '../../i18n/I18nContext';
import Countdown from '../Countdown/Countdown';

const HERO_IMG = '/opening.jpg';

const HotelIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export default function Hero() {
  const { t, language } = useI18n();
  const hero = t('hero');
  const venue = t('venue');
  const recommendedHotel = venue.hotels.find((h) => h.recommended);
  const [location, date] = hero.subtitle.split(' | ');
  return (
    <section id="hero-section" className={styles.hero} style={{ backgroundImage: `linear-gradient(to bottom, rgba(34,37,51,0.6), #222533), url('${HERO_IMG}')` }}>
      <div className={styles.content}>
        <p className={styles.subtitle}>
          <span className={styles.subtitleLocation}>{location}</span>
          <span className={styles.subtitleDate}>{date}</span>
        </p>
        <div className={styles.titleContainer}>
          {language === 'en' ? (
            <div className={styles.futuristicTitle}>
              <span className={styles.small}>FROM</span>
              <span className={styles.large}>WILDERNESS</span>
              <span className={styles.small}>TO</span>
              <span className={styles.large}>REBIRTH</span>
            </div>
          ) : (
            <h1 className={styles.fluidTitle}>{hero.title}</h1>
          )}
        </div>
        <p className={styles.tagline}>{hero.tagline}</p>
        <p className={styles.tagline2}>{hero.tagline2}</p>
        <p className={styles.tagline3}>{hero.tagline3}</p>
        <Countdown />

        {recommendedHotel && (
          <div className={styles.hotelWrapper}>
            <a
              href={recommendedHotel.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.hotelCard}
            >
              <span className={styles.hotelIcon}><HotelIcon /></span>
              <span className={styles.hotelInfo}>
                <span className={styles.hotelEyebrow}>{hero.recommendedHotelLabel}</span>
                <span className={styles.hotelName}>{recommendedHotel.name}</span>
                <span className={styles.hotelMeta}>
                  {recommendedHotel.address} · {recommendedHotel.driveTime}
                </span>
              </span>
              <span className={styles.hotelLinkIcon}><ExternalLinkIcon /></span>
            </a>
            <a
              href="https://www.hilton.com/en/attend-my-event/phxtpes-91l-89df9ea1-a620-4440-b972-8c30e85323bc/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.hotelMoreLink}
            >
              <ExternalLinkIcon />
              {hero.viewMoreHotels}
            </a>
            <div className={styles.hotelPhotos}>
              <img src="/hotel.png" alt={recommendedHotel.name} className={styles.hotelPhoto} loading="lazy" />
              <img src="/hotel1.png" alt={recommendedHotel.name} className={styles.hotelPhoto} loading="lazy" />
            </div>
          </div>
        )}

        <p className={styles.eventName}>{hero.eventName}</p>
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
        </div>
      </div>
    </section>
  );
}
