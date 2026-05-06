import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Mentions légales · Tirexe',
  description: 'Mentions légales du site tirexe.com — Cédric Femminino, consultant VBA Excel senior.',
}

export default function MentionsLegales() {
  return (
    <>
      <Nav />
      <main style={{paddingTop:'68px'}}>
        <div className="section">
          <div className="wrap" style={{maxWidth:'720px'}}>
            <div className="ey">Informations légales</div>
            <div className="sec-h" style={{marginBottom:'52px'}}>Mentions légales</div>

            <div style={{display:'flex',flexDirection:'column',gap:'40px',fontSize:'15px',color:'var(--ink3)',lineHeight:'1.85'}}>

              <div style={{background:'var(--bg3)',border:'1px solid var(--line)',borderRadius:'16px',padding:'32px'}}>
                <h2 style={{fontSize:'15px',fontWeight:800,color:'var(--ink)',marginBottom:'16px',letterSpacing:'-.2px'}}>Éditeur du site</h2>
                <p><strong style={{color:'var(--ink)'}}>Cédric Femminino</strong><br/>
                Consultant & Développeur VBA Excel Senior<br/>
                Entreprise individuelle — régime BNC<br/>
                SIREN : 883 193 054<br/>
                Martigues, Provence-Alpes-Côte d&apos;Azur, France<br/><br/>
                <strong style={{color:'var(--ink)'}}>Email :</strong> <a href="mailto:cedric@tirexe.com" style={{color:'var(--g-d)',fontWeight:600}}>cedric@tirexe.com</a><br/>
                <strong style={{color:'var(--ink)'}}>Site :</strong> <a href="https://tirexe.com" style={{color:'var(--g-d)',fontWeight:600}}>tirexe.com</a></p>
              </div>

              <div style={{background:'var(--bg3)',border:'1px solid var(--line)',borderRadius:'16px',padding:'32px'}}>
                <h2 style={{fontSize:'15px',fontWeight:800,color:'var(--ink)',marginBottom:'16px',letterSpacing:'-.2px'}}>Hébergement</h2>
                <p><strong style={{color:'var(--ink)'}}>Vercel Inc.</strong><br/>
                440 N Barranca Ave #4133<br/>
                Covina, CA 91723, États-Unis<br/><br/>
                <a href="https://vercel.com" style={{color:'var(--g-d)',fontWeight:600}} target="_blank" rel="noreferrer">vercel.com</a></p>
              </div>

              <div style={{background:'var(--bg3)',border:'1px solid var(--line)',borderRadius:'16px',padding:'32px'}}>
                <h2 style={{fontSize:'15px',fontWeight:800,color:'var(--ink)',marginBottom:'16px',letterSpacing:'-.2px'}}>Propriété intellectuelle</h2>
                <p>L&apos;ensemble du contenu de ce site — textes, structure, logo, visuels — est la propriété exclusive de Cédric Femminino. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite et constitue une contrefaçon sanctionnée par le Code de la propriété intellectuelle.</p>
              </div>

              <div style={{background:'var(--bg3)',border:'1px solid var(--line)',borderRadius:'16px',padding:'32px'}}>
                <h2 style={{fontSize:'15px',fontWeight:800,color:'var(--ink)',marginBottom:'16px',letterSpacing:'-.2px'}}>Données personnelles & RGPD</h2>
                <p>Les données transmises via le formulaire de contact (nom, email, société, description du besoin) sont collectées dans le seul but de répondre à votre demande. Elles ne sont ni stockées dans une base de données, ni cédées ni revendues à des tiers.<br/><br/>
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits, contactez : <a href="mailto:cedric@tirexe.com" style={{color:'var(--g-d)',fontWeight:600}}>cedric@tirexe.com</a></p>
              </div>

              <div style={{background:'var(--bg3)',border:'1px solid var(--line)',borderRadius:'16px',padding:'32px'}}>
                <h2 style={{fontSize:'15px',fontWeight:800,color:'var(--ink)',marginBottom:'16px',letterSpacing:'-.2px'}}>Cookies</h2>
                <p>Ce site ne dépose aucun cookie de traçage, publicitaire ou analytique. Aucune donnée de navigation n&apos;est collectée à des fins commerciales.</p>
              </div>

              <div style={{background:'var(--bg3)',border:'1px solid var(--line)',borderRadius:'16px',padding:'32px'}}>
                <h2 style={{fontSize:'15px',fontWeight:800,color:'var(--ink)',marginBottom:'16px',letterSpacing:'-.2px'}}>Responsabilité</h2>
                <p>Cédric Femminino s&apos;efforce de maintenir les informations publiées sur ce site aussi précises et à jour que possible. Toutefois, il ne saurait être tenu responsable des omissions, inexactitudes ou carences dans la mise à jour des informations. Les liens hypertextes pointant vers d&apos;autres sites ne sauraient engager la responsabilité de l&apos;éditeur.</p>
              </div>

              <div style={{background:'var(--bg3)',border:'1px solid var(--line)',borderRadius:'16px',padding:'32px'}}>
                <h2 style={{fontSize:'15px',fontWeight:800,color:'var(--ink)',marginBottom:'16px',letterSpacing:'-.2px'}}>Droit applicable</h2>
                <p>Le présent site et ses mentions légales sont soumis au droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.</p>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
