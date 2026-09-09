import { useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/sections/Hero'
import Introduction from './components/sections/Introduction'
import Positioning from './components/sections/Positioning'
import Features from './components/sections/Features'
import Process from './components/sections/Process'
import ImmersiveSection from './components/sections/ImmersiveSection'
import Story from './components/sections/Story'
import Gallery from './components/sections/Gallery'
import Statement from './components/sections/Statement'
import FinalCTA from './components/sections/FinalCTA'
import { initSmoothScroll } from './lib/smoothScroll'
import { ui } from './data/content'

export default function App() {
  useEffect(() => {
    initSmoothScroll()
  }, [])

  return (
    <>
      <a
        href="#overview"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-black"
      >
        {ui.skipLink}
      </a>

      <Nav />

      <main>
        <Hero />
        <Introduction />
        <Positioning />
        <Features />
        <Process />
        <ImmersiveSection />
        <Story />
        <Gallery />
        <Statement />
        <FinalCTA />
      </main>
    </>
  )
}
