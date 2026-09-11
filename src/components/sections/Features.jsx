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

      {/* Facility tiles — a proper wrapping grid rather than a single row
          forced to shrink: a fixed column count per breakpoint means a
          6-item group and a 9-item group both stay readable, wrapping into
          as many rows as the group needs instead of squeezing every item
          into one cramped line. Each tile carries a top rule rather than a
          full border box, keeping the treatment light. */}
      <div className="relative px-5 pt-2 pb-14 sm:px-10 sm:pt-3 sm:pb-16 lg:px-16 lg:pt-4 lg:pb-20">
        <div key={group.id + '-grid'} className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {group.items.map((item) => (
            <div
              key={item.term}
              className="feature-card group flex min-w-0 flex-col gap-4 border-t border-white/15 pt-5 transition-colors duration-400 hover:border-white/40"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors duration-400 group-hover:border-white/40">
                <FacilityIcon name={TERM_ICON[item.term]} className="h-5 w-5" />
              </span>
              <h4 className="text-base leading-snug font-semibold text-white sm:text-lg">
                {item.term.replace(/\.$/, '')}
              </h4>
              <p className="pretty text-sm leading-relaxed text-white/50">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}
