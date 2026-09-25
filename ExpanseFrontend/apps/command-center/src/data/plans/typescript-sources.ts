/**
 * TypeScript Source Definitions
 * 
 * Raw source code for data-architecture types.
 * These are embedded as strings for display in the plans-viewer.
 * 
 * Note: In a production setup, these would be loaded dynamically.
 * For now, we define key excerpts that highlight the interface structure.
 */

// ============================================================================
// Business Profile Related Sources
// ============================================================================

export const businessProfileSource = `/**
 * BUSINESS PROFILE
 * 
 * @summary
 * Core company identity and metadata that defines who the business is.
 * This is the root entity that all other business data connects to.
 * 
 * @purpose
 * - Define company name, tagline, and description
 * - Classify industry, size, and growth stage
 * - Establish business model and revenue model
 * - Provide foundational context for all content generation
 * 
 * @ai-usage
 * Always include BusinessProfile in content generation context.
 * Use name, tagline, and description to understand brand identity.
 * Match tone to companySize and stage (startups vs enterprises).
 * 
 * @relationships
 * - has_one: BrandVoice
 * - has_one: CompanyGoals
 * - has_one: CompanyPurpose
 * - has_one: CustomInstructions
 * - has_one: LanguageConfig
 * - has_one: VisualIdentity
 * - has_many: Products
 * - has_many: AudienceSegments
 * - has_many: ContentPillars
 * - has_many: PlatformConfigs
 * - has_many: KeyMessages
 * - has_many: FewShotExamples
 * - has_many: GeneratedContent
 */

export interface BusinessProfile extends BusinessEntity {
  /** Company name */
  name: string;
  
  /** Short memorable tagline */
  tagline?: string;
  
  /** Detailed company description */
  description: string;
  
  /** Primary industry classification */
  industry: string;
  
  /** More specific industry category */
  industrySubcategory?: string;
  
  /** Company website URL */
  website?: string;
  
  /** Year company was founded */
  foundedYear?: number;
  
  /** Company size classification */
  companySize?: CompanySize;
  
  /** Primary headquarters location */
  headquarters?: string;
  
  /** Geographic markets served */
  markets?: string[];
  
  /** Business model type */
  businessModel?: 'b2b' | 'b2c' | 'b2b2c' | 'marketplace' | 'saas' | string;
  
  /** Revenue model */
  revenueModel?: 'subscription' | 'transactional' | 'freemium' | 'advertising' | 'enterprise' | string;
  
  /** Company growth stage */
  stage?: CompanyStage;
  
  // Relations
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
}`;

export const brandVoiceSource = `/**
 * BRAND VOICE
 * 
 * @summary
 * Defines how the brand communicates - tone, personality, vocabulary, and style.
 * Critical for ensuring AI-generated content matches the brand's unique voice.
 * 
 * @ai-usage
 * ALWAYS inject brand voice into content generation prompts.
 * Use doExamples and dontExamples for few-shot learning.
 * Apply vocabulary.preferredTerms and avoid vocabulary.avoidTerms.
 */

export interface BrandVoice extends BusinessEntity {
  /** Tone settings - how content should feel */
  tone: ToneSettings;
  
  /** Personality traits that define the brand */
  personality: PersonalityTraits;
  
  /** Vocabulary preferences and restrictions */
  vocabulary: VocabularySettings;
  
  /** Overall formality level */
  formality: Formality;
  
  /** Platform-specific voice adjustments */
  platformAdjustments?: PlatformVoiceAdjustment[];
  
  /** Examples of how we DO communicate */
  doExamples: string[];
  
  /** Examples of how we DON'T communicate */
  dontExamples: string[];
  
  /** Sample posts that exemplify the brand voice */
  samplePosts: SamplePost[];
}

export interface ToneSettings {
  primaryTone: string;
  secondaryTones: string[];
  emojiUsage: 'none' | 'minimal' | 'moderate' | 'frequent' | 'auto';
  hashtagStyle: 'none' | 'minimal' | 'moderate' | 'heavy' | 'auto';
  ctaStyle: 'subtle' | 'direct' | 'urgent' | 'auto';
}`;

export const companyGoalsSource = `/**
 * COMPANY GOALS
 * 
 * @summary
 * Strategic, tactical, and content-specific goals that guide business direction.
 * Goals help AI understand what outcomes the business is working toward.
 * 
 * @ai-usage
 * Use contentGoals to understand what content should achieve.
 * Reference strategic goals for thought leadership content.
 * Weight affects which goals to emphasize in limited space.
 */

export interface CompanyGoals extends BusinessEntity {
  /** Long-term strategic goals */
  strategic: WeightedGoal[];
  
  /** Short to medium-term tactical goals */
  tactical?: WeightedGoal[];
  
  /** Content-specific goals with measurable outcomes */
  contentGoals: ContentGoal[];
}

export interface WeightedGoal {
  goal: string;
  weight: Weight; // 0-10
  timeframe?: TimeFrame;
  kpis?: string[];
  relatedPurposes?: string[];
}

export interface ContentGoal {
  goal: string;
  weight: Weight;
  metrics?: string[];
}`;

export const companyPurposeSource = `/**
 * COMPANY PURPOSE
 * 
 * @summary
 * Defines the company's mission, vision, and Core Purpose Theme Data.
 * Why the company exists and what it stands for.
 * 
 * Core Purpose Theme Data are differentiators used to modify prompt themes.
 * A business should have 3-5 of these data points with:
 * - Business-level priority weights (overall importance)
 * - Per-prompt ranking factors (weights that vary by content type)
 */

export interface CompanyPurpose extends BusinessEntity {
  /** Mission statement - what we do and why */
  mission: string;
  
  /** Vision statement - what we're working toward */
  vision: string;
  
  /** Short memorable phrase */
  tagline?: string;
  
  /** 
   * Core Purpose Theme Data - 3-5 primary purpose themes that drive the business
   * Each has business-level priority weights and per-prompt ranking factors
   */
  coreThemes: WeightedPurpose[];
  
  /** Supporting purpose themes */
  secondaryThemes?: WeightedPurpose[];
  
  /** Core company values */
  values?: { name: string; description: string; weight?: Weight; }[];
  
  /** Aspirational goals tied to company purpose */
  purposeGoals?: PurposeGoal[];
}`;

