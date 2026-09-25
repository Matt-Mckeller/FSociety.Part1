/**
 * Session and Transcript Types
 * 
 * These types mirror the GraphQL schema for type safety.
 */

export type TranscriptStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

export interface TranscriptSegment {
  id: string;
  transcriptId: string;
  sequenceIndex: number;
  startTimeMs: number;
  endTimeMs: number;
  text: string;
  speakerLabel?: string | null;
  confidence?: number | null;
  isFinal: boolean;
  wordTimings?: WordTiming[] | null;
  createdAt: string;
}

export interface WordTiming {
  word: string;
  startMs: number;
  endMs: number;
  confidence?: number;
}

export interface Transcript {
  id: string;
  sessionId: string;
  status: TranscriptStatus;
  sourceLanguage?: string | null;
  segmentCount: number;
  durationMs: number;
  sttProvider?: string | null;
  errorMessage?: string | null;
  metadata?: Record<string, unknown> | null;
  segments?: TranscriptSegment[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  roomId: string;
  status: string;
  startedAt?: string | null;
  endedAt?: string | null;
  recordingUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

// Query/Mutation input types
export interface CreateTranscriptInput {
  sessionId: string;
  language?: string;
}

export interface AddSegmentInput {
  transcriptId: string;
  startTimeMs: number;
  endTimeMs: number;
  text: string;
  speakerLabel?: string;
  confidence?: number;
}
