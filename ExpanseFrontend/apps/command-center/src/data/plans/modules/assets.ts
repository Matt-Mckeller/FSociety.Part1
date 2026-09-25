import type { PlanModule } from '../../../types/plans';

/**
 * Assets
 * Image and media asset management
 * 
 * Migrated from: plans/assets.md
 */

export const assets: PlanModule = {
  id: 'assets',
  title: 'Assets',
  description: 'Image and media asset management',
  status: { data: 'done', ui: 'planned', logic: 'planned' },
  overallStatus: 'Data Only',
  sections: [
    {
      id: 'asset-types',
      title: 'Asset Types',
      content: [
        {
          type: 'list',
          items: ['Images'],
        },
      ],
    },
    {
      id: 'scenes',
      title: 'Scenes',
      content: [
        {
          type: 'text',
          value: 'Scenes and sets for image/video generation.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Purpose',
        },
        {
          type: 'list',
          items: [
            '**Image/Video Generation**: Pre-defined backgrounds and environments for content',
            '**Backgrounds**: Reusable backdrops for consistent branding',
            '**Training Data**: Scene sets for AI model fine-tuning',
            '**Sets**: Complete environment configurations for video production',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Scene Categories',
        },
        {
          type: 'table',
          headers: ['Category', 'Examples'],
          rows: [
            ['Office/Professional', 'Modern office, home office, conference room'],
            ['Lifestyle', 'Coffee shop, park, home environment'],
            ['Abstract', 'Gradient backgrounds, geometric patterns'],
            ['Outdoor', 'Urban, nature, architectural'],
            ['Studio', 'Clean backdrop, product photography setups'],
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
            { id: 'assets-task-1', title: 'Define asset storage structure', completed: false },
            { id: 'assets-task-2', title: 'Create asset upload/management UI', completed: false },
            { id: 'assets-task-3', title: 'Integrate with generation module', completed: false },
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'generation-overview', title: 'Generation Overview', path: '/modules/generation/overview', description: 'Uses assets in content generation' },
    { id: 'future-ideas', title: 'Future Ideas', path: '/future-ideas', description: 'Asset Library & Marketplace ideas' },
  ],
};
