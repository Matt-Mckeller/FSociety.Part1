/**
 * PLANNING APP TERMINOLOGY (Game-Themed)
 *
 * Standard Term     → Game Term      → Description
 * ──────────────────────────────────────────────────────────────
 * Vision/North Star → Legend         → Ultimate long-term vision
 * Multi-Qtr Strategy→ Campaign       → Strategic initiatives spanning months
 * Project           → Questline      → Thematic grouping of related quests
 * Epic              → Quest          → Major deliverable with clear outcome
 * Task              → Objective      → Specific work item to complete
 * Sub-task          → Action         → Atomic step within an objective
 * Milestone         → Checkpoint     → Progress marker / gate
 * Deliverable       → Artifact       → Tangible output produced
 * Completed         → Quest Complete → Status when finished
 */

// Re-export Expanse EDU financial types
export * from "./expanseEdu"

// Re-export Strategic Focus types
export * from "./strategicFocus"

// ============================================================================
// GAME-THEMED HIERARCHY TYPES
// ============================================================================

// Status types
export type QuestStatus =
  | "not-started"
  | "in-progress"
  | "quest-complete"
  | "blocked"
  | "paused"
  | "cancelled"
  | "concept"
export type ObjectiveStatus = "todo" | "in-progress" | "done" | "blocked"
export type CheckpointStatus = "upcoming" | "reached" | "missed"

// Quest categorization for wiki organization (Planning/Development/Operations)
export type QuestCategory = "planning" | "development" | "operations"

// Complexity points (Fibonacci scale)
export type ComplexityPoints = 1 | 2 | 3 | 5 | 9 | 18 | 81

/**
 * Legend - The ultimate vision / north star
 * Example: "Gamification of Learning, Education, Work, and Life"
 */
export interface Legend {
  id: string
  title: string
  subtitle?: string
  description: string
  icon?: string // Emoji or icon name
  color: string
  createdDate: string
}

/**
 * PrimaryGoal - The main strategic goal under the Legend
 * Example: "Build a Trillion-Dollar Education Empire"
 */
export interface PrimaryGoal {
  id: string
  title: string
  description: string
  icon?: string
  color: string
  targetDate?: string
}

/**
 * CampaignGoal - Strategic goal for a campaign
 */
export interface CampaignGoal {
  id: string
  description: string
  timeframe: "short" | "medium" | "long" // short = quarter, medium = year, long = vision
  status: "not-started" | "in-progress" | "achieved"
  storylineIds?: string[] // Optional: link to related storylines
}

/**
 * Campaign - Business/Initiative grouping
 * Example: "Education Business", "Marketing Business"
 */
export interface Campaign {
  id: string
  legendId?: string // Optional link to legend
  title: string
  description: string
  currentStatusDescription?: string // Manual status summary of current progress
  status: QuestStatus
  priority: "P1" | "P2" | "P3"
  color: string
  startDate: string
  targetDate: string | null // null = ongoing
  category: "business" | "personal"
  storylineIds: string[] // Which storylines belong to this campaign
  goals?: CampaignGoal[] // Strategic goals for this campaign
  xpReward?: number
  targetAllocation?: number // 0-100 percentage of resources (manual)
}

/**
 * Storyline - Product/Project that can span multiple campaigns
 * Example: "4eye", "1game", "4up"
 */
export interface Storyline {
  id: string
  name: string
  description: string
  status: QuestStatus
  priority: "P1" | "P2" | "P3"
  category: "business" | "personal"
  color: string
  icon: string
  campaignIds: string[] // Which campaigns this storyline serves
}

/**
 * StorylineWiki - Extended documentation for a storyline
 * Stored in separate files: /data/storylines/wiki/{storylineId}.json
 */
export interface StorylineWiki {
  storylineId: string
  lastUpdated: string

  // Rich HTML Overview (AI-generated)
  overview?: {
    html: string // AI-generated HTML content with MUI styling
    summary?: string // Plain text for cards/previews
  }

  // Storyline-specific goals
  goals?: StorylineGoal[]

  // Component documentation with Storybook integration
  components?: StorylineComponent[]

  // Structured sections organized by category (P/D/O tabs)
  planningSections?: StorylineSection[]
  developmentSections?: StorylineSection[]
  operationsSections?: StorylineSection[]

  // Custom HTML sections (for additional documentation)
  customSections?: StorylineCustomSection[]

  // Notes/reminders
  notes?: string
}

export interface StorylineGoal {
  id: string
  title: string
  description?: string
  timeframe: "short" | "medium" | "long"
  status: "not-started" | "in-progress" | "complete"
  linkedQuestIds?: string[]
}

