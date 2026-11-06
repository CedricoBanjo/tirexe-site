// Haut de l'accueil : une feuille de calcul (barre de formule, colonnes, lignes, cellule sélectionnée).
// Les lettres de colonnes et les numéros de lignes sont dessinés par la feuille de styles :
// ils ne s'ajoutent pas au texte de la page lu par Google.
const COLONNES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-barre" aria-hidden="true">
        <span className="hero-nom">B2</span>
        <span className="hero-fx">fx</span>
        <span className="hero-formule">=CONSULTANT(<span>&quot;VBA Excel&quot;</span>;<span>&quot;senior&quot;</span>;<span>&quot;PACA + remote&quot;</span>)</span>
      </div>
      <div className="hero-cols" aria-hidden="true">
        <span />
        {COLONNES.map(c => <span key={c} data-c={c} />)}
      </div>
      <div className="hero-feuille">
        <div className="hero-lignes" aria-hidden="true">
          {Array.from({ length: 24 }, (_, i) => <span key={i} />)}
        </div>
        <div className="hero-contenu">
          <p className="hero-eyebrow"><span className="ey-ref">B2</span>Consultant VBA Excel · Missions longues en régie</p>
          <h1>
            Consultant &amp; <span className="accent">Développeur</span><br />
            VBA Excel Senior
          </h1>
          <p className="hero-desc">
            Je conçois des <strong>outils métier sur mesure</strong> et des{' '}
            <strong>algorithmes de contrôle complexes</strong> pour de grands projets
            industriels et financiers — en régie, à la journée. Basé à Martigues, disponible sur toute la région PACA et en remote France entière.
          </p>
          <div className="hero-btns">
            <a href="/#contact" className="btn-g">Discutons de votre projet</a>
            <a href="/#expertise" className="btn-ghost">Voir l&apos;expertise</a>
          </div>
          <dl className="hero-faits">
            <div><dt>10+</dt><dd>ans d&apos;expérience</dd></div>
            <div><dt>Industrie · Finance · BTP</dt><dd>multi-secteurs</dd></div>
            <div><dt>Régie</dt><dd>à la journée</dd></div>
          </dl>
        </div>
      </div>
    </section>
  )
}
