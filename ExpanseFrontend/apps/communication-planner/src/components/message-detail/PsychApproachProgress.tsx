"use client"

import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Tooltip,
} from "@mui/material"
import { PsychologicalApproach } from "@/types"

interface PsychApproachProgressProps {
  allSteps: PsychologicalApproach[]
  addressedSteps: number[]
}

export function PsychApproachProgress({
  allSteps,
  addressedSteps,
}: PsychApproachProgressProps) {
  return (
    <Box>
      <Typography
        variant="overline"
        sx={{ color: "primary.main", letterSpacing: 1.2, fontWeight: 600, mb: 1.5, display: "block" }}
      >
        Approach
      </Typography>
      <Stepper
        alternativeLabel
        sx={{
          "& .MuiStepConnector-line": {
            borderColor: "primary.light",
          },
          "& .MuiStepIcon-root": {
            color: "primary.light",
          },
          "& .MuiStepIcon-root.Mui-completed": {
            color: "primary.main",
          },
          "& .MuiStepIcon-root.Mui-active": {
            color: "primary.dark",
          },
        }}
      >
        {allSteps.map((step) => (
          <Step key={step.step} completed={addressedSteps.includes(step.step)}>
            <Tooltip title={step.description} arrow>
              <StepLabel
                sx={{
                  "& .MuiStepLabel-label": {
                    fontSize: "0.75rem",
                    color: addressedSteps.includes(step.step)
                      ? "text.primary"
                      : "text.secondary",
                    fontWeight: addressedSteps.includes(step.step) ? 600 : 400,
                  },
                }}
              >
                {step.title}
              </StepLabel>
            </Tooltip>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}
