import { useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Experience from '../../three/Experience'
import { useGsapContext } from '../../lib/useGsap'
import { floorConcept, ui } from '../../data/content'

/**
 * 3D Immersive Floor-Wise Concept.
 *
 * Pinned for 400% of viewport height: holds in place while the user scrolls,
 * remapping scroll distance to 0-1 and passing it to the WebGL scene as
 * `progressRef` — driving the camera flight and the 3D tower rotation.
 * As the camera ascends through the 10 floors (Ground Floor to Floor 09 Rooftop),
 * each floor's HUD panel smoothly fades and glides in and out in sequence.
 */
export default function ImmersiveSection() {
  const sectionRef = useRef(null)
  const progressRef = useRef(0)
  const hudRefs = useRef([])
  const introRef = useRef(null)
  const finalRef = useRef(null)

  // 9 floor display windows from Ground Floor (Level 00) to Rooftop (Level 09)
  const windows = [
    { center: 0.15, width: 0.05 },
    { center: 0.24, width: 0.05 },
    { center: 0.33, width: 0.05 },
    { center: 0.42, width: 0.05 },
    { center: 0.51, width: 0.05 },
    { center: 0.60, width: 0.05 },
    { center: 0.69, width: 0.05 },
    { center: 0.78, width: 0.05 },
    { center: 0.87, width: 0.05 },
  ]

  useGsapContext(() => {
    const applyProgress = (p) => {
      progressRef.current = p

      if (introRef.current) {
        introRef.current.style.opacity = p < 0.10 ? 1 : Math.max(0, 1 - (p - 0.10) / 0.05)
      }
      if (finalRef.current) {
        finalRef.current.style.opacity = p > 0.92 ? Math.min(1, (p - 0.92) / 0.06) : 0
      }
      windows.forEach((w, i) => {
        const el = hudRefs.current[i]
        if (!el) return
        const dist = Math.abs(p - w.center)
        const opacity = dist < w.width ? Math.max(0, 1 - dist / w.width) : 0
        el.style.opacity = opacity
        el.style.transform = `translateY(${(1 - opacity) * 14}px)`
      })
    }

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=380%',
      pin: true,
      scrub: true,
      onUpdate: (self) => applyProgress(self.progress),
      onRefresh: (self) => applyProgress(self.progress),
    })
    applyProgress(trigger.progress)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section
      id="floors"
      ref={sectionRef}
      className="relative h-svh overflow-hidden bg-black"
      aria-label={floorConcept.title}
    >
      <Experience progressRef={progressRef} />

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-6 pb-14 sm:p-10 sm:pb-16 lg:p-14 lg:pb-16">
        <div ref={introRef} className="max-w-xl transition-opacity duration-300">
          <p className="label-tag text-xs sm:text-sm text-white/60">{floorConcept.eyebrow}</p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
            {floorConcept.title}
          </h2>
          <p className="pretty mt-3 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
            {floorConcept.intro}
          </p>
        </div>

        <div className="relative min-h-[320px] sm:min-h-[280px] md:min-h-[260px]">
          {floorConcept.floors.map((floor, i) => (
            <div
              key={floor.level}
              ref={(el) => {
                hudRefs.current[i] = el
              }}
              className="absolute inset-x-0 bottom-0 opacity-0"
              style={{ transition: 'opacity 0.2s linear, transform 0.2s linear' }}
            >
              <div className="flex items-center gap-3.5">
                <span className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-white shadow-sm backdrop-blur-sm sm:text-sm">
                  {floor.tag}
                </span>
                <span className="font-mono text-xs font-medium uppercase tracking-widest text-white/55 sm:text-sm">
                  {floor.level}
                </span>
              </div>

              <h3 className="mt-3 max-w-2xl font-display text-2xl font-semibold leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] sm:text-3xl md:text-4xl lg:text-5xl">
                {floor.title}
              </h3>

              <p className="pretty mt-2.5 max-w-xl text-sm leading-relaxed text-white/80 drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)] sm:text-base md:text-lg">
                {floor.description}
              </p>

              {floor.capacity && (
                <p className="mt-2 text-xs font-semibold text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)] sm:text-sm md:text-base">
                  {floor.capacity}
                </p>
              )}

              <ul className="mt-3.5 flex max-w-2xl flex-wrap gap-x-5 gap-y-2 sm:mt-4 sm:gap-x-6 sm:gap-y-2.5">
                {floor.facilities.map((facility) => (
                  <li
                    key={facility}
                    className="pretty flex items-center gap-2 text-xs leading-relaxed text-white/85 drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)] sm:text-sm md:text-base"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/80" aria-hidden="true" />
                    <span>{facility}</span>
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
