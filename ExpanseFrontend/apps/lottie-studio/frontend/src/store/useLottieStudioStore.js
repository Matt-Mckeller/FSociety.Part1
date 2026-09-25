/**
 * Zustand Store for Lottie Studio
 *
 * Manages application state including:
 * - Current animation
 * - Wizard step
 * - Processing status
 * - Theme selections
 */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
const STEP_ORDER = ['upload', 'metadata', 'elements', 'themes', 'export'];
const initialState = {
    currentAnimation: null,
    lottieJson: null,
    currentStep: 'upload',
    completedSteps: [],
    isProcessing: false,
    processingState: null,
    selectedPalettes: [],
    generatedThemes: [],
};
export const useLottieStudioStore = create()(devtools((set, get) => (Object.assign(Object.assign({}, initialState), { 
    // Animation actions
    setLottieJson: (json) => set({ lottieJson: json }, false, 'setLottieJson'), setCurrentAnimation: (animation) => set({ currentAnimation: animation }, false, 'setCurrentAnimation'), updateAnimationMetadata: (metadata) => set((state) => ({
        currentAnimation: state.currentAnimation
            ? Object.assign(Object.assign({}, state.currentAnimation), { metadata }) : null,
    }), false, 'updateAnimationMetadata'), updateAnimationElements: (elements) => set((state) => ({
        currentAnimation: state.currentAnimation
            ? Object.assign(Object.assign({}, state.currentAnimation), { elements }) : null,
    }), false, 'updateAnimationElements'), updateAnimationThemes: (themes) => set((state) => ({
        currentAnimation: state.currentAnimation
            ? Object.assign(Object.assign({}, state.currentAnimation), { themes }) : null,
        generatedThemes: themes,
    }), false, 'updateAnimationThemes'), 
    // Wizard navigation
    setCurrentStep: (step) => set({ currentStep: step }, false, 'setCurrentStep'), markStepComplete: (step) => set((state) => ({
        completedSteps: state.completedSteps.includes(step)
            ? state.completedSteps
            : [...state.completedSteps, step],
    }), false, 'markStepComplete'), goToNextStep: () => set((state) => {
        const currentIndex = STEP_ORDER.indexOf(state.currentStep);
        if (currentIndex < STEP_ORDER.length - 1) {
            return {
                currentStep: STEP_ORDER[currentIndex + 1],
                completedSteps: state.completedSteps.includes(state.currentStep)
                    ? state.completedSteps
                    : [...state.completedSteps, state.currentStep],
            };
        }
        return state;
    }, false, 'goToNextStep'), goToPreviousStep: () => set((state) => {
        const currentIndex = STEP_ORDER.indexOf(state.currentStep);
        if (currentIndex > 0) {
            return { currentStep: STEP_ORDER[currentIndex - 1] };
        }
        return state;
    }, false, 'goToPreviousStep'), 
    // Processing state
    setProcessingState: (processingState) => set({ processingState }, false, 'setProcessingState'), setIsProcessing: (isProcessing) => set({ isProcessing }, false, 'setIsProcessing'), 
    // Palette selection
    setSelectedPalettes: (palettes) => set({ selectedPalettes: palettes }, false, 'setSelectedPalettes'), addPalette: (palette) => set((state) => ({
        selectedPalettes: state.selectedPalettes.some((p) => p.id === palette.id)
            ? state.selectedPalettes
            : [...state.selectedPalettes, palette],
    }), false, 'addPalette'), removePalette: (paletteId) => set((state) => ({
        selectedPalettes: state.selectedPalettes.filter((p) => p.id !== paletteId),
    }), false, 'removePalette'), 
    // Reset
    reset: () => set(initialState, false, 'reset') })), { name: 'lottie-studio' }));
export default useLottieStudioStore;
//# sourceMappingURL=useLottieStudioStore.js.map