export interface StorylineComponent {
  id: string
  name: string
  description?: string
  storybookUrl?: string // Full URL to Storybook story
  previewImageUrl?: string // Static preview image
  status: "concept" | "in-progress" | "complete" | "deprecated"
}

export interface StorylineCustomSection {
  id: string
  title: string
  html: string
  order: number
}

/**
 * @deprecated Use Storyline instead
 * Questline is now an alias for Storyline (kept for backward compatibility)
 */
export type Questline = Storyline

/**
 * @deprecated Use Storyline instead
 * Project is now an alias for Storyline (kept for backward compatibility)
 */
export type Project = Storyline

/**
 * StorylineSection - Structured documentation sections organized by category
 * Used for Planning/Development/Operations tabs in wiki view
 */
export interface StorylineSection {
  id: string
  title: string
  html: string
  order: number
  category: QuestCategory
}

/**
 * Quest - Major deliverable within a storyline
 * Example: "4Eye MVP Definition", "4Eye Core Experience"
 */
export interface Quest {
  id: string
  storylineId: string // Parent storyline
  questlineId?: string // Deprecated but kept for backward compatibility
  title: string
  description: string
  status: QuestStatus
  priority: "P1" | "P2" | "P3"
  targetDate: string | null // null = TBD
  category?: QuestCategory // Optional P/D/O categorization
  color?: string
  successCriteria?: string[]
  xpReward?: number
}

/**
 * Objective - Specific work item (formerly Task)
 * Example: "Set up AI training pipeline"
 */
export interface Objective {
  id: string
  questId: string // Parent quest
  questlineId?: string // Optional organizational tag
  title: string
  description?: string
  priority: "P1" | "P2" | "P3"
  status: ObjectiveStatus
  dueDate?: string | null
  tags: string[]
  complexity?: ComplexityPoints
  xpReward?: number
  dailyWeight?: number
  weeklyWeight?: number
  dailyWeightDate?: string
  weeklyWeightDate?: string
}

/**
 * Action - Atomic step within an objective (formerly Sub-task)
 * Example: "Configure prompts"
 */
export interface Action {
  id: string
  objectiveId: string // Parent objective
  title: string
  status: "todo" | "done"
  xpReward?: number
}

/**
 * Checkpoint - Progress marker (formerly Milestone)
 * Example: "4UP MVP Live - Jan 26"
 */
export interface Checkpoint {
  id: string
  questId?: string
  campaignId?: string
  storylineId?: string
  questlineId?: string // Deprecated but kept for backward compatibility
  title: string
  targetDate: string | null // null = TBD
  status: CheckpointStatus
  description?: string
  category?: "business" | "personal"
}

/**
 * Artifact - Tangible output (formerly Deliverable)
 * Example: "Working content generator"
 */
export interface Artifact {
  id: string
  questId: string
  title: string
  description?: string
  type: "code" | "document" | "design" | "deployment" | "other"
  status: "planned" | "in-progress" | "delivered"
  url?: string
}

// ============================================================================
// TIMELINE / JOURNEY TYPES
// ============================================================================

/**
 * JourneyEvent - Events on the journey map
 */
export interface JourneyEvent {
  id: string
  date: string
  title: string
  type:
    | "checkpoint"
    | "deadline"
    | "quest-complete"
    | "artifact"
    | "milestone"
    | "goal" // milestone/goal for backward compat
  storylineId?: string | null
  questId?: string | null
  projectId?: string | null // Deprecated but kept for backward compatibility
  status: "completed" | "in-progress" | "planned"
  description?: string
  xpReward?: number
}

// Critical Deadline - Absolute requirements with hard deadlines
export interface CriticalDeadlineTarget {
  title: string
  description: string
  metric: string
}

export interface CriticalDeadline {
  id: string
  title: string
  deadline: string // ISO date
  certaintyRequired: number // 0-100, percentage certainty required
  status: "critical" | "on-track" | "at-risk" | "achieved"
  description: string
  minimumTarget: CriticalDeadlineTarget
  idealTarget: CriticalDeadlineTarget
  linkedPriorities: string[] // IDs of linked priorities
}

export interface Priority {
  id: string
  title: string
  description?: string
  projectId: string | null
  dailyWeight?: number | null // 1-100 relative scale (100 = highest priority), null = undetermined
  weeklyWeight?: number | null // 1-100 relative scale (100 = highest priority), null = undetermined
  monthlyWeight?: number | null // 1-100 relative scale (100 = highest priority), null = undetermined
  yearlyWeight?: number | null // 1-100 relative scale (100 = highest priority), null = undetermined
  dailyWeightDate?: string // ISO date when set
  weeklyWeightDate?: string // ISO week start date
  monthlyWeightDate?: string // ISO month when set
  yearlyWeightDate?: string // ISO year when set
}

