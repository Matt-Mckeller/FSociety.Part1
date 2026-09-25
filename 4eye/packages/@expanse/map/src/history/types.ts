import type { Position } from '../navigation/types';

/**
 * History entry for navigation tracking
 */
export interface HistoryEntry {
  position: Position;
  timestamp: number;
  metadata?: Record<string, any>;
}

/**
 * Navigation history state that can be stored with each history entry
 */
export interface NavigationHistoryState {
  /** Was this navigation triggered by user action or programmatic? */
  trigger: 'user' | 'programmatic' | 'history';
  /** Navigation method used (keyboard, click, etc) */
  method?: string;
  /** Previous position before this navigation */
  previousPosition?: Position;
  /** Timestamp of navigation */
  timestamp: number;
  /** Custom metadata */
  [key: string]: any;
}

/**
 * Enhanced navigation event with history information
 */
export interface NavigationEvent {
  /** Target position */
  position: Position;
  /** Previous position */
  previousPosition: Position | null;
  /** History entry if available */
  historyEntry?: HistoryEntry;
  /** Navigation state */
  state: NavigationHistoryState;
}

/**
 * Navigation history configuration
 */
export interface NavigationHistoryConfig {
  /** Enable history tracking */
  enabled: boolean;
  /** Sync with browser history */
  syncWithBrowser: boolean;
  /** Maximum history size */
  maxSize: number;
  /** Record all position changes or only user-initiated? */
  trackAll: boolean;
}
