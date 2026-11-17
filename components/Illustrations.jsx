// Petites illustrations des 4 expertises (SVG légers, décoratifs). Elles s'animent une fois quand la carte
// apparaît, puis au survol (voir « ILLUSTRATIONS » dans globals.css). « Réduire les animations » : immobiles.

// Contrôle de données : un tableau parcouru ligne à ligne ; chaque ligne reçoit son verdict
function Controle() {
  const lignes = [58.5, 87.5, 116.5, 145.5]
  return (
    <svg className="illus illus-controle" viewBox="0 0 360 180" aria-hidden="true" focusable="false">
      <rect className="i-carte" x="50" y="20" width="260" height="140" rx="12" />
      <path className="i-doux" d="M51 32a11 11 0 0 1 11-11h236a11 11 0 0 1 11 11v12H51z" />
      <rect className="i-texte-fonce" x="66" y="29" width="40" height="6" rx="3" />
      <rect className="i-texte-fonce" x="146" y="29" width="58" height="6" rx="3" />
      <rect className="i-texte-fonce" x="257" y="29" width="34" height="6" rx="3" />
      <path className="i-ligne" d="M50 44h260M50 73h260M50 102h260M50 131h260M130 20v140M240 20v140" />
      <rect className="i-scan" x="51" y="45" width="258" height="27" />
      {lignes.map((y, k) => (
        <g key={y}>
          <rect className="i-texte" x="66" y={y - 3} width={[46, 38, 50, 34][k]} height="6" rx="3" />
          <rect className="i-texte" x="146" y={y - 3} width={[72, 60, 78, 54][k]} height="6" rx="3" />
          {k === 2 ? (
            <g className="i-verdict" style={{ '--k': k }} transform={`translate(275 ${y})`}>
              <path className="i-or" d="M0-8.5l8.5 15h-17z" />
              <path className="i-trait-encre" d="M0-3v4.2M0 4.3v.2" />
            </g>
          ) : (
            <g className="i-verdict" style={{ '--k': k }} transform={`translate(275 ${y})`}>
              <circle className="i-vert" r="8.5" />
              <path className="i-trait-encre" d="M-3.6.3l2.5 2.5 4.8-5" />
            </g>
          )}
        </g>
      ))}
    </svg>
  )
}

// Application sur mesure : une fenêtre de saisie (UserForm) qu'on remplit, puis qu'on valide
function Application() {
  const champs = [46, 74, 102]
  return (
    <svg className="illus illus-application" viewBox="0 0 360 180" aria-hidden="true" focusable="false">
      <rect className="i-carte" x="78" y="12" width="204" height="156" rx="12" />
      <path className="i-doux" d="M79 24a11 11 0 0 1 11-11h180a11 11 0 0 1 11 11v8H79z" />
      {[93, 105, 117].map(x => <circle key={x} className="i-texte-fonce" cx={x} cy="22.5" r="3.5" />)}
      <rect className="i-texte-fonce" x="160" y="19.5" width="56" height="6" rx="3" />
      {champs.map((y, k) => (
        <g key={y}>
          <rect className="i-texte-fonce" x="96" y={y + 6} width="34" height="6" rx="3" />
          <rect className="i-champ" x="144" y={y} width="120" height="18" rx="5" />
          <rect className="i-saisie" style={{ '--k': k }} x="151" y={y + 6} width={[64, 82, 48][k]} height="6" rx="3" />
        </g>
      ))}
      <rect className="i-champ" x="144" y="136" width="52" height="20" rx="10" />
      <g className="i-bouton">
        <rect className="i-vert" x="204" y="136" width="60" height="20" rx="10" />
        <rect className="i-encre-doux" x="219" y="144" width="30" height="4" rx="2" />
      </g>
      <path className="i-curseur" d="M0 0v15l4-3.6 3 6.6 2.6-1.2-3-6.4H12z" transform="translate(246 150)" />
    </svg>
  )
}

// Reporting automatisé : un graphique dont les barres montent, et la tendance qui se trace
function Reporting() {
  const barres = [34, 52, 44, 70, 62, 88]
  return (
    <svg className="illus illus-reporting" viewBox="0 0 360 180" aria-hidden="true" focusable="false">
      <rect className="i-carte" x="40" y="16" width="280" height="148" rx="12" />
      <rect className="i-texte-fonce" x="58" y="32" width="84" height="7" rx="3.5" />
      <circle className="i-vert" cx="248" cy="35.5" r="4" />
      <rect className="i-texte" x="256" y="32.5" width="22" height="6" rx="3" />
      <circle className="i-or" cx="288" cy="35.5" r="4" />
      <rect className="i-texte" x="296" y="32.5" width="10" height="6" rx="3" />
      <path className="i-ligne i-pointille" d="M58 82h244M58 111h244" />
      <path className="i-ligne" d="M58 142h244" />
      {barres.map((h, k) => (
        <rect key={k} className={`i-barre${k === barres.length - 1 ? ' i-barre-forte' : ''}`} style={{ '--k': k }} x={70 + k * 38} y={142 - h} width="22" height={h} rx="4" />
      ))}
      <polyline className="i-courbe" points="81,118 119,96 157,104 195,76 233,82 271,58" />
      {[[81, 118], [119, 96], [157, 104], [195, 76], [233, 82], [271, 58]].map(([x, y]) => (
        <circle key={x} className="i-point-or" cx={x} cy={y} r="3.6" />
      ))}
    </svg>
  )
}

// Access et SQL : une base reliée à un tableau Excel, les données circulent
function Donnees() {
  return (
    <svg className="illus illus-donnees" viewBox="0 0 360 180" aria-hidden="true" focusable="false">
      <path className="i-carte" d="M52 50v80c0 9.4 16.1 17 36 17s36-7.6 36-17V50" />
      <ellipse className="i-doux i-bord" cx="88" cy="50" rx="36" ry="13" />
      <path className="i-ligne" d="M52 77c0 9.4 16.1 17 36 17s36-7.6 36-17M52 104c0 9.4 16.1 17 36 17s36-7.6 36-17" />
      <path className="i-flux" d="M132 92h86" />
      <path className="i-trait-vert" d="M212 86l7 6-7 6" />
      <rect className="i-or-pale" x="150" y="62" width="50" height="18" rx="9" />
      <text className="i-mot" x="175" y="74.5" textAnchor="middle">SQL</text>
      <rect className="i-carte" x="228" y="40" width="96" height="104" rx="10" />
      <path className="i-doux" d="M229 50a9 9 0 0 1 9-9h76a9 9 0 0 1 9 9v10h-94z" />
      <path className="i-ligne" d="M228 60h96M228 81h96M228 102h96M228 123h96M260 40v104M292 40v104" />
      {[[236, 66], [268, 66], [300, 87], [236, 108], [268, 129]].map(([x, y], k) => (
        <rect key={k} className="i-cellule" style={{ '--k': k }} x={x} y={y} width="18" height="9" rx="2.5" />
      ))}
    </svg>
  )
}

export const ILLUSTRATIONS = {
  'controle-donnees-excel-vba': Controle,
  'application-excel-sur-mesure': Application,
  'automatisation-reporting-excel': Reporting,
  'access-sql-excel-vba': Donnees,
}
