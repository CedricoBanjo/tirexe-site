// Fonctionnement : 3 étapes côte à côte, reliées par une flèche
const ETAPES = [
  ['Premier échange', 'On discute du besoin, du contexte et de la durée envisagée — par appel ou email, sans formalité.'],
  ['Proposition de mission', "Un devis : tarif, durée, organisation du travail — sur site ou en remote selon vos contraintes. Je m'adapte."],
  ['Intégration & livraison', "Je rejoins votre équipe et suis votre seul interlocuteur, du cadrage jusqu'à la livraison finale."],
]

export default function Process() {
  return (
    <div className="section section-alt" id="process">
      <div className="wrap">
        <div className="ey"><span className="ey-ref">A36</span>Fonctionnement</div>
        <h2 className="sec-h">Simple, <em>direct</em>, efficace</h2>
        <p className="sec-sub">En régie, à la journée. Sur site à Martigues, Marseille, Fos-sur-Mer, Vitrolles, Aix-en-Provence, Istres et toute la région PACA — ou en full remote partout en France.</p>
        <ol className="proc-wrap">
          {ETAPES.map(([titre, texte], i) => (
            <li className="proc-s" key={titre}>
              <span className="proc-n" aria-hidden="true">Étape 0{i + 1}</span>
              <h3 className="proc-t">{titre}</h3>
              <p className="proc-d">{texte}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
