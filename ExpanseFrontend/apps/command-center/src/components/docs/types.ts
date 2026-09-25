/**
 * Docs Viewer Types
 * Shared types for the documentation system
 */

/**
 * Navigation item structure for the docs sidebar
 */
export interface NavItem {
  id: string
  label: string
  children?: NavItem[]
  disabled?: boolean
}

/**
 * All valid section IDs for the documentation system
 * This union type ensures type safety when navigating between sections
 */
export type SectionId =
  // 4eye Product
  | "4eye-learning-modes"
  // Business
  | "highlights"
  | "summary"
  | "pitches"
  | "value-propositions"
  | "goals"
  | "features"
  | "growth-strategy"
  // Ideation
  | "ideation-overview"
  | "ideation-security"
  | "ideation-economy"
  | "ideation-rewards"
  | "ideation-social"
  | "ideation-education"
  | "ideation-platform"
  | "ideation-priority"
  | "ideation-analytics"
  | "ideation-learning"
  // Marketing
  | "audience"
  | "personas"
  | "channels"
  | "sales-insights"
  // Technology
  | "tech-stack"
  | "architecture"
  | "integrations"
  | "security"
  // Research
  | "research-topics"
  | "statistics"
  | "sources"
  | "research-tasks"
  // Competition
  | "competitors"
  | "differentiators"
  | "market-weaknesses"
  // Risk
  | "risk-analysis"
  // Funding
  | "funding-status"
  | "opportunities"
  | "advisors"
  | "kpis"
  // Users
  | "customers"
  | "user-attributes"
  | "target-segments"
  // Psychology
  | "dopamine"
  | "positive-reinforcement"
  | "social-development"
  | "self-efficacy"
  // Mental Health
  | "mental-health-stats"
  | "interventions"
  // Rewards
  | "reward-system"
  | "real-life-rewards"
  | "in-game-rewards"
  // Legal
  | "compliance"
  | "privacy-security"
  | "legal-risks"
  // Business Operations
  | "revenue"
  | "funding-rounds"
  | "exits"
  // Go-To-Market
  | "engagement"
  | "gamification"
  | "gtm-strategy"
  | "gtm-channels"
  | "gtm-branding"
  // Case Studies
  | "kcps-state-of-education"
  | "kcps-overview"
  | "kcps-events"
  | "kcps-narratives"
  | "kcps-personas"
  | "kcps-special-ed"
  | "kcps-engagement"
  | "kcps-classroom-management"
  | "kcps-lessons"
  | "kcps-recommendations"
  // Game Mechanics
  | "game-overview"
  | "game-currencies"
  | "game-progression"
  | "game-quests"
  | "game-battles"
  | "game-rewards"
  | "game-goals"
  | "game-rankings"
  | "game-recognition"
  | "game-personalization"
  | "game-profiles"
  | "game-stores"
  | "game-social"
  | "game-negative"
  | "game-history"
  | "game-games"
  | "game-expansions"
  | "game-journeys"
  // Monetization
  | "monetization-overview"
  | "monetization-subscriptions"
  | "monetization-payments"
  | "monetization-purchases"
  | "monetization-scholarships"
  | "monetization-sponsorships"
  // Communication
  | "comm-overview"
  | "comm-notifications"
  | "comm-parent"
  | "comm-auth"
  | "comm-accounts"
  // Research Extensions
  | "college-readiness"
  | "parent-engagement"
  | "social-media"
  | "social-dynamics"
  | "purpose-motivation"
  | "employee-satisfaction"
  | "survey-strategies"
  | "engagement-research"
  | "gaming-research"
  | "further-reading"
  // Design Notes
  | "sdt"
  | "design-decisions"
  | "motivation-theory"
  | "reward-research"
  | "ai-usage"
  | "inspirational-quotes"
  | "reward-examples"
  | "future-research"
  // Learning Science
  | "attention-science"
  | "feedback-systems"
  | "learning-reinforcement"
  | "learning-agility"
  | "progress-tracking"
  | "reward-psychology"
  | "purpose-mission"
  | "content-philosophy"
  | "health-focus"
  // Branding
  | "brand-logo"
  | "brand-presentation"
  | "brand-characters"

/**
 * Category mapping for sections
 */
export type SectionCategory =
  | "4eye"
  | "business"
  | "ideation"
  | "marketing"
  | "technology"
  | "research"
  | "competition"
  | "risk"
  | "funding"
  | "users"
  | "psychology"
  | "mental-health"
  | "rewards"
  | "legal"
  | "operations"
  | "gtm"
  | "case-studies"
  | "game-mechanics"
  | "monetization"
  | "communication"
  | "research-ext"
  | "design-notes"
  | "learning-science"
  | "branding"

/**
 * Section metadata for the registry
 */
export interface SectionMeta {
  id: SectionId
  title: string
  icon?: string
  category: SectionCategory
  description?: string
}
