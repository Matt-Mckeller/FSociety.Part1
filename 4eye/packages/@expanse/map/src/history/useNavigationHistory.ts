"use client";
'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import type { Position } from '../navigation/types';
import { NavigationHistory, type HistoryEntry } from './NavigationHistory';

/**
 * Options for useNavigationHistory hook
 */
export interface UseNavigationHistoryOptions {
  /** Maximum number of entries to keep in history */
  maxHistorySize?: number;
  /** Sync with browser history API */
  syncWithBrowser?: boolean;
  /** Initial position */
  initialPosition?: Position;
  /** Callback when navigation occurs */
  onNavigate?: (position: Position, entry: HistoryEntry) => void;
}

/**
 * Return type for useNavigationHistory hook
 */
export interface UseNavigationHistoryReturn {
  /** Current position */
  position: Position | null;
  /** Current history entry */
  currentEntry: HistoryEntry | null;
  /** Navigate to new position */
  navigateTo: (position: Position, metadata?: Record<string, any>) => void;
  /** Replace current position */
  replacePosition: (position: Position, metadata?: Record<string, any>) => void;
  /** Go back in history */
  goBack: () => void;
  /** Go forward in history */
  goForward: () => void;
  /** Go to specific history offset */
  go: (steps: number) => void;
  /** Check if can go back */
  canGoBack: boolean;
  /** Check if can go forward */
  canGoForward: boolean;
  /** Full history array */
  history: HistoryEntry[];
  /** Current history index */
  currentIndex: number;
  /** Clear all history */
  clearHistory: () => void;
}

/**
 * Hook for managing navigation history with browser integration
 * 
 * Provides history tracking, back/forward navigation, and optional
 * browser history API synchronization.
 * 
 * @param options - Configuration options
 * @returns Navigation history state and controls
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const {
 *     position,
 *     navigateTo,
 *     goBack,
 *     goForward,
 *     canGoBack,
 *     canGoForward,
 *   } = useNavigationHistory({
 *     syncWithBrowser: true,
 *     initialPosition: { x: 0, y: 0 },
 *   });
 *   
 *   return (
 *     <div>
 *       <button onClick={goBack} disabled={!canGoBack}>
 *         Back
 *       </button>
 *       <p>Current: {position?.x}, {position?.y}</p>
 *       <button onClick={goForward} disabled={!canGoForward}>
 *         Forward
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useNavigationHistory(
  options: UseNavigationHistoryOptions = {}
): UseNavigationHistoryReturn {
  const historyRef = useRef<NavigationHistory | null>(null);
  const [, forceUpdate] = useState(0);

  // Initialize history manager
  if (!historyRef.current) {
    historyRef.current = new NavigationHistory({
      maxHistorySize: options.maxHistorySize,
      syncWithBrowser: options.syncWithBrowser,
      initialPosition: options.initialPosition,
    });
  }

  const history = historyRef.current;

  // Force re-render helper
  const refresh = useCallback(() => {
    forceUpdate(prev => prev + 1);
  }, []);

  // Navigate to new position
  const navigateTo = useCallback(
    (position: Position, metadata?: Record<string, any>) => {
      history.push(position, metadata);
      refresh();
      
      const entry = history.getCurrentEntry();
      if (entry) {
        options.onNavigate?.(position, entry);
      }
    },
    [history, refresh, options]
  );

  // Replace current position
  const replacePosition = useCallback(
    (position: Position, metadata?: Record<string, any>) => {
      history.replace(position, metadata);
      refresh();
      
      const entry = history.getCurrentEntry();
      if (entry) {
        options.onNavigate?.(position, entry);
      }
    },
    [history, refresh, options]
  );

  // Go back
  const goBack = useCallback(() => {
    const position = history.back();
    if (position) {
      refresh();
      const entry = history.getCurrentEntry();
      if (entry) {
        options.onNavigate?.(position, entry);
      }
    }
  }, [history, refresh, options]);

  // Go forward
  const goForward = useCallback(() => {
    const position = history.forward();
    if (position) {
      refresh();
      const entry = history.getCurrentEntry();
      if (entry) {
        options.onNavigate?.(position, entry);
      }
    }
  }, [history, refresh, options]);

  // Go to offset
  const go = useCallback(
    (steps: number) => {
      const position = history.go(steps);
      if (position) {
        refresh();
        const entry = history.getCurrentEntry();
        if (entry) {
          options.onNavigate?.(position, entry);
        }
      }
    },
    [history, refresh, options]
  );

  // Clear history
  const clearHistory = useCallback(() => {
    history.clear();
    refresh();
  }, [history, refresh]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      history.destroy();
    };
  }, [history]);

  // Listen for browser back/forward if syncing
  useEffect(() => {
    if (!options.syncWithBrowser) {
      return;
    }

    const handlePopState = () => {
      refresh();
      const entry = history.getCurrentEntry();
      if (entry) {
        options.onNavigate?.(entry.position, entry);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [history, refresh, options]);

  return {
    position: history.getCurrent(),
    currentEntry: history.getCurrentEntry(),
    navigateTo,
    replacePosition,
    goBack,
    goForward,
    go,
    canGoBack: history.canGoBack(),
    canGoForward: history.canGoForward(),
    history: history.getHistory(),
    currentIndex: history.getCurrentIndex(),
    clearHistory,
  };
}
