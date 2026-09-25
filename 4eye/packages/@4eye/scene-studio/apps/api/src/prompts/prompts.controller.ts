import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CreatePromptDto, UpdatePromptDto, SavedPrompt } from '@4eye/scene-studio-shared';
import { ZodValidationPipe } from '../common/zod.pipe.js';
import { PromptsService } from './prompts.service.js';

@Controller('prompts')
export class PromptsController {
  constructor(private readonly prompts: PromptsService) {}

  @Get()
  list(): Promise<SavedPrompt[]> {
    return this.prompts.list();
  }

  @Post()
  @UsePipes(new ZodValidationPipe(CreatePromptDto))
  create(@Body() dto: CreatePromptDto): Promise<SavedPrompt> {
    return this.prompts.create(dto);
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(UpdatePromptDto))
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePromptDto,
  ): Promise<SavedPrompt> {
    return this.prompts.update(id, dto);
  }

  @Post(':id/use')
  @HttpCode(204)
  async use(@Param('id') id: string): Promise<void> {
    await this.prompts.incrementUsage(id);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): Promise<void> {
    return this.prompts.remove(id);
  }
}
