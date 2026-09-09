/**
 * One small stroke-icon library, mapped by each facility item's exact term
 * (from content.js) rather than by group — a few concepts (meetings,
 * leadership, informal chat) repeat across groups and share an icon on
 * purpose. Every icon shares the same 20x20 viewBox and stroke weight as the
 * check/cross icons already used elsewhere, so the set reads as one family.
 */

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }

const paths = {
  desk: <path d="M2 14V6h16v8M2 14h16M5 14v2M15 14v2M2 9h16" {...stroke} />,
  door: <path d="M5 2h10v16H5zM12 10v.01" {...stroke} />,
  star: <path d="M10 2l2.2 4.9 5.3.6-4 3.6 1.1 5.2L10 13.7l-4.6 2.6 1.1-5.2-4-3.6 5.3-.6z" {...stroke} />,
  users: (
    <>
      <circle cx="7" cy="7" r="2.6" {...stroke} />
      <path d="M2 17c0-3 2.2-5 5-5s5 2 5 5" {...stroke} />
      <circle cx="15" cy="8" r="2" {...stroke} />
      <path d="M13 17c.2-2.3 1.6-4 3.6-4 1.8 0 3.1 1.2 3.4 3" {...stroke} />
    </>
  ),
  presentation: (
    <>
      <rect x="2" y="3" width="16" height="10" rx="1" {...stroke} />
      <path d="M7 17h6M10 13v4" {...stroke} />
    </>
  ),
  chat: (
    <>
      <path d="M2 4h11v8H7l-3 3v-3H2z" {...stroke} />
      <path d="M11 8h6l2 2v3h-2v3l-3-3h-3" {...stroke} />
    </>
  ),
  mic: (
    <>
      <rect x="7.5" y="2" width="5" height="9" rx="2.5" {...stroke} />
      <path d="M4.5 9a5.5 5.5 0 0 0 11 0M10 14.5V18M7 18h6" {...stroke} />
    </>
  ),
  video: (
    <>
      <rect x="2" y="5" width="10" height="10" rx="1" {...stroke} />
      <path d="M12 8.5 18 5.5v9L12 11.5" {...stroke} />
    </>
  ),
  brush: <path d="M3 17c0-3 1-5 3-6l9-7 2 2-7 9c-1 2-3 3-6 3z M13 6l1 1" {...stroke} />,
  chip: (
    <>
      <rect x="5" y="5" width="10" height="10" rx="1" {...stroke} />
      <path d="M5 2v3M10 2v3M15 2v3M5 15v3M10 15v3M15 15v3M2 5h3M2 10h3M2 15h3M15 5h3M15 10h3M15 15h3" {...stroke} />
    </>
  ),
  hall: (
    <>
      <rect x="2" y="4" width="16" height="12" rx="1" {...stroke} />
      <path d="M2 9h16M6 9v7M14 9v7" {...stroke} />
    </>
  ),
  roundtable: (
    <>
      <circle cx="10" cy="10" r="4.5" {...stroke} />
      <path d="M10 1v2M10 17v2M1 10h2M17 10h2M3.5 3.5l1.4 1.4M15.1 15.1l1.4 1.4M16.5 3.5l-1.4 1.4M4.9 15.1l-1.4 1.4" {...stroke} />
    </>
  ),
  calendar: (
    <>
      <rect x="2" y="4" width="16" height="14" rx="1.5" {...stroke} />
      <path d="M2 8h16M6 2v4M14 2v4" {...stroke} />
    </>
  ),
  tool: <path d="M12.5 2.5a3.5 3.5 0 0 0-4.6 3.9L2 12.3l2.3 2.3 5.9-5.9a3.5 3.5 0 0 0 3.9-4.6l-2.5 2.5-1.4-1.4z" {...stroke} />,
  dumbbell: <path d="M2 8v4M4 6v8M7 9v2h6V9M16 6v8M18 8v4" {...stroke} />,
  steam: <path d="M6 18c1-2-1-3 0-5M10 18c1-2-1-3 0-5M14 18c1-2-1-3 0-5M6 3c1 2-1 3 0 5M10 3c1 2-1 3 0 5M14 3c1 2-1 3 0 5" {...stroke} />,
  pod: <path d="M10 2a6 6 0 0 1 0 12 6 6 0 0 1 0-12zM4 18h12" {...stroke} />,
  game: (
    <>
      <rect x="2" y="6" width="16" height="9" rx="3" {...stroke} />
      <path d="M6 8.5v4M4 10.5h4M13.5 9v.01M16 11v.01" {...stroke} />
    </>
  ),
  cafe: (
    <>
      <path d="M3 8h11v4a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" {...stroke} />
      <path d="M14 9h1.5a2 2 0 0 1 0 4H14M6 3c-.8.8-.8 1.4 0 2.2M9.5 3c-.8.8-.8 1.4 0 2.2" {...stroke} />
    </>
  ),
  restaurant: (
    <>
      <path d="M4 2v7a2 2 0 0 0 2 2v7M4 2v5M6 2v5M4 6h2M14 2c-1.5 0-2.5 1.5-2.5 4S12.5 9 14 9v9" {...stroke} />
    </>
  ),
  key: (
    <>
      <circle cx="6" cy="10" r="3.5" {...stroke} />
      <path d="M9.3 10H18M14.5 10v3M17 10v2.5" {...stroke} />
    </>
  ),
}

export function FacilityIcon({ name, className = '' }) {
  const el = paths[name] ?? paths.star
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      {el}
    </svg>
  )
}

/** Item term → icon name, covering every facility item verbatim. */
export const TERM_ICON = {
  '300+ workstations.': 'desk',
  'Private offices.': 'door',
  'Executive workspaces.': 'star',
  'Meeting rooms.': 'users',
  'Conference rooms.': 'presentation',
  'Discussion areas.': 'chat',

  'Podcast studios.': 'mic',
  'Video-production facilities.': 'video',
  'Interview spaces.': 'mic',
  'Branding and creative facilities.': 'brush',
  'Technology-focused workspaces.': 'chip',

  '100-seater convention hall.': 'hall',
  '40-seater round-table hall.': 'roundtable',
  'Corporate events.': 'calendar',
  'Workshops.': 'tool',
  'Presentations.': 'presentation',
  'Leadership discussions.': 'star',
  'Professional gatherings.': 'users',

  'Gym.': 'dumbbell',
  'Steam and sauna.': 'steam',
  'Relaxation pods.': 'pod',
  'Recreational areas.': 'game',
  'Gaming zones.': 'game',
  'Premium café.': 'cafe',
  'Rooftop restaurant.': 'restaurant',
  'Informal meeting environments.': 'chat',
  'Hospitality spaces.': 'key',
}
