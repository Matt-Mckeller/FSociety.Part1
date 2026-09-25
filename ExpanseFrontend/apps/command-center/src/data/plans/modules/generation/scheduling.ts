import type { PlanModule } from '../../../../types/plans';

/**
 * Generation Module: Scheduling
 * Content scheduling and publishing flow
 * 
 * Migrated from: plans/generation/scheduling.md
 */

export const generationScheduling: PlanModule = {
  id: 'generation-scheduling',
  title: 'Generation Module: Scheduling',
  description: 'Content scheduling and publishing flow',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      content: [
        {
          type: 'text',
          value: 'Final approval step. By default, content goes through review phase but is set out at least 1-2 weeks in advance.',
        },
      ],
    },
    {
      id: 'scheduling-flow',
      title: 'Scheduling Flow',
      content: [
        {
          type: 'text',
          value: 'Once posts are approved as quality content, they are displayed on a scheduling screen.',
        },
        {
          type: 'text',
          value: 'Posts default to being auto-scheduled based on current calendar (utilizing AI to suggest best time).',
        },
      ],
    },
    {
      id: 'scheduling-modes',
      title: 'Scheduling Modes',
      content: [
        {
          type: 'table',
          headers: ['Mode', 'Description'],
          rows: [
            ['AutoScheduled', 'AI suggests optimal time based on calendar and analytics'],
            ['Instant', 'Publish immediately'],
            ['Manual', 'User selects specific date/time'],
          ],
        },
      ],
    },
    {
      id: 'access-control',
      title: 'Access Control',
      content: [
        {
          type: 'list',
          items: [
            'Schedule/Publish screen is access controlled',
            'Permissions configurable per user/role',
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
            { id: 'sched-task-1', title: 'Define scheduling calendar UI', completed: false },
            { id: 'sched-task-2', title: 'Implement AI time suggestion algorithm', completed: false },
            { id: 'sched-task-3', title: 'Create access control rules', completed: false },
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'review-process', title: 'Review Process', path: '/modules/generation/review-process', description: 'Previous phase' },
    { id: 'configuration', title: 'Configuration', path: '/modules/generation/configuration', description: 'Scheduling settings' },
    { id: 'content-library', title: 'Content Library', path: '/modules/generation/content-library', description: 'Published content storage' },
  ],
};
