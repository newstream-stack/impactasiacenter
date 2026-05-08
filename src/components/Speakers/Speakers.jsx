import SpeakerCard from '../SpeakerCard/SpeakerCard'
import { useI18n } from '../../i18n/I18nContext'
import SectionHeader from '../SectionHeader/SectionHeader'
import styles from './Speakers.module.css'

export default function Speakers() {
  const { t } = useI18n()
  const speakersSection = t('speakersSection')
  const speakers = t('speakers') || []

  return (
    <section id="speakers" className={styles.section}>
      <div className={styles.container}>
        <SectionHeader title={speakersSection?.title || '重磅講員'} />
        <div className={styles.grid}>
          {speakers.map((s) => (
            <SpeakerCard key={s.id} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
