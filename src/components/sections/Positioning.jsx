import gsap from 'gsap'
import { useGsapContext } from '../../lib/useGsap'
import { positioning } from '../../data/content'

/**
 * A dedicated comparison section, rebuilt as a card grid: each row becomes
 * one bordered card holding both halves — the "is" statement with its
 * checkmark up top, the dismissed "is not" struck through beneath — so the
 * pairing survives at a glance without needing a table or two parallel
 * columns, and the grid itself carries the same card language used across
 * the rest of the site.
 */
export default function Positioning() {
  const root = useGsapContext(() => {
    gsap.fromTo(
      '.pos-card',
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
    <section id="positioning" ref={root} className="relative bg-black py-24 text-white sm:py-32 lg:py-40">
      <div className="px-5 sm:px-10 lg:px-16">
        <p className="label-tag text-white/45">{positioning.title}</p>

        <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {positioning.rows.map((row) => (
            <div
              key={row.is}
              className="pos-card group flex h-full flex-col rounded-2xl border border-white/12 bg-white/[0.02] p-6 transition-colors duration-400 hover:border-white/25 sm:p-7"
            >
              <div className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white">
                  <CheckIcon className="h-3 w-3 text-black" />
                </span>
                <p className="text-xl-display balance min-h-[3.15em] font-medium text-white">{row.is}</p>
              </div>

              {row.isNot && (
                <>
                  <div className="my-5 h-px w-full bg-white/8" aria-hidden="true" />
                  <div className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/20">
                      <CrossIcon className="h-2.5 w-2.5 text-white/40" />
                    </span>
                    <p className="pretty text-sm text-white/40 line-through decoration-white/20">
                      {row.isNot}
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CheckIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="m3 8.5 3.2 3.2L13 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CrossIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
