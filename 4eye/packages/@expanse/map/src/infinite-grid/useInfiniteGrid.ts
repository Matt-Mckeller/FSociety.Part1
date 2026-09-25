"use client";
'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import type { Position } from '../navigation/types';
import { InfiniteGridManager } from './InfiniteGridManager';
import type { GridChunk, InfiniteGridConfig, InfiniteGridState } from './types';
import { DEFAULT_INFINITE_GRID_CONFIG } from './types';

/**
 * Hook for managing infinite grid with dynamic chunk loading
 * 
 * Automatically loads and unloads grid chunks based on viewport position,
 * optimizing memory usage for large or infinite grids.
 * 
 * @param config - Infinite grid configuration
 * @returns Grid state and controls
 * 
 * @example
 * ```tsx
 * function InfiniteGridComponent() {
 *   const {
 *     chunks,
 *     visibleChunks,
 *     updateViewport,
 *     isPositionLoaded,
 *   } = useInfiniteGrid({
 *     chunkSize: 10,
 *     viewportRadius: 1,
 *     loadChunk: async (chunkPos) => {
 *       const tiles = await fetchTilesForChunk(chunkPos);
 *       return {
 *         id: `${chunkPos.x},${chunkPos.y}`,
 *         chunkPosition: chunkPos,
 *         tiles,
 *         loaded: true,
 *         loading: false,
 *       };
 *     },
 *   });
 *   
 *   // Update viewport when position changes
 *   useEffect(() => {
 *     updateViewport(currentPosition);
 *   }, [currentPosition]);
 *   
 *   return (
 *     <div>
 *       {visibleChunks.map(chunk => (
 *         <ChunkRenderer key={chunk.id} chunk={chunk} />
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useInfiniteGrid(
  config: Partial<InfiniteGridConfig> & Pick<InfiniteGridConfig, 'loadChunk'>
): {
  chunks: GridChunk[];
  visibleChunks: GridChunk[];
  state: InfiniteGridState;
  updateViewport: (position: Position) => Promise<void>;
  preloadAround: (position: Position) => Promise<void>;
  isPositionLoaded: (position: Position) => boolean;
  getChunkForPosition: (position: Position) => GridChunk | null;
  stats: ReturnType<InfiniteGridManager['getStats']>;
  clear: () => void;
} {
  const managerRef = useRef<InfiniteGridManager | null>(null);
  const [, forceUpdate] = useState(0);

  // Initialize manager
  if (!managerRef.current) {
    const fullConfig: InfiniteGridConfig = {
      ...DEFAULT_INFINITE_GRID_CONFIG,
      ...config,
    } as InfiniteGridConfig;
    
    managerRef.current = new InfiniteGridManager(fullConfig);
  }

  const manager = managerRef.current;

  // Force re-render
  const refresh = useCallback(() => {
    forceUpdate(prev => prev + 1);
  }, []);

  // Update viewport
  const updateViewport = useCallback(
    async (position: Position) => {
      await manager.updateViewport(position);
      refresh();
    },
    [manager, refresh]
  );

  // Preload chunks
  const preloadAround = useCallback(
    async (position: Position) => {
      await manager.preloadAround(position);
      refresh();
    },
    [manager, refresh]
  );

  // Check if position is loaded
  const isPositionLoaded = useCallback(
    (position: Position) => manager.isPositionLoaded(position),
    [manager]
  );

  // Get chunk for position
  const getChunkForPosition = useCallback(
    (position: Position) => manager.getChunkForPosition(position),
    [manager]
  );

  // Clear all chunks
  const clear = useCallback(() => {
    manager.clear();
    refresh();
  }, [manager, refresh]);

  // Get current state
  const chunks = manager.getChunks();
  const visibleChunks = manager.getVisibleChunks();
  const stats = manager.getStats();

  const state: InfiniteGridState = {
    chunks: new Map(chunks.map(c => [c.id, c])),
    visibleChunks: new Set(visibleChunks.map(c => c.id)),
    loadingChunks: new Set(), // This would need to be exposed from manager
    viewportCenter: stats.viewportCenter,
  };

  return {
    chunks,
    visibleChunks,
    state,
    updateViewport,
    preloadAround,
    isPositionLoaded,
    getChunkForPosition,
    stats,
    clear,
  };
}
