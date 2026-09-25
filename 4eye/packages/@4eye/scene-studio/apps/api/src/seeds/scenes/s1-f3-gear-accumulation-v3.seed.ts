import { defineSeed, ImageModel } from '../seed.kit.js';

/**
 * S1-F — Gear Accumulation Triptych: v3 variant.
 *
 * Based on v2 (assetId 3f0d160faa2fb00d — Black middle student, glasses kept).
 * CHANGES from v2:
 *   - All three gear icons are replaced with the Expanse brand geometry shapes:
 *       Panel 1 (First Gear):  Eye / Focus Lens icon  → Concentric Circles (cyan, multi-ring)
 *       Panel 2 (Second Gear): Shield icon            → Upward Triangle (amber, double-outlined)
 *       Panel 3 (Third Gear):  Lightning icon         → Rounded Square + 4eye Antenna (cyan-amber)
 *   - HUD action labels updated to brand vocabulary:
 *       Panel 1 label: "FOCUS ACTIVATED"
 *       Panel 2 label: "FOUNDATION SET"
 *       Panel 3 label: "POTENTIAL UNLOCKED"
 *   - Panel 3 subtitle marquee: "Full Synchronization"
 *   - Stat words replace numeric percentages:
 *       Panel 1 stat: "Clarity"
 *       Panel 2 stat: "Resilience"
 *       Panel 3 stat: "Synchronization"
 *   - Gear tier titles ("First Gear / Second Gear / Third Gear") are dropped.
 *   - All student characters, compositions, and panel framing are kept from v2.
 *   - Middle student remains Black with glasses (from v2).
 *
 * After generation:
 *   pnpm -F @4eye/scene-studio-api cli asset:promote <chosen-id> \
 *     --to 01_scene_keyframes --star --scene-code S1-F
 *
 * Usage:
 *   pnpm -F @4eye/scene-studio-api cli seed:run s1-f3-gear-accumulation-v3 --dry-run
 *   pnpm -F @4eye/scene-studio-api cli seed:run s1-f3-gear-accumulation-v3 --variations 2
 */
