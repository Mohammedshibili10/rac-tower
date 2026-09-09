import gsap from 'gsap'
import { useGsapContext } from '../../lib/useGsap'
import { startup } from '../../data/content'

/**
 * The Selection Process as a card grid — each step is one bordered card with
 * a numbered badge, title and detail, arranged responsively. Matches the
 * card language used across Positioning and Features rather than any kind
 * of timeline, ring or numbered-line motif.
 */
export default function Process() {
  const root = useGsapContext(() => {
    gsap.fromTo(
      '.proc-card',
      { autoAlpha: 0, y: 26 },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section ref={root} className="relative bg-black py-24 sm:py-32 lg:py-40">
      <div className="px-5 sm:px-10 lg:px-16">
        <p className="label-tag text-white/45">{startup.selectionTitle}</p>
        <p className="pretty mt-5 max-w-xl text-lg text-white/65 sm:text-xl">{startup.selectionIntro}</p>

        <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {startup.selectionSteps.map((step, i) => (
            <div
              key={step.term}
              className="proc-card group flex h-full flex-col rounded-2xl border border-white/12 bg-white/[0.02] p-6 transition-colors duration-400 hover:border-white/25 sm:p-7"
            >
              <span className="font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-sm text-white/70">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl-display mt-6 text-white">{step.term}</h3>
              <p className="pretty mt-3 text-sm leading-relaxed text-white/60 sm:text-[15px]">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
