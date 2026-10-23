import { useState } from 'react'
import gsap from 'gsap'
import { useGsapContext } from '../../lib/useGsap'
import { startup } from '../../data/content'

/**
 * RAC Startup Program — Process-Oriented Interactive Section
 * 
 * Features:
 * - Dynamic Process Flow Pipeline with animated glowing light beam
 * - Interactive step progression with active selection and progress bar
 * - Sequential connected stages with smooth hover and transition states
 * - Cohort matrix, Onboarding curriculum grid, and Milestone roadmap
 * - Dark-luxury aesthetic aligned with RAC Tower's architectural identity
 */
export default function Process() {
  const [activeStep, setActiveStep] = useState(0)

  const root = useGsapContext(() => {
    // Reveal section items safely with ScrollTrigger
    gsap.fromTo(
      '.proc-reveal',
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { whoItSupports, selectionProcess, founderOnboarding, growthManager, growthRoadmap } = startup
  const totalSteps = selectionProcess.steps.length
  const progressPercent = ((activeStep + 1) / totalSteps) * 100

  // Stage descriptors to enhance the process narrative
  const stageBadges = ['Entry Phase', 'Evaluation', 'Assessment', 'Induction']
  const stageTimelines = ['Day 01', 'Week 01', 'Week 02', 'Final Milestone']

  return (
    <section
      id="startup"
      ref={root}
      className="relative overflow-hidden bg-black py-24 text-white sm:py-32 lg:py-40"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/3 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-10 h-[500px] w-[500px] rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        }}
      />

      <div className="relative px-5 sm:px-10 lg:px-16">
        
        {/* =================================================================
            1. SECTION HEADER
           ================================================================= */}
        <div className="proc-reveal max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span className="label-tag tracking-widest text-white/60">{startup.eyebrow}</span>
          </div>

          <h2 className="text-xxl balance mt-5 font-display font-semibold tracking-tight text-white">
            {startup.title}
          </h2>

          <p className="pretty mt-6 text-base font-light leading-relaxed text-white/70 sm:text-lg lg:text-xl">
            {startup.intro}
          </p>
        </div>

        {/* =================================================================
            2. COHORTS — WHO THE PROGRAMME SUPPORTS
           ================================================================= */}
        <div className="mt-20 sm:mt-28">
          <div className="proc-reveal">
            <p className="label-tag text-white/40">{whoItSupports.eyebrow}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {whoItSupports.title}
            </h3>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {whoItSupports.tiers.map((tier, idx) => (
              <div
                key={tier.title}
                className="proc-reveal group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.04] sm:p-8"
              >
                {/* Subtle top edge shimmer */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-white/70">
                      {tier.badge}
                    </span>
                    <span className="font-mono text-xs text-white/30">0{idx + 1}</span>
                  </div>

                  <h4 className="mt-5 font-display text-xl font-semibold leading-snug text-white sm:text-2xl">
                    {tier.title}
                  </h4>

                  {tier.detail && (
                    <p className="pretty mt-3.5 text-sm leading-relaxed text-white/65">
                      {tier.detail}
                    </p>
                  )}
                </div>

                {tier.categories && (
                  <div className="mt-6 border-t border-white/10 pt-5">
                    <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-white/40">
                      {tier.subtitle}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {tier.categories.map((cat) => (
                        <span
                          key={cat}
                          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/80 transition-colors duration-200 hover:border-white/25 hover:text-white"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/50" aria-hidden="true" />
                          <span>{cat}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* =================================================================
            3. INTERACTIVE SELECTION PROCESS PIPELINE
           ================================================================= */}
        <div className="mt-24 sm:mt-32">
          {/* Section Heading & Flow Header */}
          <div className="proc-reveal flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                <p className="label-tag text-white/40">{selectionProcess.eyebrow}</p>
              </div>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
                {selectionProcess.title}
              </h3>
              {selectionProcess.intro && (
                <p className="pretty mt-2 max-w-xl text-sm text-white/65 sm:text-base">
                  {selectionProcess.intro}
                </p>
              )}
            </div>

            {/* Pipeline progress pill */}
            <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2">
              <span className="text-xs uppercase tracking-wider text-white/50">Pipeline Progress</span>
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full bg-white transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="font-mono text-xs font-semibold text-white">{Math.round(progressPercent)}%</span>
            </div>
          </div>

          {/* Connected Flow Line Track (Desktop) */}
          <div className="proc-reveal relative mt-12 hidden lg:block">
            {/* Background Track Line */}
            <div className="absolute top-7 left-12 right-12 h-[2px] bg-white/10">
              {/* Animated Glowing Light Beam */}
              <div
                className="absolute inset-y-0 h-full w-48 bg-gradient-to-r from-transparent via-white to-transparent"
                style={{
                  animation: 'beam-flow 3.5s infinite linear',
                }}
              />
              {/* Active filled line up to current step */}
              <div
                className="absolute inset-y-0 left-0 bg-white/40 transition-all duration-500"
                style={{
                  width: `${(activeStep / (totalSteps - 1)) * 100}%`,
                }}
              />
            </div>

            {/* Step Navigation Bar */}
            <div className="relative z-10 grid grid-cols-4 gap-4">
              {selectionProcess.steps.map((step, idx) => {
                const isActive = activeStep === idx
                const isPassed = activeStep > idx

                return (
                  <button
                    key={step.term}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    onMouseEnter={() => setActiveStep(idx)}
                    className="group flex flex-col items-center text-center focus:outline-none"
                  >
                    {/* Node Circle */}
                    <div
                      className={`relative flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        isActive
                          ? 'border-white bg-white text-black shadow-[0_0_24px_rgba(255,255,255,0.4)] scale-110'
                          : isPassed
                          ? 'border-white/60 bg-black text-white'
                          : 'border-white/20 bg-black text-white/60 group-hover:border-white/50 group-hover:text-white'
                      }`}
                    >
                      <span className="font-display text-sm font-bold">
                        {String(idx + 1).padStart(2, '0')}
                      </span>

                      {/* Active Pulse Ring */}
                      {isActive && (
                        <span
                          className="pointer-events-none absolute -inset-2 rounded-full border border-white/40"
                          style={{ animation: 'pulse-soft 2s infinite ease-in-out' }}
                        />
                      )}
                    </div>

                    {/* Step Label */}
                    <div className="mt-4">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                        {stageBadges[idx]}
                      </span>
                      <p
                        className={`mt-1 font-display text-base font-semibold transition-colors duration-200 ${
                          isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
                        }`}
                      >
                        {step.term}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Interactive Flow Cards Display */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {selectionProcess.steps.map((step, i) => {
              const isActive = activeStep === i
              const isPassed = activeStep > i

              return (
                <div
                  key={step.term}
                  onClick={() => setActiveStep(i)}
                  onMouseEnter={() => setActiveStep(i)}
                  className={`proc-reveal group relative flex cursor-pointer flex-col justify-between rounded-2xl border p-6 transition-all duration-300 sm:p-7 ${
                    isActive
                      ? 'border-white/60 bg-white/[0.07] shadow-[0_12px_36px_rgba(255,255,255,0.06)] -translate-y-1'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]'
                  }`}
                >
                  {/* Top glowing accent line when active */}
                  {isActive && (
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent" />
                  )}

                  <div>
                    {/* Header with step number & stage tag */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-display text-sm font-semibold transition-colors duration-300 ${
                          isActive
                            ? 'border-white bg-white text-black'
                            : isPassed
                            ? 'border-white/40 bg-white/10 text-white'
                            : 'border-white/20 bg-white/5 text-white/60'
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                          {stageTimelines[i]}
                        </span>
                        {i < totalSteps - 1 && (
                          <span className="text-xs text-white/30">→</span>
                        )}
                      </div>
                    </div>

                    {/* Step Title */}
                    <h4 className="text-xl-display mt-6 font-semibold text-white">
                      {step.term}
                    </h4>

                    {/* Step Detail */}
                    <p className="pretty mt-2.5 text-sm leading-relaxed text-white/65 sm:text-[15px]">
                      {step.detail}
                    </p>
                  </div>

                  {/* Bottom Indicator */}
                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                    <span className="font-mono text-[11px] text-white/40">Stage {i + 1} of {totalSteps}</span>
                    <span
                      className={`font-medium transition-colors ${
                        isActive ? 'text-white' : 'text-white/30 group-hover:text-white/60'
                      }`}
                    >
                      {isActive ? '● Active' : 'Select'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Interactive Highlight Banner for Current Stage */}
          <div className="proc-reveal mt-6 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-r from-white/[0.05] via-white/[0.02] to-transparent p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-6 items-center rounded-full border border-white/20 bg-white/10 px-2.5 text-[11px] font-mono uppercase text-white/80">
                    Step {activeStep + 1} Spotlight
                  </span>
                  <span className="font-display text-lg font-semibold text-white">
                    {selectionProcess.steps[activeStep].term}
                  </span>
                </div>
                <p className="pretty mt-2 text-sm text-white/70 sm:text-base">
                  {selectionProcess.steps[activeStep].detail}
                </p>
              </div>

              {/* Step Navigation Controls */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:bg-transparent"
                  aria-label="Previous step"
                >
                  ←
                </button>
                <button
                  type="button"
                  disabled={activeStep === totalSteps - 1}
                  onClick={() => setActiveStep((prev) => Math.min(totalSteps - 1, prev + 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:bg-transparent"
                  aria-label="Next step"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================
            4. FOUNDER ONBOARDING CURRICULUM
           ================================================================= */}
        <div className="mt-24 sm:mt-32">
          <div className="proc-reveal">
            <p className="label-tag text-white/40">{founderOnboarding.eyebrow}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {founderOnboarding.title}
            </h3>
            <p className="mt-2 text-sm text-white/60 sm:text-base">
              {founderOnboarding.intro}
            </p>
          </div>

          <div className="mt-8 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {founderOnboarding.areas.map((area, idx) => (
              <div
                key={area}
                className="proc-reveal group flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/[0.02] p-4.5 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.04]"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-[10px] text-white/70 transition-colors duration-200 group-hover:border-white group-hover:bg-white group-hover:text-black">
                  ✓
                </span>
                <span className="text-sm font-medium text-white/80 transition-colors duration-200 group-hover:text-white">
                  {area}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* =================================================================
            5. DEDICATED GROWTH MANAGER & GROWTH ROADMAP
           ================================================================= */}
        <div className="mt-24 grid gap-6 sm:mt-32 lg:grid-cols-2">
          
          {/* Dedicated Growth Manager */}
          <div className="proc-reveal group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.04] sm:p-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            <div>
              <p className="label-tag text-white/40">{growthManager.eyebrow}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {growthManager.title}
              </h3>

              <p className="pretty mt-4 text-base font-medium text-white/90 sm:text-lg">
                {growthManager.lead}
              </p>

              <div className="mt-7 border-t border-white/10 pt-6">
                <p className="font-mono text-xs uppercase tracking-widest text-white/40">
                  {growthManager.subtitle}
                </p>
                <ul className="mt-4 space-y-3.5">
                  {growthManager.responsibilities.map((resp) => (
                    <li key={resp} className="flex items-start gap-3.5 text-sm leading-relaxed text-white/75 sm:text-[15px]">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/5 text-[9px] text-white/80">
                        ✓
                      </span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Growth Roadmap */}
          <div className="proc-reveal group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.04] sm:p-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div>
              <p className="label-tag text-white/40">{growthRoadmap.eyebrow}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {growthRoadmap.title}
              </h3>

              <p className="pretty mt-4 text-base leading-relaxed text-white/75 sm:text-lg">
                {growthRoadmap.description}
              </p>

              <div className="mt-8 grid gap-3.5 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors group-hover:border-white/20">
                  <p className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">12 Mo</p>
                  <p className="mt-1.5 text-xs leading-normal text-white/60">Burn, breakeven, return & profit roadmap</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors group-hover:border-white/20">
                  <p className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">+18 Mo</p>
                  <p className="mt-1.5 text-xs leading-normal text-white/60">Optional extension for correction & optimisation</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors group-hover:border-white/20">
                  <p className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">30–50</p>
                  <p className="mt-1.5 text-xs leading-normal text-white/60">Founders peer environment per floor</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
