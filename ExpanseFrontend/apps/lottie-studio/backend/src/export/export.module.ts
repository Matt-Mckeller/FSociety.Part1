/**
 * Export Module
 *
 * Provides file export functionality for processed Lottie animations.
 */

import { Module } from '@nestjs/common';
import { ExportService } from './export.service';
import { ExportResolver } from './export.resolver';
import { LottieModule } from '../lottie/lottie.module';

@Module({
  imports: [LottieModule],
  providers: [ExportService, ExportResolver],
  exports: [ExportService],
})
export class ExportModule {}
