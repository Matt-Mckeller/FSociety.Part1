import { defineSeed, ImageModel } from '../seed.kit.js';

/**
 * S1-F — Gear Accumulation Triptych: v5 variant.
 *
 * This is a COMBO iteration combining the best elements from v3 and v4:
 *
 * FROM v3 v2 (assetId 7b1c3c195bf31ee8):
 *   - Overall composition, color palette, lighting, atmosphere
 *   - Student characters, poses, expressions
 *   - The concentric circles icon (Panel 1)
 *   - The square + antenna icon (Panel 3)
 *
 * FROM v4 v2 (assetId aac41db66639dca0):
 *   - The TRIANGLE icon design (Panel 2) — lock this specific triangle style
 *   - The "icons at the bottom together" arrangement — all three brand geometry
 *     icons displayed together at the bottom of the frame in a row, rather than
 *     scattered across panels
 *
 * After generation:
 *   pnpm -F @4eye/scene-studio-api cli asset:promote <chosen-id> \
 *     --to 01_scene_keyframes --star --scene-code S1-F
 *
 * Usage:
 *   pnpm -F @4eye/scene-studio-api cli seed:run s1-f5-gear-accumulation-v5 --dry-run
 *   pnpm -F @4eye/scene-studio-api cli seed:run s1-f5-gear-accumulation-v5 --variations 2
 */
