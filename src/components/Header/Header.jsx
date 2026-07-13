import { useState, useMemo } from 'react';
import styles from './Header.module.css';
import { useI18n } from '../../i18n/I18nContext';
import { useScrollThreshold } from '../../hooks/useScrollThreshold';
import { useActiveSection } from '../../hooks/useActiveSection';
import { smoothScrollTo } from '../../utils/scroll';

export default function Header() {
  const scrolled = useScrollThreshold(100);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, toggleLanguage } = useI18n();

  const navLinks = [
    { href: '#vision', label: t('navVision') },
    { href: '#iaa-intro', label: t('navIAAIntro') },
    { href: '#phoenix', label: t('navPhoenix') },
    { href: '#presidium', label: t('navPresidium') },
    { href: '#speakers', label: t('navSpeakers') },
    { href: '#themes', label: t('navThemes') },
    { href: '#venue', label: t('navVenue') },
    { href: '#faq', label: t('navFaq') },
  ];

  const sectionIds = useMemo(() => navLinks.map((l) => l.href), [language]);
  const activeId = useActiveSection(sectionIds);

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);
    smoothScrollTo(href);
  };

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${isMenuOpen ? styles.menuOpen : ''}`}>
        <div className={styles.container}>
          <div className={styles.logo}>IMPACT ASIA 2026</div>

          <div className={`${styles.links} ${isMenuOpen ? styles.linksVisible : ''}`}>
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleSmoothScroll(e, href)}
                className={activeId === href ? styles.active : ''}
              >
                {label}
              </a>
            ))}
          </div>

          <div className={styles.navActions}>
            <button onClick={toggleLanguage} className={styles.langToggle}>
              {language === 'zh' ? t('languageEnglish') : t('languageChinese')}
            </button>

            <button className={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={t('ariaMenu')}>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className={styles.backdrop} onClick={() => setIsMenuOpen(false)} aria-hidden="true" />
      )}
    </>
  );
}
