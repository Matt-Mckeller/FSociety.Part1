import { defineSeed, ImageModel } from '../seed.kit.js';

/**
 * S1-F — Gear Accumulation Triptych: v4 variant.
 *
 * Based on v2 (assetId 3f0d160faa2fb00d — Black middle student, glasses kept).
 *
 * ONE targeted change from v2:
 *   Replace the three HUD gear action icons (Eye / Shield / Lightning bolt)
 *   with the Expanse brand geometry shapes (Circle / Triangle / Square).
 *   The brand geometry icon reference (assetId 572a1829ba1a4104) shows the
 *   exact visual form of each replacement icon.
 *
 * EVERYTHING else in the image must remain identical to v2:
 *   - All three students (characters, faces, skin tones, clothing, poses)
 *   - Black middle student with glasses (from v2) — unchanged
 *   - All HUD text, labels, stat values, multipliers
 *   - All three panel compositions, backgrounds, framing, gutters
 *   - Glow atmosphere, lighting, colour palette
 *   - No new elements (no robots, no extra characters, no new badges or text)
 *   - No changes to the bottom bar text or the SCENE 1 header area
 *
 * After generation:
 *   pnpm -F @4eye/scene-studio-api cli asset:promote <chosen-id> \
 *     --to 01_scene_keyframes --star --scene-code S1-F
 *
 * Usage:
 *   pnpm -F @4eye/scene-studio-api cli seed:run s1-f4-gear-accumulation-v4 --dry-run
 *   pnpm -F @4eye/scene-studio-api cli seed:run s1-f4-gear-accumulation-v4 --variations 2
 */
export default defineSeed({
  id: 's1-f4-gear-accumulation-v4',
  description:
    'GENERATE · S1-F v4 — Gear icon swap only: Eye→Circle, Shield→Triangle, Lightning→Square (all other v2 content preserved)',
  kind: 'generate',
  sceneCode: 'S1-F',
  title: 'S1-F — Gear Accumulation Triptych (v4: icon-only swap, v2 base preserved)',
  tags: ['scene-1', 'beat-1.6', 'gear-accumulation', 'triptych', 'variant', 'v4', 'brand-geometry', 'icon-swap'],
  references: [
    {
      kind: 'image',
      ref: 'assetId:3f0d160faa2fb00d',
      role: 'style-reference',
      description:
        'S1-F v2 — the BASE IMAGE to edit. This is the canonical version. ' +
        'Reproduce it with absolute fidelity. The ONLY permitted change is swapping ' +
        'the three HUD gear icon graphics as described in the prompt. ' +
        'Every student character, every pose, every text label, every background, ' +
        'every glow and colour detail must match this image exactly.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'assetId:572a1829ba1a4104',
      role: 'icon-reference',
      description:
        'Brand Geometry Icon Set reference — three panels showing the exact icon shapes to use. ' +
        'Left panel: the Concentric Circles icon (cyan rings, compass ticks, glowing centre orb). ' +
        'Centre panel: the Triangle icon (amber, upward equilateral, double-outlined, apex orb). ' +
        'Right panel: the Square icon (nested rounded squares, cyan outer + amber ring, antenna on top). ' +
        'Use these shapes as direct visual replacements for the gear icons in the base image.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'tag:4eye-reference:starred',
      role: 'style-lock',
      description:
        'Starred 4eye visual style reference — ensures illustration style and palette stay consistent.',
      required: true,
    },
  ],
  preconditions: [
    { ref: 'assetId:3f0d160faa2fb00d', exists: true },
    { ref: 'assetId:572a1829ba1a4104', exists: true },
    { ref: 'tag:4eye-reference:starred', exists: true },
  ],
  prompt: `
TASK: This is a targeted icon swap. Reproduce the S1-F v2 triptych (base image) with ONLY the three HUD gear icons replaced. Every other element of the image must remain exactly as it appears in the base.

━━━ THE ONLY CHANGE — SWAP THREE GEAR ICONS ━━━

In the base image there are three HUD gear icons — one per panel — displayed as floating holographic action icons. Replace each icon graphic with the corresponding brand geometry shape from the icon reference sheet:

  ICON 1 (Panel 1, left student):
    Current icon: an eye / lens shape
    Replace with: CONCENTRIC CIRCLES — 4 evenly-spaced cyan (#00e5ff) rings radiating from a bright glowing centre orb, with faint tick marks at the N/E/S/W compass points on the outer ring.

  ICON 2 (Panel 2, middle student — Black student with glasses):
    Current icon: a shield shape
    Replace with: UPWARD TRIANGLE — an equilateral triangle pointing upward with double-outlined amber (#ffab40) edges, a smaller inverted triangle as an inner accent, and a small glowing orb at the apex.

  ICON 3 (Panel 3, right student):
    Current icon: a lightning bolt shape
    Replace with: SQUARE + ANTENNA — two nested rounded-corner squares (outer: cyan #00e5ff, inner ring: amber #ffab40, dark centre), with a small antenna rising from the top-centre edge (thin dark stem, glowing cyan bulb tip, faint broadcast rings), and 4 small cyan dot accents at the corners.

The icons in the reference sheet (second provided image) show the exact visual form to use. Match their geometry, colour, and glow style as closely as possible.

━━━ EVERYTHING ELSE — PRESERVE EXACTLY FROM V2 ━━━

Do NOT change any of the following:
  • Student characters: faces, skin tones, expressions, hair, clothing, body poses
    (The middle student is Black and wears glasses — this must not change)
  • Panel compositions, framing, camera angles, backgrounds
  • Any HUD text: labels, stat words, multiplier numbers (1×, 2×, 3×), percentage values
  • The bottom bar: all text, numbers, and layout as they appear in v2
  • The SCENE 1 SHOT 6 header and all top-bar text
  • Glow atmosphere, lighting direction, colour palette
  • Panel gutters, aspect ratio, image dimensions (1672 × 941 px)

Do NOT add:
  • Robots, companion characters, or any new figures
  • New text, badges, or overlays not present in v2
  • New visual elements of any kind

ICON SIZE AND PLACEMENT: Each replacement icon should occupy the same visual footprint and screen position as the original gear icon it replaces. The icons float as holographic HUD elements at the same depth and glow intensity as the originals.
`.trim(),
  params: {
    model: ImageModel.GeminiProImagePreview,
    variations: 2,
  },
});
