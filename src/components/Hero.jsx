import styles from './Hero.module.css';

const HERO_IMG = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000'; // Arizona Desert Vibe

export default function Hero() {
  return (
    <section className={styles.hero} style={{ backgroundImage: `linear-gradient(to bottom, rgba(34,37,51,0.6), #222533), url('${HERO_IMG}')` }}>
      <div className={styles.content}>
        <p className={styles.subtitle}>Phoenix, Arizona | Oct 2026</p>
        <h1 className={styles.fluidTitle}>曠野中的重生</h1>
        <p className={styles.eventName}>IMPACT ASIA ALLIANCE SUMMIT</p>
        <div className={styles.cta}>
          <button className={styles.btnPrimary}>立即報名</button>
          <a 
            href="https://ct.org.tw/html/dedication/8-2-2.php?article=117" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.btnSecondary}
          >
            線上奉獻 Support
          </a>
        </div>
      </div>
    </section>
  );
}
