import { getAllArticles } from '../lib/blog'
import Link from 'next/link'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function RecentArticles() {
  const articles = getAllArticles().slice(0, 3)
  if (articles.length === 0) return null

  return (
    <div className="section" id="blog">
      <div className="wrap">
        <div className="ey">Blog</div>
        <h2 className="sec-h">Derniers <em>articles</em></h2>
        <p className="sec-sub">Tutoriels VBA Excel, bonnes pratiques et conseils pour vos projets.</p>
        <div className="blog-grid" style={{marginTop:'52px'}}>
          {articles.map(article => (
            <Link href={`/blog/${article.slug}`} key={article.slug} className="blog-card">
              <div className="blog-card-date">{formatDate(article.date)}</div>
              <h3 className="blog-card-title">{article.title}</h3>
              <p className="blog-card-desc">{article.description}</p>
              <div className="blog-card-cta">Lire l&apos;article →</div>
            </Link>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:'36px'}}>
          <Link href="/blog" className="btn-ghost">Voir tous les articles</Link>
        </div>
      </div>
    </div>
  )
}
