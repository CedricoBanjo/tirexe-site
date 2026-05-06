import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Mentions légales · Tirexe',
}

export default function MentionsLegales() {
  return (
    <>
      <Nav />
      <main style={{paddingTop:'68px'}}>
        <div className="section">
          <div className="wrap" style={{maxWidth:'720px'}}>
            <div className="ey">Mentions légales</div>
            <div className="sec-h" style={{marginBottom:'48px'}}>Informations légales</div>

            <div style={{display:'flex',flexDirection:'column',gap:'36px',fontSize:'14px',color:'var(--ink3)',lineHeight:'1.8'}}>

              <div>
                <h2 style={{fontSize:'16px',fontWeight:800,color:'var(--ink)',marginBottom:'12px'}}>Éditeur du site</h2>
                <p>Cédric Femminino<br/>
                Entreprise individuelle — BNC<br/>
                SIREN : 883 193 054<br/>
                Martigues, Provence-Alpes-Côte d'Azur, France<br/>
                Email : cedric@tirexe.com</p>
              </div>

              <div>
                <h2 style={{fontSize:'16px',fontWeight:800,color:'var(--ink)',marginBottom:'12px'}}>Hébergement</h2>
                <p>Vercel Inc.<br/>
                440 N Barranca Ave #4133<br/>
                Covina, CA 91723, États-Unis<br/>
                <a href="https://vercel.com" style={{color:'var(--g-d)'}}>vercel.com</a></p>
              </div>

              <div>
                <h2 style={{fontSize:'16px',fontWeight:800,color:'var(--ink)',marginBottom:'12px'}}>Propriété intellectuelle</h2>
                <p>L'ensemble du contenu de ce site (textes, images, logo) est la propriété exclusive de Cédric Femminino. Toute reproduction sans autorisation est interdite.</p>
              </div>

              <div>
                <h2 style={{fontSize:'16px',fontWeight:800,color:'var(--ink)',marginBottom:'12px'}}>Données personnelles</h2>
                <p>Les informations transmises via le formulaire de contact sont utilisées uniquement pour répondre à votre demande. Elles ne sont ni cédées ni revendues à des tiers. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données en contactant cedric@tirexe.com.</p>
              </div>

              <div>
                <h2 style={{fontSize:'16px',fontWeight:800,color:'var(--ink)',marginBottom:'12px'}}>Cookies</h2>
                <p>Ce site n'utilise pas de cookies de traçage ou publicitaires.</p>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
