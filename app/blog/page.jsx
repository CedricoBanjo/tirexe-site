import { getAllArticles } from '../../lib/blog'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Blog VBA Excel · Cédric Femminino — Tirexe',
  description: 'Tutoriels, conseils et exemples concrets sur VBA Excel, automatisation, Access, Power Query — par Cédric Femminino, consultant VBA senior.',
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPage() {
  const articles = getAllArticles()

  return (
    <>
      <Nav />
      <main style={{paddingTop:'68px'}}>
        <div className="blog-hero">
          <div className="wrap">
            <div className="ey">Blog</div>
            <div className="sec-h">Tutoriels & <em>conseils VBA Excel</em></div>
            <p className="sec-sub">Cas pratiques, exemples de code, bonnes pratiques — par Cédric Femminino, consultant VBA Excel senior.</p>
          </div>
        </div>
        <div className="section">
          <div className="wrap">
            {articles.length === 0 ? (
              <p style={{color:'var(--soft)',fontSize:'15px'}}>Les premiers articles arrivent prochainement.</p>
            ) : (
              <div className="blog-grid">
                {articles.map((article, i) => (
                  <Link href={`/blog/${article.slug}`} key={i} className="blog-card">
                    <div className="blog-card-date">{formatDate(article.date)}</div>
                    <div className="blog-card-title">{article.title}</div>
                    <div className="blog-card-desc">{article.description}</div>
                    <div className="blog-card-cta">Lire l&apos;article →</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
