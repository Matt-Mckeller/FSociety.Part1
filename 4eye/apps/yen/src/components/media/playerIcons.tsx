"use client";

/**
 * Player glyphs, drawn rather than imported.
 *
 * The stock Material set is fine and belongs to nobody — a Material play
 * triangle on a 4eye surface says "there is a video here" and nothing else. The
 * player is the most-looked-at control on this page, so its glyphs are built on
 * the same geometry as the rest of the brand: a 24-box, 2px strokes, round caps,
 * and the faceted-triangle motif that runs through the character marks.
 *
 * All of them take colour from `currentColor` and size from one prop, so a
 * control can tint a glyph by setting text colour and never has to thread a
 * palette through.
 */

import * as React from "react";

export interface GlyphProps {
  size?: number;
  title?: string;
  style?: React.CSSProperties;
  className?: string;
}

function Glyph({ size = 20, title, children, style, className }: GlyphProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      focusable="false"
      style={{ display: "block", flexShrink: 0, ...style }}
      className={className}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/** Play — the brand's faceted triangle rather than a solid wedge. */
export function PlayGlyph(p: GlyphProps) {
  return (
    <Glyph {...p}>
      <path d="M7.5 4.9 L19.2 12 L7.5 19.1 Z" fill="currentColor" fillOpacity={0.16} />
      <path d="M7.5 4.9 L19.2 12 L7.5 19.1 Z" />
      <path d="M7.5 12 H19.2" opacity={0.35} />
    </Glyph>
  );
}

export function PauseGlyph(p: GlyphProps) {
  return (
    <Glyph {...p}>
      <path d="M9 5 V19" />
      <path d="M15 5 V19" />
      <path d="M9 5 V19" strokeWidth={5} strokeOpacity={0.14} />
      <path d="M15 5 V19" strokeWidth={5} strokeOpacity={0.14} />
    </Glyph>
  );
}

export function ReplayGlyph(p: GlyphProps) {
  return (
    <Glyph {...p}>
      <path d="M20 12 A8 8 0 1 1 17 5.8" />
      <path d="M17.4 2.6 L17.4 6.4 L13.6 6.4" />
    </Glyph>
  );
}

/** Chapters — the segment rail, drawn as the marks it puts on the scrubber. */
export function ChaptersGlyph(p: GlyphProps) {
  return (
    <Glyph {...p}>
      <path d="M3 12 H21" opacity={0.4} />
      <path d="M6.5 8.4 V15.6" />
      <path d="M12 8.4 V15.6" />
      <path d="M17.5 8.4 V15.6" />
    </Glyph>
  );
}

/** Languages — a globe whose meridians read as a spoken-word arc. */
export function LanguagesGlyph(p: GlyphProps) {
  return (
    <Glyph {...p}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M3.4 12 H20.6" opacity={0.6} />
      <path d="M12 3.4 C9.4 6 8.2 9 8.2 12 C8.2 15 9.4 18 12 20.6" />
      <path d="M12 3.4 C14.6 6 15.8 9 15.8 12 C15.8 15 14.6 18 12 20.6" opacity={0.6} />
    </Glyph>
  );
}

/** Versions — a commit on a branch, the same shape the version list draws. */
export function BranchGlyph(p: GlyphProps) {
  return (
    <Glyph {...p}>
      <circle cx="7" cy="18" r="2.4" />
      <circle cx="7" cy="6" r="2.4" />
      <circle cx="17" cy="9.5" r="2.4" />
      <path d="M7 8.4 V15.6" />
      <path d="M7 11.5 C11.5 11.5 14.6 11 14.6 9.5" opacity={0.7} />
    </Glyph>
  );
}

/**
 * Commentary — a person inside a second frame, which is literally what the
 * feature does: a window with the presenter in it, over the recording.
 */
export function CommentaryGlyph(p: GlyphProps) {
  return (
    <Glyph {...p}>
      <rect x="2.6" y="4.4" width="18.8" height="13.2" rx="2.2" opacity={0.45} />
      <rect x="12.4" y="10.4" width="9" height="9.2" rx="2" fill="currentColor" fillOpacity={0.12} />
      <circle cx="16.9" cy="13.6" r="1.5" />
      <path d="M14 18.4 C14 16.8 15.3 15.9 16.9 15.9 C18.5 15.9 19.8 16.8 19.8 18.4" />
    </Glyph>
  );
}

export function MutedGlyph(p: GlyphProps) {
  return (
    <Glyph {...p}>
      <path d="M4 9.4 H7.4 L12 5.6 V18.4 L7.4 14.6 H4 Z" fill="currentColor" fillOpacity={0.14} />
      <path d="M16 9.6 L21 14.4 M21 9.6 L16 14.4" />
    </Glyph>
  );
}

export function SoundGlyph(p: GlyphProps) {
  return (
    <Glyph {...p}>
      <path d="M4 9.4 H7.4 L12 5.6 V18.4 L7.4 14.6 H4 Z" fill="currentColor" fillOpacity={0.14} />
      <path d="M15.6 9.2 C16.9 10.6 16.9 13.4 15.6 14.8" />
      <path d="M18.4 6.8 C20.8 9.2 20.8 14.8 18.4 17.2" opacity={0.55} />
    </Glyph>
  );
}

export function ExpandGlyph(p: GlyphProps) {
  return (
    <Glyph {...p}>
      <path d="M9 3.6 H3.6 V9" />
      <path d="M15 3.6 H20.4 V9" />
      <path d="M9 20.4 H3.6 V15" />
      <path d="M15 20.4 H20.4 V15" />
    </Glyph>
  );
}

/** Music layer — waveform under a talk track (the bed, not the voice). */
export function MusicLayerGlyph(p: GlyphProps) {
  return (
    <Glyph {...p}>
      <path d="M4 14 V10" />
      <path d="M8 16.5 V7.5" />
      <path d="M12 18 V6" />
      <path d="M16 15.5 V8.5" />
      <path d="M20 13.5 V10.5" />
      <path d="M3.5 19.5 H20.5" opacity={0.35} />
    </Glyph>
  );
}

/** Tag — the auto-derived subject chips. */
export function TagGlyph(p: GlyphProps) {
  return (
    <Glyph {...p}>
      <path d="M3.4 11.2 V4.6 A1.2 1.2 0 0 1 4.6 3.4 H11.2 L20.6 12.8 A1.4 1.4 0 0 1 20.6 14.8 L14.8 20.6 A1.4 1.4 0 0 1 12.8 20.6 Z" />
      <circle cx="7.6" cy="7.6" r="1.4" fill="currentColor" />
    </Glyph>
  );
}
