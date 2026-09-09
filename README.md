# RAC Tower

Marketing site for RAC Tower — a 45,000 sq. ft. business destination in Calicut.

**React 19 + Vite 8 + Tailwind CSS 4.** Single page, strictly black-and-white,
cinematic scroll, fully responsive.

## Getting started

```bash
npm install
npm run dev      # dev server
npm run build    # production build → dist/
npm run preview  # serve the production build locally
```

## Structure

```
index.html                      page shell, SEO meta, JSON-LD
src/
  main.jsx / App.jsx            entry and section order
  index.css                     tokens, type scale, motion, utilities
  lib/scroll.js                 the shared scroll engine
  data/content.js               ← ALL COPY LIVES HERE
  components/
    ui/Primitives.jsx           Reveal, RevealText, Parallax, Tilt, Marquee,
                                Button, Card, Figure, Bracket, ScrollProgress
    Navbar / Hero / Overview / Positioning / Facilities /
    StartupProgram / WhyRacTower / WhoItsFor / Waitlist / Footer
public/assets                   RAC logo + tower render
public/images                   facility and programme photography
legacy/coming-soon.html         the previous holding page, kept for reference
```

## Content policy

Every visible word comes from [`src/data/content.js`](src/data/content.js) and is
reproduced **verbatim** from the brief. Components never hard-code wording.

Lines the brief wrote as `Title. Description.` are stored as `{ term, detail }`
so the halves can be weighted differently; rejoined with a space they reproduce
the original sentence exactly. Headings are displayed in caps via CSS
`text-transform` — the underlying text is unchanged.

**The only strings not from the brief** are grouped in the `ui` export at the top
of `content.js`: four form-validation messages, a confirmation word, a "submit
another response" link and a skip link. A form cannot function without them.
Reword or remove them there. Image `alt` text is likewise authored for
accessibility rather than taken from the brief.

## Design

Modelled on the layout, type and motion language of the reference site
(`action.themerex.net`), rendered in black and white:

- **Type** — **Anton** for display (heavy condensed caps, run to full container
  width) against **Inter** for body. Fluid `clamp()` scales, no breakpoint
  overrides.
- **Palette** — pure monochrome. No hue anywhere; hierarchy comes from value,
  weight and space. *The reference uses an orange accent and alternating cream
  sections; both were left out to honour the black-background/white-text brief.*
- **Motion** — a single scroll engine (`lib/scroll.js`) drives every effect:
  one scroll listener, one rAF loop, and **no layout reads inside the frame
  loop** (positions are measured once and re-measured on resize), which is what
  keeps the parallax from janking.
  - Hero and "Why RAC Tower" are pinned scenes — the page holds still while the
    camera pushes into the plate.
  - Facilities is four full-height floors you scroll *through*, each with its
    own drifting plate, alternating sides.
  - Reveal variants (`up`, `fade`, `curtain`, `soft`, `depth`, `left`, `right`),
    word-by-word headline masks, pointer tilt on cards, a seamless marquee.
  - **All motion is disabled under `prefers-reduced-motion`.**

## Before launch — placeholders to replace

Contact details were not supplied in the brief (it said "Insert:"). These are
**placeholders**, in the `contact` export of `content.js`:

| Field | Current placeholder |
| --- | --- |
| Address | `RAC Tower, Calicut, Kerala, India` |
| Phone | `+91 00000 00000` |
| Email | `hello@ractower.in` |
| Social links | all point at `#` |

**The waitlist form has no backend.** It validates and shows a success state
client-side only — nothing is sent or stored. Wire it up in the `onSubmit`
handler in `src/components/Waitlist.jsx`, where the comment marks the spot.

## Accessibility

- Skip link, visible focus rings, labelled mobile menu that locks body scroll
  and closes on Escape.
- The interest selector is native radio inputs styled as chips.
- Form errors use `aria-invalid` / `aria-describedby` and are marked with a
  glyph as well as weight — with no colour in the palette, an error could not be
  signalled by hue.
- Decorative background plates use `alt=""`; content images carry real alt text.

## Verified

- Production build passes.
- No horizontal overflow, no console errors and no failed requests at
  360 / 390 / 768 / 1024 / 1440 / 1920 px.
- All 228 strings of brief copy render verbatim; both SEO metadata sets are
  present (home in `<title>`/meta, overview in JSON-LD).
