/**
 * Single source of truth for every word on the site.
 *
 * The copy here is reproduced verbatim from the client brief — components read
 * from this file and never inline their own wording, so the text can be edited
 * in one place without touching layout.
 *
 * Items written as "Title. Description." in the brief are split into
 * { term, detail } so the design can weight the two halves differently.
 * Rejoining term + " " + detail reproduces the original line exactly.
 */

/* ==========================================================================
 * NOT FROM THE BRIEF — the only such strings on the site.
 *
 * The waitlist form cannot work without validation and confirmation wording,
 * keyboard users need a skip link, and the 3D scroll experience needs a cue
 * telling first-time visitors to scroll. Everything else on the page is the
 * brief's own copy, verbatim. These are gathered here, apart from the real
 * content, so they are easy to review, reword or delete.
 * ======================================================================== */
export const ui = {
  skipLink: 'Skip to content',
  scrollHint: 'Scroll',
  menuOpen: 'Menu',
  menuClose: 'Close',
  immersive: {
    scrollContinue: 'Scroll to continue',
    floorPrefix: 'Floor',
    floorSuffix: 'Who It Supports',
    closingLine: 'One tower. Every stage of the journey.',
  },
  process: {
    stepPrefix: 'Step',
    stepJoiner: 'of',
  },
  errors: {
    name: 'Please enter your name.',
    email: 'Please enter your email.',
    emailInvalid: 'Please enter a valid email address.',
    interest: 'Please choose one option.',
  },
  success: 'Thank you.',
  submitAnother: 'Submit another response',
}

/* --------------------------------------------------------------------------
 * Contact details were not supplied in the brief (it said "Insert:" there).
 * These are PLACEHOLDERS — replace before launch.
 * ----------------------------------------------------------------------- */
export const contact = {
  address: 'RAC Tower, Calicut, Kerala, India',
  phone: '+91 00000 00000',
  phoneHref: 'tel:+910000000000',
  email: 'hello@ractower.in',
  emailHref: 'mailto:hello@ractower.in',
  note: 'Opening Soon',
  social: [
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'YouTube', href: '#' },
  ],
}

export const seo = {
  home: {
    title: 'RAC Tower | Premium Business Destination in Calicut',
    description:
      'RAC Tower is a 45,000 sq. ft. business destination in Calicut bringing workspaces, creative studios, event halls, hospitality and a startup program under one roof.',
  },
  overview: {
    title: 'About RAC Tower | A Complete Professional Destination',
    description:
      'RAC Tower is a 10-floor, professionally managed environment in Calicut built for how business actually happens, from focused work to hosting and recovery.',
  },
}

export const hero = {
  headline: 'RAC Tower',
  subHeadline: 'Premium Business Destination',
  heroLine: 'Where Business Takes Its Place.',
  paragraph:
    "RAC Tower brings together workspaces, corporate facilities, events, creative studios, hospitality, wellness and recreation under one address in Calicut. It is the corporate headquarters of RAC, and it's open to businesses beyond RAC as well.",
  primaryCta: 'Book a Visit',
  secondaryCta: 'Explore the Tower',
}

export const overview = {
  title: 'A Complete Professional Destination',
  body:
    "RAC Tower is a 45,000 sq. ft., 10-floor, professionally managed environment built for the way business actually happens today. It isn't a single-purpose office building. It brings work, creation, hosting and recovery into one structured space, so businesses can operate, meet, create and grow without stepping outside.",
  /* Verbatim fragments lifted out of the paragraph above — reused for emphasis,
     never reworded. Each string appears exactly as written in the brief. */
  figures: ['45,000 sq. ft.', '10-floor', '300+ workstations'],
}

