'use client'
// Le formulaire de contact, en 3 étapes courtes : le besoin (un clic), le délai (un clic), puis les coordonnées.
// Un clic à la souris ou au doigt sur un choix passe à l'étape suivante ; au clavier, on valide avec « Continuer ».
// Un lien qui porte data-besoin (ou une adresse « ?besoin=<service> ») préremplit le besoin et ouvre l'étape 2.
// Sans JavaScript, les 3 étapes s'affichent d'un bloc et le formulaire part quand même vers Formspree.
import { useEffect, useRef, useState } from 'react'
import { EMAIL, LINKEDIN_URL } from '../lib/site'
import Fleche from './Fleche'

const FORMSPREE_URL = 'https://formspree.io/f/xzdoeylz'

// Les 4 services, et deux demandes fréquentes
const BESOINS = [
  { libelle: 'Contrôler et fiabiliser des données', service: 'controle-donnees-excel-vba' },
  { libelle: 'Créer un outil Excel sur mesure', service: 'application-excel-sur-mesure' },
  { libelle: 'Automatiser un reporting', service: 'automatisation-reporting-excel' },
  { libelle: 'Relier Excel à Access ou SQL', service: 'access-sql-excel-vba' },
  { libelle: 'Reprendre des macros existantes' },
  { libelle: 'Autre besoin' },
]
const DELAIS = ['Dès que possible', 'Dans les 3 prochains mois', 'Je me renseigne']
const QUESTIONS = ['De quoi avez-vous besoin ?', 'Quand souhaitez-vous démarrer ?', 'Comment vous joindre ?']

function Icone({ d }) {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={d} /></svg>
}
const COCHE = 'M5 12.5l4.2 4.2L19 7'

