// Generation Module Data Exports
export { generationOverview } from './overview';
export { generationProcessFlow } from './process-flow';
export { generationContentTypeFlows } from './content-type-flows';
export { generationUxUi } from './ux-ui';
export { generationReviewProcess } from './review-process';
export { generationScheduling } from './scheduling';
export { generationInternationalization } from './internationalization';
export { generationContentLibrary } from './content-library';
export { generationConfiguration } from './configuration';
export { generationQuestions } from './questions';
export { generationScreens } from './screens';
export { generationCreateContent } from './create-content';
export { generationDesignMockups } from './design-mockups';

// Pipelines & Review Sub-Module
export * from './pipelines';
export { pipelinesModules, pipelinesModuleList } from './pipelines';

import { generationOverview } from './overview';
import { generationProcessFlow } from './process-flow';
import { generationContentTypeFlows } from './content-type-flows';
import { generationUxUi } from './ux-ui';
import { generationReviewProcess } from './review-process';
import { generationScheduling } from './scheduling';
import { generationInternationalization } from './internationalization';
import { generationContentLibrary } from './content-library';
import { generationConfiguration } from './configuration';
import { generationQuestions } from './questions';
import { generationScreens } from './screens';
import { generationCreateContent } from './create-content';
import { generationDesignMockups } from './design-mockups';
import { pipelinesModules } from './pipelines';

/**
 * All generation module documents
 */
export const generationModules = {
  overview: generationOverview,
  processFlow: generationProcessFlow,
  contentTypeFlows: generationContentTypeFlows,
  uxUi: generationUxUi,
  reviewProcess: generationReviewProcess,
  scheduling: generationScheduling,
  internationalization: generationInternationalization,
  contentLibrary: generationContentLibrary,
  configuration: generationConfiguration,
  questions: generationQuestions,
  screens: generationScreens,
  createContent: generationCreateContent,
  designMockups: generationDesignMockups,
  pipelines: pipelinesModules,
};

export const generationModuleList = Object.values(generationModules);