export const positioning = {
  title: "What RAC Tower Is (and Isn't)",
  isLabel: 'RAC Tower Is',
  isNotLabel: 'RAC Tower Is Not',
  rows: [
    { is: 'A professionally managed business destination', isNot: 'Just a co-working space' },
    { is: 'A structured system built for business', isNot: 'A passive facility' },
    {
      is: 'A complete environment: work, create, host, recover',
      isNot: 'A single-purpose office building',
    },
    { is: 'A launchpad for startups', isNot: 'A founder-only club' },
    { is: 'Open to businesses beyond RAC', isNot: 'An internal RAC office only' },
    { is: 'A long-term operating base', isNot: 'A short-term rental setup' },
    { is: 'The corporate headquarters of RAC', isNot: null },
  ],
  closingLine:
    "RAC Tower isn't a place you rent a desk in. It's a place your business operates from.",
}

export const facilities = {
  title: 'Facilities',
  groups: [
    {
      id: 'work',
      name: 'Work Space',
      intro: 'Structured environments built for focused, professional work.',
      image: '/images/work-open-plan.jpg',
      alt: 'Open-plan floor of workstations under linear lighting',
      gallery: [
        { src: '/images/work-offices.jpg', alt: 'Private offices behind glass partitions' },
        { src: '/images/work-boardroom.jpg', alt: 'Executive boardroom with a city view' },
        { src: '/images/work-discussion.jpg', alt: 'An informal discussion over laptops' },
      ],
      items: [
        { term: '300+ workstations.', detail: 'Flexible seating for individuals and teams.' },
        { term: 'Private offices.', detail: 'Dedicated, closed spaces for teams that need one.' },
        { term: 'Executive workspaces.', detail: 'Premium spaces suited for leadership.' },
        { term: 'Meeting rooms.', detail: 'For internal discussions and client meetings.' },
        { term: 'Conference rooms.', detail: 'For larger, formal business meetings.' },
        { term: 'Discussion areas.', detail: 'Open, informal spots for quick conversations.' },
      ],
    },
    {
      id: 'create',
      name: 'Create',
      intro: 'Facilities built for businesses that build their own content and brand.',
      image: '/images/create-video.jpg',
      alt: 'A cinema camera on a lit video-production set',
      gallery: [
        { src: '/images/create-podcast.jpg', alt: 'Broadcast microphone in a podcast studio' },
        { src: '/images/create-edit.jpg', alt: 'A video edit timeline on screen' },
        { src: '/images/create-studio.jpg', alt: 'A production and recording desk' },
      ],
      items: [
        { term: 'Podcast studios.', detail: 'Fully equipped for recording and production.' },
        { term: 'Video-production facilities.', detail: 'For shoots, edits and brand content.' },
        { term: 'Interview spaces.', detail: 'Set up for panels, interviews and recordings.' },
        { term: 'Branding and creative facilities.', detail: 'For design and creative work.' },
        { term: 'Technology-focused workspaces.', detail: 'For tech and product teams.' },
      ],
    },
    {
      id: 'host',
      name: 'Meet & Host',
      intro: 'Spaces designed for gatherings that require structure and scale.',
      image: '/images/host-convention.jpg',
      alt: 'A full convention hall facing a presentation screen',
      gallery: [
        { src: '/images/host-roundtable.jpg', alt: 'Round-table hall set for a session' },
        { src: '/images/work-boardroom.jpg', alt: 'Boardroom set for a leadership discussion' },
        { src: '/images/work-discussion.jpg', alt: 'A working session in progress' },
      ],
      items: [
        { term: '100-seater convention hall.', detail: 'For large events and gatherings.' },
        { term: '40-seater round-table hall.', detail: 'For focused group discussions.' },
        { term: 'Corporate events.', detail: 'Space for launches, meets and functions.' },
        { term: 'Workshops.', detail: 'A dedicated setup for training and sessions.' },
        { term: 'Presentations.', detail: 'Equipped for pitches and formal presentations.' },
        { term: 'Leadership discussions.', detail: 'A private setting for leadership meets.' },
        { term: 'Professional gatherings.', detail: 'Space for networking and meetups.' },
      ],
    },
    {
      id: 'recharge',
      name: 'Recharge & Connect',
      intro: 'Recovery and informal spaces that support sustained performance.',
      image: '/images/recharge-restaurant.jpg',
      alt: 'A warmly lit rooftop restaurant interior',
      gallery: [
        { src: '/images/recharge-gym.jpg', alt: 'A workout in the gym' },
        { src: '/images/recharge-cafe.jpg', alt: 'The premium café' },
        { src: '/images/recharge-gaming.jpg', alt: 'A gaming zone set up for breaks' },
      ],
      items: [
        { term: 'Gym.', detail: 'For a workout during or after work hours.' },
        { term: 'Steam and sauna.', detail: 'For recovery and relaxation.' },
        { term: 'Relaxation pods.', detail: 'Quiet spaces to rest and reset.' },
        { term: 'Recreational areas.', detail: 'Informal spaces to unwind.' },
        { term: 'Gaming zones.', detail: 'A casual space for breaks.' },
        { term: 'Premium café.', detail: 'For coffee, quick bites and informal chats.' },
        { term: 'Rooftop restaurant.', detail: 'For meals and informal meetings.' },
        { term: 'Informal meeting environments.', detail: 'Relaxed spots for conversations.' },
        { term: 'Hospitality spaces.', detail: 'For hosting guests and visitors.' },
      ],
    },
  ],
}