export interface Priorities {
  criticalDeadlines?: CriticalDeadline[]
  "urgent-important": Priority[]
  "important-not-urgent": Priority[]
  "ongoing-guidelines": string[] // deprecated, use operating-principles
  "operating-principles": OperatingPrinciple[]
}

// Operating Principle types
export type OperatingPrincipleType =
  | "rule"
  | "habit"
  | "principle"
  | "sequence"
  | "optimization"

export interface OperatingPrinciple {
  id: string
  title: string
  description?: string
  type: OperatingPrincipleType
  weight: number // 1-100, higher = more important
  icon?: string // emoji
}

// Journal types
export interface JournalEntry {
  date: string // ISO date
  notes: string // markdown content
  questions: string[]
  decisions: string[]
  ideas: string[]
}

export interface Journal {
  entries: JournalEntry[]
}

// Roadmap types (disconnected from project data)
export interface RoadmapPhase {
  id: string
  name: string
  projectId?: string // optional reference
  startMonth: string // "2026-01"
  endMonth: string // "2026-03"
  color: string
  category?: "business" | "personal"
}

export type RoadmapMilestoneStatus =
  | "planned"
  | "in-progress"
  | "on-track"
  | "completed"
  | "needs-replanning"
  | "missed"

export type RoadmapMilestoneType = "release" | "deadline"

export type RoadmapFeaturePriority = "mvp" | "post-mvp" | "nice-to-have"

export type RoadmapReleaseStage =
  | "planning"
  | "development"
  | "testing"
  | "launched"

export type RoadmapEffortSize = "xs" | "s" | "m" | "l" | "xl"

export interface RoadmapFeature {
  id: string
  title: string
  description?: string
  targetDate?: string
  status: RoadmapMilestoneStatus
  priority: RoadmapFeaturePriority
  effort?: RoadmapEffortSize
}

export interface RoadmapProjectRelease {
  id: string
  title: string
  date: string
  type: RoadmapMilestoneType
  description?: string
  linkedFeatures?: string[] // feature ids

  // Stage tracking
  stage: RoadmapReleaseStage
  stageProgress?: number // 0-100 within current stage

  // Value context
  valueHighlights?: string[] // Key value pieces for users
  focusArea?: string // Why this release, what's the focus
  rationale?: string // Why this is prioritized now

  // Resources
  effort?: RoadmapEffortSize
}

export interface RoadmapProject {
  id: string
  name: string
  color: string
  category: "business" | "personal"
  description?: string
  features: RoadmapFeature[]
  releases: RoadmapProjectRelease[]
}

// Legacy milestone type (for backward compatibility)
export interface RoadmapMilestone {
  id: string
  title: string
  phaseId?: string
  targetDate: string // "2026-01-15" full date
  description?: string
  status?: RoadmapMilestoneStatus
  category?: "business" | "personal"
  type?: RoadmapMilestoneType
}

export interface OngoingItem {
  id: string
  title: string
  description: string
  category: "business" | "personal"
}

export interface NavigationalVariable {
  id: string
  title: string
  description?: string
  type: "advantage" | "opportunity" | "strategy" | "insight"
}

export interface Roadmap {
  phases: RoadmapPhase[]
  milestones: RoadmapMilestone[]
  projects?: RoadmapProject[] // New hierarchical structure
  ongoing?: OngoingItem[]
  navigationalVariables?: NavigationalVariable[]
}

// Financial types
export interface CashAccount {
  name: string
  balance: number
}

export interface CreditAccount {
  name: string
  available: number
  limit: number
}

/** Historical context for why the burn number looks the way it does */
export interface IncentiveHistory {
  priorBurn: number // what monthly spend used to be
  summary: string // short line, shown in tooltips
  detail: string // the longer story behind the drop
  points?: { text: string; worked: boolean }[] // broken out, worked = the incentive did its job
}

/** What's in hand vs. what's being looked for, alongside funding options */
export interface ResourceStatus {
  label: string
  status: "have" | "lf" | "found"
  value: string // "∞", "LF", "Found (?)"
  note?: string
}

export interface CurrentFinancials {
  cash?: number // omit to derive from cashAccounts
  credit?: number // omit to derive from creditAccounts
  monthlyBurn: number // numeric fallback / worst case, used for runway math
  monthlyBurnDisplay?: string // overrides the burn figure when it isn't a single number
  monthlyBurnRange?: { min: number; max: number }
  monthlyBurnNote?: string // caption under the burn figure
  cashDisplayNote?: string // caption under the cash figure
  creditDisplay?: string // overrides the credit figure
  creditNote?: string // caption under the credit figure
  cashAccounts?: CashAccount[]
  creditAccounts?: CreditAccount[]
  incentiveHistory?: IncentiveHistory
}