export default defineSeed({
  id: 's1-f3-gear-accumulation-v3',
  description:
    'GENERATE · S1-F v3 — Gear Accumulation Triptych: brand geometry icons (circle/triangle/square+antenna) + updated HUD labels',
  kind: 'generate',
  sceneCode: 'S1-F',
  title: 'S1-F — Gear Accumulation Triptych (v3: brand geometry icons, Focus/Foundation/Potential labels)',
  tags: ['scene-1', 'beat-1.6', 'gear-accumulation', 'triptych', 'variant', 'v3', 'brand-geometry', 'icons'],
  references: [
    {
      kind: 'image',
      ref: 'assetId:3f0d160faa2fb00d',
      role: 'style-reference',
      description:
        'S1-F v2 — the base to iterate from. This has the correct student characters ' +
        '(Black middle student with glasses, unchanged panels 1 and 3). ' +
        'Reproduce the full composition with ONLY the gear icon and HUD label changes described in the prompt. ' +
        'All students, poses, clothing, glow atmosphere, and panel layout must remain exactly as in this image.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'sceneCode:BRAND-SHAPES-GEAR',
      role: 'icon-reference',
      description:
        'Brand geometry icon reference sheet — three 300×300 panels showing the exact visual forms ' +
        'to use as gear icons in this image: ' +
        '(Left) Concentric Circles with cyan rings and compass tick marks — use for Panel 1 gear icon. ' +
        '(Centre) Double-outlined upward triangle with amber fill, inverted inner triangle, and apex orb — use for Panel 2 gear icon. ' +
        '(Right) Nested rounded squares (cyan outer + amber middle ring), 4eye-style antenna rising from the top edge (thin dark stem, glowing cyan bulb, faint broadcast rings), and centre orb — use for Panel 3 gear icon.',
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
    { ref: 'assetId:3f0d160faa2fb00d', exists: true },
    { ref: 'sceneCode:BRAND-SHAPES-GEAR', exists: true },
    { ref: 'tag:4eye-reference:starred', exists: true },
  ],
  prompt: `
TASK: Regenerate the S1-F Gear Accumulation Triptych with the gear icons and HUD labels updated to the Expanse brand geometry system. All students and compositions stay the same as v2.

BASE IMAGE: The provided S1-F v2 reference (assetId 3f0d160faa2fb00d) is the base. Reproduce it at the same dimensions (1672 × 941 px, cinematic widescreen), same three-panel triptych layout, same student characters and poses, same glow atmosphere and painted illustration style.

━━━ ICON CHANGES ━━━

PANEL 1 — LEFT (FOCUS ACTIVATED):
  Remove the eye / lens icon currently shown as the gear overlay.
  Replace with: a CONCENTRIC CIRCLES icon.
    - 4 cyan (#00e5ff) rings spaced evenly outward from a bright glowing centre orb.
    - Faint compass tick marks at N / E / S / W on the outer ring.
    - The icon glows with a soft cyan halo — matches the existing cyan glow atmosphere of this panel.
  HUD label text (displayed near the icon in the HUD readout): "FOCUS ACTIVATED"
  Stat word (replacing any numeric %) : "Clarity"
  Remove any "First Gear" title text.

PANEL 2 — MIDDLE (FOUNDATION SET):
  Remove the shield icon currently shown as the gear overlay.
  Replace with: an UPWARD TRIANGLE icon.
    - Double-outlined equilateral triangle pointing upward, amber (#ffab40) fill on the inner face.
    - A smaller inverted triangle (point-down) as a subtle inner accent mark.
    - A small amber glowing orb at the apex; small orbs at the two lower corners.
    - The icon glows with a warm amber halo — matches the existing amber glow atmosphere of this panel.
  HUD label text: "FOUNDATION SET"
  Stat word: "Resilience"
  Remove any "Second Gear" title text.

PANEL 3 — RIGHT (POTENTIAL UNLOCKED):
  Remove the lightning / bolt icon currently shown as the gear overlay.
  Replace with: a SQUARE + ANTENNA icon.
    - Two nested rounded-corner squares. Outer square: cyan (#00e5ff). Middle ring / second square: amber (#ffab40). Centre fill: dark (#0d1117) with a bright cyan centre orb.
    - A 4eye-style antenna rising from the top edge of the square:
        · A small dark base nub at the top-centre of the outer square.
        · A thin dark (#2d2d44) vertical stem line extending upward.
        · A small bright cyan glowing bulb at the tip of the stem.
        · One or two faint cyan broadcast/pulse rings expanding outward from the bulb.
    - 4 small cyan accent dots at the four corners of the outer square.
    - The icon glows with a duotone cyan-amber halo.
  HUD label text: "POTENTIAL UNLOCKED"
  Subtitle / marquee text below the label: "Full Synchronization"
  Stat word: "Synchronization"
  Remove any "Third Gear" title text.

━━━ WHAT STAYS THE SAME ━━━
  - All three students: poses, skin tones, clothing, expressions, glasses on the middle student.
  - Panel framing, composition, gutters, aspect ratio (1672 × 941 px).
  - The 1:2:3 glow escalation rhythm across panels (each panel brighter and more intense than the previous).
  - Painterly anime illustration style; soft shading, clean expressive linework.
  - Hero cyan-amber palette; dark studio background.

━━━ CONSTRAINTS ━━━
  - Use the BRAND-SHAPES-GEAR reference image to understand the exact visual form of each icon.
  - Icon size: each gear icon should occupy roughly the same visual footprint as the icons in v2.
  - No additional UI elements, badges, or decorations not described above.
  - Aspect ratio: widescreen 1672 × 941 px.
`.trim(),
  params: {
    model: ImageModel.GeminiProImagePreview,
    variations: 2,
  },
});
