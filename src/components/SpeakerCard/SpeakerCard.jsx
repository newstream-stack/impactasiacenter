import styles from './SpeakerCard.module.css'

export default function SpeakerCard({ name, title, img }) {
  return (
    <div className={styles.card}>
      <div className={styles.img} style={{ backgroundImage: `url('${img}')` }} />
      <div className={styles.info}>
        <h4 className={styles.name}>{name}</h4>
        <p className={styles.title}>{title}</p>
      </div>
    </div>
  )
}
