import { defineSeed, ImageModel } from '../seed.kit.js';

/**
 * Frame 3 of the hallway-POV opener.
 *
 * The 3-frame opener (all on a pixel-identical hallway-POV camera) is:
 *   Frame 1 (s1-c1.4-4eye-facing-camera)        — 4eye turned to face the camera
 *   Frame 2 = S1-A (assetId:86ab991fa8e60f37)   — 4eye turned to face into the classroom
 *   Frame 3 (THIS SEED)                          — 4eye crossing the threshold, beginning to fly toward the teacher, warm light starting to spread into the room
 * Immediately after Frame 3, the video CUTS to S1-C-old1 (teacher at front, HUD pre-tap).
 *
 * Refs:
 *   - tag:4eye-reference:starred       → identity lock for the 4eye character
 *   - assetId:86ab991fa8e60f37 (S1-A)  → CAMERA + ROOM LOCK — must be pixel-identical here
 *   - assetId:161020d1c66b3272 (S1-C-old1) → direction-of-travel (style + target warm palette)
 *
 * Default model: ImageModel.GeminiProImagePreview.
 */
export default defineSeed({
  id: 's1-c1.7-4eye-entering-classroom',
  description: 'GENERATE · Scene 1 opener Frame 3 · 4eye crossing the threshold, flying toward the teacher (hallway POV)',
  kind: 'generate',
  sceneCode: 'S1-A.3',
  title: 'S1-A.3 — 4eye crossing the threshold (Frame 3 of opener)',
  tags: ['scene-1', 'beat-1.2', 'opener', 'frame-3', '4eye'],
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
      role: 'before-anchor',
      description: 'S1-A (Frame 2 of opener) — 4eye in the hallway facing into the classroom. THIS frame uses the SAME camera position, SAME focal length, SAME framing, SAME room geometry, SAME students/teacher in their working positions. Only 4eye\'s position has changed (he has drifted forward across the threshold) and the lighting has begun to evolve.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'assetId:161020d1c66b3272',
      role: 'after-anchor',
      description: 'S1-C-old1 (the next shot after a hard CUT) — fully warm-lit classroom, teacher at front, HUD pre-tap. Pull: anime/painted-illustration style, target warm amber+cyan palette we are starting to head toward. Camera differs (different shot after the cut); room is the same 3D world.',
      required: true,
    },
    {
      kind: 'text',
      ref: 'file:scenes/scene-1-classroom.md',
      role: 'beat-spec',
      section: 'Beat 1.2 — 4eye Arrives (0:03–0:05)',
      description: 'Action, camera, color, sound, and concept rules for Beat 1.2',
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
  ],
  prompt: `
ANIMATION INTENT: This still is FRAME 3 of a small three-frame opener, all rendered on a pixel-IDENTICAL hallway-POV camera. The chain so far:  Frame 1 (4eye facing the camera in the hallway) → Frame 2 / S1-A (4eye turned to face into the classroom — the provided before-anchor reference) → THIS FRAME (4eye has drifted forward across the threshold and is just beginning to fly toward the teacher, warm cyan-amber light has begun to bloom inside the doorway). Immediately after this frame, the video CUTS to S1-C-old1. The camera, focal length, framing, and room geometry MUST be PIXEL-IDENTICAL to S1-A — the ONLY things that change from S1-A to this frame are 4eye's position (he has moved forward across the threshold), his orientation/posture (a forward-motion lean toward the teacher), and the lighting (warm spill has now begun to enter the classroom).

STYLE: single illustrated frame in the SAME stylised anime / painted-illustration look as both references. Soft painted shading, clean expressive linework, saturated but harmonious colour. NOT photoreal. NO lens flare, NO film grain, NO photographic depth-of-field. Match the references' line weight, shading, and rendering fidelity.

Scene: identical hallway-POV camera as S1-A, looking through the open classroom doorway. Compared to S1-A: 4eye has drifted FORWARD — he has crossed the threshold and is now INSIDE the classroom, a short distance past the doorway, beginning to fly toward the teacher at the front of the room. His body/eye is angled forward and slightly downward toward the teacher's direction. A subtle sense of forward motion (gentle motion-trail of warm cyan-amber light behind him; very slight motion-streak on his rim glow). He is EMPTY-HANDED.

Character (4eye): match the locked character reference EXACTLY. Spherical body, single large glowing cyan eye, horizontal visor/strap, small dorsal antenna, soft cyan rim/glow, smooth matte body. Same scale as in S1-A. Do not redesign.

Students and teacher: they are STILL mostly undisturbed — working at their desks as in S1-A. Maybe one student in the nearest row has just started to lift their head toward the doorway, but the room has not yet meaningfully reacted. The teacher is still working at her desk. This frame should read as "the moment of entry" — motion has begun but the room has not yet responded.

Lighting/color: warm cyan-amber light has now begun to spread into the classroom, originating from 4eye's position just past the threshold. A warm pool of light on the floor around 4eye, gentle amber wash on the nearest desks and doorway frame, cyan rim along the doorway edges. The far half of the room (where the teacher sits) is still in the cool baseline palette. Compared to S1-A, this frame reads as ~30–40% of the way to the fully-lit S1-C-old1 — lighting has begun to evolve but is far from complete.

Mood: ignition. Quiet forward motion. The story has begun.

Aspect: 3:2 cinematic widescreen.

CAMERA — PIXEL-IDENTICAL to S1-A. Same hallway-POV position, same height, same angle, same focal length, same framing of the doorway. The doorway sits in exactly the same pixels of the frame as in S1-A. Only 4eye has moved within the frame. The camera has NOT moved.

ROOM GEOMETRY — PIXEL-IDENTICAL to S1-A. Same windows, same desk grid, same teacher's desk position, same board, same ceiling lights, same wall colour, same floor material. Same students in the same seats, same clothing, same hair, same body positions (with at most one slight head turn). Same teacher in the same place.

Do NOT include: text, logos, watermarks, captions, panel borders, storyboard annotations, multiple panels, color swatches, callouts, UI/HUD elements (the HUD activates later, after the cut), gift box / present (materialises later), any other floating drones besides 4eye, any photoreal rendering style. Do NOT change the camera. Do NOT re-stage the room. Do NOT re-cast the students.
`.trim(),
  params: {
    size: '1536x1024',
    variations: 1,
    model: ImageModel.GeminiProImagePreview,
  },
});
