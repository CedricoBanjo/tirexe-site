import { notFound } from 'next/navigation'
import Nav from '../../../components/Nav'
import Footer from '../../../components/Footer'
import TexteRiche from '../../../components/TexteRiche'
import CarteArticle from '../../../components/CarteArticle'
import Fleche from '../../../components/Fleche'
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

        <header className="page-tete">
          <div className="wrap">
            <nav className="ariane" aria-label="Fil d'Ariane">
              <a href="/">Accueil</a><span aria-hidden="true">/</span><a href="/#expertises">Expertises</a>
            </nav>
            <p className="ey">{service.etiquette}</p>
            <h1 className="page-titre">{service.titre}</h1>
            <p className="service-accroche">{typo(service.accroche)}</p>
            <div className="page-boutons">
              <a href={`/?besoin=${service.slug}#contact`} className="btn btn-principal btn-grand">Parler de ce besoin <Fleche /></a>
              <a href="/#faq" className="btn btn-second btn-grand">Questions fréquentes</a>
            </div>
          </div>
        </header>

        <div className="section section-serree">
          <div className="wrap service-grille">
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

            <aside className="article-cote" aria-label="Contact">
              <div className="cote-carte">
                <p className="cote-titre">Un besoin de ce type&nbsp;?</p>
                <p className="cote-texte">Trois questions, moins d&apos;une minute&nbsp;: je vous réponds personnellement. Tarif sur devis.</p>
                <a href={`/?besoin=${service.slug}#contact`} className="btn btn-principal">Parler de votre projet <Fleche /></a>
              </div>
            </aside>
          </div>
        </div>

        {articles.length > 0 && (
          <section className="section section-douce" aria-labelledby="articles-sujet">
            <div className="wrap">
              <header className="sec-tete revele">
                <p className="ey">Blog</p>
                <h2 className="sec-h" id="articles-sujet">Articles sur ce sujet</h2>
              </header>
              <ul className="articles-grille">
                {articles.map((article, i) => <li key={article.slug} className="revele" style={{ '--d': i }}><CarteArticle article={article} /></li>)}
              </ul>
            </div>
          </section>
        )}

        <section className="section" aria-labelledby="autres-expertises">
          <div className="wrap">
            <header className="sec-tete revele">
              <p className="ey">Expertises</p>
              <h2 className="sec-h" id="autres-expertises">Mes autres expertises</h2>
            </header>
            <ul className="autres-grille">
              {autres.map((s, i) => (
                <li key={s.slug} className="revele" style={{ '--d': i }}>
                  <a href={`/services/${s.slug}`} className="autre-carte lumiere">
                    <span className="autre-etiquette">{s.etiquette}</span>
                    <span className="autre-titre">{s.titreCarte}</span>
                    <span className="autre-plus">Découvrir <Fleche /></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bande-cta" aria-labelledby="appel-final">
          <div className="wrap">
            <h2 className="bande-cta-titre" id="appel-final">Un projet de ce type&nbsp;?</h2>
            <p className="bande-cta-texte">Décrivez votre besoin en trois questions&nbsp;: je vous réponds personnellement.</p>
            <a href={`/?besoin=${service.slug}#contact`} className="btn btn-principal btn-grand">Parler de votre projet <Fleche /></a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
