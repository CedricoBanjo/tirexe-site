export const dynamic = 'force-dynamic'

import { getAllArticles } from '../lib/blog'

export default function sitemap() {
  const articles = getAllArticles()

  const articleUrls = articles.map(article => ({
    url: `https://tirexe.com/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: 'https://tirexe.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: 'https://tirexe.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://tirexe.com/mentions-legales',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...articleUrls,
  ]
}
