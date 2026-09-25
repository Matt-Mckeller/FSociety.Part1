# Real-Time Streaming Transcription

## Overview

The Whisper adapter now supports real-time streaming transcription using OpenAI's Realtime API. This enables:

- **Live captions** during meetings
- **Real-time transcription** of microphone input
- **Continuous audio processing** with immediate results
- **WebSocket-based streaming** for low latency

## Features

✅ **True Real-Time**: Uses OpenAI Realtime API with WebSocket connections  
✅ **Voice Activity Detection**: Automatic turn detection and silence handling  
✅ **Incremental Results**: Get transcription segments as they're generated  
✅ **Session Management**: Multiple concurrent streaming sessions  
✅ **Error Handling**: Robust error recovery and callbacks  

## Usage

### Basic Streaming

```typescript
import { WhisperAdapter } from './adapters/whisper.adapter';
import { STTStreamCallbacks } from './interfaces/stt-provider.interface';

const whisperAdapter = new WhisperAdapter(configService);

const callbacks: STTStreamCallbacks = {
  onSegment: (segment) => {
    console.log(`[${segment.sequenceIndex}] ${segment.text}`);
    // Do something with the segment (store, broadcast, etc.)
  },
  onError: (error) => {
    console.error('Error:', error);
  },
  onComplete: (result) => {
    console.log('Complete:', result.fullText);
  },
};

// Start streaming
await whisperAdapter.transcribeStream(
  audioBuffer, 
  callbacks,
  { language: 'en' }
);
```

### Continuous Streaming Session

```typescript
import { LiveTranscriptionController } from './examples/streaming-transcription.example';

// Create controller
const controller = new LiveTranscriptionController(whisperAdapter);

// Start session
await controller.startSession();

// Send audio chunks as they arrive (e.g., from microphone)
microphoneStream.on('data', (audioChunk) => {
  controller.sendAudioChunk(audioChunk);
});

// Stop when done
controller.stopSession();

// Get full transcript
const fullText = controller.getTranscript();
```

### Live Captions for Web Application

```typescript
// Backend: Set up WebSocket server
const captionsService = new LiveCaptionsService(whisperAdapter);
await captionsService.startLiveCaptions(roomId);

// Frontend: Connect to WebSocket
const ws = new WebSocket('wss://your-api.com/captions');

ws.onmessage = (event) => {
  const { segment } = JSON.parse(event.data);
  displayCaption(segment.text);
};
```

## API Reference

### `transcribeStream(audioChunk, callbacks, options)`

Start a real-time streaming transcription session.

**Parameters:**
- `audioChunk` (Buffer) - Initial audio data (can be empty to just open connection)
- `callbacks` (STTStreamCallbacks) - Event handlers for segments, errors, completion
- `options` (TranscribeOptions) - Configuration options

**Options:**
- `language` - Source language (ISO 639-1 code, defaults to auto-detect)
- `wordTimestamps` - Enable word-level timestamps (not yet supported by Realtime API)

### `appendAudioToStream(sessionId, audioChunk)`

Send additional audio data to an active streaming session.

**Parameters:**
- `sessionId` (string) - Session identifier from initial stream
- `audioChunk` (Buffer) - Audio data to transcribe

### `closeStream(sessionId)`

Close an active streaming session and trigger completion callback.

**Parameters:**
- `sessionId` (string) - Session identifier to close

## Audio Format Requirements

The Realtime API expects:
- **Format**: 16-bit PCM audio
- **Sample Rate**: 24kHz (configurable)
- **Encoding**: Base64 (automatically handled by adapter)
- **Chunk Size**: Recommended 100-500ms of audio per chunk

## Event Flow

```
┌─────────────────────────────────────────────────────────────┐
│ Client                                                       │
└─────────────────────────────────────────────────────────────┘
                      │
                      │ 1. transcribeStream(audioChunk)
                      ▼
┌─────────────────────────────────────────────────────────────┐
│ WhisperAdapter                                               │
│                                                              │
│  ┌──────────────┐                                           │
│  │ WebSocket    │◄─────── Opens connection to              │
│  │ Connection   │         OpenAI Realtime API               │
│  └──────────────┘                                           │
│         │                                                    │
│         │ 2. Send audio chunk (base64)                      │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │   OpenAI     │                                           │
│  │ Realtime API │                                           │
│  └──────────────┘                                           │
│         │                                                    │
│         │ 3. Transcription event                            │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │ Event        │──────► onSegment(segment)                 │
│  │ Handler      │──────► onError(error)                     │
│  │              │──────► onComplete(result)                 │
│  └──────────────┘                                           │
└─────────────────────────────────────────────────────────────┘
                      │
                      ▼
           Callbacks trigger in your app
```

## Configuration

### Environment Variables

```bash
# Required
OPENAI_API_KEY=sk-...

# Optional - specify Realtime API model (defaults to latest stable)
# Default: gpt-4o-realtime (stable production model)
# Other options: 
#   - gpt-4o-realtime-preview-2024-12-17 (older preview)
#   - gpt-4.5-realtime (if available)
OPENAI_REALTIME_MODEL=gpt-4o-realtime
```

