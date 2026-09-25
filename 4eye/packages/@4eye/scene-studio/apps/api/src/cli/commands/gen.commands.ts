import type { NestFactory } from '@nestjs/core';
import type { Generate } from '@4eye/scene-studio-shared';
import { GenerationLogService } from '../../generation/generation-log.service.js';
import { GenerateService } from '../../generate/generate.service.js';
import { numFlag, strFlag, pad, type ParsedArgs } from '../args.util.js';
import type { Generation } from '@4eye/scene-studio-shared';

type App = Awaited<ReturnType<typeof NestFactory.createApplicationContext>>;

export async function cmdGenLog(app: App, args: ParsedArgs): Promise<void> {
  const genLog = app.get(GenerationLogService);
  const query: Generation.ListQueryDto = {
    kind: strFlag(args.flags, 'kind') as Generation.Kind | undefined,
    status: strFlag(args.flags, 'status') as Generation.Status | undefined,
    sceneCode: strFlag(args.flags, 'scene'),
    seedId: strFlag(args.flags, 'seed'),
    since: strFlag(args.flags, 'since'),
    limit: numFlag(args.flags, 'limit') ?? 50,
    offset: numFlag(args.flags, 'offset') ?? 0,
  };
  const rows = await genLog.list(query);
  if (rows.length === 0) {
    console.log('(no log rows)');
    return;
  }
  console.log(pad('CREATED', 20), pad('KIND', 10), pad('STATUS', 10), pad('SCENE', 8), pad('SEED', 30), pad('LOG ID', 36), 'OUTPUTS');
  console.log('-'.repeat(140));
  for (const r of rows) {
    console.log(
      pad(r.createdAt.slice(0, 19).replace('T', ' '), 20),
      pad(r.kind, 10),
      pad(r.status, 10),
      pad(r.sceneCode ?? '-', 8),
      pad(r.seedId ?? '-', 30),
      pad(r.id, 36),
      r.outputAssetIds.join(','),
    );
  }
}

export async function cmdGenShow(app: App, args: ParsedArgs): Promise<void> {
  const id = args.positional[0];
  if (!id) {
    console.error('Usage: gen:show <logId>');
    process.exitCode = 1;
    return;
  }
  const genLog = app.get(GenerationLogService);
  const row = await genLog.get(id);
  console.log(JSON.stringify(row, null, 2));
}

export async function cmdGenReplay(app: App, args: ParsedArgs): Promise<void> {
  const id = args.positional[0];
  if (!id) {
    console.error('Usage: gen:replay <logId> [--variations N] [--model NAME]');
    process.exitCode = 1;
    return;
  }
  const genLog = app.get(GenerationLogService);
  const generate = app.get(GenerateService);
  const row = await genLog.get(id);
  if (row.kind !== 'generate') {
    console.error(`Cannot replay log kind=${row.kind} (only 'generate' supported)`);
    process.exitCode = 1;
    return;
  }

  const referenceImages: Generate.ImageRefDto[] = [];
  const referenceFiles: Generate.FileRefDto[] = [];
  for (const ref of row.references) {
    if (ref.kind === 'image' && ref.assetId) {
      referenceImages.push({ assetId: ref.assetId, role: ref.role, description: ref.description });
    } else if (ref.kind === 'text') {
      referenceFiles.push({ selector: ref.selector, role: ref.role, description: ref.description, section: ref.section });
    }
  }

  const params = (row.params ?? {}) as Record<string, unknown>;
  const dto: Generate.RequestDto = {
    prompt: row.promptBody ?? row.prompt,
    referenceAssetIds: [],
    referenceImages,
    referenceFiles,
    size: (params.size as Generate.RequestDto['size']) ?? 'auto',
    variations: numFlag(args.flags, 'variations') ?? (params.variations as number) ?? 1,
    model: strFlag(args.flags, 'model') ?? row.model,
    title: (row.rawRequest as Record<string, unknown> | null)?.['title'] as string | undefined,
    sceneCode: row.sceneCode ?? undefined,
    tags: ['replay', `replay-of:${row.id.slice(0, 8)}`],
    seedId: row.seedId ?? undefined,
  };

  const result = await generate.runOnce(dto);
  console.log(JSON.stringify({ replayOf: row.id, logId: result.logId, assetIds: result.assets.map((a) => a.id) }, null, 2));
}
