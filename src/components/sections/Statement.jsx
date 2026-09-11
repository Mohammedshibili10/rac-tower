import { useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGsapContext } from '../../lib/useGsap'
import { positioning } from '../../data/content'

gsap.registerPlugin(SplitText)

/**
 * SECTION 8 — Big Statement. After several purely-typographic attempts, this
 * one leans on photography instead: a dim, still plate of the tower behind
 * one line of type, revealed with a per-line wipe rather than a single wipe
 * across the whole block — line one clears, then line two, then line three,
 * each tied to its own slice of the section's scroll so the reveal reads as
 * a top-to-bottom progression rather than one flat left-to-right sweep.
 */
export default function Statement() {
  const frontRef = useRef(null)

  const root = useGsapContext(() => {
    const split = new SplitText(frontRef.current, { type: 'lines', linesClass: 'stmt-line' })
    gsap.set(split.lines, { clipPath: 'inset(0 100% 0 0)' })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
    split.lines.forEach((line) => {
      tl.to(line, { clipPath: 'inset(0 0% 0 0)', ease: 'none', duration: 1 })
    })

    gsap.fromTo(
      '.stmt-bg img',
      { scale: 1.15 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      },
    )

    return () => split.revert()
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
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <p ref={frontRef} className="text-xxl balance text-center text-white">
            {positioning.closingLine}
          </p>
        </div>
      </div>
    </section>
  )
}
