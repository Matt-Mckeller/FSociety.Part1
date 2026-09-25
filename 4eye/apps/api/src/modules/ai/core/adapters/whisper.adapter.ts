/**
 * OpenAI Whisper STT Adapter
 * 
 * Primary STT provider using OpenAI's Whisper API.
 * Supports both batch transcription and real-time streaming via Realtime API.
 */

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import WebSocket from 'ws';
import {
  STTProvider,
  STTProviderConfig,
  TranscribeOptions,
  TranscribeResult,
  TranscribeSegment,
  STTStreamCallbacks,
} from '../interfaces/stt-provider.interface';

interface RealtimeSession {
  ws: WebSocket;
  segments: TranscribeSegment[];
  sequenceIndex: number;
  startTime: number;
}

@Injectable()
export class WhisperAdapter implements STTProvider {
  readonly name = 'whisper';
  private readonly logger = new Logger(WhisperAdapter.name);
  private client: OpenAI | null = null;
  private readonly defaultModel = 'whisper-1';
  // Latest stable Realtime API model (configurable via env)
  private readonly realtimeModel: string;
  private realtimeSessions: Map<string, RealtimeSession> = new Map();

  constructor(private readonly configService: ConfigService) {
    // Use configured model or default to latest stable version
    this.realtimeModel = this.configService.get<string>('OPENAI_REALTIME_MODEL') || 'gpt-4o-realtime';
    this.initializeClient();
  }

  private initializeClient(): void {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (apiKey) {
      this.client = new OpenAI({ apiKey });
      this.logger.log(`Whisper adapter initialized (realtime model: ${this.realtimeModel})`);
    } else {
      this.logger.warn('OPENAI_API_KEY not configured - Whisper adapter unavailable');
    }
  }

  async isAvailable(): Promise<boolean> {
    return this.client !== null;
  }

  supportsStreaming(): boolean {
    // OpenAI Realtime API supports true streaming transcription
    return true;
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

  /**
   * Real-time streaming transcription using OpenAI Realtime API
   */
  async transcribeStream(
    audioChunk: Buffer,
    callbacks: STTStreamCallbacks,
    options?: TranscribeOptions,
  ): Promise<void> {
    if (!this.client) {
      throw new Error('Whisper adapter not initialized - check OPENAI_API_KEY');
    }

    const sessionId = this.generateSessionId();
    
    try {
      // Create WebSocket connection to OpenAI Realtime API
      const ws = await this.createRealtimeConnection(sessionId, options);
      
      const session: RealtimeSession = {
        ws,
        segments: [],
        sequenceIndex: 0,
        startTime: Date.now(),
      };
      
      this.realtimeSessions.set(sessionId, session);

      // Set up message handlers
      this.setupRealtimeHandlers(sessionId, callbacks, options);

      // Send audio chunk
      this.sendAudioChunk(sessionId, audioChunk);

    } catch (error) {
      this.logger.error('Streaming transcription failed', error);
      callbacks.onError(error as Error);
      this.cleanupSession(sessionId);
    }
  }

  private async createRealtimeConnection(
    sessionId: string,
    options?: TranscribeOptions,
  ): Promise<WebSocket> {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    const url = `wss://api.openai.com/v1/realtime?model=${this.realtimeModel}`;
    
    const ws = new WebSocket(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'OpenAI-Beta': 'realtime=v1',
      },
    });

