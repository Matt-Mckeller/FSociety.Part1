import type { PlanModule } from '../../../types/plans';

/**
 * Personal Profile Module
 * 
 * Profile data for an individual person, used for personal branding and content.
 * Similar to BusinessProfile but for individuals rather than companies.
 * 
 * Source: data-architecture/core/personal-profile.ts
 */

export const personalProfile: PlanModule = {
  id: 'personal-profile',
  title: 'Personal Profile',
  description: 'User identity and personal data for content personalization. Enables personal branding distinct from business identity.',
  status: { data: 'done', ui: 'partial', logic: 'planned' },
  overallStatus: 'Data + UI',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      content: [
        {
          type: 'text',
          value: 'The Personal Profile captures an individual\'s identity, personality, goals, and experiences for personal branding. Unlike the Business Profile which represents a company, this represents a person—useful for thought leadership, personal marketing, or representing an individual behind a business.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Purpose',
        },
        {
          type: 'list',
          items: [
            'Define personal identity and brand',
            'Capture personal goals, themes, and attributes',
            'Support content generation for individuals',
            'Enable personal marketing and self-representation',
            'Track personal stories and experiences for authentic content',
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
            ['Identity', 'name, displayName, tagline, bio, title, location', 'Core personal identity'],
            ['Personality & Attributes', 'personalityTraits, values, strengths', 'Who you are and how you communicate'],
            ['Goals', 'personalGoals (by category)', 'What you want to achieve'],
            ['Interests & Themes', 'interests, favoriteTopics, themes', 'Topics you engage with'],
            ['Opinions & Perspectives', 'opinions (with strength)', 'Distinctive viewpoints'],
            ['Stories & Experiences', 'stories (categorized)', 'Personal narrative content'],
            ['Platform Presence', 'platformProfiles, website', 'Social and web presence'],
          ],
        },
      ],
    },
    {
      id: 'ui-sections',
      title: 'Current UI Sections',
      content: [
        {
          type: 'text',
          value: 'The Personal Profile page in the 4up app is organized into the following sections:',
        },
        {
          type: 'table',
          headers: ['Section', 'Emoji', 'Components', 'Priority'],
          rows: [
            ['Identity', '👤', 'PersonalIdentityCard', 'Tier 1 (Always Expanded)'],
            ['Skills & Experience', '🎮', 'SkillsCard', 'Tier 2 (Expanded)'],
            ['Life Timeline', '📅', 'LifeEventsCard', 'Tier 2 (Expanded)'],
            ['Goals & Interests', '🎯', 'PersonalGoalsCard, PersonalInterestsCard', 'Tier 2 (Expanded)'],
            ['Media', '🖼️', 'PersonalMediaCard', 'Tier 3 (Collapsed)'],
          ],
        },
      ],
    },
    {
      id: 'goal-categories',
      title: 'Personal Goal Categories',
      content: [
        {
          type: 'text',
          value: 'Personal goals are categorized to help the AI understand different aspects of what the person wants to achieve:',
        },
        {
          type: 'table',
          headers: ['Category', 'Description', 'Example'],
          rows: [
            ['communication', 'Improve clarity, speed, effectiveness', '"Explain complex topics simply"'],
            ['professional', 'Career and professional growth', '"Become a recognized thought leader"'],
            ['personal', 'Personal development and self-improvement', '"Read 50 books this year"'],
            ['relationships', 'Building connections and community', '"Grow my professional network"'],
            ['influence', 'Growing audience and reach', '"Build 10K engaged followers"'],
          ],
        },
      ],
    },
    {
      id: 'story-categories',
      title: 'Personal Story Categories',
      content: [
        {
          type: 'text',
          value: 'Personal stories are categorized for appropriate content usage:',
        },
        {
          type: 'table',
          headers: ['Category', 'Description', 'Best For'],
          rows: [
            ['career', 'Professional journey milestones', 'LinkedIn, professional content'],
            ['lesson', 'Key learnings from experience', 'Educational content, mentorship'],
            ['achievement', 'Wins and accomplishments', 'Credibility, inspiration'],
            ['failure', 'Setbacks and what they taught', 'Authenticity, vulnerability'],
            ['insight', 'Unique perspectives gained', 'Thought leadership, opinion pieces'],
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
          value: 'The Personal Profile is used when generating content as an individual (vs. as a business):',
        },
        {
          type: 'list',
          items: [
            '**Use personalGoals** to understand what the person wants to achieve',
            '**Reference personality and themes** for voice consistency',
            '**Use interests and topics** to guide content direction',
            '**Pull from stories** for authentic, engaging narrative content',
            '**Reference opinions** to give content a distinctive, opinionated voice',
          ],
        },
      ],
    },
    {
      id: 'vs-business-profile',
      title: 'Personal vs Business Profile',
      content: [
        {
          type: 'text',
          value: 'When to use each profile type:',
        },
        {
          type: 'table',
          headers: ['Aspect', 'Personal Profile', 'Business Profile'],
          rows: [
            ['Represents', 'An individual person', 'A company or organization'],
            ['Voice', 'First person, authentic', 'Brand voice, often third person'],
            ['Goals', 'Personal growth, influence', 'Revenue, market position'],
            ['Stories', 'Personal experiences', 'Case studies, testimonials'],
            ['Use Cases', 'Thought leadership, personal brand', 'Company marketing, product promotion'],
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
          type: 'text',
          value: 'View the full interface definition in `data-architecture/core/personal-profile.ts`',
        },
        {
          type: 'code',
          language: 'typescript',
          code: `interface PersonalProfile extends BaseEntity {
  name: string;
  displayName?: string;
  tagline?: string;
  bio?: string;
  title?: string;
  location?: string;
  website?: string;
  
  personalGoals: PersonalGoal[];
  personalityTraits?: string[];
  values?: string[];
  strengths?: string[];
  interests?: string[];
  favoriteTopics?: string[];
  themes?: PersonalTheme[];
  opinions?: PersonalOpinion[];
  stories?: PersonalStory[];
  
  businessId?: string;
  platformProfiles?: { platform: string; profileUrl?: string; handle?: string; }[];
}

interface PersonalGoal {
  goal: string;
  category: 'communication' | 'professional' | 'personal' | 'relationships' | 'influence';
  description?: string;
  weight?: Weight;
}

interface PersonalOpinion {
  opinion: string;
  topic?: string;
  strength?: 'mild' | 'moderate' | 'strong';
}

interface PersonalStory {
  title: string;
  content?: string;
  category?: 'career' | 'lesson' | 'achievement' | 'failure' | 'insight';
  lessons?: string[];
}`,
        },
      ],
    },
    {
      id: 'entity-relationships',
      title: 'Entity Relationship Diagram',
      collapsed: true,
      content: [
        {
          type: 'mermaid',
          diagram: `erDiagram
    PersonalProfile ||--o| BusinessProfile : associated_with
    PersonalProfile ||--o{ PersonalGoal : has_many
    PersonalProfile ||--o{ PersonalTheme : has_many
    PersonalProfile ||--o{ PersonalOpinion : has_many
    PersonalProfile ||--o{ PersonalStory : has_many
    PersonalProfile ||--o{ PlatformProfile : has_many
    PersonalProfile ||--o{ GeneratedContent : produces
    
    PersonalProfile {
        string id PK
        string name
        string displayName
        string tagline
        string bio
        string title
        array personalityTraits
        array interests
    }
    
    PersonalGoal {
        string goal
        string category
        number weight
    }
    
    PersonalStory {
        string title
        string content
        string category
    }`,
          caption: 'Personal Profile Entity Relationships',
        },
      ],
    },
    {
      id: 'implementation-status',
      title: 'Implementation Status',
      content: [
        {
          type: 'table',
          headers: ['Aspect', 'Status', 'Notes'],
          rows: [
            ['Data Types', '✅ Done', 'Full TypeScript interfaces defined'],
            ['UI', '🟡 Partial', 'Page with 5 sections implemented'],
            ['Logic', '🔴 Planned', 'Store exists, editing not implemented'],
            ['Integration', '🔴 Planned', 'Not yet connected to content generation'],
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
            { id: 'pp-task-1', title: 'Define personal profile data schema', completed: true },
            { id: 'pp-task-2', title: 'Create profile editing UI', completed: false },
            { id: 'pp-task-3', title: 'Integrate with generation context', completed: false },
            { id: 'pp-task-4', title: 'Add personal story management', completed: false },
            { id: 'pp-task-5', title: 'Implement opinion strength weighting', completed: false },
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'business-profile', title: 'Business Profile', path: '/modules/business-profile', description: 'Company identity (contrast)' },
    { id: 'generation-overview', title: 'Generation Overview', path: '/modules/generation/overview', description: 'Uses profile for content generation' },
    { id: 'prompt-examples', title: 'Prompt Examples', path: '/modules/prompt-examples', description: 'Example prompts using profile data' },
  ],
};
