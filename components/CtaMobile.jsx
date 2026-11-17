'use client'
// Sur téléphone : une barre « Discutons de votre projet » collée en bas de l'écran, dès qu'on a quitté le haut
// de l'accueil (ou après un premier défilement sur les autres pages). Elle s'efface quand le formulaire de
// contact ou le pied de page arrivent à l'écran. Masquée sur ordinateur (voir .cta-mobile dans globals.css).
import { useEffect, useState } from 'react'
import Fleche from './Fleche'

export default function CtaMobile() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const haut = document.getElementById('haut')
    const cibles = [document.getElementById('contact'), document.querySelector('.pied')].filter(Boolean)
    let apresHaut = false
    const caches = new Set()
    const maj = () => setVisible(apresHaut && caches.size === 0)
    const observateurs = []

    if (haut) {
      const o = new IntersectionObserver(([e]) => { apresHaut = !e.isIntersecting && e.boundingClientRect.top < 0; maj() })
      o.observe(haut); observateurs.push(o)
    }
    const surDefilement = () => { if (!haut) { apresHaut = window.scrollY > 480; maj() } }
    window.addEventListener('scroll', surDefilement, { passive: true })
    surDefilement()

    const o = new IntersectionObserver(entrees => {
      for (const e of entrees) e.isIntersecting ? caches.add(e.target) : caches.delete(e.target)
      maj()
    })
    cibles.forEach(c => o.observe(c)); observateurs.push(o)

    return () => { observateurs.forEach(x => x.disconnect()); window.removeEventListener('scroll', surDefilement) }
  }, [])

  return (
    <div className="cta-mobile" data-visible={visible ? 'oui' : 'non'} inert={!visible}>
      <a href="/#contact" className="btn btn-principal btn-grand">Discutons de votre projet <Fleche /></a>
    </div>
  )
}
