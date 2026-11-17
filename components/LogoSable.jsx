'use client'
// Le logo Tirexe en sable fin et en volume, sous le texte du haut de l'accueil (la « scène »), dessiné par
// la carte graphique (WebGL) : jusqu'à 150 000 grains très fins, de tailles et de nuances variées, quelques
// éclats qui scintillent, et de la poussière qui flotte autour.
// - Quand le logo est à moitié à l'écran, le vent apporte le sable depuis la gauche et le logo se forme.
// - On le fait tourner en 3D en glissant : chaque face prend la lumière selon l'angle, le dos reste dans l'ombre ;
//   les grains loin du plan du logo s'adoucissent (flou de profondeur).
// - La souris écarte le sable sur son passage et y laisse un sillon qui se referme. Au doigt, c'est pareil :
//   un glissé rapide fait tourner le logo ; un doigt posé joue avec le sable. Un glissé vertical fait défiler.
// - En quittant le haut de page, le sable s'envole.
// Sans WebGL, la version de repli (components/LogoSableCanvas.jsx) prend le relais.
// Décoratif (aria-hidden). « Réduire les animations » respecté (pas d'assemblage, pas de balancement).
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { contexteGL, programme, chargerGrains, reglages, Trace, GLSL_TRACE, GLSL_VENT, GLSL_PIXELS } from './sable/gl'
import { grainsDuLogo, largeurLogo, SCHEMA } from './sable/logo'

const Repli = dynamic(() => import('./LogoSableCanvas'), { ssr: false })

const VUE = [0.12, -0.3] // angle de départ : [tangage, lacet]

const SOMMETS = `
precision highp float;
attribute vec3 a_cible;
attribute vec3 a_depart;
attribute vec4 a_grain;   // retard (ms), taille (px), graine, éclat
attribute vec2 a_genre;   // teinte (0 vert, 1 or), face (-1 poussière)
uniform vec2 u_ecran;     // taille du dessin (px CSS)
uniform float u_dpr;
uniform float u_temps;    // ms depuis le début de l'assemblage
uniform float u_horloge;  // ms, pour les mouvements continus
uniform vec4 u_rot;       // cos et sin du lacet, cos et sin du tangage
uniform float u_echelle;  // agrandissement depuis la préparation
uniform float u_envol;    // 0 à 1 : le sable s'envole quand on quitte le haut de page
uniform float u_calme;    // 1 : animations réduites
varying vec3 v_couleur;
varying float v_alpha;
${GLSL_TRACE}
${GLSL_VENT}
const vec3 LUMIERE = vec3(0.4851, -0.6792, -0.4851);
const float FOCALE = 900.0;
const float DUREE = 1500.0;

vec3 tourner(vec3 p) {
  float x1 = p.x * u_rot.x + p.z * u_rot.y;
  float z1 = -p.x * u_rot.y + p.z * u_rot.x;
  return vec3(x1, p.y * u_rot.z - z1 * u_rot.w, p.y * u_rot.w + z1 * u_rot.z);
}
vec3 normale(float face) {
  if (face < 3.5) return vec3(0.0, 0.0, (face < 0.5 || (face > 1.5 && face < 2.5)) ? -1.0 : 1.0);
  float a = (face - 4.0) * 0.39269908;
  return vec3(cos(a), sin(a), 0.0);
}
// nuances de 0 (dans l'ombre) à 6 (en pleine lumière)
vec3 nuance(float n, vec3 sombre, vec3 base, vec3 clair) {
  return n < 4.0 ? mix(sombre, base, n / 4.0) : mix(base, clair, (n - 4.0) / 2.0);
}

void main() {
  float face = a_genre.y;
  float g = a_grain.z;
  bool poussiere = face < -0.5;
  float anime = 1.0 - u_calme;
  float t = clamp((u_temps - a_grain.x) / DUREE, 0.0, 1.0);
  float e = 1.0 - pow(1.0 - t, 3.0);
  vec3 p;
  if (poussiere) {
    float h = u_horloge * 0.001;
    p = a_cible + vec3(sin(h * (0.21 + g * 0.3) + g * 40.0) * 26.0, cos(h * (0.17 + g * 0.25) + g * 30.0) * 16.0, sin(h * 0.13 + g * 20.0) * 30.0) * anime;
  } else {
    p = mix(a_depart, a_cible, e);
    p += tourbillon(p, u_temps * 0.001, g) * vec3(64.0, 46.0, 90.0) * (1.0 - e) * e * 3.2 * anime;
    p.xy += vec2(sin(u_horloge * 0.0011 + g * 50.0), cos(u_horloge * 0.0009 + g * 40.0)) * 0.22 * anime;
  }
  vec3 r = tourner(p * u_echelle);
  float f = FOCALE / (FOCALE + r.z);
  vec2 ecran = r.xy * f + u_ecran * 0.5;
  ecran += vec2(0.3 + fract(g * 13.7), -(0.2 + fract(g * 7.31))) * vec2(220.0, 260.0) * u_envol;
  ecran += ecarter(ecran);
  gl_Position = vec4(ecran.x / u_ecran.x * 2.0 - 1.0, 1.0 - ecran.y / u_ecran.y * 2.0, clamp(r.z / 1200.0, -0.99, 0.99), 1.0);
  float flou = smoothstep(90.0, 420.0, abs(r.z));
  gl_PointSize = max(1.0, a_grain.y * u_dpr * f * (1.0 + flou * 1.6));

  vec3 c;
  float alpha;
  if (poussiere) {
    c = a_genre.x > 0.5 ? vec3(1.0, 0.8, 0.25) : vec3(0.6, 0.83, 0.38);
    alpha = 0.42 * clamp((u_temps - a_grain.x) / 900.0, 0.0, 1.0);
  } else {
    vec3 n = tourner(normale(face));
    if (n.z > 0.04) {
      // face tournée vers l'arrière : on ne la voit qu'à travers le sable (au fond d'un sillon), dans l'ombre
      c = a_genre.x > 0.5 ? vec3(0.62, 0.45, 0.06) : vec3(0.31, 0.5, 0.13);
    } else {
      float decal = (face > 1.5 && face < 3.5) ? -1.0 : 0.0;
      float niveau = clamp((0.3 + 0.7 * max(0.0, dot(n, LUMIERE))) * 6.0 + decal, 0.0, 6.0);
      c = a_genre.x > 0.5
        ? nuance(niveau, vec3(0.541, 0.373, 0.0), vec3(1.0, 0.753, 0.0), vec3(1.0, 0.859, 0.447))
        : nuance(niveau, vec3(0.239, 0.439, 0.082), vec3(0.573, 0.816, 0.314), vec3(0.761, 0.91, 0.584));
    }
    // chaque grain a sa nuance ; quelques-uns, plus sombres, donnent le grain du sable
    float v = fract(g * 91.7);
    c *= v < 0.07 ? 0.72 : 0.86 + v * 0.24;
    alpha = smoothstep(0.0, 0.12, t);
  }
  float eclat = a_grain.w * (0.55 + 0.45 * sin(u_horloge * 0.0035 + g * 120.0));
  c = mix(c, vec3(1.0, 0.97, 0.86), max(eclat * 0.75, soulevement * 0.22));
  alpha *= (1.0 - flou * 0.45) * clamp(1.0 - u_envol * 1.15, 0.0, 1.0);
  v_couleur = c;
  v_alpha = alpha;
}
`

