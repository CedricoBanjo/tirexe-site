'use client'
// Le sable de la méthode, dessiné par la carte graphique (WebGL) : des dizaines de milliers de grains très fins
// qui changent de forme à chaque étape, portés par un tourbillon. 1 « vrac » : des données éparpillées ;
// 2 « grille » : un tableau bien rangé ; 3 « coche » : un outil validé, avec l'étoile d'or du logo.
// L'étape active est celle dont le texte passe au milieu de l'écran (sur ordinateur comme au doigt).
// La scène s'incline doucement vers le pointeur ; la souris ou le doigt creusent un sillon qui se referme.
// Sans WebGL, la version de repli (components/SableMethodeCanvas.jsx) prend le relais.
// Décoratif (aria-hidden). « Réduire les animations » : les formes changent sans mouvement.
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { contexteGL, programme, chargerGrains, reglages, rvb, Trace, GLSL_TRACE, GLSL_VENT, GLSL_PIXELS } from './sable/gl'
import { COULEURS, hasard, vrac, grille, coche } from './sable/formes'

const Repli = dynamic(() => import('./SableMethodeCanvas'), { ssr: false })

const DUREE_FORME = 1800   // ms pour passer d'une forme à l'autre
const DUREE_ARRIVEE = 2000 // ms pour la première apparition

// Valeurs par grain : les 3 formes (x, y), leurs 3 couleurs, retard (0 à 1), taille, graine, éclat, profondeur, départ (x, y)
const SCHEMA = [
  { nom: 'a_p0', taille: 2 }, { nom: 'a_p1', taille: 2 }, { nom: 'a_p2', taille: 2 },
  { nom: 'a_couleurs', taille: 3 },
  { nom: 'a_grain', taille: 4 },
  { nom: 'a_z', taille: 1 },
  { nom: 'a_depart', taille: 2 },
]
const V = 16

const SOMMETS = `
precision highp float;
attribute vec2 a_p0;
attribute vec2 a_p1;
attribute vec2 a_p2;
attribute vec3 a_couleurs;
attribute vec4 a_grain;   // retard (0 à 1), taille (px), graine, éclat
attribute float a_z;
attribute vec2 a_depart;
uniform vec2 u_ecran;
uniform float u_cote;     // côté de la scène (px CSS)
uniform float u_dpr;
uniform float u_horloge;
uniform vec3 u_de;        // poids des 3 formes au départ de la transition
uniform vec3 u_vers;      // poids des 3 formes à l'arrivée
uniform float u_progres;  // 0 à 1 : avancée de la transition
uniform float u_arrivee;  // 0 à 1 : première apparition
uniform vec2 u_incline;   // inclinaison vers le pointeur (radians)
uniform float u_calme;
uniform vec3 u_couleur[8];
varying vec3 v_couleur;
varying float v_alpha;
${GLSL_TRACE}
${GLSL_VENT}
vec2 forme(vec3 w) { return a_p0 * w.x + a_p1 * w.y + a_p2 * w.z; }
float dominante(vec3 w) { return (w.x >= w.y && w.x >= w.z) ? a_couleurs.x : (w.y >= w.z ? a_couleurs.y : a_couleurs.z); }

void main() {
  float g = a_grain.z;
  float anime = 1.0 - u_calme;
  // chaque grain part à son tour
  float t = u_calme > 0.5 ? 1.0 : clamp(u_progres * 1.6 - a_grain.x * 0.6, 0.0, 1.0);
  float e = t * t * (3.0 - 2.0 * t);
  vec3 q = vec3(mix(forme(u_de), forme(u_vers), e) * u_cote, a_z * u_cote);
  q += tourbillon(q, u_horloge * 0.001, g) * vec3(30.0, 22.0, 46.0) * sin(3.14159 * e) * anime;
  // au repos, le vrac s'agite ; le tableau et la coche respirent à peine
  float enVrac = mix(u_de.x, u_vers.x, e);
  q.xy += vec2(sin(u_horloge * 0.0011 + g * 60.0), cos(u_horloge * 0.0009 + g * 41.0)) * (0.5 + enVrac * 4.0) * anime;
  // première apparition : les grains arrivent de tout le cadre
  float ta = u_calme > 0.5 ? 1.0 : clamp(u_arrivee * 1.5 - a_grain.x * 0.5, 0.0, 1.0);
  float ea = 1.0 - pow(1.0 - ta, 3.0);
  q.xy = mix(a_depart * u_ecran, q.xy, ea);
  q += tourbillon(q, u_horloge * 0.001 + 7.0, g) * vec3(44.0, 32.0, 60.0) * sin(3.14159 * ea) * anime;
  // la scène s'incline doucement vers le pointeur
  float cy = cos(u_incline.x), sy = sin(u_incline.x), cx = cos(u_incline.y), sx = sin(u_incline.y);
  float x1 = q.x * cy + q.z * sy, z1 = -q.x * sy + q.z * cy;
  float y2 = q.y * cx - z1 * sx, z2 = q.y * sx + z1 * cx;
  float f = 900.0 / (900.0 + z2);
  vec2 ecran = vec2(x1, y2) * f + u_ecran * 0.5;
  ecran += ecarter(ecran);
  gl_Position = vec4(ecran.x / u_ecran.x * 2.0 - 1.0, 1.0 - ecran.y / u_ecran.y * 2.0, clamp(z2 / 1200.0, -0.99, 0.99), 1.0);
  gl_PointSize = max(1.0, a_grain.y * u_dpr * f);
  // couleur : celle de la forme d'arrivée dès la moitié du trajet
  float ci = e < 0.5 ? dominante(u_de) : dominante(u_vers);
  float v = fract(g * 91.7);
  vec3 c = u_couleur[int(ci + 0.5)] * (v < 0.07 ? 0.74 : 0.86 + v * 0.24);
  float eclat = a_grain.w * (0.55 + 0.45 * sin(u_horloge * 0.0035 + g * 120.0));
  v_couleur = mix(c, vec3(1.0, 0.97, 0.86), max(eclat * 0.7, soulevement * 0.22));
  v_alpha = smoothstep(0.0, 0.25, ta);
}
`

