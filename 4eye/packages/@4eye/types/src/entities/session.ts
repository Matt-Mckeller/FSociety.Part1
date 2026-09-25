/**
 * Session and Transcript Entities
 * 
 * Sessions represent a single live or recorded event within a room.
 * Transcripts contain the STT output with segments.
 */

/** Session status lifecycle */
export type SessionStatus = 
  | 'SCHEDULED'
  | 'ACTIVE' 
  | 'PAUSED' 
  | 'ENDED' 
  | 'CANCELLED';

/** Transcript processing status */
export type TranscriptStatus = 
  | 'PENDING' 
  | 'PROCESSING' 
  | 'COMPLETED' 
  | 'FAILED';

/**
 * Session entity representing a live or recorded event.
 */
export interface Session {
  /** Unique identifier */
  id: string;
  /** Parent room ID */
  roomId: string;
  /** Current session status */
  status: SessionStatus;
  /** When session started */
  startedAt?: string | null;
  /** When session ended */
  endedAt?: string | null;
  /** URL to recording if available */
  recordingUrl?: string | null;
  /** Creation timestamp */
  createdAt: string;
  /** Last update timestamp */
  updatedAt: string;
}

/**
 * Word-level timing information from STT.
 */
export interface WordTiming {
  /** The word */
  word: string;
  /** Start time in milliseconds */
  startMs: number;
  /** End time in milliseconds */
  endMs: number;
  /** Confidence score (0-1) */
  confidence?: number;
}

/**
 * A segment of transcribed text with timing.
 */
export interface TranscriptSegment {
  /** Unique identifier */
  id: string;
  /** Parent transcript ID */
  transcriptId: string;
  /** Order within transcript */
  sequenceIndex: number;
  /** Start time in milliseconds */
  startTimeMs: number;
  /** End time in milliseconds */
  endTimeMs: number;
  /** Transcribed text */
  text: string;
  /** Speaker label (e.g., "Speaker 1" or "Pastor John") */
  speakerLabel?: string | null;
  /** Confidence score (0-1) */
  confidence?: number | null;
  /** Whether this is a final (non-interim) result */
  isFinal: boolean;
  /** Word-level timing data */
  wordTimings?: WordTiming[] | null;
  /** Creation timestamp */
  createdAt: string;
}

/**
 * Transcript entity containing all segments for a session.
 */
export interface Transcript {
  /** Unique identifier */
  id: string;
  /** Parent session ID */
  sessionId: string;
  /** Processing status */
  status: TranscriptStatus;
  /** Source language (ISO 639-1) */
  sourceLanguage?: string | null;
  /** Number of segments */
  segmentCount: number;
  /** Total duration in milliseconds */
  durationMs: number;
  /** STT provider used (e.g., "whisper", "google-stt") */
  sttProvider?: string | null;
  /** Error message if failed */
  errorMessage?: string | null;
  /** Additional metadata */
  metadata?: Record<string, unknown> | null;
  /** Transcript segments (may be lazy loaded) */
  segments?: TranscriptSegment[] | null;
  /** Creation timestamp */
  createdAt: string;
  /** Last update timestamp */
  updatedAt: string;
}
