import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Fleche from '../components/Fleche'

export const metadata = {
  title: 'Page introuvable · Tirexe',
  robots: { index: false },
}

export default function PageIntrouvable() {
  return (
    <>
      <Nav />
      <main id="contenu">
        <header className="page-tete page-404">
          <div className="wrap">
            <p className="ey">Erreur 404</p>
            <h1 className="page-titre">Cette page n&apos;existe pas</h1>
            <p className="page-sous">Le lien est peut-être ancien, ou l&apos;adresse contient une faute de frappe.</p>
            <div className="page-boutons">
              <a href="/" className="btn btn-principal btn-grand">Retour à l&apos;accueil <Fleche /></a>
              <a href="/blog" className="btn btn-second btn-grand">Lire les articles</a>
            </div>
            <p className="page-note">
              Vous cherchiez à me joindre&nbsp;? <a href="/#contact" className="lien-txt">Écrivez-moi ici</a>.
            </p>
          </div>
        </header>
      </main>
      <Footer />
    </>
  )
}
