'use client'
import { useEffect, useState } from 'react'

// Menu court : 5 liens, et le bouton de contact toujours visible
const LIENS = [
  ['/#expertises', 'Expertises'],
  ['/#methode', 'Méthode'],
  ['/#pourquoi', 'Pourquoi moi'],
  ['/blog', 'Blog'],
  ['/#faq', 'Questions'],
]

export default function Nav() {
  const [ouvert, setOuvert] = useState(false)
  // en haut de page, la barre est transparente ; dès qu'on descend, elle prend un fond et un filet
  const [defile, setDefile] = useState(false)

  useEffect(() => {
    const surDefilement = () => setDefile(window.scrollY > 8)
    surDefilement()
    window.addEventListener('scroll', surDefilement, { passive: true })
    return () => window.removeEventListener('scroll', surDefilement)
  }, [])

  // Échap referme le menu du téléphone
  useEffect(() => {
    if (!ouvert) return
    const surTouche = (e) => { if (e.key === 'Escape') setOuvert(false) }
    window.addEventListener('keydown', surTouche)
    return () => window.removeEventListener('keydown', surTouche)
  }, [ouvert])

  return (
    <nav aria-label="Navigation principale" className={`nav${defile || ouvert ? ' est-defile' : ''}`}>
      <div className="nav-c">
        <a href="/" className="nav-logo">
          <img src="/logo-tirexe.svg" alt="Tirexe, retour à l'accueil" width="131" height="34" />
        </a>
        <ul className="nav-liens">
          {LIENS.map(([href, texte]) => <li key={href}><a href={href}>{texte}</a></li>)}
        </ul>
        <div className="nav-actions">
          <a href="/#contact" className="btn btn-principal btn-petit">Me contacter</a>
          <button
            type="button"
            className="nav-burger"
            aria-expanded={ouvert}
            aria-controls="menu-telephone"
            aria-label={ouvert ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setOuvert(o => !o)}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {ouvert ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>
      <div id="menu-telephone" className="nav-mobile" hidden={!ouvert}>
        <ul>
          {LIENS.map(([href, texte]) => (
            <li key={href}><a href={href} onClick={() => setOuvert(false)}>{texte}</a></li>
          ))}
          <li><a href="/#contact" onClick={() => setOuvert(false)}>Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}
