/**
 * Speech-to-Text Provider Interface
 * 
 * Provider-agnostic abstraction for STT services.
 * Adapters implement this interface for each provider (Whisper, Google STT, etc.)
 */

export interface STTProviderConfig {
  apiKey?: string;
  projectId?: string;
  credentialsPath?: string;
  model?: string;
  language?: string;
}

export interface TranscribeOptions {
  /** Source language (ISO 639-1), auto-detect if not specified */
  language?: string;
  /** Enable word-level timestamps */
  wordTimestamps?: boolean;
  /** Enable speaker diarization */
  diarization?: boolean;
  /** Maximum number of speakers (for diarization) */
  maxSpeakers?: number;
  /** Custom prompt/context to guide transcription */
  prompt?: string;
  /** Response format preference */
  responseFormat?: 'text' | 'json' | 'verbose_json';
}

export interface TranscribeSegment {
  sequenceIndex: number;
  startTimeMs: number;
  endTimeMs: number;
  text: string;
  speakerLabel?: string;
  confidence?: number;
  isFinal: boolean;
  wordTimings?: Array<{
    word: string;
    startMs: number;
    endMs: number;
    confidence?: number;
  }>;
}

export interface TranscribeResult {
  segments: TranscribeSegment[];
  fullText: string;
  language: string;
  durationMs: number;
  provider: string;
}

export interface STTStreamCallbacks {
  onSegment: (segment: TranscribeSegment) => void;
  onError: (error: Error) => void;
  onComplete: (result: TranscribeResult) => void;
}

/**
 * Abstract base interface for STT providers
 */
export interface STTProvider {
  /** Provider identifier (e.g., 'whisper', 'google-stt') */
  readonly name: string;
  
  /** Check if provider is available (API key configured, etc.) */
  isAvailable(): Promise<boolean>;
  
  /**
   * Transcribe an audio file (batch mode)
   * @param audioBuffer - Audio file as Buffer
   * @param mimeType - MIME type of audio (e.g., 'audio/wav', 'audio/webm')
   * @param options - Transcription options
   */
  transcribeFile(
    audioBuffer: Buffer,
    mimeType: string,
    options?: TranscribeOptions,
  ): Promise<TranscribeResult>;
  
  /**
   * Transcribe audio chunks (streaming mode)
   * Not all providers support this - check supportsStreaming()
   * @param audioChunk - Audio chunk as Buffer
   * @param callbacks - Callbacks for streaming updates
   * @param options - Transcription options
   */
  transcribeStream?(
    audioChunk: Buffer,
    callbacks: STTStreamCallbacks,
    options?: TranscribeOptions,
  ): Promise<void>;
  
  /** Whether this provider supports streaming mode */
  supportsStreaming(): boolean;
  
  /** Whether this provider supports native diarization */
  supportsDiarization(): boolean;
}
