// Liens entre les pages : articles proches d'un article, articles d'un service, temps de lecture.
// Tout est calculé à la construction du site : rien à faire quand le robot publie un article.
import { getAllArticles } from './blog'
import { serviceDeLArticle } from './services'

// Mots trop courants pour dire que deux articles parlent de la même chose
const MOTS_VIDES = new Set(['excel', 'comment', 'guide', 'complet', 'bonnes', 'pratiques', 'pourquoi', 'quand', 'utiliser', 'lequel', 'choisir', 'avec', 'dans', 'pour', 'vos', 'votre', 'des', 'les', 'une', 'sans', 'tout', 'cas', 'avances', 'avancee', 'fonction', 'formule', 'formules', 'nouvelle', 'creer'])

function motsDe(article) {
  return new Set((article.slug || '').split('-').filter(m => m.length > 2 && !MOTS_VIDES.has(m)))
}

// Les 3 articles les plus proches : mots communs dans l'adresse, puis même service, puis les plus récents
export function articlesProches(article, nombre = 3) {
  const mots = motsDe(article)
  const service = serviceDeLArticle(article).slug
  return getAllArticles()
    .filter(a => a.slug && a.slug !== article.slug)
    .map((a, rang) => {
      const communs = [...motsDe(a)].filter(m => mots.has(m)).length
      const memeService = serviceDeLArticle(a).slug === service ? 1 : 0
      return { a, score: communs * 2 + memeService, rang }
    })
    .sort((x, y) => y.score - x.score || x.rang - y.rang)
    .slice(0, nombre)
    .map(x => x.a)
}

// Les articles rattachés à un service, les plus récents d'abord
export function articlesDuService(slugService, nombre = 3) {
  return getAllArticles()
    .filter(a => a.slug && serviceDeLArticle(a).slug === slugService)
    .slice(0, nombre)
}

// Temps de lecture en minutes (environ 200 mots par minute pour un texte technique)
export function tempsDeLecture(texte) {
  const mots = texte.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(mots / 200))
}
