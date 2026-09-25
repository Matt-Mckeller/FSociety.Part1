/**
 * Type definitions for Expanse EDU Documentation
 */

// Content block types for flexible rendering
export type ContentBlockType = "text" | "list" | "quote" | "callout" | "heading"

export interface ContentBlock {
  type: ContentBlockType
  content: string | string[]
  variant?: "info" | "warning" | "success" | "highlight"
}

// Document status tracking
export type DocStatus = "draft" | "review" | "final"
export type DocPriority = "high" | "medium" | "low"

// Base document section
export interface DocSection {
  id: string
  title: string
  description?: string
  content: string | ContentBlock[]
  tags?: string[]
  priority?: DocPriority
  status?: DocStatus
}

// Category-level document
export interface DocCategory {
  id: string
  name: string
  icon: string
  description: string
  sections: DocSection[]
}

// Business-specific types
export interface ElevatorPitch {
  id: string
  name: string
  duration: string
  audience: string[]
  content: string
  tags?: string[]
}

export interface ValueProposition {
  id: string
  title: string
  audience: string[]
  tier: number
  description: string
  benefits: string[]
}

export interface BusinessHighlight {
  id: string
  category: string
  items: string[]
}

export interface BusinessSummary {
  intro: string
  why: string
  what: string
  who: string
  education?: string
}

// Goals and Mission
export interface Goal {
  id: string
  title: string
  category: string
  description: string
  subGoals?: string[]
  features?: string[]
}

// Marketing types
export interface AudienceSegment {
  id: string
  name: string
  ageRange?: string
  education?: string
  experience?: string
}

export interface TargetAudience {
  id: string
  name: string
  priority: number
  segments: AudienceSegment[]
  characteristics?: string[]
  platforms?: string[]
}

export interface UserPersona {
  id: string
  name: string
  role: string
  description: string
  demographics: Record<string, string>
  goals: string[]
  painPoints: string[]
  motivations: string[]
  techSavviness: string
}

export interface MarketingChannel {
  id: string
  name: string
  description: string
  priority: number
  targets?: string[]
  features?: string[]
  approach?: string
  platforms?: { name: string; audience: string; content: string }[]
  status: string
}

// Product types
export interface Feature {
  id: string
  name: string
  category: string
  status: string
  priority: string
  description: string
  valueProposition: string
  userBenefit: string
  details?: string[]
  rewardTypes?: string[]
  progressionTypes?: string[]
  examples?: string[]
  storeTypes?: string[]
}

export interface FeatureCategory {
  id: string
  name: string
  description: string
}

// Technology types
export interface TechStackItem {
  name: string
  category: string
  primary?: boolean
  note?: string
}

export interface TechStack {
  languages: TechStackItem[]
  frameworks: TechStackItem[]
  database: TechStackItem[]
  apis: TechStackItem[]
  infrastructure: TechStackItem[]
  ui: TechStackItem[]
  testing: TechStackItem[]
  tools: TechStackItem[]
  ai: TechStackItem[]
  communications: TechStackItem[]
}

export interface ArchitecturePattern {
  name: string
  description: string
  status: string
}

export interface ArchitectureService {
  name: string
  status: string
}

export interface Architecture {
  overview: string
  patterns: ArchitecturePattern[]
  services: ArchitectureService[]
}

export interface ObservabilityItem {
  name: string
  description: string
  status: string
}

export interface Integration {
  name: string
  category: string
  description: string
  url?: string
  priority: string
}

export interface SecurityInfo {
  authentication: string[]
  compliance: string[]
  features: string[]
}

export interface ImplementationStatus {
  implemented: string[]
  inProgress: string[]
  planned: string[]
}

// Research types
export interface ResearchFinding {
  title: string
  source: string
  summary: string
  application: string
}

export interface ResearchTopic {
  id: string
  name: string
  icon: string
  findings: ResearchFinding[]
}

export interface ResearchStatistic {
  stat: string
  description: string
  context: string
}

export interface ResearchSource {
  name: string
  author?: string
  year?: string
  type: string
}

// Competition types
export interface CompetitorFunding {
  round: string
  amount: string
  year: string
}

export interface Competitor {
  id: string
  name: string
  category: string
  description: string
  marketShare?: string
  users?: string
  downloads?: string
  rating?: string
  funding?: CompetitorFunding[]
  strengths: string[]
  weaknesses: string[]
  url?: string
}

export interface CompetitorWeakness {
  area: string
  issue: string
}

// Risk types
export interface Risk {
  id: string
  title: string
  category: string
  severity: "low" | "medium" | "high"
  question: string
  response: string
  impact: string
  mitigations: string[]
}

export interface RiskCategory {
  id: string
  name: string
  icon: string
}

// Funding types
export interface FundingOpportunity {
  name: string
  category: string
  priority: "low" | "medium" | "high"
  url?: string
  notes?: string
  dates?: string[]
}

export interface IdealAdvisor {
  name: string
  reason: string
  priority: string
}

export interface KPIGoals {
  finance: string[]
  validation: string[]
  product: string[]
  people: string[]
}

