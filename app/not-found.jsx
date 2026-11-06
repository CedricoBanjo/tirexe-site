import Nav from '../components/Nav'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Page introuvable · Tirexe',
  robots: { index: false },
}

export default function PageIntrouvable() {
  return (
    <>
      <Nav />
      <main id="contenu">
        <div className="section">
          <div className="wrap" style={{maxWidth:'720px',textAlign:'center'}}>
            <div className="ey" style={{justifyContent:'center'}}>Erreur 404</div>
            <h1 className="sec-h">Cette page n&apos;existe pas</h1>
            <p className="sec-sub" style={{margin:'14px auto 0'}}>
              Le lien est peut-être ancien, ou l&apos;adresse contient une faute de frappe.
            </p>
            <div className="hero-btns" style={{marginTop:'36px',marginBottom:'0',flexWrap:'wrap'}}>
              <a href="/" className="btn-g">Retour à l&apos;accueil</a>
              <a href="/blog" className="btn-ghost">Lire les articles</a>
            </div>
            <p className="sec-sub" style={{margin:'32px auto 0'}}>
              Vous cherchiez à me joindre ? <a href="/#contact" className="lien-txt">Écrivez-moi ici</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
