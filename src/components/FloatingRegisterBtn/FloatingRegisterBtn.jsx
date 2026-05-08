import { useI18n } from '../../i18n/I18nContext'
import { useIntersectionVisible } from '../../hooks/useIntersectionVisible'
import styles from './FloatingRegisterBtn.module.css'

export default function FloatingRegisterBtn() {
  const { t } = useI18n()
  const heroVisible = useIntersectionVisible('hero-section')
  const visible = !heroVisible

  return (
    <a
      href={t('registrationUrl')}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.btn} ${visible ? styles.show : ''}`}
      aria-label={t('btnRegister')}
    >
      {t('btnRegister')}
    </a>
  )
}
