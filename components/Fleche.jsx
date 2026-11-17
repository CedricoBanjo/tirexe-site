// Petite flèche des boutons et des liens « Découvrir » : elle glisse vers la droite au survol (voir .fleche dans globals.css)
export default function Fleche({ className = 'fleche' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  )
}
