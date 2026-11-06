'use client'
// Le logo Tirexe en sable fin et en volume, à côté du texte du haut de l'accueil.
// - Au chargement, le sable s'assemble de gauche à droite.
// - On le fait tourner en 3D en glissant, dans tous les sens : le logo a une épaisseur ; chaque face
//   prend la lumière selon l'angle, celles vues de dos pâlissent.
// - La souris écarte le sable au survol, et fait tourner le logo quand on glisse en tenant le bouton.
//   Au doigt, c'est pareil : un glissé rapide fait tourner le logo ; un doigt posé écarte le sable,
//   et si on le promène après l'avoir posé un court instant, il trace son chemin dans le sable.
//   Le sable revient à sa place. Même vitesse de rotation partout, à proportion de la taille du logo.
//   Sur téléphone, un glissé vertical fait toujours défiler la page.
// Le dessin vient de public/logo-sable.svg : le logo « tirexe. » redessiné en vectoriel (traits d'épaisseur
// constante, vrais arcs de cercle), avec une couleur de repérage par calque : lettres, griffes, étoile.
// public/logo-tirexe.svg est le même logo aux vraies couleurs.
// Décoratif (aria-hidden). « Réduire les animations » respecté (pas d'assemblage, pas de balancement).
import { useEffect, useRef } from 'react'

// Teintes : 7 nuances de la plus sombre à la plus claire (la 5e est la couleur du logo),
// puis la nuance pâle des faces vues de dos
const TEINTES = [
  ['#3D7015', '#4F8A1E', '#64A12A', '#7AB838', '#92D050', '#A9DC70', '#C2E895', '#E2F1D2'], // vert du logo
  ['#8A5F00', '#A87400', '#C88B00', '#E6A400', '#FFC000', '#FFCD3A', '#FFDB72', '#FAEAB5'], // or de l'étoile
]
const PALE = 7
// les mêmes couleurs, prêtes à écrire directement dans les pixels du dessin (ordre des octets : A B G R)
const PIXELS = TEINTES.map(t => t.map(hex => {
  const n = parseInt(hex.slice(1), 16)
  return (0xff000000 | ((n & 255) << 16) | (n & 0xff00) | (n >> 16)) >>> 0
}))
// Calques du fichier : couleur de repérage, teinte du sable, avancée vers le visiteur (en part de la largeur du logo)
const CALQUES = [
  { rvb: [146, 208, 80], teinte: 0, avance: 0 },     // lettres
  { rvb: [64, 150, 30], teinte: 0, avance: 0.024 },  // griffes : avec l'étoile, un peu en avant des lettres
  { rvb: [255, 192, 0], teinte: 1, avance: 0.024 },  // étoile
]
const EPAISSEUR = 0.05 // épaisseur du logo, en part de sa largeur

// Faces : direction vers laquelle elles regardent (y vers le bas, z vers le fond) et décalage de nuance.
// 0 avant, 1 dos, 2 et 3 les arêtes (un peu plus sombres : le contour reste net), puis les flancs dans 16 directions
const SECTEURS = 16
const FACES = [
  { n: [0, 0, -1], decal: 0 }, { n: [0, 0, 1], decal: 0 },
  { n: [0, 0, -1], decal: -1 }, { n: [0, 0, 1], decal: -1 },
  ...Array.from({ length: SECTEURS }, (_, k) => ({ n: [Math.cos((k * 2 * Math.PI) / SECTEURS), Math.sin((k * 2 * Math.PI) / SECTEURS), 0], decal: 0 })),
]
const [AVANT, DOS, ARETE_AVANT, ARETE_DOS, FLANC] = [0, 1, 2, 3, 4]
// La lumière vient d'en haut à droite, du côté du visiteur ; une part de lumière ambiante éclaire tout
const LUMIERE = (() => { const v = [0.5, -0.7, -0.5], n = Math.hypot(...v); return v.map(c => c / n) })()
const AMBIANTE = 0.3
const VUE = [0.12, -0.3] // angle de départ : [tangage, lacet]

