import { defineSeed, ImageModel } from '../seed.kit.js';

/**
 * S1-C-new5 — Skill Tree Expansion: style-locked combo variant.
 *
 * Combines:
 *   STYLE  from assetId 19ae3b241c3296df  — beat-1-4b v2 ("e5f4e8e7")
 *          The preferred composition, lighting, skill tree web, and overall
 *          cinematic mood: dark classroom background, strong cyan-amber glow,
 *          tight push-in framing, constellation web fully expanded.
 *
 *   CHARACTER from assetId 0193602e727f11e2  — female-student-vari v1 ("0233bc0e")
 *          The preferred female student: casual top, bare arms, natural
 *          mid-length hair, expressive face turned slightly upward in wonder.
 *
 * Goal: reproduce the style/composition/lighting of the first image but with
 * the female character from the second.
 *
 * After generation:
 *   pnpm -F @4eye/scene-studio-api cli asset:promote <chosen-id> \
 *     --to 01_scene_keyframes --star --scene-code S1-C-new5
 *
 *   pnpm -F @4eye/scene-studio-api cli seq:show scene-1-classroom   # find position after S1-C-new4
 *   pnpm -F @4eye/scene-studio-api cli seq:insert scene-1-classroom <chosen-id> --at <N>
 *
 * Usage:
 *   pnpm -F @4eye/scene-studio-api cli seed:run s1-c-new5-skill-tree-combo --dry-run
 *   pnpm -F @4eye/scene-studio-api cli seed:run s1-c-new5-skill-tree-combo --variations 1
 */
