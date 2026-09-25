import { defineSeed, ImageModel } from '../seed.kit.js';

/**
 * COIN STACK REFERENCE SHEET — brand coin stack multi-view reference generation seed.
 *
 * Generates a single reference sheet image showing the 4eye brand coin STACK across
 * six canonical views and use-cases. This image becomes the `COIN-STACK-REFERENCE`
 * starred asset — a richer generated reference that can be passed alongside or instead
 * of the raw `COIN-STACK-BRAND` SVG in any seed that needs to composite the coin stack
 * into a scene (HUD stat tiles, world props, reward animations, overlays, etc.).
 *
 * The coin stack (from CoinStackIcon.tsx, @expanse/brand-core):
 *   - Three stacked amber/gold coins viewed at a slight downward angle.
 *   - Each coin shows its face and the amber side-edge strip beneath it.
 *   - Top coin: full face visible (warm amber #E8B339, dark center disc).
 *   - Middle + Bottom: partially occluded, each contributing an edge band.
 *   - Palette: color #E8B339, shadowColor #9B6E1A, ringFaceFill #FFF6D6, centerColor #3A2A06.
 *   - Silhouette: wide ellipse, roughly 5:4 width:height, stack reads as distinctly 3 layers.
 *
 * This sheet is designed to answer: "how does the coin stack look when I add it to X?"
 * Every view is production-ready and directly compositable into a scene image.
 *
 * Views (6-panel grid, dark neutral BG):
 *   A. Canonical SVG  — reproduces the exact CoinStackIcon.tsx silhouette; hero reference view
 *   B. High Angle     — ~50° from above; all three coin faces visible as concentric ellipses
 *   C. Low Angle      — ~20° from below; stack height and edge bands dominate; cinematic
 *   D. HUD Scale      — coin stack rendered as a small (icon-size) HUD element inside a
 *                       translucent dark-amber stat tile panel, next to the numeral "817"
 *   E. World Prop     — coin stack sitting on a classroom desk surface, matching S1 scene
 *                       illustration style; integrated into the environment, not floating
 *   F. Reward Burst   — coin stack with a soft radial golden glow / burst behind it,
 *                       suggesting a "coins earned" reward moment; compositable as overlay
 *
 * Pre-requisite:
 *   pnpm -F @4eye/scene-studio-api cli asset:import ./references/assets/brand/coin-stack.svg
 *   pnpm -F @4eye/scene-studio-api cli asset:promote <id> --to 00_reference --star --scene-code COIN-STACK-BRAND
 *
 * After generation: promote the best output as the canonical stack reference:
 *   pnpm -F @4eye/scene-studio-api cli asset:promote <chosen-id> --to 00_reference --star --scene-code COIN-STACK-REFERENCE
 *
 * Usage:
 *   pnpm -F @4eye/scene-studio-api cli seed:run coin-stack-reference-sheet --dry-run
 *   pnpm -F @4eye/scene-studio-api cli seed:run coin-stack-reference-sheet --variations 1
 */
