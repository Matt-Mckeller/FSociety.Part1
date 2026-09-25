import { defineSeed, ImageModel } from '../seed.kit.js';

/**
 * S1-F — Gear Accumulation Triptych: v6 variant.
 *
 * This refines v5 v2 with specific label and symbol updates from other versions:
 *
 * FROM v5 v2 (assetId 83a4b8c986b1db08):
 *   - Overall composition, all three panels, student characters
 *   - Three brand geometry icons at the bottom in a horizontal row
 *   - Layout, framing, lighting
 *
 * FROM v5 v1 (assetId e3185134bba04eb0):
 *   - Top right panel: "Potential Unlocked" / "Full Synchronization" label style
 *   - "Clarity" label style (clean, readable typography)
 *
 * FROM v2 (assetId c7781e11422192dc):
 *   - The awakening core symbol design
 *
 * LABEL UPDATES:
 *   - Middle panel (Stability Band): "Foundation Set +15%"
 *
 * After generation:
 *   pnpm -F @4eye/scene-studio-api cli asset:promote <chosen-id> \
 *     --to 01_scene_keyframes --star --scene-code S1-F
 *
 * Usage:
 *   pnpm -F @4eye/scene-studio-api cli seed:run s1-f6-gear-accumulation-v6 --dry-run
 *   pnpm -F @4eye/scene-studio-api cli seed:run s1-f6-gear-accumulation-v6 --variations 2
 */
