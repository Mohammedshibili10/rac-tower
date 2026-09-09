import gsap from 'gsap'
import { useGsapContext } from '../../lib/useGsap'
import { overview } from '../../data/content'

/**
 * SECTION 2 — Introduction. Copy runs down the left; the three figures
 * pulled from that same paragraph sit as a numbered, divided stat column on
 * the right — rule lines rather than boxed cards, so this section reads
 * differently from the bordered-card grids used elsewhere on the page.
 */
export default function Introduction() {
  const root = useGsapContext(() => {
    gsap.fromTo(
      '.intro-fade',
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      },
    )
    gsap.fromTo(
      '.intro-stat',
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.intro-stats', start: 'top 85%' },
      },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section id="overview" ref={root} className="relative bg-black py-24 sm:py-32 lg:py-40">
      <div className="px-5 sm:px-10 lg:px-16">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="intro-fade label-tag text-white/45">Overview</p>
            <h2 className="intro-fade text-xxl balance mt-5 text-white">A Complete Professional Destination</h2>
            <p className="intro-fade pretty mt-8 max-w-xl text-lg leading-relaxed text-white/65 sm:text-xl">
              {overview.body}
            </p>
          </div>

          <div className="intro-stats divide-y divide-white/10 border-t border-white/10 lg:col-span-5 lg:border-t-0 lg:border-l lg:pl-10">
            {overview.figures.map((figure, i) => (
              <div key={figure} className="intro-stat py-6 first:pt-0 lg:first:pt-1">
                <p className="label-tag text-white/35">{String(i + 1).padStart(2, '0')}</p>
                <p className="font-display balance mt-3 text-3xl text-white sm:text-4xl">{figure}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
