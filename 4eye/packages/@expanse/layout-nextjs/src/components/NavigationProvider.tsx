'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { Position } from '@expanse/shell';
import type { NextNavigationConfig, NavigationProviderProps, RouteMapping } from '../types';
import { pathToPosition, positionToPath } from '../utils/routeMapping';

interface NavigationContextValue {
  config: NextNavigationConfig;
  position: Position;
  currentRoute: RouteMapping | null;
  navigateTo: (position: Position) => void;
  navigateToRoute: (routeId: string) => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

/**
 * NavigationProvider - Integrates @expanse/shell with Next.js routing
 * 
 * Provides grid navigation that syncs with Next.js App Router,
 * maintaining URL state and enabling browser history integration.
 * 
 * @example
 * ```tsx
 * <NavigationProvider config={gridConfig}>
 *   <AppContent />
 * </NavigationProvider>
 * ```
 */
export function NavigationProvider({ config, children, onNavigate }: NavigationProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Initialize position from current URL
  const [position, setPosition] = useState<Position>(() => {
    const pos = pathToPosition(pathname, config);
    return pos || config.homePosition || { x: 0, y: 0 };
  });

  // Get current route from position
  const currentRoute = config.routes.find(
    (route) => route.position.x === position.x && route.position.y === position.y
  ) || null;

  // Navigate to specific position
  const navigateTo = useCallback(
    (newPosition: Position) => {
      const route = config.routes.find(
        (r) => r.position.x === newPosition.x && r.position.y === newPosition.y
      );

      if (route) {
        setPosition(newPosition);
        if (config.syncUrl !== false) {
          router.push(route.path);
        }
        onNavigate?.(newPosition);
      }
    },
    [config.routes, config.syncUrl, router, onNavigate]
  );

  // Navigate to route by ID
  const navigateToRoute = useCallback(
    (routeId: string) => {
      const route = config.routes.find((r) => r.id === routeId);
      if (route) {
        navigateTo(route.position);
      }
    },
    [config.routes, navigateTo]
  );

  // Sync position when URL changes (browser back/forward)
  useEffect(() => {
    const newPosition = pathToPosition(pathname, config);
    if (newPosition && (newPosition.x !== position.x || newPosition.y !== position.y)) {
      setPosition(newPosition);
      onNavigate?.(newPosition);
    }
  }, [pathname, config, position.x, position.y, onNavigate]);

  // Preload adjacent routes if enabled
  useEffect(() => {
    if (config.preloadAdjacent) {
      const adjacentPositions = [
        { x: position.x - 1, y: position.y },
        { x: position.x + 1, y: position.y },
        { x: position.x, y: position.y - 1 },
        { x: position.x, y: position.y + 1 },
      ];

      adjacentPositions.forEach((pos) => {
        const route = config.routes.find(
          (r) => r.position.x === pos.x && r.position.y === pos.y
        );
        if (route) {
          router.prefetch(route.path);
        }
      });
    }
  }, [position, config, router]);

  const value: NavigationContextValue = {
    config,
    position,
    currentRoute,
    navigateTo,
    navigateToRoute,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

/**
 * Hook to access navigation context
 * @internal
 */
export function useNavigationContext() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigationContext must be used within NavigationProvider');
  }
  return context;
}
