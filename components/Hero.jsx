// Haut de l'accueil, centré et aéré, avec les textes du premier site (titre, phrase, repères) et le bouton
// d'action visible sans défiler. Les mots du grand titre arrivent un à un, flous puis nets (CSS seul, dès le
// premier affichage : le titre est lisible tout de suite). En dessous, le logo Tirexe en sable fin (LogoSable).
import LogoSable from './LogoSable'
import Fleche from './Fleche'

// Le grand titre, ligne par ligne ; « Développeur » est mis en valeur
const LIGNES = [['Consultant', '&', 'Développeur'], ['VBA', 'Excel', 'Senior']]
const ACCENT = 'Développeur'

// Les repères du premier site
const REPERES = [
  [<>10<span className="plus">+</span></>, 'Ans d’expérience', 'experience'],
  ['Multi-secteurs', 'Industrie · Finance · BTP', 'secteurs'],
  ['Régie', 'À la journée', 'regie'],
]

export default function Hero() {
  let rang = 0
  return (
    <section className="hero" id="haut">
      <div className="hero-aurore" aria-hidden="true"><span /><span /><span /></div>
      <div className="hero-in">
        <p className="hero-pastille"><span className="point-vivant" aria-hidden="true" />Consultant VBA Excel · Missions longues en régie</p>
        <h1 className="hero-titre">
          {LIGNES.map((mots, l) => (
            <span className="hero-ligne" key={l}>
              {mots.map((mot, i) => (
                <span key={mot}>
                  <span className="mot" style={{ '--i': rang++ }}>
                    {mot === ACCENT ? <em className="hero-accent">{mot}</em> : mot}
                  </span>
                  {i < mots.length - 1 ? ' ' : ''}
                </span>
              ))}
              {l < LIGNES.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h1>
        <p className="hero-sous">
          Je conçois des <strong>outils métier sur mesure</strong> et des{' '}
          <strong>algorithmes de contrôle complexes</strong> pour de grands projets
          industriels et financiers — en régie, à la journée. Basé à Martigues, disponible sur toute la région PACA et en remote France entière.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn btn-principal btn-grand">Discutons de votre projet <Fleche /></a>
          <a href="#expertises" className="btn btn-second btn-grand">Voir l&apos;expertise</a>
        </div>
        <ul className="hero-reperes">
          {REPERES.map(([fort, texte, cle]) => (
            <li key={cle}>
              <strong>{fort}</strong>
              <span className="hero-repere-sep" aria-hidden="true" />
              <span>{texte}</span>
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
