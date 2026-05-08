export function smoothScrollTo(href, offset = 80) {
  if (!href.startsWith('#')) return
  const target = document.getElementById(href.slice(1))
  if (!target) return
  const top = target.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}
