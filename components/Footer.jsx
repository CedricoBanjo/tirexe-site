import { EMAIL, LINKEDIN_URL } from '../lib/site'
import { SERVICES } from '../lib/services'
import CtaMobile from './CtaMobile'
import Fleche from './Fleche'

const PAGES = [
  ['/#methode', 'Méthode'],
  ['/#pourquoi', 'Pourquoi moi'],
  ['/blog', 'Blog'],
  ['/#faq', 'Questions fréquentes'],
  ['/#contact', 'Contact'],
]

export default function Footer() {
  return (
    <footer className="pied">
      <div className="wrap">
        <div className="pied-haut">
          <div className="pied-marque">
            <img src="/logo-tirexe.svg" alt="Tirexe" width="131" height="34" loading="lazy" />
            <p>Consultant et développeur VBA Excel senior. Basé à Martigues, en régie dans toute la région PACA ou à distance partout en France.</p>
            <a href="/#contact" className="btn btn-principal">Parler de votre projet <Fleche /></a>
          </div>
          <nav className="pied-colonne" aria-label="Expertises">
            <p className="pied-titre">Expertises</p>
            <ul>{SERVICES.map(s => <li key={s.slug}><a href={`/services/${s.slug}`}>{s.titreCourt}</a></li>)}</ul>
          </nav>
          <nav className="pied-colonne" aria-label="Le site">
            <p className="pied-titre">Le site</p>
            <ul>{PAGES.map(([href, texte]) => <li key={href}><a href={href}>{texte}</a></li>)}</ul>
          </nav>
          <div className="pied-colonne">
            <p className="pied-titre">Me joindre</p>
            <ul>
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li><a href={LINKEDIN_URL} target="_blank" rel="me noopener">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="pied-bas">
          <p>© 2026 Tirexe · Cédric Femminino · SIREN 883 193 054</p>
          <a href="/mentions-legales">Mentions légales</a>
        </div>
      </div>
      <div className="pied-geant" aria-hidden="true">
        <img src="/logo-tirexe.svg" alt="" width="1996" height="520" loading="lazy" />
      </div>
      <CtaMobile />
    </footer>
  )
}
