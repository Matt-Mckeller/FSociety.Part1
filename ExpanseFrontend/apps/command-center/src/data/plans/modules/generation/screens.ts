import type { PlanModule } from '../../../../types/plans';

/**
 * Generation Module: Screens
 * All screens and pages for the content generation system
 * 
 * Migrated from: plans/generation/screens/screens.md
 */

export const generationScreens: PlanModule = {
  id: 'generation-screens',
  title: 'Generation Module: Screens',
  description: 'All screens and pages for the content generation system',
  sections: [
    {
      id: 'implementation-status',
      title: 'Implementation Status',
      content: [
        {
          type: 'table',
          headers: ['Screen', 'Priority', 'Data', 'UI', 'Logic', 'Status'],
          rows: [
            ['Dashboard', 'P1', '🔴', '🔴', '🔴', '🔴 Planned'],
            ['Create', 'P1', '🔴', '🔴', '🔴', '🔴 Planned'],
            ['Review Queue', 'P1', '🔴', '🔴', '🔴', '🔴 Planned'],
            ['Content Editor', 'P1', '🔴', '🔴', '🔴', '🔴 Planned'],
            ['Schedule Calendar', 'P1', '🔴', '🔴', '🔴', '🔴 Planned'],
            ['Content Library', 'P1', '🔴', '🔴', '🔴', '🔴 Planned'],
            ['Settings', 'P2', '🔴', '🔴', '🔴', '🔴 Planned'],
            ['Teleprompter', 'P3', '🔴', '🔴', '🔴', '🔴 Planned'],
            ['Analytics', 'P3', '🔴', '🔴', '🔴', '🔴 Planned'],
            ['Team Management', 'P3', '🔴', '🔴', '🔴', '🔴 Planned'],
            ['Preset Prompt Builder', 'P2', '🔴', '🔴', '🔴', '🔴 Planned'],
          ],
        },
        {
          type: 'text',
          value: '**Status Key**: ✅ Done | 🟡 Partial | 🔴 Planned',
        },
      ],
    },
    {
      id: 'screen-flow',
      title: 'Screen Flow',
      content: [
        {
          type: 'mermaid',
          diagram: `flowchart TD
    DASH[Dashboard] --> CREATE[Create]
    DASH --> REVIEW[Review Queue]
    DASH --> SCHEDULE[Schedule Calendar]
    DASH --> LIBRARY[Content Library]
    
    CREATE --> EDITOR[Content Editor]
    REVIEW --> EDITOR
    
    EDITOR --> REVIEW
    EDITOR --> SCHEDULE
    
    SCHEDULE --> LIBRARY
    
    DASH --> SETTINGS[Settings]
    SETTINGS --> PRESETS[Preset Prompt Builder]
    SETTINGS --> TEAM[Team Management]
    
    EDITOR --> TELE[Teleprompter]
    LIBRARY --> ANALYTICS[Analytics]`,
          caption: 'Screen Navigation Flow',
        },
      ],
    },
    {
      id: 'priority-definitions',
      title: 'Priority Definitions',
      content: [
        {
          type: 'table',
          headers: ['Priority', 'Description'],
          rows: [
            ['P1', 'Core MVP - required for basic functionality'],
            ['P2', 'Enhanced experience - important but can launch without'],
            ['P3', 'Future features - nice to have'],
          ],
        },
      ],
    },
    {
      id: 'screen-categories',
      title: 'Screen Categories',
      content: [],
      subsections: [
        {
          id: 'core-flow',
          title: 'Core Flow (P1)',
          content: [
            {
              type: 'list',
              items: [
                '**Dashboard** - Entry point, quick actions, overview',
                '**Create** - Content generation initiation',
                '**Review Queue** - Pending content review',
                '**Content Editor** - Edit and revise content',
                '**Schedule Calendar** - Manage publishing schedule',
                '**Content Library** - Published and archived content',
              ],
            },
          ],
        },
        {
          id: 'configuration',
          title: 'Configuration (P2)',
          content: [
            {
              type: 'list',
              items: [
                '**Settings** - System configuration',
                '**Preset Prompt Builder** - Create/edit prompt templates',
              ],
            },
          ],
        },
        {
          id: 'extended-features',
          title: 'Extended Features (P3)',
          content: [
            {
              type: 'list',
              items: [
                '**Teleprompter** - Script recording assistance',
                '**Analytics** - Performance insights',
                '**Team Management** - Roles and permissions',
              ],
            },
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'overview', title: 'Overview', path: '/modules/generation/overview', description: 'Module goals and requirements' },
    { id: 'ux-ui', title: 'UX/UI', path: '/modules/generation/ux-ui', description: 'Design principles' },
    { id: 'process-flow', title: 'Process Flow', path: '/modules/generation/process-flow', description: 'State transitions' },
    { id: 'configuration', title: 'Configuration Options', path: '/modules/generation/configuration', description: 'Settings reference' },
  ],
};
