// Les trois formes du sable de la méthode, en coordonnées de 0,5 de part et d'autre du centre
// (1 = le côté de la scène) : 1 « vrac », 2 « grille », 3 « coche ». Partagées par la version WebGL
// (components/SableMethode.jsx) et par la version de repli sans WebGL (components/SableMethodeCanvas.jsx).
// Chaque forme : x, y (positions) et c (numéro de couleur dans COULEURS), un grain par case.

// 6 verts (du plus sombre au plus clair) puis 2 ors : les couleurs du logo
export const COULEURS = ['#3D7015', '#4F8A1E', '#64A12A', '#7AB838', '#92D050', '#A9DC70', '#E6A400', '#FFC000']

// hasard reproductible : les formes sont les mêmes à chaque visite
export function hasard(graine) {
  let s = graine >>> 0
  return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296 }
}
const gauss = r => Math.sqrt(-2 * Math.log(r() + 1e-9)) * Math.cos(2 * Math.PI * r())
const entre = (a, b, r) => a + Math.floor(r() * (b - a + 1))

// n grains le long de segments [x1, y1, x2, y2], sur une épaisseur e ; à partir du grain k0
function surSegments(f, segs, n, e, couleur, r, k0) {
  const longueurs = segs.map(([a, b, c, d]) => Math.hypot(c - a, d - b))
  const total = longueurs.reduce((s, l) => s + l, 0)
  for (let k = 0; k < n; k++) {
    let t = r() * total, j = 0
    while (t > longueurs[j] && j < segs.length - 1) { t -= longueurs[j]; j++ }
    const [a, b, c, d] = segs[j], l = longueurs[j] || 1, u = t / l, ecart = (r() - 0.5) * e
    f.x[k0 + k] = a + (c - a) * u - ((d - b) / l) * ecart
    f.y[k0 + k] = b + (d - b) * u + ((c - a) / l) * ecart
    f.c[k0 + k] = couleur(r)
  }
  return k0 + n
}
// n grains semés dans un rectangle
function dansRectangle(f, x1, y1, x2, y2, n, couleur, r, k0) {
  for (let k = 0; k < n; k++) {
    f.x[k0 + k] = x1 + r() * (x2 - x1); f.y[k0 + k] = y1 + r() * (y2 - y1); f.c[k0 + k] = couleur(r)
  }
  return k0 + n
}
// n grains semés dans une étoile à 4 branches (rayon R, creux ri), centrée en (cx, cy)
function dansEtoile(f, cx, cy, R, ri, n, couleur, r, k0) {
  const sommets = Array.from({ length: 8 }, (_, k) => {
    const a = (k * Math.PI) / 4 - Math.PI / 2, d = k % 2 ? ri : R
    return [cx + Math.cos(a) * d, cy + Math.sin(a) * d]
  })
  const dedans = (x, y) => {
    let oui = false
    for (let i = 0, j = sommets.length - 1; i < sommets.length; j = i++) {
      const [xi, yi] = sommets[i], [xj, yj] = sommets[j]
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) oui = !oui
    }
    return oui
  }
  for (let k = 0; k < n; k++) {
    let x, y
    do { x = cx + (r() * 2 - 1) * R; y = cy + (r() * 2 - 1) * R } while (!dedans(x, y))
    f.x[k0 + k] = x; f.y[k0 + k] = y; f.c[k0 + k] = couleur(r)
  }
  return k0 + n
}
const nouvelle = N => ({ x: new Float32Array(N), y: new Float32Array(N), c: new Uint8Array(N) })
const vertSombre = r => entre(0, 2, r), vertClair = r => entre(3, 5, r), or = r => entre(6, 7, r)

