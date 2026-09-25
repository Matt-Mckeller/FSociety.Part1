import type { Position } from '../navigation/types';

/**
 * Chunk representing a section of the infinite grid
 */
export interface GridChunk {
  /** Chunk identifier (e.g., "0,0" for chunk at origin) */
  id: string;
  /** Chunk position in chunk-space coordinates */
  chunkPosition: { x: number; y: number };
  /** Tiles contained in this chunk */
  tiles: Position[];
  /** Load state */
  loaded: boolean;
  /** Loading state */
  loading: boolean;
  /** Timestamp when chunk was loaded */
  loadedAt?: number;
  /** Custom data associated with chunk */
  metadata?: Record<string, any>;
}

/**
 * Configuration for infinite grid
 */
export interface InfiniteGridConfig {
  /** Size of each chunk (number of tiles per dimension) */
  chunkSize: number;
  /** Number of chunks to keep loaded around viewport */
  viewportRadius: number;
  /** Preload chunks beyond viewport */
  preloadMargin: number;
  /** Maximum number of chunks to keep in memory */
  maxLoadedChunks: number;
  /** Function to load chunk data */
  loadChunk: (chunkPosition: { x: number; y: number }) => Promise<GridChunk | null>;
  /** Function called when chunk is unloaded */
  onChunkUnload?: (chunk: GridChunk) => void;
  /** Enable debug logging */
  debug?: boolean;
}

/**
 * Default infinite grid configuration
 */
export const DEFAULT_INFINITE_GRID_CONFIG: Partial<InfiniteGridConfig> = {
  chunkSize: 10,
  viewportRadius: 1,
  preloadMargin: 1,
  maxLoadedChunks: 25,
  debug: false,
};

/**
 * Infinite grid state
 */
export interface InfiniteGridState {
  /** All loaded chunks indexed by chunk ID */
  chunks: Map<string, GridChunk>;
  /** Currently visible chunks */
  visibleChunks: Set<string>;
  /** Chunks pending load */
  loadingChunks: Set<string>;
  /** Current viewport center in tile coordinates */
  viewportCenter: Position;
}
