/**
 * Speech-to-Text Service
 * 
 * Orchestrates STT provider selection and provides a unified interface
 * for transcription across the application.
 */

import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  STTProvider,
  TranscribeOptions,
  TranscribeResult,
} from './core/interfaces/stt-provider.interface';
import { WhisperAdapter } from './core/adapters/whisper.adapter';

export type STTProviderName = 'whisper' | 'google-stt';

@Injectable()
export class STTService implements OnModuleInit {
  private readonly logger = new Logger(STTService.name);
  private providers: Map<STTProviderName, STTProvider> = new Map();
  private defaultProvider: STTProviderName = 'whisper';

  constructor(
    private readonly configService: ConfigService,
    private readonly whisperAdapter: WhisperAdapter,
  ) {}

  async onModuleInit(): Promise<void> {
    // Register available providers
    if (await this.whisperAdapter.isAvailable()) {
      this.providers.set('whisper', this.whisperAdapter);
      this.logger.log('Registered Whisper STT provider');
    }

    // Future: Register Google STT when credentials are available
    // if (await this.googleSTTAdapter.isAvailable()) {
    //   this.providers.set('google-stt', this.googleSTTAdapter);
    // }

    // Log available providers
    const available = Array.from(this.providers.keys());
    if (available.length === 0) {
      this.logger.warn('No STT providers available - check API keys');
    } else {
      this.logger.log(`Available STT providers: ${available.join(', ')}`);
    }
  }

  /**
   * Get list of available providers
   */
  getAvailableProviders(): STTProviderName[] {
    return Array.from(this.providers.keys());
  }

  /**
   * Check if any provider is available
   */
  isAvailable(): boolean {
    return this.providers.size > 0;
  }

  /**
   * Transcribe audio using the default or specified provider
   */
  async transcribe(
    audioBuffer: Buffer,
    mimeType: string,
    options?: TranscribeOptions & { provider?: STTProviderName },
  ): Promise<TranscribeResult> {
    const providerName = options?.provider || this.defaultProvider;
    const provider = this.providers.get(providerName);

    if (!provider) {
      // Try fallback to any available provider
      const fallback = this.providers.values().next().value;
      if (!fallback) {
        throw new Error('No STT providers available');
      }
      this.logger.warn(`Provider ${providerName} not available, using fallback: ${fallback.name}`);
      return fallback.transcribeFile(audioBuffer, mimeType, options);
    }

    return provider.transcribeFile(audioBuffer, mimeType, options);
  }

  /**
   * Get a specific provider instance (for advanced use cases)
   */
  getProvider(name: STTProviderName): STTProvider | undefined {
    return this.providers.get(name);
  }
}
