import type { PlanModule } from '../../../types/plans';

/**
 * Content Library
 * Existing posts, topics, and reference content
 * 
 * Migrated from: plans/content_library.md
 */

export const contentLibrary: PlanModule = {
  id: 'content-library',
  title: 'Content Library',
  description: 'Existing posts, topics, and reference content',
  status: { data: 'done', ui: 'planned', logic: 'planned' },
  overallStatus: 'Data Only',
  sections: [
    {
      id: 'components',
      title: 'Components',
      content: [
        {
          type: 'table',
          headers: ['Component', 'Description'],
          rows: [
            ['Common Topics', 'Frequently used topics'],
            ['Example Posts', 'Reference posts'],
            ['Image Types', 'Categories of images'],
            ['Prioritized/Ranked', 'Content ranking system'],
          ],
        },
      ],
    },
    {
      id: 'purpose',
      title: 'Purpose',
      content: [
        {
          type: 'text',
          value: 'Source/input content for generation. Distinct from Generation Content Library which stores generated output.',
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
            { id: 'cl-task-1', title: 'Define content categorization schema', completed: false },
            { id: 'cl-task-2', title: 'Create content ranking system', completed: false },
            { id: 'cl-task-3', title: 'Build content browse/search UI', completed: false },
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'generation-overview', title: 'Generation Overview', path: '/modules/generation/overview', description: 'Pulls from content library' },
    { id: 'generation-content-library', title: 'Generation Content Library', path: '/modules/generation/content-library', description: 'Generated content output' },
  ],
};