    return new Promise((resolve, reject) => {
      ws.on('open', () => {
        this.logger.debug(`Realtime session ${sessionId} opened`);
        
        // Configure session for transcription with latest API settings
        ws.send(JSON.stringify({
          type: 'session.update',
          session: {
            modalities: ['text', 'audio'],
            instructions: 'Transcribe the audio accurately with proper punctuation and formatting.',
            voice: 'alloy',
            input_audio_format: 'pcm16',
            output_audio_format: 'pcm16',
            input_audio_transcription: {
              model: 'whisper-1',
              language: options?.language,
            },
            turn_detection: {
              type: 'server_vad',
              threshold: 0.5,
              prefix_padding_ms: 300,
              silence_duration_ms: 500,
            },
            temperature: 0.7,
          },
        }));

        resolve(ws);
      });

      ws.on('error', (error) => {
        this.logger.error(`WebSocket error for session ${sessionId}`, error);
        reject(error);
      });
    });
  }

  private setupRealtimeHandlers(
    sessionId: string,
    callbacks: STTStreamCallbacks,
    options?: TranscribeOptions,
  ): void {
    const session = this.realtimeSessions.get(sessionId);
    if (!session) return;

    session.ws.on('message', (data: Buffer) => {
      try {
        const message = JSON.parse(data.toString());
        
        switch (message.type) {
          case 'conversation.item.input_audio_transcription.completed':
            this.handleTranscriptionSegment(sessionId, message, callbacks);
            break;
          
          case 'conversation.item.input_audio_transcription.failed':
            this.logger.error('Transcription failed', message.error);
            callbacks.onError(new Error(message.error?.message || 'Transcription failed'));
            break;
          
          case 'response.done':
            this.handleStreamComplete(sessionId, callbacks);
            break;
          
          case 'error':
            this.logger.error('Realtime API error', message.error);
            callbacks.onError(new Error(message.error?.message || 'Unknown error'));
            break;
        }
      } catch (error) {
        this.logger.error('Error processing message', error);
      }
    });

    session.ws.on('close', () => {
      this.logger.debug(`Session ${sessionId} closed`);
      this.cleanupSession(sessionId);
    });
  }

  private handleTranscriptionSegment(
    sessionId: string,
    message: any,
    callbacks: STTStreamCallbacks,
  ): void {
    const session = this.realtimeSessions.get(sessionId);
    if (!session) return;

    const transcript = message.transcript || '';
    if (!transcript.trim()) return;

    const segment: TranscribeSegment = {
      sequenceIndex: session.sequenceIndex++,
      startTimeMs: Date.now() - session.startTime,
      endTimeMs: Date.now() - session.startTime,
      text: transcript.trim(),
      isFinal: true,
      confidence: message.confidence,
    };

    session.segments.push(segment);
    callbacks.onSegment(segment);
  }

  private handleStreamComplete(
    sessionId: string,
    callbacks: STTStreamCallbacks,
  ): void {
    const session = this.realtimeSessions.get(sessionId);
    if (!session) return;

    const result: TranscribeResult = {
      segments: session.segments,
      fullText: session.segments.map((s) => s.text).join(' '),
      language: 'en', // Realtime API doesn't provide language detection yet
      durationMs: Date.now() - session.startTime,
      provider: this.name,
    };

    callbacks.onComplete(result);
    this.cleanupSession(sessionId);
  }

  private sendAudioChunk(sessionId: string, audioChunk: Buffer): void {
    const session = this.realtimeSessions.get(sessionId);
    if (!session || session.ws.readyState !== WebSocket.OPEN) {
      this.logger.warn(`Cannot send audio - session ${sessionId} not ready`);
      return;
    }

    // Convert audio to base64 for transmission
    const base64Audio = audioChunk.toString('base64');
    
    session.ws.send(JSON.stringify({
      type: 'input_audio_buffer.append',
      audio: base64Audio,
    }));

    // Commit the audio buffer to trigger transcription
    session.ws.send(JSON.stringify({
      type: 'input_audio_buffer.commit',
    }));
  }

  /**
   * Continue sending audio to an existing stream session
   */
  appendAudioToStream(sessionId: string, audioChunk: Buffer): void {
    this.sendAudioChunk(sessionId, audioChunk);
  }

  /**
   * Close a streaming session
   */
  closeStream(sessionId: string): void {
    const session = this.realtimeSessions.get(sessionId);
    if (session && session.ws.readyState === WebSocket.OPEN) {
      // Send final message to trigger completion
      session.ws.send(JSON.stringify({
        type: 'response.create',
      }));
      
      session.ws.close();
    }
    this.cleanupSession(sessionId);
  }

  private cleanupSession(sessionId: string): void {
    const session = this.realtimeSessions.get(sessionId);
    if (session) {
      if (session.ws.readyState !== WebSocket.CLOSED) {
        session.ws.close();
      }
      this.realtimeSessions.delete(sessionId);
    }
  }

  private generateSessionId(): string {
    return `whisper_${Date.now()}_${Math.random().toString(36).substring(7)}`;
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
