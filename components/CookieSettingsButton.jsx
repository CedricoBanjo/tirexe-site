'use client'
import { EVENEMENT_OUVRIR } from './CookieConsent'

// Rouvre le bandeau cookies pour changer d'avis à tout moment.
export default function CookieSettingsButton({ className, children = 'Gérer les cookies' }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(EVENEMENT_OUVRIR))}
    >
      {children}
    </button>
  )
}
