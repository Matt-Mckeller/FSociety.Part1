import { defineSeed, ImageModel } from '../seed.kit.js';

/**
 * S1-F — Gear Accumulation Triptych: v7 variant.
 *
 * This refines v6 v2 with specific label updates and removal of a visual element:
 *
 * FROM v6 v2 (assetId 1b1534add258f6f4):
 *   - Overall composition, all three panels, student characters
 *   - Three brand geometry icons at the bottom in a horizontal row
 *   - Layout, framing, lighting, awakening core symbol
 *
 * LABEL UPDATES:
 *   - Panel 2 (middle): "+15% Resilience" label
 *   - Panel 3 (right, with the girl): "Synchronization +20%" label
 *   - Add "Team Link" label (likely connecting panels or as a shared HUD element)
 *
 * VISUAL REMOVAL:
 *   - Remove the circle sitting between panels 2 and 3 (half on one, half on the other)
 *
 * After generation:
 *   pnpm -F @4eye/scene-studio-api cli asset:promote <chosen-id> \
 *     --to 01_scene_keyframes --star --scene-code S1-F
 *
 * Usage:
 *   pnpm -F @4eye/scene-studio-api cli seed:run s1-f7-gear-accumulation-v7 --dry-run
 *   pnpm -F @4eye/scene-studio-api cli seed:run s1-f7-gear-accumulation-v7 --variations 2
 */
export default defineSeed({
  id: 's1-f7-gear-accumulation-v7',
  description:
    'GENERATE · S1-F v7 — Refine v6 v2: add Resilience/Synchronization/Team Link labels, remove inter-panel circle',
  kind: 'generate',
  sceneCode: 'S1-F',
  title: 'S1-F — Gear Accumulation Triptych (v7: v6 v2 label refinements)',
  tags: ['scene-1', 'beat-1.6', 'gear-accumulation', 'triptych', 'variant', 'v7', 'brand-geometry', 'label-update'],
  references: [
    {
      kind: 'image',
      ref: 'assetId:1b1534add258f6f4',
      role: 'style-reference',
      description:
        'S1-F v6 v2 — the BASE IMAGE. ' +
        'Use this for: overall composition, all three panels, student characters (left, middle, right), ' +
        'poses, expressions, clothing, lighting, atmosphere, color grading, awakening core symbol. ' +
        'The three brand geometry icons (circle, triangle, square+antenna) are displayed together ' +
        'at the bottom of the frame in a horizontal row — keep this exact layout. ' +
        'This is the foundation; only specific labels will be updated and one visual element removed.',
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
    { ref: 'assetId:1b1534add258f6f4', exists: true },
    { ref: 'sceneCode:BRAND-SHAPES-GEAR', exists: true },
    { ref: 'tag:4eye-reference:starred', exists: true },
  ],
  prompt: `
TASK: Generate S1-F v7 — refine v6 v2 with targeted label updates and remove one visual element.

This is a three-panel triptych. Reproduce v6 v2 (assetId 1b1534add258f6f4) as the base, with ONLY the specific changes described below.

━━━ BASE IMAGE (V6 V2) ━━━

Use v6 v2 (first reference, assetId 1b1534add258f6f4) as the foundation:
  • Three-panel triptych layout, widescreen aspect ratio (1672 × 941 px)
  • Three student characters: left panel, middle panel (boy), right panel (girl)
  • All student faces, skin tones, expressions, hair, clothing, body poses
  • Background atmosphere, lighting, color grading — exactly as in v6 v2
  • Three brand geometry icons (concentric circles, upward triangle, square + antenna) displayed together 
    at the BOTTOM of the frame in a horizontal row — keep this exact layout
  • Awakening core symbol — keep as shown in v6 v2
  • Painterly anime illustration style, cyan-amber palette, dark studio background

━━━ CHANGES FROM V6 V2 ━━━

Make ONLY the following changes:

1. PANEL 2 (MIDDLE) — "+15% RESILIENCE" LABEL:
   In the MIDDLE panel (with the boy), display the label:
     "+15% Resilience"
   Use clean, readable typography (sans-serif, uppercase or title case).
   The label should be displayed in a HUD readout or stat overlay near the middle student.
   Subtle glow or background accent to ensure readability.

2. PANEL 3 (RIGHT, WITH THE GIRL) — "SYNCHRONIZATION +20%" LABEL:
   In the RIGHT panel (with the girl), display the label:
     "Synchronization +20%"
   Use the same clean, readable label style as above.
   Display near the right student in a HUD readout or stat overlay.

3. "TEAM LINK" LABEL:
   Add a "Team Link" label somewhere in the composition.
   This label likely connects the panels or appears as a shared HUD element spanning multiple panels.
   Possible placements:
     • Between panels 2 and 3 (where the removed circle was)
     • At the top or bottom centre of the triptych
     • As a connecting line or bridge between panels with the label text
   Use the same clean, readable label style.

4. REMOVE THE CIRCLE BETWEEN PANELS 2 AND 3:
   In v6 v2, there is a circle (or circular graphic element) positioned between panels 2 and 3,
   sitting half on panel 2 and half on panel 3.
   REMOVE this circle completely. Do not replace it with another graphic.
   The area where the circle was should blend seamlessly into the background or panel borders.

━━━ WHAT STAYS THE SAME ━━━

  • All three students: poses, faces, skin tones, clothing, expressions
  • Panel framing, composition, gutters, aspect ratio (1672 × 941 px)
  • The three brand geometry icons at the bottom in a horizontal row (circle, triangle, square+antenna)
  • Awakening core symbol (keep as in v6 v2)
  • Overall glow atmosphere, lighting direction, color grading
  • Painterly anime illustration style; soft shading, clean expressive linework
  • Hero cyan-amber palette; dark studio background

━━━ CONSTRAINTS ━━━

  • Only make the changes described above. Everything else must remain as in v6 v2.
  • Aspect ratio: widescreen 1672 × 941 px.
  • Labels must be legible and use clean typography (sans-serif, readable font weight).
  • No additional UI elements, badges, or decorations not described above.
  • The removed circle should leave no visual artifact or trace.
`.trim(),
  params: {
    model: ImageModel.GeminiProImagePreview,
    variations: 2,
  },
});
