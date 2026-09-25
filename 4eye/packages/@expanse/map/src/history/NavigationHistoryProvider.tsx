"use client";
'use client';

import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import type { Position } from '../navigation/types';
import { useNavigationHistory } from './useNavigationHistory';
import type { HistoryEntry } from './NavigationHistory';
import type { 
  NavigationHistoryConfig,
  NavigationHistoryState,
  NavigationEvent,
} from './types';

/**
 * Default navigation history configuration
 */
const DEFAULT_HISTORY_CONFIG: NavigationHistoryConfig = {
  enabled: true,
  syncWithBrowser: false,
  maxSize: 100,
  trackAll: false,
};

/**
 * Props for NavigationHistoryProvider
 */
export interface NavigationHistoryProviderProps {
  children: ReactNode;
  config?: Partial<NavigationHistoryConfig>;
  initialPosition?: Position;
  onNavigationEvent?: (event: NavigationEvent) => void;
}

/**
 * Navigation history context value
 */
export interface NavigationHistoryContextValue {
  position: Position | null;
  currentEntry: HistoryEntry | null;
  history: HistoryEntry[];
  currentIndex: number;
  canGoBack: boolean;
  canGoForward: boolean;
  navigateTo: (position: Position, state?: Partial<NavigationHistoryState>) => void;
  replacePosition: (position: Position, state?: Partial<NavigationHistoryState>) => void;
  goBack: () => void;
  goForward: () => void;
  go: (steps: number) => void;
  clearHistory: () => void;
}

const NavigationHistoryContext = createContext<NavigationHistoryContextValue | null>(null);

/**
 * Provider for navigation history state management
 * 
 * Wraps useNavigationHistory hook with context provider for
 * application-wide history state management.
 * 
 * @example
 * ```tsx
 * <NavigationHistoryProvider
 *   config={{ syncWithBrowser: true }}
 *   initialPosition={{ x: 0, y: 0 }}
 *   onNavigationEvent={(event) => {
 *     console.log('Navigated:', event);
 *   }}
 * >
 *   <App />
 * </NavigationHistoryProvider>
 * ```
 */
export function NavigationHistoryProvider({
  children,
  config = {},
  initialPosition,
  onNavigationEvent,
}: NavigationHistoryProviderProps) {
  const fullConfig: NavigationHistoryConfig = {
    ...DEFAULT_HISTORY_CONFIG,
    ...config,
  };

  const handleNavigate = useCallback(
    (position: Position, entry: HistoryEntry) => {
      if (onNavigationEvent) {
        const event: NavigationEvent = {
          position,
          previousPosition: entry.metadata?.previousPosition || null,
          historyEntry: entry,
          state: entry.metadata as NavigationHistoryState,
        };
        onNavigationEvent(event);
      }
    },
    [onNavigationEvent]
  );

  const {
    position,
    currentEntry,
    history,
    currentIndex,
    canGoBack,
    canGoForward,
    navigateTo: baseNavigateTo,
    replacePosition: baseReplacePosition,
    goBack,
    goForward,
    go,
    clearHistory,
  } = useNavigationHistory({
    maxHistorySize: fullConfig.maxSize,
    syncWithBrowser: fullConfig.syncWithBrowser,
    initialPosition: fullConfig.enabled ? initialPosition : undefined,
    onNavigate: handleNavigate,
  });

  // Enhanced navigateTo with state
  const navigateTo = useCallback(
    (targetPosition: Position, state?: Partial<NavigationHistoryState>) => {
      const metadata: NavigationHistoryState = {
        trigger: state?.trigger || 'programmatic',
        method: state?.method,
        previousPosition: position || undefined,
        timestamp: Date.now(),
        ...state,
      };

      baseNavigateTo(targetPosition, metadata);
    },
    [baseNavigateTo, position]
  );

  // Enhanced replacePosition with state
  const replacePosition = useCallback(
    (targetPosition: Position, state?: Partial<NavigationHistoryState>) => {
      const metadata: NavigationHistoryState = {
        trigger: state?.trigger || 'programmatic',
        method: state?.method,
        previousPosition: position || undefined,
        timestamp: Date.now(),
        ...state,
      };

      baseReplacePosition(targetPosition, metadata);
    },
    [baseReplacePosition, position]
  );

  const value: NavigationHistoryContextValue = {
    position,
    currentEntry,
    history,
    currentIndex,
    canGoBack,
    canGoForward,
    navigateTo,
    replacePosition,
    goBack,
    goForward,
    go,
    clearHistory,
  };

  return (
    <NavigationHistoryContext.Provider value={value}>
      {children}
    </NavigationHistoryContext.Provider>
  );
}

/**
 * Hook to access navigation history context
 * 
 * @returns Navigation history state and controls
 * @throws Error if used outside NavigationHistoryProvider
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { 
 *     position, 
 *     navigateTo, 
 *     goBack, 
 *     canGoBack 
 *   } = useNavigationHistoryContext();
 *   
 *   return (
 *     <div>
 *       <button onClick={goBack} disabled={!canGoBack}>
 *         Back
 *       </button>
 *       <p>Current: {position?.x}, {position?.y}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function useNavigationHistoryContext(): NavigationHistoryContextValue {
  const context = useContext(NavigationHistoryContext);
  
  if (!context) {
    throw new Error(
      'useNavigationHistoryContext must be used within NavigationHistoryProvider'
    );
  }
  
  return context;
}
