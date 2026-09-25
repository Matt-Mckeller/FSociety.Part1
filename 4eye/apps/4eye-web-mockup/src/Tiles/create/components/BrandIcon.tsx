/**
 * BrandIcon — renders an on-brand SVG glyph that inherits `currentColor`.
 *
 * Replaces emoji throughout the Seeding tile with crisp, brand-aligned
 * iconography. Glyph paths live in ./brand-glyphs (single source of truth,
 * shared with the goal crest generator).
 */

import * as React from "react";
import Box from "@mui/material/Box";
import { GLYPH_MARKUP, type GlyphName } from "./brand-glyphs";

export interface BrandIconProps {
  name: GlyphName;
  /** Pixel size (square). Defaults to 20. */
  size?: number;
  /** Color. Defaults to `currentColor` (inherits from text). */
  color?: string;
  /** Optional extra sx applied to the wrapping svg box. */
  title?: string;
}

export function BrandIcon({ name, size = 20, color, title }: BrandIconProps) {
  return (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      sx={{
        width: size,
        height: size,
        display: "inline-block",
        flexShrink: 0,
        color: color ?? "inherit",
        verticalAlign: "middle",
      }}
      dangerouslySetInnerHTML={{ __html: GLYPH_MARKUP[name] }}
    />
  );
}

export type { GlyphName };
