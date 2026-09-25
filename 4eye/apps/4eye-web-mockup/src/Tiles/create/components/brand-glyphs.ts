/**
 * brand-glyphs — custom, on-brand SVG glyphs that replace emoji throughout the
 * Seeding tile. ONE source of truth, consumed by:
 *   - <BrandIcon> (inline icons, inherits `currentColor`)
 *   - goalImage() (gradient crest avatars — currentColor is swapped to white)
 *
 * Design language follows the 4ear brand system:
 *   - small → large 1:2:3 growth (grow)
 *   - connecting dots / chain linking (connection)
 *   - expanding shapes, triangles / circles / squares
 *   - darkness → light, protection, positivity
 *
 * Every glyph is authored on a 24×24 grid using `currentColor` so a single
 * markup string works for both a colored inline icon and a white crest glyph.
 */

export type GlyphName =
  | "grow"
  | "trust"
  | "engagement"
  | "connection"
  | "project"
  | "animation"
  | "sequence"
  | "scene"
  | "seed"
  | "prompt"
  | "perspective"
  | "goal"
  | "link"
  | "classroom"
  | "cafe"
  | "vision"
  | "promote"
  | "generate"
  | "history"
  | "live"
  | "rib"
  | "rib-clip"
  | "pur-meow";

/** Inner SVG markup for each glyph, drawn on a 0 0 24 24 viewBox. */
export const GLYPH_MARKUP: Record<GlyphName, string> = {
  // Improve — ascending 1:2:3 growth bars on a baseline.
  grow: `
    <path d="M4.5 19h15" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
    <rect x="5.5" y="13" width="3.4" height="6" rx="1.3" fill="currentColor"/>
    <rect x="10.3" y="9" width="3.4" height="10" rx="1.3" fill="currentColor"/>
    <rect x="15.1" y="5" width="3.4" height="14" rx="1.3" fill="currentColor"/>`,
  // Protect — shield with a verifying check.
  trust: `
    <path d="M12 3.4 19 6.1V11c0 4.7-3 7.7-7 9-4-1.3-7-4.3-7-9V6.1L12 3.4Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" fill="none"/>
    <path d="M9 12.2l2 2 4-4.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  // Innovate — energy spark / bolt.
  engagement: `
    <path d="M13.2 2.6 6 13c-.3.5 0 1.1.6 1.1H10l-1 7.3c-.1.6.7.9 1.1.4l7.3-10.4c.3-.5 0-1.1-.6-1.1H14l1-6.6c.1-.6-.7-.9-1.1-.5Z" fill="currentColor"/>`,
  // Heal — two linked rings, connecting dots.
  connection: `
    <circle cx="9" cy="12" r="4.1" stroke="currentColor" stroke-width="1.7" fill="none"/>
    <circle cx="15" cy="12" r="4.1" stroke="currentColor" stroke-width="1.7" fill="none"/>`,
  // Project — stacked layers / workspace container holding sequences.
  project: `
    <path d="M12 3.2 20.5 7.5 12 11.8 3.5 7.5 12 3.2Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" fill="none"/>
    <path d="M3.5 12 12 16.3 20.5 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M3.5 16.5 12 20.8 20.5 16.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  // Animation — film frame with motion arc (moving picture).
  animation: `
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.4" stroke="currentColor" stroke-width="1.6" fill="none"/>
    <path d="M3.5 9h17M7.5 5.5v3M12 5.5v3M16.5 5.5v3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
    <path d="M10.5 12.4v3.6l3.4-1.8z" fill="currentColor"/>`,
  // Sequence — film frame with a play triangle.
  sequence: `
    <rect x="3.5" y="6" width="17" height="12" rx="2.4" stroke="currentColor" stroke-width="1.7" fill="none"/>
    <path d="M10 9.6l5 2.4-5 2.4z" fill="currentColor"/>`,
  // Scene — single framed beat.
  scene: `
    <rect x="4.5" y="4.5" width="15" height="15" rx="3" stroke="currentColor" stroke-width="1.7" fill="none"/>
    <circle cx="12" cy="12" r="2.4" fill="currentColor"/>`,
  // Seed — a sprout, small beginning that grows.
  seed: `
    <path d="M12 21v-7.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
    <path d="M12 13.5c0-3 2.4-5 6-5 0 3-2.4 5-6 5Z" fill="currentColor"/>
    <path d="M12 15.5c0-2.4-1.9-4.3-4.8-4.3 0 2.4 1.9 4.3 4.8 4.3Z" fill="currentColor" fill-opacity="0.65"/>`,
  // Prompt — script / chat bubble with lines.
  prompt: `
    <path d="M4.5 6.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v6.5a2 2 0 0 1-2 2H9.5L6 18.5V15H6.5a2 2 0 0 1-2-2Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" fill="none"/>
    <path d="M8 8.8h8M8 11.6h5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>`,
  // Perspective — an eye / point of view.
  perspective: `
    <path d="M2.6 12S6 5.8 12 5.8 21.4 12 21.4 12 18 18.2 12 18.2 2.6 12 2.6 12Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" fill="none"/>
    <circle cx="12" cy="12" r="2.5" fill="currentColor"/>`,
  // Goal — target rings.
  goal: `
    <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.7" fill="none"/>
    <circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.7" fill="none"/>
    <circle cx="12" cy="12" r="1.4" fill="currentColor"/>`,
  // Link — paperclip / association hint.
  link: `
    <path d="M8.5 12.5 14 7a3 3 0 0 1 4.2 4.2l-6.8 6.8a4.7 4.7 0 0 1-6.6-6.6l6.8-6.8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  // Classroom — board + ascending learning curve (engagement awakening).
  classroom: `
    <rect x="3.5" y="4.5" width="17" height="11" rx="2" stroke="currentColor" stroke-width="1.7" fill="none"/>
    <path d="M6.5 12.5c2-4 4.5-4 5.5-2s3 2.5 5.5-2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" fill="none"/>
    <path d="M9 19h6M12 15.5V19" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>`,
  // Cafe — cup with rising warmth (connection).
  cafe: `
    <path d="M5 10h11v4a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-4Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" fill="none"/>
    <path d="M16 11h2.2a2.3 2.3 0 0 1 0 4.6H16" stroke="currentColor" stroke-width="1.7" fill="none"/>
    <path d="M8 4.5c-.7 1 .7 2 0 3M11.5 4.5c-.7 1 .7 2 0 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`,
  // Vision — horizon over water with a rising sun (dream / future).
  vision: `
    <circle cx="12" cy="11" r="3.4" stroke="currentColor" stroke-width="1.7" fill="none"/>
    <path d="M3.5 15.5h17" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
    <path d="M4.5 18.5c1.3-1 2.6-1 3.8 0s2.6 1 3.8 0 2.6-1 3.8 0 2.6 1 3.8 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" fill="none"/>`,
  // Promote — upward chevrons (advance status).
  promote: `
    <path d="M6 13l6-5 6 5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M6 18l6-5 6 5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  // Generate — four-point sparkle (run generation).
  generate: `
    <path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z" fill="currentColor"/>
    <circle cx="18" cy="17.5" r="1.6" fill="currentColor"/>`,
  // History — clock with a rewind arrow (versioning).
  history: `
    <path d="M4.5 9.5A8 8 0 1 1 4 13" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" fill="none"/>
    <path d="M4.5 5v4.5H9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M12 8.5V12l2.6 2.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" fill="none"/>`,
  // Live — broadcast / published.
  live: `
    <circle cx="12" cy="12" r="2.6" fill="currentColor"/>
    <path d="M7.4 7.4a6.5 6.5 0 0 0 0 9.2M16.6 7.4a6.5 6.5 0 0 1 0 9.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" fill="none"/>`,
  // AGI Rib — sternum + rib arcs.
  rib: `
    <path d="M12 4.2 V19.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" fill="none" opacity="0.55"/>
    <path d="M12 6.2 C8.2 6.8 5.4 8.6 4.6 11.2 M12 6.2 C15.8 6.8 18.6 8.6 19.4 11.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" fill="none"/>
    <path d="M12 10 C7.8 10.6 5.2 12.2 4.4 14.6 M12 10 C16.2 10.6 18.8 12.2 19.6 14.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" fill="none" opacity="0.8"/>
    <path d="M12 13.8 C8.4 14.4 6.2 15.8 5.6 17.8 M12 13.8 C15.6 14.4 17.8 15.8 18.4 17.8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" fill="none" opacity="0.65"/>`,
  // Rib + marketing clip — cage with nested play frame.
  "rib-clip": `
    <path d="M12 3.8 V20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.4"/>
    <path d="M12 5.8 C8.6 6.4 6.2 8 5.4 10.2 M12 5.8 C15.4 6.4 17.8 8 18.6 10.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" fill="none"/>
    <path d="M12 9.2 C8.2 9.8 6 11.2 5.2 13.4 M12 9.2 C15.8 9.8 18 11.2 18.8 13.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" fill="none" opacity="0.7"/>
    <rect x="7.2" y="12.2" width="9.6" height="7" rx="1.4" stroke="currentColor" stroke-width="1.5" fill="none"/>
    <path d="M10.4 14.2 V17.2 L14.2 15.7 Z" fill="currentColor"/>`,
  // Pur Meow — cat face + purr waves; logo Emily takes over under 4up.
  "pur-meow": `
    <path d="M7.2 9.2 L5.4 5.6 L9.2 7.4 Z M16.8 9.2 L18.6 5.6 L14.8 7.4 Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/>
    <circle cx="12" cy="13" r="6.2" stroke="currentColor" stroke-width="1.7" fill="none"/>
    <circle cx="9.6" cy="12.2" r="1.1" fill="currentColor"/>
    <circle cx="14.4" cy="12.2" r="1.1" fill="currentColor"/>
    <path d="M10.4 15.2 C11.2 16.2 12.8 16.2 13.6 15.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    <path d="M4.2 18.6 C5.6 17.4 7.2 17.4 8.6 18.6 M15.4 18.6 C16.8 17.4 18.4 17.4 19.8 18.6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none" opacity="0.55"/>`,
};
