// Bandeau d'appel : une plage de cellules sélectionnée (bordure verte et poignée de recopie)
export default function CtaBand() {
  return (
    <div className="cta-band-wrap">
      <div className="wrap">
        <div className="cta-band">
          <div>
            <p className="cta-band-title">Un projet Excel à automatiser ?</p>
            <p className="cta-band-sub">Décrivez votre besoin — je reviens vers vous.</p>
          </div>
          <a href="#contact" className="cta-band-btn">Me contacter</a>
        </div>
      </div>
    </div>
  )
}
