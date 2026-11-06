import { SERVICES } from '../lib/services'

// Les 4 services, présentés comme un tableau : une ligne par service, cliquable vers sa page.
// Les textes sont dans lib/services.js.
export default function Expertise() {
  return (
    <div className="section" id="expertise">
      <div className="wrap">
        <div className="ey"><span className="ey-ref">A12</span>Expertise</div>
        <h2 className="sec-h">Ce que je <em>construis</em> pour vous</h2>
        <p className="sec-sub">Des solutions robustes pour des environnements exigeants — du contrôle industriel à la finance de grands groupes.</p>
        <div className="exp-table">
          <div className="exp-tete" aria-hidden="true">
            <span />
            <span>A · Service</span>
            <span>B · Ce que je construis</span>
            <span>C · Mots-clés</span>
          </div>
          {SERVICES.map((s, i) => (
            <div className="exp-ligne" key={s.slug}>
              <span className="exp-num" aria-hidden="true">{i + 1}</span>
              <div className="exp-titre">
                {/* Le lien du titre couvre toute la ligne (voir .exp-lien dans globals.css) */}
                <h3 className="exp-h"><a href={`/services/${s.slug}`} className="exp-lien">{s.titreCarte}</a></h3>
                <span className="exp-plus" aria-hidden="true">Voir le service →</span>
              </div>
              <p className="exp-p">{s.resumeCarte}</p>
              <p className="exp-mots">{s.tags.join(' · ')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
