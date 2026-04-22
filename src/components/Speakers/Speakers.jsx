import SpeakerCard from '../SpeakerCard/SpeakerCard'
import { speakers } from '../../data/speakers'
import styles from './Speakers.module.css'

export default function Speakers() {
  return (
    <section id="speakers" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>重磅講員</h2>
          <div className={styles.line} />
        </div>
        <div className={styles.grid}>
          {speakers.map((s) => (
            <SpeakerCard key={s.id} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
