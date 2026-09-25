/**
 * Expanse EDU Presentation Data Types
 */

export type SectionType =
  | "introduction"
  | "problem"
  | "goals"
  | "ux"
  | "market"
  | "growth"
  | "product"
  | "features"
  | "extensions"
  | "closing"

export type AudienceType =
  | "investor"
  | "educator"
  | "administrator"
  | "technical"
  | "general"

export type PriorityLevel = "critical" | "important" | "supporting" | "appendix"

export type SlideLayout = "default" | "section-header" | "quote" | "data"

export type ContentType =
  | "text"
  | "bullets"
  | "image"
  | "chart"
  | "diagram"
  | "quote"
  | "statistic"

export interface SlideContent {
  type: ContentType
  value: string | string[]
  emphasis?: boolean
  label?: string // Optional label/caption for images
}

export interface AssetReference {
  id: string
  type: "image" | "gif" | "chart"
  path: string
  alt?: string
}

export interface Slide {
  id: string
  slideNumber: number
  title: string
  subtitle?: string
  layout?: SlideLayout
  content: SlideContent[]
  notes?: string
  section: SectionType
  assets: AssetReference[]
  priority: PriorityLevel
  audiences: AudienceType[]
  estimatedTime?: number // seconds
  sensitive?: boolean
}

export interface PresentationSection {
  id: SectionType
  title: string
  description: string
  icon: string
  slideRange: [number, number]
  color: string
}

export interface PresentationVariant {
  id: string
  name: string
  description: string
  duration: string // Estimated duration
  slideNumbers: number[] // Slide numbers from full deck to include
  audience?: string // Target audience
}

export interface PresentationData {
  title: string
  subtitle: string
  author: string
  sections: PresentationSection[]
  slides: Slide[]
  variants: PresentationVariant[]
}
