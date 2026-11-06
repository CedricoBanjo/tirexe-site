// Réglages communs de référencement : adresse du site, image de partage par défaut,
// et métadonnées complètes d'une page (adresse de référence, partage réseaux sociaux).
import { EMAIL, LINKEDIN_URL } from './site'

export const SITE_URL = 'https://tirexe.com'

export const IMAGE_PARTAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'Cédric Femminino, consultant et développeur VBA Excel senior',
}

export function metadonneesPage({ titre, description, chemin, type = 'website' }) {
  return {
    title: titre,
    description,
    alternates: { canonical: chemin },
    openGraph: {
      title: titre,
      description,
      url: chemin,
      siteName: 'Tirexe',
      locale: 'fr_FR',
      type,
      images: [IMAGE_PARTAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: titre,
      description,
      images: [IMAGE_PARTAGE.url],
    },
  }
}

// Villes citées sur le site comme zone d'intervention
const VILLES = ['Martigues', 'Marseille', 'Aix-en-Provence', 'Fos-sur-Mer', 'Vitrolles', 'Istres', 'Port-de-Bouc', 'Salon-de-Provence']
const COMPETENCES = ['VBA', 'Excel', 'Power Query', 'Access', 'SQL', 'Automatisation', 'Algorithmes de contrôle', 'Reporting']
const ADRESSE = { '@type': 'PostalAddress', addressLocality: 'Martigues', addressRegion: "Provence-Alpes-Côte d'Azur", addressCountry: 'FR' }

export const ID_TIREXE = `${SITE_URL}/#tirexe`
export const ID_CEDRIC = `${SITE_URL}/#cedric`

// Données structurées du site (lues par Google) : l'activité, la personne, le site.
export const DONNEES_SITE = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': ID_TIREXE,
      name: 'Tirexe',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      image: `${SITE_URL}/og-image.png`,
      description: 'Consultant et développeur VBA Excel senior : outils métier sur mesure, automatisation de reporting, algorithmes de contrôle, Power Query, Access et SQL. Missions en régie, à la journée.',
      email: EMAIL,
      address: ADRESSE,
      areaServed: [
        ...VILLES.map(name => ({ '@type': 'City', name })),
        { '@type': 'AdministrativeArea', name: "Provence-Alpes-Côte d'Azur" },
        { '@type': 'Country', name: 'France' },
      ],
      founder: { '@id': ID_CEDRIC },
      knowsAbout: COMPETENCES,
      sameAs: [LINKEDIN_URL],
    },
    {
      '@type': 'Person',
      '@id': ID_CEDRIC,
      name: 'Cédric Femminino',
      jobTitle: 'Consultant & Développeur VBA Excel Senior',
      url: SITE_URL,
      email: EMAIL,
      address: ADRESSE,
      worksFor: { '@id': ID_TIREXE },
      knowsAbout: COMPETENCES,
      sameAs: [LINKEDIN_URL],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#site`,
      url: SITE_URL,
      name: 'Tirexe',
      inLanguage: 'fr-FR',
      publisher: { '@id': ID_TIREXE },
    },
  ],
}

// Insère des données structurées dans une page, sans risque d'injection HTML
export function jsonLd(donnees) {
  return { __html: JSON.stringify(donnees).replace(/</g, '\\u003c') }
}
