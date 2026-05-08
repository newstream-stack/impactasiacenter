import styles from './BackToTop.module.css'
import { useScrollThreshold } from '../../hooks/useScrollThreshold'
import { useI18n } from '../../i18n/I18nContext'

export default function BackToTop() {
  const { t } = useI18n()
  const visible = useScrollThreshold(500)

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={styles.btn}
      aria-label={t('ariaBackToTop')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 15l7-7 7 7" />
      </svg>
    </button>
  )
}
