import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromptEntity } from '../entities/prompt.entity.js';
import { PromptsController } from './prompts.controller.js';
import { PromptsService } from './prompts.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([PromptEntity])],
  controllers: [PromptsController],
  providers: [PromptsService],
  exports: [PromptsService],
})
export class PromptsModule {}
