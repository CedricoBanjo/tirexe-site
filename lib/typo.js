// Typographie française : espace insécable avant « ; : ! ? » et à l'intérieur des guillemets,
// pour qu'un signe ne se retrouve jamais seul en début de ligne.
export function typo(texte) {
  return texte
    .replace(/ ([;:!?»])/g, ' $1')
    .replace(/« /g, '« ')
}
