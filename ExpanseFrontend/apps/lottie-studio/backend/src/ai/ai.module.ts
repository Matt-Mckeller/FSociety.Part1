/**
 * AI Module
 *
 * Provides AI-powered services for metadata analysis, element naming,
 * and theme generation using Google Gemini.
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiService } from './ai.service';
import { MetadataService } from './metadata.service';
import { ElementNamingService } from './element-naming.service';
import { ThemeService } from './theme.service';

@Module({
  imports: [ConfigModule],
  providers: [AiService, MetadataService, ElementNamingService, ThemeService],
  exports: [AiService, MetadataService, ElementNamingService, ThemeService],
})
export class AiModule {}
