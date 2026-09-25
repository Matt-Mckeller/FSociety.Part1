/**
 * Zustand Store for Lottie Studio
 *
 * Manages application state including:
 * - Current animation
 * - Wizard step
 * - Processing status
 * - Theme selections
 */

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type {
  LottieAnimation,
  LottieMetadata,
  LottieElement,
  LottieTheme,
  ColorPalette,
  ProcessingStatus,
  ProcessingPhase,
} from '@shared/types'

// Wizard steps
export type WizardStep = 'upload' | 'metadata' | 'elements' | 'themes' | 'export'

interface ProcessingState {
  phase: ProcessingPhase
  progress: number
  message: string
}

interface LottieStudioState {
  // Current animation
  currentAnimation: LottieAnimation | null
  lottieJson: Record<string, any> | null

  // Wizard state
  currentStep: WizardStep
  completedSteps: WizardStep[]

  // Processing state
  isProcessing: boolean
  processingState: ProcessingState | null

  // Theme selections
  selectedPalettes: ColorPalette[]
  generatedThemes: LottieTheme[]

  // Actions
  setLottieJson: (json: Record<string, any>) => void
  setCurrentAnimation: (animation: LottieAnimation) => void
  updateAnimationMetadata: (metadata: LottieMetadata) => void
  updateAnimationElements: (elements: LottieElement[]) => void
  updateAnimationThemes: (themes: LottieTheme[]) => void

  setCurrentStep: (step: WizardStep) => void
  markStepComplete: (step: WizardStep) => void
  goToNextStep: () => void
  goToPreviousStep: () => void

  setProcessingState: (state: ProcessingState | null) => void
  setIsProcessing: (isProcessing: boolean) => void

  setSelectedPalettes: (palettes: ColorPalette[]) => void
  addPalette: (palette: ColorPalette) => void
  removePalette: (paletteId: string) => void

  reset: () => void
}

const STEP_ORDER: WizardStep[] = ['upload', 'metadata', 'elements', 'themes', 'export']

const initialState = {
  currentAnimation: null,
  lottieJson: null,
  currentStep: 'upload' as WizardStep,
  completedSteps: [] as WizardStep[],
  isProcessing: false,
  processingState: null,
  selectedPalettes: [] as ColorPalette[],
  generatedThemes: [] as LottieTheme[],
}

export const useLottieStudioStore = create<LottieStudioState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // Animation actions
      setLottieJson: (json) =>
        set({ lottieJson: json }, false, 'setLottieJson'),

      setCurrentAnimation: (animation) =>
        set({ currentAnimation: animation }, false, 'setCurrentAnimation'),

      updateAnimationMetadata: (metadata) =>
        set(
          (state) => ({
            currentAnimation: state.currentAnimation
              ? { ...state.currentAnimation, metadata }
              : null,
          }),
          false,
          'updateAnimationMetadata'
        ),

      updateAnimationElements: (elements) =>
        set(
          (state) => ({
            currentAnimation: state.currentAnimation
              ? { ...state.currentAnimation, elements }
              : null,
          }),
          false,
          'updateAnimationElements'
        ),

      updateAnimationThemes: (themes) =>
        set(
          (state) => ({
            currentAnimation: state.currentAnimation
              ? { ...state.currentAnimation, themes }
              : null,
            generatedThemes: themes,
          }),
          false,
          'updateAnimationThemes'
        ),

      // Wizard navigation
      setCurrentStep: (step) =>
        set({ currentStep: step }, false, 'setCurrentStep'),

      markStepComplete: (step) =>
        set(
          (state) => ({
            completedSteps: state.completedSteps.includes(step)
              ? state.completedSteps
              : [...state.completedSteps, step],
          }),
          false,
          'markStepComplete'
        ),

      goToNextStep: () =>
        set(
          (state) => {
            const currentIndex = STEP_ORDER.indexOf(state.currentStep)
            if (currentIndex < STEP_ORDER.length - 1) {
              return {
                currentStep: STEP_ORDER[currentIndex + 1],
                completedSteps: state.completedSteps.includes(state.currentStep)
                  ? state.completedSteps
                  : [...state.completedSteps, state.currentStep],
              }
            }
            return state
          },
          false,
          'goToNextStep'
        ),

      goToPreviousStep: () =>
        set(
          (state) => {
            const currentIndex = STEP_ORDER.indexOf(state.currentStep)
            if (currentIndex > 0) {
              return { currentStep: STEP_ORDER[currentIndex - 1] }
            }
            return state
          },
          false,
          'goToPreviousStep'
        ),

      // Processing state
      setProcessingState: (processingState) =>
        set({ processingState }, false, 'setProcessingState'),

      setIsProcessing: (isProcessing) =>
        set({ isProcessing }, false, 'setIsProcessing'),

      // Palette selection
      setSelectedPalettes: (palettes) =>
        set({ selectedPalettes: palettes }, false, 'setSelectedPalettes'),

      addPalette: (palette) =>
        set(
          (state) => ({
            selectedPalettes: state.selectedPalettes.some((p) => p.id === palette.id)
              ? state.selectedPalettes
              : [...state.selectedPalettes, palette],
          }),
          false,
          'addPalette'
        ),

      removePalette: (paletteId) =>
        set(
          (state) => ({
            selectedPalettes: state.selectedPalettes.filter((p) => p.id !== paletteId),
          }),
          false,
          'removePalette'
        ),

      // Reset
      reset: () => set(initialState, false, 'reset'),
    }),
    { name: 'lottie-studio' }
  )
)

export default useLottieStudioStore
