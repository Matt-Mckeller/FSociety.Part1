/**
 * Launch Strategy Types
 * 
 * Types for mission goals, feature impact analysis, marketing stages,
 * and MVP configuration management.
 * 
 * These types support the Launch Strategy UI which enables:
 * - Feature Impact Simulation
 * - Marketing Stage Planning
 * - Goal Assessment & Comparison
 * - MVP Configuration Building
 */

// ============================================================================
// MISSION GOALS TYPES
// ============================================================================

export interface MissionGoals {
  version: string
  lastUpdated: string
  mission: Mission
  primaryPillars: PrimaryPillar[]
  coreThemes: CoreTheme[]
  humanImpact: HumanImpact
  targetAudiences: TargetAudiences
  guidingPrinciples: GuidingPrinciple[]
  marketingMessages: MarketingMessages
  brandThemes: BrandThemes
  metadata: MissionGoalsMetadata
}

export interface Mission {
  statement: string
  tagline: string
  philosophy: string
}

export interface PrimaryPillar {
  id: PillarId
  name: string
  shortName: string
  description: string
  icon: string
  color: string
  weight: number // 0-1, should sum to 1.0 across all pillars
  metrics: PillarMetric[]
  successIndicators: string[]
  context?: {
    crisis?: Record<string, string>
    intervention?: string
  }
}

export type PillarId = 'engagement' | 'mental-health' | 'learning' | 'growth-mindset'

export interface PillarMetric {
  id: string
  name: string
  type: 'number' | 'percentage' | 'score' | 'minutes' | 'hours'
}

export interface CoreTheme {
  id: CoreThemeId
  name: string
  description: string
  icon: string
  keywords: string[]
}

export type CoreThemeId = 'improve' | 'innovate' | 'win' | 'heal' | 'protect'

export interface HumanImpact {
  identity: HumanImpactArea
  healing: HumanImpactArea & {
    statistics: Record<string, string>
    intervention: string[]
  }
  connection: HumanImpactArea & {
    focuses: string[]
  }
}

export interface HumanImpactArea {
  id: string
  name: string
  description: string
  icon: string
  targetPersonas?: string[]
  desiredOutcomes?: string[]
}

export interface TargetAudiences {
  primary: AudienceSegment[]
  secondary: AudienceSegment[]
  underserved: AudienceSegment[]
}

export interface AudienceSegment {
  id: string
  name: string
  description: string
}

export interface GuidingPrinciple {
  id: string
  name: string
  description: string
  implementation: string
}

export interface MarketingMessages {
  fearFrustration: string[]
  hopePotential: string[]
  valuePropositions: string[]
}

export interface BrandThemes {
  primary: string[]
  gameInspired: string[]
}

export interface MissionGoalsMetadata {
  sources: string[]
  consolidatedFrom: string
  purpose: string
}

// ============================================================================
// FEATURE IMPACT TYPES
// ============================================================================

export interface FeatureImpactData {
  version: string
  lastUpdated: string
  documentation: FeatureImpactDocumentation
  goalDefinitions: Record<PillarId, string>
  features: Record<string, FeatureImpact>
  aggregations: FeatureAggregations
  metadata: FeatureImpactMetadata
}

export interface FeatureImpactDocumentation {
  purpose: string
  scoringGuide: Record<string, string>
  complexityGuide: Record<string, string>
  launchRequirements: Record<LaunchRequirement, string>
}

export interface FeatureImpact {
  storylineId: string
  name: string
  goalImpact: GoalImpactScores
  impactNotes: Record<PillarId, string>
  audienceUnlocks: string[]
  audienceNotes: string
  complexity: ComplexityLevel
  timeEstimate: string
  dependencies: string[]
  launchRequirement: LaunchRequirement
  marketingValue: MarketingValue
  revenueImpact: RevenueImpact
}

export interface GoalImpactScores {
  engagement: number // 0.0 - 1.0
  'mental-health': number
  learning: number
  'growth-mindset': number
}

export type ComplexityLevel = 1 | 2 | 3 | 4 | 5

export type LaunchRequirement = 'must-have' | 'should-have' | 'nice-to-have' | 'future'

export type MarketingValue = 'very-high' | 'high' | 'medium' | 'low'

export type RevenueImpact = 'direct' | 'indirect'

export interface FeatureAggregations {
  byLaunchRequirement: Record<LaunchRequirement, string[]>
  byPrimaryGoal: Record<PillarId, string[]>
}

export interface FeatureImpactMetadata {
  campaign: string
  totalFeatures: number
  scoringMethod: string
  lastReviewedBy: string
  notes: string
}

// ============================================================================
// MARKETING STAGES TYPES
// ============================================================================

export interface MarketingStagesData {
  version: string
  lastUpdated: string
  overview: MarketingOverview
  stages: MarketingStage[]
  channelStrategy: Record<string, MarketingChannel>
  messaging: MessagingStrategy
  metadata: MarketingStagesMetadata
}

export interface MarketingOverview {
  purpose: string
  philosophy: string
  approach: string
}

