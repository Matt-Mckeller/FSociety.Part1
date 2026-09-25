import type { PlanModule } from '../../../../../types/plans';

/**
 * Pipelines & Review Overview
 * 
 * Content generation pipeline methodology with layered review phases
 * Source: plans/generation/pipelines-and-review/_index.md
 */

export const pipelinesOverview: PlanModule = {
  id: 'pipelines-overview',
  title: 'Pipelines Overview',
  description: 'Content generation pipeline methodology with layered review phases',
  status: { data: 'partial', ui: 'planned', logic: 'planned' },
  overallStatus: 'Planned',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      content: [
        {
          type: 'text',
          value: 'This module defines how content is generated through structured pipelines with multi-perspective review phases that add depth, relatability, and universal appeal.',
        },
      ],
    },
    {
      id: 'key-concepts',
      title: 'Key Concepts',
      content: [
        {
          type: 'table',
          headers: ['Concept', 'Description'],
          rows: [
            ['Data Stacking', 'Layered generation with multiple review phases'],
            ['Perspective Sweep', 'Evaluating content from diverse audience viewpoints'],
            ['Compressed Depth', 'Short, powerful content with interpretive ambiguity'],
            ['Tiered Pipelines', 'Pricing model based on review layer depth'],
            ['Cultural Alignment', 'Adapting content for different cultures and languages'],
            ['Perspective Balancing', 'Balancing positive/negative or one-sided perspectives'],
            ['Design Review', 'Quality and brand alignment review for images'],
          ],
        },
      ],
    },
    {
      id: 'implementation-notes',
      title: 'Implementation Notes',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'Thinking Commands',
        },
        {
          type: 'text',
          value: 'Include thinking/reasoning commands appropriately in pipeline prompts. Extended thinking helps with:',
        },
        {
          type: 'list',
          items: [
            'Complex multi-step reasoning tasks',
            'Evaluation and comparison phases',
            'Cultural sensitivity analysis',
            'Quality assessment and refinement',
            'Ambiguity and depth analysis',
          ],
        },
        {
          type: 'text',
          value: 'Consider when to enable/disable extended thinking based on task complexity and token budget.',
        },
      ],
    },
    {
      id: 'documents',
      title: 'Documents',
      content: [
        {
          type: 'table',
          headers: ['Document', 'Description'],
          rows: [
            ['Data Stacking', 'Core methodology for layered generation and review phases'],
            ['Audience Reviews', 'Multi-perspective audience review techniques'],
            ['Cultural Alignment', 'Cultural adaptation and language translation pipeline'],
            ['Perspective Balancing', 'Balancing positive/negative perspectives or one-sided content'],
            ['Design Review', 'Image quality, brand alignment, and visual effectiveness'],
            ['Examples', 'Worked examples demonstrating the pipeline'],
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'pipelines-data-stacking', title: 'Data Stacking', path: '/modules/generation/pipelines/data-stacking', description: 'Core methodology' },
    { id: 'pipelines-audience-reviews', title: 'Audience Reviews', path: '/modules/generation/pipelines/audience-reviews', description: 'Multi-perspective evaluation' },
    { id: 'pipelines-cultural-alignment', title: 'Cultural Alignment', path: '/modules/generation/pipelines/cultural-alignment', description: 'Cultural adaptation and translation' },
    { id: 'pipelines-perspective-balancing', title: 'Perspective Balancing', path: '/modules/generation/pipelines/perspective-balancing', description: 'Positive/negative and one-sided perspectives' },
    { id: 'pipelines-design-review', title: 'Design Review', path: '/modules/generation/pipelines/design-review', description: 'Image quality and brand review' },
    { id: 'pipelines-examples', title: 'Examples', path: '/modules/generation/pipelines/examples', description: 'Worked examples' },
    { id: 'generation-process-flow', title: 'Process Flow', path: '/modules/generation/process-flow', description: 'Overall generation process' },
  ],
};
