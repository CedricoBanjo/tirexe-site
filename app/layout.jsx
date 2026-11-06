import './globals.css'
import { Manrope } from 'next/font/google'
import { SITE_URL, IMAGE_PARTAGE, DONNEES_SITE, jsonLd } from '../lib/seo'

// Police servie par le site lui-même (téléchargée une fois à la construction) :
// aucun appel à Google Fonts depuis le navigateur des visiteurs, et pas de blocage de l'affichage.
const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
})

const TITRE = 'Cédric Femminino · Consultant & Développeur VBA Excel Senior'
const DESCRIPTION = 'Consultant et développeur VBA Excel senior à Martigues : outils métier, automatisation et contrôle de données. En régie en PACA ou à distance.'

// Valeurs par défaut (celles de l'accueil). Chaque page fixe sa propre adresse de référence.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITRE,
  description: DESCRIPTION,
  keywords: 'Cédric Femminino, consultant VBA Excel, développeur VBA freelance, expert Excel, automatisation Excel, missions longues régie, PACA, Martigues, Marseille, Fos-sur-Mer, Vitrolles, Aix-en-Provence, Istres, Port-de-Bouc, Salon-de-Provence',
  openGraph: {
    title: TITRE,
    description: 'Cédric Femminino conçoit des outils métier sur mesure et des algorithmes de contrôle complexes pour de grands projets industriels et financiers.',
    url: '/',
    siteName: 'Tirexe',
    locale: 'fr_FR',
    type: 'website',
    images: [IMAGE_PARTAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITRE,
    description: 'Consultant et développeur VBA Excel senior. Missions longues en régie, région PACA et remote France.',
    images: [IMAGE_PARTAGE.url],
  },
}

export const viewport = {
  themeColor: '#ffffff',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={manrope.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(DONNEES_SITE)} />
      </head>
      <body>
        <a href="#contenu" className="skip-link">Aller au contenu</a>
        {children}
      </body>
    </html>
  )
}
