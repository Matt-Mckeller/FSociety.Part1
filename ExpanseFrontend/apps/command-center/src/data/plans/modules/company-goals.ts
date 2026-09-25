import type { PlanModule } from '../../../types/plans';

/**
 * Company Goals Module
 * 
 * Strategic, tactical, and content-specific goals that guide business direction.
 * Source: data-architecture/core/company-goals.ts
 */

export const companyGoals: PlanModule = {
  id: 'company-goals',
  title: 'Company Goals',
  description: 'Strategic, tactical, and content-specific goals that guide content generation',
  status: { data: 'done', ui: 'planned', logic: 'planned' },
  overallStatus: 'Data Only',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      content: [
        {
          type: 'text',
          value: 'Company Goals capture what the business is working toward at strategic, tactical, and content levels. The AI uses these goals to understand desired outcomes and prioritize messaging.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Purpose',
        },
        {
          type: 'list',
          items: [
            'Define strategic (long-term) business goals',
            'Set tactical (short-term) objectives',
            'Establish content goals with measurable metrics',
            'Provide weighting for prioritization',
          ],
        },
      ],
    },
    {
      id: 'goal-types',
      title: 'Goal Types',
      content: [
        {
          type: 'table',
          headers: ['Type', 'Timeframe', 'Example', 'AI Usage'],
          rows: [
            ['Strategic', 'Long-term (1+ years)', '"Become market leader in AI marketing"', 'Thought leadership content'],
            ['Tactical', 'Short-term (quarters)', '"Launch v2.0 by Q3"', 'Product announcement content'],
            ['Content', 'Ongoing', '"Generate qualified leads"', 'Direct content objectives'],
          ],
        },
      ],
    },
    {
      id: 'weighting',
      title: 'Goal Weighting',
      content: [
        {
          type: 'text',
          value: 'Each goal has a weight (0-10) that indicates its importance. Higher-weighted goals are emphasized more in content generation, especially when space is limited.',
        },
      ],
    },
    {
      id: 'typescript-definition',
      title: 'TypeScript Definition',
      collapsed: true,
      content: [
        {
          type: 'code',
          language: 'typescript',
          code: `interface CompanyGoals extends BusinessEntity {
  strategic: WeightedGoal[];
  tactical?: WeightedGoal[];
  contentGoals: ContentGoal[];
}

interface WeightedGoal {
  goal: string;
  weight: Weight; // 0-10
  timeframe?: TimeFrame;
  kpis?: string[];
  relatedPurposes?: string[];
}

interface ContentGoal {
  goal: string;
  weight: Weight;
  metrics?: string[];
}`,
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
            { id: 'cg-1', title: 'Create goals management UI', completed: false },
            { id: 'cg-2', title: 'Implement goal weighting slider', completed: false },
            { id: 'cg-3', title: 'Add KPI tracking integration', completed: false },
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'business-profile', title: 'Business Profile', path: '/modules/business-profile', description: 'Parent entity' },
    { id: 'company-purpose', title: 'Company Purpose', path: '/modules/company-purpose', description: 'Mission and vision' },
  ],
};