// User types
export interface CustomerType {
  id: string
  type: string
  role: string
  benefits: string[]
  motivation: string
  icon: string
}

export interface TargetSegments {
  grades: { primary: string; rationale: string }
  schoolTypes: string[]
  geographicExpansion: string[]
}

// Psychology types
export interface DopamineInsight {
  insight: string
  application: string
  source: string
}

export interface PsychologyBenefit {
  benefit: string
  detail: string
}

export interface SocialDevelopmentInsight {
  finding: string
  source: string
}

// Mental health types
export interface MentalHealthStat {
  id: string
  stat: string
  description: string
  source: string
  severity: "low" | "medium" | "high" | "critical"
}

export interface MentalHealthFinding {
  finding: string
  source: string
}

// Reward types
export interface RewardClassification {
  id: string
  name: string
  icon: string
}

export interface RewardMedium {
  id: string
  name: string
  description: string
}

export interface RewardDataModelField {
  field: string
  values?: string[]
  description?: string
  notes?: string
  types?: string[]
  value?: string
  storeVariants?: string[]
  eventVariants?: string[]
}

export interface RewardDataModel {
  description: string
  coreFields: RewardDataModelField[]
  quantityFields: RewardDataModelField[]
  financialFields: RewardDataModelField[]
  redemptionEvents: { description: string; considerations: string[] }
  storageAndVisibility: RewardDataModelField[]
}

// Game Mechanics types
export interface GamePillar {
  name: string
  description: string
}

export interface CurrencyType {
  name: string
  purpose: string
  earnedFrom?: string[]
  uses?: string[]
  notes?: string
  acquisition?: string
}

export interface ProgressionType {
  type: string
  description: string
  concerns?: string
}

export interface QuestType {
  type: string
  description: string
}

export interface BattleType {
  type: string
  description: string
  basis?: string
  optional?: boolean
  default?: boolean
}

export interface PersonalizationCategory {
  name: string
  description: string
  mayRelate?: string
  status?: string
  mechanics?: string
  examplePerks?: string[]
}

export interface StoreType {
  type: string
  owner: string
}

export interface SocialFeature {
  name: string
  description?: string
  features?: string[]
  types?: string[]
  considerations?: string[]
  implementationDifficulty?: string
  value?: string
  restrictions?: string[]
  risks?: string[]
}

export interface RecognitionType {
  type: string
  description: string
  feature?: string
}

// Research Extensions types
export interface CollegeConcern {
  concern: string
  description: string
}

export interface DropoutFactor {
  factor: string
  description: string
}

export interface SocialFinding {
  finding: string
  detail?: string
  insight?: string
  stat?: string
  implication?: string
  source?: string
}

export interface EngagementStatistic {
  stat: string
  source: string
  trend?: string
  implication?: string
  breakdown?: string
}

export interface AttentionCause {
  cause: string
  detail: string
}

export interface SurveyType {
  type: string
  purpose: string
  metrics?: string[]
}

// Design Notes types
export interface SDTCoreNeed {
  need: string
  description: string
  expanseApplication: string
}

export interface InspirationalQuote {
  quote: string
  author?: string
  source?: string
  relevance: string
  context?: string
  application?: string
}

export interface AIUseCase {
  category: string
  uses: string[]
  reference?: string
}

export interface RewardResource {
  title: string
  link?: string
  concept?: string
  summary?: string
  scope?: string
  sponsor?: string
  keyInsight?: string
}

// Learning Science types
export interface AttentionFactor {
  factor: string
  effect: string
}

export interface AttentionPrinciple {
  principle: string
  description: string
}

export interface AttentionTechnique {
  technique: string
  description: string
}

export interface FeedbackType {
  type: string
  purpose: string
  example: string
}

export interface ReinforcementBenefit {
  benefit: string
  description: string
  mechanism: string
}

export interface ReinforcementComparison {
  approach: string
  effect: string
  outcome: string
}

export interface AgilityBenefit {
  benefit: string
  description: string
}

export interface ProgressPrinciple {
  principle: string
  description: string
  implementation: string
}

export interface HabitExample {
  habit: string
  reward: string
  outcome: string
}

export interface MissionComparison {
  mindset: string
  motivation: string
  engagement: string
  outcome: string
}

