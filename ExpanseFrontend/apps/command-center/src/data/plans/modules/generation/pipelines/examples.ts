import type { PlanModule } from '../../../../../types/plans';

/**
 * Pipeline Examples
 * 
 * Worked examples demonstrating data stacking and audience review
 * Source: plans/generation/pipelines-and-review/examples.md
 */

export const pipelinesExamples: PlanModule = {
  id: 'pipelines-examples',
  title: 'Pipeline Examples',
  description: 'Worked examples demonstrating data stacking and audience review',
  status: { data: 'partial', ui: 'planned', logic: 'planned' },
  overallStatus: 'Planned',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      content: [
        {
          type: 'text',
          value: 'Uses the data-stacking methodology with multi-perspective review.',
        },
        {
          type: 'text',
          value: '**Pipeline:** Generation → Multi-Perspective Review → Selection → Refinement',
        },
      ],
    },
    {
      id: 'example-learning',
      title: 'Example: "Benefits of Learning for the Future"',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'Phase 1: Generate 5 Candidates',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '"Learn now; your future self speaks."',
            '"Knowledge travels farther than you can."',
            '"Today\'s curiosity becomes tomorrow\'s leverage."',
            '"What you practice outlives the moment."',
            '"The future recognizes prepared minds."',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Phase 2: Multi-Perspective Evaluation',
        },
        {
          type: 'text',
          value: 'Each phrase is reviewed from perspectives: personal growth, power, loss, relationships, society.',
        },
        {
          type: 'table',
          headers: ['Phrase', 'Interpretive Range', 'Notes'],
          rows: [
            ['"Learn now; your future self speaks."', 'Strong personal growth, moderate others', 'Identity over time'],
            ['"Knowledge travels farther than you can."', '✅ Very wide, universal', 'Works across migration, time, legacy, mortality'],
            ['"Today\'s curiosity becomes tomorrow\'s leverage."', 'Strong growth/power, weaker relationships', '"Leverage" narrows emotional texture'],
            ['"What you practice outlives the moment."', 'Wide: habits, legacy, culture', 'Less directly about "learning"'],
            ['"The future recognizes prepared minds."', 'Moderate across all', 'A bit formal, abstract'],
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Phase 3: Selection',
        },
        {
          type: 'quote',
          value: '"Knowledge travels farther than you can."',
        },
        {
          type: 'text',
          value: 'It works across **migration, time, education, legacy, resilience, opportunity, and even mortality**—without telling people what to feel.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Phase 4: Refinement',
        },
        {
          type: 'quote',
          value: '"Knowledge goes where you can\'t."',
        },
        {
          type: 'text',
          value: 'Still clearly about learning\'s future value, but broader, sharper, and more haunting—people can map it onto *career, survival, love, legacy, limits, distance, time*.',
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'pipelines-overview', title: 'Pipelines Overview', path: '/modules/generation/pipelines', description: 'Pipeline methodology overview' },
    { id: 'pipelines-data-stacking', title: 'Data Stacking', path: '/modules/generation/pipelines/data-stacking', description: 'Core methodology' },
    { id: 'pipelines-audience-reviews', title: 'Audience Reviews', path: '/modules/generation/pipelines/audience-reviews', description: 'Multi-perspective evaluation' },
  ],
};