// Le logo en volume, en points 3D [x, y, z, teinte, face], centré, à la taille W × H
function formeLogo(W, H, budget, image) {
  const ratio = image.naturalHeight / image.naturalWidth
  const l = Math.min(W * 0.9, (H * 0.62) / ratio), h = l * ratio
  // le logo est peint sur un calque invisible, deux fois plus fin que l'écran, puis lu pixel par pixel
  const e = 2, cw = Math.ceil(l * e), ch = Math.ceil(h * e)
  const o = document.createElement('canvas')
  o.width = cw; o.height = ch
  const c = o.getContext('2d', { willReadFrequently: true })
  c.drawImage(image, 0, 0, cw, ch)
  const d = c.getImageData(0, 0, cw, ch).data
  // calque de chaque pixel : 0 vide, sinon 1 + le calque dont la couleur est la plus proche
  const cal = new Uint8Array(cw * ch)
  let pleins = 0
  for (let p = 0, k = 0; p < cal.length; p++, k += 4) {
    if (d[k + 3] < 128) continue
    let meilleur = 0, ecart = Infinity
    for (let j = 0; j < CALQUES.length; j++) {
      const [r, g, b] = CALQUES[j].rvb, dr = d[k] - r, dg = d[k + 1] - g, db = d[k + 2] - b
      const dd = dr * dr + dg * dg + db * db
      if (dd < ecart) { ecart = dd; meilleur = j }
    }
    cal[p] = meilleur + 1; pleins++
  }
  const vide = (x, y) => x < 0 || y < 0 || x >= cw || y >= ch || !cal[y * cw + x]
  // les bords : pixels pleins qui touchent le vide ; leur direction pointe vers le vide
  const bords = []
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
    if (!cal[y * cw + x] || !(vide(x - 1, y) || vide(x + 1, y) || vide(x, y - 1) || vide(x, y + 1))) continue
    let nx = 0, ny = 0
    for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) if (vide(x + dx, y + dy)) { nx += dx; ny += dy }
    const secteur = ((Math.round((Math.atan2(ny, nx) / (2 * Math.PI)) * SECTEURS) % SECTEURS) + SECTEURS) % SECTEURS
    bords.push(x, y, cal[y * cw + x] - 1, secteur)
  }
  const nbBords = bords.length / 4 || 1
  const E = l * EPAISSEUR
  const avant = j => -E / 2 - CALQUES[j].avance * l, dos = j => E / 2 - CALQUES[j].avance * l
  const pts = []
  const grain = (x, y, j, z, face) => pts.push([(x + Math.random()) / e - l / 2, (y + Math.random()) / e - h / 2, z, CALQUES[j].teinte, face])
  // la face avant (64 % des grains) et le dos (6 %) : des grains semés au hasard sur toute la surface
  const pAvant = (budget * 0.64) / pleins, pDos = (budget * 0.06) / pleins
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
    const v = cal[y * cw + x]
    if (!v) continue
    if (Math.random() < pAvant) grain(x, y, v - 1, avant(v - 1), AVANT)
    if (Math.random() < pDos) grain(x, y, v - 1, dos(v - 1), DOS)
  }
  // les flancs (21 %), entre l'avant et le dos, et les deux arêtes (6 % devant, 3 % derrière)
  const nFlanc = (budget * 0.21) / nbBords, pAreteAvant = (budget * 0.06) / nbBords, pAreteDos = (budget * 0.03) / nbBords
  for (let b = 0; b < bords.length; b += 4) {
    const x = bords[b], y = bords[b + 1], j = bords[b + 2], za = avant(j), zd = dos(j)
    for (let r = nFlanc; r > 0; r--) if (r >= 1 || Math.random() < r) grain(x, y, j, za + Math.random() * (zd - za), FLANC + bords[b + 3])
    if (Math.random() < pAreteAvant) grain(x, y, j, za, ARETE_AVANT)
    if (Math.random() < pAreteDos) grain(x, y, j, zd, ARETE_DOS)
  }
  return pts
}

