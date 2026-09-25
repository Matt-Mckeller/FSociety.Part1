import { defineSeed, ImageModel } from '../seed.kit.js';

/**
 * Stage 7 gap-fill seed — GENERATE.
 *
 * Renders the FIRST sub-beat of Beat 1.2 ("4eye Arrives"): the moment the classroom
 * door opens on its own and 4eye is just inside the doorway. This frame BRIDGES
 * two existing locked keyframes:
 *   - BEFORE: S1-A (cold open, gray-blue, empty classroom)
 *   - AFTER : S1-B (4eye hand-off at the teacher's desk, warm spill, mid-action)
 * It introduces the FIRST warm cyan-amber spill that will fully take over by S1-B.
 *
 * Refs:
 *   - tag:4eye-reference:starred     → identity lock for the 4eye character
 *   - assetId:e86cc2d195824fc0 (S1-A) → BEFORE anchor (room layout + cold palette)
 *   - assetId:ae8d3a7b1d2e8528 (S1-B) → AFTER anchor (target palette/warmth + 4eye scale)
 *   - § Beat 1.2 of scenes/scene-1-classroom.md → action/camera/color/sound rules
 *
 * Default model: ImageModel.GeminiProImagePreview (pro quality for scene work).
 * Override per-run with --model NAME.
 *
 * Fallback plan if pure generation drifts off-layout:
 *   1. Run `pnpm cli seed:run s1-c1.5-4eye-doorway --variations 4` and pick the
 *      best of N. If none preserve the room geometry, escalate to step 2.
 *   2. Switch to an image-to-image EDIT workflow: start from the S1-A asset,
 *      add 4eye + the doorway warm spill via the edit provider (Gemini or
 *      OpenAI), keeping all other pixels intact. This guarantees layout
 *      continuity at the cost of being less photographic.
 *   3. If still off, use an inpaint mask covering only the doorway region
 *      (see GeminiImageProvider / OpenAiImageProvider edit endpoints which
 *      both accept a mask).
 */
export default defineSeed({
  id: 's1-c1.5-4eye-doorway',
  description: 'GENERATE · Scene 1 gap-fill · 4eye at the open classroom doorway (between S1-A and S1-B)',
  kind: 'generate',
  sceneCode: 'S1-A.5',
  title: 'S1-A.5 — 4eye at the doorway (between S1-A and S1-B)',
  tags: ['scene-1', 'beat-1.2', 'gap-fill', '4eye', 'between:S1-A:S1-B'],
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
      ref: 'assetId:e86cc2d195824fc0',
      role: 'before-anchor',
      description: 'S1-A-orig empty cool classroom (BEFORE bracket) — source of: classroom layout, window positions, desk grid, teacher\'s desk position, cool/dim baseline palette of an undisturbed working classroom.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'assetId:161020d1c66b3272',
      role: 'after-anchor',
      description: 'S1-C-old1 teacher-HUD-pre-tap (AFTER bracket / direction of travel) — source of: anime/painted-illustration style, target warm amber+cyan palette, teacher\'s position at front of room, attentive students, eventual fully-lit room mood. We are NOT there yet in this frame — only pulling style + character design + direction-of-travel hints.',
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
ANIMATION INTENT: This still is the OPENING frame of the video and the BEFORE bracket of a short animation sequence. The chain is:  THIS FRAME (4eye hovers in the hallway just outside an open classroom door, class undisturbed) → mid-room frame (4eye has stepped inside, light has filled the room, kids stir, 4eye turns toward teacher, teacher looks up) → [CUT to S1-C-old1: teacher at the front, HUD pre-tap]. The hallway-POV camera in this frame must be PIXEL-IDENTICAL to the mid-room frame that follows so they can be temporally interpolated.

STYLE: single illustrated frame in the SAME stylised anime / painted-illustration look as the S1-C-old1 reference. Soft painted shading, clean expressive linework, saturated but harmonious colour. NOT photoreal. NO lens flare, NO film grain, NO photographic depth-of-field. Match S1-C-old1's line weight, shading style, and rendering fidelity.

Scene: a school hallway just outside an open classroom doorway. The camera is positioned in the hallway looking through the open door INTO the classroom. 4eye hovers in the foreground IN THE HALLWAY — he has NOT yet entered the room. He is a few feet back from the threshold, calm, friendly, gently floating. The classroom interior is visible through the doorway but is UNDISTURBED: students working quietly at their desks, the teacher working at her desk at the front — nobody has noticed the door or 4eye yet. Everyone is still focused on their own work.

Character (4eye): match the locked character reference EXACTLY. Spherical body, single large glowing cyan eye, horizontal visor/strap, small dorsal antenna, soft cyan rim/glow, smooth matte body. Small mascot scale (roughly head-sized relative to a standing adult). Do not redesign. He is empty-handed.

Composition: medium shot. The open doorway dominates the frame as a window into the quiet classroom. 4eye sits in the foreground/midground IN THE HALLWAY in front of the doorway. The classroom and its occupants are visible through the doorway in the midground/background.

Lighting/color: the classroom INTERIOR is the cool/dim baseline — desaturated gray-blue, calm, undisturbed working lighting. The HALLWAY around 4eye is also fairly cool but a soft warm cyan-amber glow emanates gently from 4eye himself — a subtle cyan rim on his body and a faint warm pool on the hallway floor directly beneath him. The warmth has NOT yet entered the classroom. There may be the very first hint of warm spill just beginning to creep onto the doorway threshold, but the classroom interior is entirely still in the cool palette.

Mood: quiet, hopeful arrival. The contrast between the gentle warm glow around 4eye in the hallway and the cool quiet classroom behind him is the emotional point of this frame — something is about to happen but has not happened yet.

Aspect: 3:2 cinematic widescreen.

ROOM GEOMETRY — the classroom visible through the doorway must use the SAME 3D world as the after-anchor S1-C-old1 reference: same window count/placement/size, same desk grid, same teacher's desk position, same board, same ceiling lights, same wall colour, same floor material. The camera here is in the hallway (a position not visible in S1-C-old1) but the room beyond the door is the same physical set. This is critical: this frame and the mid-room frame that follows will share IDENTICAL camera position and IDENTICAL room geometry — they differ only in lighting and character reactions — so a downstream image-to-video model can morph between them cleanly.

Do NOT include: text, logos, watermarks, captions, panel borders, storyboard annotations, multiple panels, color swatches, callouts, UI/HUD elements, the HUD device (arrives later in Beat 1.4), gift box / present (arrives later), any humans rendered in the 4eye style, any other floating drones besides 4eye, any photoreal rendering style.
`.trim(),
  params: {
    size: '1536x1024',
    variations: 2,
    model: ImageModel.GeminiProImagePreview,
  },
});
