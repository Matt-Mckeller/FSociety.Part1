import type { NextNavigationConfig, RouteMapping } from '../types';
import { generateRouteId } from './routeMapping';

/**
 * Create grid navigation configuration from route definitions
 * 
 * @param options - Configuration options
 * @returns Complete navigation configuration
 * 
 * @example
 * ```tsx
 * const config = createGridConfig({
 *   routes: [
 *     { path: '/', position: { x: 0, y: 0 }, id: 'home' },
 *     { path: '/about', position: { x: 1, y: 0 }, id: 'about' },
 *   ],
 *   dimensions: { width: 5, height: 5 },
 * });
 * ```
 */
export function createGridConfig(options: {
  routes: Partial<RouteMapping>[];
  dimensions: { width: number; height: number };
  basePath?: string;
  homePosition?: { x: number; y: number };
  syncUrl?: boolean;
  preloadAdjacent?: boolean;
}): NextNavigationConfig {
  // Validate and complete routes
  const routes: RouteMapping[] = options.routes.map((route, index) => {
    if (!route.path) {
      throw new Error(`Route at index ${index} missing required 'path' property`);
    }
    if (!route.position) {
      throw new Error(`Route at index ${index} missing required 'position' property`);
    }

    return {
      path: route.path,
      position: route.position,
      id: route.id || generateRouteId(route.path),
      metadata: route.metadata,
    };
  });

  // Validate grid dimensions
  if (options.dimensions.width <= 0 || options.dimensions.height <= 0) {
    throw new Error('Grid dimensions must be positive integers');
  }

  // Validate positions are within bounds
  routes.forEach((route) => {
    if (
      route.position.x < 0 ||
      route.position.x >= options.dimensions.width ||
      route.position.y < 0 ||
      route.position.y >= options.dimensions.height
    ) {
      throw new Error(
        `Route '${route.path}' position (${route.position.x}, ${route.position.y}) is outside grid bounds`
      );
    }
  });

  // Check for duplicate positions
  const positionMap = new Map<string, string>();
  routes.forEach((route) => {
    const key = `${route.position.x},${route.position.y}`;
    const existing = positionMap.get(key);
    if (existing) {
      throw new Error(
        `Duplicate position (${route.position.x}, ${route.position.y}) for routes '${existing}' and '${route.path}'`
      );
    }
    positionMap.set(key, route.path);
  });

  return {
    routes,
    dimensions: options.dimensions,
    basePath: options.basePath,
    homePosition: options.homePosition || { x: 0, y: 0 },
    syncUrl: options.syncUrl !== false,
    preloadAdjacent: options.preloadAdjacent !== false,
  };
}

/**
 * Create a simple grid layout with consecutive routes
 * 
 * @param paths - Array of route paths
 * @param columns - Number of columns in grid
 * @returns Navigation configuration
 * 
 * @example
 * ```tsx
 * const config = createSimpleGrid(
 *   ['/', '/about', '/services', '/contact', '/blog'],
 *   3 // 3 columns
 * );
 * // Results in:
 * // [0,0] /        [1,0] /about    [2,0] /services
 * // [0,1] /contact [1,1] /blog
 * ```
 */
export function createSimpleGrid(
  paths: string[],
  columns: number
): NextNavigationConfig {
  const rows = Math.ceil(paths.length / columns);
  
  const routes: Partial<RouteMapping>[] = paths.map((path, index) => ({
    path,
    position: {
      x: index % columns,
      y: Math.floor(index / columns),
    },
    id: generateRouteId(path),
  }));

  return createGridConfig({
    routes,
    dimensions: { width: columns, height: rows },
  });
}
