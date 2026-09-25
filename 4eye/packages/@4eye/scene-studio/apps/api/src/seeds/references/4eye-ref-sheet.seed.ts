import { defineSeed } from '../seed.kit.js';

/**
 * Stage 6 anchor seed — GENERATE.
 *
 * Produces the canonical 3-pose (3/4-front · straight-front · side) character
 * reference sheet for 4eye on neutral gray.
 *
 * After running, star the best output and tag it `4eye-reference` so Stage-7 seeds
 * can resolve it via `tag:4eye-reference:starred`.
 * Run `asset:test <assetId>` on the outputs to get AI-graded pass/fail results.
 */
export default defineSeed({
  id: '4eye-ref-sheet',
  description: 'GENERATE · 4eye canonical 3-pose reference sheet (3/4 · front · side) on neutral gray',
  kind: 'generate',
  sceneCode: 'REF',
  title: '4eye Character Lock',
  tags: ['4eye-reference', 'character-lock'],
  references: [
    {
      kind: 'image',
      ref: 'assetId:af676eae3bd30cd8',
      role: 'character',
      description: 'Existing REF-01 character reference sheet — primary identity anchor',
      required: true,
    },
    {
      kind: 'text',
      ref: 'file:00-style-bible.md',
      role: '4eye-fragment',
      section: '7.6 4eye character fragment',
      description: 'Canonical copy-paste 4eye description',
      required: true,
    },
  ],
  preconditions: [
    { ref: 'assetId:af676eae3bd30cd8', exists: true },
  ],
  prompt: `
Generate a clean, production-grade character reference sheet for 4eye.

Critical source-reading instruction: the provided image is a multi-panel composite. Use ONLY the panel containing 4eye (the small spherical white drone mascot with a single cyan eye and visor). Completely ignore all other panels, humans, classroom elements, labels, and palettes in the reference image.

Layout: three full-body poses side by side on a single canvas — left: 3/4 front view, center: straight-on front view, right: profile/side view. Identical pose energy across all three (relaxed floating idle, arms naturally beside body). Even spacing.

Identity (locked — do not vary): single large glowing cyan eye, horizontal visor/strap across the eye, small dorsal antenna, soft cyan rim/glow, smooth matte body, friendly mascot proportions.

Background: plain neutral mid-gray (#888 approx), no environment, no props, no shadows on the ground — only a soft contact-glow under each pose.

Lighting: even key + subtle cyan rim, no harsh speculars, no lens flare. Cinema-grade matte render.

Framing: orthographic, all three poses at identical scale, full body visible head-to-toe with safe margins. Aspect 3:2.

Do NOT include: text, logos, watermarks, multiple characters, scene props, UI/HUD, ground shadows, color swatches, callouts, panel borders, storyboard annotations, or any humans.
`.trim(),
  params: {
    size: '1536x1024',
    variations: 4,
  },
});
