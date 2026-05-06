import './globals.css'

export const metadata = {
  title: 'Cédric Femminino · Consultant & Développeur VBA Excel Senior',
  description: 'Cédric Femminino, consultant et développeur VBA Excel senior. Algorithmes de contrôle, outils métier sur mesure, automatisation de processus. Région PACA et remote France.',
  keywords: 'Cédric Femminino, consultant VBA Excel, développeur VBA freelance, expert Excel, automatisation Excel, missions longues régie, PACA, Martigues, Marseille',
  openGraph: {
    title: 'Cédric Femminino · Consultant & Développeur VBA Excel Senior',
    description: 'Cédric Femminino conçoit des outils métier sur mesure et des algorithmes de contrôle complexes pour de grands projets industriels et financiers.',
    url: 'https://tirexe.com',
    siteName: 'Tirexe',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Cédric Femminino",
          "jobTitle": "Consultant & Développeur VBA Excel Senior",
          "url": "https://tirexe.com",
          "email": "cedric@tirexe.com",
          "worksFor": { "@type": "Organization", "name": "Tirexe" },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Martigues",
            "addressRegion": "Provence-Alpes-Côte d'Azur",
            "addressCountry": "FR"
          },
          "knowsAbout": ["VBA", "Excel", "Power Query", "Access", "SQL", "Automatisation", "Algorithmes de contrôle", "Reporting"]
        })}} />
      </head>
      <body>{children}</body>
    </html>
  )
}
