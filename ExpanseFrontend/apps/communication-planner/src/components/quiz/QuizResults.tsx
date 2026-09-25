"use client"

import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Chip,
  alpha,
  useTheme,
} from "@mui/material"
import {
  EmojiEvents,
  RestartAlt,
  CheckCircle,
  Cancel,
  TrendingUp,
} from "@mui/icons-material"
import { QuizQuestion } from "@/types"

interface QuizResultsProps {
  score: number
  totalQuestions: number
  passingScore: number
  passed: boolean
  answers: Record<string, string>
  questions: QuizQuestion[]
  onRestart: () => void
}

export function QuizResults({
  score,
  totalQuestions,
  passingScore,
  passed,
  answers,
  questions,
  onRestart,
}: QuizResultsProps) {
  const theme = useTheme()

  const correctCount = questions.filter((q) => {
    const userAnswer = answers[q.id]
    if (q.type === "multiple-choice") {
      const correctOption = q.options?.find((o) => o.isCorrect)
      return userAnswer === correctOption?.id
    } else if (q.type === "true-false") {
      return userAnswer === String(q.correctAnswer)
    }
    return false
  }).length

  const getFeedbackMessage = () => {
    if (score >= 90) {
      return {
        title: "Excellent! 🌟",
        message: "You have a deep understanding of these concepts. The reframes and insights have clearly landed.",
        color: theme.palette.success.main,
      }
    }
    if (score >= 70) {
      return {
        title: "Well Done! 👏",
        message: "You've grasped the key concepts. Consider reviewing any missed questions to reinforce your understanding.",
        color: theme.palette.success.main,
      }
    }
    if (score >= 50) {
      return {
        title: "Getting There! 💪",
        message: "You understand some concepts but could benefit from another read-through. Focus on the explanations for questions you missed.",
        color: theme.palette.warning.main,
      }
    }
    return {
      title: "Keep Learning! 📚",
      message: "The material may need more time to sink in. Try re-reading the content blocks and take the quiz again.",
      color: theme.palette.error.main,
    }
  }

  const feedback = getFeedbackMessage()

  // Group questions by message
  const questionsByMessage = questions.reduce((acc, q) => {
    const msgId = q.relatedMessageId
    if (!acc[msgId]) acc[msgId] = []
    acc[msgId].push(q)
    return acc
  }, {} as Record<string, QuizQuestion[]>)

  return (
    <Box sx={{ textAlign: "center" }}>
      {/* Score Display */}
      <Box
        sx={{
          py: 4,
          px: 3,
          mb: 4,
          borderRadius: 3,
          background: passed
            ? `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.1)} 0%, ${alpha(theme.palette.success.light, 0.05)} 100%)`
            : `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.1)} 0%, ${alpha(theme.palette.warning.light, 0.05)} 100%)`,
          border: `2px solid ${alpha(passed ? theme.palette.success.main : theme.palette.warning.main, 0.3)}`,
        }}
      >
        <EmojiEvents
          sx={{
            fontSize: 56,
            color: passed ? "success.main" : "warning.main",
            mb: 1,
          }}
        />

        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            color: feedback.color,
            mb: 1,
          }}
        >
          {score}%
        </Typography>

        <Typography variant="h5" sx={{ color: "text.primary", mb: 1 }}>
          {feedback.title}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 2, maxWidth: 450, mx: "auto" }}>
          {feedback.message}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
          <Chip
            icon={<CheckCircle sx={{ fontSize: 18 }} />}
            label={`${correctCount} Correct`}
            sx={{
              bgcolor: alpha(theme.palette.success.main, 0.15),
              color: "success.dark",
              fontWeight: 600,
            }}
          />
          <Chip
            icon={<Cancel sx={{ fontSize: 18 }} />}
            label={`${totalQuestions - correctCount} Incorrect`}
            sx={{
              bgcolor: alpha(theme.palette.error.main, 0.15),
              color: "error.dark",
              fontWeight: 600,
            }}
          />
          <Chip
            icon={<TrendingUp sx={{ fontSize: 18 }} />}
            label={passed ? "Passed!" : `Need ${passingScore}% to pass`}
            sx={{
              bgcolor: passed
                ? alpha(theme.palette.success.main, 0.15)
                : alpha(theme.palette.grey[500], 0.15),
              color: passed ? "success.dark" : "text.secondary",
              fontWeight: 600,
            }}
          />
        </Box>
      </Box>

      {/* Question Breakdown by Message */}
      <Typography variant="h6" sx={{ mb: 2, color: "text.primary", textAlign: "left" }}>
        Question Breakdown
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {Object.entries(questionsByMessage).map(([msgId, msgQuestions]) => {
          const msgCorrect = msgQuestions.filter((q) => {
            const userAnswer = answers[q.id]
            if (q.type === "multiple-choice") {
              const correctOption = q.options?.find((o) => o.isCorrect)
              return userAnswer === correctOption?.id
            } else if (q.type === "true-false") {
              return userAnswer === String(q.correctAnswer)
            }
            return false
          }).length

          const msgNum = msgId.replace("m", "")
          const msgPercent = Math.round((msgCorrect / msgQuestions.length) * 100)

          return (
            <Grid item xs={12} sm={4} key={msgId}>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  textAlign: "center",
                  borderColor: msgPercent >= 70
                    ? alpha(theme.palette.success.main, 0.5)
                    : alpha(theme.palette.warning.main, 0.5),
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  Message {msgNum}
                </Typography>
                <Typography variant="h5" sx={{ color: "text.primary", fontWeight: 600 }}>
                  {msgCorrect}/{msgQuestions.length}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: msgPercent >= 70 ? "success.main" : "warning.main",
                    fontWeight: 500,
                  }}
                >
                  {msgPercent}%
                </Typography>
              </Paper>
            </Grid>
          )
        })}
      </Grid>

      {/* Individual Question Results */}
      <Typography variant="h6" sx={{ mb: 2, color: "text.primary", textAlign: "left" }}>
        Question Details
      </Typography>

      <Box sx={{ textAlign: "left" }}>
        {questions.map((q, index) => {
          const userAnswer = answers[q.id]
          let isCorrect = false

          if (q.type === "multiple-choice") {
            const correctOption = q.options?.find((o) => o.isCorrect)
            isCorrect = userAnswer === correctOption?.id
          } else if (q.type === "true-false") {
            isCorrect = userAnswer === String(q.correctAnswer)
          }

          return (
            <Paper
              key={q.id}
              variant="outlined"
              sx={{
                p: 2,
                mb: 1.5,
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
                borderColor: isCorrect
                  ? alpha(theme.palette.success.main, 0.4)
                  : alpha(theme.palette.error.main, 0.4),
                bgcolor: isCorrect
                  ? alpha(theme.palette.success.main, 0.03)
                  : alpha(theme.palette.error.main, 0.03),
              }}
            >
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: isCorrect
                    ? alpha(theme.palette.success.main, 0.15)
                    : alpha(theme.palette.error.main, 0.15),
                  flexShrink: 0,
                }}
              >
                {isCorrect ? (
                  <CheckCircle sx={{ fontSize: 18, color: "success.main" }} />
                ) : (
                  <Cancel sx={{ fontSize: 18, color: "error.main" }} />
                )}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 500 }}>
                  Q{index + 1}: {q.question}
                </Typography>
                {!isCorrect && (
                  <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.5 }}>
                    Review: Message {q.relatedMessageId.replace("m", "")} → {q.relatedBlockId || "General"}
                  </Typography>
                )}
              </Box>
              <Chip
                label={q.difficulty}
                size="small"
                sx={{
                  fontSize: "0.65rem",
                  height: 20,
                  textTransform: "capitalize",
                  bgcolor: alpha(theme.palette.grey[500], 0.1),
                }}
              />
            </Paper>
          )
        })}
      </Box>

      {/* Restart Button */}
      <Box sx={{ mt: 4 }}>
        <Button
          variant="outlined"
          size="large"
          startIcon={<RestartAlt />}
          onClick={onRestart}
          sx={{
            px: 4,
            borderColor: "primary.main",
            color: "primary.main",
            "&:hover": {
              borderColor: "primary.dark",
              bgcolor: alpha(theme.palette.primary.main, 0.05),
            },
          }}
        >
          Retake Quiz
        </Button>
      </Box>
    </Box>
  )
}
