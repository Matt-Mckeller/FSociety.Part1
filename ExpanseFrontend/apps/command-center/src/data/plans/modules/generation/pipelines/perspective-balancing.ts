import type { PlanModule } from '../../../../../types/plans';

/**
 * Perspective Balancing Pipeline
 * 
 * Balancing positive/negative perspectives or creating intentionally one-sided content
 */

export const pipelinesPerspectiveBalancing: PlanModule = {
  id: 'pipelines-perspective-balancing',
  title: 'Perspective Balancing',
  description: 'Pipeline for balancing positive/negative perspectives or creating one-sided content',
  status: { data: 'planned', ui: 'planned', logic: 'planned' },
  overallStatus: 'Planned',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      content: [
        {
          type: 'text',
          value: 'Content can be crafted to appeal to different psychological orientations. Some audiences respond better to positive framing, others to problem-awareness, and many appreciate balanced perspectives that acknowledge complexity.',
        },
      ],
    },
    {
      id: 'perspective-modes',
      title: 'Perspective Modes',
      content: [
        {
          type: 'table',
          headers: ['Mode', 'Description', 'Best For'],
          rows: [
            ['Balanced', 'Acknowledges both positive and negative aspects', 'Building trust, thoughtful audiences, complex topics'],
            ['Positive-Focused', 'Emphasizes benefits, opportunities, solutions', 'Inspirational content, brand building, celebrations'],
            ['Problem-Aware', 'Highlights challenges, pain points, urgency', 'Problem-solution content, urgency-driven CTAs'],
            ['Contrast', 'Juxtaposes positive and negative for impact', 'Before/after, transformation stories'],
          ],
        },
      ],
    },
    {
      id: 'balanced-content',
      title: 'Balanced Content Pipeline',
      content: [
        {
          type: 'text',
          value: 'For content that appeals to a variety of perspectives and builds credibility through nuance.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Phase 1 — Perspective Identification',
        },
        {
          type: 'text',
          value: 'Identify the key positive and negative angles on the topic.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Phase 2 — Perspective Inclusion',
        },
        {
          type: 'text',
          value: 'Ensure content acknowledges multiple viewpoints without dismissing any.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Phase 3 — Balance Check',
        },
        {
          type: 'text',
          value: 'Evaluate whether the content feels fair and comprehensive to different audience segments.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Benefits of Balanced Content',
        },
        {
          type: 'list',
          items: [
            'Builds trust with skeptical audiences',
            'Appeals to analytical thinkers',
            'Demonstrates expertise and nuanced understanding',
            'Reduces perception of being "salesy"',
            'Resonates with both optimists and realists',
          ],
        },
      ],
    },
    {
      id: 'one-sided-content',
      title: 'One-Sided Content Pipeline',
      content: [
        {
          type: 'text',
          value: 'For content that intentionally focuses on a single perspective for maximum impact.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'When to Use One-Sided Content',
        },
        {
          type: 'list',
          items: [
            'Celebratory announcements and wins',
            'Urgent calls-to-action requiring immediate response',
            'Inspirational and motivational content',
            'Problem awareness campaigns (before introducing solution)',
            'Brand positioning statements',
            'Testimonials and success stories',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Positive One-Sided',
        },
        {
          type: 'text',
          value: 'Focus entirely on benefits, opportunities, and positive outcomes. Avoid hedging or caveats.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Negative One-Sided (Problem-Aware)',
        },
        {
          type: 'text',
          value: 'Focus on pain points, challenges, and consequences of inaction. Creates urgency and problem awareness.',
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
          text: 'Balanced Perspective Prompt',
        },
        {
          type: 'quote',
          value: '"Create content about [topic] that acknowledges both the benefits and challenges. Include perspectives from skeptics and enthusiasts. The content should feel fair and nuanced while still guiding toward [desired action/conclusion]."',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Positive-Focused Prompt',
        },
        {
          type: 'quote',
          value: '"Create inspiring content about [topic] focusing entirely on the positive outcomes and opportunities. Avoid any negative framing, caveats, or hedging. The tone should be optimistic and energizing."',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Problem-Aware Prompt',
        },
        {
          type: 'quote',
          value: '"Create content that highlights the challenges and pain points of [problem]. Emphasize the consequences of not addressing this issue. Create urgency without offering the solution yet—that comes in the follow-up content."',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Contrast Prompt',
        },
        {
          type: 'quote',
          value: '"Create content that contrasts the negative current state with the positive future state after [solution/action]. Use before/after framing to maximize the perceived value of the transformation."',
        },
      ],
    },
    {
      id: 'audience-matching',
      title: 'Matching Perspective to Audience',
      content: [
        {
          type: 'table',
          headers: ['Audience Type', 'Recommended Perspective'],
          rows: [
            ['Analytical/Skeptical', 'Balanced — they distrust one-sided content'],
            ['Action-Oriented', 'Problem-Aware → Solution — urgency drives action'],
            ['Optimistic/Aspirational', 'Positive-Focused — resonates with their worldview'],
            ['Experienced/Expert', 'Balanced — they know the nuances already'],
            ['New to Topic', 'Positive-Focused or Contrast — simpler framing'],
            ['In Pain/Struggling', 'Problem-Aware — validates their experience'],
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'pipelines-overview', title: 'Pipelines Overview', path: '/modules/generation/pipelines', description: 'Pipeline methodology overview' },
    { id: 'pipelines-audience-reviews', title: 'Audience Reviews', path: '/modules/generation/pipelines/audience-reviews', description: 'Multi-perspective evaluation' },
    { id: 'pipelines-data-stacking', title: 'Data Stacking', path: '/modules/generation/pipelines/data-stacking', description: 'Layered generation' },
  ],
};
