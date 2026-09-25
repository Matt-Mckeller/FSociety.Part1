import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetEntity } from '../entities/asset.entity.js';
import { LibraryModule } from '../library/library.module.js';
import { SequencesModule } from '../sequences/sequences.module.js';
import { GenerateModule } from '../generate/generate.module.js';
import { SeedRefResolverService } from './seed.ref-resolver.service.js';
import { SeedRunnerService } from './seed.runner.service.js';
import { SeedRegistryService } from './seed.registry.service.js';
import { SeedsController } from './seeds.controller.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssetEntity]),
    LibraryModule,
    SequencesModule,
    GenerateModule,
  ],
  controllers: [SeedsController],
  providers: [SeedRefResolverService, SeedRunnerService, SeedRegistryService],
  exports: [SeedRefResolverService, SeedRunnerService, SeedRegistryService],
})
export class SeedsModule {}
