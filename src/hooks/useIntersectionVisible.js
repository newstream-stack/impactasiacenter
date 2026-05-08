import { useState, useEffect } from 'react'

export function useIntersectionVisible(elementId) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = document.getElementById(elementId)
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [elementId])

  return visible
}
