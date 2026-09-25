import { defineSeed, ImageModel } from '../seed.kit.js';

/**
 * HUD Standardization edit — S1-C-new1 (Gift icon pre-tap).
 *
 * Source frame : S1-C-new1 — assetId d9564608c950208a  (sceneCode S1-C2, folder 02_s1c_gift_sequence)
 *                "Gift icon pre-tap" — teacher at front of classroom, HUD visible beside her.
 *
 * SINGLE EDIT: Replace the Teacher HUD button bar with the canonical three-button layout.
 * Current HUD icons in this shot do NOT match canonical (Visibility · Shield · Redeem).
 * Everything else remains pixel-identical to the source.
 *
 * Pre-requisites:
 *   - HUD canonical reference asset exists: sceneCode:HUD-CANONICAL (starred)
 *   - Run hud-canonical-bar.seed.ts first, then promote with:
 *       pnpm cli asset:promote <id> --to 00_reference --star --scene-code HUD-CANONICAL
 *
 * After generation (review in gallery UI, pick cleanest HUD correction):
 *   pnpm cli asset:promote <chosen-id> --to 01_scene_keyframes --star --scene-code S1-C2-HUD
 *   # Then swap into canonical sequence:
 *   pnpm cli seq:replace scene-1-master d9564608c950208a <chosen-id>
 *
 * Usage:
 *   pnpm -F @4eye/scene-studio-api cli seed:run s1-c-new1-hud-standardize --dry-run
 *   pnpm -F @4eye/scene-studio-api cli seed:run s1-c-new1-hud-standardize --variations 1
 */
export default defineSeed({
  id: 's1-c-new1-hud-standardize',
  description:
    'EDIT · S1-C-new1 — replace non-canonical HUD buttons with locked Visibility · Shield · Redeem layout',
  kind: 'generate',
  sceneCode: 'S1-C2-HUD',
  title: 'S1-C2 HUD-standardized — Gift icon pre-tap (canonical HUD)',
  tags: ['scene-1', 'beat-1.3', 'edit', 'hud', 'hud-standardize', 's1-c-new1'],
  references: [
    {
      kind: 'image',
      ref: 'assetId:d9564608c950208a',
      role: 'edit-source',
      description:
        'S1-C-new1 original — Gift icon pre-tap. All composition, camera, teacher, 4eye, students, room, and lighting must remain pixel-identical to this. The ONLY permitted change is the HUD button bar icons.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'sceneCode:HUD-CANONICAL',
      role: 'hud-lock',
      description:
        'Canonical Teacher HUD reference — three pill buttons, left to right: Visibility (eye) · Shield · Redeem (gift box with ribbon). Match icon shapes, order, spacing, glow, and color exactly. Use THIS image to correct the HUD, not your own interpretation.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'tag:4eye-reference:starred',
      role: 'character-lock',
      description:
        'Locked 4eye character reference. Use ONLY to preserve 4eye\'s design if 4eye is visible in frame. Do not alter 4eye\'s position or pose — only ensure the identity matches.',
      required: false,
    },
  ],
  preconditions: [
    { ref: 'assetId:d9564608c950208a', exists: true },
    { ref: 'sceneCode:HUD-CANONICAL', exists: true },
  ],
  prompt: `
EDIT INSTRUCTION — single local edit only. Source: the provided S1-C-new1 image (gift icon pre-tap). Apply one correction and output a single corrected image.

━━ EDIT 1 — Replace Teacher HUD button bar ━━
Locate the Teacher HUD floating beside the teacher. Replace its button bar ONLY with the exact three-button layout shown in the provided hud-lock reference image:
  Button 1 (leftmost)  — Visibility glyph (open eye, outlined, no fill)
  Button 2 (center)    — Shield glyph (shield outline, no fill)
  Button 3 (rightmost) — Redeem glyph (wrapped gift box with ribbon/bow on top, outlined, no fill)

Match the button shapes (pill/capsule), size, spacing, cyan glow, amber halo, and translucent dark-teal fill from the hud-lock reference exactly. The overall HUD panel position, size, and glow do NOT change — only the icons inside the buttons are replaced.

━━ KEEP IDENTICAL — everything else ━━
• Camera position, angle, focal length, framing — pixel-identical composition.
• The teacher: identical pose, expression, clothing, hair, position, extended gesture.
• HUD panel: identical placement, size, overall glow — ONLY the three icon glyphs inside the buttons change.
• 4eye (if visible): identical design, position, pose.
• All students: identical poses, clothing, positions.
• Room geometry: doorway, windows, desks, teacher's desk, board, ceiling lights, walls, floor — all identical.
• Lighting and colour palette: identical warm-amber + cyan hero palette, light direction, intensity, shadows.
• Illustration style: identical anime/painted-illustration look, identical linework weight and shading.
• Aspect ratio: identical.

Do NOT add: text, watermarks, new objects, new characters, or any stylistic re-interpretation beyond the HUD icon replacement above.
`.trim(),
  params: {
    size: '1536x1024',
    variations: 1,
    model: ImageModel.GeminiProImagePreview,
  },
});
