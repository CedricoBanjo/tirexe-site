import { getAllArticles, getArticleBySlug } from '../../../lib/blog'
import Nav from '../../../components/Nav'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import CopyButton from '../../../components/CopyButton'
import CarteArticle from '../../../components/CarteArticle'
import Fleche from '../../../components/Fleche'
import { LINKEDIN_URL } from '../../../lib/site'
import { SITE_URL, ID_CEDRIC, ID_TIREXE, jsonLd } from '../../../lib/seo'
import { serviceDeLArticle } from '../../../lib/services'
import { articlesProches, tempsDeLecture } from '../../../lib/maillage'
import { formatDate } from '../../../lib/dates'
import { colorerVBA, colorerFormule } from '../../../lib/coloration'
import { typo, typoEnfants } from '../../../lib/typo'

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

// Texte brut d'un élément de l'article (bloc de code, intertitre)
function texteDe(noeud) {
  if (!noeud) return ''
  if (noeud.type === 'text') return noeud.value
  return (noeud.children || []).map(texteDe).join('')
}

// Étiquette d'un bloc de code : VBA (```vba ou code VBA reconnu), formules Excel, sinon « Code »
function etiquetteCode(texte, langage) {
  if (langage === 'vba' || langage === 'vb' || /^\s*(Option Explicit|Sub |Function |Private |Public |Dim )/m.test(texte)) return 'VBA'
  if (/=\s*[A-Z][A-Z.]*\(/.test(texte)) return 'Formules Excel'
  return langage ? langage.toUpperCase() : 'Code'
}
const colorer = (texte, etiquette) => etiquette === 'VBA' ? colorerVBA(texte) : etiquette === 'Formules Excel' ? colorerFormule(texte) : texte

// Ancre d'un intertitre : « Pourquoi automatiser ? » devient « pourquoi-automatiser »
function ancre(texte) {
  return texte.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 64) || 'partie'
}
// Les mêmes ancres, dans l'ordre, pour le sommaire et pour les intertitres (une ancre déjà prise reçoit -2, -3…)
function fabriqueAncres() {
  const vues = new Map()
  return (texte) => {
    const base = ancre(texte), n = (vues.get(base) || 0) + 1
    vues.set(base, n)
    return n === 1 ? base : `${base}-${n}`
  }
}
// Les intertitres de l'article (« # » et « ## », hors blocs de code), en texte brut
function intertitres(corps) {
  const sansCode = corps.replace(/^```[\s\S]*?^```/gm, '')
  const nouvelleAncre = fabriqueAncres()
  return [...sansCode.matchAll(/^#{1,2}[ \t]+(.+?)[ \t#]*$/gm)].map(([, md]) => {
    const texte = md.replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[*`]/g, '').trim()
    return { texte, id: nouvelleAncre(texte) }
  })
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
  const sommaire = intertitres(corps)
  const ancreSuivante = fabriqueAncres()

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

  const listeSommaire = (
    <ol>
      {sommaire.map(({ texte, id }) => <li key={id}><a href={`#${id}`}>{typo(texte)}</a></li>)}
    </ol>
  )
  const intertitre = ({ node, children }) => <h2 id={ancreSuivante(texteDe(node).trim())}>{typoEnfants(children)}</h2>

  return (
    <>
      <Nav />
      <main id="contenu">
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(donnees)} />

        <header className="page-tete">
          <div className="wrap">
            <nav className="ariane" aria-label="Fil d'Ariane">
              <Link href="/">Accueil</Link><span aria-hidden="true">/</span><Link href="/blog">Blog</Link>
            </nav>
            <p className="article-meta">
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              {article.updated && article.updated !== article.date && (
                <> · mis à jour le <time dateTime={article.updated}>{formatDate(article.updated)}</time></>
              )}
              {' '}· {minutes} min de lecture
            </p>
            <h1 className="page-titre article-titre">{typo(article.title)}</h1>
            <p className="article-auteur">
              <span className="avatar" aria-hidden="true">CF</span>
              <span>Par <strong>Cédric Femminino</strong>, consultant VBA Excel senior</span>
            </p>
          </div>
        </header>

        <div className="section section-serree">
          <div className="wrap article-grille">
            <article className="article-corps">
              {sommaire.length >= 3 && (
                <details className="sommaire-mobile">
                  <summary>Sommaire</summary>
                  {listeSommaire}
                </details>
              )}
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // Bloc de code (entre ```) : une ligne seule (une formule) tient dans une barre compacte
                  // qui défile au lieu d'élargir la page ; plusieurs lignes ont un en-tête avec leur langage.
                  // Le code VBA et les formules sont colorés à la construction du site.
                  pre({ node }) {
                    const code = node?.children?.find(c => c.tagName === 'code')
                    const texte = texteDe(code || node).replace(/\n$/, '')
                    const langage = [].concat(code?.properties?.className || []).map(String)
                      .find(c => c.startsWith('language-'))?.slice('language-'.length)
                    const etiquette = etiquetteCode(texte, langage)
                    if (!texte.includes('\n')) {
                      return (
                        <div className="code-ligne">
                          <pre tabIndex={0}><code>{colorer(texte, texte.trim().startsWith('=') ? 'Formules Excel' : etiquette)}</code></pre>
                          <CopyButton code={texte} />
                        </div>
                      )
                    }
                    return (
                      <div className="code-bloc">
                        <div className="code-tete">
                          <span className="code-langue">{etiquette}</span>
                          <CopyButton code={texte} />
                        </div>
                        <pre tabIndex={0}><code>{colorer(texte, etiquette)}</code></pre>
                      </div>
                    )
                  },
                  // Code dans une phrase (entre `)
                  code({ node, className, children, ...props }) {
                    return <code className="inline-code" {...props}>{children}</code>
                  },
                  // Un tableau large défile dans son cadre au lieu d'élargir la page sur téléphone
                  table: ({ children }) => <div className="table-defile"><table>{children}</table></div>,
                  h1: intertitre,
                  h2: intertitre,
                  h3: ({ children }) => <h3>{typoEnfants(children)}</h3>,
                  // espaces insécables avant « : ; ! ? » dans le texte des articles
                  p: ({ node, children, ...props }) => <p {...props}>{typoEnfants(children)}</p>,
                  li: ({ node, children, ...props }) => <li {...props}>{typoEnfants(children)}</li>,
                  td: ({ node, children, ...props }) => <td {...props}>{typoEnfants(children)}</td>,
                }}
              >
                {corps}
              </ReactMarkdown>

              {/* Encadré auteur */}
              <aside className="auteur" aria-label="À propos de l'auteur">
                <span className="avatar" aria-hidden="true">CF</span>
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

            <aside className="article-cote" aria-label="Sommaire et contact">
              {sommaire.length >= 3 && (
                <nav className="sommaire" aria-label="Sommaire de l'article">
                  <p className="sommaire-titre">Sommaire</p>
                  {listeSommaire}
                </nav>
              )}
              <div className="cote-carte">
                <p className="cote-titre">Besoin d&apos;un expert VBA&nbsp;?</p>
                <p className="cote-texte">{service.titreCarte}&nbsp;: je travaille en régie, sur des missions longues, en PACA ou à distance.</p>
                <a href={`/?besoin=${service.slug}#contact`} className="btn btn-principal">Parler de votre projet <Fleche /></a>
              </div>
            </aside>
          </div>
        </div>

        {proches.length > 0 && (
          <section className="section section-douce" aria-labelledby="a-lire-aussi">
            <div className="wrap">
              <header className="sec-tete revele">
                <p className="ey">Blog</p>
                <h2 className="sec-h" id="a-lire-aussi">À lire aussi</h2>
              </header>
              <ul className="articles-grille">
                {proches.map((a, i) => <li key={a.slug} className="revele" style={{ '--d': i }}><CarteArticle article={a} /></li>)}
              </ul>
            </div>
          </section>
        )}

        <section className="bande-cta" aria-labelledby="appel-final">
          <div className="wrap">
            <h2 className="bande-cta-titre" id="appel-final">Un projet Excel à automatiser&nbsp;?</h2>
            <p className="bande-cta-texte">Décrivez votre besoin en trois questions&nbsp;: je vous réponds personnellement.</p>
            <a href={`/?besoin=${service.slug}#contact`} className="btn btn-principal btn-grand">Parler de votre projet <Fleche /></a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
