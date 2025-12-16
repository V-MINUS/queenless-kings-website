import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Music from '@/components/sections/Music'
import Events from '@/components/sections/Events'
import Gallery from '@/components/sections/Gallery'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <Hero />
      <About />
      <Music />
      <Events />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  )
}
