import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '../../../components/Nav'
import Footer from '../../../components/Footer'
import TexteRiche from '../../../components/TexteRiche'
import { typo } from '../../../lib/typo'
import { SERVICES, getService } from '../../../lib/services'
import { articlesDuService } from '../../../lib/maillage'
import { SITE_URL, ID_TIREXE, jsonLd } from '../../../lib/seo'

// Une page statique par service, créée à la construction du site
export async function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }))
}

// Une adresse de service inconnue renvoie la page 404
export const dynamicParams = false

export async function generateMetadata({ params }) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}
  // L'image de partage est créée par opengraph-image.jsx (même dossier)
  return {
    title: service.titreSeo,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.titre,
      description: service.description,
      url: `/services/${service.slug}`,
      siteName: 'Tirexe',
      locale: 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: service.titre,
      description: service.description,
    },
  }
}

const ETAPES = [
  ['Premier échange', 'On discute du besoin, du contexte et de la durée envisagée, par appel ou par e-mail, sans formalité.'],
  ['Proposition de mission', "Un devis avec le tarif, la durée et l'organisation du travail : sur site ou en remote, selon vos contraintes."],
  ['Intégration et livraison', "Je rejoins votre équipe et reste votre seul interlocuteur, du cadrage jusqu'à la livraison finale."],
]

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function PageService({ params }) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const articles = articlesDuService(service.slug)
  const autres = SERVICES.filter(s => s.slug !== service.slug)
  const url = `${SITE_URL}/services/${service.slug}`

  const donnees = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: service.titre,
        serviceType: service.titreCarte,
        description: service.description,
        url,
        provider: { '@type': 'ProfessionalService', '@id': ID_TIREXE, name: 'Tirexe', url: SITE_URL },
        areaServed: [
          { '@type': 'AdministrativeArea', name: "Provence-Alpes-Côte d'Azur" },
          { '@type': 'Country', name: 'France' },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: service.titreCarte, item: url },
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
            <a href="/#expertise" className="article-back">← Toutes les expertises</a>
            <div className="ey">{service.etiquette}</div>
            <h1 className="article-title">{service.titre}</h1>
            <p className="service-accroche">{typo(service.accroche)}</p>
            <div className="service-btns">
              <a href="/#contact" className="btn-g">Discutons de votre projet</a>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="wrap">
            <div className="service-corps">
              <h2>{service.besoin.titre}</h2>
              <p>{typo(service.besoin.intro)}</p>
              <ul>
                {service.besoin.points.map(p => <li key={p}>{typo(p)}</li>)}
              </ul>

              <h2>{service.prestations.titre}</h2>
              <ul className="service-points">
                {service.prestations.points.map(([nom, texte]) => (
                  <li key={nom}><strong>{nom}</strong>&nbsp;: {typo(texte)}</li>
                ))}
              </ul>

              <h2>{service.apport.titre}</h2>
              <p><TexteRiche texte={service.apport.texte} /></p>

              <h2>Comment se passe une mission</h2>
              <ol className="service-etapes">
                {ETAPES.map(([nom, texte]) => (
                  <li key={nom}><strong>{nom}</strong>{typo(texte)}</li>
                ))}
              </ol>
              <p>
                Basé à Martigues, j&apos;interviens sur site à Marseille, Aix-en-Provence, Fos-sur-Mer, Vitrolles, Istres
                et dans toute la région PACA, ou à distance partout en France. Tarif, durée, organisation&nbsp;: les réponses
                sont dans les <a href="/#faq" className="lien-txt">questions fréquentes</a>.
              </p>

              <h2>Les secteurs où j&apos;interviens</h2>
              <ul>
                {service.secteurs.map(([nom, texte]) => (
                  <li key={nom}><strong>{nom}</strong>&nbsp;: {typo(texte)}</li>
                ))}
              </ul>

              <h2>Les outils</h2>
              <ul>
                {service.outils.map(([nom, texte]) => (
                  <li key={nom}><strong>{nom}</strong>&nbsp;: {typo(texte)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {articles.length > 0 && (
          <div className="section section-alt">
            <div className="wrap">
              <div className="ey">Blog</div>
              <h2 className="sec-h">Articles sur ce <em>sujet</em></h2>
              <div className="blog-grid">
                {articles.map(article => (
                  <Link href={`/blog/${article.slug}`} key={article.slug} className="blog-card">
                    <div className="blog-card-date">{formatDate(article.date)}</div>
                    <h3 className="blog-card-title">{article.title}</h3>
                    <p className="blog-card-desc">{article.description}</p>
                    <div className="blog-card-cta">Lire l&apos;article →</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="section">
          <div className="wrap">
            <div className="ey">Expertise</div>
            <h2 className="sec-h">Mes autres <em>expertises</em></h2>
            <div className="autres-grid">
              {autres.map(s => (
                <a href={`/services/${s.slug}`} key={s.slug} className="autre-card">
                  <span className="exp-tag">{s.etiquette}</span>
                  <h3 className="autre-h">{s.titreCarte}</h3>
                  <span className="autre-cta">Découvrir →</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="contact-band" style={{padding:'64px 0'}}>
          <div className="wrap" style={{textAlign:'center'}}>
            <h2 className="sec-h" style={{marginBottom:'16px',color:'var(--ink)'}}>Un projet de ce type&nbsp;?</h2>
            <p style={{color:'var(--soft)',fontSize:'16px',marginBottom:'32px'}}>Décrivez votre besoin — je reviens vers vous.</p>
            <a href="/#contact" className="btn-g">Discutons de votre projet</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
