/**
 * LaunchContext - Centralized state for launch strategy data
 * Used by: LaunchStrategyView
 */
import { createContext, useContext, useMemo, ReactNode } from "react"

// Import data
import missionGoalsData from "../data/missionGoals.json"
import featureImpactData from "../data/featureImpact.json"
import marketingStagesData from "../data/marketingStages.json"
import mvpConfigurationsData from "../data/mvpConfigurations.json"

// Re-export raw data for components that need module-level access
// This provides backward compatibility while centralizing data sources
export {
  missionGoalsData,
  featureImpactData,
  marketingStagesData,
  mvpConfigurationsData,
}

// Type definitions
interface MissionPillar {
  id: string
  name: string
  shortName: string
  description: string
  icon: string
  color: string
  weight: number
  metrics: Array<{
    id: string
    name: string
    type: string
  }>
  successIndicators: string[]
}

interface Mission {
  statement: string
  tagline: string
  philosophy: string
}

interface MissionGoals {
  version: string
  lastUpdated: string
  mission: Mission
  primaryPillars: MissionPillar[]
}

interface FeatureImpact {
  id: string
  name: string
  description?: string
  pillarImpacts: Record<string, number> // pillarId -> impact score
  effort: "xs" | "s" | "m" | "l" | "xl"
  dependencies?: string[]
}

interface MarketingStage {
  id: string
  name: string
  description: string
  duration: string
  activities: string[]
  metrics: string[]
  budget?: string
}

interface MVPConfiguration {
  id: string
  name: string
  description: string
  features: string[]
  targetDate?: string
  status: "concept" | "planning" | "in-progress" | "complete"
}

interface LaunchContextValue {
  // Data
  missionGoals: MissionGoals
  featureImpacts: FeatureImpact[]
  marketingStages: MarketingStage[]
  mvpConfigurations: MVPConfiguration[]

  // Mission selectors
  getMission: () => Mission
  getPillars: () => MissionPillar[]
  getPillarById: (id: string) => MissionPillar | undefined

  // Feature impact selectors
  getFeaturesByPillar: (pillarId: string) => FeatureImpact[]
  getHighImpactFeatures: (threshold?: number) => FeatureImpact[]

  // Marketing selectors
  getCurrentStage: () => MarketingStage | undefined
  getStageById: (id: string) => MarketingStage | undefined

  // MVP selectors
  getActiveConfiguration: () => MVPConfiguration | undefined
  getConfigurationById: (id: string) => MVPConfiguration | undefined
}

const LaunchContext = createContext<LaunchContextValue | null>(null)

export function LaunchProvider({ children }: { children: ReactNode }) {
  const missionGoals = missionGoalsData as MissionGoals
  // These data files have different structures than initially typed - cast safely
  const featureImpacts =
    ((featureImpactData as Record<string, unknown>)
      .features as FeatureImpact[]) || []
  const marketingStages =
    ((marketingStagesData as Record<string, unknown>)
      .stages as MarketingStage[]) || []
  const mvpConfigurations =
    ((mvpConfigurationsData as Record<string, unknown>)
      .configurations as MVPConfiguration[]) || []

  const value = useMemo<LaunchContextValue>(
    () => ({
      missionGoals,
      featureImpacts,
      marketingStages,
      mvpConfigurations,

      // Mission selectors
      getMission: () => missionGoals.mission,

      getPillars: () => missionGoals.primaryPillars,

      getPillarById: (id) =>
        missionGoals.primaryPillars.find((p) => p.id === id),

      // Feature impact selectors
      getFeaturesByPillar: (pillarId) =>
        featureImpacts.filter((f) => (f.pillarImpacts[pillarId] || 0) > 0),

      getHighImpactFeatures: (threshold = 0.7) =>
        featureImpacts.filter((f) => {
          const maxImpact = Math.max(...Object.values(f.pillarImpacts))
          return maxImpact >= threshold
        }),

      // Marketing selectors
      getCurrentStage: () => marketingStages[0], // First stage is current

      getStageById: (id) => marketingStages.find((s) => s.id === id),

      // MVP selectors
      getActiveConfiguration: () =>
        mvpConfigurations.find((c) => c.status === "in-progress") ||
        mvpConfigurations.find((c) => c.status === "planning"),

      getConfigurationById: (id) => mvpConfigurations.find((c) => c.id === id),
    }),
    [missionGoals, featureImpacts, marketingStages, mvpConfigurations],
  )

  return (
    <LaunchContext.Provider value={value}>{children}</LaunchContext.Provider>
  )
}

export function useLaunch() {
  const context = useContext(LaunchContext)
  if (!context) {
    throw new Error("useLaunch must be used within a LaunchProvider")
  }
  return context
}
