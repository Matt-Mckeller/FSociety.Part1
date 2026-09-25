/**
 * OpenAI Whisper STT Adapter
 * 
 * Primary STT provider using OpenAI's Whisper API.
 * Supports both batch transcription and chunked streaming.
 */

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import {
  STTProvider,
  STTProviderConfig,
  TranscribeOptions,
  TranscribeResult,
  TranscribeSegment,
  STTStreamCallbacks,
} from '../interfaces/stt-provider.interface';

@Injectable()
export class WhisperAdapter implements STTProvider {
  readonly name = 'whisper';
  private readonly logger = new Logger(WhisperAdapter.name);
  private client: OpenAI | null = null;
  private readonly defaultModel = 'whisper-1';

  constructor(private readonly configService: ConfigService) {
    this.initializeClient();
  }

  private initializeClient(): void {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (apiKey) {
      this.client = new OpenAI({ apiKey });
      this.logger.log('Whisper adapter initialized');
    } else {
      this.logger.warn('OPENAI_API_KEY not configured - Whisper adapter unavailable');
    }
  }

  async isAvailable(): Promise<boolean> {
    return this.client !== null;
  }

  supportsStreaming(): boolean {
    // Whisper API doesn't support true streaming, but we can process chunks
    return false;
  }

  supportsDiarization(): boolean {
    // Whisper doesn't have native diarization - requires post-processing
    return false;
  }

  async transcribeFile(
    audioBuffer: Buffer,
    mimeType: string,
    options?: TranscribeOptions,
  ): Promise<TranscribeResult> {
    if (!this.client) {
      throw new Error('Whisper adapter not initialized - check OPENAI_API_KEY');
    }

    const startTime = Date.now();
    
    // Convert buffer to File-like object for OpenAI API
    const extension = this.getExtensionFromMimeType(mimeType);
    const file = new File([audioBuffer.buffer as ArrayBuffer], `audio.${extension}`, { type: mimeType });

    try {
      // Use verbose_json to get word-level timestamps
      const response = await this.client.audio.transcriptions.create({
        file,
        model: this.defaultModel,
        language: options?.language,
        prompt: options?.prompt,
        response_format: options?.wordTimestamps ? 'verbose_json' : 'json',
        timestamp_granularities: options?.wordTimestamps ? ['word', 'segment'] : ['segment'],
      });

      const processingTime = Date.now() - startTime;
      this.logger.debug(`Transcription completed in ${processingTime}ms`);

      return this.formatResponse(response, options);
    } catch (error) {
      this.logger.error('Whisper transcription failed', error);
      throw error;
    }
  }

  private formatResponse(
    response: OpenAI.Audio.Transcription,
    options?: TranscribeOptions,
  ): TranscribeResult {
    // Handle different response formats
    const verboseResponse = response as OpenAI.Audio.Transcription & {
      segments?: Array<{
        id: number;
        start: number;
        end: number;
        text: string;
        words?: Array<{
          word: string;
          start: number;
          end: number;
        }>;
      }>;
      language?: string;
      duration?: number;
    };

    const segments: TranscribeSegment[] = [];

    if (verboseResponse.segments) {
      verboseResponse.segments.forEach((seg, index) => {
        const segment: TranscribeSegment = {
          sequenceIndex: index,
          startTimeMs: seg.start * 1000,
          endTimeMs: seg.end * 1000,
          text: seg.text.trim(),
          isFinal: true,
        };

        if (options?.wordTimestamps && seg.words) {
          segment.wordTimings = seg.words.map((word) => ({
            word: word.word,
            startMs: word.start * 1000,
            endMs: word.end * 1000,
          }));
        }

        segments.push(segment);
      });
    } else {
      // Simple text response - create single segment
      segments.push({
        sequenceIndex: 0,
        startTimeMs: 0,
        endTimeMs: (verboseResponse.duration || 0) * 1000,
        text: response.text.trim(),
        isFinal: true,
      });
    }

    const lastSegment = segments[segments.length - 1];
    const durationMs = lastSegment ? lastSegment.endTimeMs : 0;

    return {
      segments,
      fullText: response.text.trim(),
      language: verboseResponse.language || 'en',
      durationMs,
      provider: this.name,
    };
  }

  private getExtensionFromMimeType(mimeType: string): string {
    const mimeToExt: Record<string, string> = {
      'audio/wav': 'wav',
      'audio/wave': 'wav',
      'audio/x-wav': 'wav',
      'audio/mp3': 'mp3',
      'audio/mpeg': 'mp3',
      'audio/mp4': 'm4a',
      'audio/m4a': 'm4a',
      'audio/webm': 'webm',
      'audio/ogg': 'ogg',
      'audio/flac': 'flac',
    };
    return mimeToExt[mimeType] || 'wav';
  }
}
