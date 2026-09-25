/**
 * Color Format Instructions
 * Rules for converting and formatting Lottie colors
 */

export const colorFormatInstructions = `
COLOR FORMAT REQUIREMENTS:
═══════════════════════════════════════════════════════════════════
All colors MUST use hex format with alpha channel: "#rrggbbaa"

STRUCTURE:
- Format: "#rrggbbaa" (8 characters after #)
- rr = red channel (00-ff hex)
- gg = green channel (00-ff hex)
- bb = blue channel (00-ff hex)
- aa = alpha channel (00-ff hex)

ALPHA CHANNEL VALUES:
- 00 = fully transparent (0% opacity)
- 80 = 50% transparent (50% opacity)
- ff = fully opaque (100% opacity)

CONVERSION FROM LOTTIE:
Lottie stores colors as arrays of 0-1 range values: [r, g, b, a]
Convert each value: multiply by 255, then convert to 2-digit hex

EXAMPLES:
  Lottie [0.62, 0.70, 0.86, 1]   → "#9eb2dcff"
    0.62 * 255 = 158 = 0x9e
    0.70 * 255 = 178 = 0xb2
    0.86 * 255 = 219 = 0xdc
    1.00 * 255 = 255 = 0xff
    
  Lottie [1, 1, 1, 0.5]          → "#ffffff80"
    1 * 255 = 255 = 0xff (white)
    0.5 * 255 = 128 = 0x80 (50% opacity)
    
  Lottie [0, 0, 0, 0]            → "#00000000"
    All zeros = fully transparent black

COMMON COLORS:
  Solid Red:        "#ff0000ff"
  Solid Green:      "#00ff00ff"
  Solid Blue:       "#0000ffff"
  Solid White:      "#ffffffff"
  Solid Black:      "#000000ff"
  Transparent:      "#00000000"
  Semi-transparent: "#rrggbb80" (any color with 80)
`

export const colorExtractionRules = `
COLOR EXTRACTION RULES:
═══════════════════════════════════════════════════════════════════

1. SOLID FILLS (ty: "fl"):
   - Look for: path ending with .c.k
   - Value type: Array of [r, g, b, a] in 0-1 range
   - Convert to: "#rrggbbaa" hex string
   - Example: [0.5, 0.5, 0.5, 1] → "#808080ff"

2. SOLID STROKES (ty: "st"):
   - Look for: path ending with .c.k
   - Value type: Array of [r, g, b, a] in 0-1 range
   - Convert to: "#rrggbbaa" hex string
   - Same as fills, but ty: "st" instead of "fl"

3. GRADIENT FILLS (ty: "gf"):
   - Look for: path ending with .g.k.k
   - Value type: Flat array (see gradient-extraction.ts)
   - Convert to: Array of {offset, color} objects
   - Example: See gradient-extraction.ts

4. GRADIENT STROKES (ty: "gs"):
   - Look for: path ending with .g.k.k
   - Value type: Flat array (see gradient-extraction.ts)
   - Convert to: Array of {offset, color} objects
   - Same as gradient fills, but ty: "gs"

5. NON-THEMEABLE ELEMENTS:
   - Layers (no color data)
   - Groups (container elements)
   - Transforms (scale, rotation, position)
   - Masks
   - Set originalColor = null

IDENTIFYING ELEMENT TYPE BY PATH:
- Ends with .c.k     → Solid color (fill or stroke, check ty)
- Ends with .g.k.k   → Gradient color
- Ends with .ks.s    → Transform (scale)
- Ends with .ks.r    → Transform (rotation)
- Ends with .ks.p    → Transform (position)
- Just layers[X]     → Layer reference (non-themeable)
`
