export interface KPIItem {
  category: string
  metrics: string
}

export const kpiItems: KPIItem[] = [
  {
    category: "Training",
    metrics: "Quiz pass rates, time-to-proficiency, error rates",
  },
  {
    category: "Operations",
    metrics:
      "Handle time (call duration), first-contact resolution, error rates, backlog aging",
  },
  {
    category: "Culture",
    metrics: "eNPS, voluntary attrition, recognition participation",
  },
  {
    category: "Knowledge",
    metrics: "FAQ coverage, AI Q&A search success rate",
  },
]
