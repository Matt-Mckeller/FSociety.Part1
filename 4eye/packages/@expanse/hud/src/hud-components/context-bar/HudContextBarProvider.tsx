"use client"

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

// =============================================================================
// Types
// =============================================================================

export type DomainId = "learn" | "work" | "life"
export type GoalId = string
export type ProjectId = string

export interface DomainOption {
  id: DomainId
  label: string
  description?: string
}

export interface GoalOption {
  id: GoalId
  label: string
  description?: string
  /** Domain this goal belongs to. Used to filter by current domain. */
  domain: DomainId
}

export interface ProjectOption {
  id: ProjectId
  label: string
  description?: string
  domain?: DomainId
  goal?: GoalId
}

export type ContextBarButtonId = "domains" | "goals" | "projects"

export interface HudContextBarValue {
  // Domain
  domain: DomainId | null
  setDomain: (domain: DomainId) => void
  domains: DomainOption[]

  // Goal (filtered by current domain)
  goal: GoalId | null
  setGoal: (goal: GoalId) => void
  goals: GoalOption[]

  // Project (hidden for now)
  project: ProjectId | null
  setProject: (project: ProjectId) => void
  projects: ProjectOption[]

  // Visibility logic — derived from state above + flags
  visibleButtons: ContextBarButtonId[]
}

// =============================================================================
// Defaults
// =============================================================================

export const DEFAULT_DOMAINS: DomainOption[] = [
  { id: "learn", label: "Learn", description: "Education, skills, growth" },
  { id: "work", label: "Work", description: "Career, projects, deliverables" },
  { id: "life", label: "Life", description: "Health, relationships, habits" },
]

export const DEFAULT_GOALS: GoalOption[] = [
  // Learn
  { id: "learn-daily-practice", domain: "learn", label: "Daily Practice" },
  { id: "learn-course-progress", domain: "learn", label: "Course Progress" },
  { id: "learn-reading-list", domain: "learn", label: "Reading List" },
  // Work
  { id: "work-current-sprint", domain: "work", label: "Current Sprint" },
  { id: "work-quarter-okrs", domain: "work", label: "Quarter OKRs" },
  // Life
  { id: "life-health", domain: "life", label: "Health" },
  { id: "life-habits", domain: "life", label: "Habits" },
]

const STORAGE_KEY_DOMAIN = "expanse-domain"

// =============================================================================
// Context
// =============================================================================

const HudContextBarContext = createContext<HudContextBarValue | null>(null)

export interface HudContextBarProviderProps {
  children: ReactNode
  /** Override the domain option list. */
  domains?: DomainOption[]
  /** Override the goal option list. */
  goals?: GoalOption[]
  /** Override the project option list. */
  projects?: ProjectOption[]
  /** Initial domain selection (overrides any persisted value). */
  initialDomain?: DomainId | null
  /**
   * When true, the projects button becomes eligible for visibility.
   * Defaults to false because projects aren't ready yet.
   */
  enableProjects?: boolean
  /**
   * Persist the selected domain to localStorage.
   * @default true
   */
  persistDomain?: boolean
}

export function HudContextBarProvider({
  children,
  domains = DEFAULT_DOMAINS,
  goals = DEFAULT_GOALS,
  projects = [],
  initialDomain,
  enableProjects = false,
  persistDomain = true,
}: HudContextBarProviderProps) {
  // Domain — load from localStorage if available
  const [domain, setDomainState] = useState<DomainId | null>(() => {
    if (initialDomain !== undefined) return initialDomain
    if (typeof window === "undefined" || !persistDomain) return null
    const stored = window.localStorage.getItem(STORAGE_KEY_DOMAIN)
    if (stored && domains.some((d) => d.id === stored)) {
      return stored as DomainId
    }
    return null
  })

  const [goal, setGoalState] = useState<GoalId | null>(null)
  const [project, setProjectState] = useState<ProjectId | null>(null)

  // Persist domain
  useEffect(() => {
    if (!persistDomain || typeof window === "undefined") return
    if (domain) {
      window.localStorage.setItem(STORAGE_KEY_DOMAIN, domain)
    } else {
      window.localStorage.removeItem(STORAGE_KEY_DOMAIN)
    }
  }, [domain, persistDomain])

  const setDomain = useCallback((next: DomainId) => {
    setDomainState((prev) => {
      // Reset goal when domain changes
      if (prev !== next) setGoalState(null)
      return next
    })
  }, [])

  const setGoal = useCallback((next: GoalId) => {
    setGoalState(next)
  }, [])

  const setProject = useCallback((next: ProjectId) => {
    setProjectState(next)
  }, [])

  // Goals filtered by current domain
  const filteredGoals = useMemo(
    () => (domain ? goals.filter((g) => g.domain === domain) : []),
    [goals, domain]
  )

  // Visibility logic
  const visibleButtons = useMemo<ContextBarButtonId[]>(() => {
    const ids: ContextBarButtonId[] = ["domains"]
    if (domain) ids.push("goals")
    if (enableProjects) ids.push("projects")
    return ids
  }, [domain, enableProjects])

  const value = useMemo<HudContextBarValue>(
    () => ({
      domain,
      setDomain,
      domains,
      goal,
      setGoal,
      goals: filteredGoals,
      project,
      setProject,
      projects,
      visibleButtons,
    }),
    [
      domain,
      setDomain,
      domains,
      goal,
      setGoal,
      filteredGoals,
      project,
      setProject,
      projects,
      visibleButtons,
    ]
  )

  return (
    <HudContextBarContext.Provider value={value}>
      {children}
    </HudContextBarContext.Provider>
  )
}

// =============================================================================
// Hook
// =============================================================================

export function useHudContextBar(): HudContextBarValue {
  const ctx = useContext(HudContextBarContext)
  if (!ctx) {
    throw new Error(
      "useHudContextBar must be used inside <HudContextBarProvider>"
    )
  }
  return ctx
}
