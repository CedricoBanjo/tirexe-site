import { getAllArticles } from '../../lib/blog'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import CarteArticle from '../../components/CarteArticle'
import { metadonneesPage } from '../../lib/seo'

export const metadata = metadonneesPage({
  titre: 'Blog VBA Excel · Cédric Femminino — Tirexe',
  description: 'Tutoriels, conseils et exemples concrets sur VBA Excel, automatisation, Access, Power Query — par Cédric Femminino, consultant VBA senior.',
  chemin: '/blog',
})

export default function BlogPage() {
  const articles = getAllArticles()

  return (
    <>
      <Nav />
      <main id="contenu">
        <header className="page-tete">
          <div className="wrap">
            <p className="ey">Blog</p>
            <h1 className="page-titre">Tutoriels &amp; conseils VBA Excel</h1>
            <p className="page-sous">Cas pratiques, exemples de code, bonnes pratiques&nbsp;: par Cédric Femminino, consultant VBA Excel senior.</p>
          </div>
        </header>
        <section className="section section-serree" aria-label="Tous les articles">
          <div className="wrap">
            {articles.length === 0 ? (
              <p className="page-sous">Les premiers articles arrivent prochainement.</p>
            ) : (
              <ul className="articles-grille">
                {articles.map((article, i) => (
                  <li key={article.slug} className={i === 0 ? 'article-une' : 'revele'} style={i ? { '--d': (i - 1) % 3 } : undefined}>
                    <CarteArticle article={article} niveau="h2" une={i === 0} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
