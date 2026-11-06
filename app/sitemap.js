// Plan du site pour Google, recréé à chaque mise en ligne (donc à chaque nouvel article).
// Les dates sont réelles : la dernière modification de chaque page.
import { getAllArticles } from '../lib/blog'
import { SERVICES } from '../lib/services'
import { SITE_URL } from '../lib/seo'

const MAJ_MENTIONS_LEGALES = '2026-11-06'
// Dernière modification de l'accueil (hors nouveaux articles) et des pages services
const MAJ_ACCUEIL = '2026-11-06'
const MAJ_SERVICES = '2026-11-06'

// La plus récente de plusieurs dates « AAAA-MM-JJ »
const plusRecente = (...dates) => dates.filter(Boolean).sort().at(-1)

export default function sitemap() {
  const articles = getAllArticles()
  const dernierArticle = articles[0]?.date

  return [
    { url: SITE_URL, lastModified: plusRecente(dernierArticle, MAJ_ACCUEIL) },
    ...SERVICES.map(s => ({ url: `${SITE_URL}/services/${s.slug}`, lastModified: MAJ_SERVICES })),
    { url: `${SITE_URL}/blog`, lastModified: plusRecente(...articles.map(a => a.updated || a.date)) || MAJ_ACCUEIL },
    { url: `${SITE_URL}/mentions-legales`, lastModified: MAJ_MENTIONS_LEGALES },
    ...articles.map(article => ({
      url: `${SITE_URL}/blog/${article.slug}`,
      lastModified: article.updated || article.date,
    })),
  ]
}
