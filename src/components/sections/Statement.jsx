import gsap from 'gsap'
import { useGsapContext } from '../../lib/useGsap'
import { positioning } from '../../data/content'

/**
 * SECTION 8 — Big Statement. After several purely-typographic attempts, this
 * one leans on photography instead: a dim, still plate of the tower behind
 * one line of type, revealed with a single clip-path wipe rather than a
 * word-by-word stagger — the simplest, most confident move available,
 * deliberately with nothing else on screen.
 */
export default function Statement() {
  const root = useGsapContext(() => {
    gsap.fromTo(
      '.stmt-wipe',
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        ease: 'power2.inOut',
        scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'top 20%', scrub: 0.6 },
      },
    )
    gsap.fromTo(
      '.stmt-bg img',
      { scale: 1.15 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section ref={root} className="relative flex min-h-svh items-center justify-center overflow-hidden bg-black px-5 py-28 sm:px-10 lg:px-16">
      <div className="stmt-bg pointer-events-none absolute inset-0" aria-hidden="true">
        <img src="/assets/why-floors.jpg" alt="" className="h-full w-full object-cover grayscale" />
        <div className="absolute inset-0 bg-black/78" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="relative w-full max-w-5xl">
        <p className="text-xxl balance text-center text-white/25">{positioning.closingLine}</p>
        <div className="stmt-wipe pointer-events-none absolute inset-0 flex items-center justify-center">
          <p className="text-xxl balance text-center text-white">{positioning.closingLine}</p>
        </div>
      </div>
    </section>
  )
}
