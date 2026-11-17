// Le logo « tirexe. » en grains de sable, pour la version WebGL (components/LogoSable.jsx).
// Chaque grain a sa place dans le logo en volume, son point de départ (le vent l'apporte de la gauche),
// son retard, sa taille, sa graine de hasard, son éclat, sa teinte et la face du volume où il se trouve.
// Autour, quelques grains de poussière flottent. Le calcul est découpé en petits morceaux : la page reste fluide.
import { pause } from './gl'

// Calques du dessin public/logo-sable.svg : couleur de repérage, teinte (0 vert, 1 or), avancée vers le visiteur
const CALQUES = [
  { rvb: [146, 208, 80], teinte: 0, avance: 0 },     // lettres
  { rvb: [64, 150, 30], teinte: 0, avance: 0.024 },  // griffes : avec l'étoile, un peu en avant des lettres
  { rvb: [255, 192, 0], teinte: 1, avance: 0.024 },  // étoile
]
const EPAISSEUR = 0.05 // épaisseur du logo, en part de sa largeur
const SECTEURS = 16    // directions des flancs
// faces : 0 avant, 1 dos, 2 arête avant, 3 arête arrière, 4 + k flanc dans la direction k, -1 poussière

// Valeurs par grain, dans l'ordre : cible (x, y, z), départ (x, y, z), retard, taille, graine, éclat, teinte, face
export const SCHEMA = [
  { nom: 'a_cible', taille: 3 },
  { nom: 'a_depart', taille: 3 },
  { nom: 'a_grain', taille: 4 },
  { nom: 'a_genre', taille: 2 },
]
const V = 12

// Largeur du logo dans un dessin de W × H pixels (la même règle que la version de repli)
export function largeurLogo(W, H, image) {
  const ratio = image.naturalHeight / image.naturalWidth
  return Math.min(W * 0.9, (H * 0.62) / ratio)
}