// Complete docs data structure
export interface ExpanseEduDocs {
  meta: {
    lastUpdated: string
    version: string
  }
  business: {
    summary: BusinessSummary
    highlights: BusinessHighlight[]
    pitches: ElevatorPitch[]
    valuePropositions: ValueProposition[]
    goals: Goal[]
  }
  marketing: {
    targetAudiences: TargetAudience[]
    personas: UserPersona[]
    interests: string[]
    targetOrder: string[]
  }
  channels: {
    channels: MarketingChannel[]
    focusAreas: string[]
    bigWins: { name: string; type: string; status: string }[]
  }
  product: {
    features: Feature[]
    categories: FeatureCategory[]
  }
  technology: {
    stack: TechStack
    architecture: Architecture
    observability: ObservabilityItem[]
    integrations: Integration[]
    security: SecurityInfo
    status: ImplementationStatus
  }
  research: {
    topics: ResearchTopic[]
    statistics: ResearchStatistic[]
    sources: ResearchSource[]
  }
  competition: {
    overview: { marketPosition: string; summary: string }
    competitors: Competitor[]
    differentiators: string[]
    competitorWeaknesses: CompetitorWeakness[]
    teacherFeedback: string[]
  }
  risks: {
    risks: Risk[]
    riskCategories: RiskCategory[]
  }
  funding: {
    fundingToDate: {
      type: string
      description: string
      estimatedValue: string
      notes: string
    }
    fundingPaths: { id: string; name: string; description: string }[]
    investmentReasons: { reason: string; description: string }[]
    fundingOpportunities: FundingOpportunity[]
    advisorGoals: string[]
    advisorAttributes: string[]
    idealAdvisors: IdealAdvisor[]
    kpiGoals2026: KPIGoals
  }
  users: {
    overview: {
      summary: string
      primaryUsers: string[]
      secondaryUsers: string[]
    }
    customers: CustomerType[]
    userPersonaAttributes: string[]
    targetSegments: TargetSegments
    parentInsights: { challenges: string[]; source: string }
  }
  psychology: {
    overview: { summary: string; keyPrinciples: string[] }
    dopamine: {
      title: string
      description: string
      keyInsights: DopamineInsight[]
      rewardVariance: {
        concept: string
        application: string
        examples: string[]
      }
    }
    positiveReinforcement: {
      title: string
      description: string
      benefits: PsychologyBenefit[]
      pbisEvidence: { stat: string; source: string; impact: string }
      disparityData: { issue: string; source: string; expanseRole: string }
    }
    socialDevelopment: {
      title: string
      insights: SocialDevelopmentInsight[]
      socialValidation: string
    }
    selfEfficacy: {
      title: string
      definition: string
      keyPrinciples: string[]
      instructionalPractices: string[]
      source: string
    }
    learningAndAttention: {
      principle: string
      detail: string
      application: string
    }
    brainDevelopment: {
      insight: string
      detail: string
      implication: string
      source: string
    }
  }
  mentalHealth: {
    overview: { summary: string; keyMessage: string }
    statistics: MentalHealthStat[]
    keyFindings: MentalHealthFinding[]
    positiveInterventions: {
      art: { finding: string; mechanism: string; source: string }
      pbis: { finding: string; mechanism: string; source: string }
      positiveReinforcement: {
        finding: string
        mechanism: string
        impact: string
      }
    }
    researchEvidence: {
      ghanaStudy: {
        finding: string
        result: string
        factors: string
        source: string
      }
      classroomEnvironment: { finding: string; source: string }
    }
  }
  rewards: {
    overview: { summary: string; philosophy: string }
    lootBoxes: { description: string; rarityLevels: string[] }
    rewardClassifications: RewardClassification[]
    rewardMediums: RewardMedium[]
    realLifeRewards: Record<string, string[]>
    inGameRewards: Record<string, string[]>
    visualStimulation: { description: string; examples: string[] }
    customRewards: Record<string, string[]>
    integrationRewards: Record<string, string[]>
    seasonalRewards: { description: string }
    schoolImprovements: {
      description: string
      examples: string[]
      mechanism: string
    }
    rewardDataModel: RewardDataModel
  }
  legal: {
    overview: { summary: string; keyMessage: string }
    compliance: ComplianceRequirement[]
    privacySecurity: PrivacySecurity
    legalRisks: LegalRisk[]
    dpaRequirements: { description: string; status: string; actions: string[] }
  }
  businessOperations: {
    overview: { summary: string; marketContext: string }
    revenue: {
      primary: string
      strategy: string
      streams: RevenueStream[]
      customerLifetimeValue: string
      userAcquisitionTimelines: { k12: string; higherEd: string }
    }
    fundingRounds: {
      philosophy: string
      rounds: FundingRound[]
      askingRange: {
        minimum: string
        ideal: string
        stretch: string
        note: string
      }
    }
    costStructure: {
      estimates: Record<string, string | { us: string; overseas: string }>
      twoYearTotals: Record<
        string,
        { low?: string; upper?: string; description: string }
      >
      spreadsheet: string
    }
    teamNeeds: TeamNeed[]
    exits: {
      philosophy: string
      preferred: string
      options: ExitOption[]
    }
    acquisitions: {
      philosophy: string
      potentialTargets: {
        category: string
        targets: {
          type?: string
          name?: string
          example?: string
          description?: string
          note: string
        }[]
      }[]
    }
    engagement: {
      stakeholderDemand: string
      currentState: {
        engagementLevels: string
        trend: string
        elementaryVsHighSchool: string
      }
      decliningFactors: string[]
      attentionSpan: { trend: string; comparison: string; source: string }
      reducedAttentionCauses: AttentionSpanCause[]
      autonomyEffect: string
      keyStats: EngagementStat[]
    }
    gamification: {
      overview: string
      elements: string[]
      gamingTrends: { weeklyGamingTime: string; source: string; trend: string }
      platformResearch: string[]
      genreTypes: string[]
      microsoftExample: string
    }
  }
  goToMarket: {
    overview: { summary: string; philosophy: string }
    strategy: {
      dualLensApproach: {
        description: string
        emotionalAppeals: EmotionalAppeal[]
        keyMessages: string[]
      }
      localLaunch: { name: string; description: string; tactics: string[] }
      organicPromotion: { description: string; mechanisms: string[] }
    }
    channels: MarketingChannelGTM[]
    pricing: { strategy: string; initialApproach: string }
    audience: {
      targetGrades: string
      demographics: string[]
      advertisingApproach: string
    }
    productPrivacy: { strategy: string; launchPhase: string }
    marketingTopics: {
      primary: string[]
      psychology: string[]
      classroom: string[]
    }
    branding: { primaryThemes: string[]; gameThemes: string[] }
  }
  caseStudies: {
    overview: {
      summary: string
      context: string
      keyQuote: string
      privacyNote?: string
    }
    highlightGroups: CaseStudyHighlightGroup[]
    /** Flattened view of `highlightGroups`, kept for counts and search. */
    highlights: string[]
    concerns: CaseStudyConcern[]
    narratives: CaseStudyNarrative[]
    personas: CaseStudyPersona[]
    teacherObservations: TeacherObservation[]
    lessonsLearned: string[]
    observationStyle: { approach: string; notes: string[] }
    events: CaseStudyEvent[]
    classroomManagement: ClassroomManagementTip[]
    engagementInsights: EngagementInsight[]
    improvementRecommendations: ImprovementRecommendation[]
    specialEdInsights: SpecialEdInsight[]
    brainDevelopmentVariables: BrainDevelopmentVariable[]
    stateOfEducation: StateOfEducation
  }
  gameMechanics: {
    overview: {
      title: string
      description: string
      corePhilosophy: string
      keyPillars: GamePillar[]
    }
    currencies: {
      title: string
      description: string
      types: CurrencyType[]
    }
    progression: {
      title: string
      description: string
      progressionTypes: ProgressionType[]
      userTypes: string[]
      groupProgression: string
      designNotes: string[]
      risks: string[]
    }
    quests: {
      title: string
      description: string
      purposes: string[]
      questTypes: QuestType[]
      exampleQuests: Record<string, string[]>
      value: string
      implementationDifficulty: string
    }
    achievements: {
      title: string
      description: string
      examples: string[]
      value: string
    }
    battles: {
      title: string
      philosophy: string
      vision: string
      battleTypes: BattleType[]
      combatMechanics: {
        dps: string
        aiCombat: string
        factors: string[]
        powerUps: string
        replays: string
      }
      timing: string[]
      tournaments: { description: string; format: string }
      rankings: { system: string; reference: string; features: string[] }
      mentalHealthConsiderations: string[]
      risks: string[]
    }
    personalization: {
      title: string
      description: string
      categories: PersonalizationCategory[]
      raritySystem: { description: string; tiers: string[] }
      collectibles: { description: string; example: string }
    }
    profiles: {
      title: string
      description: string
      userProfiles: {
        description: string
        implementationDifficulty: string
        value: string
        profit: string
        defaultAspects: string[]
        gameAspects: string[]
        customization: string[]
        ideas: string[]
        userTypes: string[]
      }
      schoolProfiles: {
        description: string
        features: string[]
      }
    }
    stores: {
      title: string
      description: string
      storeTypes: StoreType[]
      ideas: string[]
    }
    rewards: {
      title: string
      description: string
      lootBoxes: string
      rewardMediums: string[]
      distributionTypes: string[]
      rewardCategories: Record<string, string[]>
      visualStimulation: string[]
    }
    rankings: {
      title: string
      description: string
      comparisonVariables: string[]
      userTypes: string[]
      displayTypes: string[]
      leaderboards: { description: string; features: string[] }
      concerns: string
    }
    recognition: {
      title: string
      description: string
      recognitionTypes: RecognitionType[]
      certificates: string[]
      futureIdeas: string[]
    }
    goals: {
      title: string
      description: string
      goalTypes: string[]
      visualization: string[]
      examples: string[]
      notes: string
    }
    social: {
      title: string
      description: string
      features: SocialFeature[]
      socialSharing: string
    }
    userJourneys: {
      title: string
      coreFlow: {
        title: string
        highLevel: string[]
        details: string[]
      }
      parentOnboarding: string[]
      otherJourneys: string[]
    }
    expansions: {
      title: string
      description: string
      seasons: { description: string; purpose: string }
      seasonalRewards: string
    }
    lmsIntegration: {
      title: string
      description: string
      process: string[]
    }
    configuration: {
      title: string
      description: string
      levels: string[]
    }
    negativeReinforcement: {
      title: string
      description: string
      philosophy: string
      consequenceTypes: {
        type: string
        description: string
        severity: string
      }[]
      implementation: string[]
      risks: string[]
    }
    historyReflection: {
      title: string
      description: string
      features: string[]
      visualizations: {
        type: string
        description: string
      }[]
      reflectionTypes: string[]
      value: string
      privacyNote: string
    }
    games: {
      title: string
      description: string
      status: string
      gameTypes: {
        type: string
        description: string
        status: string
      }[]
      futureVision: string[]
      value: string
    }
  }
  monetization: {
    overview: {
      title: string
      description: string
      principles: string[]
      revenueStreams: { stream: string; description: string }[]
    }
    subscriptions: {
      title: string
      description: string
      phases: {
        phase: string
        features: string[]
      }[]
      futurePlans: {
        teachers: string[]
        schools: string[]
        general: string[]
      }
    }
    payments: {
      title: string
      description: string
      paymentMethods: string[]
      features: string[]
      compliance: string[]
    }
    realMoneyPurchases: {
      title: string
      description: string
      purchasableItems: { category: string; examples: string[] }[]
      philosophy: string
    }
    scholarships: {
      title: string
      description: string
      value: Record<string, string>
      implementation: { difficulty: string; scale: string }
      scholarshipTypes: string[]
      essenceSystem: {
        description: string
        features: string[]
      }
      distribution: string[]
      marketingValue: string
    }
    sponsorships: {
      title: string
      description: string
      globalSponsors: {
        description: string
        examples: string[]
        implementation: string
        value: string
        profit: string
      }
      localSponsors: {
        description: string
        examples: string[]
        implementation: string
        challenges: string[]
      }
      rewardDistribution: string[]
    }
  }
  communication: {
    overview: {
      title: string
      description: string
      channels: { channel: string; audience: string }[]
    }
    notifications: {
      title: string
      description: string
      notificationTypes: {
        students: string[]
        parents: string[]
        teachers: string[]
      }
      inboxFeatures: string[]
      deliveryOptions: string[]
      notes: string
    }
    parentCommunication: {
      title: string
      description: string
      features: string[]
      parentFeatures: string[]
      messageTypes: { type: string; examples: string[] }[]
      risks: string[]
      mitigations: string[]
      concerns: string[]
    }
    authentication: {
      title: string
      description: string
      studentTeacherAuth: {
        method: string
        description: string
        supportedSystems: string[]
      }
      parentAuth: {
        method: string
        description: string
        features: string[]
      }
      security: string[]
    }
    userAccounts: {
      title: string
      description: string
      accountFeatures: string[]
      privacyControls: string[]
      userTypes: { type: string; features: string[] }[]
    }
  }
  researchExtensions: {
    collegeReadiness: {
      title: string
      overview: { summary: string; source: string }
      keyConcerns: CollegeConcern[]
      dropoutFactors: DropoutFactor[]
      pandemicImpact: {
        persistentChallenges: string
        learningBehaviors: string
        socialEngagement: string
        mentalHealthConcerns: string
        variedImpacts: string
      }
      expanseRelevance: string
    }
    parentEngagement: {
      title: string
      overview: { summary: string; source: string }
      keyInsights: { insight: string; quote: string; source: string }[]
      expanseOpportunity: string
    }
    socialMediaResearch: {
      title: string
      overview: { summary: string }
      keyFindings: SocialFinding[]
      expanseApproach: string
    }
    socialDynamics: {
      title: string
      overview: { summary: string }
      keyFindings: SocialFinding[]
      expanseRelevance: string
    }
    purposeAndMotivation: {
      title: string
      overview: { summary: string; source: string }
      keyFindings: {
        finding: string
        stat?: string
        source?: string
        cause?: string
        insight?: string
        implication?: string
      }[]
      expanseApproach: string
    }
    employeeSatisfaction: {
      title: string
      overview: { summary: string; relevance: string }
      happinessAndGoals: {
        description: string
        benefits: string[]
        expanseApplication: string
      }
      impactOnWork: {
        keyStatistic: string
        summary: string
        benefits: string[]
      }
      gallupResearch: {
        title: string
        description: string
        keyFindings: string[]
        engagementDifferences: Record<string, string>
        source: string
      }
      hbrResearch: { title: string; keyFindings: string[] }
      oxfordStudy: { finding: string; methodology: string; source: string }
      environmentImpact: { insight: string; consideration: string }
    }
    surveyStrategies: {
      title: string
      overview: { summary: string }
      surveyTypes: SurveyType[]
      sampleQuestions: string[]
      suggestionBoxes: { purpose: string }
      incentives: { approach: string; rationale: string }
    }
    engagementResearch: {
      title: string
      overview: { summary: string; solution: string }
      decliningFactors: { primary: string[]; additional: string[] }
      keyStatistics: EngagementStatistic[]
      attentionSpan: {
        trend: string
        comparison: string
        source: string
        causes: AttentionCause[]
        academicConsequences: string
      }
      autonomyEffect: string
      mentalHealthConnection: {
        finding: string
        source: string
        johnsHopkins: string
      }
    }
    gamingResearch: {
      title: string
      overview: { summary: string }
      trends: {
        trend: string
        detail?: string
        insight?: string
        source?: string
      }[]
      platforms: string[]
      gameTypes: string[]
      gamificationElements: string[]
      microsoftExample: {
        description: string
        strategy: string
        insight: string
      }
      researchQuestions: string[]
    }
    furtherReading: {
      title: string
      academicStudies: {
        title: string
        authors?: string
        publication?: string
        keyFindings: string
        link?: string
      }[]
      topics: string[]
      books: string[]
      influencers: string[]
    }
  }
  designNotes: {
    selfDeterminationTheory: {
      title: string
      overview: { summary: string; source: string }
      coreNeeds: SDTCoreNeed[]
      cognitiveEvaluationTheory: {
        title: string
        description: string
        keyInsight: string
        expanseDesign: string
      }
      competenceResearch: {
        finding: string
        mechanism: string
        negativeEffect: string
        implication: string
      }
      additionalBenefits: { description: string; feedbackEffect: string }
    }
    designDecisions: {
      title: string
      overview: { summary: string }
      customerSatisfaction: {
        concept: string
        description: string
        application: string
      }
      trust: { principle: string; application: string }
      purpose: { ideas: string[] }
      avoidControl: { principle: string; evidence: string; solution: string }
      teamwork: { reference: string; argument: string; application: string }
      companyWideRewards: { concept: string; application: string }
      rewardOptions: {
        examples: string[]
        personalization: string
        collaboration: string
      }
      importantConsiderations: string[]
      customization: { features: string[] }
      uiDesignInspiration: { idea: string; rationale: string }
      rewardVariance: { principle: string; rationale: string }
    }
    motivationTheory: {
      title: string
      intrinsicMotivation: {
        description: string
        benefits: string[]
        threeElements: { autonomy: string; purpose: string; mastery: string }
        promotedBy: string
        quote: { text: string; author: string }
        source: string
      }
      extrinsicMotivation: {
        description: string
        nuance: string
        quote: { text: string; author: string }
      }
      competenceBasedRewards: {
        description: string
        research: string
        researcher: string
        connection: string
      }
      moneyAndAmbition: {
        quote: { text: string; author: string }
        insight: string
      }
      goalsAndSetting: { insight: string; alternatives: string; source: string }
    }
    rewardSystemResearch: {
      title: string
      overview: { summary: string }
      keyResources: RewardResource[]
      organizations: string[]
      scientificArticles: { title: string; link: string; summary: string }[]
      carsResearch: { title: string; description: string; findings: string[] }
      winWinPhilosophy: {
        principle: string
        clarification: string
        quote: { text: string; author: string }
      }
      frequentRewards: { topic: string; insight: string }
      approachMotivation: { definition: string; mechanism: string }
      moodAndRewards: { insights: string[]; todo: string }
    }
    aiUsage: {
      title: string
      overview: { summary: string }
      developmentUseCases: AIUseCase[]
      productUseCases: AIUseCase[]
      potentialFutureUses: string[]
    }
    inspirationalQuotes: {
      title: string
      quotes: InspirationalQuote[]
    }
    rewardSystemExamples: {
      title: string
      description: string
      companies: string[]
      gamesStudy: { description: string; insight: string }
      unlearningConcept: { title: string; source: string; relevance: string }
    }
    topicsForFurtherResearch: {
      title: string
      keywords: string[]
      researchQuestions: string[]
      customization: {
        insight: string
        humanNeed: string
        designQuestion: string
        solution: string
      }
    }
  }
  learningScience: {
    attentionScience: {
      title: string
      overview: { summary: string; keyInsight: string }
      resourcePoolModel: {
        title: string
        description: string
        depleting: { title: string; factors: AttentionFactor[] }
        replenishing: { title: string; factors: AttentionFactor[] }
      }
      moodConnection: {
        title: string
        description: string
        principles: AttentionPrinciple[]
      }
      learningConnection: {
        title: string
        keyFinding: string
        source: string
        implications: string[]
        expanseApplication: string
      }
      practicalTakeaways: {
        title: string
        description: string
        techniques: AttentionTechnique[]
      }
    }
    feedbackSystems: {
      title: string
      overview: { summary: string; keyInsight: string }
      roleInLearning: {
        title: string
        description: string
        types: FeedbackType[]
      }
      errorOpportunity: {
        title: string
        description: string
        principles: string[]
      }
      expanseApproach: {
        title: string
        principles: string[]
      }
    }
    positiveReinforcement: {
      title: string
      overview: { summary: string }
      benefits: ReinforcementBenefit[]
      vsNegativeReinforcement: {
        title: string
        positive: ReinforcementComparison
        negative: ReinforcementComparison
      }
      expanseImplementation: {
        title: string
        methods: string[]
      }
    }
    learningAgility: {
      title: string
      overview: { summary: string; keyQuestion: string }
      offTheShelfProblem: {
        title: string
        description: string
        foodAnalogy: { example: string; lesson: string }
        softwareAnalogy: { example: string; lesson: string }
      }
      understandingCore: {
        title: string
        description: string
        chickenExample: {
          ingredients: string[]
          questions: string[]
          outcome: string
        }
      }
      benefitsOfMastery: {
        title: string
        benefits: AgilityBenefit[]
      }
      keyQuestion: { question: string; implication: string }
    }
    progressTracking: {
      title: string
      overview: { summary: string }
      progressPrinciples: ProgressPrinciple[]
      expanseProgressFeatures: string[]
    }
    rewardPsychology: {
      title: string
      overview: { summary: string }
      brainAndRewards: {
        title: string
        description: string
        insight: string
      }
      habitFormation: {
        title: string
        description: string
        technique: {
          step1: string
          step2: string
          step3: string
          step4: string
          result: string
        }
      }
      practicalExamples: HabitExample[]
      expanseApproach: {
        title: string
        methods: string[]
      }
      relatedContent: { videoReference: string }
    }
    purposeAndMission: {
      title: string
      overview: { summary: string }
      jobVsMission: {
        title: string
        comparison: { job: MissionComparison; mission: MissionComparison }
        implication: string
      }
      expansePurpose: {
        title: string
        approach: string[]
      }
    }
  }
  ideation: IdeationData
  branding: BrandingData
}

