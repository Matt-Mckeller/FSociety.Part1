export interface QuizQuestion {
  id: number
  question: string
  type: "radio"
  options: string[]
  correct: string
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the suggested purpose statement for teams?",
    type: "radio",
    options: [
      "Maximize profit",
      "Ensure safe, fair, and timely support for every customer and partner",
      "Reduce handle time",
      "Increase sales",
    ],
    correct:
      "Ensure safe, fair, and timely support for every customer and partner",
  },
  {
    id: 2,
    question: "How many members should a pod have?",
    type: "radio",
    options: ["1-2", "3-5", "6-8", "10+"],
    correct: "3-5",
  },
  {
    id: 3,
    question: "Psychological safety increases idea-sharing and help-seeking.",
    type: "radio",
    options: ["True", "False"],
    correct: "True",
  },
  {
    id: 4,
    question: "Which AI technique improves prompt accuracy?",
    type: "radio",
    options: ["Critique then rewrite", "Upload docs for context", "Both"],
    correct: "Both",
  },
  {
    id: 5,
    question: "What is a Quick Win for training?",
    type: "radio",
    options: [
      "Hire more staff",
      "AI-enhanced reviews and role-specific variants",
      "Longer meetings",
      "More paperwork",
    ],
    correct: "AI-enhanced reviews and role-specific variants",
  },
  {
    id: 6,
    question: "Which metric measures training effectiveness?",
    type: "radio",
    options: ["Handle time", "Quiz pass rate", "Revenue", "Website traffic"],
    correct: "Quiz pass rate",
  },
  {
    id: 7,
    question: "What should pods do daily?",
    type: "radio",
    options: [
      "15-min standup",
      "Weekly report",
      "Monthly review",
      "Annual planning",
    ],
    correct: "15-min standup",
  },
  {
    id: 8,
    question: "What is a Culture Quick Win?",
    type: "radio",
    options: [
      "Strict enforcement",
      'Daily "Win of the Day" post',
      "Longer shifts",
      "More rules",
    ],
    correct: 'Daily "Win of the Day" post',
  },
]
