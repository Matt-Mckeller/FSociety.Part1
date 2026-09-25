import type { PlanModule } from '../../../types/plans';

/**
 * Few Shot Examples
 * Personal & business example content for AI training
 * 
 * Migrated from: plans/few_shot_examples.md
 */

export const fewShotExamples: PlanModule = {
  id: 'few-shot-examples',
  title: 'Few Shot Examples',
  description: 'Personal & business example content for AI training',
  status: { data: 'done', ui: 'planned', logic: 'planned' },
  overallStatus: 'Data Only',
  sections: [
    {
      id: 'example-types',
      title: 'Example Types',
      content: [
        {
          type: 'table',
          headers: ['Type', 'Description'],
          rows: [
            ['Example Images', 'Sample images demonstrating style'],
            ['Example Posts', 'Sample posts for tone/format reference'],
            ['Descriptions of Image Styles', 'Written descriptions of visual preferences'],
          ],
        },
      ],
    },
    {
      id: 'scope',
      title: 'Scope',
      content: [
        {
          type: 'list',
          items: [
            'Personal examples',
            'Business examples',
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
            { id: 'fse-task-1', title: 'Define few-shot example data structure', completed: false },
            { id: 'fse-task-2', title: 'Create example management UI', completed: false },
            { id: 'fse-task-3', title: 'Integrate with generation prompts', completed: false },
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'generation-overview', title: 'Generation Overview', path: '/modules/generation/overview', description: 'Uses examples in generation' },
  ],
};
