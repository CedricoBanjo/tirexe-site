'use client'
import { useEffect, useState } from 'react'

const LIENS = [
  ['/#expertise', 'Expertise'],
  ['/#secteurs', 'Secteurs'],
  ['/#outils', 'Outils & technologies'],
  ['/#process', 'Fonctionnement'],
  ['/blog', 'Blog'],
  ['/#contact', 'Contact'],
]

export default function Nav() {
  const [ouvert, setOuvert] = useState(false)

  // Échap referme le menu du téléphone
  useEffect(() => {
    if (!ouvert) return
    const surTouche = (e) => { if (e.key === 'Escape') setOuvert(false) }
    window.addEventListener('keydown', surTouche)
    return () => window.removeEventListener('keydown', surTouche)
  }, [ouvert])

  return (
    <nav aria-label="Navigation principale">
      <div className="nav-c">
        <a href="/" className="logo-img">
          <img src="/logo.png" alt="Tirexe, retour à l'accueil" width="131" height="34" />
        </a>
        <ul className="nav-links">
          {LIENS.map(([href, texte]) => <li key={href}><a href={href}>{texte}</a></li>)}
        </ul>
        <div className="nav-actions">
          <a href="/#contact" className="nav-cta">Me contacter</a>
          <button
            type="button"
            className="nav-burger"
            aria-expanded={ouvert}
            aria-controls="menu-telephone"
            aria-label={ouvert ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setOuvert(o => !o)}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {ouvert ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      <div id="menu-telephone" className={`nav-mobile${ouvert ? ' is-open' : ''}`} hidden={!ouvert}>
        <ul>
          {LIENS.map(([href, texte]) => (
            <li key={href}><a href={href} onClick={() => setOuvert(false)}>{texte}</a></li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
