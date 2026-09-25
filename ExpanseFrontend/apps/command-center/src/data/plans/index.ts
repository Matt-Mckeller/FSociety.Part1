/**
 * Central Data Index for Plans Viewer
 * 
 * This file exports all planning content in a structured format
 * suitable for both UI rendering and AI context gathering.
 */

// Status & Navigation
export { implementationStatus, moduleSummaries, tableOfContents } from './status';

// Future Ideas
export { futureIdeas } from './future-ideas';

// Modules
export * from './modules';
export { 
  generationModules, 
  generationModuleList, 
  standaloneModules, 
  standaloneModuleList,
  coreProfileModules,
  coreProfileModuleList,
} from './modules';

// TypeScript Sources (for code display)
export * from './typescript-sources';

// Re-export types
export type * from '../../types/plans';

// Aggregate exports for AI context
import { implementationStatus, moduleSummaries, tableOfContents } from './status';
import { futureIdeas } from './future-ideas';
import { generationModuleList, standaloneModuleList, coreProfileModuleList } from './modules';

/**
 * Complete planning context for AI reference
 */
export const allPlanningData = {
  implementationStatus,
  moduleSummaries,
  tableOfContents,
  futureIdeas,
  modules: {
    generation: generationModuleList,
    standalone: standaloneModuleList,
    coreProfiles: coreProfileModuleList,
  },
};
