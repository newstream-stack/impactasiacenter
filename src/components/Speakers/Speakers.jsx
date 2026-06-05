import { useState } from 'react'
import { createPortal } from 'react-dom'
import SpeakerCard from '../SpeakerCard/SpeakerCard'
import { useI18n } from '../../i18n/I18nContext'
import SectionHeader from '../SectionHeader/SectionHeader'
import styles from './Speakers.module.css'

function SpeakerModal({ speaker, onClose }) {
  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>✕</button>
        {speaker.img && (
          <div className={styles.modalAvatarWrap}>
            <img src={speaker.img} alt={speaker.name} className={styles.modalAvatar} />
          </div>
        )}
        <h3 className={styles.modalName}>{speaker.name}</h3>
        <p className={styles.modalTitle}>{speaker.title}</p>
        {speaker.bio ? (
          <p className={styles.modalBio}>{speaker.bio}</p>
        ) : (
          <p className={styles.modalBioPlaceholder}>介紹即將更新</p>
        )}
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