export default defineSeed({
  id: 'coin-stack-reference-sheet',
  description: 'GENERATE · Reference: 4eye brand coin stack multi-view sheet (canonical · angles · HUD · world prop · reward burst)',
  kind: 'generate',
  sceneCode: 'COIN-STACK-REFERENCE',
  title: 'Coin Stack Reference Sheet — 6-view: canonical, high angle, low angle, HUD tile, world prop, reward burst',
  tags: ['reference', 'coin', 'coin-stack', 'brand-coin', 'rewards', 'hud', 'compositable'],
  references: [
    {
      kind: 'image',
      ref: 'sceneCode:COIN-STACK-BRAND',
      role: 'style-reference',
      description:
        'The 4eye brand coin stack SVG (CoinStackIcon.tsx) — three stacked amber/gold coins at a slight ' +
        'downward angle. This is the master geometry and color reference for all six views on this sheet. ' +
        'Every view must reproduce the exact same 3-coin configuration — same proportions, same amber/gold ' +
        'palette (#E8B339 face, #9B6E1A shadow, #FFF6D6 ring face, #3A2A06 center), same layered silhouette. ' +
        'Do not invent a different stack depth, coin count, or color scheme.',
      required: true,
    },
  ],
  preconditions: [
    { ref: 'sceneCode:COIN-STACK-BRAND', exists: true },
  ],
  prompt: `
SCENE: Generate a single reference-sheet image showing the 4eye brand coin stack from six canonical views and use-cases, arranged in a clean 2×3 grid on a very dark neutral background (#0D0D0D or near-black). This sheet is a production compositing reference — every panel should look like something you could cut out and drop directly into a scene.

COIN STACK DESIGN (match the provided COIN-STACK-BRAND SVG reference exactly):
  - Three stacked coins, viewed from a slight downward angle — the canonical brand stack.
  - All three coins are amber/gold. The top coin face is most visible; middle and bottom recede behind it.
  - Face color: warm amber-gold #E8B339 — bright, metallic, slightly glowing.
  - Shadow / edge bands between coins: darker amber #9B6E1A — these are the depth strips that make the layers legible.
  - Ring face (outer halo area of each coin): very light warm white #FFF6D6.
  - Center disc on each coin face: very dark brown #3A2A06 — an embossed boss or relief mark.
  - The silhouette reads clearly as "three coins" even at small scale — this is critical.
  - Stylized 3D render quality — not photorealistic, not flat icon. Metallic gold with soft rim glow.

SIX VIEWS — arranged 2 columns × 3 rows, each with a small white label below:

  [A] "Canonical" (top-left):
      Reproduce the exact SVG silhouette — three coins stacked, slight downward viewing angle,
      approximately 5:4 width:height ratio. This is the hero reference view.
      The three edge-bands between coins are clearly visible. Coin faces slightly foreshortened.
      Label: "Canonical SVG"

  [B] "High Angle" (top-right):
      Camera elevated to ~50° above the stack. All three coin faces are visible as concentric
      ellipses, each slightly offset downward. Emphasises the layered structure from above.
      Good for "coin collection" or "pile" metaphors.
      Label: "High Angle"

  [C] "Low Angle" (middle-left):
      Camera lowered to ~20° from below. The stack's height and amber edge bands dominate.
      Coin faces are strongly foreshortened. Cinematic, heroic feel — good for reward moments.
      Label: "Low Angle"

  [D] "HUD Tile" (middle-right):
      The coin stack rendered as a small icon inside a realistic UI stat tile.
      Tile: translucent dark-amber panel, rounded corners, soft cyan outer glow.
      Layout inside the tile: [coin-stack icon] [space] [bold cyan-white numeral "817"]
      Icon is approximately 32–40px equivalent — the smallest size at which the 3-coin
      silhouette must still legibly read as a stack, not a blob.
      This is the primary compositable use-case for scene edits.
      Label: "HUD Tile · 817"

  [E] "World Prop" (bottom-left):
      The coin stack sitting on a wooden classroom desk surface, integrated into the
      illustrated-scene environment. Perspective matches the S1 classroom shots (slightly
      elevated camera, clean perspective). The coin stack casts a soft warm shadow.
      Style matches the painted-illustration quality of the classroom scenes — the stack
      looks like a physical object in the world, not a floating graphic.
      Label: "World Prop"

  [F] "Reward Burst" (bottom-right):
      The coin stack centered in the panel with a soft radial golden-amber glow / light burst
      radiating behind it — suggests "coins earned" or "reward unlocked."
      The burst is a compositable overlay element: soft enough not to obscure the stack,
      bright enough to read as a celebration moment. Faint particle sparkles optional.
      This panel should look like it could be dropped as a transparent overlay onto any scene.
      Label: "Reward Burst"

GRID LAYOUT:
  - Each panel has a faint dark-grey border (#1A1A1A) separating cells.
  - Small, clean sans-serif white labels, centered below each coin view.
  - No other text, no arrows, no dimensions.

LIGHTING: Consistent across A–C — primary warm light source upper-left, soft fill from below.
  Panel D uses the HUD's internal glow as light source. Panel E uses the classroom's ambient
  illustrated lighting. Panel F uses the burst as the primary light source.

STYLE: Stylized 3D render / painted-illustration hybrid — not photorealistic, not flat icon.
  The coin stack should feel like it belongs in the 4eye classroom world: warm, slightly
  glowing, amber-gold with a metallic sheen.

ASPECT RATIO: Square (1:1) — 2×3 reference grid.
`.trim(),
  params: {
    model: ImageModel.GeminiProImagePreview,
    variations: 1,
  },
});