export default function Contact() {
  // pret : le formulaire est passé en mode « pas à pas » (JavaScript actif)
  const [pret, setPret] = useState(false)
  const [etape, setEtape] = useState(0)
  const [besoin, setBesoin] = useState('')
  const [delai, setDelai] = useState('')
  // 'attente' | 'envoi' | 'envoye' | 'erreur'
  const [etat, setEtat] = useState('attente')
  const questions = useRef([])
  const confirmation = useRef(null)
  const alerte = useRef(null)
  const viaPointeur = useRef(false)
  const aBouge = useRef(false)

  // préremplissage : ?besoin=<service> dans l'adresse, ou un clic sur un lien data-besoin de la page
  useEffect(() => {
    setPret(true)
    const prerempli = (cle) => {
      const b = BESOINS.find(x => x.service === cle || x.libelle === cle)
      if (b) { setBesoin(b.libelle); setEtape(1) }
    }
    const parametre = new URLSearchParams(window.location.search).get('besoin')
    if (parametre) prerempli(parametre)
    const surClic = (e) => {
      const lien = e.target.closest?.('[data-besoin]')
      if (lien) prerempli(lien.dataset.besoin)
    }
    document.addEventListener('click', surClic)
    return () => document.removeEventListener('click', surClic)
  }, [])

  // à chaque changement d'étape voulu par le visiteur, la question suivante prend le focus (lecteurs d'écran)
  useEffect(() => {
    if (aBouge.current) questions.current[etape]?.focus({ preventScroll: true })
  }, [etape])

  useEffect(() => {
    if (etat === 'envoye') confirmation.current?.focus()
    if (etat === 'erreur') alerte.current?.focus()
  }, [etat])

  const aller = (n) => { aBouge.current = true; setEtape(n) }
  // un choix fait à la souris ou au doigt fait avancer tout seul ; au clavier (flèches), on reste sur place
  const choisir = (fixer, valeur, suivante) => {
    fixer(valeur)
    if (viaPointeur.current) { viaPointeur.current = false; setTimeout(() => aller(suivante), 260) }
  }

  const envoyer = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.reportValidity()) return
    setEtat('envoi')
    try {
      const donnees = new FormData(form)
      donnees.set('_subject', `Demande tirexe.com : ${besoin || 'nouveau contact'}`)
      const reponse = await fetch(FORMSPREE_URL, { method: 'POST', body: donnees, headers: { Accept: 'application/json' } })
      if (!reponse.ok) throw new Error(`Formspree a répondu ${reponse.status}`)
      form.reset()
      setBesoin(''); setDelai(''); setEtape(0); aBouge.current = false
      setEtat('envoye')
    } catch {
      setEtat('erreur')
    }
  }

  // Entrée dans les deux premières étapes : on avance au lieu d'envoyer un formulaire incomplet
  const surTouche = (e) => {
    if (!pret || e.key !== 'Enter' || etape === 2 || e.target.tagName === 'BUTTON') return
    e.preventDefault()
    if ((etape === 0 && besoin) || (etape === 1 && delai)) aller(etape + 1)
  }

  const groupeChoix = (nom, options, valeur, fixer, suivante) => (
    <div className="choix-grille">
      {options.map(texte => (
        <label className="choix" key={texte} onPointerDown={() => { viaPointeur.current = true }}>
          <input type="radio" name={nom} value={texte} checked={valeur === texte} onChange={() => choisir(fixer, texte, suivante)} />
          <span className="choix-carte"><span className="choix-case" aria-hidden="true"><Icone d={COCHE} /></span>{texte}</span>
        </label>
      ))}
    </div>
  )

  return (
    <section className="contact" id="contact">
      <div className="wrap contact-grille">
        <div className="contact-texte revele">
          <p className="ey">Contact</p>
          <h2 className="sec-h">Parlons de votre projet</h2>
          <p className="sec-sub">Trois questions, moins d&apos;une minute. Je vous réponds personnellement.</p>
          <ul className="contact-garanties">
            <li><Icone d={COCHE} />Premier échange sans engagement</li>
            <li><Icone d={COCHE} />Tarif sur devis, à la journée</li>
            <li><Icone d={COCHE} />Vos informations ne sont ni vendues ni cédées</li>
          </ul>
          <ul className="contact-direct">
            <li>
              <a href={`mailto:${EMAIL}`}><Icone d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM3.5 6.5L12 13l8.5-6.5" />{EMAIL}</a>
            </li>
            <li>
              <a href={LINKEDIN_URL} target="_blank" rel="me noopener"><Icone d="M7 10v7M7 7v.01M11 17v-4a2.5 2.5 0 0 1 5 0v4M11 10v7M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />LinkedIn · Cédric Femminino</a>
            </li>
          </ul>
        </div>

        <div className="form-boite revele" style={{ '--d': 1 }}>
          {etat === 'envoye' ? (
            <div className="form-ok" role="status" tabIndex={-1} ref={confirmation}>
              <span className="form-ok-ico" aria-hidden="true"><Icone d={COCHE} /></span>
              <p className="form-ok-titre">Merci, votre demande est bien partie.</p>
              <p className="form-ok-texte">Je vous réponds personnellement, dans les meilleurs délais.</p>
              <a href="/blog" className="btn btn-second">Lire le blog en attendant</a>
            </div>
          ) : (
            <form action={FORMSPREE_URL} method="POST" onSubmit={envoyer} onKeyDown={surTouche} className={`form${pret ? ' est-pas-a-pas' : ''}`}>
              {pret && (
                <div className="form-progression" aria-hidden="true">
                  <span>Étape {etape + 1} sur 3</span>
                  <span className="form-barre"><span style={{ transform: `scaleX(${(etape + 1) / 3})` }} /></span>
                </div>
              )}
              {etat === 'erreur' && (
                <div className="form-alerte" role="alert" tabIndex={-1} ref={alerte}>
                  Votre message n&apos;a pas pu partir. Réessayez dans un instant, ou écrivez-moi directement à{' '}
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
                </div>
              )}

              <fieldset className="form-etape" hidden={pret && etape !== 0}>
                <legend className="form-question" tabIndex={-1} ref={el => { questions.current[0] = el }}>{QUESTIONS[0]}</legend>
                {groupeChoix('besoin', BESOINS.map(b => b.libelle), besoin, setBesoin, 1)}
                {pret && (
                  <div className="form-boutons">
                    <button type="button" className="btn btn-principal" disabled={!besoin} onClick={() => aller(1)}>Continuer <Fleche /></button>
                  </div>
                )}
              </fieldset>

              <fieldset className="form-etape" hidden={pret && etape !== 1}>
                <legend className="form-question" tabIndex={-1} ref={el => { questions.current[1] = el }}>{QUESTIONS[1]}</legend>
                {groupeChoix('delai', DELAIS, delai, setDelai, 2)}
                {pret && (
                  <div className="form-boutons">
                    <button type="button" className="btn btn-lien" onClick={() => aller(0)}>Retour</button>
                    <button type="button" className="btn btn-principal" disabled={!delai} onClick={() => aller(2)}>Continuer <Fleche /></button>
                  </div>
                )}
              </fieldset>

              <fieldset className="form-etape" hidden={pret && etape !== 2}>
                <legend className="form-question" tabIndex={-1} ref={el => { questions.current[2] = el }}>{QUESTIONS[2]}</legend>
                {pret && (besoin || delai) && (
                  <p className="form-recap">
                    <span>{[besoin, delai].filter(Boolean).join(' · ')}</span>
                    <button type="button" className="btn-lien" onClick={() => aller(0)}>Modifier</button>
                  </p>
                )}
                <p className="form-legende">Les champs marqués <span className="req" aria-hidden="true">*</span> sont obligatoires.</p>
                <div className="champs-2">
                  <div className="champ">
                    <label htmlFor="contact-nom">Prénom et nom <span className="req" aria-hidden="true">*</span></label>
                    <input id="contact-nom" type="text" name="nom" placeholder="Jean Dupont" autoComplete="name" required />
                  </div>
                  <div className="champ">
                    <label htmlFor="contact-societe">Société</label>
                    <input id="contact-societe" type="text" name="societe" placeholder="Votre entreprise" autoComplete="organization" />
                  </div>
                </div>
                <div className="champ">
                  <label htmlFor="contact-email">E-mail professionnel <span className="req" aria-hidden="true">*</span></label>
                  <input id="contact-email" type="email" name="email" placeholder="jean@entreprise.fr" autoComplete="email" required />
                </div>
                <div className="champ">
                  <label htmlFor="contact-message">Votre message <span className="champ-option">(facultatif)</span></label>
                  <textarea id="contact-message" name="message" rows="4" placeholder="Contexte, volumes, outils en place, durée envisagée…" />
                </div>
                {/* Champ piège anti-spam : invisible pour les visiteurs, rempli seulement par les robots */}
                <div className="hp" aria-hidden="true">
                  <label htmlFor="contact-gotcha">Ne pas remplir</label>
                  <input id="contact-gotcha" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
                </div>
                <div className="form-boutons">
                  {pret && <button type="button" className="btn btn-lien" onClick={() => aller(1)}>Retour</button>}
                  <button type="submit" className="btn btn-principal btn-grand" disabled={etat === 'envoi'}>
                    {etat === 'envoi' ? 'Envoi en cours…' : <>Envoyer ma demande <Fleche /></>}
                  </button>
                </div>
                <p className="form-note">
                  Vos informations servent uniquement à répondre à votre demande. Elles transitent par Formspree (États-Unis)
                  et sont conservées 3 ans au plus. <a href="/mentions-legales#donnees-personnelles">En savoir plus</a>
                </p>
              </fieldset>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
