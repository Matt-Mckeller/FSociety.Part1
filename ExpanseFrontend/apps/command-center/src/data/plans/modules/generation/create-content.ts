import type { PlanModule } from '../../../../types/plans';

/**
 * Create Content - Entry Points
 * 
 * Entry screen for the content creation flow with 4 distinct paths
 * Source: plans/generation/create_content.md
 */

export const generationCreateContent: PlanModule = {
  id: 'generation-create-content',
  title: 'Create Content',
  description: 'Entry points for content creation: Preset Prompts, AI Guided, Manual, and Auto Scheduled',
  status: { data: 'partial', ui: 'planned', logic: 'planned' },
  overallStatus: 'Planned',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      content: [
        {
          type: 'text',
          value: 'The Create Content entry screen provides 4 distinct paths for content creation, each optimized for different user needs and experience levels.',
        },
      ],
    },
    {
      id: 'entry-options',
      title: 'Entry Options',
      content: [
        {
          type: 'table',
          headers: ['Option', 'Purpose', 'Best For'],
          rows: [
            ['⭐ Preset Prompts', 'Fastest path using pre-configured templates', 'Quick generation, consistent output'],
            ['AI Guided Manual', 'Creative control with real-time AI feedback', 'Custom content with optimization'],
            ['Full Manual', 'Complete freedom without AI interference', 'Experienced creators, specific needs'],
            ['🏷️ Auto Scheduled (Beta)', 'Hands-off automated generation', 'Consistent publishing cadence'],
          ],
        },
      ],
    },
    {
      id: 'preset-prompts',
      title: '1. Preset Prompts ⭐',
      content: [
        {
          type: 'text',
          value: '**Recommended** - Fastest path to quality content using pre-configured templates.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Features',
        },
        {
          type: 'list',
          items: [
            'Pre-selected data sources, goals, audiences, and priorities already configured',
            'AI-generated subject recommendations based on business context',
            'One-click content generation (produces multiple variations)',
            'Interactive refinement options for customization',
            'Feedback loop to improve targeting toward preset configurations',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Data Configuration',
        },
        {
          type: 'table',
          headers: ['Element', 'Description'],
          rows: [
            ['Goals', 'Pre-selected from company goals'],
            ['Audiences', 'Target personas/segments chosen'],
            ['Data Sources', 'Content pillars, themes, topics pulled'],
            ['Priorities', 'Weighted importance for generation'],
            ['Prompts', 'Curated prompt templates'],
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'User Flow',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'User selects a preset template category',
            'System displays AI-recommended subjects/topics',
            'User can: Generate immediately, Refine recommendations, Adjust priorities',
            'AI generates multiple content options',
            'User reviews, edits, and selects preferred output',
          ],
        },
      ],
    },
    {
      id: 'ai-guided',
      title: '2. AI Guided Manual Entry',
      content: [
        {
          type: 'text',
          value: 'Creative control with real-time AI feedback and optimization.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Features',
        },
        {
          type: 'list',
          items: [
            'User writes their own content/ideas',
            'Real-time analysis of goal alignment',
            'Audience fit scoring and recommendations',
            'Optimization suggestions during writing',
            'Flexibility to accept or ignore AI guidance',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'AI Feedback Displays',
        },
        {
          type: 'table',
          headers: ['Feedback Type', 'Description'],
          rows: [
            ['Goal Alignment', 'Which company goals the content supports'],
            ['Audience Match', 'Which personas/segments resonate most'],
            ['Platform Optimization', 'Suggestions per target platform'],
            ['Tone Analysis', 'How the tone matches brand voice'],
            ['Improvement Tips', 'Specific enhancement recommendations'],
          ],
        },
      ],
    },
    {
      id: 'full-manual',
      title: '3. Full Manual Entry',
      content: [
        {
          type: 'text',
          value: 'Complete creative freedom without AI interference.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Use Cases',
        },
        {
          type: 'list',
          items: [
            'Experienced content creators',
            'Time-sensitive posts',
            'Content that requires specific human nuance',
            'Republishing existing content',
            'Testing/experimental content',
          ],
        },
      ],
    },
    {
      id: 'auto-scheduled',
      title: '4. Auto Scheduled 🏷️ Beta',
      content: [
        {
          type: 'text',
          value: 'Hands-off automated content generation and scheduling.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Configuration Options',
        },
        {
          type: 'table',
          headers: ['Option', 'Description'],
          rows: [
            ['Frequency', 'How often to generate (daily, weekly, etc.)'],
            ['Content Types', 'Which formats to create'],
            ['Themes/Topics', 'Subject areas to cover'],
            ['Platforms', 'Where to publish'],
            ['Review Mode', 'Auto-publish or require approval'],
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
            { id: 'cc-1', title: 'Design preset prompt template selector interface', completed: false },
            { id: 'cc-2', title: 'Create AI feedback panel component for guided entry', completed: false },
            { id: 'cc-3', title: 'Design full manual entry editor interface', completed: false },
            { id: 'cc-4', title: 'Design auto-scheduled configuration wizard', completed: false },
            { id: 'cc-5', title: 'Define preset template data structure', completed: false },
            { id: 'cc-6', title: 'Implement goal/audience matching algorithm display', completed: false },
            { id: 'cc-7', title: 'Create content variation comparison view', completed: false },
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'generation-overview', title: 'Overview', path: '/modules/generation/overview', description: 'Generation module overview' },
    { id: 'generation-ux-ui', title: 'UX/UI', path: '/modules/generation/ux-ui', description: 'Interface patterns' },
    { id: 'generation-process-flow', title: 'Process Flow', path: '/modules/generation/process-flow', description: 'Content generation process' },
  ],
};
