/**
 * Expanse EDU Documentation Data
 * Centralized export for all documentation content
 */
import type {
  ExpanseEduDocs,
  TargetAudience,
  UserPersona,
  MarketingChannel,
  Feature,
  FeatureCategory,
  Architecture,
  Integration,
  ObservabilityItem,
  ResearchTopic,
  ResearchStatistic,
  ResearchSource,
  Competitor,
  CompetitorWeakness,
  Risk,
  RiskCategory,
  FundingOpportunity,
  IdealAdvisor,
  CustomerType,
  TargetSegments,
  DopamineInsight,
  PsychologyBenefit,
  SocialDevelopmentInsight,
  MentalHealthStat,
  MentalHealthFinding,
  RewardClassification,
  RewardMedium,
  ComplianceRequirement,
  LegalRisk,
  PrivacySecurity,
  RevenueStream,
  FundingRound,
  ExitOption,
  TeamNeed,
  EngagementStat,
  AttentionSpanCause,
  MarketingChannelGTM,
  EmotionalAppeal,
  CaseStudyConcern,
  CaseStudyHighlightGroup,
  CaseStudyNarrative,
  CaseStudyPersona,
  TeacherObservation,
  CaseStudyEvent,
  ClassroomManagementTip,
  EngagementInsight,
  ImprovementRecommendation,
  SpecialEdInsight,
  BrainDevelopmentVariable,
  StateOfEducation,
  GamePillar,
  CurrencyType,
  ProgressionType,
  QuestType,
  BattleType,
  PersonalizationCategory,
  StoreType,
  SocialFeature,
  RecognitionType,
  CollegeConcern,
  DropoutFactor,
  SocialFinding,
  EngagementStatistic,
  AttentionCause,
  SurveyType,
  SDTCoreNeed,
  InspirationalQuote,
  AIUseCase,
  RewardResource,
  AttentionFactor,
  AttentionPrinciple,
  AttentionTechnique,
  FeedbackType,
  ReinforcementBenefit,
  ReinforcementComparison,
  AgilityBenefit,
  ProgressPrinciple,
  HabitExample,
  MissionComparison,
  IdeationFeature,
  IdeationPriorityMatrix,
  IdeationData,
  BrandingData,
} from "../../types/docs"
import businessData from "./business.json"
import marketingData from "./marketing.json"
import channelsData from "./channels.json"
import productData from "./product.json"
import technologyData from "./technology.json"
import researchData from "./research.json"
import competitionData from "./competition.json"
import risksData from "./risks.json"
import fundingData from "./funding.json"
import usersData from "./users.json"
import psychologyData from "./psychology.json"
import mentalHealthData from "./mental-health.json"
import rewardsData from "./rewards.json"
import legalData from "./legal.json"
import businessOperationsData from "./business-operations.json"
import goToMarketData from "./go-to-market.json"
import caseStudiesData from "./case-studies.json"
import gameMechanicsData from "./game-mechanics.json"
import researchExtensionsData from "./research-extensions.json"
import designNotesData from "./design-notes.json"
import learningScienceData from "./learning-science.json"
import ideationData from "./ideation.json"
import monetizationData from "./monetization.json"
import communicationData from "./communication.json"
import brandingData from "./branding.json"

