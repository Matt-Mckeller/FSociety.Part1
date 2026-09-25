/**
 * Launch Strategy View - Type Definitions
 *
 * Interfaces and types for launch planning components
 */

export interface PrimaryPillar {
  id: string
  name: string
  shortName: string
  description: string
  icon: string
  color: string
  weight: number
  metrics: Array<{ id: string; name: string; type: string }>
  successIndicators: string[]
  context?: {
    crisis?: Record<string, string>
    intervention?: string
  }
}

export interface FeatureImpact {
  storylineId: string
  name: string
  goalImpact: {
    engagement: number
    "mental-health": number
    learning: number
    "growth-mindset": number
  }
  impactNotes: Record<string, string>
  audienceUnlocks: string[]
  complexity: number
  timeEstimate: string
  dependencies: string[]
  launchRequirement: "must-have" | "should-have" | "nice-to-have" | "future"
  marketingValue: string
}

export interface MVPConfiguration {
  id: string
  name: string
  description: string
  selectedFeatures: string[]
  computed: {
    totalComplexity: number
    estimatedTimeWeeks: number
    goalCoverage: {
      engagement: number
      "mental-health": number
      learning: number
      "growth-mindset": number
      overall: number
    }
    audiencesUnlocked: string[]
    launchReadinessScore: number
  }
  notes?: string
  risks?: string[]
}

export interface MarketingStage {
  id: string
  name: string
  phase: number
  duration: string
  description: string
  goals: string[]
  keyMessages: string[]
  targetAudiences?: string[]
  contentTypes?: Array<{
    type: string
    description: string
    channels?: string[]
  }>
  metrics?: Array<{ name: string; target: string }>
}

export interface MissionGoals {
  mission: { statement: string; tagline: string; philosophy: string }
  primaryPillars: PrimaryPillar[]
  coreThemes: Array<{
    id: string
    name: string
    description: string
    icon: string
  }>
  humanImpact: Record<
    string,
    { id: string; name: string; description: string; icon: string }
  >
  guidingPrinciples: Array<{ id: string; name: string; description: string }>
  marketingMessages: {
    fearFrustration: string[]
    hopePotential: string[]
    valuePropositions: string[]
  }
}

export interface FeatureImpactData {
  features: Record<string, FeatureImpact>
  aggregations: {
    byLaunchRequirement: Record<string, string[]>
    byPrimaryGoal: Record<string, string[]>
  }
}

export interface MVPConfigurationsData {
  configurations: MVPConfiguration[]
  presets: Record<string, { description: string; configurationId: string }>
}

export interface MarketingStagesData {
  stages: MarketingStage[]
}
