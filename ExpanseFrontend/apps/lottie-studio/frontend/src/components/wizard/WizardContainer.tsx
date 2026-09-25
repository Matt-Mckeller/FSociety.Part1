/**
 * Wizard Container Component
 *
 * Main wizard interface that orchestrates the step-by-step
 * animation processing workflow.
 */

'use client'

import { Box, Card, CardContent, Stepper, Step, StepLabel, StepButton } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DescriptionIcon from '@mui/icons-material/Description'
import LayersIcon from '@mui/icons-material/Layers'
import PaletteIcon from '@mui/icons-material/Palette'
import DownloadIcon from '@mui/icons-material/Download'

import { useLottieStudioStore, WizardStep } from '@/store/useLottieStudioStore'
import { UploadStep } from './steps/UploadStep'
import { MetadataStep } from './steps/MetadataStep'
import { ElementsStep } from './steps/ElementsStep'
import { ThemesStep } from './steps/ThemesStep'
import { ExportStep } from './steps/ExportStep'

const STEPS: { key: WizardStep; label: string; icon: React.ReactNode }[] = [
  { key: 'upload', label: 'Upload', icon: <CloudUploadIcon /> },
  { key: 'metadata', label: 'Metadata', icon: <DescriptionIcon /> },
  { key: 'elements', label: 'Elements', icon: <LayersIcon /> },
  { key: 'themes', label: 'Themes', icon: <PaletteIcon /> },
  { key: 'export', label: 'Export', icon: <DownloadIcon /> },
]

export function WizardContainer() {
  const { currentStep, completedSteps, setCurrentStep } = useLottieStudioStore()

  const activeStepIndex = STEPS.findIndex((s) => s.key === currentStep)

  const isStepClickable = (step: WizardStep) => {
    const stepIndex = STEPS.findIndex((s) => s.key === step)
    // Can click if: step is completed, or is the next step after last completed
    const lastCompletedIndex = Math.max(
      -1,
      ...STEPS.map((s, i) => (completedSteps.includes(s.key) ? i : -1))
    )
    return stepIndex <= lastCompletedIndex + 1
  }

  const handleStepClick = (step: WizardStep) => {
    if (isStepClickable(step)) {
      setCurrentStep(step)
    }
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'upload':
        return <UploadStep />
      case 'metadata':
        return <MetadataStep />
      case 'elements':
        return <ElementsStep />
      case 'themes':
        return <ThemesStep />
      case 'export':
        return <ExportStep />
      default:
        return <UploadStep />
    }
  }

  return (
    <Box>
      {/* Stepper */}
      <Card
        sx={{
          mb: 3,
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <CardContent>
          <Stepper activeStep={activeStepIndex} alternativeLabel>
            {STEPS.map((step) => (
              <Step
                key={step.key}
                completed={completedSteps.includes(step.key)}
              >
                <StepButton
                  onClick={() => handleStepClick(step.key)}
                  disabled={!isStepClickable(step.key)}
                  icon={step.icon}
                >
                  <StepLabel>{step.label}</StepLabel>
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      {/* Current Step Content */}
      <Card
        sx={{
          minHeight: 400,
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {renderCurrentStep()}
        </CardContent>
      </Card>
    </Box>
  )
}

export default WizardContainer
