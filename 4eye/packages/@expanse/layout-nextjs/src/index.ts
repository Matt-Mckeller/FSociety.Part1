/**
 * @expanse/layout-nextjs
 * Next.js integration for @expanse/shell
 */

export { NavigationProvider } from './components/NavigationProvider';
export { useNextNavigation } from './hooks/useNextNavigation';
export { useRouteSync } from './hooks/useRouteSync';
export { createGridConfig } from './utils/createGridConfig';
export { positionToPath, pathToPosition } from './utils/routeMapping';

// Types
export type {
  NextNavigationConfig,
  RouteMapping,
  NavigationProviderProps,
  UseNextNavigationReturn,
} from './types';
