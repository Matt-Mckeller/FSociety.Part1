import type { PlanModule } from '../../../../types/plans';

/**
 * Generation Module: Open Questions
 * Decisions and questions that need to be resolved
 * 
 * Migrated from: plans/generation/questions.md
 */

export const generationQuestions: PlanModule = {
  id: 'generation-questions',
  title: 'Generation Module: Open Questions',
  description: 'Decisions and questions that need to be resolved',
  sections: [
    {
      id: 'multi-platform-content-strategy',
      title: 'Multi-Platform Content Strategy',
      content: [
        {
          type: 'text',
          value: '**Question**: Should content be generated per-platform or as a single piece posted to multiple platforms?',
        },
        { type: 'heading', level: 4, text: 'Options' },
        {
          type: 'table',
          headers: ['Approach', 'Description', 'Pros', 'Cons'],
          rows: [
            ['Per-Platform', 'Generate unique content for each platform', 'Optimized for each platform\'s format/audience', 'More generation time, more to review'],
            ['Shared Content', 'Generate once, post to multiple platforms', 'Faster, consistent message', 'May not be optimized for each platform'],
            ['Per-Item Choice', 'User decides per content item', 'Flexibility', 'More complexity in UI/flow'],
            ['Hybrid', 'Generate base content, then platform variants', 'Best of both, reusable core', 'More complex pipeline'],
          ],
        },
        { type: 'heading', level: 4, text: 'Considerations' },
        {
          type: 'list',
          items: [
            'Platform character limits vary significantly (Twitter vs LinkedIn)',
            'Hashtag strategies differ by platform',
            'Audience expectations differ (professional vs casual)',
            'Some content naturally works across platforms, some doesn\'t',
            'Review workload: reviewing 1 post vs 4 platform variants',
          ],
        },
        { type: 'heading', level: 4, text: 'Suggested Approach' },
        {
          type: 'text',
          value: 'Per-item choice with smart defaults',
        },
        {
          type: 'list',
          items: [
            'Default: Generate platform-specific variants (optimized)',
            'Option: "Post as-is to multiple platforms" for simple content',
            'Option: "Generate base → review → create variants" for important content',
          ],
        },
        { type: 'heading', level: 4, text: 'Impact on Flow' },
        {
          type: 'list',
          items: [
            'Affects creation step: single generation vs multi-generation',
            'Affects review step: review one or review variants',
            'Affects scheduling: one schedule or per-platform schedules',
            'Affects content library: how to display/group variants',
          ],
        },
        {
          type: 'text',
          value: '**Status**: 🔴 Needs Decision',
        },
      ],
    },
    {
      id: 'question-template',
      title: 'Template',
      content: [
        {
          type: 'code',
          language: 'markdown',
          code: `## [Question Title]

**Question**: [The question]

**Options**:
| Approach | Description | Pros | Cons |
|----------|-------------|------|------|
| ... | ... | ... | ... |

**Considerations**:
- ...

**Suggested Approach**: ...

**Status**: 🔴 Needs Decision | 🟡 In Discussion | ✅ Decided`,
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'overview', title: 'Overview', path: '/modules/generation/overview', description: 'Goals and requirements' },
    { id: 'process-flow', title: 'Process Flow', path: '/modules/generation/process-flow', description: 'Flow diagrams to update based on decisions' },
    { id: 'configuration', title: 'Configuration', path: '/modules/generation/configuration', description: 'Settings affected by decisions' },
  ],
};
