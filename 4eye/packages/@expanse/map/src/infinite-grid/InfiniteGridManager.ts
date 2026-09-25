import type { Position } from '../navigation/types';
import type { GridChunk, InfiniteGridConfig } from './types';

/**
 * Infinite Grid Manager
 * 
 * Manages dynamic loading/unloading of grid chunks for large/infinite grids.
 * Only loads chunks near the current viewport to optimize memory usage.
 */
export class InfiniteGridManager {
  private config: InfiniteGridConfig;
  private chunks = new Map<string, GridChunk>();
  private visibleChunks = new Set<string>();
  private loadingChunks = new Set<string>();
  private viewportCenter: Position = { x: 0, y: 0 };

  constructor(config: InfiniteGridConfig) {
    this.config = config;
  }

  /**
   * Update viewport center and trigger chunk loading/unloading
   */
  async updateViewport(position: Position): Promise<void> {
    this.viewportCenter = position;
    
    const requiredChunks = this.getRequiredChunks(position);
    const currentChunks = new Set(this.chunks.keys());
    
    // Unload chunks that are too far away
    for (const chunkId of currentChunks) {
      if (!requiredChunks.has(chunkId)) {
        this.unloadChunk(chunkId);
      }
    }
    
    // Load new chunks
    const loadPromises: Promise<void>[] = [];
    for (const chunkId of requiredChunks) {
      if (!this.chunks.has(chunkId) && !this.loadingChunks.has(chunkId)) {
        loadPromises.push(this.loadChunk(chunkId));
      }
    }
    
    await Promise.all(loadPromises);
    
    // Update visible chunks
    this.visibleChunks = new Set(
      Array.from(requiredChunks).filter(id => {
        const chunk = this.chunks.get(id);
        return chunk?.loaded;
      })
    );
  }

  /**
   * Get chunk IDs that should be loaded for given position
   */
  private getRequiredChunks(position: Position): Set<string> {
    const chunks = new Set<string>();
    const chunkPos = this.tileToChunk(position);
    const radius = this.config.viewportRadius + this.config.preloadMargin;
    
    for (let dx = -radius; dx <= radius; dx++) {
      for (let dy = -radius; dy <= radius; dy++) {
        const x = chunkPos.x + dx;
        const y = chunkPos.y + dy;
        chunks.add(this.getChunkId({ x, y }));
      }
    }
    
    return chunks;
  }

  /**
   * Load a chunk
   */
  private async loadChunk(chunkId: string): Promise<void> {
    if (this.loadingChunks.has(chunkId)) {
      return;
    }
    
    this.loadingChunks.add(chunkId);
    const chunkPos = this.parseChunkId(chunkId);
    
    try {
      if (this.config.debug) {
        console.log(`[InfiniteGrid] Loading chunk ${chunkId}`);
      }
      
      const chunk = await this.config.loadChunk(chunkPos);
      
      if (chunk) {
        this.chunks.set(chunkId, {
          ...chunk,
          loaded: true,
          loading: false,
          loadedAt: Date.now(),
        });
        
        // Check if we exceeded max chunks
        if (this.chunks.size > this.config.maxLoadedChunks) {
          this.evictOldestChunks();
        }
      }
    } catch (error) {
      if (this.config.debug) {
        console.error(`[InfiniteGrid] Failed to load chunk ${chunkId}:`, error);
      }
    } finally {
      this.loadingChunks.delete(chunkId);
    }
  }

  /**
   * Unload a chunk
   */
  private unloadChunk(chunkId: string): void {
    const chunk = this.chunks.get(chunkId);
    if (chunk) {
      if (this.config.debug) {
        console.log(`[InfiniteGrid] Unloading chunk ${chunkId}`);
      }
      
      this.config.onChunkUnload?.(chunk);
      this.chunks.delete(chunkId);
      this.visibleChunks.delete(chunkId);
    }
  }

  /**
   * Evict oldest chunks when exceeding max
   */
  private evictOldestChunks(): void {
    const sortedChunks = Array.from(this.chunks.entries())
      .sort((a, b) => (a[1].loadedAt || 0) - (b[1].loadedAt || 0));
    
    const toRemove = sortedChunks.length - this.config.maxLoadedChunks;
    for (let i = 0; i < toRemove; i++) {
      this.unloadChunk(sortedChunks[i][0]);
    }
  }

  /**
   * Convert tile position to chunk position
   */
  private tileToChunk(position: Position): { x: number; y: number } {
    return {
      x: Math.floor(position.x / this.config.chunkSize),
      y: Math.floor(position.y / this.config.chunkSize),
    };
  }

  /**
   * Get chunk ID from chunk position
   */
  private getChunkId(chunkPos: { x: number; y: number }): string {
    return `${chunkPos.x},${chunkPos.y}`;
  }

  /**
   * Parse chunk ID into chunk position
   */
  private parseChunkId(chunkId: string): { x: number; y: number } {
    const [x, y] = chunkId.split(',').map(Number);
    return { x, y };
  }

  /**
   * Get all loaded chunks
   */
  getChunks(): GridChunk[] {
    return Array.from(this.chunks.values());
  }

  /**
   * Get visible chunks (loaded and in viewport)
   */
  getVisibleChunks(): GridChunk[] {
    return Array.from(this.visibleChunks)
      .map(id => this.chunks.get(id))
      .filter((chunk): chunk is GridChunk => chunk !== undefined);
  }

  /**
   * Check if position is in a loaded chunk
   */
  isPositionLoaded(position: Position): boolean {
    const chunkPos = this.tileToChunk(position);
    const chunkId = this.getChunkId(chunkPos);
    return this.chunks.has(chunkId);
  }

  /**
   * Get chunk containing position
   */
  getChunkForPosition(position: Position): GridChunk | null {
    const chunkPos = this.tileToChunk(position);
    const chunkId = this.getChunkId(chunkPos);
    return this.chunks.get(chunkId) || null;
  }

  /**
   * Preload chunks around position
   */
  async preloadAround(position: Position): Promise<void> {
    await this.updateViewport(position);
  }

  /**
   * Clear all chunks
   */
  clear(): void {
    for (const chunkId of this.chunks.keys()) {
      this.unloadChunk(chunkId);
    }
  }

  /**
   * Get statistics
   */
  getStats() {
    return {
      totalChunks: this.chunks.size,
      visibleChunks: this.visibleChunks.size,
      loadingChunks: this.loadingChunks.size,
      viewportCenter: this.viewportCenter,
    };
  }
}
