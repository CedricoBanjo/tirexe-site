import SableMethode from './SableMethode'
import Fleche from './Fleche'

// Méthode : les 3 étapes du premier site (« Fonctionnement »), et à côté le sable qui change de forme
// à chaque étape : du vrac au tableau, puis à la case cochée (components/SableMethode.jsx).
const ETAPES = [
  ['Premier échange', 'On discute du besoin, du contexte et de la durée envisagée — par appel ou email, sans formalité.'],
  ['Proposition de mission', "Un devis : tarif, durée, organisation du travail — sur site ou en remote selon vos contraintes. Je m'adapte."],
  ['Intégration & livraison', "Je rejoins votre équipe et suis votre seul interlocuteur, du cadrage jusqu'à la livraison finale."],
]

export default function Methode() {
  return (
    <section className="section methode" id="methode">
      <div className="wrap">
        <header className="sec-tete revele">
          <p className="ey">Méthode</p>
          <h2 className="sec-h">Simple, direct, efficace</h2>
          <p className="sec-sub">
            En régie, à la journée. Sur site à Martigues, Marseille, Fos-sur-Mer, Vitrolles, Aix-en-Provence, Istres
            et dans toute la région PACA, ou à distance partout en France.
          </p>
        </header>
        <div className="methode-grille">
          <div className="methode-scene"><SableMethode /></div>
          <ol className="methode-etapes">
            {ETAPES.map(([titre, texte], i) => (
              <li className={`methode-etape${i === 0 ? ' est-active' : ''}`} data-etape={i} key={titre}>
                <span className="methode-num" aria-hidden="true">0{i + 1}</span>
                <h3 className="methode-titre">{titre}</h3>
                <p className="methode-texte">{texte}</p>
              </li>
            ))}
          </ol>
        </div>
        <p className="methode-fin">
          <a href="#contact" className="btn btn-principal btn-grand">Discutons de votre projet <Fleche /></a>
        </p>
      </div>
    </section>
  )
}
