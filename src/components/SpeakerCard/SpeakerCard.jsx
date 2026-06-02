import styles from './SpeakerCard.module.css'

function getInitials(name) {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export default function SpeakerCard({ name, title, img }) {
  return (
    <div className={styles.card}>
      {img ? (
        <div className={styles.img} style={{ backgroundImage: `url('${img}')` }} />
      ) : (
        <div className={styles.avatar}>
          <span className={styles.initials}>{getInitials(name)}</span>
        </div>
      )}
      <div className={styles.info}>
        <h4 className={styles.name}>{name}</h4>
        <p className={styles.title}>{title}</p>
      </div>
    </div>
  )
}
