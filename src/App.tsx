import { MotionConfig } from 'motion/react'
import { AccessibilityMenu } from './components/layout/AccessibilityMenu'
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { About } from './components/sections/About'
import { Contact } from './components/sections/contact/Contact'
import { Gallery } from './components/sections/gallery/Gallery'
import { Hero } from './components/sections/Hero'
import { InstagramFeed } from './components/sections/InstagramFeed'
import { Marquee } from './components/sections/Marquee'
import { MediaShowcase } from './components/sections/media/MediaShowcase'
import { Services } from './components/sections/Services'
import { Testimonials } from './components/sections/Testimonials'
import { useA11y } from './context/a11y'
import { BookingProvider } from './context/BookingProvider'
import { TESTIMONIALS } from './data/site'

export default function App() {
  const { settings } = useA11y()
  return (
    <MotionConfig reducedMotion={settings.stopMotion ? 'always' : 'user'}>
      <BookingProvider>
        <a
          href="#about"
          className="sr-only rounded-full bg-white px-5 py-3 font-bold text-ink-900 focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[70]"
        >
          דילוג לתוכן הראשי
        </a>
        <Header />
        <main>
          <Hero />
          {/* Everything after the hero is one opaque sheet that slides up over the pinned hero video. */}
          <div className="relative z-10 overflow-clip rounded-t-[2rem] bg-ink-900 shadow-[0_-30px_80px_-10px_rgba(0,0,0,0.9)] sm:rounded-t-[2.75rem]">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 z-10 h-px bg-linear-to-l from-transparent via-gold-400/70 to-transparent"
            />
            <Marquee />
            <About />
            <Services />
            <MediaShowcase />
            {TESTIMONIALS.length > 0 && <Testimonials />}
            <Gallery />
            <InstagramFeed />
            <Contact />
          </div>
        </main>
        <Footer />
        <FloatingWhatsApp />
        <AccessibilityMenu />
      </BookingProvider>
    </MotionConfig>
  )
}
