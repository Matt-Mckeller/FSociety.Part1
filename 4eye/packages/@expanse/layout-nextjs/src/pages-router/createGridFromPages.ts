import * as fs from 'fs';
import * as path from 'path';
import type { NextNavigationConfig, RouteMapping } from '../types';
import { createGridConfig } from '../utils/createGridConfig';
import { generateRouteId } from '../utils/routeMapping';

/**
 * Options for scanning Pages Directory
 */
export interface PagesDirScanOptions {
  /** Base directory to scan (e.g., './pages') */
  baseDir: string;
  /** Grid dimensions */
  dimensions: { width: number; height: number };
  /** File extensions to scan (default: ['.tsx', '.ts', '.jsx', '.js']) */
  extensions?: string[];
  /** Layout strategy: 'row-first' | 'column-first' */
  layout?: 'row-first' | 'column-first';
  /** Custom position mapping function */
  positionMapper?: (routePath: string, index: number) => { x: number; y: number };
  /** Filter function for routes */
  routeFilter?: (routePath: string) => boolean;
}

/**
 * Create grid configuration from Next.js Pages Directory
 * 
 * Scans the pages directory and generates a grid configuration
 * based on file structure.
 * 
 * @param options - Scan options
 * @returns Navigation configuration
 * 
 * @example
 * ```tsx
 * const config = createGridFromPages({
 *   baseDir: './pages',
 *   dimensions: { width: 5, height: 5 },
 *   layout: 'row-first',
 * });
 * ```
 */
export function createGridFromPages(options: PagesDirScanOptions): NextNavigationConfig {
  const {
    baseDir,
    dimensions,
    extensions = ['.tsx', '.ts', '.jsx', '.js'],
    layout = 'row-first',
    positionMapper,
    routeFilter,
  } = options;

  // Scan directory for routes
  const routes = scanPagesDirectory(baseDir, extensions);
  
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
        source: 'pages-router',
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
 * Scan pages directory for route files
 * @internal
 */
function scanPagesDirectory(baseDir: string, extensions: string[]): string[] {
  const routes: string[] = [];
  
  function scan(dir: string, routePrefix: string = ''): void {
    if (!fs.existsSync(dir)) {
      throw new Error(`Directory not found: ${dir}`);
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Skip special Next.js directories
        if (entry.name === 'api' || entry.name.startsWith('_')) {
          continue;
        }
        
        // Recurse into subdirectory
        scan(fullPath, routePrefix + '/' + entry.name);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        const basename = path.basename(entry.name, ext);
        
        if (!extensions.includes(ext)) {
          continue;
        }
        
        // Skip special Next.js files
        if (basename.startsWith('_') || basename === '404' || basename === '500') {
          continue;
        }
        
        // Convert filename to route path
        let routePath: string;
        if (basename === 'index') {
          routePath = routePrefix || '/';
        } else {
          routePath = routePrefix + '/' + basename;
        }
        
        // Handle dynamic routes
        routePath = routePath.replace(/\[(.+?)\]/g, ':$1');
        
        routes.push(routePath);
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
