import gsap from 'gsap'
import { useGsapContext } from '../../lib/useGsap'
import { audience } from '../../data/content'

// One photograph per audience — reused from the site's own facility/program
// photography rather than a uniform stock set.
const IMAGES = [
  { src: '/images/work-coworking.webp', alt: 'A modern coworking floor of desks and monitors' },
  { src: '/images/work-offices.jpg', alt: 'Private offices behind glass partitions' },
  { src: '/images/create-branding-studio.webp', alt: 'A branding and media production studio' },
  { src: '/images/story-event-pitch.jpg', alt: 'A speaker presenting to an audience at an event' },
  { src: '/images/story-founders-team.jpg', alt: 'A group of founders in discussion around a table' },
]

/**
 * SECTION 6 — Gallery, built as a stack rather than a grid: each panel is
 * `position: sticky`, so as the page scrolls, every photograph locks into
 * place and the next one slides up to cover it — a physical deck of prints
 * rather than a wall of thumbnails. Pure CSS handles the stacking; GSAP only
 * drives each panel's own caption and the very slight scale-down the
 * covered panels get as the next one lands on top.
 */
export default function Gallery() {
  const root = useGsapContext(() => {
    gsap.utils.toArray('.stack-panel').forEach((panel, i) => {
      gsap.fromTo(
        panel.querySelectorAll('.stack-reveal'),
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: panel, start: 'top 55%' },
        },
      )

      if (i < audience.items.length - 1) {
        gsap.fromTo(
          panel.querySelector('.stack-image'),
          { scale: 1 },
          {
            scale: 0.92,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              start: 'top top',
              endTrigger: `.stack-panel-${i + 1}`,
              end: 'top top',
              scrub: true,
            },
          },
        )
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section id="who" ref={root} className="relative bg-black">
      <div className="px-5 pt-24 pb-14 sm:px-10 sm:pt-32 lg:px-16 lg:pt-40">
        <p className="label-tag text-white/45">{audience.title}</p>
        <p className="pretty mt-5 max-w-xl text-lg text-white/65 sm:text-xl">{audience.intro}</p>
      </div>

      {audience.items.map((item, i) => (
        <div
          key={item.term}
          className={`stack-panel stack-panel-${i} sticky top-0 flex h-svh items-end overflow-hidden`}
          style={{ zIndex: i + 1 }}
        >
          <div className="stack-image absolute inset-0 origin-top">
            <img src={IMAGES[i].src} alt={IMAGES[i].alt} loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/10" />
          </div>

          <div className="relative w-full px-5 pb-14 sm:px-10 sm:pb-20 lg:px-16">
            <span className="stack-reveal label-tag text-white/45">
              {String(i + 1).padStart(2, '0')} / {String(audience.items.length).padStart(2, '0')}
            </span>
            <p className="stack-reveal text-xxl mt-3 max-w-3xl text-white">{item.term}</p>
            <p className="stack-reveal pretty mt-3 max-w-lg text-base text-white/65 sm:text-lg">{item.detail}</p>
          </div>
        </div>
      ))}
    </section>
  )
}
