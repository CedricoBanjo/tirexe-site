// Outils WebGL communs aux deux sables (le logo du haut de page et la méthode).
// La carte graphique dessine les grains : on peut en afficher des dizaines de milliers, très fins,
// sans ralentir la page. Sans WebGL, chaque sable bascule sur sa version de repli (dessin classique).

// Contexte WebGL 2 si possible, sinon WebGL 1, sinon null
export function contexteGL(canvas) {
  const options = { alpha: true, premultipliedAlpha: true, antialias: false, depth: true, stencil: false, powerPreference: 'high-performance' }
  try {
    return canvas.getContext('webgl2', options) || canvas.getContext('webgl', options) || null
  } catch {
    return null
  }
}

// Programme de dessin (sommets + pixels) ; null s'il ne compile pas sur cet appareil
export function programme(gl, sourceSommets, sourcePixels) {
  const compiler = (type, source) => {
    const s = gl.createShader(type)
    gl.shaderSource(s, source)
    gl.compileShader(s)
    return s
  }
  const vs = compiler(gl.VERTEX_SHADER, sourceSommets)
  const fs = compiler(gl.FRAGMENT_SHADER, sourcePixels)
  const p = gl.createProgram()
  gl.attachShader(p, vs)
  gl.attachShader(p, fs)
  gl.linkProgram(p)
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.warn('sable :', gl.getShaderInfoLog(vs) || gl.getShaderInfoLog(fs) || gl.getProgramInfoLog(p))
    return null
  }
  return p
}

// Un tampon de grains « entrelacé » : chaque grain occupe une ligne de nombres, décrite par le schéma
// [{ nom, taille }] (taille = nombre de valeurs de l'attribut). Renvoie le nombre de valeurs par grain.
export function chargerGrains(gl, prog, donnees, schema) {
  const tampon = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, tampon)
  gl.bufferData(gl.ARRAY_BUFFER, donnees, gl.STATIC_DRAW)
  const parGrain = schema.reduce((s, a) => s + a.taille, 0)
  let decalage = 0
  for (const { nom, taille } of schema) {
    const loc = gl.getAttribLocation(prog, nom)
    if (loc >= 0) {
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, taille, gl.FLOAT, false, parGrain * 4, decalage * 4)
    }
    decalage += taille
  }
  return { tampon, parGrain }
}

// Emplacements des réglages (uniforms) du programme
export function reglages(gl, prog, noms) {
  return Object.fromEntries(noms.map(n => [n, gl.getUniformLocation(prog, n)]))
}

// Rend la main au navigateur entre deux morceaux de calcul : la page reste fluide pendant la préparation
export function pause() {
  if (typeof window !== 'undefined' && window.scheduler?.yield) return window.scheduler.yield()
  return new Promise(r => setTimeout(r, 0))
}

// Couleur « #RRGGBB » en [r, g, b] de 0 à 1
export const rvb = hex => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)

// La trace du doigt ou de la souris dans le sable : les derniers points du geste (x, y, intensité),
// qui s'effacent peu à peu. Les grains s'écartent de la trace, puis reviennent quand elle s'efface.
export const POINTS_TRACE = 24
export class Trace {
  constructor() {
    this.points = new Float32Array(POINTS_TRACE * 3)
    this.dates = new Float64Array(POINTS_TRACE)
    this.suivant = 0
    this.dernier = null
  }
  // ajoute un point ; entre deux points éloignés, on en intercale pour que le sillon soit continu
  ajouter(x, y, t) {
    const d = this.dernier
    // le pointeur ne bouge pas : son dernier point reste frais, le sable reste écarté dessous
    if (d && Math.hypot(x - d.x, y - d.y) < 5) { this.dates[(this.suivant - 1) % POINTS_TRACE] = t; return }
    if (d) {
      const n = Math.min(4, Math.floor(Math.hypot(x - d.x, y - d.y) / 14))
      for (let k = 1; k <= n; k++) this.poser(d.x + ((x - d.x) * k) / (n + 1), d.y + ((y - d.y) * k) / (n + 1), t)
    }
    this.poser(x, y, t)
    this.dernier = { x, y }
  }
  poser(x, y, t) {
    const k = this.suivant++ % POINTS_TRACE
    this.points[k * 3] = x
    this.points[k * 3 + 1] = y
    this.dates[k] = t
  }
  lever() { this.dernier = null }
  // intensité de chaque point selon son âge : 1 tout neuf, 0 après « duree » millisecondes ; vrai s'il en reste
  vieillir(t, duree = 2200) {
    let reste = false
    for (let k = 0; k < POINTS_TRACE; k++) {
      const a = this.dates[k] ? (t - this.dates[k]) / duree : 1
      const v = a < 1 ? Math.pow(1 - a, 1.6) : 0
      this.points[k * 3 + 2] = v
      if (v > 0) reste = true
    }
    return reste
  }
}

// Morceaux de programme communs (langage des cartes graphiques, GLSL)
export const GLSL_TRACE = `
uniform vec3 u_trace[${POINTS_TRACE}];
uniform float u_rayon;
float soulevement; // 0 à 1 : combien le grain a été poussé (les bords du sillon prennent la lumière)
// les grains s'écartent des points de la trace (coordonnées de l'écran, en pixels CSS)
vec2 ecarter(vec2 p) {
  vec2 decalage = vec2(0.0);
  for (int i = 0; i < ${POINTS_TRACE}; i++) {
    vec3 t = u_trace[i];
    if (t.z <= 0.0) continue;
    vec2 d = p - t.xy;
    float l = length(d);
    if (l < u_rayon) {
      float k = 1.0 - l / u_rayon;
      k = k * k * (3.0 - 2.0 * k);
      decalage += d / (l + 0.5) * k * t.z * u_rayon * 0.4;
    }
  }
  float l = length(decalage);
  soulevement = clamp(l / (u_rayon * 0.45), 0.0, 1.0);
  return l > u_rayon * 0.7 ? decalage / l * u_rayon * 0.7 : decalage;
}
`

// Un tourbillon doux (somme de sinus) : le chemin du sable porté par le vent
export const GLSL_VENT = `
vec3 tourbillon(vec3 p, float t, float g) {
  return vec3(
    sin(p.y * 0.019 + t * 1.3 + g * 6.2831),
    cos(p.x * 0.016 - t * 1.1 + g * 3.1416),
    sin((p.x + p.y) * 0.012 + t * 0.7 + g * 1.7)
  );
}
`

// Le dessin de chaque grain : un petit disque aux bords adoucis, couleur prémultipliée
export const GLSL_PIXELS = `
precision mediump float;
varying vec3 v_couleur;
varying float v_alpha;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r2 = dot(d, d);
  if (r2 > 0.25) discard;
  float a = v_alpha * (1.0 - smoothstep(0.16, 0.25, r2)); // grain net, bord à peine adouci
  gl_FragColor = vec4(v_couleur * a, a);
}
`
