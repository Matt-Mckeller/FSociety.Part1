/**
 * Navigation history and browser integration
 */

export { NavigationHistory } from './NavigationHistory';
export { useNavigationHistory } from './useNavigationHistory';
export { 
  NavigationHistoryProvider,
  useNavigationHistoryContext,
} from './NavigationHistoryProvider';

export type { HistoryEntry } from './NavigationHistory';
export type { 
  UseNavigationHistoryOptions, 
  UseNavigationHistoryReturn 
} from './useNavigationHistory';
export type {
  NavigationHistoryProviderProps,
  NavigationHistoryContextValue,
} from './NavigationHistoryProvider';
export type {
  NavigationHistoryState,
  NavigationEvent,
  NavigationHistoryConfig,
} from './types';
