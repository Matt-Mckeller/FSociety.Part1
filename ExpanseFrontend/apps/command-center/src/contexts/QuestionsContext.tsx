/**
 * QuestionsContext - Centralized state for strategic questions
 * Used by: QuestionsView
 */
import { createContext, useContext, useMemo, ReactNode } from "react"
import type { Question, QuestionStatus, QuestionCategory } from "../types"

// Import data
import questionsData from "../data/questions.json"

interface QuestionsContextValue {
  questions: Question[]

  // Selectors
  getQuestionById: (id: string) => Question | undefined
  getQuestionsByProject: (projectId: string) => Question[]
  getQuestionsByCategory: (category: QuestionCategory) => Question[]
  getQuestionsByStatus: (status: QuestionStatus) => Question[]
  getOpenQuestions: () => Question[]
  getAnsweredQuestions: () => Question[]
  getQuestionsByTag: (tag: string) => Question[]

  // Stats
  getQuestionStats: () => {
    total: number
    open: number
    exploring: number
    answered: number
    deferred: number
  }
}

const QuestionsContext = createContext<QuestionsContextValue | null>(null)

export function QuestionsProvider({ children }: { children: ReactNode }) {
  const questions = (questionsData.questions || []) as Question[]

  const value = useMemo<QuestionsContextValue>(
    () => ({
      questions,

      getQuestionById: (id) => questions.find((q) => q.id === id),

      getQuestionsByProject: (projectId) =>
        questions.filter((q) => q.projectIds?.includes(projectId)),

      getQuestionsByCategory: (category) =>
        questions.filter((q) => q.category === category),

      getQuestionsByStatus: (status) =>
        questions.filter((q) => q.status === status),

      getOpenQuestions: () =>
        questions.filter(
          (q) => q.status === "open" || q.status === "exploring",
        ),

      getAnsweredQuestions: () =>
        questions.filter((q) => q.status === "answered"),

      getQuestionsByTag: (tag) =>
        questions.filter((q) => q.tags?.includes(tag)),

      getQuestionStats: () => ({
        total: questions.length,
        open: questions.filter((q) => q.status === "open").length,
        exploring: questions.filter((q) => q.status === "exploring").length,
        answered: questions.filter((q) => q.status === "answered").length,
        deferred: questions.filter((q) => q.status === "deferred").length,
      }),
    }),
    [questions],
  )

  return (
    <QuestionsContext.Provider value={value}>
      {children}
    </QuestionsContext.Provider>
  )
}

export function useQuestions() {
  const context = useContext(QuestionsContext)
  if (!context) {
    throw new Error("useQuestions must be used within a QuestionsProvider")
  }
  return context
}
