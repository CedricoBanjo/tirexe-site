// La phrase de Cédric, en grand. Les mots se « remplissent » d'encre à mesure qu'on la fait défiler
// (CSS seul ; sans ce réglage du navigateur, ou avec « réduire les animations », le texte est simplement noir).
const PHRASE = "Je travaille seul, avec une responsabilité directe sur ce que je produis. Pas d’intermédiaire, pas d’ambiguïté."

export default function Citation() {
  const mots = PHRASE.split(' ')
  return (
    <section className="citation" aria-label="Le mot de Cédric">
      <div className="wrap">
        <figure className="citation-figure">
          <blockquote className="citation-texte">
            <p>
              {mots.map((mot, i) => (
                <span key={i}><span className="citation-mot" style={{ '--i': i, '--n': mots.length }}>{mot}</span>{i < mots.length - 1 ? ' ' : ''}</span>
              ))}
            </p>
          </blockquote>
          <figcaption className="citation-auteur">
            <span className="avatar" aria-hidden="true">CF</span>
            <span><strong>Cédric Femminino</strong><br />Fondateur de Tirexe</span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
