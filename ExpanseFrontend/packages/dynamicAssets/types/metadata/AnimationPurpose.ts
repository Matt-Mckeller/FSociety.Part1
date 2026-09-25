/**
 * Structured purpose information for animations
 */
export interface AnimationPurpose {
  /** Primary use case description */
  primary: string

  /** Categorized use cases with specific examples */
  categories: {
    [category: string]: string[]
  }

  /** Context where this animation is most effective */
  contexts?: string[]

  /** Recommended placement/timing */
  recommendations?: string[]
}
