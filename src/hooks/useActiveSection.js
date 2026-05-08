import { useState, useEffect } from 'react'

export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const observers = []
    const visibleMap = {}

    const pickActive = () => {
      // prefer the topmost visible section
      for (const id of sectionIds) {
        if (visibleMap[id]) {
          setActiveId(id)
          return
        }
      }
    }

    sectionIds.forEach((id) => {
      const el = document.getElementById(id.replace('#', ''))
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          visibleMap[id] = entry.isIntersecting
          pickActive()
        },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [sectionIds.join(',')])

  return activeId
}
