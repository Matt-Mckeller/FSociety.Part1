"use client"

import { useState, useCallback, useMemo } from "react"
import {
  Box,
  Paper,
  Typography,
  Collapse,
  IconButton,
  Button,
  Chip,
  LinearProgress,
  alpha,
  useTheme,
} from "@mui/material"
import {
  ExpandMore,
  ExpandLess,
  Quiz as QuizIcon,
  RestartAlt,
  CheckCircle,
  EmojiEvents,
} from "@mui/icons-material"
import { Quiz, QuizQuestion as QuizQuestionType, QuizAttempt } from "@/types"
import { QuizQuestion } from "./QuizQuestion"
import { QuizResults } from "./QuizResults"

interface QuizSectionProps {
  quiz: Quiz
}

type QuizState = "not-started" | "in-progress" | "completed"

export function QuizSection({ quiz }: QuizSectionProps) {
  const theme = useTheme()
  const [expanded, setExpanded] = useState(false)
  const [quizState, setQuizState] = useState<QuizState>("not-started")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showFeedback, setShowFeedback] = useState(false)
  const [attempts, setAttempts] = useState<QuizAttempt[]>([])

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const totalQuestions = quiz.questions.length

  // Calculate score
  const calculateScore = useCallback(() => {
    let correct = 0
    quiz.questions.forEach((q) => {
      const userAnswer = answers[q.id]
      if (q.type === "multiple-choice") {
        const correctOption = q.options?.find((o) => o.isCorrect)
        if (userAnswer === correctOption?.id) correct++
      } else if (q.type === "true-false") {
        if (userAnswer === String(q.correctAnswer)) correct++
      }
    })
    return Math.round((correct / totalQuestions) * 100)
  }, [answers, quiz.questions, totalQuestions])

  const score = useMemo(() => calculateScore(), [calculateScore])

  // Check if current answer is correct
  const isCurrentAnswerCorrect = useMemo(() => {
    if (!currentQuestion) return false
    const userAnswer = answers[currentQuestion.id]
    if (currentQuestion.type === "multiple-choice") {
      const correctOption = currentQuestion.options?.find((o) => o.isCorrect)
      return userAnswer === correctOption?.id
    } else if (currentQuestion.type === "true-false") {
      return userAnswer === String(currentQuestion.correctAnswer)
    }
    return false
  }, [answers, currentQuestion])

  const handleStartQuiz = () => {
    setQuizState("in-progress")
    setCurrentQuestionIndex(0)
    setAnswers({})
    setShowFeedback(false)
  }

  const handleSelectAnswer = (questionId: string, answerId: string) => {
    if (showFeedback) return // Don't allow changes after submitting
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }))
  }

  const handleSubmitAnswer = () => {
    setShowFeedback(true)
  }

  const handleNextQuestion = () => {
    setShowFeedback(false)
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      // Quiz completed
      const finalScore = calculateScore()
      const attempt: QuizAttempt = {
        quizId: quiz.id,
        answers,
        score: finalScore,
        completedAt: new Date().toISOString(),
      }
      setAttempts((prev) => [...prev, attempt])
      setQuizState("completed")
    }
  }

  const handleRestartQuiz = () => {
    setQuizState("not-started")
    setCurrentQuestionIndex(0)
    setAnswers({})
    setShowFeedback(false)
  }

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100
  const hasAnswer = currentQuestion && answers[currentQuestion.id]
  const bestScore = attempts.length > 0 ? Math.max(...attempts.map((a) => a.score)) : null
  const passed = score >= quiz.passingScore

  return (
    <Paper
      sx={{
        mt: 4,
        overflow: "hidden",
        border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
        bgcolor: alpha(theme.palette.primary.main, 0.02),
      }}
    >
      {/* Header - Always visible */}
      <Box
        onClick={() => setExpanded(!expanded)}
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          bgcolor: alpha(theme.palette.primary.main, 0.08),
          "&:hover": {
            bgcolor: alpha(theme.palette.primary.main, 0.12),
          },
          transition: "background-color 0.2s ease",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <QuizIcon sx={{ color: "primary.main", fontSize: 28 }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary" }}>
              📝 {quiz.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {totalQuestions} questions • ~{Math.ceil(totalQuestions * 0.8)} min
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {bestScore !== null && (
            <Chip
              icon={<EmojiEvents sx={{ fontSize: 16 }} />}
              label={`Best: ${bestScore}%`}
              size="small"
              sx={{
                bgcolor: bestScore >= quiz.passingScore
                  ? alpha(theme.palette.success.main, 0.15)
                  : alpha(theme.palette.warning.main, 0.15),
                color: bestScore >= quiz.passingScore
                  ? "success.dark"
                  : "warning.dark",
              }}
            />
          )}
          {quizState === "completed" && (
            <Chip
              icon={<CheckCircle sx={{ fontSize: 16 }} />}
              label="Completed"
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.success.main, 0.15),
                color: "success.dark",
              }}
            />
          )}
          <IconButton size="small">
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
      </Box>

      {/* Collapsed Content */}
      <Collapse in={expanded}>
        <Box sx={{ p: 3 }}>
          {/* Not Started State */}
          {quizState === "not-started" && (
            <Box sx={{ textAlign: "center", py: 3 }}>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 500, mx: "auto" }}>
                {quiz.description}
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3, flexWrap: "wrap" }}>
                <Chip
                  label={`${totalQuestions} Questions`}
                  variant="outlined"
                  sx={{ borderColor: "primary.light" }}
                />
                <Chip
                  label={`Passing: ${quiz.passingScore}%`}
                  variant="outlined"
                  sx={{ borderColor: "primary.light" }}
                />
                <Chip
                  label={`~${Math.ceil(totalQuestions * 0.8)} minutes`}
                  variant="outlined"
                  sx={{ borderColor: "primary.light" }}
                />
              </Box>

              <Button
                variant="contained"
                size="large"
                onClick={handleStartQuiz}
                sx={{
                  px: 4,
                  py: 1.5,
                  bgcolor: "primary.main",
                  "&:hover": { bgcolor: "primary.dark" },
                }}
              >
                Start Quiz
              </Button>

              {attempts.length > 0 && (
                <Typography variant="caption" display="block" sx={{ mt: 2, color: "text.secondary" }}>
                  You've completed this quiz {attempts.length} time{attempts.length > 1 ? "s" : ""}
                </Typography>
              )}
            </Box>
          )}

          {/* In Progress State */}
          {quizState === "in-progress" && currentQuestion && (
            <Box>
              {/* Progress Bar */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {Math.round(progress)}% Complete
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 4,
                      bgcolor: "primary.main",
                    },
                  }}
                />
              </Box>

              {/* Question */}
              <QuizQuestion
                question={currentQuestion}
                selectedAnswer={answers[currentQuestion.id]}
                onSelectAnswer={(answerId: string) => handleSelectAnswer(currentQuestion.id, answerId)}
                showFeedback={showFeedback}
                isCorrect={isCurrentAnswerCorrect}
              />

              {/* Actions */}
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
                {!showFeedback ? (
                  <Button
                    variant="contained"
                    onClick={handleSubmitAnswer}
                    disabled={!hasAnswer}
                    sx={{
                      bgcolor: "primary.main",
                      "&:hover": { bgcolor: "primary.dark" },
                    }}
                  >
                    Check Answer
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNextQuestion}
                    sx={{
                      bgcolor: "primary.main",
                      "&:hover": { bgcolor: "primary.dark" },
                    }}
                  >
                    {currentQuestionIndex < totalQuestions - 1 ? "Next Question" : "See Results"}
                  </Button>
                )}
              </Box>
            </Box>
          )}

          {/* Completed State */}
          {quizState === "completed" && (
            <QuizResults
              score={score}
              totalQuestions={totalQuestions}
              passingScore={quiz.passingScore}
              passed={passed}
              answers={answers}
              questions={quiz.questions}
              onRestart={handleRestartQuiz}
            />
          )}
        </Box>
      </Collapse>
    </Paper>
  )
}
