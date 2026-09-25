/**
 * Session and Transcript Input Types
 * 
 * Input types for session and transcript mutations.
 */

/**
 * Input for creating a session.
 */
export interface CreateSessionInput {
  /** Room ID */
  roomId: string;
  /** Optional scheduled start time */
  scheduledAt?: string;
}

/**
 * Input for creating a transcript.
 */
export interface CreateTranscriptInput {
  /** Session ID */
  sessionId: string;
  /** Source language (ISO 639-1) */
  language?: string;
  /** STT provider to use */
  provider?: string;
}

/**
 * Input for adding a transcript segment.
 */
export interface AddSegmentInput {
  /** Transcript ID */
  transcriptId: string;
  /** Start time in milliseconds */
  startTimeMs: number;
  /** End time in milliseconds */
  endTimeMs: number;
  /** Transcribed text */
  text: string;
  /** Speaker label */
  speakerLabel?: string;
  /** Confidence score (0-1) */
  confidence?: number;
}
