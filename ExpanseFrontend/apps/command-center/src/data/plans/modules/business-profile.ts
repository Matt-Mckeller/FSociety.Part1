import type { PlanModule } from '../../../types/plans';

/**
 * Business Profile Module
 * 
 * Core company identity and metadata that all other business data connects to.
 * This is the root entity for business-related content generation.
 * 
 * Source: data-architecture/core/business-profile.ts
 */

export const businessProfile: PlanModule = {
  id: 'business-profile',
  title: 'Business Profile',
  description: 'Core company identity and metadata that defines who the business is. The root entity for all business data.',
  status: { data: 'done', ui: 'partial', logic: 'partial' },
  overallStatus: 'Partial',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      content: [
        {
          type: 'text',
          value: 'The Business Profile is the foundational entity in 4up that captures everything about a company\'s identity. It serves as the root from which all other business-related data connects.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Purpose',
        },
        {
          type: 'list',
          items: [
            'Define company name, tagline, and description',
            'Classify industry, size, and growth stage',
            'Establish business model and revenue model',
            'Provide foundational context for all content generation',
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
            ['Identity', 'name, tagline, description, industry, industrySubcategory', 'Core brand identity'],
            ['Location', 'headquarters, markets, website', 'Geographic presence'],
            ['Business Model', 'businessModel, revenueModel', 'How the company operates and earns'],
            ['Stage', 'companySize, stage, foundedYear', 'Company maturity and scale'],
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
          value: 'The Business Profile page in the 4up app is organized into the following sections:',
        },
        {
          type: 'table',
          headers: ['Section', 'Emoji', 'Components', 'Priority'],
          rows: [
            ['Identity', '🎯', 'BusinessIdentityCard', 'Tier 1 (Always Expanded)'],
            ['Brand & Design', '🎨', 'BrandThemesCard, DesignSystemCard', 'Tier 2 (Expanded)'],
            ['Purpose & Strategy', '📋', 'PurposeCard, PurposeGoalsCard, GoalsCard, VoicePreviewCard', 'Tier 2 (Expanded)'],
            ['Market Focus', '🔍', 'PainPointsCard, ResearchCard', 'Tier 3 (Collapsed)'],
            ['Stories & Proof', '📖', 'StoriesCard, TestimonialsCard', 'Tier 3 (Collapsed)'],
            ['Resources', '📎', 'NotesCard, UrlsCard, LogosCard, ConnectedDataCard', 'Tier 3 (Collapsed)'],
          ],
        },
      ],
    },
    {
      id: 'related-entities',
      title: 'Related Entities',
      content: [
        {
          type: 'text',
          value: 'The Business Profile connects to many other entities in the system:',
        },
        {
          type: 'table',
          headers: ['Relationship', 'Entity', 'Description'],
          rows: [
            ['has_one', 'BrandVoice', 'How the brand communicates'],
            ['has_one', 'CompanyGoals', 'Strategic and content goals'],
            ['has_one', 'CompanyPurpose', 'Mission, vision, and values'],
            ['has_one', 'CustomInstructions', 'AI generation rules'],
            ['has_one', 'VisualIdentity', 'Visual brand elements'],
            ['has_many', 'Products', 'Products and services offered'],
            ['has_many', 'AudienceSegments', 'Target audience definitions'],
            ['has_many', 'ContentPillars', 'Content strategy pillars'],
            ['has_many', 'PlatformConfigs', 'Social platform settings'],
            ['has_many', 'Campaigns', 'Marketing campaigns'],
            ['produces', 'GeneratedContent', 'AI-generated content'],
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
          value: 'The Business Profile is injected into every content generation prompt. Here\'s how the AI uses this data:',
        },
        {
          type: 'list',
          items: [
            '**Always include** BusinessProfile in content generation context',
            '**Use name, tagline, and description** to understand brand identity',
            '**Match tone** to companySize and stage (startups speak differently than enterprises)',
            '**Reference industry** for appropriate terminology and context',
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
          value: 'View the full interface definition in `data-architecture/core/business-profile.ts`',
        },
        {
          type: 'code',
          language: 'typescript',
          code: `interface BusinessProfile extends BusinessEntity {
  name: string;
  tagline?: string;
  description: string;
  industry: string;
  industrySubcategory?: string;
  website?: string;
  foundedYear?: number;
  companySize?: CompanySize;
  headquarters?: string;
  markets?: string[];
  businessModel?: 'b2b' | 'b2c' | 'b2b2c' | 'marketplace' | 'saas' | string;
  revenueModel?: 'subscription' | 'transactional' | 'freemium' | 'advertising' | 'enterprise' | string;
  stage?: CompanyStage;
  
  // Relationship IDs
  brandVoiceId?: string;
  companyGoalsId?: string;
  companyPurposeId?: string;
  customInstructionsId?: string;
  visualIdentityId?: string;
  targetProblemIds?: string[];
  productIds?: string[];
  audienceSegmentIds?: string[];
  contentPillarIds?: string[];
  campaignIds?: string[];
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
    BusinessProfile ||--o| BrandVoice : has_one
    BusinessProfile ||--o| CompanyGoals : has_one
    BusinessProfile ||--o| CompanyPurpose : has_one
    BusinessProfile ||--o| CustomInstructions : has_one
    BusinessProfile ||--o| VisualIdentity : has_one
    BusinessProfile ||--o{ Product : has_many
    BusinessProfile ||--o{ AudienceSegment : has_many
    BusinessProfile ||--o{ ContentPillar : has_many
    BusinessProfile ||--o{ Campaign : has_many
    
    BusinessProfile {
        string id PK
        string name
        string tagline
        string description
        string industry
        string companySize
        string stage
    }
    
    BrandVoice {
        string id PK
        string formality
        object tone
        object personality
    }
    
    CompanyGoals {
        string id PK
        array strategic
        array contentGoals
    }`,
          caption: 'Business Profile Entity Relationships',
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
            ['UI', '🟡 Partial', 'Page with 6 sections, read-only display'],
            ['Logic', '🟡 Partial', 'Store and data loading implemented'],
            ['Editing', '🔴 Planned', 'Edit mode not yet implemented'],
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
            { id: 'bp-1', title: 'Implement edit mode for Business Profile', completed: false },
            { id: 'bp-2', title: 'Add validation for required fields', completed: false },
            { id: 'bp-3', title: 'Connect to content generation pipeline', completed: false },
            { id: 'bp-4', title: 'Add business profile wizard for onboarding', completed: false },
          ],
        },
      ],
    },
  ],
  relatedDocuments: [
    { id: 'brand-voice', title: 'Brand Voice', path: '/modules/brand-voice', description: 'Tone and communication style' },
    { id: 'company-goals', title: 'Company Goals', path: '/modules/company-goals', description: 'Strategic and content goals' },
    { id: 'company-purpose', title: 'Company Purpose', path: '/modules/company-purpose', description: 'Mission, vision, values' },
    { id: 'custom-instructions', title: 'Custom Instructions', path: '/modules/custom-instructions', description: 'AI generation rules' },
    { id: 'generation-overview', title: 'Generation Overview', path: '/modules/generation/overview', description: 'How profile data feeds into content generation' },
    { id: 'prompt-examples', title: 'Prompt Examples', path: '/modules/prompt-examples', description: 'Example prompts using profile data' },
  ],
};
