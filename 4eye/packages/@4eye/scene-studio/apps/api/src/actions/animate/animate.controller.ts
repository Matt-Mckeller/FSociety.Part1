import {
  Body,
  Controller,
  MessageEvent,
  NotFoundException,
  Param,
  Post,
  Sse,
  UsePipes,
} from '@nestjs/common';
import { Observable, concat, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Animate } from '@4eye/scene-studio-shared';
import { ZodValidationPipe } from '../../common/zod.pipe.js';
import { AnimateService } from './animate.service.js';

@Controller('animate')
export class AnimateController {
  constructor(private readonly animate: AnimateService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(Animate.RequestDto))
  start(@Body() dto: Animate.RequestDto): { jobId: string } {
    const jobId = this.animate.startJob(dto);
    return { jobId };
  }

  @Sse(':jobId/stream')
  stream(@Param('jobId') jobId: string): Observable<MessageEvent> {
    const ch = this.animate.getChannel(jobId);
    if (!ch) throw new NotFoundException(`Unknown job: ${jobId}`);
    const replay$ = from(ch.history);
    const live$ = ch.subject.asObservable();
    return concat(replay$, live$).pipe(
      map((progress) => ({ data: progress }) as MessageEvent),
    );
  }
}
