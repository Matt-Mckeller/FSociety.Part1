/**
 * Path Format Instructions
 * Rules for formatting Lottie JSON paths correctly
 */

export const pathFormatInstructions = `
EXACT PATH FORMAT:
═══════════════════════════════════════════════════════════════════
- Use precise JavaScript accessor notation with brackets
- Array indices MUST use bracket notation, not dot notation
- Paths must be executable JavaScript property access strings

✅ CORRECT EXAMPLES:
  "layers[1].shapes[0].it[1].c.k"
  "layers[0].shapes[2].it[0].it[0].it[2].c.k"
  "layers[7].layers[0].shapes[3].it[1].c.k"
  "layers[2].ks.s"

❌ WRONG EXAMPLES (DO NOT USE):
  "layers.1.shapes.0.it.1.c.k"        // Don't use dot notation for arrays
  "layers[1]/shapes[0]/it[1]/c/k"     // Don't use slashes
  "layers[1]shapes[0]it[1]c.k"        // Missing dots between properties
  "assets[0].layers[0].shapes[0].it[1].c.k" // Points to asset template, not rendered data. See precomp instructions.

PATH STRUCTURE PATTERNS:
- Solid fill color:     "layers[X].shapes[Y].it[Z].c.k"
- Gradient fill:        "layers[X].shapes[Y].it[Z].g.k.k"
- Stroke color:         "layers[X].shapes[Y].it[Z].c.k" (with ty: "st")
- Transform property:   "layers[X].ks.s" (scale), "layers[X].ks.r" (rotation)
- Layer reference:      "layers[X]"
- Precomp embedded:     "layers[X].layers[Y].shapes[Z]..." (see precomp-detection.ts)

VALIDATION:
- Path should be copy-pasteable into JavaScript code
- Path should work with: eval(\`lottieData.\${path}\`)
- No spaces, special characters except . [ ] digits
`