**Model Selection Guide:**
- **`gpt-4o-realtime`** - Stable production model (recommended)
- **`gpt-4o-realtime-preview-YYYY-MM-DD`** - Preview versions for testing new features
- Check [OpenAI Platform](https://platform.openai.com/docs/models) for latest available models

### Session Configuration

The adapter configures sessions with optimal defaults for transcription:

```typescript
{
  modalities: ['text', 'audio'],
  input_audio_format: 'pcm16',
  input_audio_transcription: {
    model: 'whisper-1',
    language: 'en' // or auto-detected
  },
  turn_detection: {
    type: 'server_vad',           // Voice Activity Detection
    threshold: 0.5,               // Detection sensitivity
    prefix_padding_ms: 300,       // Buffer before speech
    silence_duration_ms: 500,     // Silence to end turn
  },
  temperature: 0.7                // Response creativity (0-1)
}
```

**Voice Activity Detection (VAD) Tuning:**
- `threshold`: Lower = more sensitive to quiet speech (0.3-0.7 recommended)
- `prefix_padding_ms`: Captures speech beginning (200-500ms typical)
- `silence_duration_ms`: How long to wait before ending turn (300-1000ms)

## Error Handling

The adapter handles various error scenarios:

```typescript
const callbacks: STTStreamCallbacks = {
  onError: (error) => {
    if (error.message.includes('WebSocket')) {
      // Connection error - may retry
      console.error('Connection lost:', error);
      reconnectWithBackoff();
    } else if (error.message.includes('rate limit')) {
      // Rate limited - back off
      console.error('Rate limited:', error);
      scheduleRetry();
    } else {
      // Other errors
      console.error('Transcription error:', error);
    }
  },
};
```

## Performance Considerations

### Latency

- **Connection Setup**: ~100-200ms (WebSocket handshake)
- **First Token**: ~200-500ms after receiving audio
- **Subsequent Tokens**: Near real-time (<100ms)

### Throughput

- **Concurrent Sessions**: Depends on OpenAI quotas
- **Audio Buffer**: Keep chunks small (100-500ms) for best latency
- **Network**: WebSocket maintains persistent connection

### Resource Usage

- **Memory**: ~1MB per active session
- **CPU**: Minimal (WebSocket + JSON parsing)
- **Network**: ~50-100 KB/s per audio stream

## Comparison: Batch vs Streaming

| Feature | Batch (`transcribeFile`) | Streaming (`transcribeStream`) |
|---------|-------------------------|--------------------------------|
| Latency | High (full file) | Low (200-500ms) |
| Use Case | Recorded audio | Live audio |
| Accuracy | High | High |
| Word Timestamps | ✅ Yes | ⏳ Coming soon |
| Diarization | ❌ No | ❌ No |
| Cost | $0.006/min | $0.06/min (realtime premium) |
| API | Whisper | Realtime API |
| Model | `whisper-1` | `gpt-4o-realtime` |
| Max Duration | No limit | Session-based |

**Cost Considerations (as of 2026):**
- Batch Whisper: $0.006 per minute
- Realtime Streaming: $0.06 per minute (10x premium for real-time)
- Choose batch for archived recordings, streaming for live/interactive use cases

## Integration Examples

### NestJS Controller

```typescript
@Controller('transcription')
export class TranscriptionController {
  constructor(private whisperAdapter: WhisperAdapter) {}

  @Post('stream/start')
  async startStream(@Body() dto: StartStreamDto) {
    const callbacks = this.createCallbacks(dto.roomId);
    await this.whisperAdapter.transcribeStream(
      Buffer.alloc(0),
      callbacks,
      { language: dto.language }
    );
    return { sessionId: dto.roomId };
  }

  @Post('stream/:sessionId/audio')
  async sendAudio(
    @Param('sessionId') sessionId: string,
    @Body() audioChunk: Buffer,
  ) {
    this.whisperAdapter.appendAudioToStream(sessionId, audioChunk);
    return { success: true };
  }
}
```

### GraphQL Subscription

```typescript
@Subscription(() => TranscriptSegment)
transcriptSegments(@Args('sessionId') sessionId: string) {
  return pubSub.asyncIterator(`transcript_${sessionId}`);
}
```

## Troubleshooting

### WebSocket Connection Fails

**Problem**: `WebSocket connection failed`

**Solutions**:
1. Check `OPENAI_API_KEY` is valid
2. Verify network allows WebSocket connections
3. Check firewall/proxy settings
4. Ensure OpenAI Realtime API is available in your region

### No Transcription Results

**Problem**: Connection opens but no segments received

**Solutions**:
1. Verify audio format is 16-bit PCM
2. Check audio chunk size (not too small/large)
3. Ensure audio contains speech
4. Check VAD threshold settings

### High Latency

**Problem**: Delays in receiving transcription

**Solutions**:
1. Reduce audio chunk size
2. Check network latency
3. Verify server resources
4. Consider geographic proximity to OpenAI servers

## Future Enhancements

- [ ] Word-level timestamps in streaming mode
- [ ] Multi-language detection in real-time
- [ ] Speaker diarization with streaming
- [ ] Custom VAD configuration per session
- [ ] Audio quality metrics
- [ ] Reconnection with state preservation

## References

- [OpenAI Realtime API Documentation](https://platform.openai.com/docs/guides/realtime)
- [Whisper Model Documentation](https://platform.openai.com/docs/guides/speech-to-text)
- [WebSocket Protocol](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
