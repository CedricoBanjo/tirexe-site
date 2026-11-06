import { SERVICES } from '../lib/services'

// Les 4 services (piste A) : une grille à filets fins, numérotée ; chaque case mène à la page du service.
// Les textes sont dans lib/services.js.
export default function Expertise() {
  return (
    <div className="section" id="expertise">
      <div className="wrap">
        <div className="ey">Expertise</div>
        <h2 className="sec-h">Ce que je <em>construis</em> pour vous</h2>
        <p className="sec-sub">Des solutions robustes pour des environnements exigeants — du contrôle industriel à la finance de grands groupes.</p>
        <ol className="exp-grille">
          {SERVICES.map((s, i) => (
            <li key={s.slug} className="exp-case">
              <span className="exp-num">0{i + 1} / 04 · {s.etiquette}</span>
              {/* Le lien du titre couvre toute la case (voir .exp-lien dans globals.css) */}
              <h3 className="exp-h"><a href={`/services/${s.slug}`} className="exp-lien">{s.titreCarte}</a></h3>
              <p className="exp-p">{s.resumeCarte}</p>
              <p className="exp-mots">{s.tags.join(' · ')}</p>
              <span className="exp-plus" aria-hidden="true">En savoir plus →</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
