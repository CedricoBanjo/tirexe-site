import RecentArticles from '../components/RecentArticles'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Expertise from '../components/Expertise'
import Secteurs from '../components/Secteurs'
import Stack from '../components/Stack'
import Process from '../components/Process'
import Pourquoi from '../components/Pourquoi'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main style={{paddingTop: '68px'}}>
        <Hero />
        <hr className="sep" />
        <Expertise />
        <Secteurs />
        <hr className="sep" />
        <Stack />
        <hr className="sep" />
        <Process />
        <hr className="sep" />
        <Pourquoi />
        <hr className="sep" />
        <RecentArticles />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
