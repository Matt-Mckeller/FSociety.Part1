import type { NestFactory } from '@nestjs/core';
import { SeedRegistryService } from '../../seeds/seed.registry.service.js';
import { SeedRunnerService } from '../../seeds/seed.runner.service.js';
import { boolFlag, numFlag, strFlag, type ParsedArgs } from '../args.util.js';

type App = Awaited<ReturnType<typeof NestFactory.createApplicationContext>>;

export async function cmdSeedList(app: App): Promise<void> {
  const registry = app.get(SeedRegistryService);
  const seeds = await registry.list({ refresh: true });
  if (seeds.length === 0) {
    console.log('(no seeds found)');
    return;
  }
  const pad = (s: string, n: number) => s.length >= n ? s.slice(0, n) : s + ' '.repeat(n - s.length);
  console.log(pad('ID', 36), pad('SCENE', 8), pad('REFS', 5), 'DESCRIPTION');
  console.log('-'.repeat(100));
  for (const s of seeds) {
    console.log(pad(s.id, 36), pad(s.sceneCode ?? '-', 8), pad(String(s.references.length), 5), s.description);
  }
}

export async function cmdSeedShow(app: App, args: ParsedArgs): Promise<void> {
  const id = args.positional[0];
  if (!id) {
    console.error('Usage: seed:show <id>');
    process.exitCode = 1;
    return;
  }
  const registry = app.get(SeedRegistryService);
  const seed = await registry.get(id);
  console.log(JSON.stringify(seed, null, 2));
}

export async function cmdSeedRun(app: App, args: ParsedArgs): Promise<void> {
  const id = args.positional[0];
  if (!id) {
    console.error('Usage: seed:run <id> [--dry-run] [--variations N] [--replace] [--model NAME]');
    process.exitCode = 1;
    return;
  }
  const registry = app.get(SeedRegistryService);
  const runner = app.get(SeedRunnerService);
  const seed = await registry.get(id);
  const result = await runner.run(seed, {
    dryRun: boolFlag(args.flags, 'dry-run'),
    variations: numFlag(args.flags, 'variations'),
    replace: boolFlag(args.flags, 'replace'),
    model: strFlag(args.flags, 'model'),
  });
  console.log(JSON.stringify({
    seedId: result.seedId,
    logId: result.logId,
    assetIds: result.assets.map((a) => a.id),
  }, null, 2));
}
