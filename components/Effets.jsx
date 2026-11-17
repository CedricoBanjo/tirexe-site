'use client'
// Effets communs à toutes les pages, sans rien afficher :
// 1. les blocs marqués .revele apparaissent en douceur (flous puis nets) quand ils arrivent à l'écran ;
//    ils restent visibles si ce script ne tourne pas, et avec « réduire les animations » ;
// 2. sur ordinateur, les cartes .lumiere suivent la souris d'un léger halo vert.
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Effets() {
  const chemin = usePathname()

  useEffect(() => {
    const elements = [...document.querySelectorAll('.revele:not(.est-revele)')]
    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduit || !('IntersectionObserver' in window)) return
    document.documentElement.classList.add('avec-apparitions')
    const io = new IntersectionObserver(entrees => {
      for (const e of entrees) {
        if (!e.isIntersecting) continue
        e.target.classList.add('est-revele')
        io.unobserve(e.target)
      }
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 })
    elements.forEach(e => io.observe(e))
    return () => io.disconnect()
  }, [chemin])

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let cible = null, x = 0, y = 0, prevu = 0
    const maj = () => {
      prevu = 0
      if (!cible) return
      const b = cible.getBoundingClientRect()
      cible.style.setProperty('--mx', `${x - b.left}px`)
      cible.style.setProperty('--my', `${y - b.top}px`)
    }
    const bouge = (e) => {
      cible = e.target.closest?.('.lumiere')
      if (!cible) return
      x = e.clientX; y = e.clientY
      if (!prevu) prevu = requestAnimationFrame(maj)
    }
    document.addEventListener('pointermove', bouge, { passive: true })
    return () => { document.removeEventListener('pointermove', bouge); cancelAnimationFrame(prevu) }
  }, [])

  return null
}
