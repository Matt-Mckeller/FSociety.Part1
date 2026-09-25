import type { Position } from '@expanse/shell';
import type { NextNavigationConfig, RouteMapping } from '../types';

/**
 * Convert grid position to Next.js route path
 * 
 * @param position - Grid position
 * @param config - Navigation configuration
 * @returns Route path or null if not found
 */
export function positionToPath(
  position: Position,
  config: NextNavigationConfig
): string | null {
  const route = config.routes.find(
    (r) => r.position.x === position.x && r.position.y === position.y
  );
  return route?.path || null;
}

/**
 * Convert Next.js route path to grid position
 * 
 * @param path - Route path
 * @param config - Navigation configuration
 * @returns Grid position or null if not found
 */
export function pathToPosition(
  path: string,
  config: NextNavigationConfig
): Position | null {
  // Normalize path (remove trailing slash, handle base path)
  const normalizedPath = normalizePath(path, config.basePath);
  
  const route = config.routes.find((r) => {
    const routePath = normalizePath(r.path, config.basePath);
    return routePath === normalizedPath;
  });
  
  return route?.position || null;
}

/**
 * Get route by ID
 * 
 * @param routeId - Route identifier
 * @param config - Navigation configuration
 * @returns Route mapping or null if not found
 */
export function getRouteById(
  routeId: string,
  config: NextNavigationConfig
): RouteMapping | null {
  return config.routes.find((r) => r.id === routeId) || null;
}

/**
 * Get route at specific position
 * 
 * @param position - Grid position
 * @param config - Navigation configuration
 * @returns Route mapping or null if not found
 */
export function getRouteAtPosition(
  position: Position,
  config: NextNavigationConfig
): RouteMapping | null {
  return config.routes.find(
    (r) => r.position.x === position.x && r.position.y === position.y
  ) || null;
}

/**
 * Normalize path for comparison
 * @internal
 */
function normalizePath(path: string, basePath?: string): string {
  let normalized = path;
  
  // Remove base path if present
  if (basePath && normalized.startsWith(basePath)) {
    normalized = normalized.slice(basePath.length);
  }
  
  // Ensure leading slash
  if (!normalized.startsWith('/')) {
    normalized = '/' + normalized;
  }
  
  // Remove trailing slash (except for root)
  if (normalized !== '/' && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }
  
  return normalized;
}

/**
 * Generate route ID from path
 * 
 * @param path - Route path
 * @returns Generated route ID
 * 
 * @example
 * generateRouteId('/blog/posts') // 'blog-posts'
 * generateRouteId('/') // 'home'
 */
export function generateRouteId(path: string): string {
  if (path === '/') return 'home';
  
  return path
    .split('/')
    .filter(Boolean)
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '');
}
