const outils = [
  { name: 'VBA Excel', desc: "Macros avancées, automatisation complète, API Windows, gestion d'événements", level: 'Expert', cls: 'b-exp' },
  { name: 'Excel avancé', desc: "Formules matricielles, tableaux croisés, fonctions avancées — maîtrise totale", level: 'Expert', cls: 'b-exp' },
  { name: 'Power Query', desc: "ETL natif Excel, transformations complexes, connexions multi-sources", level: 'Expert', cls: 'b-exp' },
  { name: 'Word & PowerPoint', desc: "Génération automatique de documents et présentations depuis Excel", level: 'Expert', cls: 'b-exp' },
  { name: 'Outlook VBA', desc: "Automatisation d'envois, gestion d'agenda, traitement de messagerie", level: 'Expert', cls: 'b-exp' },
  { name: 'Access / SQL', desc: "Bases .MDB, .ACCDB, .MDE — requêtes SQL depuis VBA, liaisons multi-tables", level: 'Avancé', cls: 'b-av' },
]

export default function Stack() {
  return (
    <div className="section" id="outils">
      <div className="wrap">
        <div className="stack-wrap">
          <div className="stack-sticky">
            <div className="ey">Outils & technologies</div>
            <div className="sec-h">Maîtrise <em>complète</em> de l&apos;écosystème Office</h2>
            <p className="sec-sub" style={{marginTop:'14px'}}>Des outils construits avec la bonne technologie et l&apos;expérience pour les combiner intelligemment.</p>
          </div>
          <div className="stack-list">
            {outils.map((o, i) => (
              <div className="stack-item" key={i}>
                <div className="s-name">{o.name}</div>
                <div className="s-desc">{o.desc}</div>
                <span className={`s-badge ${o.cls}`}>{o.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
