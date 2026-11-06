import { SERVICES } from '../lib/services'

// Une icône par service ; les textes des cartes sont dans lib/services.js
const ICONES = {
  'controle-donnees-excel-vba': <svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>,
  'application-excel-sur-mesure': <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  'automatisation-reporting-excel': <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  'access-sql-excel-vba': <svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/></svg>,
}

export default function Expertise() {
  return (
    <div className="section" id="expertise">
      <div className="wrap">
        <div className="ey">Expertise</div>
        <h2 className="sec-h">Ce que je <em>construis</em> pour vous</h2>
        <p className="sec-sub">Des solutions robustes pour des environnements exigeants — du contrôle industriel à la finance de grands groupes.</p>
        <div className="exp-grid">
          {SERVICES.map(s => (
            <div className="exp-card" key={s.slug}>
              <span className="exp-tag">{s.etiquette}</span>
              <div className="exp-ico" aria-hidden="true">{ICONES[s.slug]}</div>
              {/* Le lien du titre couvre toute la carte (voir .exp-lien dans globals.css) */}
              <h3 className="exp-h"><a href={`/services/${s.slug}`} className="exp-lien">{s.titreCarte}</a></h3>
              <p className="exp-p">{s.resumeCarte}</p>
              <div className="etags">
                {s.tags.map(t => <span className="etag" key={t}>{t}</span>)}
              </div>
              <span className="exp-plus" aria-hidden="true">En savoir plus →</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
