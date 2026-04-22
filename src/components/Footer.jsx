import styles from './Footer.module.css'
import { useI18n } from '../i18n/I18nContext'

export default function Footer() {
  const { t } = useI18n()
  const footer = t('footer')
  const handleSmoothScroll = (e, href) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    const offset = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>IMPACT ASIA 2026</div>
            <p>{footer.brandDesc}</p>
          </div>
          <div className={styles.links}>
            <h4>{footer.quickLinks}</h4>
            <a href="#vision" onClick={(e) => handleSmoothScroll(e, '#vision')}>{t('navVision')}</a>
            {/* <a href="#speakers" onClick={(e) => handleSmoothScroll(e, '#speakers')}>大會講員</a> */}
            <a href="#themes" onClick={(e) => handleSmoothScroll(e, '#themes')}>{t('navThemes')}</a>
            <a href="#venue" onClick={(e) => handleSmoothScroll(e, '#venue')}>{t('navVenue')}</a>
          </div>
          <div className={styles.contact}>
            <h4>{footer.contact}</h4>
            <p>{footer.email}</p>
            <p>{footer.phone}</p>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
