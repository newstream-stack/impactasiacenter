import { useI18n } from '../../i18n/I18nContext'
import { useIntersectionVisible } from '../../hooks/useIntersectionVisible'
import styles from './FloatingRegisterBtn.module.css'

export default function FloatingRegisterBtn() {
  const { t } = useI18n()
  const heroVisible = useIntersectionVisible('hero-section')
  const visible = !heroVisible

  return (
    <button
      className={`${styles.btn} ${visible ? styles.show : ''}`}
      aria-label={t('btnRegister')}
    >
      {t('btnRegister')}
    </button>
  )
}
