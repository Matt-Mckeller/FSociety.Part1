/**
 * Real-Time Streaming Transcription Example
 * 
 * Demonstrates how to use Whisper's real-time streaming API
 * for continuous audio transcription.
 */

import { WhisperAdapter } from '../adapters/whisper.adapter';
import { STTStreamCallbacks, TranscribeSegment, TranscribeResult } from '../interfaces/stt-provider.interface';

/**
 * Example: Real-time transcription of audio stream
 * 
 * Use case: Live meeting transcription, real-time captions
 */
export async function streamingTranscriptionExample(
  whisperAdapter: WhisperAdapter,
  audioChunks: Buffer[],
): Promise<void> {
  console.log('Starting real-time transcription...');

  // Define callbacks for streaming events
  const callbacks: STTStreamCallbacks = {
    onSegment: (segment: TranscribeSegment) => {
      console.log(`[Segment ${segment.sequenceIndex}] ${segment.text}`);
      // In production, you might:
      // - Send to WebSocket clients for live captions
      // - Store in database
      // - Trigger other real-time processes
    },

    onError: (error: Error) => {
      console.error('Transcription error:', error.message);
      // Handle error - maybe retry or notify user
    },

    onComplete: (result: TranscribeResult) => {
      console.log('\n=== Transcription Complete ===');
      console.log(`Total segments: ${result.segments.length}`);
      console.log(`Duration: ${result.durationMs}ms`);
      console.log(`Full text: ${result.fullText}`);
    },
  };

  // Start streaming with the first chunk
  await whisperAdapter.transcribeStream(
    audioChunks[0],
    callbacks,
    {
      language: 'en',
      wordTimestamps: true,
    }
  );

  // Note: The session ID would be returned or tracked to send additional chunks
  // For now, this shows the basic pattern
}

/**
 * Example: Live microphone transcription controller
 * 
 * In a real application, you'd connect this to a microphone stream
 */
export class LiveTranscriptionController {
  private sessionId: string | null = null;
  private segments: TranscribeSegment[] = [];

  constructor(private whisperAdapter: WhisperAdapter) {}

  /**
   * Start a live transcription session
   */
  async startSession(): Promise<void> {
    const callbacks: STTStreamCallbacks = {
      onSegment: (segment) => {
        this.segments.push(segment);
        this.onTranscriptUpdate(segment);
      },
      onError: (error) => {
        console.error('Error:', error);
        this.onError(error);
      },
      onComplete: (result) => {
        this.onSessionComplete(result);
      },
    };

    // Initialize with empty buffer to create session
    await this.whisperAdapter.transcribeStream(
      Buffer.alloc(0),
      callbacks,
      { language: 'en' }
    );
  }

  /**
   * Send audio chunk to active session
   */
  sendAudioChunk(audioChunk: Buffer): void {
    if (!this.sessionId) {
      throw new Error('No active session - call startSession() first');
    }
    this.whisperAdapter.appendAudioToStream(this.sessionId, audioChunk);
  }

  /**
   * Stop the transcription session
   */
  stopSession(): void {
    if (this.sessionId) {
      this.whisperAdapter.closeStream(this.sessionId);
      this.sessionId = null;
    }
  }

  /**
   * Get all transcribed segments so far
   */
  getTranscript(): string {
    return this.segments.map(s => s.text).join(' ');
  }

  // Override these in your implementation
  protected onTranscriptUpdate(segment: TranscribeSegment): void {
    console.log(`New segment: ${segment.text}`);
  }

  protected onError(error: Error): void {
    console.error('Transcription error:', error);
  }

  protected onSessionComplete(result: TranscribeResult): void {
    console.log('Session complete:', result.fullText);
  }
}

/**
 * Example: Integration with WebSocket for live captions
 */
export class LiveCaptionsService {
  private transcriptionController: LiveTranscriptionController;
  private webSocketClients: Set<any> = new Set(); // WebSocket clients

  constructor(whisperAdapter: WhisperAdapter) {
    this.transcriptionController = new LiveTranscriptionController(whisperAdapter);
  }

  async startLiveCaptions(roomId: string): Promise<void> {
    // Override callbacks to broadcast to WebSocket clients
    const originalOnUpdate = this.transcriptionController['onTranscriptUpdate'].bind(
      this.transcriptionController
    );

    this.transcriptionController['onTranscriptUpdate'] = (segment) => {
      originalOnUpdate(segment);
      this.broadcastSegment(roomId, segment);
    };

    await this.transcriptionController.startSession();
  }

  private broadcastSegment(roomId: string, segment: TranscribeSegment): void {
    const message = JSON.stringify({
      type: 'transcript_segment',
      roomId,
      segment,
    });

    this.webSocketClients.forEach(client => {
      if (client.readyState === 1) { // WebSocket.OPEN
        client.send(message);
      }
    });
  }

  addClient(client: any): void {
    this.webSocketClients.add(client);
  }

  removeClient(client: any): void {
    this.webSocketClients.delete(client);
  }
}
