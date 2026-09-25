"use client"

import { useState } from "react"
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
import { quizQuestions } from "../data"

export function Quiz() {
  const [activeStep, setActiveStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [score, setScore] = useState<{ correct: number; total: number } | null>(
    null
  )

  const handleNext = () => {
    if (activeStep === quizQuestions.length - 1) {
      let correct = 0
      quizQuestions.forEach((q) => {
        if (answers[q.id] === q.correct) correct++
      })
      setScore({ correct, total: quizQuestions.length })
    }
    setActiveStep((prev) => prev + 1)
  }

  const handleBack = () => setActiveStep((prev) => prev - 1)

  const handleReset = () => {
    setActiveStep(0)
    setAnswers({})
    setScore(null)
  }

  const currentQuestion = quizQuestions[activeStep]

  return (
    <Box id="quiz" sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Knowledge Check
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: "#1976D2" }}>
        Test your understanding of the Quick Wins Guide.
      </Typography>

      <Stepper
        activeStep={activeStep}
        sx={{ mb: 3, overflowX: "auto" }}
        alternativeLabel
      >
        {quizQuestions.map((q, i) => (
          <Step key={q.id}>
            <StepLabel>Q{i + 1}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep < quizQuestions.length ? (
        <Card sx={{ p: 3 }}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel
              component="legend"
              sx={{ mb: 2, fontSize: "1.1rem" }}
            >
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
              {activeStep === quizQuestions.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </Card>
      ) : (
        <Card sx={{ p: 3 }}>
          {score && (
            <>
              <Alert
                severity={score.correct >= 6 ? "success" : "info"}
                sx={{ mb: 2 }}
              >
                You scored {score.correct}/{score.total}.{" "}
                {score.correct >= 6
                  ? "Great work! You have a solid understanding of the Quick Wins Guide."
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
