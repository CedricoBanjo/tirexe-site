const expertises = [
  {
    tag: 'Contrôle & vérification',
    icon: <svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>,
    title: 'Algorithmes de contrôle & vérification',
    desc: "Conception d'algorithmes de cohérence et de conformité pour des projets à enjeux critiques. Vérification automatique de données complexes, détection d'anomalies, validation croisée multi-sources sur de grands volumes.",
    tags: ['Contrôle cohérence', 'Validation données', 'Détection anomalies', 'Conformité règles métier'],
  },
  {
    tag: 'Outils métier',
    icon: <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
    title: 'Applications Excel sur mesure',
    desc: "Facturation spécifique, outils de suivi, calculs avec règles métier avancées, tarifications fournisseurs pour grands groupes, interfaces ergonomiques avec UserForms.",
    tags: ['Facturation', 'Suivi & pilotage', 'Tarifications complexes', 'UserForms avancés'],
  },
  {
    tag: 'Automatisation',
    icon: <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    title: 'Reporting & processus automatisés',
    desc: "Automatisation complète des processus récurrents — reporting, consolidation multi-sources, génération de documents Word et PowerPoint, envois Outlook programmés. Zéro intervention manuelle sur les tâches répétitives.",
    tags: ['Reporting auto', 'Consolidation données', 'Génération docs', 'Outlook VBA'],
  },
  {
    tag: 'Données',
    icon: <svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/></svg>,
    title: 'Bases de données & interopérabilité',
    desc: "Bases Access (.MDB, .ACCDB, .MDE), requêtes SQL depuis Excel, migrations et transformations entre logiciels métier, traitement de sources hétérogènes.",
    tags: ['Access multi-formats', 'SQL / VBA', 'Migration données', 'Sources hétérogènes'],
  },
]

export default function Expertise() {
  return (
    <div className="section" id="expertise">
      <div className="wrap">
        <div className="ey">Expertise</div>
        <h2 className="sec-h">Ce que je <em>construis</em> pour vous</h2>
        <p className="sec-sub">Des solutions robustes pour des environnements exigeants — du contrôle industriel à la finance de grands groupes.</p>
        <div className="exp-grid">
          {expertises.map((e, i) => (
            <div className="exp-card" key={i}>
              <span className="exp-tag">{e.tag}</span>
              <div className="exp-ico">{e.icon}</div>
              <div className="exp-h">{e.title}</div>
              <div className="exp-p">{e.desc}</div>
              <div className="etags">
                {e.tags.map((t, j) => <span className="etag" key={j}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
