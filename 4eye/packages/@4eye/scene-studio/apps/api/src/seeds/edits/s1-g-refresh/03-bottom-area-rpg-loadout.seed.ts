import { defineSeed, ImageModel } from '../../seed.kit.js';

/**
 * S1-G Refresh — Step 3 of 3: Bottom-Center RPG Avatar / Loadout.
 *
 * Chain position : THIRD (source = S1-G.2, output of step 2)
 * Source         : sceneCode:S1-G.2  (starred asset promoted in step 2)
 * Output         : sceneCode:S1-G.3-final  (promote to 01_scene_keyframes with --star)
 *
 * REGION: bottom-center ~50 % of frame, between the VAKL panel (bottom-left) and the
 *         Coins/Rewards panel (bottom-right).
 *
 * Adds a glowing character silhouette with 4 MUI gear/stat overlay icons at anatomical
 * positions. This is a static still — the animation pass (pulsing icons + upward chevrons)
 * happens in the Task B animate seed.
 *
 * After generation, this is the FINAL keyframe of the S1-G redesign chain.
 * Promote to 01_scene_keyframes (not alternates) and swap into the canonical sequence.
 *
 * Pre-requisites:
 *   - sceneCode:S1-G.2 exists (output of 02-bottom-right-coins-rewards, starred)
 *   - sceneCode:MUI-GLYPHS-VAKL exists (same composite reference sheet used in step 1)
 *
 * After generation:
 *   pnpm -F @4eye/scene-studio-api cli asset:promote <chosen-id> \
 *     --to 01_scene_keyframes --scene-code S1-G.3-final --star
 *
 *   # Then swap into canonical sequence (old S1-G3 id = e5cc0072b97a1191):
 *   pnpm -F @4eye/scene-studio-api cli seq:replace scene-1-master e5cc0072b97a1191 <chosen-id>
 *
 *   # After this, run the Task B animate seed (seeds/videos/s1-g-engagement-animation.seed.ts)
 *
 * Usage:
 *   pnpm -F @4eye/scene-studio-api cli seed:run 03-bottom-area-rpg-loadout --dry-run
 *   pnpm -F @4eye/scene-studio-api cli seed:run 03-bottom-area-rpg-loadout --variations 2
 */
export default defineSeed({
  id: '03-bottom-area-rpg-loadout',
  description:
    'EDIT · S1-G Step 3/3 — add RPG avatar silhouette + VAKL gear icons to bottom-center of S1-G.2 → final keyframe',
  kind: 'generate',
  sceneCode: 'S1-G.3-final',
  title: 'S1-G.3-final — RPG loadout silhouette (step 3/3)',
  tags: ['scene-1', 'beat-1.5', 'edit', 's1-g-refresh', 'step:3/3', 'rpg-loadout', 's1-g-final'],
  references: [
    {
      kind: 'image',
      ref: 'sceneCode:S1-G.2',
      role: 'edit-source',
      description:
        'S1-G.2 — output of step 2 (VAKL panel in bottom-left + Coins/Rewards in bottom-right already applied). All regions EXCEPT the bottom-center silhouette area must remain pixel-identical.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'sceneCode:MUI-GLYPHS-VAKL',
      role: 'style-reference',
      description:
        'Composite reference sheet with all four VAKL MUI glyphs: Visibility (eye), Hearing (ear), PanTool (hand), Psychology (head outline). These are the four icons placed on the silhouette at anatomical positions.',
      required: true,
    },
  ],
  preconditions: [
    { ref: 'sceneCode:S1-G.2', exists: true },
    { ref: 'sceneCode:MUI-GLYPHS-VAKL', exists: true },
  ],
  prompt: `
EDIT INSTRUCTION — single region edit only. Source: the provided S1-G.2 image (VAKL panel bottom-left, Coins/Rewards panel bottom-right both present). Apply one addition to the bottom-center region and output a corrected image.

━━ EDIT 1 — Add RPG Avatar Silhouette + VAKL Gear Icons (bottom-center region) ━━
In the bottom-center approximately 50 % of the frame (bounded on the left by the VAKL panel and on the right by the Coins/Rewards panel), insert a glowing character silhouette with four floating MUI icon overlays positioned at anatomical points.

SILHOUETTE:
  - A simple upright human figure silhouette (student, gender-neutral, seated or standing).
  - Style: smooth filled shape in very dark amber/charcoal (almost black), with a SOFT, SUBTLE cyan edge trace — low intensity, not a bright spotlight or full bloom glow. The outline should be quiet and atmospheric, not the dominant light source in the frame.
  - The silhouette reads as an RPG "character loadout screen" — clinical, clean, stylised.
  - No facial features, no clothing details, no hair details — solid silhouette only.
  - Scale: roughly head-and-torso sized, centered in the bottom-center region.

FOUR ICON OVERLAYS (position on the silhouette body):
  1. MUI Visibility glyph (eye)        — positioned over the eyes/forehead area (head)
  2. MUI Hearing glyph (ear)           — positioned at the ear area (side of head)
  3. MUI PanTool glyph (open hand)     — positioned at a hand/wrist area
  4. MUI Psychology glyph (head form)  — positioned slightly above the head (floating icon crown)

ICON STYLE:
  - Each icon is a small floating rounded-square or circular badge with a soft translucent dark panel, cyan glyph stroke, and a faint amber glow ring.
  - Exact glyph shapes from the MUI-GLYPHS-VAKL reference sheet. Do not redesign.
  - All four icons are the same size and identical badge style.
  - Icons are static (no animation indicators in this still — those appear in the animate seed).
  - No text. No numbers. No connecting lines between icons (lines appear in animation).

━━ VISUAL BALANCE — equal attention distribution across all three panels ━━
The final composition has three equal-weight zones: VAKL panel (bottom-left), silhouette (bottom-center), Coins/Rewards panel (bottom-right). The viewer's eye should travel evenly across all three — no single zone should pull dominant attention.

To achieve this balance:
  - The silhouette glow is intentionally restrained (see above) so the center doesn't overpower the sides.
  - SLIGHTLY REDUCE the vibrancy/saturation of the cyan progress bar fills in the VAKL panel (bottom-left) — bring them down to approximately 65–70 % of their current brightness so they feel part of the same visual tier as the subdued silhouette glow and the warm amber coin tones on the right. The bars should still clearly communicate their fill levels; they should just feel less electrically bright.
  - The Coins/Rewards panel on the right uses warm amber/gold tones — keep as-is; it already sits at the right visual weight.
  - The three zones should feel like siblings: similar presence, no hierarchy.

━━ KEEP IDENTICAL — everything else ━━
• The VAKL panel layout and fill percentages (75 %, 60 %, 50 %, 85 %) — preserve, only the fill saturation/brightness is modestly reduced.
• The Coins/Rewards panel in the bottom-right (from step 2): preserve exactly (icons + numerals 817 and 12).
• ALL regions OUTSIDE the three bottom panels: pixel-identical.
• All students, teacher, 4eye, room geometry, background, existing UI elements — unchanged.
• Lighting, colour palette, illustration style, aspect ratio — unchanged.
• Do NOT add text, labels, or numbers anywhere in this edit.
`.trim(),
  params: {
    size: '1536x1024',
    variations: 2,
    model: ImageModel.GeminiProImagePreview,
  },
});