// Les 3 formes, rangées pour la carte graphique (un grain par ligne de V valeurs)
function preparerGrains(N) {
  const r = hasard(20261117)
  const [a, b, c] = [vrac(N, r), grille(N, r), coche(N, r)]
  const out = new Float32Array(N * V)
  for (let i = 0; i < N; i++) {
    const o = i * V
    out[o] = a.x[i]; out[o + 1] = a.y[i]; out[o + 2] = b.x[i]; out[o + 3] = b.y[i]; out[o + 4] = c.x[i]; out[o + 5] = c.y[i]
    out[o + 6] = a.c[i]; out[o + 7] = b.c[i]; out[o + 8] = c.c[i]
    out[o + 9] = r()                                    // retard
    out[o + 10] = 0.75 + Math.pow(r(), 2.4) * 1.1       // taille (px) : surtout très fins
    out[o + 11] = r()                                   // graine
    out[o + 12] = r() < 0.03 ? 0.55 + r() * 0.45 : 0    // éclat
    out[o + 13] = (r() - 0.5) * 0.06                    // profondeur
    out[o + 14] = (r() - 0.5) * 1.1; out[o + 15] = (r() - 0.5) * 1.1 // départ, en part du cadre
  }
  return out
}

export default function SableMethode() {
  const ref = useRef(null)
  const [repli, setRepli] = useState(false)

  useEffect(() => {
    const canvas = ref.current
    const gl = contexteGL(canvas)
    const prog = gl && programme(gl, SOMMETS, GLSL_PIXELS)
    if (!prog) { setRepli(true); return }
    const u = reglages(gl, prog, ['u_ecran', 'u_cote', 'u_dpr', 'u_horloge', 'u_de', 'u_vers', 'u_progres', 'u_arrivee', 'u_incline', 'u_calme', 'u_couleur', 'u_trace', 'u_rayon'])
    gl.useProgram(prog)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clearColor(0, 0, 0, 0)
    gl.uniform3fv(u.u_couleur, new Float32Array(COULEURS.flatMap(rvb)))

    const section = canvas.closest('.methode')
    const etapes = section ? [...section.querySelectorAll('[data-etape]')] : []
    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const petit = window.innerWidth < 760
    const leger = (navigator.hardwareConcurrency || 8) <= 4
    const N = Math.round((petit ? 22000 : 52000) * (leger ? 0.65 : 1))
    const trace = new Trace()

    let W = 0, H = 0, dpr = 1, pret = false, visible = false, anim = 0, forme = 0
    let de = [1, 0, 0], vers = [1, 0, 0], debutForme = -1e9, debutArrivee = 0
    let incline = [0, 0], cible = [0, 0], souris = null

    function dimensionner() {
      const w = canvas.clientWidth, h = canvas.clientHeight
      if (!w || !h) return
      W = w; H = h
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const lisse = x => x * x * (3 - 2 * x)
    const progres = t => Math.max(0, Math.min(1, (t - debutForme) / DUREE_FORME))

    function dessiner(t) {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      gl.uniform2f(u.u_ecran, W, H)
      gl.uniform1f(u.u_cote, Math.min(W, H) * 0.94)
      gl.uniform1f(u.u_dpr, dpr)
      gl.uniform1f(u.u_horloge, t)
      gl.uniform3fv(u.u_de, de)
      gl.uniform3fv(u.u_vers, vers)
      gl.uniform1f(u.u_progres, reduit ? 1 : progres(t))
      gl.uniform1f(u.u_arrivee, reduit ? 1 : Math.min(1, (t - debutArrivee) / DUREE_ARRIVEE))
      gl.uniform2f(u.u_incline, incline[0], incline[1])
      gl.uniform1f(u.u_calme, reduit ? 1 : 0)
      gl.uniform3fv(u.u_trace, trace.points)
      gl.uniform1f(u.u_rayon, petit ? 34 : 46)
      gl.drawArrays(gl.POINTS, 0, N)
    }

    function image(t) {
      anim = requestAnimationFrame(image)
      incline[0] += (cible[0] - incline[0]) * 0.05; incline[1] += (cible[1] - incline[1]) * 0.05
      if (souris) trace.ajouter(souris.x, souris.y, t)
      trace.vieillir(t)
      dessiner(t)
    }

    function relancer() {
      const doit = pret && visible && !reduit && !document.hidden
      if (doit && !anim) anim = requestAnimationFrame(image)
      else if (!doit && anim) { cancelAnimationFrame(anim); anim = 0 }
    }

    function choisir(k) {
      if (k === forme) return
      forme = k
      canvas.dataset.forme = String(k) // utile aux vérifications automatiques
      etapes.forEach((e, j) => e.classList.toggle('est-active', j === k))
      const t = performance.now(), p = lisse(progres(t))
      // on repart de l'état présent (un mélange, si la transition précédente n'était pas finie)
      de = de.map((v, i) => v + (vers[i] - v) * p)
      vers = [0, 0, 0]; vers[k] = 1
      debutForme = t
      if (pret && reduit) dessiner(t)
    }

    // la préparation des grains se fait quand le navigateur souffle, à la première apparition de la scène
    function preparer() {
      dimensionner()
      chargerGrains(gl, prog, preparerGrains(N), SCHEMA)
      pret = true
      debutArrivee = performance.now()
      canvas.dataset.grains = String(N)
      if (reduit) dessiner(performance.now())
      relancer()
    }
    let prevu = false
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !prevu) {
        prevu = true
        if (window.requestIdleCallback) window.requestIdleCallback(preparer, { timeout: 600 }); else setTimeout(preparer, 60)
      }
      relancer()
    }, { threshold: 0.1 })
    io.observe(canvas)

    // l'étape dont le texte traverse le milieu de l'écran devient l'étape active
    const ioEtapes = new IntersectionObserver(entrees => {
      for (const e of entrees) if (e.isIntersecting) choisir(Number(e.target.dataset.etape))
    }, { rootMargin: '-46% 0px -46% 0px' })
    etapes.forEach(e => ioEtapes.observe(e))

    const ro = new ResizeObserver(() => { dimensionner(); if (pret && reduit) dessiner(performance.now()) })
    ro.observe(canvas)

    const position = e => { const b = canvas.getBoundingClientRect(); return { x: e.clientX - b.left, y: e.clientY - b.top } }
    const bouge = e => {
      souris = position(e)
      if (!reduit) cible = [(souris.x / (W || 1) - 0.5) * 0.5, -(souris.y / (H || 1) - 0.5) * 0.4]
    }
    const quitte = () => { souris = null; cible = [0, 0]; trace.lever() }
    const leve = e => { if (e.pointerType !== 'mouse') quitte() }
    canvas.addEventListener('pointermove', bouge, { passive: true })
    canvas.addEventListener('pointerdown', bouge, { passive: true })
    canvas.addEventListener('pointerleave', quitte)
    canvas.addEventListener('pointerup', leve)
    canvas.addEventListener('pointercancel', quitte)
    document.addEventListener('visibilitychange', relancer)
    const perdu = e => { e.preventDefault(); cancelAnimationFrame(anim); anim = 0; setRepli(true) }
    canvas.addEventListener('webglcontextlost', perdu)
    canvas.dataset.forme = '0'

    return () => {
      cancelAnimationFrame(anim)
      io.disconnect(); ioEtapes.disconnect(); ro.disconnect()
      canvas.removeEventListener('pointermove', bouge)
      canvas.removeEventListener('pointerdown', bouge)
      canvas.removeEventListener('pointerleave', quitte)
      canvas.removeEventListener('pointerup', leve)
      canvas.removeEventListener('pointercancel', quitte)
      canvas.removeEventListener('webglcontextlost', perdu)
      document.removeEventListener('visibilitychange', relancer)
    }
  }, [])

  if (repli) return <Repli />
  return <canvas ref={ref} className="sable-methode" aria-hidden="true" />
}
