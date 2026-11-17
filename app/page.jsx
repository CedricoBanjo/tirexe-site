import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Bandeau from '../components/Bandeau'
import Expertise from '../components/Expertise'
import Methode from '../components/Methode'
import Pourquoi from '../components/Pourquoi'
import Citation from '../components/Citation'
import RecentArticles from '../components/RecentArticles'
import Faq from '../components/Faq'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export const metadata = {
  alternates: { canonical: '/' },
}

// L'accueil, de haut en bas : qui et quoi (avec le bouton d'action), les secteurs, les 4 expertises,
// la méthode, pourquoi Tirexe, le mot de Cédric, le blog, les questions, puis le formulaire.
export default function Home() {
  return (
    <>
      <Nav />
      <main id="contenu" className="accueil">
        <Hero />
        <Bandeau />
        <Expertise />
        <Methode />
        <Pourquoi />
        <Citation />
        <RecentArticles />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
