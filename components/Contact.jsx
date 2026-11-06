'use client'
import { useEffect, useRef, useState } from 'react'

const FORMSPREE_URL = 'https://formspree.io/f/xzdoeylz'
const EMAIL = 'cedric@tirexe.com'

export default function Contact() {
  // 'attente' | 'envoi' | 'envoye' | 'erreur'
  const [etat, setEtat] = useState('attente')
  const confirmation = useRef(null)
  const alerte = useRef(null)

  useEffect(() => {
    if (etat === 'envoye') confirmation.current?.focus()
    if (etat === 'erreur') alerte.current?.focus()
  }, [etat])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    setEtat('envoi')
    try {
      const reponse = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (!reponse.ok) throw new Error(`Formspree a répondu ${reponse.status}`)
      form.reset()
      setEtat('envoye')
      // Compte la demande comme conversion, seulement si le visiteur a accepté la mesure d'audience
      if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { form_name: 'contact' })
    } catch {
      setEtat('erreur')
    }
  }

  return (
    <div className="contact-band" id="contact">
      <div className="wrap">
        <div className="ey">Contact</div>
        <h2 className="sec-h">Parlons de votre <em>projet</em></h2>
        <p className="sec-sub">Décrivez votre contexte, la nature de la mission et la durée envisagée. Je reviendrai vers vous.</p>
        <div className="contact-grid">
          <div>
            <div className="contact-infos">
              <div className="ci">
                <div className="ci-ico">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--g-d)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <div className="ci-l">Email</div>
                  <div className="ci-v"><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
                </div>
              </div>
              <div className="ci">
                <div className="ci-ico">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--g-d)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="3" width="20" height="14" rx="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </div>
                <div>
                  <div className="ci-l">Format</div>
                  <div className="ci-v">Régie · à la journée</div>
                </div>
              </div>
            </div>
          </div>
          <div className="form-box">
            {etat === 'envoye' ? (
              <div className="form-ok" role="status" tabIndex={-1} ref={confirmation}>
                ✓ Message envoyé ! Je vous recontacte rapidement.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <p className="form-legend">Les champs marqués <span className="req" aria-hidden="true">*</span> sont obligatoires.</p>
                {etat === 'erreur' && (
                  <div className="form-alert form-alert-err" role="alert" tabIndex={-1} ref={alerte}>
                    Votre message n&apos;a pas pu partir. Réessayez dans un instant, ou écrivez-moi directement à{' '}
                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
                  </div>
                )}
                <div className="fg-2">
                  <div className="fg">
                    <label className="fl" htmlFor="contact-nom">Prénom & Nom <span className="req" aria-hidden="true">*</span></label>
                    <input className="fi" id="contact-nom" type="text" name="nom" placeholder="Jean Dupont" autoComplete="name" required />
                  </div>
                  <div className="fg">
                    <label className="fl" htmlFor="contact-societe">Société</label>
                    <input className="fi" id="contact-societe" type="text" name="societe" placeholder="Votre entreprise" autoComplete="organization" />
                  </div>
                </div>
                <div className="fg">
                  <label className="fl" htmlFor="contact-email">Email professionnel <span className="req" aria-hidden="true">*</span></label>
                  <input className="fi" id="contact-email" type="email" name="email" placeholder="jean@entreprise.fr" autoComplete="email" required />
                </div>
                <div className="fg">
                  <label className="fl" htmlFor="contact-mission">Type de mission</label>
                  <input className="fi" id="contact-mission" type="text" name="mission" placeholder="Ex. : outil de contrôle, automatisation reporting…" />
                </div>
                <div className="fg">
                  <label className="fl" htmlFor="contact-besoin">Votre besoin</label>
                  <textarea className="fta" id="contact-besoin" name="besoin" placeholder="Contexte, durée envisagée, secteur d'activité…" />
                </div>
                {/* Champ piège anti-spam : invisible pour les visiteurs, rempli seulement par les robots */}
                <div className="hp" aria-hidden="true">
                  <label htmlFor="contact-gotcha">Ne pas remplir</label>
                  <input id="contact-gotcha" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
                </div>
                <button type="submit" className="fsub" disabled={etat === 'envoi'}>
                  {etat === 'envoi' ? 'Envoi en cours…' : 'Envoyer ma demande'}
                </button>
                <p className="form-note">
                  Vos informations servent uniquement à répondre à votre demande. Elles transitent par Formspree (États-Unis)
                  et sont conservées 3 ans au plus. <a href="/mentions-legales#donnees-personnelles">En savoir plus</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