export default function LogoSable() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const zoneVisuel = canvas.closest('.hero-visuel')
    const ctx = canvas.getContext('2d')
    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const petit = window.innerWidth < 760
    const [vueX, vueY] = VUE

    let N = 0, W = 0, H = 0, DW = 0, DH = 0, dpr = 1, img = null, pix = null, opacite = 1, anim = 0, visible = false, pret = false, introFaite = false
    let px, py, pz, vx, vy, vz, tx, ty, tz, depart, cote, ventX, ventY, sx, sy, ss, ordre, groupes = []
    let rotX = vueX, rotY = vueY, vitX = 0, vitY = 0, glisse = null, dernierGeste = 0, souris = null, envol = 0, largeurLogo = 560
    const logo = new Image()

    // en deux temps, pour ne pas bloquer un téléphone lent : d'abord le dessin du logo en points, puis l'installation des grains
    const echantillonner = () => formeLogo(W, H, petit ? 22000 : 52000, logo)
    function construire(pts = echantillonner()) {
      N = pts.length
      px = new Float32Array(N); py = new Float32Array(N); pz = new Float32Array(N)
      vx = new Float32Array(N); vy = new Float32Array(N); vz = new Float32Array(N)
      tx = new Float32Array(N); ty = new Float32Array(N); tz = new Float32Array(N)
      depart = new Float64Array(N); cote = new Float32Array(N)
      ventX = new Float32Array(N); ventY = new Float32Array(N)
      sx = new Float32Array(N); sy = new Float32Array(N); ss = new Float32Array(N)
      // les grains rangés par teinte et par face : un seul tracé par groupe à chaque image
      const cle = p => p[3] * FACES.length + p[4], nbCles = TEINTES.length * FACES.length
      const compte = new Uint32Array(nbCles + 1)
      for (const p of pts) compte[cle(p) + 1]++
      for (let k = 0; k < nbCles; k++) compte[k + 1] += compte[k]
      groupes = []
      for (let k = 0; k < nbCles; k++) if (compte[k + 1] > compte[k]) groupes.push({ teinte: Math.floor(k / FACES.length), face: k % FACES.length, debut: compte[k], fin: compte[k + 1], nuance: 4 })
      ordre = new Uint32Array(N)
      const place = compte.slice(0, nbCles)
      pts.forEach((p, i) => { ordre[place[cle(p)]++] = i })
      let xmin = Infinity, xmax = -Infinity
      for (const p of pts) { if (p[0] < xmin) xmin = p[0]; if (p[0] > xmax) xmax = p[0] }
      if (xmax > xmin) largeurLogo = xmax - xmin
      introFaite = false
      for (let i = 0; i < N; i++) {
        const p = pts[i]
        tx[i] = p[0]; ty[i] = p[1]; tz[i] = p[2]
        cote[i] = 0.72 + Math.random() * 0.5 // taille du grain : 1 à 2 pixels de l'écran
        ventX[i] = (0.3 + Math.random()) * 220; ventY[i] = (0.2 + Math.random()) * 260
        if (reduit) { px[i] = tx[i]; py[i] = ty[i]; pz[i] = tz[i] }
        else {
          px[i] = (Math.random() - 0.5) * W * 1.1; py[i] = (Math.random() - 0.5) * H * 1.2; pz[i] = (Math.random() - 0.5) * 300
          depart[i] = 150 + ((tx[i] - xmin) / (xmax - xmin || 1)) * 1200 + Math.random() * 160
        }
      }
    }

    function dimensionner() {
      const w = canvas.clientWidth, h = canvas.clientHeight
      if (Math.abs(w - W) < 2 && Math.abs(h - H) < 2) return false
      W = w; H = h
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      DW = canvas.width = Math.round(W * dpr); DH = canvas.height = Math.round(H * dpr)
      img = ctx.createImageData(DW, DH); pix = new Uint32Array(img.data.buffer)
      return true
    }

    const FOCALE = 900
    function projeter(ca, sa, cb, sb) {
      const cx = W / 2, cy = H / 2
      for (let i = 0; i < N; i++) {
        const x1 = px[i] * ca + pz[i] * sa, z1 = -px[i] * sa + pz[i] * ca
        const y2 = py[i] * cb - z1 * sb, z2 = py[i] * sb + z1 * cb
        const f = FOCALE / (FOCALE + z2)
        sx[i] = cx + x1 * f + envol * ventX[i]; sy[i] = cy + y2 * f - envol * ventY[i]; ss[i] = f
      }
    }

    // nuance d'une face pour l'angle de vue actuel : de 0 (dans l'ombre) à 6 (en pleine lumière), PALE si vue de dos
    function nuance({ n: [x, y, z], decal }, ca, sa, cb, sb) {
      const x1 = x * ca + z * sa, z1 = -x * sa + z * ca
      const y2 = y * cb - z1 * sb, z2 = y * sb + z1 * cb
      if (z2 > 0.04) return PALE
      const l = Math.max(0, x1 * LUMIERE[0] + y2 * LUMIERE[1] + z2 * LUMIERE[2])
      return Math.max(0, Math.min(6, Math.round((AMBIANTE + (1 - AMBIANTE) * l) * 6) + decal))
    }

    // chaque grain est écrit directement dans les pixels du dessin (1 ou 2 pixels de côté) : rapide et net
    function peindre(ca, sa, cb, sb) {
      pix.fill(0)
      for (const g of groupes) g.nuance = nuance(FACES[g.face], ca, sa, cb, sb)
      // les faces vues de dos d'abord : les faces visibles passent par-dessus
      for (const deDos of [true, false]) for (const g of groupes) {
        if ((g.nuance === PALE) !== deDos) continue
        const c = PIXELS[g.teinte][g.nuance]
        for (let k = g.debut; k < g.fin; k++) {
          const i = ordre[k], x = (sx[i] * dpr) | 0, y = (sy[i] * dpr) | 0
          if (x < 0 || y < 0 || x >= DW - 1 || y >= DH - 1) continue
          const p = y * DW + x
          pix[p] = c
          if (cote[i] * ss[i] * dpr > 1.5) { pix[p + 1] = c; pix[p + DW] = c; pix[p + DW + 1] = c }
        }
      }
      ctx.putImageData(img, 0, 0)
      // en quittant le haut de page, le sable s'envole et s'efface
      const o = Math.max(0, 1 - envol * 1.15)
      if (Math.abs(o - opacite) > 0.01 || (o === 0) !== (opacite === 0)) { opacite = o; canvas.style.opacity = String(o) }
    }

    function image(t) {
      anim = requestAnimationFrame(image)
      if (!introFaite) { for (let i = 0; i < N; i++) depart[i] += t; introFaite = true }
      if (!glisse) {
        rotY += vitY; rotX += vitX; vitY *= 0.93; vitX *= 0.93
        if (t - dernierGeste > 2500) {
          const balance = reduit ? 0 : Math.sin(t / 2400) * 0.16
          rotY += (vueY + balance - rotY) * 0.02; rotX += (vueX - rotX) * 0.02
        }
      }
      rotX = Math.max(-1.1, Math.min(1.1, rotX))
      if (zoneVisuel) { const r = zoneVisuel.getBoundingClientRect(), v = window.innerHeight * 0.4; envol = Math.max(0, Math.min(1, (v - r.bottom) / v)) }
      const ca = Math.cos(rotY), sa = Math.sin(rotY), cb = Math.cos(rotX), sb = Math.sin(rotX)
      if (!reduit) {
        let R2 = 0, mx = 0, my = 0
        // la souris ou le doigt écarte le sable, sauf pendant qu'on fait tourner le logo
        if (souris && !(glisse && glisse.mode === 'tourne')) { const Rr = petit ? 44 : 56; R2 = Rr * Rr; mx = souris.x; my = souris.y }
        for (let i = 0; i < N; i++) {
          if (t < depart[i]) {
            vx[i] *= 0.9; vy[i] *= 0.9; vz[i] *= 0.9
            vx[i] += Math.sin(py[i] * 0.02 + t / 600) * 0.06; vy[i] += Math.cos(px[i] * 0.02 + t / 700) * 0.06
          } else {
            vx[i] = (vx[i] + (tx[i] - px[i]) * 0.06) * 0.82
            vy[i] = (vy[i] + (ty[i] - py[i]) * 0.06) * 0.82
            vz[i] = (vz[i] + (tz[i] - pz[i]) * 0.06) * 0.82
          }
          if (R2) {
            const dx = sx[i] - mx, dy = sy[i] - my, d2 = dx * dx + dy * dy
            if (d2 < R2) {
              // poussée de la souris ou du doigt, ramenée dans le repère du logo tourné
              const k = ((1 - d2 / R2) * 3.2) / (Math.sqrt(d2) + 1), fx = dx * k, fy = dy * k
              vx[i] += fx * ca + fy * sb * sa; vy[i] += fy * cb; vz[i] += fx * sa - fy * sb * ca
            }
          }
          px[i] += vx[i]; py[i] += vy[i]; pz[i] += vz[i]
        }
      }
      projeter(ca, sa, cb, sb)
      peindre(ca, sa, cb, sb)
    }

    function relancer() {
      const doit = pret && visible && !document.hidden
      if (doit && !anim) anim = requestAnimationFrame(image)
      else if (!doit && anim) { cancelAnimationFrame(anim); anim = 0 }
    }

    const position = e => { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top } }
    // un geste au doigt commence « en attente » : il devient une rotation s'il part vite (10 px en moins
    // de 180 ms), sinon un jeu avec le sable ; à la souris, appuyer puis glisser fait toujours tourner
    const appui = e => {
      const doigt = e.pointerType !== 'mouse'
      glisse = { x: e.clientX, y: e.clientY, x0: e.clientX, y0: e.clientY, t0: performance.now(), mode: doigt ? 'attente' : 'tourne' }
      dernierGeste = performance.now()
      if (doigt) souris = position(e) // le doigt écarte le sable dès qu'il se pose
      try { canvas.setPointerCapture(e.pointerId) } catch {}
    }
    const bouge = e => {
      // la souris suit toujours le pointeur ; le doigt, sauf pendant qu'il fait tourner le logo
      if (!glisse || glisse.mode !== 'tourne' || e.pointerType === 'mouse') souris = position(e)
      if (!glisse) return
      dernierGeste = performance.now()
      if (glisse.mode === 'attente') {
        if (Math.hypot(e.clientX - glisse.x0, e.clientY - glisse.y0) < 10) return
        glisse.mode = performance.now() - glisse.t0 < 180 ? 'tourne' : 'sable'
        if (glisse.mode === 'tourne') souris = null // le sable revient pendant que le logo tourne
      }
      if (glisse.mode === 'sable') return
      const dx = e.clientX - glisse.x, dy = e.clientY - glisse.y
      // même sensation à la souris et au doigt : un glissé de la largeur du logo le fait tourner d'environ 200°
      const sensibilite = 3.4 / largeurLogo
      vitY = dx * sensibilite; vitX = -dy * sensibilite
      rotY += vitY; rotX += vitX
      glisse.x = e.clientX; glisse.y = e.clientY
    }
    const lache = e => { glisse = null; dernierGeste = performance.now(); if (e.pointerType !== 'mouse') souris = null }
    const quitte = () => { souris = null; glisse = null }
    canvas.addEventListener('pointerdown', appui)
    canvas.addEventListener('pointermove', bouge, { passive: true })
    canvas.addEventListener('pointerup', lache)
    canvas.addEventListener('pointercancel', quitte)
    canvas.addEventListener('pointerleave', quitte)

    // le sable n'est préparé qu'une fois le logo chargé ET à moitié à l'écran : sur téléphone, où le logo est plus
    // bas que le premier écran, l'assemblage se joue sous les yeux du visiteur quand il arrive dessus, comme sur ordinateur
    let logoCharge = false, prevu = false, aMoitieVisible = false
    const essayer = () => { if (logoCharge && aMoitieVisible && !pret && !prevu) { prevu = true; attendre(demarrer) } }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (e.intersectionRatio >= 0.5) aMoitieVisible = true
      essayer(); relancer()
    }, { threshold: [0, 0.5] })
    io.observe(canvas)
    document.addEventListener('visibilitychange', relancer)
    let attente
    const redim = () => { clearTimeout(attente); attente = setTimeout(() => { if (dimensionner() && pret) { construire(); for (let i = 0; i < N; i++) { px[i] = tx[i]; py[i] = ty[i]; pz[i] = tz[i]; depart[i] = -1e9 } introFaite = true } }, 150) }
    window.addEventListener('resize', redim)

    let annule = false
    function demarrer() {
      if (annule) return
      dimensionner()
      const pts = echantillonner()
      attendre(() => {
        if (annule) return
        construire(pts)
        pret = true
        canvas.dataset.grains = String(N) // utile aux vérifications automatiques
        relancer()
      })
    }
    function attendre(cb) { if (window.requestIdleCallback) window.requestIdleCallback(cb, { timeout: 700 }); else setTimeout(cb, 150) }
    logo.onload = () => { logoCharge = true; essayer() }
    logo.src = '/logo-sable.svg'

    return () => {
      annule = true
      cancelAnimationFrame(anim)
      io.disconnect()
      canvas.removeEventListener('pointerdown', appui)
      canvas.removeEventListener('pointermove', bouge)
      canvas.removeEventListener('pointerup', lache)
      canvas.removeEventListener('pointercancel', quitte)
      canvas.removeEventListener('pointerleave', quitte)
      document.removeEventListener('visibilitychange', relancer)
      window.removeEventListener('resize', redim)
      clearTimeout(attente)
    }
  }, [])

  return <canvas ref={ref} className="sable-forme" aria-hidden="true" />
}
