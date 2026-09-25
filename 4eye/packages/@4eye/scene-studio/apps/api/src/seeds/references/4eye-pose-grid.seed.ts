import { defineSeed } from '../seed.kit.js';

/**
 * Stage 6b seed — GENERATE (follow-up).
 *
 * Consumes the locked 4eye reference (`tag:4eye-reference:starred`) and generates a
 * 6-pose visual grid (3 cols × 2 rows) showing 4eye in varied angles + lighting.
 * Useful for checking style consistency visually across poses.
 *
 * This seed generates MORE images — it does NOT validate them automatically.
 * Use `asset:test <assetId>` on outputs to get AI-graded pass/fail results.
 *
 * Hard-depends on the starred lock — fails fast if the reference is missing.
 */
export default defineSeed({
  id: '4eye-pose-grid',
  description: 'GENERATE · 4eye 6-pose visual grid (varied angles/lighting) from locked reference',
  kind: 'generate',
  sceneCode: 'REF',
  title: '4eye Character Eval',
  tags: ['4eye-eval', 'character-eval'],
  references: [
    {
      kind: 'image',
      ref: 'tag:4eye-reference:starred',
      role: 'character-lock',
      description: 'Starred 4eye reference sheet produced by 4eye-character-locked seed',
      required: true,
    },
    {
      kind: 'text',
      ref: 'file:00-style-bible.md',
      role: '4eye-fragment',
      section: '7.6 4eye character fragment',
      description: 'Canonical 4eye identity spec',
      required: true,
    },
  ],
  preconditions: [
    // Hard fail if the lock has not been produced + tagged yet.
    { ref: 'tag:4eye-reference:starred', exists: true },
  ],
  prompt: `
Produce a 6-cell character-fidelity test grid for 4eye on a single canvas.

The provided reference image is the LOCKED 4eye design. Match its identity exactly across every cell: single large glowing cyan eye, horizontal visor/strap, small dorsal antenna, soft cyan rim/glow, smooth matte body, friendly mascot proportions, consistent scale.

Layout: 3 columns × 2 rows on a single canvas. Thin neutral dividers between cells are OK; no text labels. Each cell shows 4eye in one of the following situations, all on plain neutral mid-gray (#888) background with a soft contact-glow only:
  1. Floating idle, straight-on, eye level — baseline.
  2. 3/4 view tilted slightly upward, looking up curiously.
  3. Pure side profile, level gaze.
  4. 3/4 back view (showing antenna + rear silhouette).
  5. Low-key dramatic lighting from one side, identity still readable.
  6. Soft top-down lighting, slight downward tilt, gentle expression.

Lighting: even key + subtle cyan rim by default; cell 5 may use a stronger side rim; no harsh speculars, no lens flare anywhere.

Framing: orthographic, identical character scale across all 6 cells, full body visible with safe margins. Aspect 3:2.

Do NOT include: text, logos, watermarks, cell numbers, multiple characters per cell, scene props, UI/HUD, ground shadows, color swatches, callouts, panel borders with annotations, storyboard overlays, or any humans.
`.trim(),
  params: {
    size: '1536x1024',
    variations: 2,
  },
});
