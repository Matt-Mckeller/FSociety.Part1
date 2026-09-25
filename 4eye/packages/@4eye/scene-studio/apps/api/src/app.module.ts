import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { loadConfig } from './config/config.service.js';
import { AssetEntity } from './entities/asset.entity.js';
import { AssetHistoryEntity } from './entities/asset-history.entity.js';
import { PromptEntity } from './entities/prompt.entity.js';
import { SequenceEntity } from './entities/sequence.entity.js';
import { GenerationLogEntity } from './entities/generation-log.entity.js';
import { LibraryModule } from './library/library.module.js';
import { FilesModule } from './files/files.module.js';
import { BrowseModule } from './actions/browse/browse.module.js';
import { EditModule } from './actions/edit/edit.module.js';
import { AnimateModule } from './actions/animate/animate.module.js';
import { ChatModule } from './chat/chat.module.js';
import { PromptsModule } from './prompts/prompts.module.js';
import { SequencesModule } from './sequences/sequences.module.js';
import { GenerationLogModule } from './generation/generation-log.module.js';
import { GenerateModule } from './generate/generate.module.js';
import { SeedsModule } from './seeds/seeds.module.js';
import { WsModule } from './ws/ws.module.js';
import { HealthModule } from './health/health.module.js';
import { ValidateModule } from './validate/validate.module.js';

const cfg = loadConfig();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: cfg.dbPath,
      entities: [AssetEntity, AssetHistoryEntity, PromptEntity, SequenceEntity, GenerationLogEntity],
      synchronize: true, // local-first single-user app; migrations would be overkill
    }),
    WsModule,
    LibraryModule,
    FilesModule,
    BrowseModule,
    EditModule,
    AnimateModule,
    ChatModule,
    PromptsModule,
    SequencesModule,
    GenerationLogModule,
    GenerateModule,
    SeedsModule,
    HealthModule,
    ValidateModule,
  ],
})
export class AppModule {}
