import * as fs from 'fs';
import * as path from 'path';
import type { NextNavigationConfig, RouteMapping } from '../types';
import { createGridConfig } from '../utils/createGridConfig';
import { generateRouteId } from '../utils/routeMapping';

/**
 * Options for scanning App Directory
 */
export interface AppDirScanOptions {
  /** Base directory to scan (e.g., './app') */
  baseDir: string;
  /** Grid dimensions */
  dimensions: { width: number; height: number };
  /** Pattern to match route files (default: 'page.tsx') */
  routeFile?: string;
  /** Layout strategy: 'row-first' | 'column-first' */
  layout?: 'row-first' | 'column-first';
  /** Custom position mapping function */
  positionMapper?: (routePath: string, index: number) => { x: number; y: number };
  /** Filter function for routes */
  routeFilter?: (routePath: string) => boolean;
}

/**
 * Create grid configuration from Next.js App Directory structure
 * 
 * Scans the app directory for page.tsx files and generates a grid
 * configuration based on file structure.
 * 
 * @param options - Scan options
 * @returns Navigation configuration
 * 
 * @example
 * ```tsx
 * const config = createGridFromAppDir({
 *   baseDir: './app',
 *   dimensions: { width: 5, height: 5 },
 *   layout: 'row-first',
 * });
 * ```
 */
export function createGridFromAppDir(options: AppDirScanOptions): NextNavigationConfig {
  const {
    baseDir,
    dimensions,
    routeFile = 'page.tsx',
    layout = 'row-first',
    positionMapper,
    routeFilter,
  } = options;

  // Scan directory for routes
  const routes = scanAppDirectory(baseDir, routeFile);
  
  // Filter routes if filter provided
  const filteredRoutes = routeFilter ? routes.filter(routeFilter) : routes;

  // Sort routes for consistent positioning
  filteredRoutes.sort();

  // Map routes to grid positions
  const routeMappings: Partial<RouteMapping>[] = filteredRoutes.map((routePath, index) => {
    const position = positionMapper
      ? positionMapper(routePath, index)
      : calculatePosition(index, dimensions, layout);

    return {
      path: routePath,
      position,
      id: generateRouteId(routePath),
      metadata: {
        source: 'app-router',
        scanIndex: index,
      },
    };
  });

  return createGridConfig({
    routes: routeMappings,
    dimensions,
  });
}

/**
 * Scan app directory recursively for route files
 * @internal
 */
function scanAppDirectory(baseDir: string, routeFile: string): string[] {
  const routes: string[] = [];
  
  function scan(dir: string, routePath: string = ''): void {
    if (!fs.existsSync(dir)) {
      throw new Error(`Directory not found: ${dir}`);
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Skip special Next.js directories
        if (entry.name.startsWith('_') || entry.name === 'api') {
          continue;
        }
        
        // Recurse into subdirectory
        const newRoutePath = routePath + '/' + entry.name;
        scan(fullPath, newRoutePath);
      } else if (entry.isFile() && entry.name === routeFile) {
        // Found a route file
        const route = routePath || '/';
        routes.push(route);
      }
    }
  }

  scan(baseDir);
  return routes;
}

/**
 * Calculate grid position from index
 * @internal
 */
function calculatePosition(
  index: number,
  dimensions: { width: number; height: number },
  layout: 'row-first' | 'column-first'
): { x: number; y: number } {
  if (layout === 'row-first') {
    return {
      x: index % dimensions.width,
      y: Math.floor(index / dimensions.width),
    };
  } else {
    return {
      x: Math.floor(index / dimensions.height),
      y: index % dimensions.height,
    };
  }
}

/**
 * Create custom position mapper for hierarchical layouts
 * 
 * Maps routes based on their directory depth and position
 * in the file tree.
 * 
 * @example
 * ```tsx
 * const mapper = createHierarchicalMapper({
 *   rowsPerLevel: 2,
 *   columnsPerParent: 3,
 * });
 * 
 * const config = createGridFromAppDir({
 *   baseDir: './app',
 *   dimensions: { width: 10, height: 10 },
 *   positionMapper: mapper,
 * });
 * ```
 */
export function createHierarchicalMapper(options: {
  rowsPerLevel?: number;
  columnsPerParent?: number;
}): (routePath: string, index: number) => { x: number; y: number } {
  const { rowsPerLevel = 1, columnsPerParent = 3 } = options;

  return (routePath: string) => {
    const segments = routePath === '/' ? [] : routePath.split('/').filter(Boolean);
    const depth = segments.length;
    
    if (depth === 0) {
      return { x: 0, y: 0 }; // Root
    }

    const parentX = Math.floor((depth - 1) / columnsPerParent) * columnsPerParent;
    const parentY = ((depth - 1) % columnsPerParent) * rowsPerLevel;
    
    // Offset within parent group
    const hash = segments.join('/').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const offsetX = hash % columnsPerParent;
    const offsetY = Math.floor(hash / columnsPerParent) % rowsPerLevel;

    return {
      x: parentX + offsetX,
      y: parentY + offsetY,
    };
  };
}