export const expanseEduDocs: ExpanseEduDocs = {
  meta: {
    lastUpdated: "2026-01-24",
    version: "0.10.0",
  },
  business: businessData,
  marketing: {
    targetAudiences: marketingData.targetAudiences as TargetAudience[],
    personas: marketingData.personas as unknown as UserPersona[],
    interests: marketingData.interests,
    targetOrder: marketingData.targetOrder,
  },
  channels: {
    channels: channelsData.channels as MarketingChannel[],
    focusAreas: channelsData.focusAreas,
    bigWins: channelsData.bigWins,
  },
  product: {
    features: productData.features as Feature[],
    categories: productData.categories as FeatureCategory[],
  },
  technology: {
    stack: technologyData.stack,
    architecture: technologyData.architecture as Architecture,
    observability: technologyData.observability as ObservabilityItem[],
    integrations: technologyData.integrations as Integration[],
    security: technologyData.security,
    status: technologyData.status,
  },
  research: {
    topics: researchData.topics as ResearchTopic[],
    statistics: researchData.statistics as ResearchStatistic[],
    sources: researchData.sources as ResearchSource[],
  },
  competition: {
    overview: competitionData.overview,
    competitors: competitionData.competitors as Competitor[],
    differentiators: competitionData.differentiators,
    competitorWeaknesses:
      competitionData.competitorWeaknesses as CompetitorWeakness[],
    teacherFeedback: competitionData.teacherFeedback,
  },
  risks: {
    risks: risksData.risks as Risk[],
    riskCategories: risksData.riskCategories as RiskCategory[],
  },
  funding: {
    fundingToDate: fundingData.fundingToDate,
    fundingPaths: fundingData.fundingPaths,
    investmentReasons: fundingData.investmentReasons,
    fundingOpportunities:
      fundingData.fundingOpportunities as FundingOpportunity[],
    advisorGoals: fundingData.advisorGoals,
    advisorAttributes: fundingData.advisorAttributes,
    idealAdvisors: fundingData.idealAdvisors as IdealAdvisor[],
    kpiGoals2026: fundingData.kpiGoals2026,
  },
  users: {
    overview: usersData.overview,
    customers: usersData.customers as CustomerType[],
    userPersonaAttributes: usersData.userPersonaAttributes,
    targetSegments: usersData.targetSegments as TargetSegments,
    parentInsights: usersData.parentInsights,
  },
  psychology: {
    overview: psychologyData.overview,
    dopamine: {
      ...psychologyData.dopamine,
      keyInsights: psychologyData.dopamine.keyInsights as DopamineInsight[],
    },
    positiveReinforcement: {
      ...psychologyData.positiveReinforcement,
      benefits: psychologyData.positiveReinforcement
        .benefits as PsychologyBenefit[],
    },
    socialDevelopment: {
      ...psychologyData.socialDevelopment,
      insights: psychologyData.socialDevelopment
        .insights as SocialDevelopmentInsight[],
    },
    selfEfficacy: psychologyData.selfEfficacy,
    learningAndAttention: psychologyData.learningAndAttention,
    brainDevelopment: psychologyData.brainDevelopment,
  },
  mentalHealth: {
    overview: mentalHealthData.overview,
    statistics: mentalHealthData.statistics as MentalHealthStat[],
    keyFindings: mentalHealthData.keyFindings as MentalHealthFinding[],
    positiveInterventions: mentalHealthData.positiveInterventions,
    researchEvidence: mentalHealthData.researchEvidence,
  },
  rewards: {
    overview: rewardsData.overview,
    lootBoxes: rewardsData.lootBoxes,
    rewardClassifications:
      rewardsData.rewardClassifications as RewardClassification[],
    rewardMediums: rewardsData.rewardMediums as RewardMedium[],
    realLifeRewards: rewardsData.realLifeRewards,
    inGameRewards: rewardsData.inGameRewards,
    visualStimulation: rewardsData.visualStimulation,
    customRewards: rewardsData.customRewards,
    integrationRewards: rewardsData.integrationRewards,
    seasonalRewards: rewardsData.seasonalRewards,
    schoolImprovements: rewardsData.schoolImprovements,
    rewardDataModel: rewardsData.rewardDataModel,
  },
  legal: {
    overview: legalData.overview,
    compliance: legalData.compliance as ComplianceRequirement[],
    privacySecurity: legalData.privacySecurity as PrivacySecurity,
    legalRisks: legalData.legalRisks as LegalRisk[],
    dpaRequirements: legalData.dpaRequirements,
  },
  businessOperations: {
    overview: businessOperationsData.overview,
    revenue: {
      ...businessOperationsData.revenue,
      streams: businessOperationsData.revenue.streams as RevenueStream[],
    },
    fundingRounds: {
      ...businessOperationsData.fundingRounds,
      rounds: businessOperationsData.fundingRounds.rounds as FundingRound[],
    },
    costStructure: businessOperationsData.costStructure,
    teamNeeds: businessOperationsData.teamNeeds as TeamNeed[],
    exits: {
      ...businessOperationsData.exits,
      options: businessOperationsData.exits.options as ExitOption[],
    },
    acquisitions: businessOperationsData.acquisitions,
    engagement: {
      ...businessOperationsData.engagement,
      keyStats: businessOperationsData.engagement.keyStats as EngagementStat[],
      reducedAttentionCauses: businessOperationsData.engagement
        .reducedAttentionCauses as AttentionSpanCause[],
    },
    gamification: businessOperationsData.gamification,
  },
  goToMarket: {
    overview: goToMarketData.overview,
    strategy: {
      ...goToMarketData.strategy,
      dualLensApproach: {
        ...goToMarketData.strategy.dualLensApproach,
        emotionalAppeals: goToMarketData.strategy.dualLensApproach
          .emotionalAppeals as EmotionalAppeal[],
      },
    },
    channels: goToMarketData.channels as MarketingChannelGTM[],
    pricing: goToMarketData.pricing,
    audience: goToMarketData.audience,
    productPrivacy: goToMarketData.productPrivacy,
    marketingTopics: goToMarketData.marketingTopics,
    branding: goToMarketData.branding,
  },
  caseStudies: {
    overview: caseStudiesData.overview,
    highlightGroups:
      caseStudiesData.highlightGroups as CaseStudyHighlightGroup[],
    highlights: caseStudiesData.highlightGroups.flatMap((g) => g.items),
    concerns: caseStudiesData.concerns as CaseStudyConcern[],
    narratives: caseStudiesData.narratives as CaseStudyNarrative[],
    personas: caseStudiesData.personas as CaseStudyPersona[],
    teacherObservations:
      caseStudiesData.teacherObservations as TeacherObservation[],
    lessonsLearned: caseStudiesData.lessonsLearned,
    observationStyle: caseStudiesData.observationStyle,
    events: caseStudiesData.events as CaseStudyEvent[],
    classroomManagement:
      caseStudiesData.classroomManagement as ClassroomManagementTip[],
    engagementInsights:
      caseStudiesData.engagementInsights as EngagementInsight[],
    improvementRecommendations:
      caseStudiesData.improvementRecommendations as ImprovementRecommendation[],
    specialEdInsights: caseStudiesData.specialEdInsights as SpecialEdInsight[],
    brainDevelopmentVariables:
      caseStudiesData.brainDevelopmentVariables as BrainDevelopmentVariable[],
    stateOfEducation: caseStudiesData.stateOfEducation as StateOfEducation,
  },
  gameMechanics: {
    overview: {
      ...gameMechanicsData.overview,
      keyPillars: gameMechanicsData.overview.keyPillars as GamePillar[],
    },
    currencies: {
      ...gameMechanicsData.currencies,
      types: gameMechanicsData.currencies.types as CurrencyType[],
    },
    progression: {
      ...gameMechanicsData.progression,
      progressionTypes: gameMechanicsData.progression
        .progressionTypes as ProgressionType[],
    },
    quests: {
      ...gameMechanicsData.quests,
      questTypes: gameMechanicsData.quests.questTypes as QuestType[],
    },
    achievements: gameMechanicsData.achievements,
    battles: {
      ...gameMechanicsData.battles,
      battleTypes: gameMechanicsData.battles.battleTypes as BattleType[],
    },
    personalization: {
      ...gameMechanicsData.personalization,
      categories: gameMechanicsData.personalization
        .categories as PersonalizationCategory[],
    },
    profiles: gameMechanicsData.profiles,
    stores: {
      ...gameMechanicsData.stores,
      storeTypes: gameMechanicsData.stores.storeTypes as StoreType[],
    },
    rewards: gameMechanicsData.rewards,
    rankings: gameMechanicsData.rankings,
    recognition: {
      ...gameMechanicsData.recognition,
      recognitionTypes: gameMechanicsData.recognition
        .recognitionTypes as RecognitionType[],
    },
    goals: gameMechanicsData.goals,
    social: {
      ...gameMechanicsData.social,
      features: gameMechanicsData.social.features as SocialFeature[],
    },
    userJourneys: gameMechanicsData.userJourneys,
    expansions: gameMechanicsData.expansions,
    lmsIntegration: gameMechanicsData.lmsIntegration,
    configuration: gameMechanicsData.configuration,
    negativeReinforcement: gameMechanicsData.negativeReinforcement,
    historyReflection: gameMechanicsData.historyReflection,
    games: gameMechanicsData.games,
  },
  monetization: monetizationData,
  communication: communicationData,
  researchExtensions: {
    collegeReadiness: {
      ...researchExtensionsData.collegeReadiness,
      keyConcerns: researchExtensionsData.collegeReadiness
        .keyConcerns as CollegeConcern[],
      dropoutFactors: researchExtensionsData.collegeReadiness
        .dropoutFactors as DropoutFactor[],
    },
    parentEngagement: researchExtensionsData.parentEngagement,
    socialMediaResearch: {
      ...researchExtensionsData.socialMediaResearch,
      keyFindings: researchExtensionsData.socialMediaResearch
        .keyFindings as SocialFinding[],
    },
    socialDynamics: {
      ...researchExtensionsData.socialDynamics,
      keyFindings: researchExtensionsData.socialDynamics
        .keyFindings as SocialFinding[],
    },
    purposeAndMotivation: researchExtensionsData.purposeAndMotivation,
    employeeSatisfaction: researchExtensionsData.employeeSatisfaction,
    surveyStrategies: {
      ...researchExtensionsData.surveyStrategies,
      surveyTypes: researchExtensionsData.surveyStrategies
        .surveyTypes as SurveyType[],
    },
    engagementResearch: {
      ...researchExtensionsData.engagementResearch,
      keyStatistics: researchExtensionsData.engagementResearch
        .keyStatistics as EngagementStatistic[],
      attentionSpan: {
        ...researchExtensionsData.engagementResearch.attentionSpan,
        causes: researchExtensionsData.engagementResearch.attentionSpan
          .causes as AttentionCause[],
      },
    },
    gamingResearch: researchExtensionsData.gamingResearch,
    furtherReading: researchExtensionsData.furtherReading,
  },
  designNotes: {
    selfDeterminationTheory: {
      ...designNotesData.selfDeterminationTheory,
      coreNeeds: designNotesData.selfDeterminationTheory
        .coreNeeds as SDTCoreNeed[],
    },
    designDecisions: designNotesData.designDecisions,
    motivationTheory: designNotesData.motivationTheory,
    rewardSystemResearch: {
      ...designNotesData.rewardSystemResearch,
      keyResources: designNotesData.rewardSystemResearch
        .keyResources as RewardResource[],
    },
    aiUsage: {
      ...designNotesData.aiUsage,
      developmentUseCases: designNotesData.aiUsage
        .developmentUseCases as AIUseCase[],
      productUseCases: designNotesData.aiUsage.productUseCases as AIUseCase[],
    },
    inspirationalQuotes: {
      ...designNotesData.inspirationalQuotes,
      quotes: designNotesData.inspirationalQuotes
        .quotes as InspirationalQuote[],
    },
    rewardSystemExamples: designNotesData.rewardSystemExamples,
    topicsForFurtherResearch: designNotesData.topicsForFurtherResearch,
  },
  learningScience: {
    attentionScience: {
      ...learningScienceData.attentionScience,
      resourcePoolModel: {
        ...learningScienceData.attentionScience.resourcePoolModel,
        depleting: {
          ...learningScienceData.attentionScience.resourcePoolModel.depleting,
          factors: learningScienceData.attentionScience.resourcePoolModel
            .depleting.factors as AttentionFactor[],
        },
        replenishing: {
          ...learningScienceData.attentionScience.resourcePoolModel
            .replenishing,
          factors: learningScienceData.attentionScience.resourcePoolModel
            .replenishing.factors as AttentionFactor[],
        },
      },
      moodConnection: {
        ...learningScienceData.attentionScience.moodConnection,
        principles: learningScienceData.attentionScience.moodConnection
          .principles as AttentionPrinciple[],
      },
      practicalTakeaways: {
        ...learningScienceData.attentionScience.practicalTakeaways,
        techniques: learningScienceData.attentionScience.practicalTakeaways
          .techniques as AttentionTechnique[],
      },
    },
    feedbackSystems: {
      ...learningScienceData.feedbackSystems,
      roleInLearning: {
        ...learningScienceData.feedbackSystems.roleInLearning,
        types: learningScienceData.feedbackSystems.roleInLearning
          .types as FeedbackType[],
      },
    },
    positiveReinforcement: {
      ...learningScienceData.positiveReinforcement,
      benefits: learningScienceData.positiveReinforcement
        .benefits as ReinforcementBenefit[],
      vsNegativeReinforcement: {
        ...learningScienceData.positiveReinforcement.vsNegativeReinforcement,
        positive: learningScienceData.positiveReinforcement
          .vsNegativeReinforcement.positive as ReinforcementComparison,
        negative: learningScienceData.positiveReinforcement
          .vsNegativeReinforcement.negative as ReinforcementComparison,
      },
    },
    learningAgility: {
      ...learningScienceData.learningAgility,
      benefitsOfMastery: {
        ...learningScienceData.learningAgility.benefitsOfMastery,
        benefits: learningScienceData.learningAgility.benefitsOfMastery
          .benefits as AgilityBenefit[],
      },
    },
    progressTracking: {
      ...learningScienceData.progressTracking,
      progressPrinciples: learningScienceData.progressTracking
        .progressPrinciples as ProgressPrinciple[],
    },
    rewardPsychology: {
      ...learningScienceData.rewardPsychology,
      practicalExamples: learningScienceData.rewardPsychology
        .practicalExamples as HabitExample[],
    },
    purposeAndMission: {
      ...learningScienceData.purposeAndMission,
      jobVsMission: {
        ...learningScienceData.purposeAndMission.jobVsMission,
        comparison: {
          job: learningScienceData.purposeAndMission.jobVsMission.comparison
            .job as MissionComparison,
          mission: learningScienceData.purposeAndMission.jobVsMission.comparison
            .mission as MissionComparison,
        },
      },
    },
  },
  ideation: {
    overview: ideationData.overview,
    features: ideationData.features as IdeationFeature[],
    priorityMatrix: ideationData.priorityMatrix as IdeationPriorityMatrix,
  } as IdeationData,
  branding: brandingData as BrandingData,
}