export default defineSeed({
  id: 's1-f5-gear-accumulation-v5',
  description:
    'GENERATE · S1-F v5 — Combo: v3 base + v4 triangle style + bottom-row icon arrangement',
  kind: 'generate',
  sceneCode: 'S1-F',
  title: 'S1-F — Gear Accumulation Triptych (v5: v3 base with v4 triangle + bottom icon row)',
  tags: ['scene-1', 'beat-1.6', 'gear-accumulation', 'triptych', 'variant', 'v5', 'brand-geometry', 'combo'],
  references: [
    {
      kind: 'image',
      ref: 'assetId:7b1c3c195bf31ee8',
      role: 'style-reference',
      description:
        'S1-F v3 v2 — the PRIMARY BASE IMAGE. ' +
        'Use this for: overall composition, lighting, color grading, student characters, ' +
        'poses, expressions, background atmosphere, the concentric circles icon design (Panel 1), ' +
        'and the square + antenna icon design (Panel 3). ' +
        'This has the best overall look and feel.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'assetId:aac41db66639dca0',
      role: 'icon-reference',
      description:
        'S1-F v4 v2 — TRIANGLE ICON SOURCE + LAYOUT REFERENCE. ' +
        'Extract TWO specific elements from this image: ' +
        '(1) The EXACT triangle icon design shown in Panel 2 — the amber upward-pointing ' +
        'equilateral triangle with its distinctive double-outline, inner inverted triangle accent, ' +
        'and apex orb. This triangle style MUST be locked and replicated exactly in the output. ' +
        '(2) The ICON ARRANGEMENT — all three brand geometry icons are displayed TOGETHER ' +
        'at the BOTTOM of the frame in a horizontal row, not scattered across individual panels.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'sceneCode:BRAND-SHAPES-GEAR',
      role: 'icon-reference',
      description:
        'Brand geometry icon reference sheet — confirms the visual forms of all three icons: ' +
        'concentric circles (cyan), upward triangle (amber), and square + antenna (cyan-amber).',
      required: true,
    },
    {
      kind: 'image',
      ref: 'tag:4eye-reference:starred',
      role: 'style-lock',
      description:
        'Starred 4eye visual style reference — ensures illustration style and palette consistency.',
      required: true,
    },
  ],
  preconditions: [
    { ref: 'assetId:7b1c3c195bf31ee8', exists: true },
    { ref: 'assetId:aac41db66639dca0', exists: true },
    { ref: 'sceneCode:BRAND-SHAPES-GEAR', exists: true },
    { ref: 'tag:4eye-reference:starred', exists: true },
  ],
  prompt: `
TASK: Generate S1-F v5 — a COMBO variant that takes the best elements from two prior iterations.

This is a three-panel triptych showing gear accumulation across three students. The base composition 
and atmosphere come from v3 v2, but the triangle icon design and the bottom-row icon arrangement 
come from v4 v2.

━━━ BASE COMPOSITION (FROM V3 V2) ━━━

Use the first provided reference (assetId 7b1c3c195bf31ee8, v3 v2) as the foundation:
  • Three-panel triptych layout, widescreen aspect ratio (1672 × 941 px)
  • Three student characters: left, middle, right panels
  • All student faces, skin tones, expressions, hair, clothing, poses
  • Background atmosphere: dark studio, warm/cool glow escalation across panels
  • Overall color grading, lighting direction, painterly anime illustration style
  • The 1:2:3 glow intensity rhythm (each panel brighter than the previous)
  • HUD labels, stat words, and any existing text from v3 v2

━━━ ICON CHANGES (COMBO FROM V3 V2 + V4 V2) ━━━

THREE brand geometry icons must be displayed. The icons come from different sources:

  ICON 1 — CONCENTRIC CIRCLES (from v3 v2):
    Use the circle icon design as shown in v3 v2.
    • 4 evenly-spaced cyan (#00e5ff) rings radiating outward from a bright glowing centre orb
    • Faint compass tick marks at N/E/S/W on the outer ring
    • Soft cyan halo glow
    Keep this icon design exactly as it appears in v3 v2.

  ICON 2 — UPWARD TRIANGLE (from v4 v2) — **LOCKED STYLE**:
    Use the triangle icon design EXACTLY as shown in the second reference (assetId aac41db66639dca0, v4 v2).
    • Amber (#ffab40) equilateral triangle pointing upward
    • Double-outlined edges with visible line thickness
    • A smaller inverted triangle (point-down) as an inner accent mark
    • Small glowing amber orb at the apex
    • Warm amber halo glow
    **This triangle design MUST match v4 v2's triangle exactly. Do not improvise or simplify.**

  ICON 3 — SQUARE + ANTENNA (from v3 v2):
    Use the square + antenna icon design as shown in v3 v2.
    • Two nested rounded-corner squares:
        - Outer square: cyan (#00e5ff)
        - Inner ring / middle square: amber (#ffab40)
        - Centre fill: dark (#0d1117) with a bright cyan centre orb
    • 4eye-style antenna rising from the top edge:
        - Small dark base nub at the top-centre of the outer square
        - Thin dark (#2d2d44) vertical stem line extending upward
        - Small bright cyan glowing bulb at the tip of the stem
        - One or two faint cyan broadcast/pulse rings expanding outward from the bulb
    • 4 small cyan accent dots at the four corners of the outer square
    • Duotone cyan-amber halo glow
    Keep this icon design exactly as it appears in v3 v2.

━━━ ICON ARRANGEMENT (FROM V4 V2) ━━━

The three icons must be arranged TOGETHER at the BOTTOM of the frame in a horizontal row.

  • Do NOT scatter the icons across individual panels (as in earlier versions).
  • Instead, display all three icons side-by-side in a single row at the bottom-centre of the image.
  • The icons should be evenly spaced, roughly equal in size, and aligned horizontally.
  • This bottom-row arrangement is shown in the second reference (v4 v2) — match that layout.

━━━ CONSTRAINTS ━━━

  • Aspect ratio: widescreen 1672 × 941 px.
  • Three panels, three students, same triptych structure as v3 v2.
  • Painterly anime illustration style; soft shading, clean expressive linework.
  • Hero cyan-amber palette; dark studio background.
  • No additional UI elements, badges, or decorations not described above.
  • The triangle icon from v4 v2 is locked — replicate it exactly.

━━━ WHAT THIS COMBO ACHIEVES ━━━

  • Best composition and atmosphere: v3 v2
  • Best triangle icon design: v4 v2
  • Best icon arrangement (all together at bottom): v4 v2
  • Best circle and square icon designs: v3 v2
`.trim(),
  params: {
    model: ImageModel.GeminiProImagePreview,
    variations: 2,
  },
});
