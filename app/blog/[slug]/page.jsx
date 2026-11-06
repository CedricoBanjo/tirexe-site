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
import { serviceDeLArticle } from '../../../lib/services'
import { articlesProches, tempsDeLecture } from '../../../lib/maillage'

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
      modifiedTime: article.updated || article.date,
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

// Texte brut d'un élément de l'article (bloc de code)
function texteDe(noeud) {
  if (!noeud) return ''
  if (noeud.type === 'text') return noeud.value
  return (noeud.children || []).map(texteDe).join('')
}

// Étiquette d'un bloc de code : VBA (```vba ou code VBA reconnu), formules Excel, sinon « Code »
function etiquetteCode(texte, langage) {
  if (langage === 'vba' || /^\s*(Option Explicit|Sub |Function |Private |Public |Dim )/m.test(texte)) return 'VBA'
  if (/=\s*[A-Z][A-Z.]*\(/.test(texte)) return 'Formules Excel'
  return langage ? langage.toUpperCase() : 'Code'
}

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) notFound()

  // Le robot écrit le titre en « # Titre » au début du texte : déjà affiché en haut de page, on ne le répète pas
  const corps = article.body.replace(/^\s*#\s+.*\n+/, '')
  const minutes = tempsDeLecture(corps)
  // Le service lié à l'article et 3 articles proches, pour aller plus loin
  const service = serviceDeLArticle(article)
  const proches = articlesProches(article)

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
        dateModified: article.updated || article.date,
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
      <main id="contenu">
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(donnees)} />

        <div className="article-hero">
          <div className="wrap">
            <Link href="/blog" className="article-back">← Tous les articles</Link>
            <div className="article-date">
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              {article.updated && article.updated !== article.date && (
                <> · mis à jour le <time dateTime={article.updated}>{formatDate(article.updated)}</time></>
              )}
              {' '}· {minutes} min de lecture
            </div>
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
                    // Bloc de code (entre ```) : une ligne seule (une formule) tient dans une barre compacte
                    // qui défile au lieu d'élargir la page ; plusieurs lignes ont un en-tête avec leur langage.
                    pre({ node }) {
                      const code = node?.children?.find(c => c.tagName === 'code')
                      const texte = texteDe(code || node).replace(/\n$/, '')
                      const langage = [].concat(code?.properties?.className || []).map(String)
                        .find(c => c.startsWith('language-'))?.slice('language-'.length)
                      if (!texte.includes('\n')) {
                        return (
                          <div className="code-ligne">
                            <pre><code>{texte}</code></pre>
                            <CopyButton code={texte} />
                          </div>
                        )
                      }
                      return (
                        <div className="code-block">
                          <div className="code-header">
                            <span className="code-lang">{etiquetteCode(texte, langage)}</span>
                            <CopyButton code={texte} />
                          </div>
                          <pre><code>{texte}</code></pre>
                        </div>
                      )
                    },
                    // Code dans une phrase (entre `)
                    code({ node, className, children, ...props }) {
                      return <code className="inline-code" {...props}>{children}</code>
                    },
                    // Un tableau large défile dans son cadre au lieu d'élargir la page sur téléphone
                    table: ({ children }) => <div className="table-defile"><table>{children}</table></div>,
                    h1: ({ children }) => <h2>{children}</h2>,
                    h2: ({ children }) => <h2>{children}</h2>,
                    h3: ({ children }) => <h3>{children}</h3>,
                  }}
                >
                  {corps}
                </ReactMarkdown>

                {/* Encadré auteur : visible aussi sur téléphone (la colonne de droite y est masquée) */}
                <aside className="auteur" aria-label="À propos de l'auteur">
                  <div className="auteur-ini" aria-hidden="true">CF</div>
                  <div>
                    <p className="auteur-nom">Cédric Femminino</p>
                    <p className="auteur-bio">
                      Consultant et développeur VBA Excel senior, plus de 10 ans d&apos;expérience sur des projets
                      industriels et financiers. Missions en régie, en région PACA ou à distance.
                    </p>
                    <p className="auteur-liens">
                      <a href={`/services/${service.slug}`}>Mon service&nbsp;: {service.titreCarte}</a>
                      <a href={LINKEDIN_URL} target="_blank" rel="me noopener">LinkedIn</a>
                    </p>
                  </div>
                </aside>
              </article>

              <aside className="article-sidebar">
                <div className="sidebar-card">
                  <div className="sidebar-title">Besoin d&apos;un expert VBA ?</div>
                  <p className="sidebar-desc">Je travaille en régie sur des missions longues — en PACA ou full remote.</p>
                  <Link href="/#contact" className="sidebar-cta">Me contacter</Link>
                </div>
                <div className="sidebar-card" style={{marginTop:'16px'}}>
                  <div className="sidebar-title">Sur ce sujet</div>
                  <p className="sidebar-desc">{service.titreCarte}&nbsp;: ce que je fais pour vous, et comment se passe une mission.</p>
                  <a href={`/services/${service.slug}`} className="sidebar-link">Découvrir ce service →</a>
                </div>
              </aside>
            </div>
          </div>
        </div>

        {proches.length > 0 && (
          <div className="section section-alt">
            <div className="wrap">
              <div className="ey">Blog</div>
              <h2 className="sec-h">À lire <em>aussi</em></h2>
              <div className="blog-grid">
                {proches.map(a => (
                  <Link href={`/blog/${a.slug}`} key={a.slug} className="blog-card">
                    <div className="blog-card-date">{formatDate(a.date)}</div>
                    <h3 className="blog-card-title">{a.title}</h3>
                    <p className="blog-card-desc">{a.description}</p>
                    <div className="blog-card-cta">Lire l&apos;article →</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

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
