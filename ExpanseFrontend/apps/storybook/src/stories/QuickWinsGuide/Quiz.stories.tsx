import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  Box,
  Card,
  Typography,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stepper,
  Step,
  StepLabel,
  Alert,
} from "@mui/material"

// Quiz question data
interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correct: string
}

const sampleQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the suggested purpose statement for teams?",
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
    options: ["1-2", "3-5", "6-8", "10+"],
    correct: "3-5",
  },
  {
    id: 3,
    question:
      "Psychological safety increases idea-sharing and help-seeking.",
    options: ["True", "False"],
    correct: "True",
  },
]

interface QuizProps {
  questions?: QuizQuestion[]
  title?: string
  subtitle?: string
  passingScore?: number
}

function Quiz({
  questions = sampleQuestions,
  title = "Knowledge Check",
  subtitle = "Test your understanding of the Quick Wins Guide.",
  passingScore = 2,
}: QuizProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [score, setScore] = useState<{ correct: number; total: number } | null>(
    null
  )

  const handleNext = () => {
    if (activeStep === questions.length - 1) {
      let correct = 0
      questions.forEach((q) => {
        if (answers[q.id] === q.correct) correct++
      })
      setScore({ correct, total: questions.length })
    }
    setActiveStep((prev) => prev + 1)
  }

  const handleBack = () => setActiveStep((prev) => prev - 1)

  const handleReset = () => {
    setActiveStep(0)
    setAnswers({})
    setScore(null)
  }

  const currentQuestion = questions[activeStep]

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: "#1976D2" }}>
        {subtitle}
      </Typography>

      <Stepper
        activeStep={activeStep}
        sx={{ mb: 3, overflowX: "auto" }}
        alternativeLabel
      >
        {questions.map((q, i) => (
          <Step key={q.id}>
            <StepLabel>Q{i + 1}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep < questions.length ? (
        <Card sx={{ p: 3 }}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" sx={{ mb: 2, fontSize: "1.1rem" }}>
              {activeStep + 1}. {currentQuestion.question}
            </FormLabel>
            <RadioGroup
              value={answers[currentQuestion.id] || ""}
              onChange={(e) =>
                setAnswers({ ...answers, [currentQuestion.id]: e.target.value })
              }
            >
              {currentQuestion.options.map((opt) => (
                <FormControlLabel
                  key={opt}
                  value={opt}
                  control={<Radio />}
                  label={opt}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
            }}
          >
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!answers[currentQuestion.id]}
            >
              {activeStep === questions.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </Card>
      ) : (
        <Card sx={{ p: 3 }}>
          {score && (
            <>
              <Alert
                severity={score.correct >= passingScore ? "success" : "info"}
                sx={{ mb: 2 }}
              >
                You scored {score.correct}/{score.total}.{" "}
                {score.correct >= passingScore
                  ? "Great work! You have a solid understanding."
                  : "Review the guide and try again to improve your score."}
              </Alert>
              <Button variant="contained" onClick={handleReset}>
                Retake Quiz
              </Button>
            </>
          )}
        </Card>
      )}
    </Box>
  )
}

const meta: Meta<typeof Quiz> = {
  title: "QuickWinsGuide/Quiz",
  component: Quiz,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "An interactive stepper-based quiz component with multiple choice questions, scoring, and reset functionality. Used for knowledge checks in the Quick Wins Guide.",
      },
    },
  },
  argTypes: {
    title: {
      description: "Quiz title",
      control: "text",
    },
    subtitle: {
      description: "Quiz subtitle/description",
      control: "text",
    },
    passingScore: {
      description: "Number of correct answers required to pass",
      control: "number",
    },
  },
}

export default meta
type Story = StoryObj<typeof Quiz>

export const Default: Story = {
  args: {},
}

export const CustomTitle: Story = {
  args: {
    title: "Operations Quiz",
    subtitle: "Test your knowledge of pod operations.",
    passingScore: 3,
  },
}

export const ShortQuiz: Story = {
  args: {
    questions: [
      {
        id: 1,
        question: "What is a Quick Win for training?",
        options: [
          "Hire more staff",
          "AI-enhanced reviews",
          "Longer meetings",
        ],
        correct: "AI-enhanced reviews",
      },
    ],
    title: "Quick Check",
    subtitle: "Just one question!",
    passingScore: 1,
  },
}
