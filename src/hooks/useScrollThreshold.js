import { useState, useEffect } from 'react'

export function useScrollThreshold(threshold) {
  const [passed, setPassed] = useState(false)

  useEffect(() => {
    const handleScroll = () => setPassed(window.scrollY > threshold)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return passed
}
