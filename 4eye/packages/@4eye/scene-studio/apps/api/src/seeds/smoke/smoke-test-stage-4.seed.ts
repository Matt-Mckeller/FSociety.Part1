import { defineSeed } from '../seed.kit.js';

/**
 * Smoke-test seed for Stage 4 validation. Uses S1-C1 (cold-open) as a single image
 * reference plus a tiny slice of the style bible, so we can confirm the runner
 * resolves refs, composes the prompt, calls the generator, and writes a log row.
 */
export default defineSeed({
  id: 'smoke-test-stage-4',
  description: 'Stage 4 smoke test — copy of S1-C1 with style-bible context.',
  kind: 'generate',
  sceneCode: 'S1-C',
  title: 'Stage 4 smoke',
  tags: ['smoke-test'],
  references: [
    {
      kind: 'image',
      ref: 'assetId:e86cc2d195824fc0',
      role: 'composition',
      description: 'S1-C1 cold-open frame — use as compositional anchor.',
    },
    {
      kind: 'text',
      ref: 'file:00-style-bible.md',
      role: 'style-guide',
      section: 'Character System',
      description: 'Character treatment rules from the style bible.',
    },
  ],
  prompt:
    'Recreate this classroom cold-open frame. Preserve composition; keep palette and character treatment consistent with the style bible context provided.',
  params: { size: 'auto', variations: 1 },
});
