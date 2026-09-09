import { Fragment, useState } from 'react'
import gsap from 'gsap'
import { useGsapContext } from '../../lib/useGsap'
import { waitlist, contact, footer, hero, ui } from '../../data/content'

const EMPTY = {
  name: '',
  business: '',
  email: '',
  phone: '',
  interest: '',
}

/**
 * SECTION 9 — Final CTA
 * 50/50 split layout:
 * Left  → CTA content
 * Right → Contact form
 */
export default function FinalCTA() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const set = (key) => (e) => {
    const value = e.target.value

    setValues((v) => ({
      ...v,
      [key]: value,
    }))

    setErrors((prev) =>
      prev[key]
        ? {
            ...prev,
            [key]: undefined,
          }
        : prev,
    )
  }

  const validate = () => {
    const next = {}

    if (!values.name.trim()) {
      next.name = ui.errors.name
    }

    if (!values.email.trim()) {
      next.email = ui.errors.email
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())
    ) {
      next.email = ui.errors.emailInvalid
    }

    if (!values.interest) {
      next.interest = ui.errors.interest
    }

    return next
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const found = validate()

    setErrors(found)

    if (Object.keys(found).length > 0) return

    // No backend is wired up yet.
    // Connect this to Formspree, serverless function,
    // CRM webhook, or your backend endpoint.
    setSubmitted(true)
  }

  const root = useGsapContext(() => {
    // Background animation
    gsap.fromTo(
      '.cta-bg img',
      {
        scale: 1.25,
      },
      {
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top bottom',
          end: 'top top',
          scrub: 0.6,
        },
      },
    )

    // Headline animation
    gsap.fromTo(
      '.cta-headline .split-mask > span',
      {
        yPercent: 105,
      },
      {
        yPercent: 0,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 75%',
          end: 'top 30%',
          scrub: 0.5,
        },
      },
    )

    // Fade animation
    gsap.fromTo(
      '.cta-fade',
      {
        autoAlpha: 0,
        y: 24,
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.cta-form',
          start: 'top 85%',
        },
      },
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section
      id="waitlist"
      ref={root}
      className="relative overflow-hidden bg-black py-28 sm:py-36 lg:py-44"
    >
      {/* Background */}
      <div
        className="cta-bg pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <img
          src="/assets/tower-bg.jpg"
          alt=""
          className="h-full w-full object-cover object-top opacity-25"
        />

        <div className="absolute inset-0 bg-linear-to-r from-black via-black/90 to-black/70" />

        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/60" />
      </div>

      {/* Main wrapper */}
      <div className="relative px-5 sm:px-10 lg:px-16">
        {/* Architectural grid lines */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden lg:block"
        >
          <div className="grid h-full grid-cols-12">
            {Array.from({ length: 13 }).map((_, i) => (
              <div
                key={i}
                className="border-l border-white/5 last:border-r"
              />
            ))}
          </div>
        </div>

        {/* Content container */}
        <div className="relative w-full">
          {/* =====================================================
              50 / 50 SPLIT
              LEFT  → Content
              RIGHT → Form
          ====================================================== */}

          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-start lg:gap-20">
            {/* =================================================
                LEFT SIDE — CONTENT
            ================================================== */}
            <div className="w-full min-w-0 lg:pr-6">
              {/* Label */}
              <p className="cta-fade label-tag text-white/55">
                {contact.note}
              </p>

              {/* Heading */}
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

              {/* Description */}
              <p className="cta-fade pretty mt-8 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
                {waitlist.body}
              </p>

              {/* Contact information */}
              <address className="cta-fade mt-6 text-sm text-white/45 not-italic">
                {contact.address}

                {' · '}

                <a
                  href={contact.phoneHref}
                  className="transition-colors hover:text-white"
                >
                  {contact.phone}
                </a>

                {' · '}

                <a
                  href={contact.emailHref}
                  className="transition-colors hover:text-white"
                >
                  {contact.email}
                </a>
              </address>
            </div>

            {/* =================================================
                RIGHT SIDE — FORM
            ================================================== */}
            <div className="cta-form w-full min-w-0 lg:pl-6">
              <div className="rounded-2xl border border-white/12 bg-white/2 p-8 sm:p-10">
                {submitted ? (
                  /* =============================================
                     SUCCESS STATE
                  ============================================== */
                  <div className="cta-fade flex min-h-56 flex-col items-center justify-center text-center">
                    <p className="text-xl-display text-white">
                      {ui.success}
                    </p>

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
                  /* =============================================
                     FORM
                  ============================================== */
                  <form
                    onSubmit={onSubmit}
                    noValidate
                    className="cta-fade"
                  >
                    {/* Basic fields */}
                    <div className="flex flex-col gap-6">
                      <Field
                        id="fc-name"
                        label={waitlist.fields.name}
                        value={values.name}
                        onChange={set('name')}
                        error={errors.name}
                        autoComplete="name"
                        required
                      />

                      <Field
                        id="fc-business"
                        label={waitlist.fields.business}
                        value={values.business}
                        onChange={set('business')}
                        autoComplete="organization"
                      />

                      <Field
                        id="fc-email"
                        label={waitlist.fields.email}
                        type="email"
                        value={values.email}
                        onChange={set('email')}
                        error={errors.email}
                        autoComplete="email"
                        required
                      />

                      <Field
                        id="fc-phone"
                        label={waitlist.fields.phone}
                        type="tel"
                        value={values.phone}
                        onChange={set('phone')}
                        autoComplete="tel"
                      />
                    </div>

                    {/* Interest */}
                    <fieldset className="mt-8 border-t border-white/10 pt-8">
                      <legend className="label-tag text-white/50">
                        {waitlist.fields.interest}
                      </legend>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {waitlist.interests.map((option) => {
                          const checked = values.interest === option

                          return (
                            <label
                              key={option}
                              className={`cursor-pointer rounded-full border px-4 py-2 text-[13px] transition-all duration-300 ${
                                checked
                                  ? 'border-white bg-white text-black'
                                  : 'border-white/20 text-white/65 hover:border-white/45'
                              }`}
                            >
                              <input
                                type="radio"
                                name="interest"
                                value={option}
                                checked={checked}
                                onChange={set('interest')}
                                className="sr-only"
                              />

                              {option}
                            </label>
                          )
                        })}
                      </div>

                      {errors.interest && (
                        <p className="mt-2 text-xs font-medium text-white">
                          {errors.interest}
                        </p>
                      )}
                    </fieldset>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="group mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition-transform duration-400 hover:-translate-y-0.5"
                    >
                      {waitlist.cta}

                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                        className="h-3.5 w-3.5 transition-transform duration-400 group-hover:translate-x-1"
                      >
                        <path
                          d="M1 8h13m0 0-4.5-4.5M14 8l-4.5 4.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          FOOTER
      ========================================================== */}
      <div className="relative mt-20 border-t border-white/10 px-5 pt-16 pb-3 sm:mt-24 sm:px-10 sm:pt-20 sm:pb-4 lg:mt-28 lg:px-16">
        <div className=" max-w-8xl">
          <div className="flex flex-col gap-10 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
            {/* Brand */}
            <div>
              <img
                src="/assets/rac-logo-white.svg"
                alt="RAC"
                className="h-6 w-auto"
              />

              <p className="mt-4 text-xs tracking-widest text-white/35 lowercase">
                {footer.tagline}
              </p>
            </div>

            {/* Quick links */}
            <nav aria-label={footer.quickLinksLabel}>
              <p className="label-tag text-white/35">
                {footer.quickLinksLabel}
              </p>

              <ul className="mt-4 space-y-3 text-sm text-white/60">
                {footer.quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact */}
            <address className="text-sm text-white/50 not-italic">
              <p className="label-tag text-white/35">
                {contact.note}
              </p>

              <p className="mt-4 max-w-xs">
                {contact.address}
              </p>

              <p className="mt-3">
                <a
                  href={contact.phoneHref}
                  className="transition-colors hover:text-white"
                >
                  {contact.phone}
                </a>
              </p>

              <p className="mt-1">
                <a
                  href={contact.emailHref}
                  className="transition-colors hover:text-white"
                >
                  {contact.email}
                </a>
              </p>
            </address>

            {/* Social */}
            <div>
              <ul className="mt-1 space-y-3 text-sm text-white/60 sm:mt-9">
                {contact.social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      className="transition-colors hover:text-white"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="mt-6 flex flex-col gap-3 border-t border-white/8 pt-4 sm:mt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/35">
              {hero.heroLine}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ===============================================================
   INPUT FIELD COMPONENT
================================================================ */

function Field({ id, label, error, className = '', ...rest }) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="label-tag block text-white/50"
      >
        {label}
      </label>

      <input
        id={id}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-2.5 w-full border-b bg-transparent text-[15px] text-white outline-none transition-colors placeholder:text-white/25 ${
          error
            ? 'border-white'
            : 'border-white/20 focus:border-white'
        }`}
        {...rest}
      />

      {error && (
        <p
          id={`${id}-error`}
          className="mt-2 text-xs font-medium text-white"
        >
          {error}
        </p>
      )}
    </div>
  )
}


