'use client';

import { useCallback, useMemo } from 'react';
import type { Position } from '@expanse/shell';
import type { UseNextNavigationReturn } from '../types';
import { useNavigationContext } from '../components/NavigationProvider';

/**
 * Hook for Next.js-aware grid navigation
 * 
 * Provides navigation functions that sync with Next.js routing,
 * including relative navigation, boundary checking, and adjacent route info.
 * 
 * @returns Navigation state and controls
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { position, navigateRelative, canNavigate } = useNextNavigation();
 *   
 *   return (
 *     <div>
 *       <p>Position: ({position.x}, {position.y})</p>
 *       <button 
 *         onClick={() => navigateRelative('right')}
 *         disabled={!canNavigate('right')}
 *       >
 *         Go Right
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useNextNavigation(): UseNextNavigationReturn {
  const { config, position, currentRoute, navigateTo, navigateToRoute } = useNavigationContext();

  // Check if navigation in direction is possible
  const canNavigate = useCallback(
    (direction: 'up' | 'down' | 'left' | 'right'): boolean => {
      let targetPosition: Position;

      switch (direction) {
        case 'up':
          targetPosition = { x: position.x, y: position.y - 1 };
          break;
        case 'down':
          targetPosition = { x: position.x, y: position.y + 1 };
          break;
        case 'left':
          targetPosition = { x: position.x - 1, y: position.y };
          break;
        case 'right':
          targetPosition = { x: position.x + 1, y: position.y };
          break;
      }

      // Check bounds
      if (
        targetPosition.x < 0 ||
        targetPosition.x >= config.dimensions.width ||
        targetPosition.y < 0 ||
        targetPosition.y >= config.dimensions.height
      ) {
        return false;
      }

      // Check if route exists
      return config.routes.some(
        (route) => route.position.x === targetPosition.x && route.position.y === targetPosition.y
      );
    },
    [position, config]
  );

  // Navigate relative to current position
  const navigateRelative = useCallback(
    (direction: 'up' | 'down' | 'left' | 'right'): void => {
      if (!canNavigate(direction)) {
        return;
      }

      let targetPosition: Position;

      switch (direction) {
        case 'up':
          targetPosition = { x: position.x, y: position.y - 1 };
          break;
        case 'down':
          targetPosition = { x: position.x, y: position.y + 1 };
          break;
        case 'left':
          targetPosition = { x: position.x - 1, y: position.y };
          break;
        case 'right':
          targetPosition = { x: position.x + 1, y: position.y };
          break;
      }

      navigateTo(targetPosition);
    },
    [position, navigateTo, canNavigate]
  );

  // Get adjacent routes
  const adjacentRoutes = useMemo(() => {
    const getRouteAt = (pos: Position) =>
      config.routes.find((r) => r.position.x === pos.x && r.position.y === pos.y) || null;

    return {
      up: getRouteAt({ x: position.x, y: position.y - 1 }),
      down: getRouteAt({ x: position.x, y: position.y + 1 }),
      left: getRouteAt({ x: position.x - 1, y: position.y }),
      right: getRouteAt({ x: position.x + 1, y: position.y }),
    };
  }, [position, config.routes]);

  return {
    position,
    currentRoute,
    navigateTo,
    navigateToRoute,
    navigateRelative,
    canNavigate,
    adjacentRoutes,
  };
}
