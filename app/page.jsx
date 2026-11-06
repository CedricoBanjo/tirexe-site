import Hero from '../components/Hero'
import Expertise from '../components/Expertise'
import CtaBand from '../components/CtaBand'
import RecentArticles from '../components/RecentArticles'
import Nav from '../components/Nav'
import Secteurs from '../components/Secteurs'
import Stack from '../components/Stack'
import Process from '../components/Process'
import Pourquoi from '../components/Pourquoi'
import Faq from '../components/Faq'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export const metadata = {
  alternates: { canonical: '/' },
}

export default function Home() {
  return (
    <>
      <Nav />
      <main id="contenu" className="accueil">
        <Hero />
        <Expertise />
        <CtaBand />
        <Secteurs />
        <Stack />
        <hr className="sep" />
        <Process />
        <Pourquoi />
        <Faq />
        <CtaBand />
        <hr className="sep" />
        <RecentArticles />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
