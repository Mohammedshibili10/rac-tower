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
  phone: '+91 808 649 9444',
  phoneHref: 'tel:+918086499444',
  email: 'connect@racpartners.in',
  emailHref: 'mailto:connect@racpartners.in',
  note: 'Opening Soon',
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/rac_global/' },
    { label: 'LinkedIn', href: 'https://in.linkedin.com/company/racstartup' },
    { label: 'Facebook', href: 'https://www.facebook.com/racverse/' },
 
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
  eyebrow: 'RAC Startup Program',
  title: 'RAC Startup Program',
  intro:
    'The RAC Startup Program is presented as a programme within RAC Tower to help founders build, launch, and scale startups. The programme combines infrastructure, capital guidance, mentorship, and execution support.',
  whoItSupports: {
    eyebrow: 'Cohorts',
    title: 'Who the programme supports',
    tiers: [
      {
        badge: 'Early Stage',
        title: 'Aspiring and early-stage founders',
        detail:
          'Founders with a problem statement or market insight who need support with ideation, prototyping, branding, launch, and early traction.',
      },
      {
        badge: 'Validation & Traction',
        title: 'Startups with an MVP or early traction',
        detail:
          'Businesses that have an existing product, early customer feedback, or paying customers and require support with positioning, branding, sales, or operations.',
      },
      {
        badge: 'Scale & Expansion',
        title: 'Scalable digital and product ventures',
        subtitle: 'Categories:',
        categories: [
          'D2C, F&B and FMCG brands.',
          'IoT and hardware innovators.',
          'SaaS and technology-driven products.',
          'Creator-led and digital-first businesses.',
        ],
      },
    ],
  },
  selectionProcess: {
    eyebrow: 'Pathway',
    title: 'Selection process',
    intro: 'A clear four-step route from founder application to programme onboarding.',
    steps: [
      {
        term: 'Application',
        detail: 'Submit an application through the RAC Startup Portal.',
      },
      {
        term: 'Internal screening',
        detail: 'The RAC team reviews and verifies the application.',
      },
      {
        term: 'Online interview',
        detail: 'Assess founder clarity, market understanding, commitment, and feasibility.',
      },
      {
        term: 'Final pitch',
        detail: 'Selected applicants present to RAC management with the required documents.',
      },
    ],
  },
  founderOnboarding: {
    eyebrow: 'Curriculum',
    title: 'Founder onboarding',
    intro: "The programme's stated onboarding areas include:",
    areas: [
      'Startup fundamentals.',
      'Market understanding.',
      'MVP and product-building logic.',
      'Branding and positioning.',
      'Sales and pricing frameworks.',
      'Finance and runway management.',
      'Leadership fundamentals.',
      'Tower systems, SOPs, and reporting structure.',
    ],
  },
  growthManager: {
    eyebrow: 'Execution Partner',
    title: 'Dedicated Growth Manager',
    lead: 'Each startup is paired with a dedicated Growth Manager.',
    subtitle: 'The responsibilities include:',
    responsibilities: [
      'Tracking KPIs and milestones.',
      'Coordinating technology, marketing, sales, finance, and legal teams.',
      'Supporting fundraising and investor conversations.',
      'Conducting regular progress reviews.',
    ],
  },
  growthRoadmap: {
    eyebrow: 'Milestone Path',
    title: 'Growth Roadmap',
    description:
      'A 12-month startup roadmap has been proposed covering burn, breakeven, return, and profit, with an optional extension of up to 18 months for correction or optimisation along with a peer environment of 30 to 50 founders per floor.',
  },
  // Pillars retained for Story.jsx compatibility
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

export const floorConcept = {
  eyebrow: 'Floor-Wise Concept',
  title: 'Facilities and Floor-Wise Concept',
  intro:
    'A 10-floor, professionally managed destination bringing together dedicated functional levels for work, creation, innovation, events, and wellness under one address.',
  floors: [
    {
      level: 'Ground Floor',
      tag: 'Floor 00',
      title: 'Reception, Help Desk and Richersip Café',
      description:
        'The ground floor is designed as the main reception and visitor-facing area.',
      facilities: [
        'Help desk and visitor support.',
        'Richersip Café.',
        'Waiting lounge.',
        'Space for informal discussions and networking.',
      ],
    },
    {
      level: 'Floors 01 and 02',
      tag: 'Floors 01 & 02',
      title: 'Co-working and Collaboration',
      description:
        'These floors are designed for startups, freelancers, and business teams with more than 160 flexible workstations across these floors and a capacity figure of 320+ seats.',
      capacity: '160+ flexible workstations · 320+ seats capacity',
      facilities: [
        'Flexible workstations.',
        'Meeting pods.',
        'Mini conference hall.',
        'Lounge area.',
        'Informal discussion and collaboration spaces.',
      ],
    },
    {
      level: 'Floor 03',
      tag: 'Floor 03',
      title: 'Co-working and Growth Services',
      description:
        'This floor combines workspaces with business support functions.',
      facilities: [
        'Growth And Floor Manager Cabins.',
        'Main Workstations.',
        'Meeting Pods.',
        'Conference Room.',
        'Workstation Lounge.',
      ],
    },
    {
      level: 'Floor 04',
      tag: 'Floor 04',
      title: 'Convention and Networking Hall',
      description:
        'The convention and networking facility is intended for startup pitches, investor meetings, and professional events.',
      facilities: [
        'Convention Halls.',
        'VIP Lounge.',
        'Guest Rooms.',
      ],
    },
    {
      level: 'Floor 05',
      tag: 'Floor 05',
      title: 'Marketing and Brand Innovation Hub',
      description:
        'A dedicated creative and production hub supporting branding, media, and digital execution.',
      facilities: [
        'Open Studio.',
        'Marketing Desk.',
        'Podcast Studio.',
        'Production Suite.',
        'Creative Studios.',
        'Seating Area.',
        'Open-Air Space.',
      ],
    },
    {
      level: 'Floor 06',
      tag: 'Floor 06',
      title: 'Software and Hardware Innovation Labs',
      description:
        'Specialised technical workspaces and high-spec laboratories for advanced engineering.',
      facilities: [
        'IT Workspace.',
        'Conference Room.',
        'Waiting Area.',
        'AI & High-Spec Lab.',
        'Lounge Area.',
        'Innovation Lab.',
      ],
    },
    {
      level: 'Floor 07',
      tag: 'Floor 07',
      title: 'Wellness and Creativity Zone',
      description:
        'The floor is intended for fitness, relaxation, and recreation.',
      facilities: [
        'Fitness Area.',
        'Yoga/Meditation Hall.',
        'VR and Gaming Zone.',
        'Library.',
        'Mind Peace Center.',
      ],
    },
    {
      level: 'Floor 08',
      tag: 'Floor 08',
      title: 'Corporate and Investor Offices',
      description:
        'This floor is described as the corporate hub within RAC Tower.',
      facilities: [
        'Large conference room.',
        'Office cabins.',
        'Waiting areas.',
        'Executive lounge.',
        'Chairman Cabin.',
      ],
    },
    {
      level: 'Rooftop — Floor 09',
      tag: 'Floor 09',
      title: 'Food Court and F&B Innovation Zone',
      description:
        'The rooftop is presented as a food, hospitality, and networking area.',
      facilities: [
        'Food court with multiple outlets.',
        'Cloud kitchens.',
        'Food and beverage research centre.',
        'Social and networking space.',
      ],
    },
  ],
}
