import type { PlanModule } from '../../../../types/plans';

/**
 * Generation Module: UX/UI
 * Interface design, navigation, and interaction patterns
 * 
 * Migrated from: plans/generation/ux_ui.md
 */

export const generationUxUi: PlanModule = {
  id: 'generation-ux-ui',
  title: 'Generation Module: UX/UI',
  description: 'Interface design, navigation, and interaction patterns',
  sections: [
    {
      id: 'design-principles',
      title: 'Design Principles',
      content: [
        {
          type: 'list',
          items: [
            'Simple and easy to use',
            'Simplification through process steps & utilization of preset prompts, instructions, and pipelines',
            'Fun, quick, and easy',
            'Improved quality and output by utilizing teams and multiple people',
          ],
        },
      ],
    },
    {
      id: 'entry-points-navigation',
      title: 'Entry Points & Navigation',
      content: [
        {
          type: 'text',
          value: '3 possible screens to enter:',
        },
        { type: 'heading', level: 3, text: '1. Create → Content Type' },
        {
          type: 'list',
          items: [
            'Generate from Preset Prompts',
            'Manual Entry with ability to customize and add common elements',
            'Fully Automated Schedule Setup',
          ],
        },
        { type: 'heading', level: 3, text: '2. Edit/Review' },
        {
          type: 'list',
          items: [
            'View List Page with Filters and Sorting/Prioritization',
            'Cards that expand into full pages for review/editing',
          ],
        },
        { type: 'heading', level: 3, text: '3. Schedule/Publish' },
        {
          type: 'list',
          items: [
            'Access controlled',
          ],
        },
      ],
    },
    {
      id: 'fab-system',
      title: 'FAB (Floating Action Button) System',
      content: [
        {
          type: 'list',
          items: [
            'Multiple Simple FABs for common action types',
            'FABs can optionally expand into variety of expanded actions',
            'Some expanded actions can be AI-recommended',
          ],
        },
      ],
    },
    {
      id: 'ai-feedback-displays',
      title: 'AI Feedback Displays',
      content: [
        {
          type: 'text',
          value: 'Displays for AI-based feedback after each edit:',
        },
        {
          type: 'list',
          items: [
            'Recommendations',
            'Alignment Towards Goals',
            'Ratings in different areas',
            'Multiple model integrations',
          ],
        },
      ],
    },
    {
      id: 'process-simplification',
      title: 'Process Simplification',
      content: [
        {
          type: 'list',
          items: [
            'Breaking down into processes and roles',
            'Allowing for splitting time and returning (improves quality)',
            'Enables alternative reviews / edits',
            'Team-based workflows for improved output',
          ],
        },
      ],
    },
    {
      id: 'preset-prompts',
      title: 'Preset Prompts',
      content: [
        {
          type: 'list',
          items: [
            'Menu Grid or similar selection interface',
            'Preset Options / Simple Paths',
            'Advanced paths available',
          ],
        },
      ],
    },
    {
      id: 'edit-mode',
      title: 'Edit Mode',
      content: [
        {
          type: 'list',
          items: [
            'Manual editing capabilities',
            'AI-assisted editing suggestions',
            'Multiple variations visible with quality/effectiveness ratings',
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
            { id: 'uxui-task-1', title: 'Define FAB action types and hierarchy', completed: false },
            { id: 'uxui-task-2', title: 'Design preset prompt grid interface', completed: false },
            { id: 'uxui-task-3', title: 'Create edit mode wireframes', completed: false },
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'overview', title: 'Overview', path: '/modules/generation/overview', description: 'Goals and requirements' },
    { id: 'review-process', title: 'Review Process', path: '/modules/generation/review-process', description: 'Approval workflow' },
    { id: 'screens', title: 'Screens', path: '/modules/generation/screens', description: 'Detailed screen specifications' },
  ],
};
