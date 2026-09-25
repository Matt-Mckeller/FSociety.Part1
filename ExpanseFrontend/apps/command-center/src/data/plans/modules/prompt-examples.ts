import type { PlanModule } from '../../../types/plans';

/**
 * Prompt Examples Module
 * 
 * Example prompts showing how business and personal profile data
 * is injected into AI content generation.
 */

export const promptExamples: PlanModule = {
  id: 'prompt-examples',
  title: 'Prompt Examples',
  description: 'Example prompts demonstrating how profile data is used in AI content generation',
  status: { data: 'partial', ui: 'planned', logic: 'planned' },
  overallStatus: 'Planned',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      content: [
        {
          type: 'text',
          value: 'This page shows example prompts that demonstrate how data from Business Profile, Personal Profile, and other entities gets assembled into prompts for AI content generation. Understanding these patterns helps in designing effective data structures.',
        },
      ],
    },
    {
      id: 'business-post-example',
      title: 'Business Post Generation',
      content: [
        {
          type: 'text',
          value: 'Example prompt for generating a LinkedIn post as a business:',
        },
        {
          type: 'code',
          language: 'text',
          code: `You are writing a social media post for {{businessProfile.name}}.

## Company Context
- **Company**: {{businessProfile.name}}
- **Tagline**: {{businessProfile.tagline}}
- **Industry**: {{businessProfile.industry}}
- **Description**: {{businessProfile.description}}

## Brand Voice
- **Formality**: {{brandVoice.formality}}
- **Primary Tone**: {{brandVoice.tone.primaryTone}}
- **Secondary Tones**: {{brandVoice.tone.secondaryTones | join(", ")}}
- **Emoji Usage**: {{brandVoice.tone.emojiUsage}}

## DO Examples (follow these patterns):
{{#each brandVoice.doExamples}}
- {{this}}
{{/each}}

## DON'T Examples (avoid these patterns):
{{#each brandVoice.dontExamples}}
- {{this}}
{{/each}}

## Content Goal
{{contentGoal.goal}} (Weight: {{contentGoal.weight}}/10)

## Custom Instructions
Always do:
{{#each customInstructions.global.alwaysDo}}
- {{this}}
{{/each}}

Never do:
{{#each customInstructions.global.neverDo}}
- {{this}}
{{/each}}

## Task
Write a {{platform}} post about {{topic}} that aligns with the brand voice and achieves the content goal.`,
        },
      ],
    },
    {
      id: 'personal-post-example',
      title: 'Personal Post Generation',
      content: [
        {
          type: 'text',
          value: 'Example prompt for generating a post as an individual:',
        },
        {
          type: 'code',
          language: 'text',
          code: `You are writing a personal social media post for {{personalProfile.name}}.

## Personal Identity
- **Name**: {{personalProfile.name}}
- **Title**: {{personalProfile.title}}
- **Tagline**: {{personalProfile.tagline}}
- **Bio**: {{personalProfile.bio}}

## Personality & Style
- **Traits**: {{personalProfile.personalityTraits | join(", ")}}
- **Values**: {{personalProfile.values | join(", ")}}
- **Strengths**: {{personalProfile.strengths | join(", ")}}

## Current Goals
{{#each personalProfile.personalGoals}}
- [{{this.category}}] {{this.goal}} (Priority: {{this.weight}}/10)
{{/each}}

## Topics of Interest
- **Interests**: {{personalProfile.interests | join(", ")}}
- **Favorite Topics**: {{personalProfile.favoriteTopics | join(", ")}}

## Strong Opinions to Reference
{{#each personalProfile.opinions}}
- {{this.opinion}} [{{this.strength}}]
{{/each}}

## Personal Stories Available
{{#each personalProfile.stories}}
- [{{this.category}}] {{this.title}}
{{/each}}

## Task
Write a {{platform}} post sharing your perspective on {{topic}}.
The post should feel authentic, leverage your personality traits, and advance your goal of "{{selectedGoal}}".`,
        },
      ],
    },
    {
      id: 'audience-targeted-example',
      title: 'Audience-Targeted Content',
      content: [
        {
          type: 'text',
          value: 'Example prompt that incorporates audience segment data:',
        },
        {
          type: 'code',
          language: 'text',
          code: `## Target Audience: {{audienceSegment.name}}

### Demographics
- **Age Range**: {{audienceSegment.demographics.ageRange}}
- **Job Titles**: {{audienceSegment.demographics.jobTitles | join(", ")}}
- **Industry**: {{audienceSegment.demographics.industry}}

### Psychographics
- **Values**: {{audienceSegment.psychographics.values | join(", ")}}
- **Pain Points**: {{audienceSegment.psychographics.painPoints | join(", ")}}
- **Goals**: {{audienceSegment.psychographics.goals | join(", ")}}

### Communication Preferences
- **Preferred Tone**: {{audienceSegment.communicationPreferences.tone}}
- **Content Length**: {{audienceSegment.communicationPreferences.length}}
- **Visual Style**: {{audienceSegment.communicationPreferences.visualStyle}}

## Task
Create content that speaks directly to this audience's pain points and goals.`,
        },
      ],
    },
    {
      id: 'pillar-based-example',
      title: 'Content Pillar Based',
      content: [
        {
          type: 'text',
          value: 'Example prompt using content pillars for strategic alignment:',
        },
        {
          type: 'code',
          language: 'text',
          code: `## Content Pillar: {{contentPillar.name}}

- **Description**: {{contentPillar.description}}
- **Weight**: {{contentPillar.weight}}/10
- **Target Audience**: {{contentPillar.targetAudience}}

### Key Messages for This Pillar
{{#each contentPillar.keyMessages}}
- {{this.message}} (Emphasis: {{this.emphasis}})
{{/each}}

### Topics Under This Pillar
{{#each contentPillar.topics}}
- {{this.name}}: {{this.description}}
{{/each}}

## Task
Generate content that reinforces the "{{contentPillar.name}}" pillar,
incorporating at least one key message naturally.`,
        },
      ],
    },
    {
      id: 'multi-model-example',
      title: 'Multi-Model Comparison',
      content: [
        {
          type: 'text',
          value: 'Example of how the same prompt is sent to multiple models for comparison:',
        },
        {
          type: 'code',
          language: 'text',
          code: `## Generation Pipeline: Multi-Model Comparison

### Step 1: Send to Multiple Models
- Model A: Claude (creative, nuanced)
- Model B: GPT-4 (structured, comprehensive)  
- Model C: Gemini (factual, well-researched)

### Step 2: Collect Responses
[Response A]: "..."
[Response B]: "..."
[Response C]: "..."

### Step 3: Present for Selection
User reviews all three and selects best option or combines elements.

### Step 4: Refinement
Selected content can be further refined with specific instructions.`,
        },
      ],
    },
    {
      id: 'data-injection-patterns',
      title: 'Data Injection Patterns',
      content: [
        {
          type: 'text',
          value: 'Common patterns for injecting different data types:',
        },
        {
          type: 'table',
          headers: ['Data Type', 'Injection Pattern', 'When to Use'],
          rows: [
            ['BusinessProfile', 'Always include core fields (name, tagline, industry)', 'Every business content generation'],
            ['BrandVoice', 'Include tone, formality, do/don\'t examples', 'Every content generation'],
            ['PersonalProfile', 'Include identity, traits, goals', 'Personal content generation'],
            ['AudienceSegment', 'Include demographics, psychographics, preferences', 'When targeting specific audience'],
            ['ContentPillar', 'Include pillar name, key messages, topics', 'Strategic/planned content'],
            ['CustomInstructions', 'Always include global rules, add platform-specific', 'Every generation'],
            ['FewShotExamples', 'Include 2-3 relevant examples', 'When quality matters most'],
            ['PersonalStory', 'Include 1-2 relevant stories', 'Authentic personal content'],
          ],
        },
      ],
    },
    {
      id: 'template-variables',
      title: 'Template Variables Reference',
      content: [
        {
          type: 'text',
          value: 'Standard template variables available in prompt templates:',
        },
        {
          type: 'table',
          headers: ['Variable', 'Type', 'Description'],
          rows: [
            ['{{businessProfile.*}}', 'Object', 'All BusinessProfile fields'],
            ['{{personalProfile.*}}', 'Object', 'All PersonalProfile fields'],
            ['{{brandVoice.*}}', 'Object', 'Brand voice configuration'],
            ['{{customInstructions.*}}', 'Object', 'Custom rules and guidelines'],
            ['{{contentPillar.*}}', 'Object', 'Selected content pillar'],
            ['{{audienceSegment.*}}', 'Object', 'Target audience data'],
            ['{{platform}}', 'String', 'Target platform (linkedin, twitter, etc.)'],
            ['{{topic}}', 'String', 'Content topic'],
            ['{{contentType}}', 'String', 'Type of content (post, article, etc.)'],
            ['{{tone}}', 'String', 'Requested tone override'],
            ['{{length}}', 'String', 'Requested length (short, medium, long)'],
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
            { id: 'pe-1', title: 'Create prompt template system', completed: false },
            { id: 'pe-2', title: 'Build template variable resolver', completed: false },
            { id: 'pe-3', title: 'Implement few-shot example injection', completed: false },
            { id: 'pe-4', title: 'Add platform-specific prompt adjustments', completed: false },
            { id: 'pe-5', title: 'Create prompt preview/testing UI', completed: false },
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'business-profile', title: 'Business Profile', path: '/modules/business-profile', description: 'Core business data source' },
    { id: 'personal-profile', title: 'Personal Profile', path: '/modules/personal-profile', description: 'Personal data source' },
    { id: 'generation-overview', title: 'Generation Overview', path: '/modules/generation/overview', description: 'Overall generation system' },
    { id: 'generation-configuration', title: 'Configuration', path: '/modules/generation/configuration', description: 'Generation settings' },
  ],
};