// Legal types
export interface ComplianceRequirement {
  id: string
  name: string
  fullName: string
  description: string
  status: string
  requirements: string[]
  source: string | null
}

export interface LegalRisk {
  id: string
  title: string
  question: string
  response: string
  impact: string
  mitigations: string[]
}

export interface PrivacySecurity {
  encryption: {
    atRest: string
    inTransit: string
  }
  hosting: {
    provider: string
    features: string[]
  }
  dataProtection: {
    nameObscuring: string
    dataDeletion: string
    dpaRequired: string
  }
  reference: string
}

// Business Operations types
export interface RevenueStream {
  id: string
  name: string
  description: string
  priority: string
  status: string
}

export interface FundingRound {
  id: string
  name: string
  range?: string
  goal: string
  description?: string
  milestones?: string[]
  team?: string | string[]
}

export interface ExitOption {
  id: string
  name: string
  description: string
  likelihood: string
  note?: string
}

export interface TeamNeed {
  role: string
  responsibilities: string[]
  status?: string
  timing?: string
  note?: string
}

export interface EngagementStat {
  stat: string
  source: string
}

export interface AttentionSpanCause {
  cause: string
  detail: string
}

// Go-to-Market types
export interface MarketingChannelGTM {
  id: string
  name: string
  description?: string
  platforms?: string[]
  activities?: string[]
  examples?: string[]
  priority: string
}

