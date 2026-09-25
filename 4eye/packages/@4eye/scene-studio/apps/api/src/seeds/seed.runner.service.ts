import { Injectable, Logger } from '@nestjs/common';
import { execSync } from 'node:child_process';
import { dirname } from 'node:path';
import type { Asset, Generate } from '@4eye/scene-studio-shared';
import { GenerateService } from '../generate/generate.service.js';
import { SequencesService } from '../sequences/sequences.service.js';
import { SeedRefResolverService } from './seed.ref-resolver.service.js';
import type { LoadedSeed, SeedImageRef, SeedTextRef } from './seed.kit.js';
import { assertKnownModel } from '../common/providers/model-registry.js';

export interface SeedRunResult {
  seedId: string;
  logId: string;
  assets: Asset[];
}

export interface SeedRunOptions {
  /** Skip the actual generation and just resolve refs + log the planned request. */
  dryRun?: boolean;
  /** Override variations from the seed file. */
  variations?: number;
  /** If true and the seed targets a sequence position, replace the asset at that position
   *  instead of inserting beside it. Default false. */
  replace?: boolean;
  /** Override the image model for this run (e.g. `gemini-3-pro-image-preview`). */
  model?: string;
}

@Injectable()
export class SeedRunnerService {
  private readonly log = new Logger(SeedRunnerService.name);
  /** Cached so we record it once per process boot. */
  private gitSha: string | null | undefined;

  constructor(
    private readonly refs: SeedRefResolverService,
    private readonly generate: GenerateService,
    private readonly sequences: SequencesService,
  ) {}

  async run(seed: LoadedSeed, opts: SeedRunOptions = {}): Promise<SeedRunResult> {
    this.log.log(`Running seed ${seed.id} (${seed.description})`);

    if (seed.kind !== 'generate') {
      throw new Error(
        `seed:run only handles kind=generate seeds. Seed "${seed.id}" has kind="${seed.kind}". Use "vid:run --seed ${seed.id}" for animate seeds.`,
      );
    }

    // ── 1. Preconditions ──────────────────────────────────────────────────
    if (seed.preconditions) {
      for (const pre of seed.preconditions) {
        const exists = await this.refs.exists(pre.ref, dirname(seed.filePath));
        const wantExists = pre.exists !== false;
        if (exists !== wantExists) {
          throw new Error(
            `Precondition failed for seed ${seed.id}: ref "${pre.ref}" exists=${exists}, expected ${wantExists}`,
          );
        }
      }
    }

    // ── 2. Resolve image + text refs ──────────────────────────────────────
    const seedDir = dirname(seed.filePath);
    const imageRefs: SeedImageRef[] = seed.references.filter(
      (r): r is SeedImageRef => r.kind === 'image',
    );
    const textRefs: SeedTextRef[] = seed.references.filter(
      (r): r is SeedTextRef => r.kind === 'text',
    );

    const referenceImages: Generate.ImageRefDto[] = [];
    for (const r of imageRefs) {
      try {
        const resolved = await this.refs.resolveImage(r.ref);
        referenceImages.push({
          assetId: resolved.assetId,
          role: r.role,
          description: r.description,
        });
      } catch (err) {
        if (r.required === false) {
          this.log.warn(`Optional image ref ${r.ref} did not resolve — skipping`);
          continue;
        }
        throw err;
      }
    }
    if (referenceImages.length === 0) {
      throw new Error(`Seed ${seed.id} has no resolvable image references`);
    }

    const referenceFiles: Generate.FileRefDto[] = [];
    for (const r of textRefs) {
      try {
        const resolved = this.refs.resolveText(r.ref, seedDir);
        // The markdown loader takes a selector + baseDir; we feed it the absolute
        // path with an empty baseDir (loader's isAbsolute branch handles it).
        referenceFiles.push({
          selector: resolved.absPath,
          role: r.role,
          description: r.description,
          section: r.section,
          concepts: r.concepts,
        });
      } catch (err) {
        if (r.required === false) {
          this.log.warn(`Optional text ref ${r.ref} did not resolve — skipping`);
          continue;
        }
        throw err;
      }
    }

    // ── 3. Resolve sequence target ────────────────────────────────────────
    let insertIntoSequence: Generate.RequestDto['insertIntoSequence'];
    if (seed.insertIntoSequence) {
      const target = seed.insertIntoSequence;
      let sequenceId = target.sequenceId;
      if (!sequenceId && target.slug) {
        const seq = await this.sequences.getBySlug(target.slug);
        sequenceId = seq.id;
      }
      if (!sequenceId) {
        throw new Error(`Seed ${seed.id} insertIntoSequence missing slug/sequenceId`);
      }
      insertIntoSequence = { sequenceId, position: target.position };

      // `replace` option: remove the existing frame at `position` before insertion.
      if (opts.replace && target.position !== undefined) {
        const seq = await this.sequences.get(sequenceId);
        const existing = seq.frameIds[target.position];
        if (existing) {
          await this.sequences.removeFrame(sequenceId, existing);
        }
      }
    }

    // ── 4. Build DTO ──────────────────────────────────────────────────────
    const modelName = opts.model ?? seed.params?.model;
    if (modelName) assertKnownModel(modelName, 'image');
    const dto: Generate.RequestDto = {
      prompt: seed.prompt,
      referenceAssetIds: [],
      referenceImages,
      referenceFiles,
      size: seed.params?.size ?? 'auto',
      variations: opts.variations ?? seed.params?.variations ?? 1,
      model: modelName,
      title: seed.title,
      sceneCode: seed.sceneCode,
      tags: ['from-seed', ...(seed.tags ?? [])],
      insertIntoSequence,
      seedId: seed.id,
      seedGitSha: this.getGitSha() ?? undefined,
    };

    if (opts.dryRun) {
      this.log.log(`[dry-run] seed ${seed.id} would generate with:`);
      this.log.log(JSON.stringify(dto, null, 2));
      return { seedId: seed.id, logId: '(dry-run)', assets: [] };
    }

    // ── 5. Fire generation ────────────────────────────────────────────────
    const { logId, assets } = await this.generate.runOnce(dto);
    this.log.log(`Seed ${seed.id} → log ${logId} (${assets.length} asset(s))`);
    return { seedId: seed.id, logId, assets };
  }

  /** Returns the current repo HEAD sha, or null if unavailable. Cached. */
  getGitSha(): string | null {
    if (this.gitSha !== undefined) return this.gitSha;
    try {
      const sha = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
      this.gitSha = sha || null;
    } catch {
      this.gitSha = null;
    }
    return this.gitSha;
  }
}
