export type ConfidenceLevel = "high" | "medium" | "low" | "unknown"
export type EngagementLevel = "high" | "medium" | "low"
export type ImpactLevel = "high" | "medium" | "low" | "unknown"
export type GoalPriority = "primary" | "secondary"

export interface ProfileField {
  field: string
  value: string
  confidence: ConfidenceLevel
}

export interface Interest {
  category: string
  items: string[]
  engagementLevel: EngagementLevel
  notes?: string
}

export interface TraumaEvent {
  event: string
  details: string
  impact: ImpactLevel
}

export interface Observation {
  date?: string
  observation: string
  tags?: string[]
}

export interface MentalStateAssessment {
  factor: string
  level: "high" | "medium" | "low"
  description: string
}

export interface CognitiveStyle {
  strengths: string[]
  processing: string
  memory: string
  possibleConditions: string[]
}

export interface CommunicationPreference {
  respondsWellTo: string[]
  strugglesWith: string[]
  optimalFormat: string[]
}

export interface PsychologicalProfile {
  mentalState: MentalStateAssessment[]
  cognitiveStyle: CognitiveStyle
  communicationPreferences: CommunicationPreference
  defensePatterns: string[]
}

export interface RecipientProfile {
  name: string
  avatar?: string
  basicInfo: ProfileField[]
  professional: ProfileField[]
  psychological: PsychologicalProfile
  interests: Interest[]
  lifeGoals: string[]
  traumaHistory: TraumaEvent[]
  observations: Observation[]
  recommendations: string[]
}

export interface Goal {
  id: string
  title: string
  description: string
  priority: GoalPriority
  order: number
}

export interface Artifact {
  id: string
  title: string
  completed: boolean
}

export interface ContentRequirement {
  id: string
  requirement: string
  completed: boolean
  priority: "high" | "medium" | "low"
}

export interface PsychologicalApproach {
  step: number
  title: string
  description: string
}

export interface CommunicationStrategy {
  contentRequirements: ContentRequirement[]
  psychologicalApproach: PsychologicalApproach[]
  pipelines: string[]
  guards: string[]
}

export interface RelationshipContext {
  interactionHistory: string[]
  currentDynamic: {
    sender: string
    recipient: string
  }
  potentialOutcomes: {
    scenario: string
    description: string
  }[]
}

export interface ContentBlock {
  id: string
  type:
    | "reframe"
    | "story"
    | "analogy"
    | "context"
    | "implementation"
    | "callout"
    | "list"
    | "transformation"
    | "insight"
    | "meta"
    | "credentials"
    | "vulnerability"
    | "ambition"
  label: string
  content: string
  engagementHooks?: ("gaming" | "anime" | "visual" | "story")[]
  tags?: string[]
  psychApproachSteps?: number[]
  imagePlaceholder?: {
    description: string
    suggestedType:
      | "diagram"
      | "illustration"
      | "chart"
      | "metaphor"
      | "comparison"
  }
  /** Key referencing a pre-built image component */
  imageKey?:
    | "steppingStonesTimeline"
    | "trappedVsFreedom"
    | "sharedInterestsBond"
    | "marketRarityChart"
    | "pathComparison"
    | "fertilityTimeline"
  transformation?: {
    before: {
      title: string
      mindset: string
      beliefs: string[]
      emotions: string[]
      outcome: string
    }
    after: {
      title: string
      mindset: string
      beliefs: string[]
      emotions: string[]
      outcome: string
    }
    catalyst: string
    steps?: {
      label: string
      description: string
    }[]
  }
}

export interface MessageDraft {
  id: string
  title: string
  theme: string
  status: "draft" | "ready" | "sent"
  content: string
  keyPoints?: string[]
  contentBlocks?: ContentBlock[]
  addressedRequirements?: string[]
  addressedPsychSteps?: number[]
}

export interface SessionMetadata {
  sessionId: string
  dateCreated: string
  lastUpdated: string
  status: "draft" | "active" | "completed"
  deliveryMethod: string
  relatedProject?: string
}

export interface CommunicationSession {
  metadata: SessionMetadata
  goals: Goal[]
  artifacts: Artifact[]
  recipientProfile: RecipientProfile
  strategy: CommunicationStrategy
  relationshipContext: RelationshipContext
  messageDrafts: MessageDraft[]
}

// Quiz Types
export type QuizQuestionType = "multiple-choice" | "true-false" | "reflection"

export interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
}

export interface QuizQuestion {
  id: string
  type: QuizQuestionType
  question: string
  options?: QuizOption[]
  correctAnswer?: boolean // For true/false questions
  explanation: string
  relatedMessageId: string
  relatedBlockId?: string
  psychApproachStep?: number
  difficulty: "easy" | "medium" | "hard"
}

export interface Quiz {
  id: string
  title: string
  description: string
  questions: QuizQuestion[]
  passingScore: number // percentage (0-100)
}

export interface QuizAttempt {
  quizId: string
  answers: Record<string, string> // questionId -> selected option id or "true"/"false"
  score: number
  completedAt: string
}
