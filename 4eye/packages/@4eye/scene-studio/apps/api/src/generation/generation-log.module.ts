import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenerationLogEntity } from '../entities/generation-log.entity.js';
import { WsModule } from '../ws/ws.module.js';
import { GenerationLogController } from './generation-log.controller.js';
import { GenerationLogService } from './generation-log.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([GenerationLogEntity]), WsModule],
  controllers: [GenerationLogController],
  providers: [GenerationLogService],
  exports: [GenerationLogService],
})
export class GenerationLogModule {}
