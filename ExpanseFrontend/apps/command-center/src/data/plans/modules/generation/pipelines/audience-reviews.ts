import type { PlanModule } from '../../../../../types/plans';

/**
 * Audience Reviews
 * 
 * Multi-perspective evaluation for universal appeal and relatability
 * Source: plans/generation/pipelines-and-review/audience-reviews.md
 */

export const pipelinesAudienceReviews: PlanModule = {
  id: 'pipelines-audience-reviews',
  title: 'Audience Reviews',
  description: 'Multi-perspective evaluation for universal appeal and relatability',
  status: { data: 'partial', ui: 'planned', logic: 'planned' },
  overallStatus: 'Planned',
  sections: [
    {
      id: 'concept',
      title: 'Concept',
      content: [
        {
          type: 'text',
          value: 'To appeal to many people, you want **projection space** — different people should see themselves in the content.',
        },
      ],
    },
    {
      id: 'audience-types',
      title: 'Audience Types',
      content: [
        {
          type: 'text',
          value: 'Group people into different categories and understand what percentage of the global population applies to each category. Multiple roles and audience perspectives provide feedback from different audience types.',
        },
      ],
    },
    {
      id: 'perspective-sweep',
      title: 'Perspective Sweep',
      content: [
        {
          type: 'text',
          value: 'Add a **perspective sweep** to evaluation. This is extremely effective for maximizing relatability.',
        },
        {
          type: 'quote',
          value: '"Evaluate the phrase as perceived by:\\n– a young adult\\n– someone in midlife\\n– someone with power\\n– someone without it\\n– someone who has lost something important\\n\\nRefine the phrase so each group could plausibly interpret it as personally relevant."',
        },
      ],
    },
    {
      id: 'multi-audience-review',
      title: 'Multi-Audience Depth Review',
      content: [
        {
          type: 'text',
          value: 'For each piece of content, evaluate across these dimensions:',
        },
        {
          type: 'table',
          headers: ['Perspective', 'Questions to Ask'],
          rows: [
            ['Personal growth', 'Does it resonate with self-improvement?'],
            ['Power', 'Does it speak to agency and influence?'],
            ['Loss', 'Does it acknowledge setbacks and resilience?'],
            ['Relationships', 'Does it connect to human bonds?'],
            ['Society', 'Does it have collective meaning?'],
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'pipelines-overview', title: 'Pipelines Overview', path: '/modules/generation/pipelines', description: 'Pipeline methodology overview' },
    { id: 'pipelines-data-stacking', title: 'Data Stacking', path: '/modules/generation/pipelines/data-stacking', description: 'Core methodology' },
    { id: 'pipelines-examples', title: 'Examples', path: '/modules/generation/pipelines/examples', description: 'Worked examples' },
  ],
};
