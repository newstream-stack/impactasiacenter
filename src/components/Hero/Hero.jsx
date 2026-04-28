import styles from './Hero.module.css';
import { useI18n } from '../../i18n/I18nContext';
import Countdown from '../Countdown/Countdown';

const HERO_IMG = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000'; // Arizona Desert Vibe

export default function Hero() {
  const { t } = useI18n();
  return (
    <section className={styles.hero} style={{ backgroundImage: `linear-gradient(to bottom, rgba(34,37,51,0.6), #222533), url('${HERO_IMG}')` }}>
      <div className={`${styles.content} animate-float`}>
        <p className={styles.subtitle}>{t('heroSubtitle')}</p>
        <h1 className={styles.fluidTitle}>{t('heroTitle')}</h1>
        <Countdown />
        <p className={styles.eventName}>{t('heroEventName')}</p>
        <div className={styles.cta}>
          <button className={`${styles.btnPrimary} glow-orange`}>{t('btnRegister')}</button>
          <a 
            href="https://ct.org.tw/html/dedication/8-2-2.php?article=117" 
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
