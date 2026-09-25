import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { readdir, stat } from 'node:fs/promises';
import { join, relative, resolve, dirname } from 'node:path';
import { existsSync } from 'node:fs';
import { pathToFileURL, fileURLToPath } from 'node:url';
import type { LoadedSeed, SeedDefinition } from './seed.kit.js';

/**
 * Discovers all `*.seed.ts` files under `apps/api/src/seeds/` and dynamic-imports them.
 * Each file is expected to default-export the return value of `defineSeed(...)`.
 *
 * The registry refreshes on demand (no filesystem watcher) — call `refresh()` or
 * `list({ refresh: true })` to pick up new / edited seed files in a long-running process.
 */
@Injectable()
export class SeedRegistryService implements OnModuleInit {
  private readonly log = new Logger(SeedRegistryService.name);
  private cache: Map<string, LoadedSeed> | null = null;

  /** Absolute path to the seeds root directory. */
  readonly seedsRoot: string = resolveSeedsRoot();

  async onModuleInit(): Promise<void> {
    // Load once at startup so duplicates fail fast.
    await this.refresh();
  }

  async list(opts: { refresh?: boolean } = {}): Promise<LoadedSeed[]> {
    if (!this.cache || opts.refresh) await this.refresh();
    return Array.from(this.cache!.values()).sort((a, b) => a.id.localeCompare(b.id));
  }

  async get(id: string): Promise<LoadedSeed> {
    if (!this.cache) await this.refresh();
    const hit = this.cache!.get(id);
    if (!hit) throw new NotFoundException(`Seed not found: ${id}`);
    return hit;
  }

  async refresh(): Promise<void> {
    const cache = new Map<string, LoadedSeed>();
    if (!existsSync(this.seedsRoot)) {
      this.log.warn(`Seeds root does not exist: ${this.seedsRoot}`);
      this.cache = cache;
      return;
    }
    const files = await walk(this.seedsRoot, (name) => name.endsWith('.seed.ts'));
    this.log.log(`Discovered ${files.length} seed file(s) under ${this.seedsRoot}`);
    for (const filePath of files) {
      try {
        const seed = await loadSeedFile(filePath);
        const loaded: LoadedSeed = {
          ...seed,
          filePath,
          relativePath: relative(this.seedsRoot, filePath),
        };
        if (cache.has(seed.id)) {
          throw new Error(
            `Duplicate seed id "${seed.id}" — ${cache.get(seed.id)!.relativePath} vs ${loaded.relativePath}`,
          );
        }
        cache.set(seed.id, loaded);
      } catch (err) {
        this.log.error(`Failed to load seed ${filePath}: ${(err as Error).message}`);
        throw err;
      }
    }
    this.cache = cache;
  }
}

// ── helpers ────────────────────────────────────────────────────────────────

async function walk(dir: string, match: (name: string) => boolean): Promise<string[]> {
  const out: string[] = [];
  async function recurse(d: string): Promise<void> {
    const entries = await readdir(d);
    for (const name of entries) {
      const full = join(d, name);
      const s = await stat(full);
      if (s.isDirectory()) await recurse(full);
      else if (match(name)) out.push(full);
    }
  }
  await recurse(dir);
  return out;
}

async function loadSeedFile(absPath: string): Promise<SeedDefinition> {
  // Dynamic import relies on the @swc-node/register ESM loader being active
  // (which it is when launched via `node --import @swc-node/register/esm-register`).
  const url = pathToFileURL(absPath).href + `?t=${Date.now()}`; // bust import cache on refresh
  const mod = await import(url);
  const seed = (mod.default ?? mod.seed ?? mod) as SeedDefinition;
  if (!seed || typeof seed !== 'object' || typeof seed.id !== 'string') {
    throw new Error(
      `Seed file ${absPath} must default-export a SeedDefinition (use defineSeed())`,
    );
  }
  return seed;
}

function resolveSeedsRoot(): string {
  // This file lives at apps/api/src/seeds/seed.registry.service.ts; sibling files are seeds.
  const here = dirname(fileURLToPath(import.meta.url));
  return here;
}
