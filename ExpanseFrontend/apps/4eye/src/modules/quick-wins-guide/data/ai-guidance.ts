export interface AIGuidanceTip {
  label: string
  tip: string
}

export const aiGuidanceTips: AIGuidanceTip[] = [
  {
    label: "Collaborate",
    tip: "Treat AI like a collaborator: iterate and provide clear constraints",
  },
  {
    label: "Iterate",
    tip: "If the first result isn't right, specify changes and rationale; ask for a revision",
  },
  {
    label: "Guide",
    tip: "Guide outputs with goals, requirements, examples, tone/length, and critical context",
  },
  {
    label: "Clarify",
    tip: "Ask AI to ask clarifying questions before drafting to improve accuracy",
  },
  {
    label: "Context",
    tip: "Upload/source documents so AI can use real context",
  },
  {
    label: "Review",
    tip: "Close the loop: review, annotate corrections, and request an updated draft",
  },
]

export interface PromptTemplate {
  title: string
  prompt: string
}

export const promptTemplates: PromptTemplate[] = [
  {
    title: "Training Review",
    prompt:
      '"Provide feedback to improve training for call center reps in a transportation company. Optimize for clarity, brevity, structure, visuals, and learnability. Propose role-specific variants and a short quiz."',
  },
  {
    title: "Documentation Improvement",
    prompt:
      '"Rewrite the attached training to be more concise, well-organized, and formatted for readability and learning. Include headings, bullet lists, and a 10-question quiz with answers."',
  },
  {
    title: "Add Visuals & Flows",
    prompt:
      '"Suggest visuals and flowcharts that improve comprehension of the attached training. Provide 2–3 example diagrams with brief descriptions."',
  },
  {
    title: "Role-Specific Variants",
    prompt:
      '"Create training variants for: new agents, experienced agents, and team leads. Highlight differences in responsibilities, decision points, and escalation paths."',
  },
  {
    title: "Upload Context",
    prompt:
      '"List practical steps to improve culture quickly and sustainably in a remote call center environment. Prioritize psychological safety, recognition, and communication norms."',
  },
  {
    title: "Retention Improvement",
    prompt:
      '"Identify immediate and mid-term actions to improve employee retention. Include onboarding improvements, coaching programs, and reward structures."',
  },
]
