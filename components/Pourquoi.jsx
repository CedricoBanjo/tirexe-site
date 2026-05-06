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
        <div className="ey">Pourquoi Tirexe</div>
        <div className="sec-h">Un expert dédié à votre projet</div>
        <div className="why-layout">
          <div className="why-panel">
            <div className="why-q">
              &ldquo;<em>Je travaille seul, avec une responsabilité directe sur ce que je produis. Pas d&apos;intermédiaire, pas d&apos;ambiguïté.</em>&rdquo;
            </div>
            <div className="why-sig">— Cédric Femminino · Fondateur de Tirexe</div>
          </div>
          <div className="why-rows">
            {raisons.map((r, i) => (
              <div className="why-r" key={i}>
                <div className="why-check">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--g-d)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div>
                  <div className="why-t">{r.title}</div>
                  <div className="why-d">{r.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
