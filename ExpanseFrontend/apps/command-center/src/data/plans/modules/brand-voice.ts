import type { PlanModule } from '../../../types/plans';

/**
 * Brand Voice Module
 * 
 * Defines how the brand communicates - tone, personality, vocabulary, and style.
 * Source: data-architecture/core/brand-voice.ts
 */

export const brandVoice: PlanModule = {
  id: 'brand-voice',
  title: 'Brand Voice',
  description: 'Tone, personality, vocabulary, and communication style that defines how the brand speaks',
  status: { data: 'done', ui: 'partial', logic: 'planned' },
  overallStatus: 'Data + UI',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      content: [
        {
          type: 'text',
          value: 'Brand Voice defines how the brand communicates across all content. It ensures AI-generated content matches the brand\'s unique voice through tone settings, personality traits, vocabulary rules, and do/don\'t examples.',
        },
        {
          type: 'quote',
          value: '**Important**: Brand Voice is high-level guidance for preferences, not rigid rules. It will not apply uniformly to every content type or every post. Each piece of content is likely to be different based on context, platform, audience, and purpose.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Purpose',
        },
        {
          type: 'list',
          items: [
            'Define tone settings (primary tone, emoji usage, humor level)',
            'Establish personality traits',
            'Set vocabulary preferences and restrictions',
            'Provide do/don\'t examples for AI learning',
            'Include sample posts as few-shot references',
          ],
        },
      ],
    },
    {
      id: 'data-categories',
      title: 'Data Categories',
      content: [
        {
          type: 'table',
          headers: ['Category', 'Fields', 'Purpose'],
          rows: [
            ['Tone Settings', 'primaryTone, secondaryTones, emojiUsage, hashtagStyle, ctaStyle', 'How content should feel'],
            ['Personality', 'traits, archetypes, humor level', 'Brand character'],
            ['Vocabulary', 'preferredTerms, avoidTerms, jargon settings', 'Word choice rules'],
            ['Examples', 'doExamples, dontExamples, samplePosts', 'Concrete patterns to follow/avoid'],
            ['Platform Adjustments', 'platformAdjustments[]', 'Per-platform voice tweaks'],
          ],
        },
      ],
    },
    {
      id: 'ai-usage',
      title: 'AI Usage',
      content: [
        {
          type: 'text',
          value: 'Brand Voice provides directional guidance for content generation. The AI adapts these preferences based on context:',
        },
        {
          type: 'list',
          items: [
            '**Inject brand voice** into content generation prompts as guidance',
            '**Use doExamples and dontExamples** as reference patterns, not rigid templates',
            '**Apply vocabulary preferences** where appropriate for the content type',
            '**Adapt formality and tone** based on platform, audience, and content purpose',
            '**Each post will vary** — voice settings inform direction, not dictate exact output',
          ],
        },
      ],
    },
    {
      id: 'typescript-definition',
      title: 'TypeScript Definition',
      collapsed: true,
      content: [
        {
          type: 'code',
          language: 'typescript',
          code: `interface BrandVoice extends BusinessEntity {
  tone: ToneSettings;
  personality: PersonalityTraits;
  vocabulary: VocabularySettings;
  formality: Formality;
  platformAdjustments?: PlatformVoiceAdjustment[];
  doExamples: string[];
  dontExamples: string[];
  samplePosts: SamplePost[];
}

interface ToneSettings {
  primaryTone: string;
  secondaryTones: string[];
  emojiUsage: 'none' | 'minimal' | 'moderate' | 'frequent' | 'auto';
  hashtagStyle: 'none' | 'minimal' | 'moderate' | 'heavy' | 'auto';
  ctaStyle: 'subtle' | 'direct' | 'urgent' | 'auto';
}`,
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
            { id: 'bv-1', title: 'Implement voice editing UI', completed: false },
            { id: 'bv-2', title: 'Add sample post management', completed: false },
            { id: 'bv-3', title: 'Create voice preview/testing', completed: false },
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'business-profile', title: 'Business Profile', path: '/modules/business-profile', description: 'Parent entity' },
    { id: 'prompt-examples', title: 'Prompt Examples', path: '/modules/prompt-examples', description: 'How voice is used in prompts' },
  ],
};
