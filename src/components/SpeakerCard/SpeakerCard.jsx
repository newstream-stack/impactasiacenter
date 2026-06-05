import styles from './SpeakerCard.module.css'

function getInitials(name) {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export default function SpeakerCard({ name, title, img, onClick }) {
  return (
    <article className={styles.card} onClick={onClick}>
      <div className={styles.photoWrap}>
        {img ? (
          <img
            src={`${img}?v=2`}
            alt={name}
            className={styles.photo}
            loading="lazy"
          />
        ) : (
          <div className={styles.initials}>{getInitials(name)}</div>
        )}
        <div className={styles.overlay} />
        <div className={styles.hoverBadge}>查看介紹</div>
      </div>
      <div className={styles.info}>
        <h4 className={styles.name}>{name}</h4>
        <p className={styles.title}>{title}</p>
      </div>
    </article>
  )
}
