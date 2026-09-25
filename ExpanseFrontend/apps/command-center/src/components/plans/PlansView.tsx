import { Routes, Route, Navigate } from "react-router-dom"
import { MainLayout } from "./layout"
import {
  Dashboard,
  FutureIdeas,
  GenericModulePage,
  ModuleListPage,
} from "./pages"
import { PLANS_BASE_PATH } from "../../constants"
import {
  generationOverview,
  generationProcessFlow,
  generationContentTypeFlows,
  generationUxUi,
  generationReviewProcess,
  generationScheduling,
  generationInternationalization,
  generationContentLibrary,
  generationConfiguration,
  generationQuestions,
  generationScreens,
  generationCreateContent,
  generationDesignMockups,
  pipelinesOverview,
  pipelinesDataStacking,
  pipelinesAudienceReviews,
  pipelinesCulturalAlignment,
  pipelinesPerspectiveBalancing,
  pipelinesDesignReview,
  pipelinesExamples,
  businessProfile,
  personalProfile,
  brandVoice,
  companyGoals,
  companyPurpose,
  customInstructions,
  promptExamples,
  assets,
  fewShotExamples,
  contentLibrary,
  audience,
  marketing,
  learning,
} from "../../data/plans"

const generationSubModules = [
  {
    id: "overview",
    title: "Overview",
    description: "Goals, requirements, data context",
    path: `${PLANS_BASE_PATH}/modules/generation/overview`,
  },
  {
    id: "create-content",
    title: "Create Content",
    description: "Entry points for content creation",
    path: `${PLANS_BASE_PATH}/modules/generation/create-content`,
  },
  {
    id: "process-flow",
    title: "Process Flow",
    description: "Visual process diagrams",
    path: `${PLANS_BASE_PATH}/modules/generation/process-flow`,
  },
  {
    id: "content-type-flows",
    title: "Content Type Flows",
    description: "Per-type editing processes & pipelines",
    path: `${PLANS_BASE_PATH}/modules/generation/content-type-flows`,
  },
  {
    id: "ux-ui",
    title: "UX/UI",
    description: "Interface, navigation, FABs",
    path: `${PLANS_BASE_PATH}/modules/generation/ux-ui`,
  },
  {
    id: "review-process",
    title: "Review Process",
    description: "Ratings, approvals, version control",
    path: `${PLANS_BASE_PATH}/modules/generation/review-process`,
  },
  {
    id: "scheduling",
    title: "Scheduling",
    description: "Publishing flow & automation",
    path: `${PLANS_BASE_PATH}/modules/generation/scheduling`,
  },
  {
    id: "internationalization",
    title: "Internationalization",
    description: "Translation phase",
    path: `${PLANS_BASE_PATH}/modules/generation/internationalization`,
  },
  {
    id: "content-library",
    title: "Content Library",
    description: "Generated content views",
    path: `${PLANS_BASE_PATH}/modules/generation/content-library`,
  },
  {
    id: "configuration",
    title: "Configuration",
    description: "All configurable settings",
    path: `${PLANS_BASE_PATH}/modules/generation/configuration`,
  },
  {
    id: "questions",
    title: "Questions",
    description: "Open decisions to resolve",
    path: `${PLANS_BASE_PATH}/modules/generation/questions`,
  },
  {
    id: "screens",
    title: "Screens",
    description: "All UI screens & status",
    path: `${PLANS_BASE_PATH}/modules/generation/screens`,
  },
  {
    id: "design-mockups",
    title: "Design Mockups",
    description: "Storybook mockup system",
    path: `${PLANS_BASE_PATH}/modules/generation/design-mockups`,
  },
  {
    id: "pipelines",
    title: "Pipelines & Review",
    description: "Data stacking, audience reviews, depth generation",
    path: `${PLANS_BASE_PATH}/modules/generation/pipelines`,
  },
]

