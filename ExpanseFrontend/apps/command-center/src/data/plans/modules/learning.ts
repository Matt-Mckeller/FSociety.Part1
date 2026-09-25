import type { PlanModule } from '../../../types/plans';

/**
 * Learning Module
 * 
 * Educational features, training, and skill development within 4up
 */

export const learning: PlanModule = {
  id: 'learning',
  title: 'Learning',
  description: 'Educational features, training resources, and skill development for content creators',
  status: { data: 'planned', ui: 'planned', logic: 'planned' },
  overallStatus: 'Planned',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      content: [
        {
          type: 'text',
          value: 'The Learning module helps users improve their content creation skills, understand marketing principles, and get the most value from the 4up platform.',
        },
      ],
    },
    {
      id: 'learning-paths',
      title: 'Learning Paths',
      content: [
        {
          type: 'table',
          headers: ['Path', 'Description', 'Target User'],
          rows: [
            ['Getting Started', 'Platform basics, first content creation', 'New users'],
            ['Content Mastery', 'Advanced content creation techniques', 'Active users'],
            ['Marketing Fundamentals', 'Core marketing concepts and strategy', 'Business owners'],
            ['AI Collaboration', 'Working effectively with AI tools', 'All users'],
            ['Brand Building', 'Developing consistent brand identity', 'Growing businesses'],
          ],
        },
      ],
    },
    {
      id: 'interactive-training',
      title: 'Interactive Training',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'Chat-Based Learning',
        },
        {
          type: 'list',
          items: [
            'AI chat agents that teach concepts through conversation',
            'Interactive Q&A with real-time feedback',
            'Personalized learning based on user\'s business context',
            'Practice exercises with guided assistance',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Guided Workflows',
        },
        {
          type: 'list',
          items: [
            'Step-by-step tutorials integrated into the app',
            'Tooltips and contextual help',
            'Best practice suggestions during content creation',
            'Progress tracking and achievements',
          ],
        },
      ],
    },
    {
      id: 'feedback-loops',
      title: 'Feedback & Improvement',
      content: [
        {
          type: 'text',
          value: 'Continuous improvement through automated feedback mechanisms.',
        },
        {
          type: 'list',
          items: [
            '**Auto-feedback on content**: Real-time suggestions as you create',
            '**Performance insights**: Learn what works from your analytics',
            '**Comparison learning**: See how your content compares to best practices',
            '**Mistake patterns**: Identify recurring issues and how to fix them',
            '**Skill progression**: Track improvement over time',
          ],
        },
      ],
    },
    {
      id: 'content-examples',
      title: 'Content Examples & Templates',
      content: [
        {
          type: 'list',
          items: [
            'Curated examples of high-performing content',
            'Industry-specific templates and patterns',
            'Before/after transformations with explanations',
            'Annotated examples highlighting key techniques',
            'User-submitted examples (community learning)',
          ],
        },
      ],
    },
    {
      id: 'marketing-education',
      title: 'Marketing Education',
      content: [
        {
          type: 'text',
          value: 'Core marketing concepts every user should understand:',
        },
        {
          type: 'table',
          headers: ['Topic', 'Why It Matters'],
          rows: [
            ['Target Audience', 'Content only works if it reaches the right people'],
            ['Value Proposition', 'Clarity on what you offer and why it matters'],
            ['Brand Voice', 'Consistency builds recognition and trust'],
            ['Content Strategy', 'Random posting vs. intentional planning'],
            ['Call to Action', 'Every piece of content should have a purpose'],
            ['Platform Optimization', 'Each platform has different best practices'],
          ],
        },
      ],
    },
    {
      id: 'ai-literacy',
      title: 'AI Literacy',
      content: [
        {
          type: 'text',
          value: 'Understanding how to work effectively with AI:',
        },
        {
          type: 'list',
          items: [
            '**Prompt crafting**: How to communicate effectively with AI',
            '**Output evaluation**: Recognizing good vs. mediocre AI output',
            '**Iteration skills**: Refining and improving AI-generated content',
            '**Human + AI collaboration**: When to guide vs. when to let AI lead',
            '**Limitations awareness**: Understanding what AI can and cannot do well',
          ],
        },
      ],
    },
    {
      id: 'certifications',
      title: 'Certifications & Achievements',
      content: [
        {
          type: 'text',
          value: 'Recognition for skill development (future feature):',
        },
        {
          type: 'list',
          items: [
            'Completion badges for learning paths',
            'Skill level indicators',
            'Shareable certifications for professional profiles',
            'Team training progress tracking',
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
            { id: 'learn-1', title: 'Design learning path structure', completed: false },
            { id: 'learn-2', title: 'Create interactive tutorial framework', completed: false },
            { id: 'learn-3', title: 'Develop AI chat agent for learning', completed: false },
            { id: 'learn-4', title: 'Build example content library', completed: false },
            { id: 'learn-5', title: 'Create marketing fundamentals course content', completed: false },
            { id: 'learn-6', title: 'Design progress tracking system', completed: false },
            { id: 'learn-7', title: 'Implement contextual help system', completed: false },
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'future-ideas', title: 'Future Ideas', path: '/future-ideas', description: 'Learning integrations in backlog' },
    { id: 'marketing', title: 'Marketing', path: '/modules/marketing', description: 'Marketing concepts to teach' },
    { id: 'few-shot-examples', title: 'Few Shot Examples', path: '/modules/few-shot-examples', description: 'Example content for learning' },
  ],
};
