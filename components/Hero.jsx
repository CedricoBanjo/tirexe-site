// Haut de l'accueil, centré et aéré : qui, quoi, pour qui, où, et le bouton d'action visible sans défiler.
// Les mots du grand titre arrivent un à un, flous puis nets (CSS seul, dès le premier affichage : le texte est
// lisible tout de suite). En dessous, la scène : le logo Tirexe en sable fin, qu'on fait tourner en 3D (LogoSable).
import LogoSable from './LogoSable'
import Fleche from './Fleche'

// Le grand titre, ligne par ligne ; le dernier mot est mis en valeur
const LIGNES = [['Du', 'fichier', 'fragile'], ['à', 'l’outil', 'fiable']]

const PREUVES = ['10 ans et plus d’expérience', 'Missions longues en régie', 'Tarif sur devis']

export default function Hero() {
  let rang = 0
  return (
    <section className="hero" id="haut">
      <div className="hero-aurore" aria-hidden="true"><span /><span /><span /></div>
      <div className="hero-in">
        <p className="hero-pastille"><span className="point-vivant" aria-hidden="true" />Martigues · PACA · Remote France</p>
        <h1 className="hero-titre">
          <span className="hero-sur">Développeur VBA Excel senior<span className="sr">. </span></span>
          <span className="hero-phrase">
            {LIGNES.map((mots, l) => (
              <span className="hero-ligne" key={l}>
                {mots.map((mot, i) => {
                  const dernier = l === LIGNES.length - 1 && i === mots.length - 1
                  return (
                    <span key={mot}>
                      <span className="mot" style={{ '--i': rang++ }}>
                        {dernier ? <><em className="hero-fiable">{mot}</em>.</> : mot}
                      </span>
                      {i < mots.length - 1 ? ' ' : ''}
                    </span>
                  )
                })}
                {l < LIGNES.length - 1 ? ' ' : ''}
              </span>
            ))}
          </span>
        </h1>
        <p className="hero-sous">
          J&apos;automatise vos reportings, je fiabilise vos données et je conçois vos outils Excel sur mesure,
          pour de grands projets industriels et financiers.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn btn-principal btn-grand">Parler de votre projet <Fleche /></a>
          <a href="#expertises" className="btn btn-second btn-grand">Voir mes expertises</a>
        </div>
        <ul className="hero-preuves">
          {PREUVES.map(p => (
            <li key={p}>
              <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false"><circle cx="10" cy="10" r="10" fill="var(--vert)" /><path d="M6 10.4l2.6 2.5L14.2 7.6" fill="none" stroke="var(--encre)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div className="hero-scene">
        <LogoSable />
      </div>
    </section>
  )
}
