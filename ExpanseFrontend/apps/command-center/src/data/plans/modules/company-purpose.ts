import type { PlanModule } from '../../../types/plans';

/**
 * Company Purpose Module
 * 
 * Mission, vision, values, and Core Purpose Theme Data.
 * Core Purpose Theme Data are differentiators used to modify prompt themes.
 * A business should have 3-5 of these with priority weights and per-prompt ranking factors.
 * Source: data-architecture/core/company-purpose.ts
 */

export const companyPurpose: PlanModule = {
  id: 'company-purpose',
  title: 'Company Purpose',
  description: 'Mission, vision, values, and the fundamental "why" behind the business',
  status: { data: 'done', ui: 'planned', logic: 'planned' },
  overallStatus: 'Data Only',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      content: [
        {
          type: 'text',
          value: 'Company Purpose captures the fundamental "why" of the business—its mission, vision, values, and Core Purpose Theme Data. This drives brand alignment and prompt customization in all generated content.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Purpose',
        },
        {
          type: 'list',
          items: [
            'Define mission statement (what we do and why)',
            'Articulate vision (what we\'re working toward)',
            'Establish 3-5 Core Purpose Theme Data points with business priority weights and per-prompt ranking factors',
            'Document company values',
            'Set purpose-driven aspirational goals',
          ],
        },
      ],
    },
    {
      id: 'core-themes',
      title: 'Core Purpose Theme Data',
      content: [
        {
          type: 'text',
          value: 'Core Purpose Theme Data are high-level drivers that motivate the business and differentiate it from competitors. These data points are used to modify prompt themes and guide AI content generation. A business should have 3-5 core themes, each with:',
        },
        {
          type: 'list',
          items: [
            'Business-level priority weight (overall importance to the company)',
            'Per-prompt ranking factors (weights that vary depending on content type)',
            'Sub-themes for nuanced application',
          ],
        },
        {
          type: 'text',
          value: 'Common core purpose themes include:',
        },
        {
          type: 'table',
          headers: ['Theme', 'Description', 'Example Business'],
          rows: [
            ['Improve', 'Make things better, help people grow', 'Education, coaching'],
            ['Innovate', 'Create new solutions, push boundaries', 'Tech startups'],
            ['Win', 'Achieve excellence, dominate markets', 'Competitive industries'],
            ['Heal', 'Fix problems, restore balance', 'Healthcare, consulting'],
            ['Protect', 'Safeguard, secure, defend', 'Security, insurance'],
          ],
        },
      ],
    },
    {
      id: 'purpose-goals',
      title: 'Purpose Goals',
      content: [
        {
          type: 'text',
          value: 'Purpose goals are aspirational goals tied to WHY the company exists (vs. measurable business objectives). Categories include:',
        },
        {
          type: 'table',
          headers: ['Category', 'Focus', 'Example'],
          rows: [
            ['customer', 'Helping customers', '"Help people create quality content easily"'],
            ['industry', 'Changing the industry', '"Make AI marketing accessible to all"'],
            ['internal', 'Company/product itself', '"Build the most intuitive marketing tool"'],
            ['society', 'Broader societal impact', '"Democratize professional marketing"'],
          ],
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
          code: `interface CompanyPurpose extends BusinessEntity {
  mission: string;
  vision: string;
  tagline?: string;
  coreThemes: WeightedPurpose[];
  secondaryThemes?: WeightedPurpose[];
  values?: { name: string; description: string; weight?: Weight; }[];
  purposeGoals?: PurposeGoal[];
}

interface WeightedPurpose {
  purpose: string;
  weight: Weight;
  subThemes?: string[];
  applicationGuidance?: string;
}

interface PurposeGoal {
  goal: string;
  category: 'customer' | 'industry' | 'internal' | 'society';
  description?: string;
  weight?: Weight;
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
            { id: 'cp-1', title: 'Create purpose editing UI', completed: false },
            { id: 'cp-2', title: 'Add values management', completed: false },
            { id: 'cp-3', title: 'Implement purpose theme selector', completed: false },
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'business-profile', title: 'Business Profile', path: '/modules/business-profile', description: 'Parent entity' },
    { id: 'company-goals', title: 'Company Goals', path: '/modules/company-goals', description: 'Measurable objectives' },
  ],
};