export const startup = {
  eyebrow: "RAC Tower's Startup Program",
  title: 'Build Your Startup',
  body:
    'Within RAC Tower, the RAC Startup Program helps founders build, launch and scale startups with clarity, structure and complete in-house support. From idea stage to nationwide expansion, every startup progresses through a defined system, backed by infrastructure, capital guidance, mentorship and execution teams, all under one roof.',
  supportsTitle: 'Who the Program Supports',
  supports: [
    {
      name: 'Aspiring & Early-Stage Founders',
      image: '/images/startup-founders.jpg',
      alt: 'Early-stage founders working together around a table',
      items: [
        {
          term: 'A strong idea at an early stage.',
          detail:
            'For founders with a clear problem statement or market insight, even without a full plan yet.',
        },
        {
          term: 'No infrastructure or team.',
          detail:
            "RAC Tower provides the setup and execution support these founders don't yet have, so they can start building without hiring first.",
        },
        {
          term: 'Building a first product or business.',
          detail:
            'Guided support from ideation and prototyping through to branding, launch and early traction, suited to first-time entrepreneurs.',
        },
      ],
    },
    {
      name: 'Startups With MVP or Early Traction',
      image: '/images/startup-team.jpg',
      alt: 'A startup team at work in an open office',
      items: [
        {
          term: 'An existing product that needs positioning.',
          detail: 'Support to refine the product and sharpen its market positioning and branding.',
        },
        {
          term: 'Basic customer validation.',
          detail:
            'Support to read early traction signals and build structured growth funnels for founders with some paying customers or user feedback.',
        },
        {
          term: 'A gap in branding, sales or operations.',
          detail:
            'Access to in-house marketing, tech, finance, legal, HR and sales teams to scale faster.',
        },
      ],
    },
    {
      name: 'Scalable Digital and Product Ventures',
      image: '/images/create-edit.jpg',
      alt: 'Product and digital work in progress on screen',
      items: [
        {
          term: 'D2C, F&B and FMCG brands.',
          detail:
            'Support with manufacturing guidance, packaging, logistics, branding and distribution for consumer-facing brands.',
        },
        {
          term: 'IoT and hardware innovators.',
          detail:
            'Access to labs, prototyping and technical guidance to move hardware products from concept to market.',
        },
        {
          term: 'SaaS and tech-driven products.',
          detail:
            'UI/UX, product design, development talent and go-to-market support for software and app-based businesses.',
        },
        {
          term: 'Creator-led and digital-first businesses.',
          detail:
            'Support to turn an existing audience into sustainable revenue through product, monetisation and brand-building.',
        },
      ],
    },
  ],
  selectionTitle: 'Selection Process',
  selectionIntro:
    'A structured process to onboard founders with clarity, commitment and strong potential.',
  selectionSteps: [
    {
      term: 'Application.',
      detail: 'Apply through the RAC Startup Portal with the idea and basic details.',
    },
    {
      term: 'Internal screening.',
      detail:
        'Verification and review by the RAC internal team; shortlisted applicants move to interview.',
    },
    {
      term: 'Online interview.',
      detail: 'An assessment of founder clarity, market understanding, commitment and feasibility.',
    },
    {
      term: 'Final pitch.',
      detail:
        'Selected applicants pitch to the RAC management team with the required documents before joining.',
    },
  ],
  pillars: [
    {
      name: 'Onboarding',
      body:
        "In the first weeks at RAC Tower, every founder goes through a structured onboarding program covering startup fundamentals, market understanding, MVP and product-building logic, branding and positioning, sales and pricing frameworks, and the basics of finance and runway management. Founders are also introduced to leadership fundamentals and to the Tower's systems, SOPs and reporting structure, building the foundation to begin building and scaling with confidence.",
    },
    {
      name: 'Dedicated Growth Manager',
      body:
        "Each startup is paired with a dedicated Growth Manager who acts as the founder's central point of coordination and accountability. The Growth Manager tracks KPIs and milestones, coordinates across tech, marketing, sales, finance and legal teams, supports founders through fundraising and investor conversations, and reviews progress through regular check-ins, so no founder is navigating the process alone.",
    },
    {
      name: 'Growth Roadmap',
      body:
        'Every startup works to a defined 12-month roadmap covering burn, breakeven, return and profit, with an optional extension of up to 18 months where correction or optimisation is needed. Startups also operate within a peer environment of 30 to 50 founders per floor, creating shared learning and exposure to founders at different stages of the same journey.',
    },
  ],
}

