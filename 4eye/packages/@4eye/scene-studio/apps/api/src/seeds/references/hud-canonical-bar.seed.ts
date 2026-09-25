import { defineSeed, ImageModel } from '../seed.kit.js';

/**
 * HUD CANONICAL BAR — reference generation seed.
 *
 * Renders a single isolated image of the Teacher HUD spell bar as it must appear
 * in EVERY scene shot that includes the HUD. This image becomes the `hud-canonical`
 * starred asset that is passed as a `hud-lock` reference image to every per-shot
 * standardization edit seed.
 *
 * Canonical icon order (left → right):
 *   1. Visibility   — MUI Material Symbols Outlined (open-eye glyph)
 *   2. Shield       — MUI Material Symbols Outlined (shield glyph)
 *   3. Redeem       — MUI Material Symbols Outlined (wrapped-gift-box-with-ribbon glyph)
 *
 * Rules (from 00-style-bible.md § 7.7):
 *   - Exactly THREE buttons. Never more, never fewer.
 *   - ALWAYS in the order above. Never reorder.
 *   - NEVER text labels. Glyphs only.
 *   - Cyan-amber duotone glow. Glyph stroke = cyan, fill = transparent.
 *
 * Pre-requisites:
 *   - SVG reference assets must be imported and promoted with scene codes:
 *       pnpm cli asset:promote <visibility-svg-id> --to 00_reference --star --scene-code MUI-VISIBILITY-OUTLINED
 *       pnpm cli asset:promote <shield-svg-id>     --to 00_reference --star --scene-code MUI-SHIELD-OUTLINED
 *       pnpm cli asset:promote <redeem-svg-id>     --to 00_reference --star --scene-code MUI-REDEEM-OUTLINED
 *
 * After generation:
 *   pnpm cli asset:promote <chosen-id> --to 00_reference --star --scene-code HUD-CANONICAL
 *
 * Usage:
 *   pnpm -F @4eye/scene-studio-api cli seed:run hud-canonical-bar --dry-run
 *   pnpm -F @4eye/scene-studio-api cli seed:run hud-canonical-bar --variations 1
 */
export default defineSeed({
  id: 'hud-canonical-bar',
  description: 'GENERATE · Reference: canonical Teacher HUD three-button bar (Visibility · Shield · Redeem)',
  kind: 'generate',
  sceneCode: 'HUD-CANONICAL',
  title: 'HUD Canonical — three-button bar reference (Visibility · Shield · Redeem)',
  tags: ['reference', 'hud', 'hud-canonical', 'scene-1'],
  references: [
    {
      kind: 'image',
      ref: 'sceneCode:MUI-VISIBILITY-OUTLINED',
      role: 'style-reference',
      description:
        'MUI Visibility (outlined) SVG — the exact glyph shape for button 1 (leftmost). The model must reproduce this exact glyph inside button 1 of the HUD bar.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'sceneCode:MUI-SHIELD-OUTLINED',
      role: 'style-reference',
      description:
        'MUI Shield (outlined) SVG — the exact glyph shape for button 2 (center). The model must reproduce this exact glyph inside button 2.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'sceneCode:MUI-REDEEM-OUTLINED',
      role: 'style-reference',
      description:
        'MUI Redeem (outlined) SVG — the exact glyph shape for button 3 (rightmost). A wrapped gift box with a ribbon/bow on top. The model must reproduce this exact glyph inside button 3.',
      required: true,
    },
    {
      kind: 'text',
      ref: 'file:00-style-bible.md',
      role: 'style-spec',
      section: '§ 7.7 Canonical HUD Icon Set (LOCKED)',
      description: 'Locked HUD rules — icon order, count, color, no-text constraint',
      required: true,
    },
  ],
  preconditions: [
    { ref: 'sceneCode:MUI-VISIBILITY-OUTLINED', exists: true },
    { ref: 'sceneCode:MUI-SHIELD-OUTLINED', exists: true },
    { ref: 'sceneCode:MUI-REDEEM-OUTLINED', exists: true },
  ],
  prompt: `
SCENE: Generate a single, clean, isolated image of the Teacher HUD spell bar — the three-button floating UI panel that appears beside the teacher in the classroom shots.

COMPOSITION: Three horizontal floating pill/capsule buttons, equally spaced, arranged in a single row. The buttons hover in front of a transparent or neutral very-dark background with no other UI elements, no characters, no environment.

BUTTON ICONS (order is CRITICAL — do not reorder):
  Button 1 (leftmost)  — the Visibility glyph from the provided reference SVG: an eye shape, open, outlined, no fill.
  Button 2 (center)    — the Shield glyph from the provided reference SVG: a shield outline, no fill.
  Button 3 (rightmost) — the Redeem glyph from the provided reference SVG: a wrapped gift box with a ribbon/bow on top, outlined, no fill.

ICON FIDELITY: Reproduce the exact glyph outlines from the three SVG references provided. Do not interpret, stylize, or redesign the icons — they must match the reference outlines precisely, drawn in the same weight as each other.

STYLE: Anime / painted-illustration, matching the aesthetic of the S1 classroom shots.
  - Each button is a rounded capsule / pill shape with a soft translucent dark-teal fill and a glowing cyan rim/border.
  - The icon stroke inside each button is bright cyan (#00E5FF or close), thin, outlined, matching the reference glyph shape.
  - A soft amber-gold outer glow halos each button — identical halo on all three.
  - Button spacing: equal gaps, total bar reads as one cohesive floating UI element.
  - No text. No numbers. No labels. No background scene elements.

OUTPUT: Isolated HUD bar on a transparent or very dark neutral background. This will be used as a lock-reference for in-world HUD corrections in other scene shots, so clarity and icon legibility at full resolution are the priority.

ASPECT: 3:2 widescreen (same as scene shots) — bar occupies roughly the center third of the frame width, vertically centered.
`.trim(),
  params: {
    model: ImageModel.GeminiProImagePreview,
    variations: 1,
  },
});
