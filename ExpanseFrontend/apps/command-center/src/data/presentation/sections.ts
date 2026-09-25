/**
 * Expanse EDU Presentation Sections
 */
import type { PresentationSection } from "./types"

export const presentationSections: PresentationSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    description: "Title, founder intro, and opening",
    icon: "👋",
    slideRange: [1, 6],
    color: "#3B82F6",
  },
  {
    id: "problem",
    title: "Problems & Opportunities",
    description: "Engagement crisis and mental health challenges",
    icon: "🎯",
    slideRange: [7, 16],
    color: "#EF4444",
  },
  {
    id: "goals",
    title: "Purpose & Goals",
    description: "Key objectives and desired outcomes",
    icon: "🏆",
    slideRange: [17, 24],
    color: "#10B981",
  },
  {
    id: "ux",
    title: "User Experience",
    description: "Product flow and core components",
    icon: "✨",
    slideRange: [25, 34],
    color: "#8B5CF6",
  },
  {
    id: "market",
    title: "Scale & Market",
    description: "Audience size, profit potential, competition",
    icon: "📊",
    slideRange: [35, 50],
    color: "#F59E0B",
  },
  {
    id: "growth",
    title: "Growth & Marketing",
    description: "Development roadmap and revenue model",
    icon: "🚀",
    slideRange: [51, 58],
    color: "#06B6D4",
  },
  {
    id: "product",
    title: "Product Deep Dive",
    description: "Rewards, quests, progression systems",
    icon: "🎮",
    slideRange: [59, 76],
    color: "#EC4899",
  },
  {
    id: "features",
    title: "Extended Features",
    description: "Advanced gamification and social features",
    icon: "⚡",
    slideRange: [77, 92],
    color: "#6366F1",
  },
  {
    id: "extensions",
    title: "Extensions & Future",
    description: "Additional concepts and mockups",
    icon: "🔮",
    slideRange: [93, 100],
    color: "#14B8A6",
  },
  {
    id: "closing",
    title: "Closing",
    description: "Recap, competition, Q&A, sources",
    icon: "📝",
    slideRange: [101, 112],
    color: "#64748B",
  },
]

export const getSectionForSlide = (
  slideNumber: number,
): PresentationSection | undefined => {
  return presentationSections.find(
    (section) =>
      slideNumber >= section.slideRange[0] &&
      slideNumber <= section.slideRange[1],
  )
}

export const getSectionById = (id: string): PresentationSection | undefined => {
  return presentationSections.find((section) => section.id === id)
}
