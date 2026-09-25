import { Module } from '@nestjs/common';
import { LibraryModule } from '../library/library.module.js';
import { FilesModule } from '../files/files.module.js';
import { WsModule } from '../ws/ws.module.js';
import { GenerationLogModule } from '../generation/generation-log.module.js';
import { SequencesModule } from '../sequences/sequences.module.js';
import { GenerateService } from './generate.service.js';
import { GenerateController } from './generate.controller.js';
import { OpenAiImageGenerateProvider } from './providers/openai-image-generate.provider.js';
import { GeminiImageGenerateProvider } from './providers/gemini-image-generate.provider.js';
import { FakeImageGenerateProvider } from './providers/fake-image-generate.provider.js';

@Module({
  imports: [LibraryModule, FilesModule, WsModule, GenerationLogModule, SequencesModule],
  controllers: [GenerateController],
  providers: [
    GenerateService,
    OpenAiImageGenerateProvider,
    GeminiImageGenerateProvider,
    FakeImageGenerateProvider,
  ],
  exports: [GenerateService],
})
export class GenerateModule {}
