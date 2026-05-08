import styles from './Hero.module.css';
import { useI18n } from '../../i18n/I18nContext';
import Countdown from '../Countdown/Countdown';

const HERO_IMG = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000'; // Arizona Desert Vibe

export default function Hero() {
  const { t, language } = useI18n();
  const hero = t('hero');
  return (
    <section id="hero-section" className={styles.hero} style={{ backgroundImage: `linear-gradient(to bottom, rgba(34,37,51,0.6), #222533), url('${HERO_IMG}')` }}>
      <div className={styles.content}>
        <p className={styles.subtitle}>{hero.subtitle}</p>
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
        <Countdown />
        <p className={styles.eventName}>{hero.eventName}</p>
        <div className={styles.cta}>
          <a 
            href={t('registrationUrl')} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.btnPrimary}
          >
            {t('btnRegister')}
          </a>
          <a 
            href={t('donationUrl')}
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.btnSecondary}
          >
            {t('btnSupportOnline')}
          </a>
        </div>
      </div>
    </section>
  );
}
