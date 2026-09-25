"use client"

import {
  Box,
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Chip,
  Collapse,
  alpha,
  useTheme,
} from "@mui/material"
import {
  CheckCircle,
  Cancel,
  Lightbulb,
  Psychology,
} from "@mui/icons-material"
import { QuizQuestion as QuizQuestionType } from "@/types"

interface QuizQuestionProps {
  question: QuizQuestionType
  selectedAnswer: string | undefined
  onSelectAnswer: (answerId: string) => void
  showFeedback: boolean
  isCorrect: boolean
}

export function QuizQuestion({
  question,
  selectedAnswer,
  onSelectAnswer,
  showFeedback,
  isCorrect,
}: QuizQuestionProps) {
  const theme = useTheme()

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return theme.palette.success.main
      case "medium":
        return theme.palette.warning.main
      case "hard":
        return theme.palette.error.main
      default:
        return theme.palette.grey[500]
    }
  }

  const getOptionStyles = (optionId: string, isCorrectOption: boolean) => {
    if (!showFeedback) {
      return {
        bgcolor: selectedAnswer === optionId
          ? alpha(theme.palette.primary.main, 0.1)
          : "transparent",
        borderColor: selectedAnswer === optionId
          ? theme.palette.primary.main
          : alpha(theme.palette.divider, 0.5),
      }
    }

    // Show feedback
    if (isCorrectOption) {
      return {
        bgcolor: alpha(theme.palette.success.main, 0.1),
        borderColor: theme.palette.success.main,
      }
    }

    if (selectedAnswer === optionId && !isCorrectOption) {
      return {
        bgcolor: alpha(theme.palette.error.main, 0.1),
        borderColor: theme.palette.error.main,
      }
    }

    return {
      bgcolor: "transparent",
      borderColor: alpha(theme.palette.divider, 0.3),
      opacity: 0.6,
    }
  }

  return (
    <Box>
      {/* Question Header */}
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 3 }}>
        <Psychology
          sx={{
            color: "primary.main",
            fontSize: 28,
            mt: 0.5,
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
            <Chip
              label={question.type === "true-false" ? "True/False" : "Multiple Choice"}
              size="small"
              variant="outlined"
              sx={{ fontSize: "0.7rem", height: 22 }}
            />
            <Chip
              label={question.difficulty}
              size="small"
              sx={{
                fontSize: "0.7rem",
                height: 22,
                bgcolor: alpha(getDifficultyColor(question.difficulty), 0.15),
                color: getDifficultyColor(question.difficulty),
                fontWeight: 600,
                textTransform: "capitalize",
              }}
            />
            {question.psychApproachStep && (
              <Chip
                label={`Step ${question.psychApproachStep}`}
                size="small"
                sx={{
                  fontSize: "0.7rem",
                  height: 22,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: "primary.main",
                }}
              />
            )}
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: "text.primary",
              fontWeight: 500,
              lineHeight: 1.4,
            }}
          >
            {question.question}
          </Typography>
        </Box>
      </Box>

      {/* Options */}
      {question.type === "multiple-choice" && question.options && (
        <RadioGroup
          value={selectedAnswer || ""}
          onChange={(e) => onSelectAnswer(e.target.value)}
        >
          {question.options.map((option, index) => {
            const styles = getOptionStyles(option.id, option.isCorrect)
            const letter = String.fromCharCode(65 + index) // A, B, C, D

            return (
              <Paper
                key={option.id}
                variant="outlined"
                sx={{
                  mb: 1.5,
                  p: 1.5,
                  cursor: showFeedback ? "default" : "pointer",
                  transition: "all 0.2s ease",
                  ...styles,
                  ...(!showFeedback && {
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                    },
                  }),
                }}
                onClick={() => !showFeedback && onSelectAnswer(option.id)}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FormControlLabel
                    value={option.id}
                    control={
                      <Radio
                        disabled={showFeedback}
                        sx={{
                          color: styles.borderColor,
                          "&.Mui-checked": {
                            color: styles.borderColor,
                          },
                        }}
                      />
                    }
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Typography
                          component="span"
                          sx={{
                            fontWeight: 600,
                            color: "text.secondary",
                            minWidth: 20,
                          }}
                        >
                          {letter}.
                        </Typography>
                        <Typography
                          sx={{
                            color: "text.primary",
                            flex: 1,
                          }}
                        >
                          {option.text}
                        </Typography>
                      </Box>
                    }
                    sx={{
                      m: 0,
                      flex: 1,
                      ".MuiFormControlLabel-label": { flex: 1 },
                    }}
                  />
                  {showFeedback && option.isCorrect && (
                    <CheckCircle sx={{ color: "success.main", ml: 1 }} />
                  )}
                  {showFeedback && selectedAnswer === option.id && !option.isCorrect && (
                    <Cancel sx={{ color: "error.main", ml: 1 }} />
                  )}
                </Box>
              </Paper>
            )
          })}
        </RadioGroup>
      )}

      {/* True/False Options */}
      {question.type === "true-false" && (
        <RadioGroup
          value={selectedAnswer || ""}
          onChange={(e) => onSelectAnswer(e.target.value)}
        >
          {[
            { value: "true", label: "True" },
            { value: "false", label: "False" },
          ].map((option) => {
            const isCorrectOption = String(question.correctAnswer) === option.value
            const styles = getOptionStyles(option.value, isCorrectOption)

            return (
              <Paper
                key={option.value}
                variant="outlined"
                sx={{
                  mb: 1.5,
                  p: 1.5,
                  cursor: showFeedback ? "default" : "pointer",
                  transition: "all 0.2s ease",
                  ...styles,
                  ...(!showFeedback && {
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                    },
                  }),
                }}
                onClick={() => !showFeedback && onSelectAnswer(option.value)}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FormControlLabel
                    value={option.value}
                    control={
                      <Radio
                        disabled={showFeedback}
                        sx={{
                          color: styles.borderColor,
                          "&.Mui-checked": {
                            color: styles.borderColor,
                          },
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ color: "text.primary", fontWeight: 500 }}>
                        {option.label}
                      </Typography>
                    }
                    sx={{ m: 0, flex: 1 }}
                  />
                  {showFeedback && isCorrectOption && (
                    <CheckCircle sx={{ color: "success.main", ml: 1 }} />
                  )}
                  {showFeedback && selectedAnswer === option.value && !isCorrectOption && (
                    <Cancel sx={{ color: "error.main", ml: 1 }} />
                  )}
                </Box>
              </Paper>
            )
          })}
        </RadioGroup>
      )}

      {/* Feedback */}
      <Collapse in={showFeedback}>
        <Paper
          sx={{
            mt: 2,
            p: 2,
            bgcolor: isCorrect
              ? alpha(theme.palette.success.main, 0.08)
              : alpha(theme.palette.warning.main, 0.08),
            border: `1px solid ${alpha(
              isCorrect ? theme.palette.success.main : theme.palette.warning.main,
              0.3
            )}`,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
            <Lightbulb
              sx={{
                color: isCorrect ? "success.main" : "warning.main",
                fontSize: 24,
                mt: 0.3,
              }}
            />
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  color: isCorrect ? "success.dark" : "warning.dark",
                  fontWeight: 600,
                  mb: 0.5,
                }}
              >
                {isCorrect ? "Correct! ✓" : "Not quite — here's the explanation:"}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", lineHeight: 1.6 }}
              >
                {question.explanation}
              </Typography>
              {question.relatedBlockId && (
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    mt: 1,
                    color: "primary.main",
                    fontStyle: "italic",
                  }}
                >
                  📖 Review: Message {question.relatedMessageId.replace("m", "")}, Block {question.relatedBlockId}
                </Typography>
              )}
            </Box>
          </Box>
        </Paper>
      </Collapse>
    </Box>
  )
}
