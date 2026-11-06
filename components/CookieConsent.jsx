'use client'
import { useEffect, useState } from 'react'

// Bandeau de consentement (CNIL) : Google Analytics n'est chargé qu'après « Accepter ».
// Le choix est gardé 6 mois dans le navigateur (durée recommandée par la CNIL),
// puis le bandeau revient. « Gérer les cookies » (bas de page) le rouvre à tout moment.
const GA_ID = 'G-TKT4NR5C8T'
const CLE_CHOIX = 'tirexe-consentement'
const DUREE_CHOIX_MS = 182 * 24 * 60 * 60 * 1000
const DUREE_COOKIES_GA_S = 13 * 30 * 24 * 60 * 60 // 13 mois au plus
export const EVENEMENT_OUVRIR = 'tirexe:gerer-cookies'

function lireChoix() {
  try {
    const choix = JSON.parse(window.localStorage.getItem(CLE_CHOIX) || 'null')
    if (!choix || typeof choix.date !== 'number' || Date.now() - choix.date > DUREE_CHOIX_MS) return null
    return choix.valeur === 'accepte' || choix.valeur === 'refuse' ? choix.valeur : null
  } catch {
    return null
  }
}

function enregistrerChoix(valeur) {
  try {
    window.localStorage.setItem(CLE_CHOIX, JSON.stringify({ valeur, date: Date.now() }))
  } catch {
    // stockage indisponible (navigation privée stricte) : le choix vaut pour cette page
  }
}

function chargerGoogleAnalytics() {
  window[`ga-disable-${GA_ID}`] = false
  if (window.__tirexeGa) {
    window.gtag('consent', 'update', { analytics_storage: 'granted' })
    return
  }
  window.__tirexeGa = true
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() { window.dataLayer.push(arguments) }
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  window.gtag('js', new Date())
  window.gtag('config', GA_ID, { cookie_expires: DUREE_COOKIES_GA_S })
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)
}

function couperGoogleAnalytics() {
  window[`ga-disable-${GA_ID}`] = true
  if (window.gtag) window.gtag('consent', 'update', { analytics_storage: 'denied' })
  // Efface les cookies Google Analytics déjà déposés (_ga, _ga_XXXX)
  const hote = window.location.hostname
  const domaines = ['', `; domain=${hote}`, `; domain=.${hote.replace(/^www\./, '')}`]
  document.cookie.split(';')
    .map(c => c.trim().split('=')[0])
    .filter(nom => nom === '_ga' || nom.startsWith('_ga_'))
    .forEach(nom => domaines.forEach(d => { document.cookie = `${nom}=; Max-Age=0; path=/${d}` }))
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const choix = lireChoix()
    if (choix === 'accepte') chargerGoogleAnalytics()
    if (choix === null) setVisible(true)
    const ouvrir = () => setVisible(true)
    window.addEventListener(EVENEMENT_OUVRIR, ouvrir)
    return () => window.removeEventListener(EVENEMENT_OUVRIR, ouvrir)
  }, [])

  const choisir = (valeur) => {
    enregistrerChoix(valeur)
    if (valeur === 'accepte') chargerGoogleAnalytics()
    else couperGoogleAnalytics()
    setVisible(false)
  }

  if (!visible) return null

  return (
    <section className="cookie-banner" aria-label="Choix des cookies">
      <p className="cookie-text">
        Avec votre accord, ce site utilise Google Analytics pour compter ses visites.
        Refuser ne change rien à votre navigation.{' '}
        <a href="/mentions-legales#cookies">En savoir plus</a>
      </p>
      <div className="cookie-btns">
        <button type="button" className="cookie-btn" onClick={() => choisir('refuse')}>Refuser</button>
        <button type="button" className="cookie-btn" onClick={() => choisir('accepte')}>Accepter</button>
      </div>
    </section>
  )
}
