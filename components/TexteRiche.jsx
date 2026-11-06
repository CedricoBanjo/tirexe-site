// Affiche un texte de lib/services.js : [mots](/adresse) devient un lien, **mots** passe en gras.
import { Fragment } from 'react'
import { typo } from '../lib/typo'

export default function TexteRiche({ texte }) {
  const morceaux = texte.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g)
  return morceaux.map((m, i) => {
    const lien = m.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (lien) return <a key={i} href={lien[2]} className="lien-txt">{lien[1]}</a>
    const gras = m.match(/^\*\*([^*]+)\*\*$/)
    if (gras) return <strong key={i}>{gras[1]}</strong>
    return <Fragment key={i}>{typo(m)}</Fragment>
  })
}
