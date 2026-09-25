import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  AddFrameDto,
  CreateSequenceDto,
  ReorderFramesDto,
  Sequence,
  UpdateSequenceDto,
} from '@4eye/scene-studio-shared';
import { ZodValidationPipe } from '../common/zod.pipe.js';
import { SequencesService } from './sequences.service.js';

@Controller('sequences')
export class SequencesController {
  constructor(private readonly sequences: SequencesService) {}

  @Get()
  list(): Promise<Sequence[]> {
    return this.sequences.list();
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<Sequence> {
    // accept either uuid or slug; try id first
    try {
      return await this.sequences.get(id);
    } catch (err) {
      if (err instanceof NotFoundException) return this.sequences.getBySlug(id);
      throw err;
    }
  }

  @Post()
  create(
    @Body(new ZodValidationPipe(CreateSequenceDto)) dto: CreateSequenceDto,
  ): Promise<Sequence> {
    return this.sequences.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateSequenceDto)) dto: UpdateSequenceDto,
  ): Promise<Sequence> {
    return this.sequences.update(id, dto);
  }

  @Put(':id/frames')
  reorder(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(ReorderFramesDto)) dto: ReorderFramesDto,
  ): Promise<Sequence> {
    return this.sequences.reorderFrames(id, dto.frameIds);
  }

  @Post(':id/frames')
  addFrame(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(AddFrameDto)) dto: AddFrameDto,
  ): Promise<Sequence> {
    return this.sequences.addFrame(id, dto.assetId, dto.position);
  }

  @Delete(':id/frames/:assetId')
  removeFrame(@Param('id') id: string, @Param('assetId') assetId: string): Promise<Sequence> {
    return this.sequences.removeFrame(id, assetId);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): Promise<void> {
    return this.sequences.remove(id);
  }
}
