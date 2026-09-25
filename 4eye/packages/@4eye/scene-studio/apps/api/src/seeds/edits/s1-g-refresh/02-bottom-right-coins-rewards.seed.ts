import { defineSeed, ImageModel } from '../../seed.kit.js';

/**
 * S1-G Refresh — Step 2 of 3: Bottom-Right Coins + Rewards Stats.
 *
 * Chain position : SECOND (source = S1-G.1, output of step 1)
 * Source         : sceneCode:S1-G.1  (starred asset promoted in step 1)
 * Output         : sceneCode:S1-G.2  (promote with --star)
 *
 * REGION: bottom-right ~25 % of frame only.
 * Adds two icon-only stat tiles:
 *   1. Brand coin icon + numeral 817 (Coins Gained this session)
 *   2. MUI Redeem glyph + numeral 12  (Rewards Redeemed this session)
 * No labels. No captions. Numbers only.
 *
 * The VAKL panel added in step 1 (bottom-left) must be preserved exactly.
 * ALL other regions must be kept pixel-identical to the source.
 *
 * Pre-requisites:
 *   - sceneCode:S1-G.1 exists (output of 01-bottom-left-vakl, starred)
 *
 *   - sceneCode:COIN-STACK-BRAND exists (brand coin-stack SVG promoted to 00_reference)
 *       pnpm -F @4eye/scene-studio-api cli asset:import ./references/assets/brand/coin-stack.svg
 *       pnpm -F @4eye/scene-studio-api cli asset:promote <id> --to 00_reference --star --scene-code COIN-STACK-BRAND
 *
 *   - sceneCode:COIN-BRAND-SVG exists (single coin SVG promoted to 00_reference)
 *       pnpm -F @4eye/scene-studio-api cli asset:import ./references/assets/brand/coin.svg
 *       pnpm -F @4eye/scene-studio-api cli asset:promote <id> --to 00_reference --star --scene-code COIN-BRAND-SVG
 *
 *   - sceneCode:MUI-REDEEM-OUTLINED exists (Redeem SVG promoted to 00_reference)
 *
 * After generation:
 *   pnpm -F @4eye/scene-studio-api cli asset:promote <chosen-id> \
 *     --to 03_alternates_and_iterations --scene-code S1-G.2 --star
 *
 * Usage:
 *   pnpm -F @4eye/scene-studio-api cli seed:run 02-bottom-right-coins-rewards --dry-run
 *   pnpm -F @4eye/scene-studio-api cli seed:run 02-bottom-right-coins-rewards --variations 2
 */
export default defineSeed({
  id: '02-bottom-right-coins-rewards',
  description:
    'EDIT · S1-G Step 2/3 — add Coins 817 + Rewards 12 stat tiles to bottom-right of S1-G.1',
  kind: 'generate',
  sceneCode: 'S1-G.2',
  title: 'S1-G.2 — Coins + Rewards stats (step 2/3)',
  tags: ['scene-1', 'beat-1.5', 'edit', 's1-g-refresh', 'step:2/3', 'coins', 'rewards'],
  references: [
    {
      kind: 'image',
      ref: 'sceneCode:S1-G.1',
      role: 'edit-source',
      description:
        'S1-G.1 — output of step 1 (VAKL panel in bottom-left already applied). All regions EXCEPT the bottom-right ~25 % must remain pixel-identical, including the VAKL panel.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'sceneCode:COIN-STACK-BRAND',
      role: 'style-reference',
      description:
        'Brand coin STACK icon — a 3D stack of three amber/gold coins viewed from a slight angle, showing depth and thickness. OPTION A for the "Coins Gained" stat tile icon. Prefer this if the tile has enough vertical space for the stacked silhouette to read clearly.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'sceneCode:COIN-BRAND-SVG',
      role: 'style-reference',
      description:
        'Brand single coin icon — one amber/gold coin face-on with a 3D bevel rim. OPTION B for the "Coins Gained" stat tile icon. Prefer this if the tile is compact or the stack silhouette would be too small to read.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'sceneCode:MUI-REDEEM-OUTLINED',
      role: 'style-reference',
      description:
        'MUI Redeem (outlined) — wrapped gift box with ribbon. Use as the icon for the "Rewards Redeemed" stat tile. The numeral 12 appears to the right of this icon.',
      required: true,
    },
  ],
  preconditions: [
    { ref: 'sceneCode:S1-G.1', exists: true },
    { ref: 'sceneCode:COIN-STACK-BRAND', exists: true },
    { ref: 'sceneCode:COIN-BRAND-SVG', exists: true },
    { ref: 'sceneCode:MUI-REDEEM-OUTLINED', exists: true },
  ],
  prompt: `
EDIT INSTRUCTION — single region edit only. Source: the provided S1-G.1 image (VAKL panel already in bottom-left). Apply one addition to the bottom-right region and output a corrected image.

━━ EDIT 1 — Add Coins + Rewards Stat Tiles (bottom-right region) ━━
In the bottom-right approximately 25 % of the frame, insert a floating stats panel with TWO side-by-side icon+number stat tiles. The panel sits on top of the existing image content as a UI overlay.

PANEL STYLE:
  - Translucent dark-amber background panel with rounded corners, matching the style of the VAKL panel in the bottom-left.
  - Soft cyan outer glow / border.
  - The two tiles are horizontally arranged within the panel.

STAT TILE 1 — Coins Gained:
  - Icon: CHOOSE the best coin icon for this tile from the two provided references:
      OPTION A (COIN-STACK-BRAND) — 3D stack of three stacked amber/gold coins. Use if the tile is large enough for the stack silhouette to read clearly at HUD scale.
      OPTION B (COIN-BRAND-SVG) — single amber/gold coin, face-on with bevel rim. Use if the tile is compact and a single coin reads more cleanly.
    The coin (whichever chosen) should be rendered in warm amber/gold tones, 3D, matching the provided SVG palette.
  - Number: "817" immediately to the right of the icon.
  - Number style: large, bold, bright cyan-white (#E0F7FF or similar). No label text.

STAT TILE 2 — Rewards Redeemed:
  - Icon: the MUI Redeem glyph from the provided MUI-REDEEM-OUTLINED reference (wrapped gift box, outlined, cyan stroke).
  - Number: "12" immediately to the right of the icon.
  - Number style: same size, weight, and color as "817". No label text.

LAYOUT: The two tiles are equal-width, side by side within the panel. Icon and number are vertically centered within each tile. The two numbers "817" and "12" must be clearly legible at full resolution.

NO text other than the two numerals (817 and 12). No "Coins:" label, no "Rewards:" label, no captions.

━━ KEEP IDENTICAL — everything else ━━
• The VAKL panel in the bottom-left (from step 1): preserve exactly.
• ALL regions OUTSIDE the bottom-right ~25 % panel: pixel-identical.
• All students, teacher, 4eye, room geometry, background, existing UI elements — unchanged.
• Lighting, colour palette, illustration style, aspect ratio — unchanged.
`.trim(),
  params: {
    size: '1536x1024',
    variations: 2,
    model: ImageModel.GeminiProImagePreview,
  },
});
