import { defineSeed, ImageModel } from '../seed.kit.js';

export default defineSeed({
  id: 's1-c-new5-skill-tree-fem',
  description:
    'GENERATE · S1-C-new5 variant — Skill Tree Expansion: female student (casual, bare arms) + 7 circular badge nodes + glowing energy web',
  kind: 'generate',
  sceneCode: 'S1-C-new5',
  title: 'S1-C-new5 — Skill Tree Expansion (female student variant)',
  tags: ['scene-1', 'beat-1.4b', 'gap-fill', 'skill-tree', 'variant'],
  references: [
    {
      kind: 'image',
      ref: 'tag:4eye-reference:starred',
      role: 'character-lock',
      description:
        'Starred 4eye reference sheet — locks style identity and illustration look.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'assetId:9deacda689324fb8',
      role: 'before-anchor',
      description:
        'S1-C-new4 — before bracket: character design, warm amber+cyan palette already established.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'assetId:d7673cf06d261d79',
      role: 'after-anchor',
      description:
        'S1-D — after bracket: direction of travel — full classroom awake, students engaged.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'sceneCode:MUI-GLYPHS-VAKL',
      role: 'style-reference',
      description:
        'VAKL composite reference sheet: Visibility, Hearing, PanTool, Psychology icon glyphs.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'sceneCode:MUI-GLYPHS-BADGES',
      role: 'style-reference',
      description:
        'Badge composite reference sheet: Shield, Redeem, ArrowUpward icon glyphs.',
      required: true,
    },
  ],
  preconditions: [
    { ref: 'tag:4eye-reference:starred', exists: true },
    { ref: 'assetId:9deacda689324fb8', exists: true },
    { ref: 'assetId:d7673cf06d261d79', exists: true },
    { ref: 'sceneCode:MUI-GLYPHS-VAKL', exists: true },
    { ref: 'sceneCode:MUI-GLYPHS-BADGES', exists: true },
  ],
  prompt: `
SCENE: Beat 1.4b — Skill Tree Expansion. Brief 1-second insert cut showing a student's hidden skill profile being revealed.

STYLE: Anime / painted-illustration style matching all S1 classroom shots. Soft painted shading, clean expressive linework, saturated but harmonious colour. NOT photoreal. Warm amber+cyan palette dominant.

CHARACTER: A teenage female student, seated at her desk in a medium close / three-quarter profile shot. She wears a casual short-sleeve top or tank top — bare arms visible, natural and unforced. Her skin catches the soft cyan-amber glow from the skill tree expanding beside her. Her expression is one of quiet wonder, eyes slightly wide, head tilted upward as the constellation appears. Approachable, relatable, expressive anime style. Hair natural and distinct — mid-length or pulled back loosely. Clothing is school-casual: simple, contemporary, no logos.

COMPOSITION: The student occupies the left 40–50% of the frame in profile/three-quarter view. The skill tree constellation expands from her right side and above her head. Classroom visible as soft background bokeh (desks, ceiling lights, other students barely visible). The cyan-amber glow from the skill tree casts soft light across her face and bare arms.

SKILL TREE UI:
  A constellation of exactly SEVEN circular badge nodes expands outward from her head, arranged in a loose organic radial pattern (not a rigid grid). Each node is a small glowing circle:
    - Dark amber/charcoal fill, bright cyan outline ring, inner MUI glyph.
    - Thin glowing cyan-amber energy lines connect the nodes, forming a small web.
    - Two nodes are "active" — additional circular progress rings outside their border, ~40–70% filled clockwise, glowing slightly brighter.
    - Remaining five nodes are "dormant" — progress rings empty or barely visible.

NODE ICONS (EXACTLY 7 — use exact glyph outlines from the two provided reference sheets):
  1. Visibility  (eye)       — VAKL reference
  2. Hearing     (ear)       — VAKL reference
  3. PanTool     (hand)      — VAKL reference
  4. Psychology  (head form) — VAKL reference
  5. Shield                  — Badge reference
  6. Redeem      (gift box)  — Badge reference
  7. ArrowUpward (chevron)   — Badge reference

CONSTRAINTS:
  - NO text. NO labels. NO numbers anywhere in frame.
  - The skill tree UI is a holographic / in-world overlay, not a screen.
  - Aspect ratio: 3:2 cinematic widescreen, same as all scene shots.
  - The skill tree nodes cast a gentle ambient cyan-amber glow on her face and bare arms.

COLOR AND MOOD:
  - Hero cyan-amber palette continues from S1-C-new4.
  - Active nodes noticeably brighter — small warm-amber pulse ring.
  - Mood: discovery, potential, wonder — a hidden capacity being illuminated.
`.trim(),
  params: {
    model: ImageModel.GeminiProImagePreview,
    variations: 1,
  },
});
