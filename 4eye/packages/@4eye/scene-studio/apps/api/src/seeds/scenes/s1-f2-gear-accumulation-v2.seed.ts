import { defineSeed, ImageModel } from '../seed.kit.js';

/**
 * S1-F — Gear Accumulation Triptych: v2 variant.
 *
 * Based on the canonical S1-F triptych (assetId 1667694cad753a71).
 * ONE change from v1:
 *   - Panel 2 (middle student, Stability Band / shield gear): change this student's
 *     skin tone and ethnicity to Black. KEEP the glasses — do not remove them.
 *     Keep everything else in that panel identical: the hoodie/clothing, the posed
 *     three-quarter view, the gear overlay (shield icon / Stability Band HUD elements),
 *     the glow level, the composition framing.
 *
 * Panels 1 and 3 must remain UNCHANGED.
 *
 * After generation:
 *   pnpm -F @4eye/scene-studio-api cli asset:promote <chosen-id> \
 *     --to 01_scene_keyframes --star --scene-code S1-F
 *
 * Usage:
 *   pnpm -F @4eye/scene-studio-api cli seed:run s1-f2-gear-accumulation-v2 --dry-run
 *   pnpm -F @4eye/scene-studio-api cli seed:run s1-f2-gear-accumulation-v2 --variations 2
 */
export default defineSeed({
  id: 's1-f2-gear-accumulation-v2',
  description:
    'GENERATE · S1-F v2 — Gear Accumulation Triptych: middle student changed to Black (glasses kept)',
  kind: 'generate',
  sceneCode: 'S1-F',
  title: 'S1-F — Gear Accumulation Triptych (v2: Black middle student, glasses kept)',
  tags: ['scene-1', 'beat-1.6', 'gear-accumulation', 'triptych', 'variant', 'v2', 'diversity'],
  references: [
    {
      kind: 'image',
      ref: 'assetId:1667694cad753a71',
      role: 'style-reference',
      description:
        'CANONICAL S1-F — the base triptych to iterate from. ' +
        'Reproduce this image with ONLY the following change: the middle panel\'s student ' +
        '(Panel 2 — Stability Band / shield gear) must be a Black student with dark brown skin. ' +
        'Keep the glasses on that student — do not remove or alter them. ' +
        'All other details of Panel 2 must match the original: same hoodie and clothing colours, ' +
        'same three-quarter head angle, same expression, same gear overlay (shield icon, ' +
        'Stability Band HUD ring), same glow intensity. ' +
        'Panels 1 and 3 (first gear / Focus Lens student and third gear / Awakening Core student) ' +
        'must remain completely unchanged from the original.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'tag:4eye-reference:starred',
      role: 'style-lock',
      description:
        'Starred 4eye visual style reference — ensures the illustration style, palette, and ' +
        'anime-influenced linework remain consistent with the rest of Scene 1.',
      required: true,
    },
  ],
  preconditions: [
    { ref: 'assetId:1667694cad753a71', exists: true },
    { ref: 'tag:4eye-reference:starred', exists: true },
  ],
  prompt: `
TASK: Regenerate the S1-F Gear Accumulation Triptych with ONE targeted change to the middle panel.

ORIGINAL IMAGE: The provided reference image (assetId 1667694cad753a71) is the current canonical version. Reproduce it at the same dimensions (1672 × 941 px, cinematic 3:2 widescreen), same layout (three equal-width panels separated by thin dark gutters), and same overall composition and mood.

CHANGE — PANEL 2 (MIDDLE) ONLY:
  The middle student who wears the Stability Band (shield icon gear overlay) must be rendered as a Black student with dark brown skin. Their glasses must be kept — do not remove, shrink, or alter them. All other aspects of this student must remain the same: clothing colour, hoodie style, body pose, three-quarter head angle, expression, and the Stability Band HUD elements (shield icon, partial ring glow, stat readouts).

PANELS 1 AND 3 — NO CHANGES:
  Panel 1 (leftmost — First Gear / Focus Lens student) and Panel 3 (rightmost — Third Gear / Awakening Core student) must be pixel-faithful reproductions of the original. Do not alter their skin tones, facial features, clothing, gear, expressions, or framing in any way.

STYLE:
  - Same stylised anime / painted-illustration look as all S1 shots.
  - Soft painted shading, clean expressive linework, saturated but harmonious colour.
  - Hero cyan-amber palette. Each panel's gear glow reads at the same intensity as the original.
  - 1:2:3 growth rhythm preserved across the three panels (gear quantity and brightness escalate left → right).

CONSTRAINTS:
  - No text. No new labels. No new UI elements.
  - Aspect ratio: 1672 × 941 px, widescreen.
  - Three-panel triptych layout must be preserved exactly.
`.trim(),
  params: {
    model: ImageModel.GeminiProImagePreview,
    variations: 2,
  },
});
