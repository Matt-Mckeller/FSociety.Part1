import { defineSeed, ImageModel } from '../seed.kit.js';

/**
 * S1-C-new5 — Skill Tree Expansion: v3 variant.
 *
 * Based on combo v2 (784b9e4b27358825) which had the right character and expression.
 * Two changes from v2:
 *   1. Hair: shoulder-length straight hair (no ponytail, no bun).
 *   2. Skill tree: more expansive — two rings of nodes (inner + outer), not just
 *      a flat single-layer cluster. The web should feel larger and more impressive,
 *      filling more of the right half of the frame.
 *
 * After generation:
 *   pnpm -F @4eye/scene-studio-api cli asset:promote <chosen-id> \
 *     --to 01_scene_keyframes --star --scene-code S1-C-new5
 *
 *   pnpm -F @4eye/scene-studio-api cli seq:show scene-1-classroom
 *   pnpm -F @4eye/scene-studio-api cli seq:insert scene-1-classroom <chosen-id> --at <N>
 *
 * Usage:
 *   pnpm -F @4eye/scene-studio-api cli seed:run s1-c-new5-skill-tree-v3 --dry-run
 *   pnpm -F @4eye/scene-studio-api cli seed:run s1-c-new5-skill-tree-v3 --variations 1
 */
export default defineSeed({
  id: 's1-c-new5-skill-tree-v3',
  description:
    'GENERATE · S1-C-new5 v3 — straight shoulder-length hair + expanded two-ring skill tree constellation',
  kind: 'generate',
  sceneCode: 'S1-C-new5',
  title: 'S1-C-new5 — Skill Tree Expansion (v3: straight hair + expanded tree)',
  tags: ['scene-1', 'beat-1.4b', 'gap-fill', 'skill-tree', 'variant', 'v3'],
  references: [
    {
      kind: 'image',
      ref: 'assetId:784b9e4b27358825',
      role: 'style-reference',
      description:
        'CLOSEST PRIOR VERSION — use this as the base to iterate from. ' +
        'Keep everything from this image: the composition, framing, lighting, classroom bokeh, ' +
        'the cyan-amber glow, the student\'s face shape, skin tone, expression (wide-eyed awe, ' +
        'upturned gaze), the head angle, the seated three-quarter pose, and the overall mood. ' +
        'Make ONLY the two changes described below (hair and tree expansion).',
      required: true,
    },
    {
      kind: 'image',
      ref: 'assetId:19ae3b241c3296df',
      role: 'style-reference',
      description:
        'Original style master — reference for the overall scene atmosphere and skill tree energy aesthetics.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'tag:4eye-reference:starred',
      role: 'style-spec',
      description: '4eye visual identity reference — illustration style consistency.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'sceneCode:MUI-GLYPHS-VAKL',
      role: 'style-reference',
      description:
        'VAKL composite reference sheet: Visibility (eye), Hearing (ear), PanTool (hand), Psychology (head). ' +
        'Four of the seven skill tree badge node icons.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'sceneCode:MUI-GLYPHS-BADGES',
      role: 'style-reference',
      description:
        'Badge composite reference sheet: Shield, Redeem (gift box), ArrowUpward (chevron). ' +
        'Three of the seven skill tree badge node icons.',
      required: true,
    },
  ],
  preconditions: [
    { ref: 'assetId:784b9e4b27358825', exists: true },
    { ref: 'assetId:19ae3b241c3296df', exists: true },
    { ref: 'tag:4eye-reference:starred', exists: true },
    { ref: 'sceneCode:MUI-GLYPHS-VAKL', exists: true },
    { ref: 'sceneCode:MUI-GLYPHS-BADGES', exists: true },
  ],
  prompt: `
TASK: Iterate on the provided closest-prior-version image with exactly TWO changes. Everything else stays identical.

━━ CHANGE 1 — HAIR ━━
Replace the student's hair with shoulder-length STRAIGHT hair that falls loose around her face and jaw.
  - NO ponytail. NO bun. NO updo. NO ties or hair accessories.
  - Straight, slightly layered, natural — falls to roughly collarbone/shoulder length.
  - Hair colour stays the same as in the prior version.
  - The straight hair should catch the same cyan-amber glow on its edges as the rest of the scene.

━━ CHANGE 2 — SKILL TREE EXPANSION ━━
Make the skill tree constellation significantly larger and more impressive — it should fill roughly
the right 55–60 % of the frame rather than clustering tightly near the head.

Expand to TWO rings of nodes around a central node, for a total of SEVEN nodes arranged as follows:
  • 1 central node — closest to the student's head, slightly above ear level.
  • 3 inner-ring nodes — arranged at roughly 60° intervals around the central node,
    moderate distance outward (~same as prior version's spread).
  • 3 outer-ring nodes — each positioned beyond one of the inner nodes, extending
    further out toward the frame edge. These outer nodes are connected back to their
    nearest inner node AND to adjacent outer nodes, creating a second, wider ring.

The result should feel like a galaxy / constellation that radiates outward in two waves,
with energy lines forming a visible inner web AND a larger outer ring — more depth,
more grandeur, more sense of a vast hidden skill profile being revealed.

ACTIVE NODES: Two nodes (one inner, one outer) have circular progress rings ~50–70 % filled,
glowing amber-bright. The rest are dormant (rings empty or barely visible).

NODE ICONS — same seven as prior version (use exact glyph outlines from the reference sheets):
  1. Visibility  (eye)       — VAKL reference
  2. Hearing     (ear)       — VAKL reference
  3. PanTool     (hand)      — VAKL reference
  4. Psychology  (head form) — VAKL reference
  5. Shield                  — Badge reference
  6. Redeem      (gift box)  — Badge reference
  7. ArrowUpward (chevron)   — Badge reference

The outer nodes cast a slightly dimmer glow than the inner nodes — depth falloff.
Energy lines connecting outer ring nodes are slightly thinner / more translucent than inner lines.

━━ KEEP IDENTICAL — everything else ━━
• The student's face shape, skin tone, expression (wide-eyed awe, upturned gaze), head angle — identical.
• Seated three-quarter profile pose — identical.
• Framing, camera distance, composition — identical.
• Classroom bokeh background — identical.
• Cyan-amber colour palette — identical.
• Anime / painted-illustration style — identical.
• NO text, NO labels, NO numbers anywhere in frame.
• Aspect ratio: 3:2 cinematic widescreen.
`.trim(),
  params: {
    model: ImageModel.GeminiProImagePreview,
    variations: 1,
  },
});
