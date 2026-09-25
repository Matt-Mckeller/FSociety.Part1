import { Module } from '@nestjs/common';
import { LibraryModule } from '../../library/library.module.js';
import { FilesModule } from '../../files/files.module.js';
import { WsModule } from '../../ws/ws.module.js';
import { GenerationLogModule } from '../../generation/generation-log.module.js';
import { AnimateService } from './animate.service.js';
import { AnimateController } from './animate.controller.js';
import { RunwayProvider } from './providers/runway.provider.js';
import { VeoProvider } from './providers/veo.provider.js';
import { FakeVideoProvider } from './providers/fake-video.provider.js';

@Module({
  imports: [LibraryModule, FilesModule, WsModule, GenerationLogModule],
  controllers: [AnimateController],
  providers: [AnimateService, RunwayProvider, VeoProvider, FakeVideoProvider],
  exports: [AnimateService],
})
export class AnimateModule {}
