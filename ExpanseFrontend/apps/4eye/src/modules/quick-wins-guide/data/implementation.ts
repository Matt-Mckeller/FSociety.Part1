export interface ImplementationItem {
  priority: number
  complexity: number | null
  task: string
  detail: string
}

export const implementationItems: ImplementationItem[] = [
  {
    priority: 1,
    complexity: 3,
    task: "Upgrade training materials with AI",
    detail: "Review and enhance key documentation for clarity and learning",
  },
  {
    priority: 2,
    complexity: 2,
    task: "Define pods and structure",
    detail: "Organize teams into 3-5 member pods with clear roles",
  },
  {
    priority: 3,
    complexity: 3,
    task: "Stand up AI Q&A pilot",
    detail: "Deploy subscription-based chat tool for agent questions",
  },
  {
    priority: 4,
    complexity: 2,
    task: 'Draft "How we work" guide',
    detail: "Document norms, communication channels, and cultural expectations",
  },
  {
    priority: 5,
    complexity: 3,
    task: "Publish glossary and visual guides",
    detail: "Create reference materials and flowcharts for common processes",
  },
  {
    priority: 6,
    complexity: 3,
    task: "Create role-specific training variants",
    detail: "Adapt materials for new agents, experienced agents, and leads",
  },
  {
    priority: 7,
    complexity: 2,
    task: "Add quizzes and knowledge checks",
    detail: "Build assessments to validate learning and retention",
  },
  {
    priority: 8,
    complexity: 5,
    task: "Refresh public image",
    detail: "Update website, gather reviews, share employee stories",
  },
  {
    priority: 9,
    complexity: null,
    task: "Ongoing: Monthly KPI reviews",
    detail: "Regular alignment checks and iteration based on metrics",
  },
]
