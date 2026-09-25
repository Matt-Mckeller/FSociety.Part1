import { defineSeed, ImageModel } from '../../seed.kit.js';

/**
 * S1-G Refresh — Step 1 of 3: Bottom-Left VAKL Learning Type Progress Bars.
 *
 * Chain position : FIRST (source = existing S1-G3 locked keyframe)
 * Source         : sceneCode:S1-G3  →  assetId e5cc0072b97a1191
 * Output         : sceneCode:S1-G.1  (promote with --star)
 *
 * VAKL = the four student learning modality model used in the 4eye app:
 *   V — Vision      (Visual)     — MUI Visibility (outlined) — fill 75 %
 *   A — Auditory                 — MUI Hearing (outlined)    — fill 60 %
 *   K — Kinesthetic              — MUI PanTool (outlined)    — fill 50 %
 *   L — Logic       (Analytical) — MUI Psychology (outlined) — fill 85 %
 *
 * REGION: bottom-left ~25 % of frame only.
 * EVERYTHING ELSE must be kept pixel-identical to the source.
 *
 * Pre-requisites:
 *   - sceneCode:MUI-GLYPHS-VAKL exists (composite reference sheet with all 4 VAKL glyphs)
 *     pnpm cli asset:promote <vakl-sheet-id> --to 00_reference --star --scene-code MUI-GLYPHS-VAKL
 *
 * After generation:
 *   pnpm -F @4eye/scene-studio-api cli asset:promote <chosen-id> \
 *     --to 03_alternates_and_iterations --scene-code S1-G.1 --star
 *
 * Usage:
 *   pnpm -F @4eye/scene-studio-api cli seed:run 01-bottom-left-vakl --dry-run
 *   pnpm -F @4eye/scene-studio-api cli seed:run 01-bottom-left-vakl --variations 2
 */
export default defineSeed({
  id: '01-bottom-left-vakl',
  description:
    'EDIT · S1-G Step 1/3 — add VAKL learning-type progress bars to bottom-left of S1-G3',
  kind: 'generate',
  sceneCode: 'S1-G.1',
  title: 'S1-G.1 — VAKL progress bars (step 1/3)',
  tags: ['scene-1', 'beat-1.5', 'edit', 's1-g-refresh', 'step:1/3', 'vakl'],
  references: [
    {
      kind: 'image',
      ref: 'sceneCode:S1-G3',
      role: 'edit-source',
      description:
        'S1-G3 original — Engagement signals aligned progress bars. Source frame for this entire 3-step chain. All regions EXCEPT the bottom-left ~25 % must remain pixel-identical.',
      required: true,
    },
    {
      kind: 'image',
      ref: 'sceneCode:MUI-GLYPHS-VAKL',
      role: 'style-reference',
      description:
        'Composite reference sheet showing all four VAKL MUI glyphs: Visibility (eye), Hearing (ear), PanTool (hand), Psychology (head outline). Use the exact glyph shapes from this sheet for the icons alongside each progress bar.',
      required: true,
    },
    {
      kind: 'text',
      ref: 'file:00-style-bible.md',
      role: 'style-spec',
      section: '§ 7.7 Canonical HUD Icon Set (LOCKED)',
      description: 'Locked HUD icon and palette rules — apply same cyan-amber style to the VAKL panel',
      required: true,
    },
  ],
  preconditions: [
    { ref: 'sceneCode:S1-G3', exists: true },
    { ref: 'sceneCode:MUI-GLYPHS-VAKL', exists: true },
  ],
  prompt: `
EDIT INSTRUCTION — single region edit only. Source: the provided S1-G3 image. Apply one addition to the bottom-left region and output a corrected image.

━━ EDIT 1 — Add VAKL Progress Bar Panel (bottom-left region) ━━
In the bottom-left approximately 25 % of the frame, insert a floating character-profile / stat-sheet panel with four horizontal progress bars arranged vertically. The panel sits on top of the existing image content in that region (it is a UI overlay).

PANEL STYLE:
  - Translucent dark-amber background panel with rounded corners, as if part of an in-world holographic HUD.
  - Soft cyan outer glow / border, matching the existing HUD aesthetic in the scene.
  - Panel feels like an RPG character stat sheet — clean, minimal, futuristic.

FOUR PROGRESS BARS (top to bottom, in this order):
  1. MUI Visibility glyph (open eye, from the reference sheet) + progress bar filled to 75 %
  2. MUI Hearing glyph (ear shape, from the reference sheet) + progress bar filled to 60 %
  3. MUI PanTool glyph (open hand, from the reference sheet) + progress bar filled to 50 %
  4. MUI Psychology glyph (head outline, from the reference sheet) + progress bar filled to 85 %

GLYPH FIDELITY: Use the exact outlined glyph shapes from the MUI-GLYPHS-VAKL reference. Do not interpret or redesign the glyphs.

BAR STYLE:
  - Track: thin horizontal bar, dark translucent background.
  - Fill: bright cyan from left edge to the specified fill %.
  - Fill glow: soft cyan bloom at the right edge of the filled portion.
  - Icon: MUI glyph to the LEFT of each bar, same size, cyan stroke, no fill.
  - No text. No letters. No "V A K L" labels. Glyph icons only.

FILL PERCENTAGES (HARD-CODED — do not change):
  - Row 1 (Visibility)  : 75 %
  - Row 2 (Hearing)     : 60 %
  - Row 3 (PanTool)     : 50 %
  - Row 4 (Psychology)  : 85 %

━━ KEEP IDENTICAL — everything else ━━
• ALL regions OUTSIDE the bottom-left ~25 % panel: pixel-identical.
• All students, teacher, 4eye, room geometry, background, existing UI elements — unchanged.
• Lighting, colour palette, illustration style, aspect ratio — unchanged.
• Do NOT add any text, labels, numbers, or additional UI elements beyond the four progress bars.
`.trim(),
  params: {
    size: '1536x1024',
    variations: 2,
    model: ImageModel.GeminiProImagePreview,
  },
});
