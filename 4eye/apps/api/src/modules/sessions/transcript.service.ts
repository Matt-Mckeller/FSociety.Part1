/**
 * Transcript Service
 * 
 * Manages transcripts and their segments. Coordinates with STT service
 * for transcription and stores results in the database.
 */

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Transcript, TranscriptSegment } from './entities';
import { Session } from './entities/session.entity';
import { TranscriptStatus } from '../../common/enums';
import { STTService, STTProviderName } from '../ai/stt.service';
import { TranscribeSegment } from '../ai/interfaces';

export interface CreateTranscriptInput {
  sessionId: string;
  language?: string;
  provider?: STTProviderName;
}

export interface AddSegmentInput {
  transcriptId: string;
  startTimeMs: number;
  endTimeMs: number;
  text: string;
  speakerLabel?: string;
  confidence?: number;
  isFinal?: boolean;
  wordTimings?: Array<{
    word: string;
    startTimeMs: number;
    endTimeMs: number;
  }>;
}

export interface TranscribeAudioInput {
  sessionId: string;
  audioBuffer: Buffer;
  mimeType: string;
  language?: string;
  provider?: STTProviderName;
}

@Injectable()
export class TranscriptService {
  private readonly logger = new Logger(TranscriptService.name);

  constructor(
    @InjectRepository(Transcript)
    private readonly transcriptRepository: Repository<Transcript>,
    @InjectRepository(TranscriptSegment)
    private readonly segmentRepository: Repository<TranscriptSegment>,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    private readonly dataSource: DataSource,
    private readonly sttService: STTService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  /**
   * Create a new transcript for a session
   */
  async createTranscript(input: CreateTranscriptInput): Promise<Transcript> {
    const session = await this.sessionRepository.findOne({
      where: { id: input.sessionId },
    });

    if (!session) {
      throw new NotFoundException(`Session ${input.sessionId} not found`);
    }

    // Check if transcript already exists for this session
    const existing = await this.transcriptRepository.findOne({
      where: { sessionId: input.sessionId },
    });

    if (existing) {
      this.logger.log(`Transcript already exists for session ${input.sessionId}`);
      return existing;
    }

    const transcript = this.transcriptRepository.create({
      sessionId: input.sessionId,
      sourceLanguage: input.language ?? 'en',
      status: TranscriptStatus.PENDING,
      sttProvider: input.provider ?? 'whisper',
      segmentCount: 0,
      durationMs: 0,
    });

    const saved = await this.transcriptRepository.save(transcript);
    this.logger.log(`Created transcript ${saved.id} for session ${input.sessionId}`);
    
    return saved;
  }

  /**
   * Get transcript by session ID
   */
  async getBySessionId(sessionId: string): Promise<Transcript | null> {
    return this.transcriptRepository.findOne({
      where: { sessionId },
      relations: ['segments'],
    });
  }

  /**
   * Get transcript by ID
   */
  async getById(id: string): Promise<Transcript | null> {
    return this.transcriptRepository.findOne({
      where: { id },
      relations: ['segments'],
    });
  }

  /**
   * Add a segment to a transcript
   */
  async addSegment(input: AddSegmentInput): Promise<TranscriptSegment> {
    const transcript = await this.transcriptRepository.findOne({
      where: { id: input.transcriptId },
    });

    if (!transcript) {
      throw new NotFoundException(`Transcript ${input.transcriptId} not found`);
    }

    // Get the next sequence index
    const maxSequence = await this.segmentRepository
      .createQueryBuilder('segment')
      .where('segment.transcriptId = :transcriptId', { transcriptId: input.transcriptId })
      .select('MAX(segment.sequenceIndex)', 'max')
      .getRawOne();

    const sequenceIndex = (maxSequence?.max ?? -1) + 1;

    const segment = this.segmentRepository.create({
      transcriptId: input.transcriptId,
      sequenceIndex,
      startTimeMs: input.startTimeMs,
      endTimeMs: input.endTimeMs,
      text: input.text,
      speakerLabel: input.speakerLabel,
      confidence: input.confidence,
      isFinal: input.isFinal ?? true,
      wordTimings: input.wordTimings,
    });

    const saved = await this.segmentRepository.save(segment);

    // Update transcript stats
    await this.updateTranscriptStats(input.transcriptId);

    // Emit event for real-time subscriptions
    this.eventEmitter.emit('transcript.segment.added', {
      transcriptId: input.transcriptId,
      sessionId: transcript.sessionId,
      segment: saved,
    });

    return saved;
  }

  /**
   * Transcribe audio and create/update transcript
   */
  async transcribeAudio(input: TranscribeAudioInput): Promise<Transcript> {
    // Create or get existing transcript
    let transcript = await this.getBySessionId(input.sessionId);
    
    if (!transcript) {
      transcript = await this.createTranscript({
        sessionId: input.sessionId,
        language: input.language,
        provider: input.provider,
      });
    }

    // Update status to processing
    await this.transcriptRepository.update(transcript.id, {
      status: TranscriptStatus.PROCESSING,
    });

    try {
      // Perform transcription
      const result = await this.sttService.transcribe(
        input.audioBuffer,
        input.mimeType,
        {
          language: input.language,
          provider: input.provider,
        },
      );

      // Add segments in a transaction
      await this.dataSource.transaction(async (manager) => {
        for (const segment of result.segments) {
          await this.addSegmentFromSTT(transcript!.id, segment);
        }
      });

      // Update status to completed
      await this.transcriptRepository.update(transcript.id, {
        status: TranscriptStatus.COMPLETED,
        sourceLanguage: result.language,
      });

      // Emit completion event
      this.eventEmitter.emit('transcript.completed', {
        transcriptId: transcript.id,
        sessionId: input.sessionId,
      });

      // Return updated transcript
      return this.getById(transcript.id) as Promise<Transcript>;
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Transcription failed: ${err.message}`, err.stack);
      
      // Update status to failed
      await this.transcriptRepository.update(transcript.id, {
        status: TranscriptStatus.FAILED,
        errorMessage: err.message,
      });

      throw error;
    }
  }

  /**
   * Add a segment from STT result
   */
  private async addSegmentFromSTT(
    transcriptId: string,
    segment: TranscribeSegment,
  ): Promise<TranscriptSegment> {
    return this.addSegment({
      transcriptId,
      startTimeMs: segment.startTimeMs,
      endTimeMs: segment.endTimeMs,
      text: segment.text,
      confidence: segment.confidence,
      isFinal: segment.isFinal,
      wordTimings: segment.wordTimings?.map((w) => ({
        word: w.word,
        startTimeMs: w.startMs,
        endTimeMs: w.endMs,
      })),
    });
  }

  /**
   * Update transcript statistics (segment count, duration)
   */
  private async updateTranscriptStats(transcriptId: string): Promise<void> {
    const stats = await this.segmentRepository
      .createQueryBuilder('segment')
      .where('segment.transcriptId = :transcriptId', { transcriptId })
      .select([
        'COUNT(*) as count',
        'MAX(segment.endTimeMs) as maxEndTime',
      ])
      .getRawOne();

    await this.transcriptRepository.update(transcriptId, {
      segmentCount: parseInt(stats.count, 10),
      durationMs: stats.maxEndTime || 0,
    });
  }

  /**
   * Get full text of a transcript
   */
  async getFullText(transcriptId: string): Promise<string> {
    const segments = await this.segmentRepository.find({
      where: { transcriptId },
      order: { sequenceIndex: 'ASC' },
    });

    return segments.map((s) => s.text).join(' ');
  }

  /**
   * Delete a transcript and all its segments
   */
  async deleteTranscript(transcriptId: string): Promise<boolean> {
    const result = await this.transcriptRepository.delete(transcriptId);
    return (result.affected ?? 0) > 0;
  }
}
