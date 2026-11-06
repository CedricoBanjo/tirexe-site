// Secteurs d'intervention : une plage de 3 × 2 cellules (A1 à C2)
const secteurs = [
  {
    ref: 'A1',
    icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
    name: 'Nucléaire & Énergie',
    desc: "Projets de grande envergure, contrôle de conformité, vérification de données techniques critiques.",
  },
  {
    ref: 'B1',
    icon: <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    name: 'BTP & Génie civil',
    desc: "Suivi de chantier, gestion des ressources, reporting d'avancement pour grands projets de construction.",
  },
  {
    ref: 'C1',
    icon: <svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    name: 'Finance & Contrôle de gestion',
    desc: "Tarification fournisseurs grands groupes, modèles financiers complexes, reportings de gestion automatisés.",
  },
  {
    ref: 'A2',
    icon: <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
    name: 'Industrie lourde',
    desc: "Outils de production, gestion de stocks, traitement de données issues de systèmes industriels.",
  },
  {
    ref: 'B2',
    icon: <svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    name: 'Tertiaire & Services',
    desc: "Automatisation administrative, outils de gestion, optimisation de processus bureautiques sur mesure.",
  },
  {
    ref: 'C2',
    icon: <svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
    name: 'Génie électrique & Infrastructure',
    desc: "Gestion de données techniques complexes, vérification de cohérence, suivi de projets longue durée.",
  },
]

export default function Secteurs() {
  return (
    <div className="section section-alt" id="secteurs">
      <div className="wrap">
        <div className="ey"><span className="ey-ref">A20</span>Secteurs d&apos;intervention</div>
        <h2 className="sec-h">Des projets dans des <em>secteurs variés</em></h2>
        <p className="sec-sub">Une expérience bâtie sur des projets réels, dans des environnements où la précision est une priorité.</p>
        <div className="sect-grid">
          {secteurs.map(s => (
            <div className="sect-c" key={s.ref}>
              <span className="sect-ref" aria-hidden="true">{s.ref}</span>
              <div className="sect-ico" aria-hidden="true">{s.icon}</div>
              <h3 className="sect-n">{s.name}</h3>
              <p className="sect-d">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
