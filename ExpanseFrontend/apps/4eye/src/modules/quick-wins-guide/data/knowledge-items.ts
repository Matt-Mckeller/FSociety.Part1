export interface KnowledgeItem {
  title: string
  detail: string
}

export const knowledgePrinciples: string[] = [
  "Bridge communication between business and software; align on goals, language, and constraints",
  "Anchor work in purpose (the WHY) to boost engagement, retention, and learning",
  "Psychological safety increases idea-sharing, improvement, and help-seeking",
]

export const knowledgeQuickWins: KnowledgeItem[] = [
  {
    title: "Add a one-page Purpose & Principles doc; place it on website and Teams",
    detail:
      "Create a clear, accessible reference that employees can find easily online and in daily tools, building shared understanding and alignment.",
  },
  {
    title: "Convert top 5 FAQs into visual guides and short demos",
    detail:
      "Transform frequently asked questions into easy-to-scan visuals and quick videos that reduce repetitive questions and speed up learning.",
  },
  {
    title:
      'Introduce "Write it down" norm: capture answers in chat or docs, not just audio',
    detail:
      "Establish a habit of documenting solutions in searchable formats so knowledge isn't lost to voice-only conversations and can benefit the whole team.",
  },
  {
    title: "Enable an AI Q&A assistant backed by updated documentation",
    detail:
      "Deploy an intelligent assistant that provides instant, accurate answers based on your latest materials, reducing wait times and manager load.",
  },
]
