import { Body, Controller, Param, Patch, Post, UsePipes } from '@nestjs/common';
import { Browse } from '@4eye/scene-studio-shared';
import { ZodValidationPipe } from '../../common/zod.pipe.js';
import { BrowseService } from './browse.service.js';

@Controller()
export class BrowseController {
  constructor(private readonly browse: BrowseService) {}

  @Patch('assets/:id')
  @UsePipes()
  updateAsset(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(Browse.UpdateAssetDto)) dto: Browse.UpdateAssetDto,
  ) {
    return this.browse.updateAsset(id, dto);
  }

  @Post('browse/reorder')
  async reorder(
    @Body(new ZodValidationPipe(Browse.ReorderDto)) dto: Browse.ReorderDto,
  ) {
    await this.browse.reorder(dto);
    return { ok: true };
  }

  @Post('browse/bulk-tag')
  bulkTag(
    @Body(new ZodValidationPipe(Browse.BulkTagDto)) dto: Browse.BulkTagDto,
  ) {
    return this.browse.bulkTag(dto);
  }
}
