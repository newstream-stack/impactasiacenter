import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { useI18n } from '../../i18n/I18nContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, toggleLanguage } = useI18n();

  const navLinks = [
    { href: '#vision', label: t('navVision') },
    // { href: '#speakers', label: '大會講員' },
    { href: '#themes', label: t('navThemes') },
    { href: '#venue', label: t('navVenue') },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e, href) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    setIsMenuOpen(false); // Close menu on click
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    const offset = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${isMenuOpen ? styles.menuOpen : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>IMPACT ASIA 2026</div>
        
        <button className={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>

        <div className={`${styles.links} ${isMenuOpen ? styles.linksVisible : ''}`}>
          {navLinks.map(({ href, label }) => (
            <a key={href} href={href} onClick={(e) => handleSmoothScroll(e, href)}>
              {label}
            </a>
          ))}
          <button onClick={toggleLanguage} className={styles.langToggle} style={{ background: 'transparent', border: '1px solid currentColor', color: 'inherit', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', marginLeft: '1rem' }}>
            {language === 'zh' ? 'EN' : '中文'}
          </button>
          <a href="https://ct.org.tw/html/dedication/8-2-2.php?article=117" target="_blank" rel="noopener noreferrer" className={styles.btnDonate}>
            {t('navSupport')}
          </a>
        </div>
      </div>
    </nav>
  );
}
