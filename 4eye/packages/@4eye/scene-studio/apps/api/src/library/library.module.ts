import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetEntity } from '../entities/asset.entity.js';
import { AssetHistoryEntity } from '../entities/asset-history.entity.js';
import { LibraryController } from './library.controller.js';
import { LibraryService } from './library.service.js';
import { LibraryExporter } from './library.exporter.js';
import { WsModule } from '../ws/ws.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([AssetEntity, AssetHistoryEntity]), WsModule],
  controllers: [LibraryController],
  providers: [LibraryService, LibraryExporter],
  exports: [LibraryService],
})
export class LibraryModule {}
