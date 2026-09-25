/**
 * goalImage — generate a real, self-contained SVG crest image for a goal.
 *
 * No raster assets ship with the repo, so each goal gets a deterministic
 * gradient "crest" with its branded glyph (NOT an emoji) baked in. The glyph
 * markup is shared with <BrandIcon> via ./brand-glyphs, with `currentColor`
 * swapped to white so it reads on the gradient. Returned as a data-URI that
 * drops straight into an <img> / MUI Avatar `src`.
 *
 * When real artwork exists later, set `Goal.imageUrl` directly and this is
 * simply not used.
 */

import { GLYPH_MARKUP, type GlyphName } from "../components/brand-glyphs";

export interface GoalImageOptions {
  /** Branded glyph to render in the crest. */
  glyph: GlyphName;
  /** Gradient start color. */
  from: string;
  /** Gradient end color. */
  to: string;
}

export function goalImage({ glyph, from, to }: GoalImageOptions): string {
  // Crest renders the glyph in white on the gradient.
  const glyphWhite = GLYPH_MARKUP[glyph].replace(/currentColor/g, "#ffffff");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="96" height="96" rx="22" fill="url(#g)"/>
  <circle cx="48" cy="48" r="30" fill="#ffffff" fill-opacity="0.14"/>
  <g transform="translate(24 24) scale(2)">${glyphWhite}</g>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
