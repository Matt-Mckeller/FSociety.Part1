import { Module } from '@nestjs/common';
import { LibraryModule } from '../../library/library.module.js';
import { BrowseController } from './browse.controller.js';
import { BrowseService } from './browse.service.js';

@Module({
  imports: [LibraryModule],
  controllers: [BrowseController],
  providers: [BrowseService],
  exports: [BrowseService],
})
export class BrowseModule {}
