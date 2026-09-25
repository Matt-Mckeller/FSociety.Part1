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
 * Navigation history manager for browser back/forward support
 * 
 * Tracks navigation history and integrates with browser history API
 * to enable back/forward navigation with arrow keys and browser buttons.
 */
export class NavigationHistory {
  private history: HistoryEntry[] = [];
  private currentIndex: number = -1;
  private maxHistorySize: number = 100;
  private syncWithBrowser: boolean;
  
  constructor(options: {
    maxHistorySize?: number;
    syncWithBrowser?: boolean;
    initialPosition?: Position;
  } = {}) {
    this.maxHistorySize = options.maxHistorySize ?? 100;
    this.syncWithBrowser = options.syncWithBrowser ?? false;
    
    if (options.initialPosition) {
      this.push(options.initialPosition);
    }
    
    // Listen to browser back/forward
    if (this.syncWithBrowser && typeof window !== 'undefined') {
      window.addEventListener('popstate', this.handlePopState);
    }
  }

  /**
   * Push new position to history
   */
  push(position: Position, metadata?: Record<string, any>): void {
    // Remove any forward history when pushing new entry
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1);
    }
    
    // Add new entry
    const entry: HistoryEntry = {
      position: { ...position },
      timestamp: Date.now(),
      metadata,
    };
    
    this.history.push(entry);
    this.currentIndex++;
    
    // Trim history if exceeds max size
    if (this.history.length > this.maxHistorySize) {
      this.history.shift();
      this.currentIndex--;
    }
    
    // Update browser history
    if (this.syncWithBrowser && typeof window !== 'undefined') {
      const state = { position, metadata };
      window.history.pushState(state, '', this.getUrlForPosition(position));
    }
  }

  /**
   * Replace current history entry
   */
  replace(position: Position, metadata?: Record<string, any>): void {
    if (this.currentIndex >= 0) {
      this.history[this.currentIndex] = {
        position: { ...position },
        timestamp: Date.now(),
        metadata,
      };
      
      if (this.syncWithBrowser && typeof window !== 'undefined') {
        const state = { position, metadata };
        window.history.replaceState(state, '', this.getUrlForPosition(position));
      }
    } else {
      this.push(position, metadata);
    }
  }

  /**
   * Go back in history
   */
  back(): Position | null {
    if (!this.canGoBack()) {
      return null;
    }
    
    this.currentIndex--;
    const entry = this.history[this.currentIndex];
    
    if (this.syncWithBrowser && typeof window !== 'undefined') {
      window.history.back();
    }
    
    return entry.position;
  }

  /**
   * Go forward in history
   */
  forward(): Position | null {
    if (!this.canGoForward()) {
      return null;
    }
    
    this.currentIndex++;
    const entry = this.history[this.currentIndex];
    
    if (this.syncWithBrowser && typeof window !== 'undefined') {
      window.history.forward();
    }
    
    return entry.position;
  }

  /**
   * Go to specific index in history
   */
  go(steps: number): Position | null {
    const targetIndex = this.currentIndex + steps;
    
    if (targetIndex < 0 || targetIndex >= this.history.length) {
      return null;
    }
    
    this.currentIndex = targetIndex;
    const entry = this.history[this.currentIndex];
    
    if (this.syncWithBrowser && typeof window !== 'undefined') {
      window.history.go(steps);
    }
    
    return entry.position;
  }

  /**
   * Check if can navigate back
   */
  canGoBack(): boolean {
    return this.currentIndex > 0;
  }

  /**
   * Check if can navigate forward
   */
  canGoForward(): boolean {
    return this.currentIndex < this.history.length - 1;
  }

  /**
   * Get current position
   */
  getCurrent(): Position | null {
    if (this.currentIndex >= 0 && this.currentIndex < this.history.length) {
      return this.history[this.currentIndex].position;
    }
    return null;
  }

  /**
   * Get current entry with metadata
   */
  getCurrentEntry(): HistoryEntry | null {
    if (this.currentIndex >= 0 && this.currentIndex < this.history.length) {
      return this.history[this.currentIndex];
    }
    return null;
  }

  /**
   * Get full history
   */
  getHistory(): HistoryEntry[] {
    return [...this.history];
  }

  /**
   * Get current index
   */
  getCurrentIndex(): number {
    return this.currentIndex;
  }

  /**
   * Clear history
   */
  clear(): void {
    this.history = [];
    this.currentIndex = -1;
  }

  /**
   * Get history size
   */
  size(): number {
    return this.history.length;
  }

  /**
   * Handle browser popstate event
   * @private
   */
  private handlePopState = (event: PopStateEvent): void => {
    if (event.state?.position) {
      // Find matching entry in our history
      const targetIndex = this.history.findIndex(
        entry => 
          entry.position.x === event.state.position.x &&
          entry.position.y === event.state.position.y
      );
      
      if (targetIndex >= 0) {
        this.currentIndex = targetIndex;
      }
    }
  };

  /**
   * Generate URL for position (can be customized)
   * @private
   */
  private getUrlForPosition(position: Position): string {
    return `#${position.x},${position.y}`;
  }

  /**
   * Cleanup - remove event listeners
   */
  destroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('popstate', this.handlePopState);
    }
  }
}
