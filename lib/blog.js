import fs from 'fs'
import path from 'path'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/m)
  if (!match) return { data: {}, body: content }
  
  const data = {}
  match[1].split('\n').forEach(line => {
    const [key, ...val] = line.split(': ')
    if (key && val.length) {
      data[key.trim()] = val.join(': ').trim().replace(/^"|"$/g, '')
    }
  })
  return { data, body: match[2] }
}

export function getAllArticles() {
  if (!fs.existsSync(BLOG_DIR)) return []
  
  return fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.md'))
    .map(filename => {
      const content = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8')
      const { data } = parseFrontmatter(content)
      return { ...data, filename }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getArticleBySlug(slug) {
  if (!fs.existsSync(BLOG_DIR)) return null
  
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))
  const file = files.find(f => {
    const content = fs.readFileSync(path.join(BLOG_DIR, f), 'utf8')
    const { data } = parseFrontmatter(content)
    return data.slug === slug
  })
  
  if (!file) return null
  
  const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8')
  const { data, body } = parseFrontmatter(content)
  return { ...data, body }
}
