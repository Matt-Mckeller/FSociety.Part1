import type { PlanModule } from '../../../../../types/plans';

/**
 * Data Stacking Methodology
 * 
 * Creating compressed depth through layered generation and review phases
 * Source: plans/generation/pipelines-and-review/data-stacking.md
 */

export const pipelinesDataStacking: PlanModule = {
  id: 'pipelines-data-stacking',
  title: 'Data Stacking',
  description: 'Creating compressed depth through layered generation and review phases',
  status: { data: 'partial', ui: 'planned', logic: 'planned' },
  overallStatus: 'Planned',
  sections: [
    {
      id: 'concept',
      title: 'Concept',
      content: [
        {
          type: 'quote',
          value: 'Depth = compression + ambiguity + perspective testing',
        },
        {
          type: 'text',
          value: 'Most generation focuses only on creation. Data stacking adds deliberate **evaluation + pressure** through structured review phases.',
        },
      ],
    },
    {
      id: 'tiered-pricing',
      title: 'Tiered Pricing',
      content: [
        {
          type: 'text',
          value: 'Can charge more for additional layers as well. Different tier levels provide different depths of review.',
        },
      ],
    },
    {
      id: 'core-prompts',
      title: 'The Core Prompts',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'Minimal, Reusable Base Prompt',
        },
        {
          type: 'quote',
          value: '"Generate a single short phrase (5–8 words) that is emotionally resonant, open to multiple interpretations, and meaningful across different life contexts. Avoid clichés. Prioritize ambiguity, depth, and universality."',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Stronger Version',
        },
        {
          type: 'quote',
          value: '"Create one short phrase (max 8 words) with layered meaning, interpretive ambiguity, and emotional weight. It should resonate across cultures, ages, and perspectives without being explicit."',
        },
        {
          type: 'text',
          value: 'This tells the model *how* to think, not *what* to say.',
        },
      ],
    },
    {
      id: 'review-phases',
      title: 'Review Phases',
      content: [
        {
          type: 'text',
          value: 'Two-phase approach (recommended):',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Phase 1 — Generation',
        },
        {
          type: 'quote',
          value: '"Generate 5 candidate phrases using the criteria above."',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Phase 2 — Review & Compression',
        },
        {
          type: 'quote',
          value: '"Now review each phrase from at least 4 perspectives (e.g., personal growth, power, loss, relationships, society). Identify which phrase has the widest interpretive range. Refine it to increase ambiguity and depth while keeping it concise."',
        },
        {
          type: 'text',
          value: 'This forces: Multi-angle thinking, Selection based on *breadth* not cleverness, Intentional refinement.',
        },
      ],
    },
    {
      id: 'ambiguity-calibration',
      title: 'Ambiguity Calibration',
      content: [
        {
          type: 'text',
          value: 'Depth ≠ vagueness. The trick is **precise ambiguity**.',
        },
        {
          type: 'quote',
          value: '"Ensure the phrase is concrete enough to feel intentional, but ambiguous enough to support conflicting interpretations."',
        },
        {
          type: 'quote',
          value: '"Remove any words that explicitly name emotions or values; imply them instead."',
        },
      ],
    },
    {
      id: 'full-example',
      title: 'Full Example Prompt',
      content: [
        {
          type: 'text',
          value: 'A clean, production-ready prompt:',
        },
        {
          type: 'quote',
          value: '"Generate 5 short phrases (5–8 words) that are emotionally powerful, culturally universal, and open to multiple interpretations. Avoid clichés and explicit moral statements.\\n\\nThen evaluate each phrase from multiple perspectives (personal growth, power, loss, relationships, society). Select the one with the widest interpretive range.\\n\\nRefine it to increase ambiguity, depth, and memorability while keeping it concise and precise."',
        },
      ],
    },
    {
      id: 'advanced-techniques',
      title: 'Advanced Techniques',
      content: [
        {
          type: 'table',
          headers: ['Technique', 'Test Question', 'Purpose'],
          rows: [
            ['Negative-space test', '"Would this phrase still feel meaningful if someone disagreed with it?"', 'If yes → it has depth'],
            ['Inversion pass', '"What is the opposite interpretation of this phrase, and does it still work?"', 'Great phrases survive inversion'],
            ['Time test', '"Would this phrase feel relevant 50 years ago and 50 years from now?"', 'Timelessness correlates with universality'],
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'pipelines-overview', title: 'Pipelines Overview', path: '/modules/generation/pipelines', description: 'Pipeline methodology overview' },
    { id: 'pipelines-audience-reviews', title: 'Audience Reviews', path: '/modules/generation/pipelines/audience-reviews', description: 'Multi-perspective evaluation' },
    { id: 'pipelines-examples', title: 'Examples', path: '/modules/generation/pipelines/examples', description: 'Worked examples' },
  ],
};
