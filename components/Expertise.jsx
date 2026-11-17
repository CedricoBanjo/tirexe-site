import { SERVICES } from '../lib/services'
import { ILLUSTRATIONS } from './Illustrations'
import Fleche from './Fleche'

// Les 4 expertises, en grille « bento » : deux grandes cartes et deux plus étroites, en quinconce.
// Chaque carte a son illustration animée et mène à la page du service (textes dans lib/services.js).
export default function Expertise() {
  return (
    <section className="section" id="expertises">
      <div className="wrap">
        <header className="sec-tete revele">
          <p className="ey">Expertises</p>
          <h2 className="sec-h">Ce que je construis pour vous</h2>
          <p className="sec-sub">Des solutions robustes pour des environnements exigeants, du contrôle industriel à la finance de grands groupes.</p>
        </header>
        <ul className="bento">
          {SERVICES.map((s, i) => {
            const Illustration = ILLUSTRATIONS[s.slug]
            return (
              <li key={s.slug} className={`carte carte-service lumiere revele bento-${i + 1}`} style={{ '--d': i % 2 }}>
                <div className="carte-illus">{Illustration && <Illustration />}</div>
                <div className="carte-corps">
                  <p className="carte-num">0{i + 1} · {s.etiquette}</p>
                  {/* le lien du titre couvre toute la carte (voir .carte-lien dans globals.css) */}
                  <h3 className="carte-titre"><a href={`/services/${s.slug}`} className="carte-lien">{s.titreCarte}</a></h3>
                  <p className="carte-texte">{s.resumeCarte}</p>
                  <p className="carte-mots">{s.tags.join(' · ')}</p>
                  <span className="carte-plus" aria-hidden="true">Découvrir <Fleche /></span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