export interface EmotionalAppeal {
  type: string
  targets: string[]
  purpose: string
}

// Case Study types
export interface CaseStudyConcern {
  issue: string
  description: string
}

/** The systemic thesis behind the case study - not one school's problem. */
export interface StateOfEducation {
  headline: string
  subtitle: string
  statements: string[]
  closingStatement: string
}

/** A themed cluster of raw field notes from the KCPS observation log. */
export interface CaseStudyHighlightGroup {
  id: string
  label: string
  /** One-line framing of what this cluster of notes has in common. */
  summary: string
  items: string[]
}

export interface CaseStudyNarrative {
  id: string
  title: string
  /** Working title used in the source research notes. */
  alsoKnownAs?: string
  /** `concept` has no prose drafted; `draft` is written but flagged by the author. */
  status?: "written" | "draft" | "concept"
  /** Why the status is what it is - shown so readers can weight the story. */
  statusNote?: string
  /** Path under Expanse-Edu-Docs the prose was restored from. */
  sourceDoc?: string
  summary: string
  themes: string[]
  /** The story itself, one entry per paragraph. */
  narrative?: string[]
  keyMoment?: string
  keyIssues?: string[]
  symbolism?: string[]
  /** Deliberate authorial devices - why the story is built the way it is. */
  craftNotes?: string[]
  /** What the author judged to matter most for engagement, ranked. */
  weightFactors?: string[]
  /** A second true scene recorded alongside the main narrative. */
  alternateScene?: {
    title: string
    note?: string
    narrative: string[]
  }
  /** When it happened and what the author is unsure of. */
  provenance?: {
    date?: string
    note?: string
  }
  callToAction?: string
}

