import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../common/zod.pipe.js';
import { SeedRegistryService } from './seed.registry.service.js';
import { SeedRunnerService, type SeedRunResult } from './seed.runner.service.js';
import type { LoadedSeed } from './seed.kit.js';

const RunSeedDto = z.object({
  dryRun: z.boolean().optional(),
  variations: z.number().int().min(1).max(4).optional(),
  replace: z.boolean().optional(),
});
type RunSeedDto = z.infer<typeof RunSeedDto>;

/**
 * Serializable shape for HTTP responses (omit filePath leaks if you want; for now we
 * include them — this is a local-first single-user app).
 */
function toDto(seed: LoadedSeed): LoadedSeed {
  return seed;
}

@Controller('seeds')
export class SeedsController {
  constructor(
    private readonly registry: SeedRegistryService,
    private readonly runner: SeedRunnerService,
  ) {}

  @Get()
  async list(): Promise<LoadedSeed[]> {
    const all = await this.registry.list({ refresh: true });
    return all.map(toDto);
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<LoadedSeed> {
    return toDto(await this.registry.get(id));
  }

  @Post(':id/run')
  async run(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(RunSeedDto)) body: RunSeedDto,
  ): Promise<SeedRunResult> {
    const seed = await this.registry.get(id);
    return this.runner.run(seed, body);
  }
}
