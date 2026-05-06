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
        <div className="sec-h">Derniers <em>articles</em></div>
        <p className="sec-sub">Tutoriels VBA Excel, bonnes pratiques et retours d'expérience.</p>
        <div className="blog-grid" style={{marginTop:'52px'}}>
          {articles.map((article, i) => (
            <Link href={`/blog/${article.slug}`} key={i} className="blog-card">
              <div className="blog-card-date">{formatDate(article.date)}</div>
              <div className="blog-card-title">{article.title}</div>
              <div className="blog-card-desc">{article.description}</div>
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