// Convenience exports
export const {
  business,
  marketing,
  channels,
  product,
  technology,
  research,
  competition,
  risks,
  funding,
  users,
  psychology,
  mentalHealth,
  rewards,
  legal,
  businessOperations,
  goToMarket,
  caseStudies,
  gameMechanics,
  researchExtensions,
  designNotes,
  learningScience,
  ideation,
  monetization,
  communication,
} = expanseEduDocs
export const { summary, highlights, pitches, valuePropositions, goals } =
  business
export const { targetAudiences, personas, interests, targetOrder } = marketing
export const { features, categories } = product
export const { stack, architecture, integrations } = technology
export const { topics, statistics, sources } = research

// Navigation structure
export const docsNavigation = [
  {
    id: "highlights",
    label: "⭐ Highlights",
  },
  {
    id: "business",
    label: "💼 Business",
    children: [
      { id: "summary", label: "Summary" },
      { id: "pitches", label: "Elevator Pitches" },
      { id: "value-propositions", label: "Value Propositions" },
      { id: "goals", label: "Goals & Mission" },
      { id: "growth-strategy", label: "Growth Strategy" },
    ],
  },
  {
    id: "product",
    label: "📦 Product",
    children: [{ id: "features", label: "Features" }],
  },
  {
    id: "ideation",
    label: "💡 Ideation",
    children: [
      { id: "ideation-overview", label: "Overview" },
      { id: "ideation-security", label: "Security & Safety" },
      { id: "ideation-economy", label: "Economy & Financial" },
      { id: "ideation-rewards", label: "Rewards & Engagement" },
      { id: "ideation-social", label: "Social & Community" },
      { id: "ideation-education", label: "Education & Career" },
      { id: "ideation-platform", label: "Platform & Integration" },
      { id: "ideation-analytics", label: "Analytics & Observability" },
      { id: "ideation-learning", label: "Learning & Content" },
      { id: "ideation-priority", label: "Priority Matrix" },
    ],
  },
  {
    id: "marketing",
    label: "📢 Marketing",
    children: [
      { id: "audience", label: "Audience" },
      { id: "personas", label: "User Personas" },
      { id: "channels", label: "Channels" },
      { id: "sales-insights", label: "Sales Insights" },
    ],
  },
  {
    id: "technology",
    label: "💻 Technology",
    children: [
      { id: "tech-stack", label: "Tech Stack" },
      { id: "architecture", label: "Architecture" },
      { id: "integrations", label: "Integrations" },
      { id: "security", label: "Security" },
    ],
  },
  {
    id: "research",
    label: "🔬 Research",
    children: [
      { id: "research-topics", label: "Research Topics" },
      { id: "statistics", label: "Key Statistics" },
      { id: "sources", label: "Sources" },
    ],
  },
  {
    id: "competition",
    label: "🏆 Competition",
    children: [
      { id: "competitors", label: "Competitors" },
      { id: "differentiators", label: "Differentiators" },
      { id: "market-weaknesses", label: "Market Weaknesses" },
    ],
  },
  {
    id: "risks",
    label: "⚠️ Risks",
    children: [{ id: "risk-analysis", label: "Risk Analysis" }],
  },
  {
    id: "funding",
    label: "💰 Funding",
    children: [
      { id: "funding-status", label: "Funding Status" },
      { id: "opportunities", label: "Opportunities" },
      { id: "advisors", label: "Advisors" },
      { id: "kpis", label: "KPIs & Goals" },
      { id: "research-tasks", label: "Research Tasks" },
    ],
  },
  {
    id: "users",
    label: "👥 Users",
    children: [
      { id: "customers", label: "Customer Types" },
      { id: "user-attributes", label: "User Attributes" },
      { id: "target-segments", label: "Target Segments" },
    ],
  },
  {
    id: "psychology",
    label: "🧠 Psychology",
    children: [
      { id: "dopamine", label: "Dopamine & Motivation" },
      { id: "positive-reinforcement", label: "Positive Reinforcement" },
      { id: "social-development", label: "Social Development" },
      { id: "self-efficacy", label: "Self-Efficacy" },
    ],
  },
  {
    id: "mental-health",
    label: "💚 Mental Health",
    children: [
      { id: "mental-health-stats", label: "Statistics" },
      { id: "interventions", label: "Positive Interventions" },
    ],
  },
  {
    id: "rewards",
    label: "🎁 Rewards",
    children: [
      { id: "reward-system", label: "Reward System" },
      { id: "real-life-rewards", label: "Real Life Rewards" },
      { id: "in-game-rewards", label: "In-Game Rewards" },
    ],
  },
  {
    id: "legal",
    label: "⚖️ Legal",
    children: [
      { id: "compliance", label: "Compliance" },
      { id: "privacy-security", label: "Privacy & Security" },
      { id: "legal-risks", label: "Legal Risks" },
    ],
  },
  {
    id: "operations",
    label: "📊 Operations",
    children: [
      { id: "revenue", label: "Revenue & Profit" },
      { id: "funding-rounds", label: "Funding Rounds" },
      { id: "exits", label: "Exit Strategy" },
      { id: "engagement", label: "Engagement" },
      { id: "gamification", label: "Gamification" },
    ],
  },
  {
    id: "go-to-market",
    label: "🚀 Go-to-Market",
    children: [
      { id: "gtm-strategy", label: "Strategy" },
      { id: "gtm-channels", label: "Channels" },
      { id: "gtm-branding", label: "Branding" },
    ],
  },
  {
    id: "case-studies",
    label: "📚 Case Studies",
    children: [
      // Ordered as an argument: context -> method -> evidence -> who it
      // affects -> what worked -> what we built. Narratives close as a
      // companion read rather than competing with the evidence up front.
      { id: "kcps-state-of-education", label: "State of Education" },
      { id: "kcps-overview", label: "KCPS Overview" },
      { id: "kcps-events", label: "In the Field" },
      { id: "kcps-personas", label: "Student Personas" },
      { id: "kcps-special-ed", label: "Special Education" },
      { id: "kcps-engagement", label: "Engagement Insights" },
      { id: "kcps-classroom-management", label: "Classroom Management" },
      { id: "kcps-lessons", label: "Lessons Learned" },
      { id: "kcps-recommendations", label: "Recommendations" },
      { id: "kcps-narratives", label: "Narratives" },
    ],
  },
  {
    id: "game-mechanics",
    label: "🎮 Game Mechanics",
    children: [
      { id: "game-overview", label: "Overview" },
      { id: "game-currencies", label: "Currencies" },
      { id: "game-progression", label: "Progression & Leveling" },
      { id: "game-quests", label: "Quests & Achievements" },
      { id: "game-battles", label: "Battles & Competition" },
      { id: "game-rewards", label: "Rewards" },
      { id: "game-goals", label: "Goals" },
      { id: "game-rankings", label: "Rankings & Leaderboards" },
      { id: "game-recognition", label: "Recognition & Feedback" },
      { id: "game-personalization", label: "Personalization" },
      { id: "game-profiles", label: "Profiles" },
      { id: "game-stores", label: "Stores" },
      { id: "game-social", label: "Social Features" },
      { id: "game-negative", label: "Negative Reinforcement" },
      { id: "game-history", label: "History & Reflection" },
      { id: "game-games", label: "Games & Mini-Games" },
      { id: "game-expansions", label: "Expansions & Seasons" },
      { id: "game-journeys", label: "User Journeys" },
    ],
  },
  {
    id: "monetization",
    label: "💰 Monetization",
    children: [
      { id: "monetization-overview", label: "Overview" },
      { id: "monetization-subscriptions", label: "Subscriptions" },
      { id: "monetization-payments", label: "Payments & Billing" },
      { id: "monetization-purchases", label: "In-App Purchases" },
      { id: "monetization-scholarships", label: "Scholarships" },
      { id: "monetization-sponsorships", label: "Sponsorships" },
    ],
  },
  {
    id: "communication",
    label: "📱 Communication",
    children: [
      { id: "comm-overview", label: "Overview" },
      { id: "comm-notifications", label: "Notifications & Inbox" },
      { id: "comm-parent", label: "Parent Communication" },
      { id: "comm-auth", label: "Authentication" },
      { id: "comm-accounts", label: "User Accounts" },
    ],
  },
  {
    id: "research-extensions",
    label: "📊 Research Extensions",
    children: [
      { id: "college-readiness", label: "College Readiness" },
      { id: "parent-engagement", label: "Parent Engagement" },
      { id: "social-media", label: "Social Media Research" },
      { id: "social-dynamics", label: "Social Dynamics" },
      { id: "purpose-motivation", label: "Purpose & Motivation" },
      { id: "employee-satisfaction", label: "Employee Satisfaction" },
      { id: "survey-strategies", label: "Survey Strategies" },
      { id: "engagement-research", label: "Engagement Research" },
      { id: "gaming-research", label: "Gaming Research" },
      { id: "further-reading", label: "Further Reading" },
    ],
  },
  {
    id: "design-notes",
    label: "📝 Design Notes",
    children: [
      { id: "sdt", label: "Self-Determination Theory" },
      { id: "design-decisions", label: "Design Decisions" },
      { id: "motivation-theory", label: "Motivation Theory" },
      { id: "reward-research", label: "Reward System Research" },
      { id: "ai-usage", label: "AI Usage" },
      { id: "inspirational-quotes", label: "Inspirational Quotes" },
      { id: "reward-examples", label: "Reward System Examples" },
      { id: "future-research", label: "Topics for Research" },
    ],
  },
  {
    id: "learning-science",
    label: "🧪 Learning Science",
    children: [
      { id: "attention-science", label: "Attention Science" },
      { id: "feedback-systems", label: "Feedback Systems" },
      { id: "learning-reinforcement", label: "Positive Reinforcement" },
      { id: "learning-agility", label: "Learning & Unlearning" },
      { id: "progress-tracking", label: "Progress Tracking" },
      { id: "reward-psychology", label: "Reward Psychology" },
      { id: "purpose-mission", label: "Purpose & Mission" },
      { id: "content-philosophy", label: "Content Philosophy" },
      { id: "health-focus", label: "Health & Focus" },
    ],
  },
  {
    id: "branding",
    label: "🎨 Branding",
    children: [
      { id: "brand-logo", label: "Logo Evolution" },
      { id: "brand-presentation", label: "Presentation Style" },
      { id: "brand-characters", label: "Character Strategy" },
    ],
  },
]
