import { defineSeed, ImageModel } from '../seed.kit.js';

/**
 * Frame 1 of the hallway-POV opener.
 *
 * The 3-frame opener (all on a pixel-identical hallway-POV camera) is:
 *   Frame 1 (THIS SEED)                          — 4eye turned to face the camera
 *   Frame 2 = S1-A (assetId:86ab991fa8e60f37)   — 4eye turned to face into the classroom
 *   Frame 3 (s1-c1.7-4eye-entering-classroom)   — 4eye crossing the threshold flying toward the teacher
 * After Frame 3, the video CUTS to S1-C-old1.
 *
 * This frame is essentially S1-A with 4eye rotated 180° to face the camera. Every
 * other pixel — camera, doorway, classroom interior, students, teacher, lighting —
 * must be pixel-identical to S1-A so that the downstream image-to-video model can
 * morph cleanly from Frame 1 → Frame 2 as a pure rotation of 4eye.
 *
 * Refs:
 *   - tag:4eye-reference:starred       → identity lock for the 4eye character
 *   - assetId:86ab991fa8e60f37 (S1-A)  → CAMERA + ROOM + SCENE LOCK (single source of truth for everything except 4eye's rotation)
 *
 * Default model: ImageModel.GeminiProImagePreview.
 */
export default defineSeed({
  id: 's1-c1.4-4eye-facing-camera',
  description: 'GENERATE · Scene 1 opener Frame 1 · 4eye in the hallway facing the camera (before he turns toward the classroom)',
  kind: 'generate',
  sceneCode: 'S1-A.1',
  title: 'S1-A.1 — 4eye facing the camera (Frame 1 of opener)',
  tags: ['scene-1', 'beat-1.2', 'opener', 'frame-1', '4eye'],
  references: [
    {
      kind: 'image',
      ref: 'tag:4eye-reference:starred',
      role: 'character-lock',
      description: 'Starred 4eye reference sheet — locked identity (use ONLY for character fidelity)',
      required: true,
    },
    {
      kind: 'image',
      ref: 'assetId:86ab991fa8e60f37',
      role: 'scene-lock',
      description: 'S1-A (Frame 2 of opener) — 4eye in the hallway facing INTO the classroom. THIS frame uses the SAME camera position, SAME focal length, SAME framing, SAME doorway pixels, SAME classroom interior, SAME students/teacher in their working positions, SAME lighting. The ONLY difference: 4eye is rotated 180° to face the CAMERA instead of facing the classroom.',
      required: true,
    },
    {
      kind: 'text',
      ref: 'file:00-style-bible.md',
      role: '4eye-fragment',
      section: '7.6 4eye character fragment',
      description: 'Canonical 4eye identity spec',
      required: true,
    },
  ],
  preconditions: [
    { ref: 'tag:4eye-reference:starred', exists: true },
    { ref: 'assetId:86ab991fa8e60f37', exists: true },
  ],
  prompt: `
ANIMATION INTENT: This still is FRAME 1 of a small three-frame opener, all rendered on a pixel-IDENTICAL hallway-POV camera. The chain is:  THIS FRAME (4eye in the hallway facing the camera) → Frame 2 / S1-A (4eye turned 180° to face into the classroom — the provided scene-lock reference) → Frame 3 (4eye crossing the threshold flying toward the teacher) → [CUT to S1-C-old1]. Between THIS frame and Frame 2, the ONLY thing that changes is 4eye's rotation — every other pixel must be IDENTICAL to the S1-A reference so a downstream image-to-video model can morph the rotation cleanly without re-staging the scene.

STYLE: single illustrated frame in the SAME stylised anime / painted-illustration look as the S1-A reference. Soft painted shading, clean expressive linework, saturated but harmonious colour. NOT photoreal. NO lens flare, NO film grain, NO photographic depth-of-field. Match the reference's line weight, shading, and rendering fidelity.

Scene: identical to the S1-A reference image except for 4eye's rotation. 4eye is in the EXACT SAME POSITION in the hallway as in S1-A (same X/Y in the frame, same hover height, same scale) — but his body has been rotated 180° so his single large cyan eye and horizontal visor/strap are FACING THE CAMERA. His dorsal antenna is now visible behind him. The classroom visible through the open doorway behind/beyond him is identical to S1-A: cool/dim, students working quietly, teacher working at her desk, all undisturbed.

Character (4eye): match the locked character reference EXACTLY. Spherical body, single large glowing cyan eye, horizontal visor/strap, small dorsal antenna, soft cyan rim/glow, smooth matte body. Do not redesign. He is empty-handed.

Composition: pixel-IDENTICAL to S1-A. Same camera position, height, angle, focal length. Same doorway in the same pixels of the frame. Same classroom interior visible through it. Same students, same teacher, same desks, same windows, same lighting. Only 4eye has rotated to face the camera.

Lighting/color: pixel-IDENTICAL to S1-A. The classroom interior is the cool/dim baseline. 4eye carries his own soft warm cyan-amber glow — same warm pool on the hallway floor beneath him, same cyan rim, same subtle warm spill on the doorway threshold. NOTHING about the lighting changes from S1-A; only 4eye's rotation changes.

Mood: the very first moment of the video — 4eye has just arrived in the hallway and is presenting himself to the viewer before turning to enter the classroom.

Aspect: 3:2 cinematic widescreen.

CAMERA — PIXEL-IDENTICAL to the S1-A reference. Do NOT change camera position, height, angle, focal length, or framing.

ROOM GEOMETRY — PIXEL-IDENTICAL to the S1-A reference. Same windows, same desk grid, same teacher's desk position, same board, same ceiling lights, same wall colour, same floor material. Same students in the same seats with the same clothing, hair, and body positions. Same teacher in the same place. Nothing in the classroom has changed.

Do NOT include: text, logos, watermarks, captions, panel borders, storyboard annotations, multiple panels, color swatches, callouts, UI/HUD elements, gift box / present, any other floating drones besides 4eye, any photoreal rendering style. Do NOT change the camera. Do NOT re-stage the room. Do NOT re-cast the students.
`.trim(),
  params: {
    size: '1536x1024',
    variations: 1,
    model: ImageModel.GeminiProImagePreview,
  },
});