export interface CaseStudyPersona {
  id: string
  name: string
  background?: string
  behaviors?: string[]
  whatWorked?: string
  attributes?: string[]
  problem?: string
  situation?: string
  observation?: string
  lesson?: string
  insight?: string
  before?: string
  intervention?: string
  after?: string
}

export interface TeacherObservation {
  issue: string
  description: string
}

// Case Study Event types
export interface EventTimelineItem {
  time?: string
  phase: string
  description: string
  observations?: string[]
}

export interface StudentObservation {
  name: string
  behaviors: string[]
  insights: string[]
  whatWorked?: string
}

export interface CaseStudyEvent {
  id: string
  date: string
  location: string
  schoolType: "elementary" | "middle" | "high" | "special-ed" | "montessori"
  title: string
  summary: string
  timeline?: EventTimelineItem[]
  keyLearnings: string[]
  questionsRaised?: string[]
  studentsObserved?: StudentObservation[]
}

export interface ClassroomManagementTip {
  id: string
  strategy: string
  schoolLevel: ("elementary" | "middle" | "high")[]
  description: string
  effectiveness?: "high" | "medium" | "low"
}

export interface EngagementInsight {
  id: string
  category: "barriers" | "enablers" | "interests" | "resets"
  insight: string
  evidence?: string
}

