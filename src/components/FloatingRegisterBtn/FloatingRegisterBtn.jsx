import { useState, useEffect, useRef } from 'react'
import { useI18n } from '../../i18n/I18nContext'
import styles from './FloatingRegisterBtn.module.css'

export default function FloatingRegisterBtn() {
  const { t } = useI18n()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero-section')
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

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