export default defineSeed({
  id: 's1-f6-gear-accumulation-v6',
  description:
    'GENERATE · S1-F v6 — Refine v5 v2: Potential Unlocked style + Clarity labels + awakening core from v2 + Foundation Set label',
  kind: 'generate',
  sceneCode: 'S1-F',
  title: 'S1-F — Gear Accumulation Triptych (v6: v5 v2 refinements)',
  tags: ['scene-1', 'beat-1.6', 'gear-accumulation', 'triptych', 'variant', 'v6', 'brand-geometry', 'label-refinement'],
  references: [
    {
      kind: 'image',
      ref: 'assetId:83a4b8c986b1db08',
      role: 'style-reference',
      description:
        'S1-F v5 v2 — the PRIMARY BASE IMAGE. ' +
        'Use this for: overall composition, all three panels, student characters (left, middle, right), ' +
        'poses, expressions, clothing, lighting, atmosphere, color grading. ' +
        'The three brand geometry icons (circle, triangle, square+antenna) are displayed together ' +
        'at the bottom of the frame in a horizontal row — keep this exact layout. ' +
        'This is the foundation; only specific labels and the awakening core symbol will change.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'assetId:e3185134bba04eb0',
      role: 'style-reference',
      description:
        'S1-F v5 v1 — LABEL STYLE REFERENCE. ' +
        'Extract the following UI label styles from this image: ' +
        '(1) Top right panel: The "Potential Unlocked" / "Full Synchronization" label design — ' +
        'clean, prominent, readable typography with a subtle glow or background accent. ' +
        'Use this style for the top right panel in the output. ' +
        '(2) "Clarity" label style — the typography, weight, color, and layout used for this label. ' +
        'Apply this style to labels in the output where appropriate.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'assetId:c7781e11422192dc',
      role: 'icon-reference',
      description:
        'S1-F v2 — AWAKENING CORE SYMBOL SOURCE. ' +
        'Extract the awakening core symbol design from this image and use it in the output. ' +
        'The awakening core is a central focal symbol or icon — match its exact visual form, ' +
        'color palette, glow effects, and placement style as shown in v2.',
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
    { ref: 'assetId:83a4b8c986b1db08', exists: true },
    { ref: 'assetId:e3185134bba04eb0', exists: true },
    { ref: 'assetId:c7781e11422192dc', exists: true },
    { ref: 'sceneCode:BRAND-SHAPES-GEAR', exists: true },
    { ref: 'tag:4eye-reference:starred', exists: true },
  ],
  prompt: `
TASK: Generate S1-F v6 — refine v5 v2 with targeted label and symbol updates from other iterations.

This is a three-panel triptych. Reproduce v5 v2 (assetId 83a4b8c986b1db08) as the base, with ONLY the specific changes described below.

━━━ BASE IMAGE (V5 V2) ━━━

Use v5 v2 (first reference, assetId 83a4b8c986b1db08) as the foundation:
  • Three-panel triptych layout, widescreen aspect ratio (1672 × 941 px)
  • Three student characters: left panel, middle panel, right panel
  • All student faces, skin tones, expressions, hair, clothing, body poses
  • Background atmosphere, lighting, color grading — exactly as in v5 v2
  • Three brand geometry icons (concentric circles, upward triangle, square + antenna) displayed together 
    at the BOTTOM of the frame in a horizontal row — keep this exact layout
  • Painterly anime illustration style, cyan-amber palette, dark studio background

━━━ CHANGES FROM V5 V2 ━━━

Make ONLY the following changes:

1. TOP RIGHT PANEL — "POTENTIAL UNLOCKED" / "FULL SYNCHRONIZATION" LABEL STYLE:
   Extract the label design from v5 v1 (second reference, assetId e3185134bba04eb0).
   In the TOP RIGHT panel, display:
     • Primary label: "POTENTIAL UNLOCKED" (or similar high-impact text)
     • Subtitle/marquee: "Full Synchronization"
   Use the EXACT label typography, weight, color, glow, and layout style shown in v5 v1's top right panel.
   This should be clean, prominent, and readable with a subtle background accent or glow.

2. "CLARITY" LABEL STYLE:
   Extract the "Clarity" label typography and style from v5 v1 (second reference, assetId e3185134bba04eb0).
   Apply this label style to any appropriate labels in the output (e.g., stat words or HUD readouts).
   The style should be: clean sans-serif font, uppercase or title case, subtle glow, easily readable.

3. MIDDLE PANEL — "FOUNDATION SET +15%" LABEL:
   In the MIDDLE panel, update the label text to:
     "FOUNDATION SET +15%"
   (This is the Stability Band indicator.)
   Use the clean, readable label style from v5 v1 (described above).
   The label should be displayed near the middle student, likely in a HUD readout or stat overlay.

4. AWAKENING CORE SYMBOL:
   Extract the awakening core symbol from v2 (third reference, assetId c7781e11422192dc).
   The awakening core is a central focal symbol or icon — it may appear as a glowing orb, a geometric 
   mandala, or a key visual motif in the composition.
   Reproduce this symbol's EXACT visual form: its shape, color palette (likely cyan/amber), glow effects, 
   detail level, and placement style as shown in v2.
   Integrate this symbol into the v5 v2 composition where it best fits the visual narrative 
   (e.g., centre of the triptych, overlaid on a panel, or as a connective element between panels).

━━━ WHAT STAYS THE SAME ━━━

  • All three students: poses, faces, skin tones, clothing, expressions
  • Panel framing, composition, gutters, aspect ratio (1672 × 941 px)
  • The three brand geometry icons at the bottom in a horizontal row (circle, triangle, square+antenna)
  • Overall glow atmosphere, lighting direction, color grading
  • Painterly anime illustration style; soft shading, clean expressive linework
  • Hero cyan-amber palette; dark studio background

━━━ CONSTRAINTS ━━━

  • Only make the four changes described above. Everything else must remain as in v5 v2.
  • Aspect ratio: widescreen 1672 × 941 px.
  • Labels must be legible and use clean typography (sans-serif, readable font weight).
  • The awakening core symbol must visually integrate smoothly into the composition.
  • No additional UI elements, badges, or decorations not described above.
`.trim(),
  params: {
    model: ImageModel.GeminiProImagePreview,
    variations: 2,
  },
});
