import { Module } from '@nestjs/common';
import { LibraryModule } from '../../library/library.module.js';
import { FilesModule } from '../../files/files.module.js';
import { WsModule } from '../../ws/ws.module.js';
import { GenerationLogModule } from '../../generation/generation-log.module.js';
import { EditService } from './edit.service.js';
import { EditController } from './edit.controller.js';
import { OpenAiImageProvider } from './providers/openai-image.provider.js';
import { GeminiImageProvider } from './providers/gemini-image.provider.js';
import { FakeImageProvider } from './providers/fake-image.provider.js';

@Module({
  imports: [LibraryModule, FilesModule, WsModule, GenerationLogModule],
  controllers: [EditController],
  providers: [EditService, OpenAiImageProvider, GeminiImageProvider, FakeImageProvider],
  exports: [EditService],
})
export class EditModule {}
