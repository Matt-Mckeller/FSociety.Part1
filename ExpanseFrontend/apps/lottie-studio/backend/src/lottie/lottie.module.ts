/**
 * Lottie Module
 *
 * Provides GraphQL API for Lottie animation processing including
 * metadata analysis, element naming, and theme generation.
 */

import { Module } from '@nestjs/common';
import { LottieResolver } from './lottie.resolver';
import { LottieService } from './lottie.service';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [AiModule],
  providers: [LottieResolver, LottieService],
  exports: [LottieService],
})
export class LottieModule {}
