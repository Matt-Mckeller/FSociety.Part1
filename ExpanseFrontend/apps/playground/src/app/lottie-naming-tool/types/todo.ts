export interface TimelineFrame {
  frame: number
  time: string
  description: string
  activeElements: string[]
}

export interface DesignRecommendation {
  category: "Theming" | "Animation" | "Performance" | "Visual" | "Accessibility"
  priority: "high" | "medium" | "low"
  suggestion: string
  implementation?: string
  reasoning?: string
}
