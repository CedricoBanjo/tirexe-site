// Carte d'un article du blog (accueil, page du blog, « À lire aussi », pages services)
import Link from 'next/link'
import Fleche from './Fleche'
import { formatDate } from '../lib/dates'
import { typo } from '../lib/typo'

export default function CarteArticle({ article, niveau = 'h3', une = false }) {
  const Titre = niveau
  return (
    <Link href={`/blog/${article.slug}`} className={`carte-article lumiere${une ? ' carte-article-une' : ''}`}>
      {une && <span className="carte-article-badge">Dernier article</span>}
      <span className="carte-article-date"><time dateTime={article.date}>{formatDate(article.date)}</time></span>
      <Titre className="carte-article-titre">{typo(article.title || '')}</Titre>
      <span className="carte-article-desc">{typo(article.description || '')}</span>
      <span className="carte-article-plus">Lire l&apos;article <Fleche /></span>
    </Link>
  )
}
