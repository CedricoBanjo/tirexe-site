export const dynamic = 'force-dynamic'

import fs from 'fs'
import path from 'path'

function getAllArticles() {
  const blogDir = path.join(process.cwd(), 'content', 'blog')
  if (!fs.existsSync(blogDir)) return []
  
  return fs.readdirSync(blogDir)
    .filter(f => f.endsWith('.md'))
    .map(filename => {
      const content = fs.readFileSync(path.join(blogDir, filename), 'utf8')
      const match = content.match(/^---\n([\s\S]+?)\n---/m)
      if (!match) return null
      const data = {}
      match[1].split('\n').forEach(line => {
        const [key, ...val] = line.split(': ')
        if (key && val.length) {
          data[key.trim()] = val.join(': ').trim().replace(/^"|"$/g, '')
        }
      })
      return data
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export default function sitemap() {
  const articles = getAllArticles()

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
    ...articles.map(article => ({
      url: `https://tirexe.com/blog/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
  ]
}
