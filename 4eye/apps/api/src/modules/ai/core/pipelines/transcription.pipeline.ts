/**
 * STT Pipeline
 * 
 * Multi-step pipeline for transcript generation:
 * 1. Audio input (file or stream)
 * 2. STT transcription
 * 3. Diarization (speaker identification)
 * 4. Segment creation and storage
 * 
 * @module ai/core/pipelines
 */

import { Injectable, Logger } from '@nestjs/common';
import { STTService } from '../../stt.service';
import { TranscribeResult } from '../interfaces';

export interface TranscriptionPipelineInput {
  /** Audio buffer */
  audioBuffer: Buffer;
  /** MIME type */
  mimeType: string;
  /** Session ID for storing results */
  sessionId: string;
  /** Source language (optional) */
  language?: string;
  /** Enable speaker diarization */
  enableDiarization?: boolean;
}

export interface TranscriptionPipelineResult {
  /** Transcript result */
  result: TranscribeResult;
  /** Session ID */
  sessionId: string;
  /** Processing time in milliseconds */
  processingTimeMs: number;
}

@Injectable()
export class TranscriptionPipeline {
  private readonly logger = new Logger(TranscriptionPipeline.name);

  constructor(private readonly sttService: STTService) {}

  /**
   * Execute the full transcription pipeline.
   */
  async execute(input: TranscriptionPipelineInput): Promise<TranscriptionPipelineResult> {
    const startTime = Date.now();

    this.logger.log(`Starting transcription pipeline for session ${input.sessionId}`);

    // Step 1: Transcribe
    const result = await this.sttService.transcribe(
      input.audioBuffer,
      input.mimeType,
      {
        language: input.language,
      },
    );

    // Step 2: Diarization (if enabled and not done by STT)
    // TODO: Implement post-processing diarization with pyannote-audio

    // Step 3: Store segments
    // TODO: Integration with TranscriptService

    const processingTimeMs = Date.now() - startTime;

    this.logger.log(
      `Transcription pipeline completed in ${processingTimeMs}ms: ` +
      `${result.segments.length} segments, ${result.durationMs}ms duration`,
    );

    return {
      result,
      sessionId: input.sessionId,
      processingTimeMs,
    };
  }
}
