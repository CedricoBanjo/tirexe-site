import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import { EMAIL } from '../../lib/site'
import { metadonneesPage } from '../../lib/seo'

export const metadata = metadonneesPage({
  titre: 'Mentions légales · Tirexe',
  description: 'Mentions légales du site tirexe.com — Cédric Femminino, consultant VBA Excel senior.',
  chemin: '/mentions-legales',
})

const Mail = () => <a href={`mailto:${EMAIL}`}>{EMAIL}</a>

export default function MentionsLegales() {
  return (
    <>
      <Nav />
      <main id="contenu">
        <header className="page-tete">
          <div className="wrap">
            <p className="ey">Informations légales</p>
            <h1 className="page-titre">Mentions légales</h1>
          </div>
        </header>

        <div className="section section-serree">
          <div className="wrap legal">
            <section className="legal-carte" aria-labelledby="editeur">
              <h2 id="editeur">Éditeur du site</h2>
              <p>
                <strong>Cédric Femminino</strong><br />
                Consultant &amp; Développeur VBA Excel Senior<br />
                Entreprise individuelle — régime BNC<br />
                SIREN&nbsp;: 883 193 054<br />
                Martigues, Provence-Alpes-Côte d&apos;Azur, France
              </p>
              <p>
                <strong>Email&nbsp;:</strong> <Mail /><br />
                <strong>Site&nbsp;:</strong> <a href="https://tirexe.com">tirexe.com</a>
              </p>
            </section>

            <section className="legal-carte" aria-labelledby="hebergement">
              <h2 id="hebergement">Hébergement</h2>
              <p>
                <strong>Vercel Inc.</strong><br />
                440 N Barranca Ave #4133<br />
                Covina, CA 91723, États-Unis
              </p>
              <p><a href="https://vercel.com" target="_blank" rel="noreferrer">vercel.com</a></p>
            </section>

            <section className="legal-carte" aria-labelledby="propriete">
              <h2 id="propriete">Propriété intellectuelle</h2>
              <p>L&apos;ensemble du contenu de ce site — textes, structure, logo, visuels — est la propriété exclusive de Cédric Femminino. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite et constitue une contrefaçon sanctionnée par le Code de la propriété intellectuelle.</p>
            </section>

            <section id="donnees-personnelles" className="legal-carte" aria-labelledby="rgpd">
              <h2 id="rgpd">Données personnelles (RGPD)</h2>
              <p><strong>Responsable&nbsp;:</strong> Cédric Femminino (Tirexe), <Mail />.</p>
              <p><strong>Formulaire de contact.</strong> Les informations que vous saisissez (besoin, délai souhaité, nom, société, e-mail, message) servent uniquement à répondre à votre demande et à échanger sur une éventuelle mission, à votre initiative. Elles ne sont ni vendues ni cédées.</p>
              <p>Le formulaire passe par le service Formspree (Formspree, Inc., États-Unis), qui me transmet votre message par e-mail et en garde une copie dans mon espace Formspree. Vos données sont donc traitées aux États-Unis.</p>
              <p><strong>Durée de conservation&nbsp;:</strong> 3 ans après notre dernier échange, puis suppression.</p>
              <p><strong>Hébergement&nbsp;:</strong> l&apos;hébergeur Vercel enregistre des journaux techniques (dont l&apos;adresse IP) pour la sécurité et le bon fonctionnement du site.</p>
              <p><strong>Vos droits&nbsp;:</strong> vous pouvez demander l&apos;accès à vos données, leur rectification, leur effacement, leur portabilité, ou vous opposer à leur traitement, en écrivant à <Mail />. Vous pouvez aussi adresser une réclamation à la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noreferrer">cnil.fr</a>).</p>
            </section>

            <section id="cookies" className="legal-carte" aria-labelledby="titre-cookies">
              <h2 id="titre-cookies">Cookies</h2>
              <p>Ce site ne dépose aucun cookie et n&apos;utilise aucun outil de mesure d&apos;audience ni de publicité&nbsp;: aucun suivi de votre navigation.</p>
              <p>Les polices de caractères sont hébergées par le site lui-même&nbsp;: leur affichage ne fait appel à aucun service tiers.</p>
            </section>

            <section className="legal-carte" aria-labelledby="responsabilite">
              <h2 id="responsabilite">Responsabilité</h2>
              <p>Cédric Femminino s&apos;efforce de maintenir les informations publiées sur ce site aussi précises et à jour que possible. Toutefois, il ne saurait être tenu responsable des omissions, inexactitudes ou carences dans la mise à jour des informations. Les liens hypertextes pointant vers d&apos;autres sites ne sauraient engager la responsabilité de l&apos;éditeur.</p>
            </section>

            <section className="legal-carte" aria-labelledby="droit">
              <h2 id="droit">Droit applicable</h2>
              <p>Le présent site et ses mentions légales sont soumis au droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
