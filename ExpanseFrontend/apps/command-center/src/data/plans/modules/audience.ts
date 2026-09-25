import type { PlanModule } from '../../../types/plans';

/**
 * Audience
 * Demographics, psychographics, and targeting
 * 
 * Migrated from: plans/audience.md
 */

export const audience: PlanModule = {
  id: 'audience',
  title: 'Audience',
  description: 'Demographics, psychographics, and targeting',
  status: { data: 'done', ui: 'partial', logic: 'planned' },
  overallStatus: 'Data + UI',
  sections: [
    {
      id: 'components',
      title: 'Components',
      content: [],
      subsections: [
        {
          id: 'group-types',
          title: 'Group Types',
          content: [
            {
              type: 'text',
              value: 'In addition to individuals',
            },
          ],
        },
        {
          id: 'current-audience-summary',
          title: 'Current Audience Summary',
          content: [
            {
              type: 'list',
              items: [
                'Who are they',
                'Aggregates of what they like',
                'For Business Profiles',
              ],
            },
          ],
        },
        {
          id: 'target-audience',
          title: 'Target Audience',
          content: [
            {
              type: 'list',
              items: [
                'Who do we want',
                'Who are our targets',
              ],
            },
          ],
        },
        {
          id: 'analytics-integration',
          title: 'Analytics Integration',
          content: [
            {
              type: 'list',
              items: [
                'What do people respond to',
                'Weighted usage based on response and conversions',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'audience-approach',
      title: 'Audience Approach',
      content: [
        {
          type: 'text',
          value: 'Demographics / Psychographics rather than specific persona types. Multiple audience types together.',
        },
      ],
    },
    {
      id: 'tasks',
      title: 'Tasks',
      content: [
        {
          type: 'tasks',
          items: [
            { id: 'aud-task-1', title: 'Define audience segment data model', completed: false },
            { id: 'aud-task-2', title: 'Create audience analytics dashboard', completed: false },
            { id: 'aud-task-3', title: 'Integrate with generation targeting', completed: false },
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'generation-overview', title: 'Generation Overview', path: '/modules/generation/overview', description: 'Uses audience for content targeting' },
  ],
};
