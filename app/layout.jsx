import './globals.css'
import { Manrope } from 'next/font/google'
import Effets from '../components/Effets'
import { SITE_URL, IMAGE_PARTAGE, DONNEES_SITE, jsonLd } from '../lib/seo'

// Police servie par le site lui-même (téléchargée une fois à la construction) :
// aucun appel à Google Fonts depuis le navigateur des visiteurs, et pas de blocage de l'affichage.
const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
})

// Titre et description de l'accueil (les mots que tapent les clients en tête)
const TITRE = 'Développeur VBA Excel freelance · Consultant senior | Tirexe'
const DESCRIPTION = 'Développeur VBA Excel senior à Martigues : outils sur mesure, automatisation de reporting, contrôle de données. En régie, en PACA ou à distance.'
const PARTAGE = 'Je conçois vos outils Excel sur mesure, j’automatise vos reportings et je fiabilise vos données. Missions longues en régie, PACA et remote France.'

// Valeurs par défaut (celles de l'accueil). Chaque page fixe sa propre adresse de référence.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITRE,
  description: DESCRIPTION,
  keywords: 'développeur VBA, développeur VBA freelance, consultant VBA Excel, expert VBA Excel, développeur Excel, automatisation Excel, macro Excel, Cédric Femminino, Tirexe, Martigues, Marseille, Aix-en-Provence, Fos-sur-Mer, Vitrolles, Istres, PACA',
  authors: [{ name: 'Cédric Femminino', url: SITE_URL }],
  openGraph: {
    title: 'Cédric Femminino · Développeur VBA Excel senior',
    description: PARTAGE,
    url: '/',
    siteName: 'Tirexe',
    locale: 'fr_FR',
    type: 'website',
    images: [IMAGE_PARTAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cédric Femminino · Développeur VBA Excel senior',
    description: PARTAGE,
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
        <Effets />
      </body>
    </html>
  )
}
