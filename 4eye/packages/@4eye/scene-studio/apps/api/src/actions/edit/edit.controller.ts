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
import { Edit } from '@4eye/scene-studio-shared';
import { ZodValidationPipe } from '../../common/zod.pipe.js';
import { EditService } from './edit.service.js';

@Controller('edit')
export class EditController {
  constructor(private readonly edit: EditService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(Edit.RequestDto))
  start(@Body() dto: Edit.RequestDto): { jobId: string } {
    const jobId = this.edit.startJob(dto);
    return { jobId };
  }

  @Sse(':jobId/stream')
  stream(@Param('jobId') jobId: string): Observable<MessageEvent> {
    const ch = this.edit.getChannel(jobId);
    if (!ch) throw new NotFoundException(`Unknown job: ${jobId}`);
    // replay history first, then live updates
    const replay$ = from(ch.history);
    const live$ = ch.subject.asObservable();
    return concat(replay$, live$).pipe(
      map((progress) => ({ data: progress }) as MessageEvent),
    );
  }
}
