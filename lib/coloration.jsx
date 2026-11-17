// Coloration du code dans les pages (articles du blog, exemple de l'accueil), faite à la construction du site :
// aucun script envoyé au visiteur. VBA : mots-clés, types, chaînes, commentaires, nombres.
// Formules Excel : fonctions, références de cellules, chaînes, nombres. Couleurs : .vb-* dans globals.css.

const MOTS_CLES = new Set(`option explicit compare base public private friend sub function property get let set end dim redim
preserve as new if then else elseif for each in to step next do loop while wend until with select case exit call byval byref
optional paramarray const static global type enum declare ptrsafe lib alias goto gosub resume on error return and or not xor
is like mod nothing true false empty null me erase withevents implements raiseevent event stop #if #elseif #else #end #const`.split(/\s+/))
const TYPES = new Set(`string long integer boolean double single variant object date byte currency longptr longlong decimal
collection dictionary range worksheet workbook`.split(/\s+/))

const debutMot = /[A-Za-z_#]/
const suiteMot = /[A-Za-z0-9_$]/

function colorerLigneVBA(ligne) {
  const morceaux = []
  let tampon = ''
  const pousser = (texte, classe) => {
    if (tampon) { morceaux.push(tampon); tampon = '' }
    morceaux.push(<span className={classe} key={morceaux.length}>{texte}</span>)
  }
  // « Rem » en début de ligne : tout le reste est un commentaire
  const rem = ligne.match(/^(\s*)(Rem(\s.*)?)$/i)
  if (rem) return [rem[1], <span className="vb-c" key="c">{rem[2]}</span>]

  let i = 0
  while (i < ligne.length) {
    const ch = ligne[i]
    if (ch === '"') { // chaîne ; "" à l'intérieur est un guillemet
      let j = i + 1
      while (j < ligne.length) {
        if (ligne[j] === '"') { if (ligne[j + 1] === '"') { j += 2; continue } break }
        j++
      }
      pousser(ligne.slice(i, j + 1), 'vb-s'); i = j + 1; continue
    }
    if (ch === "'") { pousser(ligne.slice(i), 'vb-c'); break }
    if (debutMot.test(ch) && !suiteMot.test(ligne[i - 1] || '')) {
      let j = i + 1
      while (j < ligne.length && suiteMot.test(ligne[j])) j++
      const mot = ligne.slice(i, j), cle = mot.toLowerCase().replace(/\$$/, '')
      if (MOTS_CLES.has(cle)) pousser(mot, 'vb-k')
      else if (TYPES.has(cle)) pousser(mot, 'vb-t')
      else tampon += mot
      i = j; continue
    }
    if (/[0-9]/.test(ch) && !suiteMot.test(ligne[i - 1] || '')) {
      let j = i + 1
      while (j < ligne.length && /[0-9.]/.test(ligne[j])) j++
      pousser(ligne.slice(i, j), 'vb-n'); i = j; continue
    }
    tampon += ch; i++
  }
  if (tampon) morceaux.push(tampon)
  return morceaux
}

export function colorerVBA(code) {
  return code.split('\n').map((ligne, n, toutes) => (
    <span key={n}>{colorerLigneVBA(ligne)}{n < toutes.length - 1 ? '\n' : ''}</span>
  ))
}

// Formules Excel : =SOMME.SI(A2:A10;"Nord";B2:B10)
const JETONS_FORMULE = /("(?:[^"]|"")*")|([A-ZÀ-Ý][A-ZÀ-Ý0-9.]*)(?=\()|(\$?[A-Z]{1,3}\$?[0-9]+(?::\$?[A-Z]{1,3}\$?[0-9]+)?)|(\b[0-9]+(?:[.,][0-9]+)?\b)/g

export function colorerFormule(code) {
  const morceaux = []
  let fin = 0, m
  JETONS_FORMULE.lastIndex = 0
  while ((m = JETONS_FORMULE.exec(code))) {
    if (m.index > fin) morceaux.push(code.slice(fin, m.index))
    const classe = m[1] ? 'vb-s' : m[2] ? 'vb-f' : m[3] ? 'vb-r' : 'vb-n'
    morceaux.push(<span className={classe} key={m.index}>{m[0]}</span>)
    fin = m.index + m[0].length
  }
  if (fin < code.length) morceaux.push(code.slice(fin))
  return morceaux
}