export interface BrainDevelopmentVariable {
  id: string
  name: string
  description?: string
  observations?: string[]
}

export interface ImprovementRecommendation {
  id: string
  title: string
  description: string
  budgetTier: "$" | "$$" | "$$$" | "$$$$" | "unknown"
  priority: "high" | "medium" | "low"
  category: "security" | "rewards" | "it" | "leadership" | "environment" | "training"
}

export interface SpecialEdInsight {
  id: string
  observation: string
  student?: string
  implication: string
}

// Navigation types
export interface DocsNavItem {
  id: string
  label: string
  icon?: string
  children?: DocsNavItem[]
}

// Ideation types
export type IdeationStatus = "concept" | "exploration" | "planned" | "in-development" | "paused"
export type IdeationComplexity = "low" | "medium" | "high" | "very-high"
export type IdeationPriority = "low" | "medium" | "high"

export interface IdeationImplementationOption {
  option: string
  description: string
  difficulty: string
}

export interface IdeationCategory {
  id: string
  name: string
  description: string
}

export interface IdeationFeature {
  id: string
  name: string
  category: string
  priority: IdeationPriority
  status: IdeationStatus
  complexity: IdeationComplexity
  description: string
  valueProposition?: string
  keyPoints?: string[]
  implementation?: string[]
  implementationOptions?: IdeationImplementationOption[]
  features?: string[]
  integrations?: string[]
  risks?: string[]
  concerns?: string[]
  donationTypes?: string[]
  goals?: string[]
  requirements?: string[]
  businessModel?: string[]
  notes?: string
  insight?: string
  examples?: string[]
}

