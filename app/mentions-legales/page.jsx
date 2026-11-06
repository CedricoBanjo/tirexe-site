import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import CookieSettingsButton from '../../components/CookieSettingsButton'

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

              <div id="donnees-personnelles" className="legal-card" style={{background:'var(--bg3)',border:'1px solid var(--line)',borderRadius:'16px',padding:'32px'}}>
                <h2 style={{fontSize:'15px',fontWeight:800,color:'var(--ink)',marginBottom:'16px',letterSpacing:'-.2px'}}>Données personnelles (RGPD)</h2>
                <p><strong style={{color:'var(--ink)'}}>Responsable :</strong> Cédric Femminino (Tirexe), <a href="mailto:cedric@tirexe.com" style={{color:'var(--g-d)',fontWeight:600}}>cedric@tirexe.com</a>.<br/><br/>
                <strong style={{color:'var(--ink)'}}>Formulaire de contact.</strong> Les informations que vous saisissez (nom, société, e-mail, type de mission, besoin) servent uniquement à répondre à votre demande et à échanger sur une éventuelle mission, à votre initiative. Elles ne sont ni vendues ni cédées.<br/><br/>
                Le formulaire passe par le service Formspree (Formspree, Inc., États-Unis), qui me transmet votre message par e-mail et en garde une copie dans mon espace Formspree. Vos données sont donc traitées aux États-Unis.<br/><br/>
                <strong style={{color:'var(--ink)'}}>Durée de conservation :</strong> 3 ans après notre dernier échange, puis suppression.<br/><br/>
                <strong style={{color:'var(--ink)'}}>Hébergement :</strong> l&apos;hébergeur Vercel enregistre des journaux techniques (dont l&apos;adresse IP) pour la sécurité et le bon fonctionnement du site.<br/><br/>
                <strong style={{color:'var(--ink)'}}>Vos droits :</strong> vous pouvez demander l&apos;accès à vos données, leur rectification, leur effacement, leur portabilité, ou vous opposer à leur traitement, en écrivant à <a href="mailto:cedric@tirexe.com" style={{color:'var(--g-d)',fontWeight:600}}>cedric@tirexe.com</a>. Vous pouvez aussi adresser une réclamation à la CNIL (<a href="https://www.cnil.fr" style={{color:'var(--g-d)',fontWeight:600}} target="_blank" rel="noreferrer">cnil.fr</a>).</p>
              </div>

              <div id="cookies" className="legal-card" style={{background:'var(--bg3)',border:'1px solid var(--line)',borderRadius:'16px',padding:'32px'}}>
                <h2 style={{fontSize:'15px',fontWeight:800,color:'var(--ink)',marginBottom:'16px',letterSpacing:'-.2px'}}>Cookies et mesure d&apos;audience</h2>
                <p>Ce site utilise Google Analytics (Google Ireland Limited) pour compter les visites : pages vues, provenance des visiteurs, type d&apos;appareil. <strong style={{color:'var(--ink)'}}>Il n&apos;est activé que si vous cliquez sur « Accepter »</strong> dans le bandeau. Sans votre accord, aucun cookie de mesure n&apos;est déposé.<br/><br/>
                Si vous acceptez, Google Analytics dépose les cookies <code>_ga</code> et <code>_ga_…</code>, conservés 13 mois au plus. Google peut traiter ces données aux États-Unis (Google LLC adhère au Data Privacy Framework UE–États-Unis).<br/><br/>
                Votre choix est mémorisé 6 mois dans votre navigateur, puis la question vous est reposée. Vous pouvez changer d&apos;avis à tout moment avec le lien « Gérer les cookies » en bas de chaque page, ou ici :</p>
                <CookieSettingsButton className="legal-btn">Modifier mon choix</CookieSettingsButton>
                <p style={{marginTop:'20px'}}>Les polices de caractères sont hébergées par le site lui-même : leur affichage ne fait appel à aucun service tiers.</p>
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