// Forme 1 : des données en vrac, en amas et en morceaux de tableau cassés
export function vrac(N, r) {
  const f = nouvelle(N)
  const amas = Array.from({ length: 7 }, () => [(r() - 0.5) * 0.72, (r() - 0.5) * 0.62, 0.035 + r() * 0.06])
  let k = 0
  const nMorceaux = Math.round(N * 0.3)
  const morceaux = Array.from({ length: 9 }, () => {
    const x = (r() - 0.5) * 0.8, y = (r() - 0.5) * 0.7, a = r() * Math.PI, l = 0.07 + r() * 0.1
    return [x, y, x + Math.cos(a) * l, y + Math.sin(a) * l]
  })
  k = surSegments(f, morceaux, nMorceaux, 0.012, r2 => (r2() < 0.15 ? or(r2) : entre(0, 5, r2)), r, k)
  for (; k < N; k++) {
    if (r() < 0.7) {
      const [ax, ay, s] = amas[Math.floor(r() * amas.length)]
      f.x[k] = ax + gauss(r) * s; f.y[k] = ay + gauss(r) * s * 0.8
    } else {
      f.x[k] = Math.max(-0.47, Math.min(0.47, gauss(r) * 0.2)); f.y[k] = Math.max(-0.45, Math.min(0.45, gauss(r) * 0.17))
    }
    f.c[k] = r() < 0.12 ? or(r) : entre(0, 5, r)
  }
  return f
}

// Forme 2 : un tableau bien rangé, en-tête rempli
export function grille(N, r) {
  const f = nouvelle(N)
  const x1 = -0.42, x2 = 0.42, y1 = -0.31, y2 = 0.31, colonnes = 5, rangs = 5
  const segs = []
  for (let j = 0; j <= rangs; j++) { const y = y1 + ((y2 - y1) * j) / rangs; segs.push([x1, y, x2, y]) }
  for (let i = 0; i <= colonnes; i++) { const x = x1 + ((x2 - x1) * i) / colonnes; segs.push([x, y1, x, y2]) }
  let k = surSegments(f, segs, Math.round(N * 0.6), 0.007, vertSombre, r, 0)
  k = dansRectangle(f, x1, y1, x2, y1 + (y2 - y1) / rangs, Math.round(N * 0.28), vertClair, r, k)
  dansRectangle(f, x1, y1 + (y2 - y1) / rangs, x1 + (x2 - x1) / colonnes, y2, N - k, r2 => entre(4, 5, r2), r, k)
  return f
}

// Forme 3 : la case cochée, avec l'étoile d'or du logo
export function coche(N, r) {
  const f = nouvelle(N)
  const c = 0.3, rayon = 0.08, segs = []
  // carré aux coins arrondis : 4 côtés et 4 quarts de cercle (en petits segments)
  segs.push([-c + rayon, -c, c - rayon, -c], [c, -c + rayon, c, c - rayon], [c - rayon, c, -c + rayon, c], [-c, c - rayon, -c, -c + rayon])
  for (const [cx, cy, a0] of [[c - rayon, -c + rayon, -Math.PI / 2], [c - rayon, c - rayon, 0], [-c + rayon, c - rayon, Math.PI / 2], [-c + rayon, -c + rayon, Math.PI]]) {
    for (let s = 0; s < 6; s++) {
      const a = a0 + (s * Math.PI) / 12, b = a0 + ((s + 1) * Math.PI) / 12
      segs.push([cx + Math.cos(a) * rayon, cy + Math.sin(a) * rayon, cx + Math.cos(b) * rayon, cy + Math.sin(b) * rayon])
    }
  }
  let k = surSegments(f, segs, Math.round(N * 0.34), 0.036, vertSombre, r, 0)
  k = surSegments(f, [[-0.165, 0.0, -0.045, 0.125], [-0.045, 0.125, 0.185, -0.13]], Math.round(N * 0.5), 0.09, vertClair, r, k)
  // l'étoile d'or du logo, posée sur le coin du carré
  dansEtoile(f, 0.3, -0.3, 0.12, 0.032, N - k, or, r, k)
  return f
}