export interface IdeationPriorityMatrix {
  nearTerm: string[]
  mediumTerm: string[]
  longTerm: string[]
  experimental: string[]
}

export interface IdeationOverview {
  title: string
  description: string
  categories: IdeationCategory[]
}

export interface IdeationData {
  overview: IdeationOverview
  features: IdeationFeature[]
  priorityMatrix: IdeationPriorityMatrix
}

// Sales Insights types
export interface SalesInsightTarget {
  id: string
  name: string
  description: string
  application: string
}

export interface SalesInsightTopic {
  topic: string
  relevance: string
  application: string
}

export interface CulturalConsideration {
  insight: string
  description: string
  application: string
}

export interface SalesInsights {
  highValueTargets: SalesInsightTarget[]
  highValueTopics: SalesInsightTopic[]
  culturalConsiderations: CulturalConsideration[]
}

// Growth Strategy types
export interface TeamBuildingGoal {
  goal: string
  strategy: string
  priority: string
  approach: string
}

export interface GrowthOpportunity {
  id?: string
  partner?: string
  description?: string
  opportunity?: string
  status: string
  potential?: string
  timeline?: string
  notes?: string
}

export interface StudentPipeline {
  concept: string
  value: string
  destinations: string[]
  benefit: string
}

export interface GrowthStrategy {
  teamBuilding: TeamBuildingGoal
  governmentOpportunities: GrowthOpportunity[]
  partnershipOpportunities: GrowthOpportunity[]
  productExpansion: GrowthOpportunity[]
  studentPipeline: StudentPipeline
}

// Research Tasks types
export interface ResearchTask {
  id: string
  question: string
  why?: string
  status: string
  priority: string
}

export interface InvestmentNote {
  potential: string
  clarificationNeeded: string
  targetProblem: string
  status: string
}

// Content Philosophy types
export interface ContentPhilosophyBelief {
  id: string
  title: string
  insight: string
  application: string
  learning?: string
}

export interface ContentPhilosophy {
  title: string
  coreBeliefs: ContentPhilosophyBelief[]
}

// Health and Focus types
export interface HealthInsight {
  id: string
  title: string
  insight: string
  recommendations?: string[]
  application: string
}

export interface HealthAndFocus {
  title: string
  insights: HealthInsight[]
}

// Branding types
export interface LogoPlanned {
  description: string
  goals: string[]
  status: string
}

export interface LogoEvolution {
  current: string
  planned: LogoPlanned
}

export interface PresentationFormat {
  title: string
  format: string
  features: string[]
  purpose: string
}

export interface PresentationStyle {
  nextGeneration: PresentationFormat
}

export interface CharacterExample {
  brand: string
  character: string
  lesson: string
}

export interface CharacterStrategy {
  overview: string
  examples: CharacterExample[]
  applicationToExpanse: string[]
}

export interface BrandingData {
  logoEvolution: LogoEvolution
  presentationStyle: PresentationStyle
  characterStrategy: CharacterStrategy
}

// Future Considerations types
export interface FutureConsideration {
  note: string
  status?: string
  priority?: string
  context?: string
  goal?: string
}

export interface FutureConsiderations {
  encryption: FutureConsideration
  instantDemands: FutureConsideration
}
