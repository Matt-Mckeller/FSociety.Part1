import type { PlanModule } from '../../../../types/plans';

/**
 * Generation Module: Configuration Options
 * All configurable settings for the generation system
 * 
 * Migrated from: plans/generation/configuration_options.md
 */

export const generationConfiguration: PlanModule = {
  id: 'generation-configuration',
  title: 'Generation Module: Configuration Options',
  description: 'All configurable settings for the generation system',
  sections: [
    {
      id: 'configuration-scope',
      title: 'Configuration Scope',
      content: [
        {
          type: 'text',
          value: 'Settings are organized into parallel categories:',
        },
        {
          type: 'table',
          headers: ['Category', 'Description', 'Examples'],
          rows: [
            ['Global', 'Business-wide defaults', 'Default poster type, AI settings'],
            ['Platform', 'Per-platform settings', 'LinkedIn settings, Twitter settings'],
            ['Content Type', 'Per-content-type settings', 'Post settings, Image settings, Script settings'],
            ['Content Item', 'Per-item overrides', 'Specific content overrides'],
          ],
        },
        {
          type: 'text',
          value: 'When generating content, relevant settings from each category are applied. Item-level settings take precedence if there\'s a conflict.',
        },
      ],
    },
    {
      id: 'review-settings',
      title: 'Review Settings',
      content: [
        {
          type: 'text',
          value: 'Used by: Review Process - Multi-Step Review Configuration',
        },
        {
          type: 'table',
          headers: ['Setting', 'Description', 'Default'],
          rows: [
            ['Minimum Rating', 'Minimum rating for content approval', '3'],
            ['Min Approvals', 'Minimum number of approvals to proceed', '1'],
            ['Min Approvers', 'Minimum number of unique people required', '1'],
            ['AI Review Phases', 'Number of AI improvement passes', '-'],
            ['Max Edits', 'Maximum edits allowed in review', '-'],
            ['Max Review Time', 'Maximum time content can stay in review', '-'],
            ['Deletion Requirements', 'Rules for when content can be deleted', 'Rating < 3'],
            ['Reset Approvals on Edit', 'Whether edits reset approval count', 'Yes (?)'],
            ['Rating Auto-Hide', 'Seconds before rating display auto-hides', '-'],
          ],
        },
      ],
    },
    {
      id: 'scheduling-settings',
      title: 'Scheduling Settings',
      content: [
        {
          type: 'table',
          headers: ['Setting', 'Description', 'Default'],
          rows: [
            ['Default Lead Time', 'How far in advance to schedule', '1-2 weeks'],
            ['Scheduling Mode', 'AutoScheduled / Instant / Manual', 'AutoScheduled'],
          ],
        },
      ],
    },
    {
      id: 'platform-settings',
      title: 'Platform Settings',
      content: [
        {
          type: 'text',
          value: 'Configured per-platform. Included in prompt generation.',
        },
        {
          type: 'table',
          headers: ['Setting', 'Description', 'Scope'],
          rows: [
            ['Platform Instructions', 'Custom instructions added to prompts for this platform', 'Platform'],
            ['Character Limits', 'Max characters per post type', 'Platform'],
            ['Hashtag Limits', 'Max hashtags', 'Platform'],
            ['Link Style', 'Inline / End / Comment', 'Platform'],
            ['Image Aspect Ratios', 'Supported aspect ratios', 'Platform'],
            ['Default Content Types', 'Which content types enabled for this platform', 'Platform'],
          ],
        },
        {
          type: 'text',
          value: '**Note**: Platform optimization is applied at the content item level but defaults come from platform settings.',
        },
      ],
    },
    {
      id: 'content-type-settings',
      title: 'Content Type Settings',
      content: [
        {
          type: 'text',
          value: 'Configured per-content-type. Can have platform-specific overrides.',
        },
        {
          type: 'table',
          headers: ['Setting', 'Description'],
          rows: [
            ['Default Pipeline', 'Which pipeline to use for this type'],
            ['Editing UI', 'Which editor components to show'],
            ['Transformation Steps', 'For script types: audio/video conversion options'],
            ['Style Presets', 'Available style options for this type'],
          ],
        },
      ],
    },
    {
      id: 'content-item-settings',
      title: 'Content Item Settings',
      content: [
        {
          type: 'text',
          value: 'Per-item overrides (highest priority).',
        },
        {
          type: 'table',
          headers: ['Setting', 'Description'],
          rows: [
            ['Platform Optimization', 'Target platform formatting for this specific item'],
            ['Poster Type', 'Business / Personal For Business / Personal'],
            ['Goal Type', 'Personal / Business / Unrelated to existing data'],
            ['Language', 'Target language for this item'],
          ],
        },
      ],
    },
    {
      id: 'ai-settings',
      title: 'AI Settings',
      content: [
        {
          type: 'table',
          headers: ['Setting', 'Description'],
          rows: [
            ['AI Improvement Auto-Accept', 'Automatically accept AI suggestions'],
            ['Multi-Model Sampling', 'Enable comparison across models'],
            ['Feedback Visibility', 'Show/hide AI ratings by default'],
          ],
        },
      ],
    },
    {
      id: 'image-generation-settings',
      title: 'Image Generation Settings',
      content: [
        {
          type: 'table',
          headers: ['Setting', 'Description'],
          rows: [
            ['Labels', 'With or without labels'],
            ['Multi-Language', 'Generate in multiple languages'],
            ['Platform Formatting', 'Auto-crop/format for platform'],
          ],
        },
      ],
    },
    {
      id: 'access-control',
      title: 'Access Control',
      content: [
        {
          type: 'table',
          headers: ['Setting', 'Description'],
          rows: [
            ['Schedule/Publish Access', 'Who can access scheduling'],
            ['Review Permissions', 'Who can approve content'],
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
            { id: 'config-task-1', title: 'Define default values for all settings', completed: false },
            { id: 'config-task-2', title: 'Create settings UI (global, platform, content type levels)', completed: false },
            { id: 'config-task-3', title: 'Implement per-business configuration storage', completed: false },
            { id: 'config-task-4', title: 'Create TypeScript interfaces for all configuration types', completed: false },
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'review-process', title: 'Review Process', path: '/modules/generation/review-process', description: 'Uses review settings' },
    { id: 'scheduling', title: 'Scheduling', path: '/modules/generation/scheduling', description: 'Uses scheduling settings' },
    { id: 'overview', title: 'Overview', path: '/modules/generation/overview', description: 'Content type definitions' },
    { id: 'content-type-flows', title: 'Content Type Flows', path: '/modules/generation/content-type-flows', description: 'Per-type settings usage' },
  ],
};
