import type { PlanModule } from '../../../../types/plans';

/**
 * Generation Module: Review Process
 * Content review, ratings, approvals, and version control
 * 
 * Migrated from: plans/generation/review_process.md
 */

export const generationReviewProcess: PlanModule = {
  id: 'generation-review-process',
  title: 'Generation Module: Review Process',
  description: 'Content review, ratings, approvals, and version control',
  sections: [
    {
      id: 'review-phase-overview',
      title: 'Review Phase Overview',
      content: [
        {
          type: 'text',
          value: 'After content is generated, it goes through a review phase. This includes completely automated generation content. Content can be reviewed and updated by a user or instantly approved.',
        },
      ],
    },
    {
      id: 'review-interface',
      title: 'Review Interface',
      content: [
        {
          type: 'text',
          value: 'Library style list of content waiting to be reviewed.',
        },
        { type: 'heading', level: 4, text: 'Core Actions' },
        {
          type: 'table',
          headers: ['Action', 'Icon', 'Follow-up'],
          rows: [
            ['Delete/Cancel', '❌', 'Regenerate (if required for auto scheduling), Remove (if manually created)'],
            ['Edit', '📝', 'Opens edit window'],
            ['Approve', '✅', 'Rate content'],
          ],
        },
        {
          type: 'text',
          value: '**Note**: Regeneration and Removal not possible if rating is below 3 (configurable)',
        },
      ],
    },
    {
      id: 'review-ui-options',
      title: 'Review UI Options',
      content: [
        {
          type: 'text',
          value: 'Multiple display/interaction patterns under consideration:',
        },
        {
          type: 'table',
          headers: ['Option', 'Description', 'Best For'],
          rows: [
            ['Card Swipe (Tinder-style)', 'Swipe cards left/right/up for actions', 'Fast review, mobile, high volume'],
            ['Full Screen', 'Full content preview with action buttons', 'Complex content, scripts, detailed review'],
            ['List View', 'Table/list with inline actions', 'Desktop, bulk operations'],
            ['Split Pane', 'List on left, preview on right', 'Desktop, quick scanning'],
          ],
        },
        { type: 'heading', level: 4, text: 'Card Swipe + Rating Approaches' },
        {
          type: 'table',
          headers: ['Approach', 'Description', 'Speed', 'Detail'],
          rows: [
            ['Swipe intensity', 'Light swipe = 3/5, hard swipe = 5/5', 'Fast', 'Medium'],
            ['Swipe + hold', 'Swipe for action, hold to rate', 'Fast default', 'Optional'],
            ['Expand on approve', 'Swipe approve → rating popup', 'Fast rejects', 'Detail approves'],
            ['Quick rate buttons', '1-5 buttons on card, tap = approve at rating', 'Medium', 'High'],
          ],
        },
        { type: 'heading', level: 4, text: 'Considerations' },
        {
          type: 'list',
          items: [
            'Content type may determine best UI (posts vs scripts vs images)',
            'User preference / configurable',
            'Mobile vs desktop optimization',
          ],
        },
      ],
    },
    {
      id: 'multi-step-review-configuration',
      title: 'Multi-Step Review Configuration',
      content: [
        {
          type: 'text',
          value: 'Depending on business and configuration settings, content can be reviewed multiple times.',
        },
        {
          type: 'text',
          value: 'See Configuration Options for all configurable settings involved in the review process flow logic.',
        },
        { type: 'heading', level: 4, text: 'Key Configurable Options' },
        {
          type: 'list',
          items: [
            'Minimum rating for content to be approved and move to scheduling',
            'Minimum number of approvals for content to move to scheduling',
            'Minimum number of people required for approvals',
            'Number of AI review and improvement phases (changes can be manually or automatically accepted)',
            'Requirements for content deletion',
            'Maximum number of edits allowed',
            'Maximum time allowed for content in review step',
          ],
        },
        {
          type: 'text',
          value: '**After Edits**: Content should reset to 0 for approval counts (?)',
        },
      ],
    },
    {
      id: 'ai-ratings-feedback',
      title: 'AI Ratings & Feedback',
      content: [
        {
          type: 'list',
          items: [
            'All content & edits have AI-generated ratings and feedback',
            'Ratings hidden by default unless choosing to see',
            'Rating auto-hides after X seconds after being shown',
            'Updated along with edits',
            'Backend pipelines automatically call different APIs to rate content on variety of aspects',
            'Generates overall score',
            'Prompt provides weights and biases based on content type',
          ],
        },
        { type: 'heading', level: 4, text: 'TypeScript Interface' },
        {
          type: 'text',
          value: 'A `ContentFeedback` interface will define the types of feedback provided, including:',
        },
        {
          type: 'list',
          items: [
            'Rating categories (voice alignment, platform fit, goal alignment, engagement potential, etc.)',
            'Score ranges and meanings',
            'Feedback text structure (strengths, weaknesses, suggestions)',
            'Metadata (model used, timestamp, etc.)',
          ],
        },
        {
          type: 'text',
          value: '**Feedback UI Element**: Each time content is edited, feedback is generated',
        },
      ],
    },
    {
      id: 'version-control',
      title: 'Version Control',
      content: [
        {
          type: 'text',
          value: 'Content should have a version control system tracking:',
        },
        {
          type: 'list',
          items: [
            'All changes',
            'Variations',
            'Edits',
          ],
        },
      ],
    },
    {
      id: 'ai-based-improvements',
      title: 'AI-Based Improvements',
      content: [
        {
          type: 'list',
          items: [
            'Multiple AI-based improvement options',
            'Engagement & Learning tracking',
            'Suggested pipelines and prompts for Review/Editing/Revisions (templates)',
          ],
        },
        { type: 'heading', level: 4, text: 'TypeScript Interface' },
        {
          type: 'text',
          value: 'An `AIImprovement` interface will define:',
        },
        {
          type: 'list',
          items: [
            'Improvement types (tone adjustment, length optimization, CTA enhancement, etc.)',
            'Before/after content',
            'Confidence score',
            'Rationale/explanation',
            'Auto-accept eligibility',
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
            { id: 'review-task-1', title: 'Design Tinder-style review card component', completed: false },
            { id: 'review-task-2', title: 'Define rating criteria and weights per content type', completed: false },
            { id: 'review-task-3', title: 'Implement version control data model', completed: false },
            { id: 'review-task-4', title: 'Create approval workflow state machine', completed: false },
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'configuration', title: 'Configuration', path: '/modules/generation/configuration', description: 'All configurable settings' },
    { id: 'ux-ui', title: 'UX/UI', path: '/modules/generation/ux-ui', description: 'Interface patterns' },
    { id: 'scheduling', title: 'Scheduling', path: '/modules/generation/scheduling', description: 'Next phase after approval' },
  ],
};
