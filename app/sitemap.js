// Plan du site pour Google, recréé à chaque mise en ligne (donc à chaque nouvel article).
// Les dates sont réelles : celle du dernier article pour l'accueil et le blog,
// celle de la dernière mise à jour pour les mentions légales.
import { getAllArticles } from '../lib/blog'
import { SITE_URL } from '../lib/seo'

const MAJ_MENTIONS_LEGALES = '2026-11-06'

export default function sitemap() {
  const articles = getAllArticles()
  const dernierArticle = articles[0]?.date || MAJ_MENTIONS_LEGALES

  return [
    { url: SITE_URL, lastModified: dernierArticle },
    { url: `${SITE_URL}/blog`, lastModified: dernierArticle },
    { url: `${SITE_URL}/mentions-legales`, lastModified: MAJ_MENTIONS_LEGALES },
    ...articles.map(article => ({
      url: `${SITE_URL}/blog/${article.slug}`,
      lastModified: article.date,
    })),
  ]
}
