import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WhisperAdapter } from './core/adapters/whisper.adapter';
import { STTService } from './stt.service';
import { TypeReaderService } from './type-reader/type-reader.service';
import { TranscriptionPipeline } from './core/pipelines/transcription.pipeline';

/**
 * AI Module
 * 
 * Provides AI services across the application:
 * - STT (Speech-to-Text) via provider abstraction
 * - Type Reader for Typed AI Responses (C8)
 * - Text Generation (future)
 * - Translation (future)
 * - Learning Modes (future)
 * 
 * Global module - services available app-wide without importing.
 * 
 * Structure:
 * - core/adapters/ - Provider-specific implementations
 * - core/interfaces/ - Provider-agnostic contracts
 * - core/pipelines/ - Multi-step AI workflows
 * - prompts/ - Prompt templates (base + vertical-specific)
 * - learning-modes/ - Learning transformations
 * - type-reader/ - C8 typed AI response system
 */
@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    // Type Reader (C8 - Typed AI Responses)
    TypeReaderService,

    // STT Adapters
    WhisperAdapter,
    // Future: GoogleSTTAdapter, AssemblyAIAdapter, etc.
    
    // Orchestration Services
    STTService,
    // Future: TextGenerationService, TranslationService

    // Pipelines
    TranscriptionPipeline,
    // Future: TranslationPipeline, SummarizationPipeline
  ],
  exports: [
    TypeReaderService,
    STTService,
    WhisperAdapter,
    TranscriptionPipeline,
  ],
})
export class AIModule {}
