import type { PlanModule } from '../../../../types/plans';

/**
 * Generation Module: Content Library
 * Library view for all generated content
 * 
 * Migrated from: plans/generation/content_library.md
 */

export const generationContentLibrary: PlanModule = {
  id: 'generation-content-library',
  title: 'Generation Module: Content Library',
  description: 'Library view for all generated content',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      content: [
        {
          type: 'text',
          value: 'All created content should be viewable in a library.',
        },
      ],
    },
    {
      id: 'views',
      title: 'Views',
      content: [
        {
          type: 'text',
          value: '*Generation views to be defined*',
        },
      ],
    },
    {
      id: 'features',
      title: 'Features',
      content: [
        {
          type: 'list',
          items: [
            'Filter by content type',
            'Filter by status (draft, review, scheduled, published)',
            'Sort by date, rating, engagement',
            'Search functionality',
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
            { id: 'lib-task-1', title: 'Design library grid/list views', completed: false },
            { id: 'lib-task-2', title: 'Define filter and sort options', completed: false },
            { id: 'lib-task-3', title: 'Create content card component', completed: false },
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'review-process', title: 'Review Process', path: '/modules/generation/review-process', description: 'Content in review' },
    { id: 'scheduling', title: 'Scheduling', path: '/modules/generation/scheduling', description: 'Scheduled content' },
    { id: 'content-library-main', title: 'Content Library (Main)', path: '/modules/content-library', description: 'Input/source content library' },
  ],
};
