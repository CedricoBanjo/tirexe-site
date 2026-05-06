import './globals.css'

export const metadata = {
  title: 'Cédric Femminino · Consultant & Développeur VBA Excel Senior',
  description: 'Cédric Femminino, consultant et développeur VBA Excel senior basé à Martigues. Missions en régie sur Marseille, Fos-sur-Mer, Vitrolles, Aix-en-Provence, Istres et toute la région PACA. Remote France entière.',
  keywords: 'Cédric Femminino, consultant VBA Excel, développeur VBA freelance, expert Excel, automatisation Excel, missions longues régie, PACA, Martigues, Marseille, Fos-sur-Mer, Vitrolles, Aix-en-Provence, Istres, Port-de-Bouc, Salon-de-Provence',
  openGraph: {
    title: 'Cédric Femminino · Consultant & Développeur VBA Excel Senior',
    description: 'Cédric Femminino conçoit des outils métier sur mesure et des algorithmes de contrôle complexes pour de grands projets industriels et financiers.',
    url: 'https://tirexe.com',
    siteName: 'Tirexe',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://tirexe.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cédric Femminino — Consultant VBA Excel Senior',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cédric Femminino · Consultant & Développeur VBA Excel Senior',
    description: 'Consultant et développeur VBA Excel senior. Missions longues en régie, région PACA et remote France.',
    images: ['https://tirexe.com/og-image.png'],
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
            "addressCountry": "FR",
            "description": "Consultant VBA Excel senior disponible en régie sur Martigues, Marseille, Fos-sur-Mer, Vitrolles, Aix-en-Provence, Istres, Port-de-Bouc et toute la région PACA."
          },
          "knowsAbout": ["VBA", "Excel", "Power Query", "Access", "SQL", "Automatisation", "Algorithmes de contrôle", "Reporting"]
        })}} />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-TKT4NR5C8T"></script>
        <script dangerouslySetInnerHTML={{__html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-TKT4NR5C8T');
        `}} />
      </head>
      <body>{children}</body>
    </html>
  )
}
