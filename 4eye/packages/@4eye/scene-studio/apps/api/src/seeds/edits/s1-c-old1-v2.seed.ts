import { defineSeed, ImageModel } from '../seed.kit.js';

/**
 * V2 edit of S1-C-old1 (teacher HUD pre-tap).
 *
 * Three simultaneous corrections vs the original source:
 *   1. REMOVE the gift box — 4eye must be empty-handed (gift materialises only after the teacher taps Beat 1.4)
 *   2. FIX 4eye character — match the locked character reference exactly (spherical body, NO arms, single large cyan eye, horizontal visor/strap, small dorsal antenna, soft cyan glow). In the current source 4eye has arms/hands which is wrong.
 *   3. HUD button 3 — change the third (rightmost) button icon from a lightning-bolt to a PRESENT / GIFT BOX icon (wrapped box with ribbon). This is the button the teacher will tap to trigger the gift transfer in Beat 1.4.
 *
 * Everything else stays identical to the source.
 */
export default defineSeed({
  id: 's1-c-old1-v2',
  description: 'EDIT · S1-C-old1 v2 — remove gift, fix 4eye to character ref (no arms), HUD btn3 → present icon',
  kind: 'generate',
  sceneCode: 'S1-C1',
  title: 'S1-C1 v2 — teacher HUD pre-tap (4eye locked, btn3 = present)',
  tags: ['scene-1', 'beat-1.3', 'edit', '4eye', 'gift-removal', 'hud', 's1-c-old1'],
  references: [
    {
      kind: 'image',
      ref: 'assetId:161020d1c66b3272',
      role: 'edit-source',
      description: 'S1-C-old1 original — source frame. All composition, camera, teacher, students, room, and lighting must remain pixel-identical to this. The three edits listed below are the ONLY permitted changes.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'tag:4eye-reference:starred',
      role: 'character-lock',
      description: 'Locked 4eye character reference. Use ONLY to correct 4eye\'s design in the output. 4eye is a smooth spherical floating drone: single large glowing cyan eye, horizontal visor/strap, small dorsal antenna, NO arms, NO hands, NO fingers. Soft cyan rim glow.',
      required: true,
    },
  ],
  preconditions: [
    { ref: 'assetId:161020d1c66b3272', exists: true },
    { ref: 'tag:4eye-reference:starred', exists: true },
  ],
  prompt: `
EDIT INSTRUCTION — three local edits only. Source: the provided S1-C-old1 image. Apply all three corrections simultaneously and output a single corrected image.

━━ EDIT 1 — Remove gift box ━━
The gift box / wrapped present that 4eye is currently holding must be removed. After removal, 4eye has no object in the space around him — he is simply hovering, his body unobstructed.

━━ EDIT 2 — Fix 4eye character design ━━
In the source, 4eye has arms and hands which is WRONG. Replace 4eye entirely with the locked character reference design: a smooth sphere (no arms, no hands, no fingers, no legs), one large glowing cyan eye centred on the front face, a thin horizontal visor/strap crossing the sphere, a small short dorsal antenna on top, subtle cyan rim glow. He should be the same size, in the same position, at the same hover height, facing the same direction as in the source. His body language should read as attentive / slightly leaning toward the teacher.

━━ EDIT 3 — HUD button 3 → Present icon ━━
The See-button HUD floating beside the teacher has three circular/pill buttons arranged horizontally: button 1 (eye icon), button 2 (shield icon), button 3 (currently a lightning bolt). Change button 3's icon ONLY to a PRESENT / GIFT BOX icon — a small wrapped box with a ribbon/bow on top, drawn in the same glowing cyan-amber line-art style as the other HUD icons. The button shape, size, glow, and position must remain identical; only the icon inside it changes.

━━ KEEP IDENTICAL — everything else ━━
• Camera position, angle, focal length, framing — pixel-identical composition.
• The teacher: identical pose, expression, clothing, hair, position, and the finger extended toward the HUD.
• HUD buttons 1 and 2 (eye, shield): identical icons, identical glow, identical placement.
• HUD overall: identical placement, size, glow, and panel design — only btn3 icon changes.
• All students: identical poses, clothing, positions.
• Room geometry: doorway, windows, desks, teacher's desk, board, ceiling lights, walls, floor — all identical.
• Lighting and colour palette: identical warm-amber + cyan hero palette, light direction, intensity, shadows.
• Illustration style: identical anime/painted-illustration look, identical linework weight and shading.
• Aspect ratio: identical.

Do NOT add: text, watermarks, new objects, new characters, or any stylistic re-interpretation beyond the three edits above.
`.trim(),
  params: {
    size: '1536x1024',
    variations: 2,
    model: ImageModel.GeminiProImagePreview,
  },
});