export const customInstructionsSource = `/**
 * CUSTOM INSTRUCTIONS
 * 
 * @summary
 * User-defined rules and guidelines for content generation.
 * These are HARD RULES that AI must always follow or never violate.
 * 
 * @ai-usage
 * These are HARD RULES - always apply alwaysDo, never violate neverDo.
 * Apply formatRules to content structure.
 * Layer platform and content-type instructions over global rules.
 */

export interface CustomInstructions extends BusinessEntity {
  /** Global rules that apply to all content */
  global: {
    alwaysDo: string[];
    neverDo: string[];
    formatRules: string[];
  };
  
  /** Platform-specific rules */
  platformInstructions?: PlatformInstruction[];
  
  /** Content type-specific rules */
  contentTypeInstructions?: ContentTypeInstruction[];
  
  /** Persona-specific rules */
  personaInstructions?: PersonaInstruction[];
  
  /** Freeform additional context */
  additionalNotes?: string;
}`;

// ============================================================================
// Personal Profile Related Sources
// ============================================================================

export const personalProfileSource = `/**
 * PERSONAL PROFILE
 * 
 * @summary
 * Profile data for an individual person, used for personal branding and content.
 * Similar to BusinessProfile but for individuals rather than companies.
 * 
 * @purpose
 * - Define personal identity and brand
 * - Capture personal goals, themes, and attributes
 * - Support content generation for individuals
 * - Enable personal marketing and self-representation
 * 
 * @ai-usage
 * Use personalGoals to understand what the person wants to achieve.
 * Reference personality and themes for voice consistency.
 * Use interests and topics to guide content direction.
 * 
 * @relationships
 * - has_one: PersonalVoice (personal brand voice)
 * - has_many: PersonalGoal (embedded)
 * - has_many: Interest (embedded)
 * - informs: GeneratedContent (personal content)
 */

export interface PersonalProfile extends BaseEntity {
  /** Full name */
  name: string;
  
  /** Display name or handle */
  displayName?: string;
  
  /** Personal tagline or bio summary */
  tagline?: string;
  
  /** Extended bio/description */
  bio?: string;
  
  /** Professional title or role */
  title?: string;
  
  /** Location */
  location?: string;
  
  /** Personal website or portfolio */
  website?: string;
  
  /** Personal and professional goals */
  personalGoals: PersonalGoal[];
  
  /** Personality traits that define communication style */
  personalityTraits?: string[];
  
  /** Core personal values */
  values?: string[];
  
  /** Strengths and skills to highlight */
  strengths?: string[];
  
  /** Topics the person is interested in */
  interests?: string[];
  
  /** Favorite topics they want to be known for */
  favoriteTopics?: string[];
  
  /** Personal themes for content */
  themes?: PersonalTheme[];
  
  /** Strong opinions or perspectives */
  opinions?: PersonalOpinion[];
  
  /** Personal stories and experiences */
  stories?: PersonalStory[];
  
  /** Associated business profile ID */
  businessId?: string;
  
  /** Platform-specific profile links */
  platformProfiles?: { platform: string; profileUrl?: string; handle?: string; }[];
}

export interface PersonalGoal {
  goal: string;
  category: 'communication' | 'professional' | 'personal' | 'relationships' | 'influence';
  description?: string;
  weight?: Weight;
}

export interface PersonalTheme {
  name: string;
  description?: string;
  weight?: Weight;
}

export interface PersonalOpinion {
  opinion: string;
  topic?: string;
  strength?: 'mild' | 'moderate' | 'strong';
}

export interface PersonalStory {
  title: string;
  content?: string;
  category?: 'career' | 'lesson' | 'achievement' | 'failure' | 'insight';
  lessons?: string[];
}`;

// ============================================================================
// Relationship Diagrams (Mermaid)
// ============================================================================

export const businessProfileERD = `erDiagram
    BusinessProfile ||--o| BrandVoice : has_one
    BusinessProfile ||--o| CompanyGoals : has_one
    BusinessProfile ||--o| CompanyPurpose : has_one
    BusinessProfile ||--o| CustomInstructions : has_one
    BusinessProfile ||--o| VisualIdentity : has_one
    BusinessProfile ||--o{ Product : has_many
    BusinessProfile ||--o{ AudienceSegment : has_many
    BusinessProfile ||--o{ ContentPillar : has_many
    BusinessProfile ||--o{ PlatformConfig : has_many
    BusinessProfile ||--o{ KeyMessage : has_many
    BusinessProfile ||--o{ Campaign : has_many
    BusinessProfile ||--o{ GeneratedContent : produces
    
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
        object vocabulary
    }
    
    CompanyGoals {
        string id PK
        array strategic
        array tactical
        array contentGoals
    }
    
    CompanyPurpose {
        string id PK
        string mission
        string vision
        array coreThemes
    }`;

export const personalProfileERD = `erDiagram
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
        array values
        array interests
    }
    
    PersonalGoal {
        string goal
        string category
        number weight
    }
    
    PersonalTheme {
        string name
        string description
        number weight
    }
    
    PersonalOpinion {
        string opinion
        string topic
        string strength
    }
    
    PersonalStory {
        string title
        string content
        string category
        array lessons
    }`;
