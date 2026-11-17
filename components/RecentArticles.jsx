import { getAllArticles } from '../lib/blog'
import CarteArticle from './CarteArticle'
import Fleche from './Fleche'

// Les 3 derniers articles du blog (le robot en publie un chaque lundi)
export default function RecentArticles() {
  const articles = getAllArticles().slice(0, 3)
  if (articles.length === 0) return null

  return (
    <section className="section" id="blog">
      <div className="wrap">
        <header className="sec-tete sec-tete-ligne revele">
          <div>
            <p className="ey">Blog</p>
            <h2 className="sec-h">Derniers articles</h2>
            <p className="sec-sub">Tutoriels VBA Excel, bonnes pratiques et conseils pour vos projets.</p>
          </div>
          <a href="/blog" className="btn btn-second">Tous les articles <Fleche /></a>
        </header>
        <ul className="articles-grille">
          {articles.map((article, i) => (
            <li key={article.slug} className="revele" style={{ '--d': i }}><CarteArticle article={article} /></li>
          ))}
        </ul>
      </div>
    </section>
  )
}
