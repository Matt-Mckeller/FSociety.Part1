import { Controller, Get, Param, Query } from '@nestjs/common';
import type { Generation, GenerationLog } from '@4eye/scene-studio-shared';
import { Generation as GenerationSchemas } from '@4eye/scene-studio-shared';
import { ZodValidationPipe } from '../common/zod.pipe.js';
import { GenerationLogService } from './generation-log.service.js';

@Controller('generations')
export class GenerationLogController {
  constructor(private readonly logs: GenerationLogService) {}

  @Get()
  list(
    @Query(new ZodValidationPipe(GenerationSchemas.ListQueryDto))
    query: Generation.ListQueryDto,
  ): Promise<GenerationLog[]> {
    return this.logs.list(query);
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<GenerationLog> {
    return this.logs.get(id);
  }
}