export default defineSeed({
  id: 's1-c-new5-skill-tree-combo',
  description:
    'GENERATE · S1-C-new5 combo v2 — tree shape + expression from beat-1-4b v2, female character body from fem-variant v1',
  kind: 'generate',
  sceneCode: 'S1-C-new5',
  title: 'S1-C-new5 — Skill Tree Expansion (combo v2: tree shape + expression locked to style master)',
  tags: ['scene-1', 'beat-1.4b', 'gap-fill', 'skill-tree', 'variant', 'combo', 'v2'],
  references: [
    {
      kind: 'image',
      ref: 'assetId:19ae3b241c3296df',
      role: 'style-reference',
      description:
        'STYLE MASTER — reproduce this image\'s composition, lighting, and mood as closely as possible. ' +
        'Key elements to match exactly: dark classroom background in bokeh, the skill tree constellation ' +
        'web (7 glowing cyan-amber nodes connected by thin energy lines, 2 active with progress rings), ' +
        'the tight three-quarter push-in framing, the overall cyan-amber glow casting light across the ' +
        'frame, and the cinematic 3:2 widescreen crop. This image defines the TARGET visual output.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'assetId:0193602e727f11e2',
      role: 'character-lock',
      description:
        'CHARACTER MASTER — the student in the final image must be this exact female student. ' +
        'Match her precisely: casual short-sleeve top / bare arms, natural mid-length hair, ' +
        'skin tone, face shape, expression of quiet wonder (eyes slightly wide, head tilting ' +
        'upward toward the skill tree). Place her in the same left-of-frame three-quarter ' +
        'profile position as the style-reference image, with the skill tree expanding from ' +
        'her right side / above her head. Her bare arms and face should receive the same ' +
        'cyan-amber ambient glow as in the style-reference.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'tag:4eye-reference:starred',
      role: 'style-spec',
      description:
        '4eye visual identity reference — overall illustration style (anime/painted, clean linework, ' +
        'saturated palette) must remain consistent with this reference.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'sceneCode:MUI-GLYPHS-VAKL',
      role: 'style-reference',
      description:
        'VAKL composite reference sheet: Visibility (eye), Hearing (ear), PanTool (hand), Psychology (head). ' +
        'Four of the seven skill tree badge node icons — glyph shapes must be reproduced exactly.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'sceneCode:MUI-GLYPHS-BADGES',
      role: 'style-reference',
      description:
        'Badge composite reference sheet: Shield, Redeem (gift box), ArrowUpward (chevron). ' +
        'Three of the seven skill tree badge node icons — glyph shapes must be reproduced exactly.',
      required: true,
    },
  ],
  preconditions: [
    { ref: 'assetId:19ae3b241c3296df', exists: true },
    { ref: 'assetId:0193602e727f11e2', exists: true },
    { ref: 'tag:4eye-reference:starred', exists: true },
    { ref: 'sceneCode:MUI-GLYPHS-VAKL', exists: true },
    { ref: 'sceneCode:MUI-GLYPHS-BADGES', exists: true },
  ],
  prompt: `
TASK: Generate a single illustrated keyframe. You have two source images:
  • Image 1 = STYLE MASTER  (assetId 19ae3b241c3296df)
  • Image 2 = CHARACTER MASTER  (assetId 0193602e727f11e2)

━━ CRITICAL RULE — TWO THINGS TO TAKE FROM EACH IMAGE ━━

FROM IMAGE 1 (Style Master) — copy these EXACTLY, do not improvise:
  1. SKILL TREE SHAPE: The exact spatial topology of the seven-node constellation —
     the position of each node relative to the others, the angles and lengths of the
     connecting energy lines, which nodes are clustered near the head vs. fanned out,
     the overall silhouette of the web. Treat it as pixel-precise tracing of the UI
     layer from Image 1. The tree must look like Image 1's tree.
  2. FACIAL EXPRESSION: The exact head angle, eye direction, and emotional expression
     of the student in Image 1 — eyes wide, slightly upturned gaze toward the tree,
     lips gently parted, a look of awe and discovery. This exact expression on the
     female student's face.
  3. COMPOSITION & LIGHTING: Framing, camera distance, background bokeh darkness,
     and the cyan-amber glow falloff across the face — all from Image 1.

FROM IMAGE 2 (Character Master) — copy these EXACTLY, do not improvise:
  1. CHARACTER IDENTITY: The female student's physical appearance — her face shape,
     skin tone, hair (mid-length, natural), casual short-sleeve top, bare arms.
     She is the subject; only her physical form comes from Image 2.

━━ SYNTHESIS INSTRUCTION ━━
The final image = Image 1 with the student character body/appearance swapped for the
female student from Image 2, while the expression, head tilt, eye direction, and the
entire skill tree UI are kept identical to Image 1. Think of it as a face/character
transplant onto Image 1's pose and scene — NOT a new composition.

━━ SKILL TREE UI (trace from Image 1) ━━
SEVEN circular badge nodes — match Image 1's exact radial arrangement:
  - Dark amber/charcoal fill, bright cyan outline ring, inner MUI glyph.
  - Thin glowing cyan-amber energy lines: same angles, same lengths as Image 1.
  - TWO active nodes (same positions as in Image 1): progress rings ~40–70 % filled.
  - FIVE dormant nodes (same positions as in Image 1): rings empty/barely visible.
  - Overall tree silhouette/shape must be recognisably identical to Image 1.

NODE ICONS (use exact glyph outlines from the provided reference sheets):
  1. Visibility  (eye)       — VAKL reference
  2. Hearing     (ear)       — VAKL reference
  3. PanTool     (hand)      — VAKL reference
  4. Psychology  (head form) — VAKL reference
  5. Shield                  — Badge reference
  6. Redeem      (gift box)  — Badge reference
  7. ArrowUpward (chevron)   — Badge reference

━━ STYLE ━━
Anime / painted-illustration. Soft painted shading, clean expressive linework.
NOT photoreal. Hero cyan-amber palette. Mood: discovery, potential, wonder.

━━ CONSTRAINTS ━━
• NO text, NO labels, NO numbers anywhere in frame.
• Skill tree is a holographic in-world overlay, not a screen.
• Aspect ratio: 3:2 cinematic widescreen.
`.trim(),
  params: {
    model: ImageModel.GeminiProImagePreview,
    variations: 1,
  },
});
