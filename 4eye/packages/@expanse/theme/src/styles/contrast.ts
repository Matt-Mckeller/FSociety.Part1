/**
 * WCAG 2.1 contrast utilities. General-purpose — not tied to any one product
 * surface — so any accent color can be checked or auto-corrected against a
 * given background instead of hand-tuning light/dark variants by eye.
 */

export type RGB = [number, number, number];
export type RGBA = [number, number, number, number];

function parseToRgba(color: string): RGBA {
  const c = color.trim();
  if (c.startsWith("#")) {
    let h = c.slice(1);
    if (h.length === 3) h = h.split("").map((x) => x + x).join("");
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), 1];
  }
  const m = c.match(/rgba?\(([^)]+)\)/);
  if (m) {
    const parts = m[1].split(",").map((s) => parseFloat(s.trim()));
    return [parts[0], parts[1], parts[2], parts.length > 3 ? parts[3] : 1];
  }
  throw new Error(`contrast.ts: cannot parse color "${color}"`);
}

/** Alpha-composites `fg` over opaque `bg`, returning an opaque RGB. */
function compositeOver(fg: string, bg: string): RGB {
  const [fr, fgc, fb, fa] = parseToRgba(fg);
  const [br, bgc, bb] = parseToRgba(bg);
  if (fa >= 1) return [fr, fgc, fb];
  return [fr * fa + br * (1 - fa), fgc * fa + bgc * (1 - fa), fb * fa + bb * (1 - fa)];
}

function parseToRgb(color: string): RGB {
  const [r, g, b] = parseToRgba(color);
  return [r, g, b];
}

function toHex([r, g, b]: RGB): string {
  return "#" + [r, g, b].map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0")).join("");
}

/** WCAG relative luminance, 0 (black) – 1 (white). */
export function relativeLuminance(color: string): number {
  const [r, g, b] = parseToRgb(color).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * WCAG contrast ratio between `a` (foreground, may be semi-transparent —
 * alpha-composited over `b` first) and `b` (background, assumed opaque),
 * 1 (none) – 21 (max).
 */
export function contrastRatio(a: string, b: string): number {
  const composited = compositeOver(a, b);
  const l1 = relativeLuminance(toHex(composited));
  const l2 = relativeLuminance(b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function rgbToHsl([r, g, b]: RGB): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r: h = ((g - b) / d) % 6; break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return [h, s, l];
}

function hslToRgb(h: number, s: number, l: number): RGB {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let [r, g, b] = [0, 0, 0];
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}

/**
 * Alpha-composites a (possibly translucent) `fg` over opaque `bg`, returning
 * an opaque hex color — e.g. to find the effective background a translucent
 * tile fill presents to text/icons drawn on top of it, before checking that
 * text against it with `ensureContrast`.
 */
export function compositeOverHex(fg: string, bg: string): string {
  return toHex(compositeOver(fg, bg));
}

/** Extracts a color's hue (0-360) — e.g. to spread swatches around a theme's brand hue. */
export function hue(color: string): number {
  const [h] = rgbToHsl(parseToRgb(color));
  return h;
}

/** Builds a hex color from HSL (h: 0-360, s/l: 0-1) — the inverse of `hue`. */
export function hslToHex(h: number, s: number, l: number): string {
  return toHex(hslToRgb(h, s, l));
}

/**
 * Returns `fg` unchanged if it already meets `targetRatio` against `bg`.
 * Otherwise walks its HSL lightness toward black or white (whichever the
 * background calls for) until the ratio is met, preserving hue/saturation
 * so the corrected color still reads as "the same accent," just legible.
 */
export function ensureContrast(fg: string, bg: string, targetRatio: number): string {
  if (contrastRatio(fg, bg) >= targetRatio) return fg;

  const rgb = parseToRgb(fg);
  const [h, s, l] = rgbToHsl(rgb);
  const bgIsLight = relativeLuminance(bg) > 0.5;
  // Walk lightness toward 0 (on a light bg) or 1 (on a dark bg) in small steps.
  const step = bgIsLight ? -0.01 : 0.01;
  let candidateL = l;
  for (let i = 0; i < 100; i++) {
    candidateL = Math.min(1, Math.max(0, candidateL + step));
    const candidate = toHex(hslToRgb(h, s, candidateL));
    if (contrastRatio(candidate, bg) >= targetRatio) return candidate;
    if (candidateL <= 0 || candidateL >= 1) break;
  }
  // Couldn't hit the target within [0,1] lightness (rare, very low-contrast hue) — return the closest attempt.
  return toHex(hslToRgb(h, s, candidateL));
}