export interface SpendingCategory {
  category: "essentials" | "business" | "discretionary"
  thisMonth: number
  average: number
}

export interface ProjectRevenue {
  projectId: string
  potentialIncome: number // monthly potential
  potentialIncomeDate: string | null // "2026-03" target
  potentialIncomeScale: "low" | "medium" | "high"
}

export interface FundingOption {
  id: string
  name: string
  description: string
  type:
    | "vc"
    | "crowdfunding"
    | "revenue"
    | "grants"
    | "angel"
    | "bootstrap"
    | "incubator"
    | "wealthy-partner"
  potentialAmount: string // e.g. "$1M-$10M", "$50K-$500K"
  timeToFunds: string // e.g. "3-6 months", "1-2 months"
  pros: string[]
  cons: string[]
  status: "exploring" | "in-progress" | "ready" | "not-started"
  priority: number // 1-5, 1 being highest
  deadlines?: string[] // Upcoming application deadlines
}

export interface Financials {
  current: CurrentFinancials
  spending: SpendingCategory[]
  projectRevenue: ProjectRevenue[]
  fundingOptions?: FundingOption[]
  fundingGoal?: string
  resources?: ResourceStatus[]
}

// Q&A types for tracking open questions and decisions
export type QuestionStatus = "open" | "answered" | "deferred" | "exploring"
export type QuestionCategory =
  | "strategy"
  | "architecture"
  | "priority"
  | "financial"
  | "personal"
  | "timeline"

export interface Question {
  id: string
  question: string
  context?: string // background/why this matters
  category: QuestionCategory
  status: QuestionStatus
  projectIds?: string[] // related projects
  createdDate: string // ISO date
  answeredDate?: string // ISO date when answered
  answer?: string // the decision/answer
  reasoning?: string // why this answer
  implications?: string[] // what this means for the plan
  tags?: string[]
}

export interface QuestionsData {
  questions: Question[]
}

// ============================================================================
// DECISION & BUSINESS VALUE TYPES
// ============================================================================

export type DecisionCategory =
  | "launch-order"
  | "company-structure"
  | "architecture"
  | "priority"
  | "resource"
  | "scope"
  | "strategy"
export type DecisionStatus = "active" | "superseded" | "under-review"
export type ConfidenceLevel = "high" | "medium" | "low"

export interface Alternative {
  option: string
  pros: string[]
  cons: string[]
  rejected: boolean
  reason?: string
}

export interface Decision {
  id: string
  title: string
  decision: string
  category: DecisionCategory
  status: DecisionStatus
  decisionDate: string
  confidenceLevel: ConfidenceLevel
  reasoning: string
  alternatives: Alternative[]
  impactedProjects: string[]
  linkedQuestionIds?: string[]
  implications?: string[]
  reviewDate?: string
  tags?: string[]
}

export interface DecisionsData {
  decisions: Decision[]
}

export type SynergyStrength = "strong" | "moderate" | "weak"
export type SynergyDirection = "provides-to" | "receives-from" | "bidirectional"
export type RevenueModel = "direct" | "indirect" | "supporting" | "long-term"
export type EffortEstimate = "low" | "medium" | "high" | "unknown"

export interface Synergy {
  targetProjectId: string
  benefit: string
  strength: SynergyStrength
  direction: SynergyDirection
}

export interface Dependency {
  sourceProjectId: string
  requirement: string
  critical: boolean
}

export interface BusinessValue {
  projectId: string
  valueProposition: string
  valueTiers: string[]
  revenueModel: RevenueModel
  timeToRevenue: string
  effortEstimate: EffortEstimate
  priorityFeatures: string[]
  concerns: string[]
  synergies: Synergy[]
  dependencies: Dependency[]
  metrics: string[]
}

export interface BusinessValueData {
  businessValues: BusinessValue[]
}

// ============================================================================
// STRATEGIC COMPASS TYPES
// ============================================================================

export interface CurrentFocusArea {
  id: string
  title: string
  description: string
  linkedProjectId?: string
}

export interface ValueCategory {
  label: string
  icon: string
  items: string[]
}

export interface Differentiator {
  id: string
  title: string
  description: string
}

export interface FutureItem {
  id: string
  title: string
  description: string
}

export interface StrategicCompassData {
  currentFocusAreas: CurrentFocusArea[]
  productValueOfferings: Record<string, ValueCategory>
  humanImpact: Record<string, ValueCategory>
  businessMarketValue: string[]
  differentiators: Differentiator[]
  futureOnDeck: FutureItem[]
}
