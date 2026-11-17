import SableMethode from './SableMethode'
import Fleche from './Fleche'

// Méthode : 3 étapes (les textes du « fonctionnement » déjà validés), et à côté le sable qui change de forme
// à chaque étape : du vrac au tableau, puis à la case cochée (components/SableMethode.jsx).
const ETAPES = [
  ['On part de votre besoin', 'Premier échange sur le besoin, le contexte et la durée envisagée, par appel ou par e-mail, sans formalité.'],
  ['On cadre la mission', 'Je vous envoie une proposition : tarif, durée et organisation du travail, sur site ou en remote selon vos contraintes.'],
  ['Je livre un outil fiable', "Je rejoins votre équipe et reste votre seul interlocuteur, du cadrage jusqu'à la livraison finale."],
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
          <a href="#contact" className="btn btn-principal btn-grand">Commencer par un premier échange <Fleche /></a>
        </p>
      </div>
    </section>
  )
}
