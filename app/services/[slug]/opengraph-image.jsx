// Image de partage de chaque page service, créée à la construction du site (dessin commun : lib/image-partage.jsx).
import { SERVICES, getService } from '../../../lib/services'
import { imagePartage } from '../../../lib/image-partage'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Service de Cédric Femminino, consultant VBA Excel senior'

export async function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }))
}

export default async function Image({ params }) {
  const { slug } = await params
  const service = getService(slug)
  return imagePartage({ titre: service?.titre || 'Consultant VBA Excel', etiquette: `Service · ${service?.etiquette || 'VBA Excel'}` })
}
