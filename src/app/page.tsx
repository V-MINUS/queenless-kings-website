import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Music from '@/components/sections/Music'
import Events from '@/components/sections/Events'
import Gallery from '@/components/sections/Gallery'
import Contact from '@/components/sections/Contact'

// Re-fetch Google Calendar events at most every 5 minutes instead of freezing them at build time
export const revalidate = 300

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <Hero />
      <Music />
      <Events />
      <About />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  )
}
