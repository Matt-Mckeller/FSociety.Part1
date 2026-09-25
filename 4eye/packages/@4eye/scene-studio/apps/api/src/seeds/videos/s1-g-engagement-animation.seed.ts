import { defineAnimateSeed, VideoModel } from '../seed.kit.js';

/**
 * S1-G Engagement Animation — subtle character motion + UI accumulation.
 *
 * DEPENDENCY: This seed MUST run AFTER the S1-G refresh chain (seeds/edits/s1-g-refresh/)
 * produces S1-G.3-final and it has been promoted to 01_scene_keyframes with:
 *   pnpm cli asset:promote <id> --to 01_scene_keyframes --scene-code S1-G.3-final --star
 *
 * Start frame : S1-G.3-final (RPG-loadout redesigned keyframe, final output of the 3-step chain)
 *               Referenced via sceneCode:S1-G.3-final (picks starred asset)
 *
 * Duration: 8 s (Veo clamps to 8 s when referenceImages present)
 *
 * Motion intent across ~8 s clip:
 *   0.0–1.5 s  — VAKL bars (bottom-left) animate in, filling from 0 → locked %:
 *                Visibility 75 %, Hearing 60 %, PanTool 50 %, Psychology 85 %.
 *   1.5–3.0 s  — Coin counter (bottom-right) ticks 0 → 817 with small gold-flash
 *                particles emitting from one nearby student.
 *   3.0–4.5 s  — RPG silhouette icons (Visibility, Hearing, PanTool, Psychology) materialize
 *                one at a time, each landing with a soft cyan glow ping.
 *   4.5–6.0 s  — One icon on the silhouette pulses and an upward chevron floats up ~30 px
 *                and fades. The Redeem icon flashes amber once (reward moment).
 *   6.0–8.0 s  — System holds; all elements glow steadily. Characters breathe/micro-shift.
 *
 * Character motion constraints:
 *   - Every visible student: ONE subtle motion — gentle inhale, slow blink,
 *     micro head-turn toward HUD, or slight shoulder shift. No walking, no standing.
 *   - Teacher: micro-smile deepens by 1 beat. No large gesture.
 *   - Camera: LOCKED. No camera move.
 *   - Environment: completely static.
 *
 * After generation:
 *   pnpm -F @4eye/scene-studio-api cli asset:promote <chosen-id> --to 05_videos
 *   pnpm -F @4eye/scene-studio-api cli seq:insert scene-1-master <chosen-id>
 *     (or use seq:replace if swapping an existing S1-G video placeholder)
 *
 * Veo note: referenceImages present → duration auto-clamps to 8 s. Prompt hard limit ~1000 chars.
 *
 * Usage:
 *   pnpm -F @4eye/scene-studio-api cli vid:run --seed s1-g-engagement-animation --provider veo --dry-run
 *   pnpm -F @4eye/scene-studio-api cli vid:run --seed s1-g-engagement-animation --provider veo
 */
export default defineAnimateSeed({
  id: 's1-g-engagement-animation',
  description:
    'S1-G.3-final: subtle student breaths + sequential UI accumulation (VAKL bars fill → coins tick → RPG icons appear → chevron float)',
  kind: 'animate',
  sceneCode: 'S1-G.3-final',
  model: VideoModel.Veo31GeneratePreview,

  startRef: 'sceneCode:S1-G.3-final',

  references: [
    {
      kind: 'image',
      ref: 'tag:4eye-reference:starred',
      role: 'character-lock',
      description:
        'Starred 4eye reference sheet — locks 4eye character identity. Forces durationSec = 8 on Veo (API requirement for referenceImages).',
      required: true,
    },
  ],

  prompt:
    'A redesigned classroom engagement dashboard frame. Camera is locked — no camera movement. ' +
    'Beat 1 (0-1.5s): four VAKL progress bars in the bottom-left panel animate in, each filling ' +
    'smoothly from empty to their target percentage. ' +
    'Beat 2 (1.5-3s): coin counter in the bottom-right panel ticks upward to 817; small amber-gold ' +
    'light particles burst briefly from one student as if coins are being awarded to them. ' +
    'Beat 3 (3-4.5s): four MUI icon badges on the center RPG silhouette materialize one by one, ' +
    'each appearing with a brief cyan glow ring that pulses and settles. ' +
    'Beat 4 (4.5-6s): one icon on the silhouette pulses with a brighter glow; a small upward ' +
    'chevron arrow floats upward about 30 pixels and fades out over half a second. The Redeem gift ' +
    'icon in the bottom-right flashes amber once. ' +
    'Beat 5 (6-8s): all UI elements hold steady with a gentle ambient glow. Each visible student ' +
    'performs exactly one subtle motion — a slow blink, a quiet inhale, or a micro head-turn toward ' +
    'the nearest HUD panel. No large body movements. The teacher\'s expression softens slightly. ' +
    'The classroom environment does not move. No new characters, no new text, no camera shake.',

  durationSec: 8,
});
