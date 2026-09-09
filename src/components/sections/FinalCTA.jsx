import { Fragment, useState } from 'react'
import gsap from 'gsap'
import { useGsapContext } from '../../lib/useGsap'
import { waitlist, contact, footer, hero, ui } from '../../data/content'

const EMPTY = { name: '', business: '', email: '', phone: '', interest: '' }

/**
 * SECTION 9 — Final CTA, restructured as an asymmetric split rather than a
 * centred block: the headline runs huge down the left, the form sits on the
 * right at eye level — distinct from the Statement section's centred poster
 * and from Story's split-screen (this one never swaps sides or scrolls
 * content through it; it simply arrives, in full, as the page's landing
 * point).
 */
export default function FinalCTA() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const set = (key) => (e) => {
    const value = e.target.value
    setValues((v) => ({ ...v, [key]: value }))
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev))
  }

  const validate = () => {
    const next = {}
    if (!values.name.trim()) next.name = ui.errors.name
    if (!values.email.trim()) next.email = ui.errors.email
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) next.email = ui.errors.emailInvalid
    if (!values.interest) next.interest = ui.errors.interest
    return next
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) return
    // No backend is wired up yet. Point this at your form endpoint (Formspree,
    // a serverless function, a CRM webhook) and keep the success state below.
    setSubmitted(true)
  }

  const root = useGsapContext(() => {
    gsap.fromTo(
      '.cta-bg img',
      { scale: 1.25 },
      {
        scale: 1.05,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top top', scrub: 0.6 },
      },
    )
    gsap.fromTo(
      '.cta-headline .split-mask > span',
      { yPercent: 105 },
      {
        yPercent: 0,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%', end: 'top 30%', scrub: 0.5 },
      },
    )
    gsap.fromTo(
      '.cta-fade',
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.cta-form', start: 'top 85%' },
      },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section id="waitlist" ref={root} className="relative overflow-hidden bg-black py-28 sm:py-36 lg:py-44">
      <div className="cta-bg pointer-events-none absolute inset-0" aria-hidden="true">
        <img src="/assets/tower-bg.jpg" alt="" className="h-full w-full object-cover object-top opacity-25" />
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/90 to-black/70" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/60" />
      </div>

      {/* Everything below shares one gutter (px-5/10/16, matching the footer
          strip further down) applied here, once, on the outer wrapper — the
          architectural lines and the content grid then just centre a
          max-w-7xl box inside it with no padding of their own, so the two
          can never drift out of alignment the way they had been. */}
      <div className="relative px-5 sm:px-10 lg:px-16">
        {/* Architectural rule lines — fill the composition's negative space
            with the same vertical-line language the tower renders use. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
          <div className="mx-auto grid h-full max-w-7xl grid-cols-12">
            {Array.from({ length: 13 }).map((_, i) => (
              <div key={i} className="border-l border-white/5 last:border-r" />
            ))}
          </div>
        </div>

        <div className="relative w-full max-w-7xl">
          {/* Flex split — content column on the left, the form as its own
              column fixed to the right. */}
          <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:gap-16">
            <div className="lg:flex-1">
              <p className="cta-fade label-tag text-white/55">{contact.note}</p>
              <h2 className="cta-headline text-giant balance mt-6 text-white">
                {waitlist.headline.split(' ').map((word, i, arr) => (
                  <Fragment key={i}>
                    <span className="split-mask">
                      <span className="block">{word}</span>
                    </span>
                    {i < arr.length - 1 ? ' ' : null}
                  </Fragment>
                ))}
              </h2>
              <p className="cta-fade pretty mt-8 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
                {waitlist.body}
              </p>
              <address className="cta-fade mt-6 text-sm text-white/45 not-italic">
                {contact.address}
                {' · '}
                <a href={contact.phoneHref} className="transition-colors hover:text-white">{contact.phone}</a>
                {' · '}
                <a href={contact.emailHref} className="transition-colors hover:text-white">{contact.email}</a>
              </address>
            </div>

            {/* Form column — same width as the content column on large
                screens, full width below it on smaller screens. */}
            <div className="cta-form border-t border-white/15 pt-10 lg:flex-1 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-14">
              {submitted ? (
                <div className="cta-fade flex min-h-56 flex-col items-center justify-center text-center">
                  <p className="text-xl-display text-white">{ui.success}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setValues(EMPTY)
                      setSubmitted(false)
                    }}
                    className="label-tag mt-7 border-b border-white/30 pb-1 text-white/60 transition-colors hover:text-white"
                  >
                    {ui.submitAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="cta-fade">
                  <div className="flex flex-col gap-6">
                    <Field id="fc-name" label={waitlist.fields.name} value={values.name} onChange={set('name')} error={errors.name} autoComplete="name" required />
                    <Field id="fc-business" label={waitlist.fields.business} value={values.business} onChange={set('business')} autoComplete="organization" />
                    <Field id="fc-email" label={waitlist.fields.email} type="email" value={values.email} onChange={set('email')} error={errors.email} autoComplete="email" required />
                    <Field id="fc-phone" label={waitlist.fields.phone} type="tel" value={values.phone} onChange={set('phone')} autoComplete="tel" />
                  </div>

                  <fieldset className="mt-8 border-t border-white/8 pt-8">
                    <legend className="label-tag text-white/50">{waitlist.fields.interest}</legend>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {waitlist.interests.map((option) => {
                        const checked = values.interest === option
                        return (
                          <label
                            key={option}
                            className={`cursor-pointer rounded-full border px-4 py-2 text-[13px] transition-all duration-300 ${
                              checked ? 'border-white bg-white text-black' : 'border-white/20 text-white/65 hover:border-white/45'
                            }`}
                          >
                            <input type="radio" name="interest" value={option} checked={checked} onChange={set('interest')} className="sr-only" />
                            {option}
                          </label>
                        )
                      })}
                    </div>
                    {errors.interest && <p className="mt-2 text-xs font-medium text-white">{errors.interest}</p>}
                  </fieldset>

                  <button
                    type="submit"
                    className="group mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition-transform duration-400 hover:-translate-y-0.5"
                  >
                    {waitlist.cta}
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-400 group-hover:translate-x-1">
                      <path d="M1 8h13m0 0-4.5-4.5M14 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer strip — a conventional footer: brand, links, contact and
          social laid out as plain columns, with a slim bottom bar carrying
          the closing line. No oversized type, no artful device — just a
          standard, easy-to-scan footer. */}
      <div className="relative border-t border-white/10 px-5 pt-16 pb-3 sm:px-10 sm:pt-20 sm:pb-4 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-10 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
            <div>
              <img src="/assets/rac-logo-white.svg" alt="RAC" className="h-6 w-auto" />
              <p className="mt-4 text-xs tracking-widest text-white/35 lowercase">{footer.tagline}</p>
            </div>

            <nav aria-label={footer.quickLinksLabel}>
              <p className="label-tag text-white/35">{footer.quickLinksLabel}</p>
              <ul className="mt-4 space-y-3 text-sm text-white/60">
                {footer.quickLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="transition-colors hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <address className="text-sm text-white/50 not-italic">
              <p className="label-tag text-white/35">{contact.note}</p>
              <p className="mt-4 max-w-xs">{contact.address}</p>
              <p className="mt-3">
                <a href={contact.phoneHref} className="transition-colors hover:text-white">{contact.phone}</a>
              </p>
              <p className="mt-1">
                <a href={contact.emailHref} className="transition-colors hover:text-white">{contact.email}</a>
              </p>
            </address>

            <div>
              <ul className="mt-1 space-y-3 text-sm text-white/60 sm:mt-9">
                {contact.social.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} className="transition-colors hover:text-white">{s.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-white/8 pt-4 sm:mt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/35">{hero.heroLine}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ id, label, error, className = '', ...rest }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label-tag block text-white/50">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-2.5 w-full border-b bg-transparent pb-2.5 text-[15px] text-white outline-none transition-colors placeholder:text-white/25 ${
          error ? 'border-white' : 'border-white/20 focus:border-white'
        }`}
        {...rest}
      />
      {error && <p id={`${id}-error`} className="mt-2 text-xs font-medium text-white">{error}</p>}
    </div>
  )
}