export async function grainsDuLogo({ W, H, budget, poussiere, image }) {
  const l = largeurLogo(W, H, image), h = l * (image.naturalHeight / image.naturalWidth)
  // le logo est peint sur un calque invisible, deux fois plus fin que l'écran, puis lu pixel par pixel
  const e = 2, cw = Math.ceil(l * e), ch = Math.ceil(h * e)
  const o = document.createElement('canvas')
  o.width = cw; o.height = ch
  const c = o.getContext('2d', { willReadFrequently: true })
  c.drawImage(image, 0, 0, cw, ch)
  const d = c.getImageData(0, 0, cw, ch).data
  let t0 = performance.now()
  const souffle = async () => { if (performance.now() - t0 > 8) { await pause(); t0 = performance.now() } }

  // calque de chaque pixel : 0 vide, sinon 1 + le calque dont la couleur est la plus proche
  const cal = new Uint8Array(cw * ch)
  let pleins = 0
  for (let y = 0; y < ch; y++) {
    for (let x = 0, p = y * cw, k = p * 4; x < cw; x++, p++, k += 4) {
      if (d[k + 3] < 128) continue
      let meilleur = 0, ecart = Infinity
      for (let j = 0; j < CALQUES.length; j++) {
        const [r, g, b] = CALQUES[j].rvb, dr = d[k] - r, dg = d[k + 1] - g, db = d[k + 2] - b
        const dd = dr * dr + dg * dg + db * db
        if (dd < ecart) { ecart = dd; meilleur = j }
      }
      cal[p] = meilleur + 1; pleins++
    }
    if (y % 24 === 0) await souffle()
  }
  const vide = (x, y) => x < 0 || y < 0 || x >= cw || y >= ch || !cal[y * cw + x]
  // les bords : pixels pleins qui touchent le vide ; leur direction pointe vers le vide
  const bords = []
  for (let y = 0; y < ch; y++) {
    for (let x = 0; x < cw; x++) {
      if (!cal[y * cw + x] || !(vide(x - 1, y) || vide(x + 1, y) || vide(x, y - 1) || vide(x, y + 1))) continue
      let nx = 0, ny = 0
      for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) if (vide(x + dx, y + dy)) { nx += dx; ny += dy }
      const secteur = ((Math.round((Math.atan2(ny, nx) / (2 * Math.PI)) * SECTEURS) % SECTEURS) + SECTEURS) % SECTEURS
      bords.push(x, y, cal[y * cw + x] - 1, secteur)
    }
    if (y % 24 === 0) await souffle()
  }
  const nbBords = bords.length / 4 || 1

  const E = l * EPAISSEUR
  const avant = j => -E / 2 - CALQUES[j].avance * l, dos = j => E / 2 - CALQUES[j].avance * l
  const out = new Float32Array(Math.ceil(budget * 1.15 + poussiere + 64) * V)
  let n = 0
  const R = Math.random
  // un grain : sa place, son départ (le vent l'apporte de la gauche, en rafale), son tour, sa taille, son éclat
  const grain = (x, y, j, z, face) => {
    if ((n + 1) * V > out.length) return
    const cx = (x + R()) / e - l / 2, cy = (y + R()) / e - h / 2, xn = cx / l + 0.5
    const o2 = n * V
    out[o2] = cx; out[o2 + 1] = cy; out[o2 + 2] = z
    out[o2 + 3] = cx - (0.3 + R() * 0.32) * W
    out[o2 + 4] = cy + (R() - 0.5) * H * 0.75
    out[o2 + 5] = z + (R() - 0.5) * 420
    out[o2 + 6] = 80 + xn * 1050 + R() * 320          // retard (ms) : de gauche à droite
    out[o2 + 7] = 0.68 + Math.pow(R(), 2.4) * 1.05     // taille (px) : surtout très fins, quelques plus gros
    out[o2 + 8] = R()                                   // graine
    out[o2 + 9] = R() < 0.03 ? 0.55 + R() * 0.45 : 0   // éclat : 3 % des grains scintillent
    out[o2 + 10] = CALQUES[j].teinte
    out[o2 + 11] = face
    n++
  }
  // la face avant (62 % des grains) et le dos (5 %) : des grains semés au hasard sur toute la surface
  const pAvant = (budget * 0.62) / pleins, pDos = (budget * 0.05) / pleins
  for (let y = 0; y < ch; y++) {
    for (let x = 0; x < cw; x++) {
      const v = cal[y * cw + x]
      if (!v) continue
      for (let r = pAvant; r > 0; r--) if (r >= 1 || R() < r) grain(x, y, v - 1, avant(v - 1), 0)
      if (R() < pDos) grain(x, y, v - 1, dos(v - 1), 1)
    }
    if (y % 24 === 0) await souffle()
  }
  // les flancs (23 %), entre l'avant et le dos, et les deux arêtes (7 % devant, 3 % derrière)
  const nFlanc = (budget * 0.23) / nbBords, pAreteAvant = (budget * 0.07) / nbBords, pAreteDos = (budget * 0.03) / nbBords
  for (let b = 0; b < bords.length; b += 4) {
    const x = bords[b], y = bords[b + 1], j = bords[b + 2], za = avant(j), zd = dos(j)
    for (let r = nFlanc; r > 0; r--) if (r >= 1 || R() < r) grain(x, y, j, za + R() * (zd - za), 4 + bords[b + 3])
    for (let r = pAreteAvant; r > 0; r--) if (r >= 1 || R() < r) grain(x, y, j, za, 2)
    for (let r = pAreteDos; r > 0; r--) if (r >= 1 || R() < r) grain(x, y, j, zd, 3)
    if (b % 4000 === 0) await souffle()
  }
  // la poussière qui flotte autour du logo
  for (let k = 0; k < poussiere && (n + 1) * V <= out.length; k++) {
    const o2 = n * V
    const x = (R() - 0.5) * W * 1.04, y = (R() - 0.5) * H * 1.1, z = (R() - 0.5) * 700
    out[o2] = x; out[o2 + 1] = y; out[o2 + 2] = z
    out[o2 + 3] = x; out[o2 + 4] = y; out[o2 + 5] = z
    out[o2 + 6] = R() * 1800
    out[o2 + 7] = 0.6 + Math.pow(R(), 3) * 1.5
    out[o2 + 8] = R()
    out[o2 + 9] = R() < 0.15 ? 0.6 : 0
    out[o2 + 10] = R() < 0.22 ? 1 : 0
    out[o2 + 11] = -1
    n++
  }
  return { donnees: out.subarray(0, n * V), nombre: n, largeur: l }
}
