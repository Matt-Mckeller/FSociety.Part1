/**
 * RoadmapContext - Centralized state for roadmap, decisions, and business value data
 * Used by: RoadmapView, StrategicCompassView
 */
import { createContext, useContext, useMemo, ReactNode } from "react"
import type {
  Roadmap,
  RoadmapProject,
  RoadmapPhase,
  RoadmapMilestone,
  RoadmapProjectRelease,
} from "../types"

// Import data
import roadmapData from "../data/roadmap.json"
import decisionsData from "../data/decisions.json"
import businessValueData from "../data/businessValue.json"

// Re-export raw data for components that need module-level access
export { roadmapData, decisionsData, businessValueData }

// Type definitions for decisions
interface Decision {
  id: string
  title: string
  description?: string
  date: string
  status: "pending" | "made" | "revisiting"
  outcome?: string
  rationale?: string
  linkedProjects?: string[]
  alternatives?: Array<{
    title: string
    pros: string[]
    cons: string[]
  }>
}

// Type definitions for business value
interface BusinessValueItem {
  id: string
  projectId: string
  title: string
  description?: string
  valueType:
    | "revenue"
    | "cost-savings"
    | "user-growth"
    | "engagement"
    | "strategic"
  estimatedValue?: string
  priority: "high" | "medium" | "low"
  timeframe?: string
}

interface RoadmapContextValue {
  // Data
  roadmap: Roadmap
  decisions: Decision[]
  businessValue: BusinessValueItem[]

  // Roadmap selectors
  getPhases: () => RoadmapPhase[]
  getMilestones: () => RoadmapMilestone[]
  getProjects: () => RoadmapProject[]
  getProjectById: (id: string) => RoadmapProject | undefined
  getPhaseById: (id: string) => RoadmapPhase | undefined
  getMilestonesByPhase: (phaseId: string) => RoadmapMilestone[]
  getUpcomingReleases: (limit?: number) => RoadmapProjectRelease[]

  // Decision selectors
  getPendingDecisions: () => Decision[]
  getDecisionsByProject: (projectId: string) => Decision[]

  // Business value selectors
  getBusinessValueByProject: (projectId: string) => BusinessValueItem[]
  getHighPriorityBusinessValue: () => BusinessValueItem[]
}

const RoadmapContext = createContext<RoadmapContextValue | null>(null)

export function RoadmapProvider({ children }: { children: ReactNode }) {
  const roadmap = roadmapData as Roadmap
  // Handle different data structures with safe casts
  const decisionsRaw = decisionsData as Record<string, unknown>
  const decisions = (decisionsRaw.decisions || []) as unknown as Decision[]
  const businessValueRaw = businessValueData as Record<string, unknown>
  const businessValue = (businessValueRaw.businessValues ||
    businessValueRaw.items ||
    []) as unknown as BusinessValueItem[]

  const value = useMemo<RoadmapContextValue>(
    () => ({
      roadmap,
      decisions,
      businessValue,

      // Roadmap selectors
      getPhases: () => roadmap.phases || [],

      getMilestones: () => roadmap.milestones || [],

      getProjects: () => roadmap.projects || [],

      getProjectById: (id: string) =>
        roadmap.projects?.find((p) => p.id === id),

      getPhaseById: (id: string) => roadmap.phases?.find((p) => p.id === id),

      getMilestonesByPhase: (phaseId: string) =>
        (roadmap.milestones || []).filter((m) => m.phaseId === phaseId),

      getUpcomingReleases: (limit = 5) => {
        const now = new Date()
        const allReleases: RoadmapProjectRelease[] = []

        roadmap.projects?.forEach((project) => {
          project.releases?.forEach((release) => {
            if (new Date(release.date) >= now) {
              allReleases.push(release)
            }
          })
        })

        return allReleases
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          )
          .slice(0, limit)
      },

      // Decision selectors
      getPendingDecisions: () =>
        decisions.filter((d) => d.status === "pending"),

      getDecisionsByProject: (projectId: string) =>
        decisions.filter((d) => d.linkedProjects?.includes(projectId)),

      // Business value selectors
      getBusinessValueByProject: (projectId: string) =>
        businessValue.filter((v) => v.projectId === projectId),

      getHighPriorityBusinessValue: () =>
        businessValue.filter((v) => v.priority === "high"),
    }),
    [roadmap, decisions, businessValue],
  )

  return (
    <RoadmapContext.Provider value={value}>{children}</RoadmapContext.Provider>
  )
}

export function useRoadmap() {
  const context = useContext(RoadmapContext)
  if (!context) {
    throw new Error("useRoadmap must be used within a RoadmapProvider")
  }
  return context
}