export function PlansView() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Dashboard */}
        <Route index element={<Dashboard />} />

        {/* Future Ideas */}
        <Route path="future-ideas" element={<FutureIdeas />} />

        {/* Modules index - redirect to dashboard */}
        <Route path="modules" element={<Navigate to={PLANS_BASE_PATH} replace />} />

        {/* Generation Module */}
        <Route path="modules/generation">
          <Route
            index
            element={
              <ModuleListPage
                title="Generation Module"
                description="Core content creation system for posts, images, video, scripts & audio"
                modules={generationSubModules}
              />
            }
          />
          <Route
            path="overview"
            element={<GenericModulePage module={generationOverview} />}
          />
          <Route
            path="create-content"
            element={<GenericModulePage module={generationCreateContent} />}
          />
          <Route
            path="process-flow"
            element={<GenericModulePage module={generationProcessFlow} />}
          />
          <Route
            path="content-type-flows"
            element={<GenericModulePage module={generationContentTypeFlows} />}
          />
          <Route
            path="ux-ui"
            element={<GenericModulePage module={generationUxUi} />}
          />
          <Route
            path="review-process"
            element={<GenericModulePage module={generationReviewProcess} />}
          />
          <Route
            path="scheduling"
            element={<GenericModulePage module={generationScheduling} />}
          />
          <Route
            path="internationalization"
            element={
              <GenericModulePage module={generationInternationalization} />
            }
          />
          <Route
            path="content-library"
            element={<GenericModulePage module={generationContentLibrary} />}
          />
          <Route
            path="configuration"
            element={<GenericModulePage module={generationConfiguration} />}
          />
          <Route
            path="questions"
            element={<GenericModulePage module={generationQuestions} />}
          />
          <Route
            path="screens"
            element={<GenericModulePage module={generationScreens} />}
          />
          <Route
            path="design-mockups"
            element={<GenericModulePage module={generationDesignMockups} />}
          />
          {/* Pipelines & Review Sub-Module */}
          <Route
            path="pipelines"
            element={<GenericModulePage module={pipelinesOverview} />}
          />
          <Route
            path="pipelines/data-stacking"
            element={<GenericModulePage module={pipelinesDataStacking} />}
          />
          <Route
            path="pipelines/audience-reviews"
            element={<GenericModulePage module={pipelinesAudienceReviews} />}
          />
          <Route
            path="pipelines/cultural-alignment"
            element={<GenericModulePage module={pipelinesCulturalAlignment} />}
          />
          <Route
            path="pipelines/perspective-balancing"
            element={
              <GenericModulePage module={pipelinesPerspectiveBalancing} />
            }
          />
          <Route
            path="pipelines/design-review"
            element={<GenericModulePage module={pipelinesDesignReview} />}
          />
          <Route
            path="pipelines/examples"
            element={<GenericModulePage module={pipelinesExamples} />}
          />
        </Route>

        {/* Core Profile Modules */}
        <Route
          path="modules/business-profile"
          element={<GenericModulePage module={businessProfile} />}
        />
        <Route
          path="modules/personal-profile"
          element={<GenericModulePage module={personalProfile} />}
        />
        <Route
          path="modules/brand-voice"
          element={<GenericModulePage module={brandVoice} />}
        />
        <Route
          path="modules/company-goals"
          element={<GenericModulePage module={companyGoals} />}
        />
        <Route
          path="modules/company-purpose"
          element={<GenericModulePage module={companyPurpose} />}
        />
        <Route
          path="modules/custom-instructions"
          element={<GenericModulePage module={customInstructions} />}
        />

        {/* Other Modules */}
        <Route
          path="modules/prompt-examples"
          element={<GenericModulePage module={promptExamples} />}
        />
        <Route
          path="modules/assets"
          element={<GenericModulePage module={assets} />}
        />
        <Route
          path="modules/few-shot-examples"
          element={<GenericModulePage module={fewShotExamples} />}
        />
        <Route
          path="modules/content-library"
          element={<GenericModulePage module={contentLibrary} />}
        />
        <Route
          path="modules/audience"
          element={<GenericModulePage module={audience} />}
        />
        <Route
          path="modules/marketing"
          element={<GenericModulePage module={marketing} />}
        />
        <Route
          path="modules/learning"
          element={<GenericModulePage module={learning} />}
        />
      </Route>
    </Routes>
  )
}
