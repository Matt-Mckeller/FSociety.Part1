// Standalone Module Exports
export { businessProfile } from './business-profile';
export { personalProfile } from './personal-profile';
export { brandVoice } from './brand-voice';
export { companyGoals } from './company-goals';
export { companyPurpose } from './company-purpose';
export { customInstructions } from './custom-instructions';
export { promptExamples } from './prompt-examples';
export { assets } from './assets';
export { fewShotExamples } from './few-shot-examples';
export { contentLibrary } from './content-library';
export { audience } from './audience';
export { marketing } from './marketing';
export { learning } from './learning';

// Generation Module Exports
export * from './generation';
export { generationModules, generationModuleList } from './generation';

import { businessProfile } from './business-profile';
import { personalProfile } from './personal-profile';
import { brandVoice } from './brand-voice';
import { companyGoals } from './company-goals';
import { companyPurpose } from './company-purpose';
import { customInstructions } from './custom-instructions';
import { promptExamples } from './prompt-examples';
import { assets } from './assets';
import { fewShotExamples } from './few-shot-examples';
import { contentLibrary } from './content-library';
import { audience } from './audience';
import { marketing } from './marketing';
import { learning } from './learning';

/**
 * Core Profile Modules
 */
export const coreProfileModules = {
  businessProfile,
  personalProfile,
  brandVoice,
  companyGoals,
  companyPurpose,
  customInstructions,
};

export const coreProfileModuleList = Object.values(coreProfileModules);

/**
 * All standalone modules
 */
export const standaloneModules = {
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
};

export const standaloneModuleList = Object.values(standaloneModules);