export default function LogoSable() {
  const ref = useRef(null)
  const [repli, setRepli] = useState(false)

  useEffect(() => {
    const canvas = ref.current
    const gl = contexteGL(canvas)
    const prog = gl && programme(gl, SOMMETS, GLSL_PIXELS)
    if (!prog) { setRepli(true); return }
    const u = reglages(gl, prog, ['u_ecran', 'u_dpr', 'u_temps', 'u_horloge', 'u_rot', 'u_echelle', 'u_envol', 'u_calme', 'u_trace', 'u_rayon'])
    gl.useProgram(prog)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clearColor(0, 0, 0, 0)

    const zoneVisuel = canvas.closest('.hero-scene')
    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const petit = window.innerWidth < 760
    const leger = (navigator.hardwareConcurrency || 8) <= 4
    const budget = Math.round((petit ? 60000 : 150000) * (leger ? 0.65 : 1))
    const poussiere = petit ? 900 : 2400
    const trace = new Trace()

    let W = 0, H = 0, dpr = 1, nombre = 0, largeurPrep = 1, echelle = 1, pret = false, visible = false, anim = 0, debut = 0
    let rotX = VUE[0], rotY = VUE[1], vitX = 0, vitY = 0, glisse = null, dernierGeste = 0, souris = null, envol = 0
    const logo = new Image()

    function dimensionner() {
      const w = canvas.clientWidth, h = canvas.clientHeight
      if (!w || !h) return
      W = w; H = h
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
      if (pret && logo.naturalWidth) echelle = largeurLogo(W, H, logo) / largeurPrep
    }

    function dessiner(t) {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      gl.uniform2f(u.u_ecran, W, H)
      gl.uniform1f(u.u_dpr, dpr)
      gl.uniform1f(u.u_temps, reduit ? 1e7 : t - debut)
      gl.uniform1f(u.u_horloge, t)
      gl.uniform4f(u.u_rot, Math.cos(rotY), Math.sin(rotY), Math.cos(rotX), Math.sin(rotX))
      gl.uniform1f(u.u_echelle, echelle)
      gl.uniform1f(u.u_envol, envol)
      gl.uniform1f(u.u_calme, reduit ? 1 : 0)
      gl.uniform3fv(u.u_trace, trace.points)
      gl.uniform1f(u.u_rayon, petit ? 40 : 52)
      gl.drawArrays(gl.POINTS, 0, nombre)
    }

    function image(t) {
      anim = requestAnimationFrame(image)
      // rotation : l'élan du geste, puis un retour doux vers l'angle de départ, avec un léger balancement
      if (!glisse) {
        rotY += vitY; rotX += vitX; vitY *= 0.93; vitX *= 0.93
        if (t - dernierGeste > 2500) {
          const balance = reduit ? 0 : Math.sin(t / 2400) * 0.16
          rotY += (VUE[1] + balance - rotY) * 0.02; rotX += (VUE[0] - rotX) * 0.02
        }
      }
      rotX = Math.max(-1.1, Math.min(1.1, rotX))
      if (zoneVisuel && !reduit) { const r = zoneVisuel.getBoundingClientRect(), v = window.innerHeight * 0.4; envol = Math.max(0, Math.min(1, (v - r.bottom) / v)) }
      // la souris ou le doigt écartent le sable, sauf pendant qu'on fait tourner le logo
      if (!reduit && souris && !(glisse && glisse.mode === 'tourne')) trace.ajouter(souris.x, souris.y, t)
      trace.vieillir(t)
      dessiner(t)
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
      if (doigt) souris = position(e)
      try { canvas.setPointerCapture(e.pointerId) } catch {}
    }
    const bouge = e => {
      if (!glisse || glisse.mode !== 'tourne' || e.pointerType === 'mouse') souris = position(e)
      if (!glisse) return
      dernierGeste = performance.now()
      if (glisse.mode === 'attente') {
        if (Math.hypot(e.clientX - glisse.x0, e.clientY - glisse.y0) < 10) return
        glisse.mode = performance.now() - glisse.t0 < 180 ? 'tourne' : 'sable'
        if (glisse.mode === 'tourne') { souris = null; trace.lever() }
      }
      if (glisse.mode === 'sable') return
      const dx = e.clientX - glisse.x, dy = e.clientY - glisse.y
      // même sensation à la souris et au doigt : un glissé de la largeur du logo le fait tourner d'environ 200°
      const sensibilite = 3.4 / ((largeurPrep || 600) * echelle)
      vitY = dx * sensibilite; vitX = -dy * sensibilite
      rotY += vitY; rotX += vitX
      glisse.x = e.clientX; glisse.y = e.clientY
    }
    const lache = e => { glisse = null; dernierGeste = performance.now(); if (e.pointerType !== 'mouse') { souris = null; trace.lever() } }
    const quitte = () => { souris = null; glisse = null; trace.lever() }
    canvas.addEventListener('pointerdown', appui)
    canvas.addEventListener('pointermove', bouge, { passive: true })
    canvas.addEventListener('pointerup', lache)
    canvas.addEventListener('pointercancel', quitte)
    canvas.addEventListener('pointerleave', quitte)

    // si la carte graphique lâche, la version de repli prend le relais
    const perdu = e => { e.preventDefault(); cancelAnimationFrame(anim); anim = 0; setRepli(true) }
    canvas.addEventListener('webglcontextlost', perdu)

    // le sable n'est préparé qu'une fois le logo chargé ET à moitié à l'écran : sur téléphone, où le logo est plus
    // bas que le premier écran, l'assemblage se joue sous les yeux du visiteur quand il arrive dessus
    let annule = false, logoCharge = false, prevu = false, aMoitieVisible = false
    async function preparer() {
      dimensionner()
      const { donnees, nombre: n, largeur } = await grainsDuLogo({ W, H, budget, poussiere, image: logo })
      if (annule) return
      chargerGrains(gl, prog, donnees, SCHEMA)
      nombre = n; largeurPrep = largeur; echelle = 1; pret = true
      debut = performance.now()
      canvas.dataset.grains = String(n) // utile aux vérifications automatiques
      relancer()
    }
    const essayer = () => { if (logoCharge && aMoitieVisible && !prevu) { prevu = true; preparer() } }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (e.intersectionRatio >= 0.5) aMoitieVisible = true
      essayer(); relancer()
    }, { threshold: [0, 0.5] })
    io.observe(canvas)
    document.addEventListener('visibilitychange', relancer)
    let attente
    const redim = () => { clearTimeout(attente); attente = setTimeout(dimensionner, 120) }
    window.addEventListener('resize', redim)
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
      canvas.removeEventListener('webglcontextlost', perdu)
      document.removeEventListener('visibilitychange', relancer)
      window.removeEventListener('resize', redim)
      clearTimeout(attente)
    }
  }, [])

  if (repli) return <Repli />
  return <canvas ref={ref} className="sable-forme" aria-hidden="true" />
}
