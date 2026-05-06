export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-eyebrow a a1">
        <span className="dot-live"></span>
        Consultant VBA Excel · Missions longues en régie
      </div>
      <h1 className="a a2">
        Consultant &amp; <span className="accent">Développeur</span><br />
        VBA Excel Senior
      </h1>
      <p className="hero-desc a a3">
        Je conçois des <strong>outils métier sur mesure</strong> et des{' '}
        <strong>algorithmes de contrôle complexes</strong> pour de grands projets
        industriels et financiers — en régie, à la journée. Basé à Martigues, disponible sur toute la région PACA et en remote France entière.
      </p>
      <div className="hero-btns a a4">
      <a href="/#contact" className="btn-g">Discutons de votre projet</a>
      <a href="/#expertise" className="btn-ghost">Voir l&apos;expertise</a>
      </div>
      <div className="hero-pills a a5">
        <div className="pill">
          <div className="pill-num">10<span>+</span></div>
          <div className="pill-sep"></div>
          <div className="pill-label">Ans d&apos;expérience</div>
        </div>
        <div className="pill">
          <div className="pill-num" style={{fontSize:'14px',letterSpacing:'-.3px'}}>Multi-secteurs</div>
          <div className="pill-sep"></div>
          <div className="pill-label">Industrie · Finance · BTP</div>
        </div>
        <div className="pill">
          <div className="pill-num">Régie</div>
          <div className="pill-sep"></div>
          <div className="pill-label">À la journée</div>
        </div>
      </div>
    </section>
  )
}
