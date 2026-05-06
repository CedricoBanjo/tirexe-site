import { getAllArticles, getArticleBySlug } from '../../../lib/blog'
import Nav from '../../../components/Nav'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }) {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}
  return {
    title: `${article.title} · Tirexe`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://tirexe.com/blog/${article.slug}`,
      type: 'article',
      publishedTime: article.date,
      authors: ['Cédric Femminino'],
    },
  }
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

export default function ArticlePage({ params }) {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    return (
      <>
        <Nav />
        <main style={{paddingTop:'68px',minHeight:'60vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:'48px',fontWeight:900,color:'var(--g)'}}>404</div>
            <p style={{color:'var(--soft)',marginTop:'12px'}}>Article introuvable.</p>
            <Link href="/blog" style={{color:'var(--g-d)',fontWeight:700,marginTop:'20px',display:'inline-block'}}>← Retour au blog</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Nav />
      <main style={{paddingTop:'68px'}}>

        <div className="article-hero">
          <div className="wrap">
            <Link href="/blog" className="article-back">← Tous les articles</Link>
            <div className="article-date">{formatDate(article.date)}</div>
            <h1 className="article-title">{article.title}</h1>
            <div className="article-author">Par <strong>Cédric Femminino</strong> · Consultant VBA Excel Senior</div>
          </div>
        </div>

        <div className="section">
          <div className="wrap">
            <div className="article-layout">
              <article className="article-body">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, className, children, ...props }) {
                      const codeStr = String(children).replace(/\n$/, '')
                      if (codeStr.includes('\n')) {
                        return (
                          <div className="code-block">
                            <div className="code-header">
                              <span className="code-lang">VBA</span>
                              <button
                                className="copy-btn"
                                onClick={() => navigator.clipboard.writeText(codeStr)}
                              >
                                Copier
                              </button>
                            </div>
                            <pre>
                              <code {...props}>{children}</code>
                            </pre>
                          </div>
                        )
                      }
                      return <code className="inline-code" {...props}>{children}</code>
                    },
                    h1: ({ children }) => <h2>{children}</h2>,
                    h2: ({ children }) => <h2>{children}</h2>,
                    h3: ({ children }) => <h3>{children}</h3>,
                  }}
                >
                  {article.body}
                </ReactMarkdown>
              </article>

              <aside className="article-sidebar">
                <div className="sidebar-card">
                  <div className="sidebar-title">Besoin d&apos;un expert VBA ?</div>
                  <p className="sidebar-desc">Je travaille en régie sur des missions longues — en PACA ou full remote.</p>
                  <Link href="/#contact" className="sidebar-cta">Me contacter</Link>
                </div>
                <div className="sidebar-card" style={{marginTop:'16px'}}>
                  <div className="sidebar-title">À propos</div>
                  <p className="sidebar-desc">Cédric Femminino, consultant & développeur VBA Excel senior. 10+ ans d&apos;expérience sur des projets industriels et financiers.</p>
                </div>
              </aside>
            </div>
          </div>
        </div>

        <div className="contact-band" style={{padding:'64px 0'}}>
          <div className="wrap" style={{textAlign:'center'}}>
            <div className="sec-h" style={{marginBottom:'16px',color:'var(--ink)'}}>Un projet Excel à automatiser ?</div>
            <p style={{color:'var(--soft)',fontSize:'16px',marginBottom:'32px'}}>Décrivez votre besoin — je reviens vers vous.</p>
            <Link href="/#contact" className="btn-g">Discutons de votre projet</Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
