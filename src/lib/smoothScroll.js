import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis = null
let started = false

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * Wires Lenis's inertial scroll into GSAP's ticker — the pairing GSAP
 * documents for ScrollTrigger. Every section manages its own ScrollTriggers
 * (pins, scrubs, reveals); this module only owns the shared scroll feel and
 * the anchor-nav helper.
 */
export function initSmoothScroll() {
  if (started) return lenis
  started = true

  if (!prefersReducedMotion()) {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
  }

  window.addEventListener('load', () => ScrollTrigger.refresh())

  return lenis
}

/** Smooth-scrolls to an in-page anchor, used by the nav instead of the
 * browser's default jump so it stays consistent with Lenis's easing. */
export function scrollToHash(hash) {
  const el = document.querySelector(hash)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.3 })
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

export function getLenis() {
  return lenis
}
