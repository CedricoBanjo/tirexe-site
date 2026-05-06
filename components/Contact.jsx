'use client'
import { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    await fetch('https://formspree.io/f/xzdoeylz', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    })
    setSent(true)
    form.reset()
  }

  return (
    <div className="contact-band" id="contact">
      <div className="wrap">
        <div className="ey">Contact</div>
        <div className="sec-h">Parlons de votre <em>projet</em></div>
        <p className="sec-sub">Décrivez votre contexte, la nature de la mission et la durée envisagée. Je reviendrai vers vous.</p>
        <div className="contact-grid">
          <div>
            <div className="contact-infos">
              <div className="ci">
                <div className="ci-ico">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--g-d)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <div className="ci-l">Email</div>
                  <div className="ci-v">cedric@tirexe.com</div>
                </div>
              </div>
              <div className="ci">
                <div className="ci-ico">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--g-d)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
            {sent ? (
              <div style={{textAlign:'center',padding:'40px 0',color:'var(--g-xd)',fontWeight:700,fontSize:'16px'}}>
                ✓ Message envoyé ! Je vous recontacte rapidement.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="fg-2">
                  <div className="fg">
                    <label className="fl">Prénom & Nom</label>
                    <input className="fi" type="text" name="nom" placeholder="Jean Dupont" required />
                  </div>
                  <div className="fg">
                    <label className="fl">Société</label>
                    <input className="fi" type="text" name="societe" placeholder="Votre entreprise" />
                  </div>
                </div>
                <div className="fg">
                  <label className="fl">Email professionnel</label>
                  <input className="fi" type="email" name="email" placeholder="jean@entreprise.fr" required />
                </div>
                <div className="fg">
                  <label className="fl">Type de mission</label>
                  <input className="fi" type="text" name="mission" placeholder="Ex. : outil de contrôle, automatisation reporting…" />
                </div>
                <div className="fg">
                  <label className="fl">Votre besoin</label>
                  <textarea className="fta" name="besoin" placeholder="Contexte, durée envisagée, secteur d'activité…" />
                </div>
                <button type="submit" className="fsub">Envoyer ma demande</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
