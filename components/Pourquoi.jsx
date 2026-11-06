// Pourquoi Tirexe : la citation de Cédric est un commentaire de cellule, les raisons des cases cochées
const raisons = [
  {
    title: "Vous m'avez en direct",
    desc: "De la première discussion à la livraison finale — c'est moi, sans relai ni intermédiaire.",
  },
  {
    title: 'Expérience en environnements exigeants',
    desc: "Projets industriels critiques, finance de grands groupes, BTP — des contextes où la précision est une priorité absolue.",
  },
  {
    title: 'Spécialiste des missions longues',
    desc: "Je m'intègre dans vos équipes sur la durée, avec une vraie connaissance de votre contexte métier.",
  },
  {
    title: 'Flexible géographiquement',
    desc: "Sur site en région PACA ou en full remote partout en France, selon vos contraintes.",
  },
]

export default function Pourquoi() {
  return (
    <div className="section" id="pourquoi">
      <div className="wrap">
        <div className="ey"><span className="ey-ref">A44</span>Pourquoi Tirexe</div>
        <h2 className="sec-h">Un expert <em>dédié</em> à votre projet</h2>
        <div className="why-layout">
          <figure className="why-panel">
            <p className="why-auteur" aria-hidden="true">Cédric Femminino :</p>
            <blockquote className="why-q">
              &ldquo;Je travaille seul, avec une responsabilité directe sur ce que je produis. Pas d&apos;intermédiaire, pas d&apos;ambiguïté.&rdquo;
            </blockquote>
            <figcaption className="why-sig">— Cédric Femminino · Fondateur de Tirexe</figcaption>
          </figure>
          <div className="why-rows">
            {raisons.map(r => (
              <div className="why-r" key={r.title}>
                <div className="why-check" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <h3 className="why-t">{r.title}</h3>
                  <p className="why-d">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
