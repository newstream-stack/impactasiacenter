import styles from './Footer.module.css'
import { useI18n } from '../../i18n/I18nContext'
import { smoothScrollTo } from '../../utils/scroll'

export default function Footer() {
  const { t } = useI18n()
  const footer = t('footer')

  const handleSmoothScroll = (e, href) => {
    e.preventDefault()
    smoothScrollTo(href)
  }

  const quickLinks = [
    { href: '#vision', label: t('navVision') },
    { href: '#iaa-intro', label: t('navIAAIntro') },
    { href: '#phoenix', label: t('navPhoenix') },
    { href: '#presidium', label: t('navPresidium') },
    { href: '#themes', label: t('navThemes') },
    { href: '#venue', label: t('navVenue') },
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>IMPACT ASIA 2026</div>
            <p>{footer.brandDesc}</p>
          </div>
          <div className={styles.links}>
            <span className={styles.colTitle}>{footer.quickLinks}</span>
            {quickLinks.map(({ href, label }) => (
              <a key={href} href={href} onClick={(e) => handleSmoothScroll(e, href)}>
                {label}
              </a>
            ))}
          </div>
          <div className={styles.contact}>
            <span className={styles.colTitle}>{footer.contact}</span>
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
