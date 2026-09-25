import type { ApplicationContext } from "./ApplicationContext"

/**
 * Context-specific metadata information
 */
export interface ContextSpecificMetaData {
  /** The application context (education, work, gamification, etc.) */
  context: ApplicationContext

  /** Primary use case for this context */
  primary: string

  useCaseExamples: string[]

  /** Specific recommendations for this context */
  recommendations?: string[]

  /** Specific recommendations for this context */
  tags: string[]
}
