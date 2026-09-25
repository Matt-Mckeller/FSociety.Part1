import type { Position, GridConfig } from '@expanse/shell';

/**
 * Route mapping between file paths and grid positions
 */
export interface RouteMapping {
  path: string;
  position: Position;
  id: string;
  metadata?: {
    title?: string;
    description?: string;
    [key: string]: any;
  };
}

/**
 * Configuration for Next.js navigation integration
 */
export interface NextNavigationConfig {
  routes: RouteMapping[];
  dimensions: { width: number; height: number };
  basePath?: string;
  homePosition?: Position;
  syncUrl?: boolean;
  preloadAdjacent?: boolean;
}

/**
 * Props for NavigationProvider component
 */
export interface NavigationProviderProps {
  config: NextNavigationConfig;
  children: React.ReactNode;
  onNavigate?: (position: Position) => void;
}

/**
 * Return type for useNextNavigation hook
 */
export interface UseNextNavigationReturn {
  position: Position;
  currentRoute: RouteMapping | null;
  navigateTo: (position: Position) => void;
  navigateToRoute: (routeId: string) => void;
  navigateRelative: (direction: 'up' | 'down' | 'left' | 'right') => void;
  canNavigate: (direction: 'up' | 'down' | 'left' | 'right') => boolean;
  adjacentRoutes: {
    up: RouteMapping | null;
    down: RouteMapping | null;
    left: RouteMapping | null;
    right: RouteMapping | null;
  };
}

/**
 * Options for creating grid config from file system
 */
export interface CreateGridOptions {
  baseDir: string;
  dimensions: { width: number; height: number };
  pattern?: string;
  homePosition?: Position;
  routeTransform?: (filePath: string) => Partial<RouteMapping>;
}
