import { Module } from '@nestjs/common';
import { LibraryModule } from '../library/library.module.js';
import { BrowseModule } from '../actions/browse/browse.module.js';
import { EditModule } from '../actions/edit/edit.module.js';
import { AnimateModule } from '../actions/animate/animate.module.js';
import { ChatController } from './chat.controller.js';
import { ChatService } from './chat.service.js';

@Module({
  imports: [LibraryModule, BrowseModule, EditModule, AnimateModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
