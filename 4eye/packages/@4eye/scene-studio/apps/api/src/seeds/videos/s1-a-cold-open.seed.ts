import { defineAnimateSeed, VideoModel } from '../seed.kit.js';

/**
 * S1-A cold open — Part 1 of 2: eye contact + emote + counter-clockwise turn.
 *
 * Start frame : S1-A.1 — 4eye facing the camera (Frame 1 of opener)
 *               assetId: e0b4cad5355f48af  →  01_scene_keyframes/S1-A.1_4eye_facing_classroom.png
 *
 * Motion intent (3 beats inside ~2s):
 *   1. Direct eye contact with the viewer.
 *   2. Emote — the eye narrows into a warm crescent ("smile") AND the glow
 *      pulses from cool teal to warm amber-gold and back.
 *   3. Counter-clockwise rotation so 4eye is oriented toward the center point
 *      at the top of the classroom doorframe ahead.
 *   Hallway interior remains static. No camera move.
 *
 * Continuation: this clip ends with 4eye facing the doorway. Use
 *   vid:extract-frame --video <outputId> --at last
 * to seed `s1-b-fly-in` (the approach + room-lights-up beat).
 *
 * Provider notes:
 *   - Single-image-to-video. The start frame is the only visual reference; the
 *     provider hallucinates the motion. Runway gen4_turbo accepts duration: 2.
 *   - Veo clamps duration to 4/6/8s, so a Veo run of this seed will be ~4s
 *     (the emote and turn will simply breathe more — still readable).
 *   - promptText hard limit: 1000 chars (Runway). Current prompt is well under.
 *
 * Reference images:
 *   - tag:4eye-reference:starred  → character-lock passed to Veo as referenceImage.
 *     Forces durationSec = 8 when using Veo (API requirement).
 *
 * Usage:
 *   pnpm -F @4eye/scene-studio-api cli vid:run --seed s1-a-cold-open --provider veo --dry-run
 *   pnpm -F @4eye/scene-studio-api cli vid:run --seed s1-a-cold-open --provider veo
 *   pnpm -F @4eye/scene-studio-api cli vid:run --seed s1-a-cold-open --provider runway
 */
export default defineAnimateSeed({
  id: 's1-a-cold-open',
  description: 'S1-A.1: 4eye eye-contact + emote + counter-clockwise turn to door',
  kind: 'animate',
  sceneCode: 'S1-A.1',
  model: VideoModel.Veo31GeneratePreview,

  startRef: 'assetId:e0b4cad5355f48af',

  references: [
    {
      kind: 'image',
      ref: 'tag:4eye-reference:starred',
      role: 'character-lock',
      description: 'Starred 4eye reference sheet — locks character identity across frames',
      required: true,
    },
  ],

  prompt:
    '4eye is a glowing teal orb with a single luminous eye, hovering in a school hallway ' +
    'facing the camera. Beat 1: 4eye\'s eye gazes downward for a brief moment, then slowly ' +
    'lifts to look directly at the camera, making eye contact with the viewer. Beat 2: the ' +
    'eye narrows into a warm crescent — a gentle smile — while the orb glow pulses from ' +
    'cool teal to warm amber-gold and back to teal. Beat 3: 4eye rotates counter-clockwise ' +
    'in place, smoothly orienting toward the center point at the top of the open classroom ' +
    'doorway ahead of it. The hallway walls, floor, ceiling, lockers, and lighting remain ' +
    'completely static. The camera does not move. The orb stays at the same position in the ' +
    'frame throughout — only the eye direction, the glow color, and the facing direction change.',

  // durationSec is forced to 8 by Veo when referenceImages are present.
  // Runway ignores referenceImages and will use 4s as declared.
  durationSec: 8,
});
