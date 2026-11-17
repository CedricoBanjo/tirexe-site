// Typographie française : espace insécable avant « ; : ! ? » et à l'intérieur des guillemets,
// pour qu'un signe ne se retrouve jamais seul en début de ligne.
import { Children } from 'react'

export function typo(texte) {
  return texte
    .replace(/ ([;:!?»])/g, ' $1')
    .replace(/« /g, '« ')
}

// La même chose sur les morceaux de texte d'un élément (paragraphes des articles, par exemple)
export function typoEnfants(enfants) {
  return Children.map(enfants, e => (typeof e === 'string' ? typo(e) : e))
}
