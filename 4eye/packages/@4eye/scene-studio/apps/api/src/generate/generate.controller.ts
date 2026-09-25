import {
  Body,
  Controller,
  MessageEvent,
  NotFoundException,
  Param,
  Post,
  Sse,
} from '@nestjs/common';
import { Observable, concat, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Generate } from '@4eye/scene-studio-shared';
import { ZodValidationPipe } from '../common/zod.pipe.js';
import { GenerateService } from './generate.service.js';

@Controller('generate')
export class GenerateController {
  constructor(private readonly gen: GenerateService) {}

  @Post()
  start(
    @Body(new ZodValidationPipe(Generate.RequestDto))
    dto: Generate.RequestDto,
  ): { jobId: string } {
    const jobId = this.gen.startJob(dto);
    return { jobId };
  }

  @Sse(':jobId/stream')
  stream(@Param('jobId') jobId: string): Observable<MessageEvent> {
    const ch = this.gen.getChannel(jobId);
    if (!ch) throw new NotFoundException(`Unknown job: ${jobId}`);
    const replay$ = from(ch.history);
    const live$ = ch.subject.asObservable();
    return concat(replay$, live$).pipe(map((p) => ({ data: p }) as MessageEvent));
  }
}
