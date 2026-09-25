import type { PlanModule } from '../../../../types/plans';

/**
 * Generation Module: Internationalization
 * Content translation and localization phase
 * 
 * Migrated from: plans/generation/internationalization.md
 */

export const generationInternationalization: PlanModule = {
  id: 'generation-internationalization',
  title: 'Generation Module: Internationalization',
  description: 'Content translation and localization phase',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      content: [
        {
          type: 'text',
          value: 'Phase for internationalizing content and translating to target languages/markets.',
        },
      ],
    },
    {
      id: 'process-flow',
      title: 'Process Flow',
      content: [
        {
          type: 'text',
          value: '*Status / Process Flow to be defined*',
        },
      ],
    },
    {
      id: 'considerations',
      title: 'Considerations',
      content: [
        {
          type: 'list',
          items: [
            'Multi-language image generation (labels in different languages)',
            'Platform-specific formatting per locale',
            'Cultural adaptation beyond direct translation',
          ],
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
            { id: 'i18n-task-1', title: 'Define i18n process flow states', completed: false },
            { id: 'i18n-task-2', title: 'Identify supported languages', completed: false },
            { id: 'i18n-task-3', title: 'Create translation pipeline', completed: false },
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'review-process', title: 'Review Process', path: '/modules/generation/review-process', description: 'Pre-i18n phase' },
    { id: 'scheduling', title: 'Scheduling', path: '/modules/generation/scheduling', description: 'Post-i18n phase' },
    { id: 'configuration', title: 'Configuration', path: '/modules/generation/configuration', description: 'Language settings' },
  ],
};
