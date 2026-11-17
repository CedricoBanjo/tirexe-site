// Les secteurs où Cédric intervient (ceux que le site cite déjà), tous visibles d'un coup :
// pas de défilement, on les lit sans attendre. Ils apparaissent en douceur à l'arrivée à l'écran.
const SECTEURS = [
  ['Nucléaire & énergie', <path key="p" d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12L13 2z" />],
  ['BTP & génie civil', <path key="p" d="M3 21h18M5 21V9l7-5 7 5v12M9.5 21v-5.5h5V21" />],
  ['Finance & contrôle de gestion', <path key="p" d="M3 3v18h18M7 15l4-4 3 3 6-7" />],
  ['Industrie lourde', <path key="p" d="M2 21h20M4 21V11l5 3v-3l5 3v-3l5 3V5h-3v6M19 21v-7" />],
  ['Tertiaire & services', <path key="p" d="M3 8h18v12H3zM8.5 8V5h7v3M3 13h18" />],
  ['Génie électrique & infrastructure', <path key="p" d="M12 2 7 22M12 2l5 20M8.6 15.5h6.8M9.8 10.5h4.4M5 6.5h14" />],
]

export default function Bandeau() {
  return (
    <section className="secteurs" aria-labelledby="secteurs-titre">
      <div className="wrap">
        <h2 className="secteurs-titre" id="secteurs-titre">Des projets dans des secteurs variés</h2>
        <ul className="secteurs-liste">
          {SECTEURS.map(([nom, icone], i) => (
            <li className="secteur revele" style={{ '--d': i % 3 }} key={nom}>
              <span className="secteur-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" focusable="false">{icone}</svg>
              </span>
              <span className="secteur-nom">{nom}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
