/** @type {import('next').NextConfig} */

// En-têtes de sécurité envoyés avec chaque page
const ENTETES_SECURITE = [
  // le navigateur ne devine pas le type des fichiers
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // les autres sites ne voient que « tirexe.com », jamais l'adresse complète de la page
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // le site n'a besoin ni de la caméra, ni du micro, ni de la position, ni du paiement
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
  // aucun autre site ne peut afficher tirexe.com dans un cadre (protection contre le « clickjacking »)
  { key: 'Content-Security-Policy', value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'" },
  { key: 'X-Frame-Options', value: 'DENY' },
]

const nextConfig = {
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['react-markdown'],
  },
  async headers() {
    return [{ source: '/:path*', headers: ENTETES_SECURITE }]
  },
  // /services seul n'a pas de page : on renvoie vers la liste des expertises de l'accueil
  async redirects() {
    return [{ source: '/services', destination: '/#expertise', permanent: false }]
  },
}
module.exports = nextConfig
