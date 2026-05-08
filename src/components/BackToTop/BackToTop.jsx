import styles from './BackToTop.module.css'
import { useScrollThreshold } from '../../hooks/useScrollThreshold'

export default function BackToTop() {
  const visible = useScrollThreshold(500)

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={styles.btn}
      aria-label="回到頂端"
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
