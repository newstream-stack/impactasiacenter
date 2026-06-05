import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import SpeakerCard from '../SpeakerCard/SpeakerCard'
import { useI18n } from '../../i18n/I18nContext'
import SectionHeader from '../SectionHeader/SectionHeader'
import styles from './Speakers.module.css'

function getInitials(name) {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function SpeakerModal({ speaker, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose} aria-label="關閉">✕</button>

        {speaker.img ? (
          <div className={styles.modalAvatarWrap}>
            <img
              src={`${speaker.img}?v=2`}
              alt={speaker.name}
              className={styles.modalAvatar}
            />
          </div>
        ) : (
          <div className={styles.modalInitials}>{getInitials(speaker.name)}</div>
        )}

        <h3 className={styles.modalName}>{speaker.name}</h3>
        <p className={styles.modalTitle}>{speaker.title}</p>
        {speaker.bio && <div className={styles.modalDivider} />}
        {speaker.bio
          ? <p className={styles.modalBio}>{speaker.bio}</p>
          : <p className={styles.modalBioPlaceholder}>介紹即將更新</p>
        }
      </div>
    </div>,
    document.body
  )
}

export default function Speakers() {
  const { t } = useI18n()
  const speakersSection = t('speakersSection')
  const speakers = t('speakers') || []
  const [activeSpeaker, setActiveSpeaker] = useState(null)

  return (
    <>
      <section id="speakers" className={styles.section}>
        <div className={styles.container}>
          <SectionHeader title={speakersSection?.title || '重磅講員'} />
          <div className={styles.grid}>
            {speakers.map((s) => (
              <SpeakerCard
                key={s.id}
                {...s}
                onClick={() => setActiveSpeaker(s)}
              />
            ))}
          </div>
        </div>
      </section>

      {activeSpeaker && (
        <SpeakerModal
          speaker={activeSpeaker}
          onClose={() => setActiveSpeaker(null)}
        />
      )}
    </>
  )
}
