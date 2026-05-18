import { useI18n } from '../../i18n/I18nContext'
import { useIntersectionVisible } from '../../hooks/useIntersectionVisible'
import styles from './FloatingRegisterBtn.module.css'

export default function FloatingRegisterBtn() {
  const { t, language } = useI18n()
  const heroVisible = useIntersectionVisible('hero-section')
  const visible = !heroVisible

  return (
    <a
      href={language === 'en'
        ? 'https://ct.org.tw/html/activity/6-3-eng.php?article=39&area=&id=&parentid='
        : 'https://ct.org.tw/html/activity/6-3.php?article=38&area=&id=&parentid='}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.btn} ${visible ? styles.show : ''}`}
      aria-label={t('btnRegister')}
    >
      {t('btnRegister')}
    </a>
  )
}
