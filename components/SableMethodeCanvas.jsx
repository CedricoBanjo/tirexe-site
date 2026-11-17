'use client'
// Version de repli (navigateurs sans WebGL) du sable de la méthode : les mêmes grains changent de forme à chaque étape, comme un nuage qui prend
// figure. 1 « vrac » : des données éparpillées ; 2 « grille » : un tableau bien rangé ; 3 « coche » : un outil
// validé. L'étape active est celle dont le texte passe au milieu de l'écran (sur ordinateur comme au doigt).
// La souris ou le doigt écartent le sable, qui revient à sa place.
// Décoratif (aria-hidden). « Réduire les animations » : les formes changent sans mouvement.
import { useEffect, useRef } from 'react'
import { COULEURS, hasard, vrac, grille, coche } from './sable/formes'

// Les grains de chaque couleur, pour ne changer de couleur de pinceau que 8 fois par image
function grouper(f) {
  const g = COULEURS.map(() => [])
  for (let i = 0; i < f.c.length; i++) g[f.c[i]].push(i)
  f.groupes = g.map(a => Uint32Array.from(a))
  return f
}

export default function SableMethodeCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const section = canvas.closest('.methode')
    const etapes = section ? [...section.querySelectorAll('[data-etape]')] : []
    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const N = window.innerWidth < 760 ? 1700 : 3200
    const r = hasard(20261117)
    const formes = [vrac(N, r), grille(N, r), coche(N, r)].map(grouper)

    const px = new Float32Array(N), py = new Float32Array(N), vx = new Float32Array(N), vy = new Float32Array(N)
    const depart = new Float64Array(N), phase = new Float32Array(N), taille = new Float32Array(N)
    for (let i = 0; i < N; i++) { phase[i] = r() * 6.283; taille[i] = (N < 2000 ? 1.7 : 1.9) + r() * 0.9 }

    let W = 0, H = 0, S = 0, dpr = 1, forme = 0, anim = 0, visible = false, arrive = false, souris = null

    function dimensionner() {
      const w = canvas.clientWidth, h = canvas.clientHeight
      if (!w || !h) return
      const ancien = S
      W = w; H = h; S = Math.min(W, H) * 0.94
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr)
      if (ancien && arrive) for (let i = 0; i < N; i++) { px[i] *= S / ancien; py[i] *= S / ancien }
    }

    function dessiner() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)
      const cx = W / 2, cy = H / 2, f = formes[forme]
      for (let c = 0; c < COULEURS.length; c++) {
        const g = f.groupes[c]
        if (!g.length) continue
        ctx.fillStyle = COULEURS[c]
        for (let k = 0; k < g.length; k++) { const i = g[k]; ctx.fillRect(cx + px[i], cy + py[i], taille[i], taille[i]) }
      }
    }

    // sans animation : chaque grain directement à sa place
    function poser() {
      const f = formes[forme]
      for (let i = 0; i < N; i++) { px[i] = f.x[i] * S; py[i] = f.y[i] * S }
      dessiner()
    }

    function image(t) {
      anim = requestAnimationFrame(image)
      const f = formes[forme]
      // au repos, le vrac s'agite ; le tableau et la coche respirent à peine
      const agitation = forme === 0 ? 4.5 : 0.9
      let R2 = 0, mx = 0, my = 0
      if (souris) { R2 = 54 * 54; mx = souris.x - W / 2; my = souris.y - H / 2 }
      for (let i = 0; i < N; i++) {
        if (t >= depart[i]) {
          const tx = f.x[i] * S + Math.sin(t * 0.0011 + phase[i]) * agitation
          const ty = f.y[i] * S + Math.cos(t * 0.0009 + phase[i] * 1.3) * agitation
          vx[i] = (vx[i] + (tx - px[i]) * 0.05) * 0.86
          vy[i] = (vy[i] + (ty - py[i]) * 0.05) * 0.86
        } else { vx[i] *= 0.95; vy[i] *= 0.95 }
        if (R2) {
          const dx = px[i] - mx, dy = py[i] - my, d2 = dx * dx + dy * dy
          if (d2 < R2) { const k = ((1 - d2 / R2) * 2.6) / (Math.sqrt(d2) + 1); vx[i] += dx * k; vy[i] += dy * k }
        }
        px[i] += vx[i]; py[i] += vy[i]
      }
      dessiner()
    }

    function relancer() {
      const doit = arrive && visible && !reduit && !document.hidden
      if (doit && !anim) anim = requestAnimationFrame(image)
      else if (!doit && anim) { cancelAnimationFrame(anim); anim = 0 }
    }

    // première apparition : les grains arrivent de tout le cadre et se rassemblent
    function arriver() {
      arrive = true
      dimensionner()
      if (reduit) { poser(); return }
      const t = performance.now()
      for (let i = 0; i < N; i++) {
        px[i] = (r() - 0.5) * W * 1.1; py[i] = (r() - 0.5) * H * 1.1
        vx[i] = 0; vy[i] = 0; depart[i] = t + 120 + r() * 700
      }
    }

    function choisir(k) {
      if (k === forme || !formes[k]) return
      forme = k
      canvas.dataset.forme = String(k) // utile aux vérifications automatiques
      etapes.forEach((e, j) => e.classList.toggle('est-active', j === k))
      if (!arrive) return
      if (reduit) { poser(); return }
      const t = performance.now()
      for (let i = 0; i < N; i++) {
        depart[i] = t + r() * 420
        vx[i] += (r() - 0.5) * 3; vy[i] += (r() - 0.5) * 3 - 1.2
      }
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !arrive) arriver()
      relancer()
    }, { threshold: 0.15 })
    io.observe(canvas)

    // l'étape dont le texte traverse le milieu de l'écran devient l'étape active
    const ioEtapes = new IntersectionObserver(entrees => {
      for (const e of entrees) if (e.isIntersecting) choisir(Number(e.target.dataset.etape))
    }, { rootMargin: '-46% 0px -46% 0px' })
    etapes.forEach(e => ioEtapes.observe(e))

    const ro = new ResizeObserver(() => { dimensionner(); if (reduit && arrive) poser() })
    ro.observe(canvas)

    const position = e => { const b = canvas.getBoundingClientRect(); return { x: e.clientX - b.left, y: e.clientY - b.top } }
    const bouge = e => { souris = position(e) }
    const quitte = () => { souris = null }
    // au doigt, le sable revient dès qu'on lève le doigt ; à la souris, quand elle quitte le cadre
    const leve = e => { if (e.pointerType !== 'mouse') quitte() }
    canvas.addEventListener('pointermove', bouge, { passive: true })
    canvas.addEventListener('pointerdown', bouge, { passive: true })
    canvas.addEventListener('pointerleave', quitte)
    canvas.addEventListener('pointerup', leve)
    canvas.addEventListener('pointercancel', quitte)
    document.addEventListener('visibilitychange', relancer)
    canvas.dataset.forme = '0'
    canvas.dataset.grains = String(N)

    return () => {
      cancelAnimationFrame(anim)
      io.disconnect(); ioEtapes.disconnect(); ro.disconnect()
      canvas.removeEventListener('pointermove', bouge)
      canvas.removeEventListener('pointerdown', bouge)
      canvas.removeEventListener('pointerleave', quitte)
      canvas.removeEventListener('pointerup', leve)
      canvas.removeEventListener('pointercancel', quitte)
      document.removeEventListener('visibilitychange', relancer)
    }
  }, [])

  return <canvas ref={ref} className="sable-methode" aria-hidden="true" />
}
