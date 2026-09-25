import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common';
import type { Response } from 'express';
import { Chat } from '@4eye/scene-studio-shared';
import { ZodValidationPipe } from '../common/zod.pipe.js';
import { ChatService } from './chat.service.js';

@Controller('chat')
export class ChatController {
  constructor(private readonly chat: ChatService) {}

  /**
   * POST + SSE: EventSource doesn't support POST so the frontend uses
   * fetch() with a streaming body reader. We write `data: ...\n\n` frames
   * manually because Nest's @Sse decorator only works with GET.
   */
  @Post('stream')
  @UsePipes(new ZodValidationPipe(Chat.RequestDto))
  stream(@Body() dto: Chat.RequestDto, @Res() res: Response): void {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders?.();

    const sub = this.chat.stream(dto).subscribe({
      next: (evt) => {
        res.write(`data: ${JSON.stringify(evt)}\n\n`);
      },
      error: (err: Error) => {
        res.write(`data: ${JSON.stringify({ type: 'error', error: err.message })}\n\n`);
        res.write(`data: ${JSON.stringify({ type: 'done' })}\n\n`);
        res.end();
      },
      complete: () => res.end(),
    });

    res.on('close', () => sub.unsubscribe());
  }
}
