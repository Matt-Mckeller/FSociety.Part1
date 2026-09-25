/**
 * ProjectsContext - Centralized state for project/product data
 * Used by: FinancialsView, QuestionsView, RoadmapView, TimelineView
 */
import { createContext, useContext, useMemo, ReactNode } from "react"

// Import data
import projectsData from "../data/projects.json"

// Re-export raw data for components that need module-level access
export { projectsData }

// Projects use different status values than QuestStatus
type ProjectStatus = "active" | "ongoing" | "planned" | "paused" | "completed"

interface Project {
  id: string
  name: string
  description: string
  status: ProjectStatus
  priority: "P1" | "P2" | "P3"
  category: "business" | "personal"
  color: string
  icon?: string
}

interface ProjectsContextValue {
  projects: Project[]
  getProjectById: (id: string) => Project | undefined
  getActiveProjects: () => Project[]
  getProjectsByCategory: (category: "business" | "personal") => Project[]
  getProjectsByPriority: (priority: "P1" | "P2" | "P3") => Project[]
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null)

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const projects = projectsData.projects as Project[]

  const value = useMemo<ProjectsContextValue>(
    () => ({
      projects,

      getProjectById: (id: string) => projects.find((p) => p.id === id),

      getActiveProjects: () =>
        projects.filter((p) => p.status === "active" || p.status === "ongoing"),

      getProjectsByCategory: (category: "business" | "personal") =>
        projects.filter((p) => p.category === category),

      getProjectsByPriority: (priority: "P1" | "P2" | "P3") =>
        projects.filter((p) => p.priority === priority),
    }),
    [projects],
  )

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectsContext)
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider")
  }
  return context
}
