import { useRef } from 'react'
import gsap from 'gsap'
import { useGsapContext } from '../../lib/useGsap'
import { startup, why } from '../../data/content'

const IMAGES = [
  { src: '/images/startup-team.jpg', alt: 'A startup team at work in an open office' },
  { src: '/images/work-discussion.jpg', alt: 'An informal discussion over laptops' },
  { src: '/images/recharge-restaurant.jpg', alt: 'A warmly lit rooftop restaurant interior' },
]

/**
 * SECTION 7 — Story. A split screen: the pillar name stays pinned large on
 * the left while the right column scrolls through each pillar's body copy
 * and image in turn. Each title crossfades to match whichever panel is
 * centred on the right, so the two sides always agree without any shared
 * React state — GSAP just toggles each title's own trigger independently.
 */
export default function Story() {
  const titleRefs = useRef([])

  const root = useGsapContext(() => {
    startup.pillars.forEach((_, i) => {
      const title = titleRefs.current[i]
      const panel = `.story-panel-${i}`
      if (!title) return

      gsap.fromTo(
        title,
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          scrollTrigger: {
            trigger: panel,
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play reverse play reverse',
          },
        },
      )

      gsap.fromTo(
        `${panel} .story-image img`,
        { scale: 1.15 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        },
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section id="why" ref={root} className="relative bg-black">
      <div className="px-5 pt-24 pb-16 sm:px-10 sm:pt-32 lg:px-16 lg:pt-40">
        <p className="label-tag text-white/45">{why.title}</p>
        <p className="pretty mt-6 max-w-3xl text-lg leading-relaxed text-white/70 sm:text-xl lg:text-2xl">
          {why.body}
        </p>
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="relative hidden lg:block">
          <div className="sticky top-0 flex h-svh items-center px-10 xl:px-16">
            <div className="relative h-40 w-full">
              {startup.pillars.map((pillar, i) => (
                <h2
                  key={pillar.name}
                  ref={(el) => {
                    titleRefs.current[i] = el
                  }}
                  className="text-xxl absolute inset-x-0 top-0 balance text-white opacity-0"
                >
                  {pillar.name}
                </h2>
              ))}
            </div>
          </div>
        </div>

        <div>
          {startup.pillars.map((pillar, i) => (
            <div key={pillar.name} className={`story-panel-${i} flex min-h-svh flex-col justify-center px-5 py-16 sm:px-10 lg:px-14`}>
              <h2 className="text-xl-display mb-6 text-white lg:hidden">{pillar.name}</h2>
              <div className="story-image mb-8 aspect-16/10 overflow-hidden rounded-2xl">
                <img src={IMAGES[i].src} alt={IMAGES[i].alt} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <p className="pretty max-w-lg text-base leading-[1.85] text-white/65 sm:text-lg">{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
