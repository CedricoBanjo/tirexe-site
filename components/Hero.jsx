// Haut de l'accueil (piste A, version claire) : le texte à gauche ; à droite, le logo Tirexe en sable fin,
// en volume, qu'on fait tourner en 3D (components/LogoSable.jsx), et une fenêtre d'éditeur VBA « En bref ».
import LogoSable from './LogoSable'

// L'essentiel, écrit comme des constantes VBA. C'est du vrai texte : Google et les lecteurs d'écran le lisent.
const EN_BREF = [
  ['BASE', 'Martigues (13)'],
  ['ZONE', 'PACA · remote France'],
  ['MODE', 'Régie, à la journée'],
  ['MISSIONS', 'Généralement longues'],
  ['TARIF', 'Sur devis'],
  ['EXPERIENCE', '10 ans et plus'],
]

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grille" aria-hidden="true" />
      <div className="hero-in">
        <div className="hero-texte">
          <p className="hero-eyebrow"><span className="hero-curseur" aria-hidden="true" />Consultant VBA Excel · Missions longues en régie</p>
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
        </div>

        <div className="hero-visuel">
          <LogoSable />
          <figure className="editeur">
            <div className="editeur-barre" aria-hidden="true">
              <span>Tirexe.xlsm – EnBref (Code)</span>
              <span className="editeur-ok">● compilé</span>
            </div>
            <pre className="editeur-code"><code>
              <span className="vb-l vb-c">{"' En bref\n"}</span>
              {EN_BREF.map(([nom, valeur]) => (
                <span className="vb-l" key={nom}>
                  <span className="vb-k">Const</span> {nom} = <span className="vb-s">&quot;{valeur}&quot;</span>{'\n'}
                </span>
              ))}
            </code></pre>
          </figure>
        </div>
      </div>
    </section>
  )
}
