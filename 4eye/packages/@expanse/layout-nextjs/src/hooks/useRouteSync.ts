'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import type { Position } from '@expanse/shell';
import { useNavigationContext } from '../components/NavigationProvider';
import { pathToPosition } from '../utils/routeMapping';

/**
 * Hook to sync grid position with Next.js route changes
 * 
 * Automatically updates grid position when the URL changes
 * (e.g., via browser back/forward or direct navigation).
 * 
 * @param onSync - Optional callback when sync occurs
 * 
 * @example
 * ```tsx
 * function MyLayout({ children }) {
 *   useRouteSync((position, route) => {
 *     console.log('Navigated to:', position, route);
 *   });
 *   
 *   return <div>{children}</div>;
 * }
 * ```
 */
export function useRouteSync(
  onSync?: (position: Position, routePath: string) => void
): void {
  const pathname = usePathname();
  const { config, position, navigateTo } = useNavigationContext();

  useEffect(() => {
    const newPosition = pathToPosition(pathname, config);
    
    if (newPosition) {
      // Only navigate if position actually changed
      if (newPosition.x !== position.x || newPosition.y !== position.y) {
        navigateTo(newPosition);
        onSync?.(newPosition, pathname);
      }
    }
  }, [pathname, config, position.x, position.y, navigateTo, onSync]);
}
