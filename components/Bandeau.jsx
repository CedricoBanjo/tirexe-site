// Bandeau qui défile doucement : les secteurs où Cédric intervient (ceux que le site cite déjà).
// La liste est lue une fois par les lecteurs d'écran ; sa copie, qui sert seulement à boucler, leur est cachée.
// « Réduire les animations » : le bandeau ne défile pas, les secteurs passent à la ligne.
const SECTEURS = [
  'Nucléaire & énergie',
  'BTP & génie civil',
  'Finance & contrôle de gestion',
  'Industrie lourde',
  'Tertiaire & services',
  'Génie électrique & infrastructure',
]

function Etoile() {
  return (
    <svg className="bandeau-etoile" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
      <path d="M12 1.5c.6 4.6 2.4 7.3 6.6 8.6l3.9 1.2-3.9 1.2c-4.2 1.3-6 4-6.6 8.6-.6-4.6-2.4-7.3-6.6-8.6L1.5 11.3l3.9-1.2c4.2-1.3 6-4 6.6-8.6z" fill="currentColor" />
    </svg>
  )
}

export default function Bandeau() {
  return (
    <section className="bandeau" aria-labelledby="bandeau-titre">
      <p className="bandeau-titre" id="bandeau-titre">Des projets dans des secteurs variés</p>
      <div className="bandeau-fenetre">
        <div className="bandeau-piste">
          {[0, 1].map(copie => (
            <ul className="bandeau-liste" key={copie} aria-hidden={copie === 1 ? 'true' : undefined}>
              {SECTEURS.map(s => <li key={s}>{s}<Etoile /></li>)}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
