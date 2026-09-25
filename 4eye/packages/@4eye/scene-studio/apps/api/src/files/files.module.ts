import { Module } from '@nestjs/common';
import { FilesController, ThumbsController } from './files.controller.js';
import { FilesService } from './files.service.js';
import { ThumbService } from './thumb.service.js';
import { LibraryModule } from '../library/library.module.js';

@Module({
  imports: [LibraryModule],
  controllers: [FilesController, ThumbsController],
  providers: [FilesService, ThumbService],
  exports: [FilesService, ThumbService],
})
export class FilesModule {}
