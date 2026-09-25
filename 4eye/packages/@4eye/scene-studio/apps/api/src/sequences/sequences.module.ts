import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SequenceEntity } from '../entities/sequence.entity.js';
import { LibraryModule } from '../library/library.module.js';
import { WsModule } from '../ws/ws.module.js';
import { SequencesController } from './sequences.controller.js';
import { SequencesService } from './sequences.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([SequenceEntity]), LibraryModule, WsModule],
  controllers: [SequencesController],
  providers: [SequencesService],
  exports: [SequencesService],
})
export class SequencesModule {}