export interface MarketingStage {
  id: MarketingStageId
  name: string
  phase: number
  duration: string
  description: string
  goals: string[]
  keyMessages: string[]
  contentTypes: ContentType[]
  emotionalAppeals?: EmotionalAppeals
  targetAudiences?: StageTargetAudience[]
  channels: StageChannel[]
  kpis: StageKPI[]
  doNot?: string[]
  expansionTargets?: ExpansionTarget[]
}

export type MarketingStageId = 'awareness' | 'pre-launch' | 'soft-launch' | 'public-launch' | 'growth'

export interface ContentType {
  type: string
  description: string
  examples: string[]
  channels: string[]
  frequency: string
}

export interface EmotionalAppeals {
  fear?: string[]
  frustration?: string[]
  hope?: string[]
  curiosity?: string[]
  exclusivity?: string[]
  urgency?: string[]
  'social-proof'?: string[]
  transformation?: string[]
}

export interface StageTargetAudience {
  segment: string
  description: string
}

export interface StageChannel {
  id: string
  priority: 'high' | 'medium' | 'low'
  purpose?: string
  platforms?: string[]
}

export interface StageKPI {
  metric: string
  target: string
}

export interface ExpansionTarget {
  segment: string
  approach: string
}

export interface MarketingChannel {
  id: string
  name: string
  priority: 'high' | 'medium' | 'low'
  description?: string
  platforms?: string[]
  examples?: string[]
  activities?: string[]
  bestFor: string[]
  investment: string
}

export interface MessagingStrategy {
  brandThemes: string[]
  gameThemes: string[]
  topics: {
    primary: string[]
    psychology: string[]
    classroom: string[]
  }
}

export interface MarketingStagesMetadata {
  campaign: string
  sources: string[]
  designedForAudiences: string[]
  notes: string
}

// ============================================================================
// MVP CONFIGURATION TYPES
// ============================================================================

export interface MVPConfigurationsData {
  version: string
  lastUpdated: string
  configurations: MVPConfiguration[]
  metadata: MVPConfigurationsMetadata
}

export interface MVPConfiguration {
  id: string
  name: string
  description: string
  createdDate: string
  lastModified: string
  createdBy: string
  
  // Feature selection
  selectedFeatures: string[] // storylineIds
  
  // Computed metrics (can be recalculated from features)
  computed: MVPComputedMetrics
  
  // Manual overrides/notes
  notes?: string
  targetLaunchDate?: string
  targetAudiences?: string[]
  risks?: string[]
  assumptions?: string[]
}

export interface MVPComputedMetrics {
  totalComplexity: number
  estimatedTimeWeeks: number
  goalCoverage: GoalCoverageScores
  audiencesUnlocked: string[]
  launchReadinessScore: number // 0-100
}

export interface GoalCoverageScores {
  engagement: number // 0-1 weighted average
  'mental-health': number
  learning: number
  'growth-mindset': number
  overall: number // weighted by pillar weights
}

export interface MVPConfigurationsMetadata {
  campaign: string
  totalConfigurations: number
  lastComparisonDate?: string
  notes?: string
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Feature selection state for the UI
 */
export interface FeatureSelectionState {
  selectedIds: Set<string>
  highlightedId: string | null
  filterByRequirement: LaunchRequirement | 'all'
  filterByGoal: PillarId | 'all'
  sortBy: 'priority' | 'complexity' | 'impact' | 'name'
  sortDirection: 'asc' | 'desc'
}

/**
 * Calculated impact summary for selected features
 */
export interface ImpactSummary {
  selectedCount: number
  totalComplexity: number
  estimatedWeeks: number
  goalScores: GoalImpactScores
  weightedOverall: number
  audiencesUnlocked: string[]
  missingMustHaves: string[]
  recommendations: string[]
}

/**
 * Stage progress tracking
 */
export interface StageProgress {
  stageId: MarketingStageId
  status: 'not-started' | 'in-progress' | 'complete'
  startDate?: string
  completedDate?: string
  kpiProgress: Record<string, {
    current: string | number
    target: string
    percentComplete: number
  }>
}

// ============================================================================
// HELPER FUNCTIONS TYPE SIGNATURES
// ============================================================================

/**
 * Calculate impact summary for a set of selected features
 */
export type CalculateImpactSummary = (
  selectedIds: string[],
  features: Record<string, FeatureImpact>,
  pillars: PrimaryPillar[]
) => ImpactSummary

/**
 * Generate recommendations based on current selection
 */
export type GenerateRecommendations = (
  selectedIds: string[],
  features: Record<string, FeatureImpact>,
  pillars: PrimaryPillar[]
) => string[]

/**
 * Compare two MVP configurations
 */
export type CompareMVPConfigurations = (
  config1: MVPConfiguration,
  config2: MVPConfiguration,
  features: Record<string, FeatureImpact>
) => {
  featureDiff: {
    onlyIn1: string[]
    onlyIn2: string[]
    inBoth: string[]
  }
  metricsDiff: {
    complexity: number
    time: number
    goalCoverage: GoalImpactScores
  }
}
