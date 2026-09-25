import type { PlanModule } from '../../../../../types/plans';

/**
 * Design Review Pipeline for Images
 * 
 * Quality and brand alignment review for generated or uploaded images
 */

export const pipelinesDesignReview: PlanModule = {
  id: 'pipelines-design-review',
  title: 'Design Review (Images)',
  description: 'Pipeline for reviewing image quality, brand alignment, and visual effectiveness',
  status: { data: 'planned', ui: 'planned', logic: 'planned' },
  overallStatus: 'Planned',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      content: [
        {
          type: 'text',
          value: 'Images require specialized review beyond text content. This pipeline ensures visual assets meet quality standards, align with brand guidelines, and effectively communicate the intended message.',
        },
      ],
    },
    {
      id: 'review-dimensions',
      title: 'Review Dimensions',
      content: [
        {
          type: 'table',
          headers: ['Dimension', 'What to Evaluate'],
          rows: [
            ['Brand Alignment', 'Colors, fonts, logo usage, visual style consistency'],
            ['Technical Quality', 'Resolution, compression, aspect ratio, file size'],
            ['Composition', 'Layout, balance, focal point, visual hierarchy'],
            ['Message Clarity', 'Does the image communicate the intended message?'],
            ['Audience Fit', 'Will the target audience connect with this visual?'],
            ['Platform Optimization', 'Sized and formatted correctly for target platform(s)'],
            ['Accessibility', 'Contrast, alt text, color blindness considerations'],
          ],
        },
      ],
    },
    {
      id: 'review-phases',
      title: 'Review Phases',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'Phase 1 — Technical Check',
        },
        {
          type: 'list',
          items: [
            'Resolution meets platform requirements',
            'Aspect ratio is correct for intended use',
            'File size is optimized for web/mobile',
            'No compression artifacts or quality issues',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Phase 2 — Brand Compliance',
        },
        {
          type: 'list',
          items: [
            'Colors match brand palette',
            'Typography follows brand guidelines',
            'Logo usage is correct (if applicable)',
            'Visual style is consistent with brand identity',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Phase 3 — Effectiveness Review',
        },
        {
          type: 'list',
          items: [
            'Clear focal point draws attention',
            'Message is immediately understandable',
            'Emotional tone matches content intent',
            'Call-to-action is visible (if applicable)',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Phase 4 — Audience & Context Check',
        },
        {
          type: 'list',
          items: [
            'Resonates with target audience demographics',
            'Culturally appropriate for target markets',
            'Appropriate for platform context',
            'Accessible to users with visual impairments',
          ],
        },
      ],
    },
    {
      id: 'ai-assisted-review',
      title: 'AI-Assisted Review',
      content: [
        {
          type: 'text',
          value: 'Vision models can assist with automated image review:',
        },
        {
          type: 'table',
          headers: ['Check', 'AI Capability'],
          rows: [
            ['Brand color detection', 'Analyze dominant colors against brand palette'],
            ['Text readability', 'Evaluate text overlay contrast and legibility'],
            ['Composition analysis', 'Assess balance, rule of thirds, focal point'],
            ['Object detection', 'Identify key elements and their placement'],
            ['Sentiment analysis', 'Evaluate emotional tone of imagery'],
            ['Similar image detection', 'Flag potential duplicates or overused visuals'],
          ],
        },
      ],
    },
    {
      id: 'platform-requirements',
      title: 'Platform-Specific Requirements',
      content: [
        {
          type: 'table',
          headers: ['Platform', 'Key Considerations'],
          rows: [
            ['Instagram Feed', '1:1 or 4:5, high visual impact, minimal text'],
            ['Instagram Stories', '9:16, full bleed, swipe-up friendly'],
            ['Facebook', 'Less than 20% text for ads, engaging thumbnails'],
            ['LinkedIn', 'Professional tone, clear business context'],
            ['Twitter/X', '16:9 or 1:1, eye-catching in fast scroll'],
            ['Website Hero', 'High resolution, responsive considerations'],
            ['Email', 'Lightweight, fallback alt text, mobile-first'],
          ],
        },
      ],
    },
    {
      id: 'prompt-examples',
      title: 'Example Prompts',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'Brand Alignment Review',
        },
        {
          type: 'quote',
          value: '"Analyze this image for brand alignment. Our brand colors are [colors], our visual style is [style description]. Identify any elements that don\'t match our brand guidelines and suggest corrections."',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Effectiveness Analysis',
        },
        {
          type: 'quote',
          value: '"Evaluate this image for marketing effectiveness. What is the focal point? Is the message clear within 3 seconds? What emotions does it evoke? How could it be improved to better achieve [goal]?"',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Accessibility Check',
        },
        {
          type: 'quote',
          value: '"Review this image for accessibility. Check text contrast ratios, evaluate how it would appear to colorblind users, and generate appropriate alt text that captures the key message."',
        },
      ],
    },
    {
      id: 'checklist',
      title: 'Quick Review Checklist',
      content: [
        {
          type: 'tasks',
          items: [
            { id: 'dr-1', title: 'Resolution meets minimum requirements', completed: false },
            { id: 'dr-2', title: 'Aspect ratio correct for target platform', completed: false },
            { id: 'dr-3', title: 'File size optimized', completed: false },
            { id: 'dr-4', title: 'Brand colors used correctly', completed: false },
            { id: 'dr-5', title: 'Typography follows guidelines', completed: false },
            { id: 'dr-6', title: 'Clear focal point', completed: false },
            { id: 'dr-7', title: 'Message understandable in 3 seconds', completed: false },
            { id: 'dr-8', title: 'Appropriate for target audience', completed: false },
            { id: 'dr-9', title: 'Alt text written', completed: false },
            { id: 'dr-10', title: 'Sufficient contrast for accessibility', completed: false },
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'pipelines-overview', title: 'Pipelines Overview', path: '/modules/generation/pipelines', description: 'Pipeline methodology overview' },
    { id: 'assets', title: 'Assets', path: '/modules/assets', description: 'Asset management' },
    { id: 'generation-content-type-flows', title: 'Content Type Flows', path: '/modules/generation/content-type-flows', description: 'Per-type processes' },
  ],
};
