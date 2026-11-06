// Image de partage de chaque article (LinkedIn, e-mail, réseaux sociaux), créée à la
// construction du site à partir du titre (dessin commun : lib/image-partage.jsx).
import { getAllArticles, getArticleBySlug } from '../../../lib/blog'
import { imagePartage } from '../../../lib/image-partage'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Article du blog de Cédric Femminino, consultant VBA Excel senior'

export async function generateStaticParams() {
  return getAllArticles().map(a => ({ slug: a.slug }))
}

export default async function Image({ params }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  return imagePartage({ titre: article?.title || 'Blog VBA Excel', etiquette: 'Blog · VBA Excel' })
}
