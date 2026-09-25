import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThanOrEqual, Repository } from 'typeorm';
import { randomUUID } from 'node:crypto';
import type { Generation, GenerationLog } from '@4eye/scene-studio-shared';
import { GenerationLogEntity } from '../entities/generation-log.entity.js';
import { WsGateway } from '../ws/ws.gateway.js';

/**
 * What you provide when starting a generation log entry.
 * The service fills in id/createdAt and writes the row in `running` state;
 * call `finishSuccess` / `finishError` when the job completes.
 */
export interface StartLogInput {
  kind: Generation.Kind;
  provider: string;
  model: string;
  prompt: string;
  promptBody?: string;
  references?: Generation.ReferenceResolved[];
  inputAssetIds?: string[];
  params?: Record<string, unknown>;
  seedId?: string;
  seedGitSha?: string;
  sceneCode?: string;
  targetSequenceId?: string;
  rawRequest?: Record<string, unknown>;
}

export interface FinishSuccessInput {
  outputAssetIds: string[];
  targetSequenceFrameIds?: string[];
  providerJobId?: string;
  cost?: Generation.Cost;
  rawResponseMeta?: Record<string, unknown>;
}

@Injectable()
export class GenerationLogService {
  constructor(
    @InjectRepository(GenerationLogEntity)
    private readonly repo: Repository<GenerationLogEntity>,
    private readonly ws: WsGateway,
  ) {}

  /** Create a `running` log row. Returns the row id. */
  async start(input: StartLogInput): Promise<string> {
    const e = new GenerationLogEntity();
    e.id = randomUUID();
    e.finishedAt = null;
    e.durationMs = null;
    e.kind = input.kind;
    e.status = 'running';
    e.provider = input.provider;
    e.model = input.model;
    e.prompt = input.prompt;
    e.promptBody = input.promptBody ?? null;
    e.referencesJson = JSON.stringify(input.references ?? []);
    e.inputAssetIdsJson = JSON.stringify(input.inputAssetIds ?? []);
    e.outputAssetIdsJson = '[]';
    e.targetSequenceId = input.targetSequenceId ?? null;
    e.targetSequenceFrameIdsJson = '[]';
    e.paramsJson = JSON.stringify(input.params ?? {});
    e.seedId = input.seedId ?? null;
    e.seedGitSha = input.seedGitSha ?? null;
    e.sceneCode = input.sceneCode ?? null;
    e.costJson = null;
    e.providerJobId = null;
    e.errorMessage = null;
    e.rawRequestJson = JSON.stringify(input.rawRequest ?? {});
    e.rawResponseMetaJson = null;
    const saved = await this.repo.save(e);
    this.broadcast(saved);
    return saved.id;
  }

  async finishSuccess(id: string, input: FinishSuccessInput): Promise<GenerationLog> {
    const e = await this.findOrThrow(id);
    e.status = 'succeeded';
    e.finishedAt = new Date();
    e.durationMs = e.finishedAt.getTime() - e.createdAt.getTime();
    e.outputAssetIdsJson = JSON.stringify(input.outputAssetIds);
    e.targetSequenceFrameIdsJson = JSON.stringify(input.targetSequenceFrameIds ?? []);
    e.providerJobId = input.providerJobId ?? null;
    e.costJson = input.cost ? JSON.stringify(input.cost) : null;
    e.rawResponseMetaJson = input.rawResponseMeta
      ? JSON.stringify(input.rawResponseMeta)
      : null;
    const saved = await this.repo.save(e);
    this.broadcast(saved);
    return toDto(saved);
  }

  async finishError(id: string, errorMessage: string): Promise<GenerationLog> {
    const e = await this.findOrThrow(id);
    e.status = 'failed';
    e.finishedAt = new Date();
    e.durationMs = e.finishedAt.getTime() - e.createdAt.getTime();
    e.errorMessage = errorMessage;
    const saved = await this.repo.save(e);
    this.broadcast(saved);
    return toDto(saved);
  }

  async list(query: Generation.ListQueryDto): Promise<GenerationLog[]> {
    const where: Record<string, unknown> = {};
    if (query.kind) where.kind = query.kind;
    if (query.status) where.status = query.status;
    if (query.sceneCode) where.sceneCode = query.sceneCode;
    if (query.seedId) where.seedId = query.seedId;
    if (query.since) where.createdAt = MoreThanOrEqual(new Date(query.since));
    const rows = await this.repo.find({
      where,
      order: { createdAt: 'DESC' },
      take: query.limit,
      skip: query.offset,
    });
    return rows.map(toDto);
  }

  async get(id: string): Promise<GenerationLog> {
    return toDto(await this.findOrThrow(id));
  }

  /** Convenience for in-process callers that want to wrap an async op with logging. */
  async track<T>(
    start: StartLogInput,
    run: (logId: string) => Promise<{ result: T; finish: FinishSuccessInput }>,
  ): Promise<{ logId: string; result: T }> {
    const logId = await this.start(start);
    try {
      const { result, finish } = await run(logId);
      await this.finishSuccess(logId, finish);
      return { logId, result };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      await this.finishError(logId, msg);
      throw err;
    }
  }

  private async findOrThrow(id: string): Promise<GenerationLogEntity> {
    const e = await this.repo.findOne({ where: { id } });
    if (!e) throw new NotFoundException(`GenerationLog not found: ${id}`);
    return e;
  }

  private broadcast(e: GenerationLogEntity): void {
    this.ws.broadcast({ type: 'generation:logged', log: toDto(e) });
  }
}

function toDto(e: GenerationLogEntity): GenerationLog {
  return {
    id: e.id,
    createdAt: e.createdAt.toISOString(),
    finishedAt: e.finishedAt ? e.finishedAt.toISOString() : null,
    durationMs: e.durationMs,
    kind: e.kind,
    status: e.status,
    provider: e.provider,
    model: e.model,
    prompt: e.prompt,
    promptBody: e.promptBody,
    references: safeJson(e.referencesJson, []),
    inputAssetIds: safeJson(e.inputAssetIdsJson, []),
    outputAssetIds: safeJson(e.outputAssetIdsJson, []),
    targetSequenceId: e.targetSequenceId,
    targetSequenceFrameIds: safeJson(e.targetSequenceFrameIdsJson, []),
    params: safeJson(e.paramsJson, {} as Record<string, unknown>),
    seedId: e.seedId,
    seedGitSha: e.seedGitSha,
    sceneCode: e.sceneCode,
    cost: e.costJson ? safeJson(e.costJson, null) : null,
    providerJobId: e.providerJobId,
    errorMessage: e.errorMessage,
    rawRequest: safeJson(e.rawRequestJson, {} as Record<string, unknown>),
    rawResponseMeta: e.rawResponseMetaJson
      ? safeJson(e.rawResponseMetaJson, {} as Record<string, unknown>)
      : null,
  };
}

function safeJson<T>(s: string | null | undefined, fallback: T): T {
  if (!s) return fallback;
  try {
    return JSON.parse(s) as T;
  } catch {
    return fallback;
  }
}

// Unused import guard for typecheck; LessThan kept exported in case we add pagination by id later.
void LessThan;
