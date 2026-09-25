import { defineAnimateSeed } from '../seed.kit.js';

/**
 * S1-B fly-in — Part 2 of 2 of the cold open.
 *
 * Continues from the LAST frame of `s1-a-cold-open` (4eye now facing the
 * classroom doorway). Workflow to seed this:
 *
 *   1. Run s1-a-cold-open and note the output asset id.
 *   2. pnpm -F @4eye/scene-studio-api cli vid:extract-frame --video <coldOpenAssetId> --at last
 *      → prints a new image asset id in 07_generated/
 *   3. Replace the placeholder below in `startRef` with that id, then run this seed.
 *
 * Motion intent (~6s, fits Veo 6s and Runway 6s):
 *   4eye glides forward through the hallway toward the open classroom doorway,
 *   accelerating gently from a standstill. As it crosses the threshold the
 *   classroom interior brightens — warm light blooms outward from 4eye's core,
 *   illuminating the desks, the teacher, and the walls. 4eye comes to rest
 *   centered in the doorway, hovering at a height that places its body just
 *   above the teacher's desk and the teacher (who is standing behind it).
 *   The camera holds steady; only 4eye and the classroom lighting change.
 *
 * Provider notes:
 *   - Single-image-to-video; the start frame is the only visual anchor.
 *   - Duration 6s works on both Veo (6s tier) and Runway (2..10 range).
 *   - Reduce to 5s if Runway over-extrapolates on the first run.
 *
 * Usage:
 *   pnpm -F @4eye/scene-studio-api cli vid:run --seed s1-b-fly-in --provider runway --dry-run
 *   pnpm -F @4eye/scene-studio-api cli vid:run --seed s1-b-fly-in --provider runway
 */
export default defineAnimateSeed({
  id: 's1-b-fly-in',
  description: 'S1-A.2: 4eye glides into classroom, room lights up as it enters',
  kind: 'animate',
  sceneCode: 'S1-A.2',

  // Last frame of s1-a-cold-open (d041ab3e17f5114b), extracted 2026-05-24.
  // 07_generated/s1-a-1-4eye-facing-the-camera-frame-1-of_frame-last_20260524-224759_270f2e96.png
  startRef: 'assetId:3f7702989a654bba',

  prompt:
    '4eye, a glowing teal orb with a luminous eye, hovers at the hallway side of an open ' +
    'classroom doorway, facing into the room. The classroom is dark and lifeless. 4eye ' +
    'pivots slightly to square up with the doorway, then glides forward through it — moving ' +
    'away from the camera, deeper into the classroom toward the teacher at the front. As ' +
    '4eye travels, its glow expands outward: a bright soft-white light with a faint teal ' +
    'tint radiates from the orb and grows larger, illuminating the walls, floor, ceiling, ' +
    'and desks in an ever-widening circle. 4eye is the only light source — a curious, ' +
    'vibrant character bringing energy into a dull space, representing improved engagement ' +
    'and a happier environment. The act of 4eye entering transforms the room: dark and ' +
    'disengaged becomes bright and full of possibility. 4eye comes to rest just past the ' +
    'threshold, the classroom now fully lit. The camera does not move.',

  durationSec: 3,
});
