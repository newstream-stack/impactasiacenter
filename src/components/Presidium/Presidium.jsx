import { useState } from 'react'
import { useI18n } from '../../i18n/I18nContext'
import styles from './Presidium.module.css'

function BioModal({ member, onClose }) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>✕</button>
        {member.image && (
          <div className={styles.modalAvatarWrap}>
            <img src={member.image} alt={member.name} className={styles.modalAvatar} />
          </div>
        )}
        <div className={styles.modalRole}>{member.role}</div>
        <h3 className={styles.modalName}>{member.name}</h3>
        <p className={styles.modalTitle}>{member.title}</p>
        {member.bio && <p className={styles.modalBio}>{member.bio}</p>}
      </div>
    </div>
  )
}

export default function Presidium() {
  const { t } = useI18n()
  const data = t('presidium')
  const [activeModal, setActiveModal] = useState(null)

  if (!data) return null

  return (
    <section id="presidium" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>{data.subtitle}</span>
          <h2 className={styles.title}>{data.title}</h2>
          <div className={styles.line} />
        </div>

        <div className={styles.mainGrid}>
          {data.main.map((member, index) => (
            <div key={index} className={styles.memberCard}>
              {member.image && (
                <div className={styles.avatarWrap}>
                  <img src={member.image} alt={member.name} className={styles.avatar} />
                </div>
              )}
              <span className={styles.role}>{member.role}</span>
              <h3 className={styles.name}>{member.name}</h3>
              <p className={styles.memberTitle}>{member.title}</p>
              {member.bio && <p className={styles.bio}>{member.bio}</p>}
            </div>
          ))}
        </div>

        <div className={styles.coChairsSection}>
          <h3 className={styles.coChairsTitle}>{data.coChairsTitle}</h3>
          <div className={styles.coChairsGrid}>
            {data.coChairs.map((member, index) => (
              <div
                key={index}
                className={`${styles.coChairItem} ${member.bio ? styles.clickable : ''}`}
                onClick={() => member.bio && setActiveModal(index)}
              >
                {member.image ? (
                  <div className={styles.coChairAvatarWrap}>
                    <img src={member.image} alt={member.name} className={styles.coChairAvatar} />
                  </div>
                ) : (
                  <div className={styles.coChairInitial}>
                    {member.name.charAt(0)}
                  </div>
                )}
                <div className={styles.coChairName}>{member.name}</div>
                <div className={styles.coChairTitle}>{member.title}</div>
                {member.bio && <span className={styles.coChairReadMore}>查看介紹</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeModal !== null && (
        <BioModal
          member={data.coChairs[activeModal]}
          onClose={() => setActiveModal(null)}
        />
      )}
    </section>
  )
}
