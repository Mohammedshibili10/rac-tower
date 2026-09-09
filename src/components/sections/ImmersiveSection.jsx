import { useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Experience from '../../three/Experience'
import { useGsapContext } from '../../lib/useGsap'
import { startup, ui } from '../../data/content'

/**
 * SECTION 5 — 3D Immersive.
 *
 * Pinned for 260% of the viewport height: the section holds in place while
 * the user scrolls past it, and that scroll distance is remapped to 0-1 and
 * handed to the WebGL scene as `progressRef` — driving the camera's flight,
 * the tower's slow turn, and the beacon's glow (see three/Experience.jsx).
 * The three "who it helps" labels below are plain DOM text, faded in and out
 * by the very same progress value as the camera passes each floor, so the
 * copy and the camera always agree about where in the journey they are.
 */
export default function ImmersiveSection() {
  const sectionRef = useRef(null)
  const progressRef = useRef(0)
  const hudRefs = useRef([])
  const introRef = useRef(null)
  const finalRef = useRef(null)

  const windows = [
    { center: 0.45, width: 0.16 },
    { center: 0.7, width: 0.16 },
    { center: 0.88, width: 0.1 },
  ]

  useGsapContext(() => {
    // Named and called once immediately below, not only from onUpdate: a
    // scroll-restored reload or a jump straight into this pin can land here
    // before ScrollTrigger's first natural update fires, and the intro div
    // starts from its bare JSX state (fully opaque) until something
    // explicitly sets it — leaving it stuck on screen indefinitely, on top
    // of whichever HUD panel actually matches the real scroll position.
    const applyProgress = (p) => {
      progressRef.current = p

      if (introRef.current) {
        introRef.current.style.opacity = p < 0.12 ? 1 : Math.max(0, 1 - (p - 0.12) / 0.08)
      }
      if (finalRef.current) {
        finalRef.current.style.opacity = p > 0.92 ? Math.min(1, (p - 0.92) / 0.06) : 0
      }
      windows.forEach((w, i) => {
        const el = hudRefs.current[i]
        if (!el) return
        const dist = Math.abs(p - w.center)
        const opacity = dist < w.width ? 1 - dist / w.width : 0
        el.style.opacity = opacity
        el.style.transform = `translateY(${(1 - opacity) * 14}px)`
      })
    }

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=190%',
      pin: true,
      // `scrub: true` (not a number) ties progress directly to scroll
      // position with no catch-up delay of its own — a numeric scrub adds
      // exactly the "scroll, then a beat, then it moves" lag being reported
      // here, stacked on top of the camera's own easing below.
      scrub: true,
      onUpdate: (self) => applyProgress(self.progress),
      onRefresh: (self) => applyProgress(self.progress),
    })
    applyProgress(trigger.progress)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section
      id="startup"
      ref={sectionRef}
      className="relative h-svh overflow-hidden bg-black"
      aria-label={startup.title}
    >
      <Experience progressRef={progressRef} />

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-10 lg:p-14">
        <div ref={introRef} className="max-w-lg transition-opacity duration-300">
          <p className="label-tag text-white/55">{startup.eyebrow}</p>
          <h2 className="text-xl-display mt-4 text-white">{startup.title}</h2>
          <p className="pretty mt-4 max-w-md text-sm leading-relaxed text-white/60 sm:text-[15px]">
            {startup.body}
          </p>
        </div>

        <div className="relative min-h-52 sm:min-h-44">
          {startup.supports.map((group, i) => (
            <div
              key={group.name}
              ref={(el) => {
                hudRefs.current[i] = el
              }}
              className="absolute inset-x-0 bottom-0 opacity-0"
              style={{ transition: 'opacity 0.2s linear, transform 0.2s linear' }}
            >
              <p className="label-tag text-white/45">
                {ui.immersive.floorPrefix} {String(i + 1).padStart(2, '0')} —{' '}
                {ui.immersive.floorSuffix}
              </p>
              <h3 className="text-xl-display mt-2 max-w-xl text-white">{group.name}</h3>
              <ul className="mt-2 max-w-md space-y-1">
                {group.items.map((item) => (
                  <li key={item.term} className="pretty text-[13px] leading-relaxed text-white/60 sm:text-sm">
                    <span className="font-semibold text-white/85">{item.term}</span> {item.detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          ref={finalRef}
          className="max-w-md self-end text-right opacity-0"
          style={{ transition: 'opacity 0.3s linear' }}
        >
          <p className="text-editorial text-white">{ui.immersive.closingLine}</p>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center pb-6 sm:pb-8"
        aria-hidden="true"
      >
        <span className="label-tag text-white/30">{ui.immersive.scrollContinue}</span>
      </div>
    </section>
  )
}
