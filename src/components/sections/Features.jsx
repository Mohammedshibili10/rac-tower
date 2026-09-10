import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGsapContext } from '../../lib/useGsap'
import { facilities } from '../../data/content'
import { FacilityIcon, TERM_ICON } from '../../lib/facilityIcons'

const AUTO_ADVANCE_MS = 5000

/**
 * SECTION 4 — Features/Services. A shorter photo band carries the selector
 * and the one giant swapping headline; the facilities themselves live below
 * it on plain black as a flexible, icon-led card grid — one card per item —
 * so the list scales cleanly from six items up to nine without ever reading
 * as a cramped bullet list.
 */
export default function Features() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const group = facilities.groups[active]
  const bgRoot = useRef(null)

  // Auto-advances through the facility groups on a timer, pausing while the
  // pointer is over the section so a hovered/selected group doesn't get
  // yanked away mid-read.
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setActive((i) => (i + 1) % facilities.groups.length)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(id)
  }, [paused])

  // Scoped to the section root (set up below) so it mounts once for the
  // page-load reveal of the index list.
  const root = useGsapContext(() => {
    gsap.fromTo(
      '.feature-index-item',
      { autoAlpha: 0, x: -16 },
      {
        autoAlpha: 1,
        x: 0,
        stagger: 0.06,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Re-runs on every group switch — scoped to its own DOM node (bgRoot)
  // rather than reusing `root`, since a second gsap.context() sharing the
  // same root element as an existing, still-live context is what produced
  // the "Invalid scope" / target-not-found warnings.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.feature-bg img',
        { autoAlpha: 0, scale: 1.12 },
        { autoAlpha: 1, scale: 1.04, duration: 1.1, ease: 'power2.out' },
      )
      gsap.fromTo(
        '.feature-headline',
        { autoAlpha: 0, yPercent: 30 },
        { autoAlpha: 1, yPercent: 0, duration: 0.6, ease: 'power3.out' },
      )
      gsap.fromTo(
        '.feature-panel',
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.15 },
      )
      gsap.fromTo(
        '.feature-card',
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, stagger: 0.05, duration: 0.5, ease: 'power2.out', delay: 0.2 },
      )
    }, bgRoot)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  return (
    <section
      id="facilities"
      ref={root}
      className="relative overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div ref={bgRoot}>
      <div className="relative min-h-[78svh] overflow-hidden">
        <div key={group.id} className="feature-bg absolute inset-0" aria-hidden="true">
          <img src={group.image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/55 to-black/45" />
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/20 to-black/40" />
        </div>

        <div className="relative z-10 flex h-full min-h-[78svh] flex-col px-5 pt-28 pb-4 sm:px-10 sm:pt-32 sm:pb-5 lg:px-16 lg:pt-40 lg:pb-6">
          <p className="label-tag text-white/50">{facilities.title}</p>

          {/* Compact index — small, unchanging scale */}
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 sm:mt-10">
            {facilities.groups.map((g, i) => (
              <li key={g.id} className="feature-index-item">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className={`label-tag border-b pb-1 transition-colors duration-400 ${
                    active === i ? 'border-white text-white' : 'border-white/15 text-white/40 hover:text-white/70'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')} — {g.name}
                </button>
              </li>
            ))}
          </ul>

          {/* The one giant headline — swaps with the selection */}
          <div className="flex flex-1 items-center">
            <h3 key={group.id} className="feature-headline text-hero balance text-white">
              {group.name}
            </h3>
          </div>

          <div key={group.id + '-panel'} className="feature-panel max-w-lg">
            <p className="pretty text-sm leading-relaxed text-white/70 sm:text-base">{group.intro}</p>
          </div>
        </div>
      </div>

      {/* Facility list — an open, divided row rather than boxed cards: each
          item is icon-led text separated by a thin vertical rule, echoing
          the architectural line language used elsewhere on the page instead
          of repeating the bordered-card treatment already used everywhere
          else on the site. */}
      <div className="relative px-5 pt-2 pb-14 sm:px-10 sm:pt-3 sm:pb-16 lg:px-16 lg:pt-4 lg:pb-20">
        <div key={group.id + '-list'} className="flex flex-col divide-y divide-white/10 sm:flex-row sm:flex-wrap sm:divide-y-0">
          {group.items.map((item, i) => (
            <div
              key={item.term}
              className={`feature-card group flex min-w-0 flex-1 basis-40 flex-col gap-2.5 py-5 sm:py-0 sm:pr-5 ${
                i === 0 ? 'sm:pl-0' : 'sm:border-l sm:border-white/10 sm:pl-5'
              }`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors duration-400 group-hover:border-white/40">
                <FacilityIcon name={TERM_ICON[item.term]} className="h-3.5 w-3.5" />
              </span>
              <h4 className="text-sm leading-snug font-semibold text-white">
                {item.term.replace(/\.$/, '')}
              </h4>
              <p className="pretty text-xs leading-snug text-white/50">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}
