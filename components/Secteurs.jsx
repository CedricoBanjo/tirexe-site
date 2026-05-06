const secteurs = [
  {
    icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
    name: 'Nucléaire & Énergie',
    desc: "Projets de grande envergure, contrôle de conformité, vérification de données techniques critiques.",
  },
  {
    icon: <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    name: 'BTP & Génie civil',
    desc: "Suivi de chantier, gestion des ressources, reporting d'avancement pour grands projets de construction.",
  },
  {
    icon: <svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    name: 'Finance & Contrôle de gestion',
    desc: "Tarification fournisseurs grands groupes, modèles financiers complexes, reportings de gestion automatisés.",
  },
  {
    icon: <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
    name: 'Industrie lourde',
    desc: "Outils de production, gestion de stocks, traitement de données issues de systèmes industriels.",
  },
  {
    icon: <svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    name: 'Tertiaire & Services',
    desc: "Automatisation administrative, outils de gestion, optimisation de processus bureautiques sur mesure.",
  },
  {
    icon: <svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
    name: 'Génie électrique & Infrastructure',
    desc: "Gestion de données techniques complexes, vérification de cohérence, suivi de projets longue durée.",
  },
]

export default function Secteurs() {
  return (
    <div className="section section-alt" id="secteurs">
      <div className="wrap">
        <div className="ey">Secteurs d&apos;intervention</div>
        <h2 className="sec-h">Des projets dans des <em>secteurs variés</em></h2>
        <p className="sec-sub">Une expérience bâtie sur des projets réels, dans des environnements où la précision est une priorité.</p>
        <div className="sect-grid">
          {secteurs.map((s, i) => (
            <div className="sect-c" key={i}>
              <div className="sect-ico">{s.icon}</div>
              <div className="sect-n">{s.name}</div>
              <div className="sect-d">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
