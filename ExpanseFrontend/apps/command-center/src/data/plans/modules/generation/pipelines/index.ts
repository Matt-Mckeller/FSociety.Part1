export { pipelinesOverview } from './overview';
export { pipelinesDataStacking } from './data-stacking';
export { pipelinesAudienceReviews } from './audience-reviews';
export { pipelinesCulturalAlignment } from './cultural-alignment';
export { pipelinesPerspectiveBalancing } from './perspective-balancing';
export { pipelinesDesignReview } from './design-review';
export { pipelinesExamples } from './examples';

import { pipelinesOverview } from './overview';
import { pipelinesDataStacking } from './data-stacking';
import { pipelinesAudienceReviews } from './audience-reviews';
import { pipelinesCulturalAlignment } from './cultural-alignment';
import { pipelinesPerspectiveBalancing } from './perspective-balancing';
import { pipelinesDesignReview } from './design-review';
import { pipelinesExamples } from './examples';

export const pipelinesModules = {
  pipelinesOverview,
  pipelinesDataStacking,
  pipelinesAudienceReviews,
  pipelinesCulturalAlignment,
  pipelinesPerspectiveBalancing,
  pipelinesDesignReview,
  pipelinesExamples,
};

export const pipelinesModuleList = Object.values(pipelinesModules);