export const why = {
  title: 'Why RAC Tower',
  image: '/images/why-floors.jpg',
  alt: 'A working floor inside the tower',
  body:
    "RAC Tower isn't built around a single idea of what a workspace should look like. It's built around what a business actually needs across a working day. Each floor is dedicated to a different function that a growing business relies on, from marketing and technology to leadership, creative production and client engagement, so every department has a space designed specifically for how it works. Alongside this, dedicated recreational floors give teams a genuine space to step away and recharge. Nothing here is decorative. Every floor earns its place by supporting real business activity, from focused execution to genuine recovery.",
}

export const audience = {
  title: "Who It's For",
  intro:
    'Built for teams that need a structured, professional environment to work, host, create and grow.',
  items: [
    {
      term: 'Established businesses and corporate teams.',
      detail: 'Looking for a professional base to operate from.',
    },
    {
      term: 'Leadership and executive teams.',
      detail: 'Looking for space suited to focused, high-level work.',
    },
    {
      term: 'Content creators and creative teams.',
      detail: 'Looking for studios and creative facilities.',
    },
    {
      term: 'Organisations hosting events, workshops or presentations.',
      detail: 'Looking for scale and structure.',
    },
    {
      term: 'Founders and startups.',
      detail:
        'Looking for hands-on, structured support to build and grow, through the RAC Startup Program.',
    },
  ],
}

export const waitlist = {
  headline: 'Be Among the First at RAC Tower',
  body:
    'RAC Tower is opening soon in Calicut. Join the waitlist to get early access and priority updates as workspaces, event spaces and studios open their doors.',
  cta: 'Join the Waitlist',
  interests: ['Workspace', 'Event Space', 'Studio', 'Startup Program'],
  fields: {
    name: 'Name',
    business: 'Business Name',
    email: 'Email',
    phone: 'Phone',
    interest: 'What are you interested in?',
  },
}

export const footer = {
  tagline: 'a project by rac',
  quickLinksLabel: 'Quick Links',
  quickLinks: [
    { label: 'Facilities', href: '#facilities' },
    { label: 'Waitlist', href: '#waitlist' },
  ],
}

/* Navigation labels are section titles taken verbatim from the brief — no
   invented wayfinding words. */
export const nav = [
  { label: 'Facilities', href: '#facilities' },
  { label: 'Build Your Startup', href: '#startup' },
  { label: 'Why RAC Tower', href: '#why' },
  { label: "Who It's For", href: '#who' },
]
