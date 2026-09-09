import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGsapContext } from '../../lib/useGsap'
import { prefersReducedMotion, scrollToHash } from '../../lib/smoothScroll'
import { hero, ui } from '../../data/content'

/**
 * SECTION 1 — Hero. The brief's own sequence:
 * black screen → typography appears → elements reveal → image enters →
 * typography moves → hero becomes interactive → user starts scrolling.
 *
 * No card, no simple heading+paragraph+button block: the image is a full-bleed
 * plate the headline sits on top of, revealed through a mask rather than a
 * fade, with the whole plate drifting opposite the pointer for depth.
 */
export default function Hero() {
  const plateRef = useRef(null)
  const wordsRef = useRef(null)
  const reduced = useRef(prefersReducedMotion()).current

  const root = useGsapContext(() => {
    const words = wordsRef.current.querySelectorAll('.word-inner')

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    tl.set(root.current, { autoAlpha: 1 })
      .fromTo(
        '.hero-veil',
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: 1.1, ease: 'power2.inOut' },
        0.15,
      )
      .fromTo(
        '.hero-eyebrow',
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.7 },
        0.3,
      )
      .fromTo(words, { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.09 }, 0.45)
      .fromTo(
        '.hero-plate',
        { scale: 1.18, autoAlpha: 0 },
        { scale: 1.06, autoAlpha: 1, duration: 1.6, ease: 'power2.out' },
        0.4,
      )
      .fromTo(
        '.hero-line',
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.8 },
        0.95,
      )
      .fromTo(
        '.hero-copy > *',
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 },
        1.15,
      )
      .fromTo('.hero-scrollcue', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 1.6)

    // Slow, endless Ken Burns drift on the plate, independent of the entrance
    gsap.to('.hero-plate img', {
      scale: 1.14,
      duration: 22,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Pointer parallax — the plate and headline drift a few px opposite the
  // cursor, independent of the load-in timeline above.
  useEffect(() => {
    if (reduced || typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      gsap.to(plateRef.current, { x: x * -14, y: y * -8, duration: 1.2, ease: 'power2.out' })
      gsap.to(wordsRef.current, { x: x * 6, duration: 1.2, ease: 'power2.out' })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduced])

  return (
    <section
      id="top"
      ref={root}
      className="relative flex h-svh min-h-[640px] items-end overflow-hidden bg-black invisible"
    >
      <div ref={plateRef} className="hero-plate absolute inset-0 invisible">
        <img
          src="/assets/tower-night.jpg"
          alt="RAC Tower at night, its floors lit beneath the illuminated RAC sign"
          fetchPriority="high"
          className="h-full w-full object-cover object-[center_56%]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/35 to-black/55" />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/10 to-black/40" />
        <div className="grain absolute inset-0" />
      </div>

      {/* Floating atmosphere dots — decorative only */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {[
          [12, 22], [78, 14], [88, 60], [22, 72], [55, 30], [65, 82],
        ].map(([x, y], i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/40"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              animation: reduced ? 'none' : `float-dot ${6 + i}s ease-in-out ${i * 0.4}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="hero-veil pointer-events-none absolute inset-0 z-20 bg-black" />

      <div className="relative z-10 w-full px-5 pb-14 sm:px-10 sm:pb-16 lg:px-16 lg:pb-20">
        <div className="hero-eyebrow invisible flex items-center gap-3">
          <span className="h-px w-9 bg-white/60" aria-hidden="true" />
          <span className="label-tag text-white/75">{hero.subHeadline}</span>
        </div>

        <h1 ref={wordsRef} className="text-hero mt-5 text-white sm:mt-6">
          {hero.headline.split(' ').map((word, i) => (
            <span key={i} className="split-mask mr-[0.18em] last:mr-0">
              <span className="word-inner block">{word}</span>
            </span>
          ))}
        </h1>

        <p className="hero-line text-editorial invisible mt-3 max-w-xl text-white/90 sm:mt-4">
          {hero.heroLine}
        </p>

        <div className="hero-copy mt-8 flex flex-col gap-7 sm:mt-10 lg:flex-row lg:items-end lg:justify-between">
          <p className="pretty invisible max-w-md text-[15px] leading-relaxed text-white/65 sm:text-base">
            {hero.paragraph}
          </p>

          <div className="invisible flex flex-col gap-3 sm:flex-row">
            <a
              href="#waitlist"
              onClick={(e) => {
                e.preventDefault()
                scrollToHash('#waitlist')
              }}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-transform duration-400 hover:-translate-y-0.5"
            >
              {hero.primaryCta}
              <ArrowIcon />
            </a>
            <a
              href="#overview"
              onClick={(e) => {
                e.preventDefault()
                scrollToHash('#overview')
              }}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/30 px-7 py-3.5 text-sm font-medium text-white transition-colors duration-400 hover:border-white hover:bg-white/10"
            >
              {hero.secondaryCta}
              <ArrowIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="hero-scrollcue invisible pointer-events-none absolute right-6 bottom-6 z-10 flex items-center gap-2 sm:right-10">
        <span className="label-tag text-white/45">{ui.scrollHint}</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/25 p-1.5">
          <span className="h-1.5 w-px animate-bounce bg-white/60" />
        </span>
      </div>
    </section>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-400 group-hover:translate-x-1">
      <path d="M1 8h13m0 0-4.5-4.5M14 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
