import { useEffect, useState } from 'react'
import { nav, hero, ui } from '../data/content'
import { scrollToHash } from '../lib/smoothScroll'

/**
 * Minimal by design: a small mark top-left, a single toggle top-right. The
 * menu itself is a full-black takeover with oversized type — treated as its
 * own brief moment rather than a conventional dropdown.
 */
export default function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (hash) => (e) => {
    e.preventDefault()
    setOpen(false)
    scrollToHash(hash)
  }

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between p-5 sm:p-8 lg:p-10">
        <a
          href="#top"
          onClick={go('#top')}
          className="pointer-events-auto"
          aria-label={hero.headline}
        >
          <img src="/assets/rac-logo-white.svg" alt="" aria-hidden="true" className="h-5 w-auto sm:h-6" />
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="site-menu"
          className="pointer-events-auto label-tag flex items-center gap-3 text-white/80 transition-colors hover:text-white"
        >
          {open ? ui.menuClose : ui.menuOpen}
          <span className="relative block h-2.5 w-4">
            <span className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${open ? 'top-1.25 rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${open ? 'top-1.25 -rotate-45' : 'top-2.5'}`} />
          </span>
        </button>
      </header>

      <div
        id="site-menu"
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-black px-6 transition-opacity duration-500 sm:px-12 lg:px-20 ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <nav aria-label={hero.headline}>
          <ul>
            {nav.map((item, i) => (
              <li key={item.href} className="overflow-hidden border-b border-white/10">
                <a
                  href={item.href}
                  onClick={go(item.href)}
                  style={{ transitionDelay: open ? `${90 + i * 70}ms` : '0ms' }}
                  className={`text-xxl font-display block py-4 text-white/85 transition-all duration-500 hover:text-white sm:py-6 ${
                    open ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#waitlist"
          onClick={go('#waitlist')}
          style={{ transitionDelay: open ? `${90 + nav.length * 70}ms` : '0ms' }}
          className={`label-tag mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-white px-6 py-4 text-black transition-all duration-500 ${
            open ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {hero.primaryCta}
        </a>
      </div>
    </>
  )
}
