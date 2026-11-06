import { getAllArticles, getArticleBySlug } from '../../../lib/blog'
import Nav from '../../../components/Nav'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import CopyButton from '../../../components/CopyButton'
import { LINKEDIN_URL } from '../../../lib/site'
import { SITE_URL, ID_CEDRIC, ID_TIREXE, jsonLd } from '../../../lib/seo'

// Les articles sont générés en pages statiques au moment de la construction du site
// (le robot du blog pousse sur main, ce qui relance la construction sur Vercel).
export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map(a => ({ slug: a.slug }))
}

// Une adresse d'article inconnue renvoie la page 404 (et non une page vide en « 200 »)
export const dynamicParams = false

// Titre de l'onglet et de Google : « Titre · Tirexe » s'il tient en 60 caractères, sinon le titre seul
function titrePage(titre) {
  const complet = `${titre} · Tirexe`
  return complet.length <= 60 ? complet : titre
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  // L'image de partage de chaque article est créée par opengraph-image.jsx (même dossier)
  return {
    title: titrePage(article.title),
    description: article.description,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `/blog/${article.slug}`,
      siteName: 'Tirexe',
      locale: 'fr_FR',
      type: 'article',
      publishedTime: article.date,
      authors: ['Cédric Femminino'],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
  }
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) notFound()

  // Le robot écrit le titre en « # Titre » au début du texte : déjà affiché en haut de page, on ne le répète pas
  const corps = article.body.replace(/^\s*#\s+.*\n+/, '')

  const url = `${SITE_URL}/blog/${article.slug}`
  const donnees = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: article.title,
        description: article.description,
        datePublished: article.date,
        dateModified: article.date,
        inLanguage: 'fr-FR',
        url,
        mainEntityOfPage: url,
        image: `${url}/opengraph-image`,
        author: { '@type': 'Person', '@id': ID_CEDRIC, name: 'Cédric Femminino', url: SITE_URL, sameAs: [LINKEDIN_URL] },
        publisher: { '@type': 'Organization', '@id': ID_TIREXE, name: 'Tirexe', url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` } },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: article.title, item: url },
        ],
      },
    ],
  }

  return (
    <>
      <Nav />
      <main id="contenu" style={{paddingTop:'68px'}}>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(donnees)} />

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
                              <CopyButton code={codeStr} />
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
                  {corps}
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
                  <a href={LINKEDIN_URL} target="_blank" rel="me noopener" className="sidebar-link">Mon profil LinkedIn →</a>
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
