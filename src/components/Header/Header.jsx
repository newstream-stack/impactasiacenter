import { useState } from 'react';
import styles from './Header.module.css';
import { useI18n } from '../../i18n/I18nContext';
import { useScrollThreshold } from '../../hooks/useScrollThreshold';
import { smoothScrollTo } from '../../utils/scroll';

export default function Header() {
  const scrolled = useScrollThreshold(100);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, toggleLanguage } = useI18n();

  const navLinks = [
    { href: '#vision', label: t('navVision') },
    { href: '#presidium', label: t('navPresidium') },
    { href: '#themes', label: t('navThemes') },
    { href: '#venue', label: t('navVenue') },
  ];

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);
    smoothScrollTo(href);
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${isMenuOpen ? styles.menuOpen : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>IMPACT ASIA 2026</div>
        
        <div className={`${styles.links} ${isMenuOpen ? styles.linksVisible : ''}`}>
          {navLinks.map(({ href, label }) => (
            <a key={href} href={href} onClick={(e) => handleSmoothScroll(e, href)}>
              {label}
            </a>
          ))}
          <a href={t('donationUrl')} target="_blank" rel="noopener noreferrer" className={styles.btnDonate}>
            {t('navSupport')}
          </a>
        </div>

        <div className={styles.navActions}>
          <button onClick={toggleLanguage} className={styles.langToggle}>
            {language === 'zh' ? 'EN' : '中文'}
          </button>
          
          <button className={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={t('ariaMenu')}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
