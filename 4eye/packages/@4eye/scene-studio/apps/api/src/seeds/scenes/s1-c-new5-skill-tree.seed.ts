import { defineSeed, ImageModel } from '../seed.kit.js';

/**
 * S1-C-new5 — Skill Tree Expansion (new keyframe between S1-C-new4 and S1-D).
 *
 * Position in sequence: AFTER S1-C-new4 (gift payoff), BEFORE S1-D (engaged classroom analytics).
 *   - BEFORE anchor: S1-C-new4 — assetId 9deacda689324fb8  (sceneCode S1-C4)
 *   - AFTER  anchor: S1-D      — assetId d7673cf06d261d79  (sceneCode S1-D)
 *
 * Beat: 1.4b — Skill Tree Expansion (~0:10–0:11)
 * Shot timing note: 1 s stolen from Beat 1.5 to accommodate this new shot.
 *
 * Concept: A single student in profile / three-quarter view. A constellation UI expands
 * outward from their head — seven circular MUI-icon badge nodes connected by thin glowing
 * energy lines forming a small web. Two nodes have circular progress rings that are partially
 * filled. No text, no labels, no numbers.
 *
 * Node count: EXACTLY 7 (per resolved decision 7D).
 * Badge icons (from the two composite reference sheets):
 *   VAKL set  (4 nodes): Visibility, Hearing, PanTool, Psychology
 *   Badge set (3 nodes): Shield, Redeem, ArrowUpward (engagement/progression chevron)
 *
 * Camera: slow push-in on the student's face.
 * Color: hero cyan-amber; active nodes have a brighter ring.
 *
 * Pre-requisites:
 *   - sceneCode:MUI-GLYPHS-VAKL exists (composite sheet: Visibility, Hearing, PanTool, Psychology)
 *   - sceneCode:MUI-GLYPHS-BADGES exists (composite sheet: Shield, Redeem, ArrowUpward)
 *   Both promoted to 00_reference with --star.
 *
 * After generation:
 *   pnpm -F @4eye/scene-studio-api cli asset:promote <chosen-id> \
 *     --to 01_scene_keyframes --scene-code S1-C-new5 --star
 *
 *   # Insert into sequence after S1-C-new4 (assetId 9deacda689324fb8):
 *   # First find its position:
 *   pnpm -F @4eye/scene-studio-api cli seq:show scene-1-master
 *   # Then insert at position N+1:
 *   pnpm -F @4eye/scene-studio-api cli seq:insert scene-1-master <chosen-id> --at <N+1>
 *
 * Usage:
 *   pnpm -F @4eye/scene-studio-api cli seed:run s1-c-new5-skill-tree --dry-run
 *   pnpm -F @4eye/scene-studio-api cli seed:run s1-c-new5-skill-tree --variations 1
 */
export default defineSeed({
  id: 's1-c-new5-skill-tree',
  description:
    'GENERATE · S1-C-new5 — Skill Tree Expansion: single student + 7 circular badge nodes + glowing energy web',
  kind: 'generate',
  sceneCode: 'S1-C-new5',
  title: 'S1-C-new5 — Skill Tree Expansion (Beat 1.4b)',
  tags: ['scene-1', 'beat-1.4b', 'gap-fill', 'skill-tree', 'between:S1-C-new4:S1-D'],
  references: [
    {
      kind: 'image',
      ref: 'tag:4eye-reference:starred',
      role: 'character-lock',
      description:
        'Starred 4eye reference sheet — locks style identity and illustration look. 4eye may not appear in this shot but the visual style must match all other S1 frames.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'assetId:9deacda689324fb8',
      role: 'before-anchor',
      description:
        'S1-C-new4 — 4eye offers gift payoff. BEFORE bracket: character design (student clothing, teacher, room), warm amber+cyan palette already established. This skill tree shot continues directly from this moment.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'assetId:d7673cf06d261d79',
      role: 'after-anchor',
      description:
        'S1-D — engaged classroom analytics. AFTER bracket: direction of travel — the full classroom is awake, students engaged, analytics UI is present. This shot is a brief moment just before that full tableau.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'sceneCode:MUI-GLYPHS-VAKL',
      role: 'style-reference',
      description:
        'VAKL composite reference sheet: Visibility (eye), Hearing (ear), PanTool (hand), Psychology (head). Four of the seven skill tree badge node icons.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'sceneCode:MUI-GLYPHS-BADGES',
      role: 'style-reference',
      description:
        'Badge composite reference sheet: Shield, Redeem (gift box), ArrowUpward (chevron). Three of the seven skill tree badge node icons.',
      required: true,
    },
    {
      kind: 'text',
      ref: 'file:scenes/scene-1-classroom.md',
      role: 'beat-spec',
      section: 'Beat 1.4b — Skill Tree Expansion',
      description: 'Action, camera, color, sound, and concept rules for Beat 1.4b',
      required: true,
    },
    {
      kind: 'text',
      ref: 'file:00-style-bible.md',
      role: 'style-spec',
      section: '§ 7.7 Canonical HUD Icon Set (LOCKED)',
      description: 'Locked icon and palette rules — applies to badge node icon styling',
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
SCENE: A new keyframe, Beat 1.4b — Skill Tree Expansion. This shot is inserted between the gift-payoff moment (S1-C-new4) and the full engaged-classroom analytics tableau (S1-D). It is a brief (1-second) insert cut that shows the moment a student's hidden skill profile is revealed.

STYLE: Single illustrated frame in the SAME stylised anime / painted-illustration look as all S1 classroom shots. Soft painted shading, clean expressive linework, saturated but harmonious colour. NOT photoreal. Matches the warm amber+cyan palette that is already dominant from S1-C-new4 onwards.

COMPOSITION: Medium close shot on ONE student, profile or three-quarter view. The student is seated at their desk, their face slightly lit by the incoming skill-tree glow. The classroom is visible in soft background bokeh (room depth maintained from the before/after anchors). No new characters enter frame.

SKILL TREE UI:
  A constellation of exactly SEVEN circular badge nodes expands outward from the student's head, arranged in a loose organic radial pattern (not a rigid grid). Each node is a small glowing circle:
    - Dark amber/charcoal fill, bright cyan outline ring, inner MUI glyph.
    - Thin glowing cyan-amber energy lines connect the nodes to each other, forming a small web.
    - Two of the seven nodes are "active" — they have an additional circular progress ring visible outside their border, as if in the process of filling clockwise (show them at approximately 40 %–70 % filled). These rings glow slightly brighter than inactive nodes.
    - The remaining five nodes are present but "dormant" — their progress rings are empty or barely visible.

NODE ICONS (EXACTLY 7 — use the exact glyph outlines from the two provided reference sheets):
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
  - Camera: the composition reads as a slow push-in (capture as a still at peak push-in — student face and skill tree fill ~60 % of frame width).
  - Room background in soft bokeh: desks, ceiling lights, other students barely visible — same 3D world as all S1 shots.
  - Aspect ratio: 3:2 cinematic widescreen, same as all scene shots.

COLOR AND MOOD:
  - Hero cyan-amber palette continues from S1-C-new4.
  - The skill tree nodes cast a gentle ambient cyan-amber glow on the student's face.
  - Active nodes are noticeably brighter — small warm-amber pulse ring around them.
  - Mood: discovery, expansion, potential — the feeling of seeing a hidden capacity illuminated.
`.trim(),
  params: {
    model: ImageModel.GeminiProImagePreview,
    variations: 1,
  },
});
