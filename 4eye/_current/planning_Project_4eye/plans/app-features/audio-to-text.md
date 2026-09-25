# F1 — Audio to Text

> Speech-to-text pipeline: browser audio capture, streaming transcription, speaker diarization, transcript storage.

**Status:** Planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md) | [decisions.md](../decisions.md)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           AUDIO INPUT SOURCES                            │
├─────────────────────────────────────────────────────────────────────────┤
│   Browser Mic        Audio Upload        YouTube URL                     │
│   (MediaRecorder)    (mp3/wav/m4a)       (yt-dlp extraction)            │
└──────────┬─────────────────┬─────────────────┬──────────────────────────┘
           │                 │                 │
           ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        AUDIO PROCESSING LAYER                            │
├─────────────────────────────────────────────────────────────────────────┤
│   Live Sessions:              │   Uploaded/YouTube:                      │
│   Google Cloud Speech-to-Text │   OpenAI Whisper API                     │
│   (Streaming API +            │   (Batch processing +                    │
│    speaker diarization)       │    pyannote diarization)                 │
└──────────────────────────────────────────────────────────────────────────┘
           │                                   │
           ▼                                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           TRANSCRIPT STORAGE                             │
├─────────────────────────────────────────────────────────────────────────┤
│   Session → Transcript → TranscriptSegment[]                            │
│   (sequenceIndex, startTime, endTime, text, diarizationLabel)           │
└──────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           REAL-TIME PUB/SUB                              │
├─────────────────────────────────────────────────────────────────────────┤
│   onTranscriptUpdate subscription → all session attendees               │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Technology Decisions

| Component | Choice | Rationale |
|-----------|--------|-----------|
| Primary STT | OpenAI Whisper API | Simple API key auth, excellent accuracy, works for live + batch |
| Alternative STT | Google Cloud Speech-to-Text | Native streaming, built-in diarization (requires GCP setup) |
| Diarization | pyannote-audio | Open source, high accuracy, provider-agnostic |
| Browser capture | MediaRecorder API | Standard, no plugins |
| Audio format | WebM/Opus (capture), any (upload) | Best compression for browser capture |

### Provider-Agnostic Architecture
The STT layer uses an adapter pattern (see C5) allowing providers to be swapped without code changes:
1. **Start with Whisper** — simple API key, works immediately
2. **Add Google Cloud STT later** — when GCP project is configured
3. **Future providers** — AssemblyAI, Deepgram, etc.

### Why OpenAI Whisper as Primary?
1. **Simple auth** — just an API key, no GCP service account
2. **Excellent accuracy** — especially for specialized vocabulary
3. **Works for all modes** — live (chunked) and batch uploads
4. **Cost-effective** — $0.006/minute

### Google Cloud STT (Future Option)
1. **Native streaming** — gRPC bidirectional stream, ~200ms latency
2. **Built-in diarization** — speaker labels in real-time
3. **Requires** — GCP project, billing, service account credentials
4. **Cost** — ~$0.048/min with enhanced model + diarization

---

## Project Structure

```
backend/
├── src/
│   └── modules/
│       └── sessions/
│           ├── sessions.module.ts
│           ├── sessions.resolver.ts
│           ├── sessions.service.ts
│           ├── entities/
│           │   ├── session.entity.ts
│           │   ├── transcript.entity.ts
│           │   └── transcript-segment.entity.ts
│           ├── dto/
│           │   ├── create-session.dto.ts
│           │   ├── start-live-session.dto.ts
│           │   └── upload-audio.dto.ts
│           └── services/
│               ├── google-stt.service.ts     # Live transcription
│               ├── whisper.service.ts        # Upload transcription
│               └── diarization.service.ts    # Post-processing (uploads)

frontend/
├── src/
│   ├── features/
│   │   └── session/
│   │       ├── components/
│   │       │   ├── AudioCapture.tsx
│   │       │   ├── LiveTranscript.tsx
│   │       │   ├── TranscriptSegment.tsx
│   │       │   └── UploadAudio.tsx
│   │       ├── hooks/
│   │       │   ├── useAudioCapture.ts
│   │       │   ├── useTranscriptSubscription.ts
│   │       │   └── useSessionControls.ts
│   │       └── context/
│           └── SessionContext.tsx
```

---

## Data Model (from C6)

### Session
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| roomId | UUID | FK → Room |
| hostId | UUID | FK → User |
| title | string? | Optional |
| sourceLanguage | string | ISO 639-1 (e.g., "en") |
| status | enum | SCHEDULED, LIVE, ENDED, PROCESSING, COMPLETED |
| type | enum | LIVE, UPLOADED |
| sourceUrl | string? | YouTube URL if imported |
| startedAt | datetime? | |
| endedAt | datetime? | |

### Transcript
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| sessionId | UUID | FK → Session |
| language | string | Source language |
| status | enum | PENDING, PROCESSING, COMPLETED, FAILED |

### TranscriptSegment
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| transcriptId | UUID | FK → Transcript |
| speakerId | UUID? | FK → Speaker (after manual labeling) |
| diarizationLabel | string? | "Speaker 1", "Speaker 2", etc. |
| startTime | decimal | Seconds from start |
| endTime | decimal | Seconds from start |
| text | text | Transcribed text |
| confidence | decimal? | 0-1 STT confidence |
| sequenceIndex | int | Order in transcript |

---

## Live Session Flow

### 1. Host Starts Session
```typescript
// Frontend: Host clicks "Start Session"
const { startSession, isLive } = useSessionControls();

await startSession({
  roomId,
  sourceLanguage: 'en',
});
```

### 2. Audio Capture (Browser)
```typescript
// hooks/useAudioCapture.ts
export function useAudioCapture() {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const startCapture = useCallback(async (sessionId: string) => {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      audio: {
        sampleRate: 16000,      // Google STT optimal
        channelCount: 1,        // Mono
        echoCancellation: true,
        noiseSuppression: true,
      }
    });
    
    // Connect to backend WebSocket
    wsRef.current = new WebSocket(
      `${WS_URL}/audio-stream?sessionId=${sessionId}&token=${authToken}`
    );

    // Use AudioWorklet for raw PCM (Google STT prefers LINEAR16)
    const audioContext = new AudioContext({ sampleRate: 16000 });
    const source = audioContext.createMediaStreamSource(stream);
    
    await audioContext.audioWorklet.addModule('/audio-processor.js');
    const processor = new AudioWorkletNode(audioContext, 'audio-processor');
    
    processor.port.onmessage = (event) => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(event.data); // Send PCM data
      }
    };
    
    source.connect(processor);
    processor.connect(audioContext.destination);
  }, []);

  return { startCapture, stopCapture, isCapturing };
}
```

### 3. Backend Processes Audio (Google Cloud STT)
```typescript
// services/google-stt.service.ts
import { SpeechClient, protos } from '@google-cloud/speech';
import { Injectable, Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { PUB_SUB } from '../../realtime/pubsub.provider';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class GoogleSTTService {
  private readonly logger = new Logger(GoogleSTTService.name);
  private client: SpeechClient;

  constructor(
    private config: ConfigService,
    @Inject(PUB_SUB) private pubSub: PubSub,
  ) {
    this.client = new SpeechClient();
  }

  async startStreamingSession(sessionId: string, sourceLanguage: string) {
    const request: protos.google.cloud.speech.v1.IStreamingRecognitionConfig = {
      config: {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: sourceLanguage,
        enableAutomaticPunctuation: true,
        enableSpeakerDiarization: true,       // Built-in diarization
        diarizationSpeakerCount: 2,           // Expected speakers (can adjust)
        model: 'latest_long',                 // Best for lectures/sessions
        useEnhanced: true,                    // Enhanced model
      },
      interimResults: true,                   // Show text as user speaks
    };

    // Create bidirectional streaming recognize stream
    const recognizeStream = this.client
      .streamingRecognize(request)
      .on('error', (err) => {
        this.logger.error(`Google STT error: ${err.message}`);
      })
      .on('data', async (response: protos.google.cloud.speech.v1.IStreamingRecognizeResponse) => {
        if (!response.results?.[0]) return;

        const result = response.results[0];
        
        // Only save final results (not interim)
        if (result.isFinal) {
          const alternative = result.alternatives?.[0];
          if (!alternative?.transcript) return;

          // Extract speaker tag from diarization
          const speakerTag = result.alternatives?.[0]?.words?.[0]?.speakerTag;
          const diarizationLabel = speakerTag ? `Speaker ${speakerTag}` : null;

          // Save segment
          const segment = await this.saveSegment(sessionId, {
            text: alternative.transcript,
            confidence: alternative.confidence || 0,
            diarizationLabel,
            startTime: this.toSeconds(result.resultEndTime) - (alternative.transcript.length * 0.05), // Estimate
            endTime: this.toSeconds(result.resultEndTime),
          });

          // Publish to subscribers
          await this.pubSub.publish(`transcript.${sessionId}`, {
            onTranscriptUpdate: segment,
          });
        } else {
          // Publish interim results for live typing effect
          await this.pubSub.publish(`transcript.${sessionId}.interim`, {
            onInterimTranscript: {
              text: result.alternatives?.[0]?.transcript,
              isFinal: false,
            },
          });
        }
      });

    return { recognizeStream, sessionId };
  }

  // Convert Google's Duration to seconds
  private toSeconds(duration?: protos.google.protobuf.IDuration): number {
    if (!duration) return 0;
    return Number(duration.seconds || 0) + Number(duration.nanos || 0) / 1e9;
  }
}
```

### 4. Clients Receive Updates (GraphQL Subscription)
```typescript
// hooks/useTranscriptSubscription.ts
const TRANSCRIPT_SUBSCRIPTION = gql`
  subscription OnTranscriptUpdate($sessionId: ID!) {
    onTranscriptUpdate(sessionId: $sessionId) {
      id
      text
      startTime
      endTime
      diarizationLabel
      sequenceIndex
    }
  }
`;

export function useTranscriptSubscription(sessionId: string) {
  const { data } = useSubscription(TRANSCRIPT_SUBSCRIPTION, {
    variables: { sessionId },
  });

  // Accumulate segments in state
  const [segments, setSegments] = useState<TranscriptSegment[]>([]);

  useEffect(() => {
    if (data?.onTranscriptUpdate) {
      setSegments((prev) => [...prev, data.onTranscriptUpdate]);
    }
  }, [data]);

  return { segments };
}
```

---

## Uploaded Session Flow

### 1. User Uploads Audio/Video
```typescript
// components/UploadAudio.tsx
const UploadAudio = ({ roomId }: Props) => {
  const [uploadSession] = useMutation(UPLOAD_SESSION);

  const handleUpload = async (file: File) => {
    // Get presigned URL
    const { data } = await uploadSession({
      variables: {
        roomId,
        fileName: file.name,
        mimeType: file.type,
      },
    });

    // Upload to GCS
    await fetch(data.uploadSession.presignedUrl, {
      method: 'PUT',
      body: file,
    });
  };

  return (
    <Box>
      <input type="file" accept="audio/*,video/*" onChange={handleFileSelect} />
      <Button onClick={handleUpload}>Upload</Button>
    </Box>
  );
};
```

### 2. Backend Processes with Whisper + Diarization
```typescript
// sessions.service.ts
@Injectable()
export class SessionsService {
  async processUploadedSession(sessionId: string, fileUrl: string) {
    // Update status
    await this.updateStatus(sessionId, 'PROCESSING');

    // 1. Transcribe with Whisper
    const transcription = await this.whisperService.transcribe(fileUrl);

    // 2. Run diarization with pyannote
    const diarization = await this.diarizationService.process(fileUrl);

    // 3. Merge transcription + diarization
    const segments = this.mergeTranscriptWithDiarization(
      transcription.segments,
      diarization.speakers
    );

    // 4. Save all segments
    await this.saveSegments(sessionId, segments);

    // 5. Update status
    await this.updateStatus(sessionId, 'COMPLETED');

    // 6. Notify host
    await this.notificationService.notify(session.hostId, {
      type: 'TRANSCRIPT_READY',
      sessionId,
    });
  }
}
```

---

## YouTube Import Flow

```typescript
// sessions.service.ts
async importFromYouTube(roomId: string, youtubeUrl: string) {
  // 1. Create session
  const session = await this.create({
    roomId,
    type: 'UPLOADED',
    sourceUrl: youtubeUrl,
    status: 'PROCESSING',
  });

  // 2. Extract audio via yt-dlp (runs as background job)
  const audioUrl = await this.youtubeService.extractAudio(youtubeUrl);

  // 3. Process same as uploaded
  await this.processUploadedSession(session.id, audioUrl);

  return session;
}
```

---

## API Surface

### Mutations
```graphql
type Mutation {
  # Start a live session
  startLiveSession(input: StartLiveSessionInput!): Session!
  
  # End a live session
  endSession(sessionId: ID!): Session!
  
  # Upload audio/video for transcription
  uploadSession(input: UploadSessionInput!): UploadSessionPayload!
  
  # Import from YouTube
  importYouTubeSession(roomId: ID!, youtubeUrl: String!): Session!
}

input StartLiveSessionInput {
  roomId: ID!
  title: String
  sourceLanguage: String!
}

input UploadSessionInput {
  roomId: ID!
  fileName: String!
  mimeType: String!
}

type UploadSessionPayload {
  session: Session!
  presignedUrl: String!
}
```

### Queries
```graphql
type Query {
  # Get session with transcript
  session(id: ID!): Session
  
  # Get transcript segments (paginated)
  transcriptSegments(
    sessionId: ID!
    after: String
    first: Int
  ): TranscriptSegmentConnection!
}
```

### Subscriptions
```graphql
type Subscription {
  # Real-time transcript updates
  onTranscriptUpdate(sessionId: ID!): TranscriptSegment!
  
  # Session status changes
  onSessionStatus(sessionId: ID!): SessionStatusUpdate!
}

type SessionStatusUpdate {
  sessionId: ID!
  status: SessionStatus!
  message: String
}
```

---

## Frontend Components

### LiveTranscript
```tsx
// components/LiveTranscript.tsx
interface Props {
  sessionId: string;
}

export const LiveTranscript = ({ sessionId }: Props) => {
  const { segments } = useTranscriptSubscription(sessionId);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [segments]);

  return (
    <Box sx={{ height: '100%', overflow: 'auto', p: 2 }}>
      {segments.map((segment) => (
        <TranscriptSegment key={segment.id} segment={segment} />
      ))}
      <div ref={scrollRef} />
    </Box>
  );
};
```

### TranscriptSegment
```tsx
// components/TranscriptSegment.tsx
interface Props {
  segment: TranscriptSegmentType;
}

export const TranscriptSegment = ({ segment }: Props) => {
  return (
    <Box sx={{ mb: 1 }}>
      <Typography variant="caption" color="text.secondary">
        {segment.diarizationLabel || 'Speaker'} • {formatTime(segment.startTime)}
      </Typography>
      <Typography variant="body1">
        {segment.text}
      </Typography>
    </Box>
  );
};
```

---

## Dependencies

| Dependency | Why |
|------------|-----|
| C1 Database | Persist Session, Transcript, TranscriptSegment |
| C2 Auth | Session.hostId, user context |
| C3 GraphQL | API layer |
| C4 Real-time | Subscriptions for live transcript |
| C5 AI | Whisper API integration |

---

## Environment Variables

```env
# Google Cloud Speech-to-Text (live transcription)
GCP_PROJECT_ID=your_project
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json

# OpenAI Whisper (uploaded files)
OPENAI_API_KEY=your_key

# YouTube extraction (yt-dlp)
YOUTUBE_COOKIES_PATH=/path/to/cookies.txt  # Optional, for age-restricted
```

---

## Cost Estimates

| Provider | Use Case | Cost | Notes |
|----------|----------|------|-------|
| Google Cloud STT | Live sessions | ~$0.048/min | Enhanced model + diarization |
| OpenAI Whisper | Uploaded files | $0.006/min | Batch processing |
| pyannote-audio | Upload diarization | Server cost | Self-hosted |

**Example**: 10 hours of live sessions/week = ~$115/month for STT

---

## Alternative: OpenAI Realtime API (Whisper-based)

If you prefer staying fully in the OpenAI ecosystem for live STT:

```typescript
// Alternative: OpenAI Realtime API
const ws = new WebSocket('wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01', {
  headers: {
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
    'OpenAI-Beta': 'realtime=v1',
  },
});
```

**Tradeoffs**:
- Cost: $0.06/min (vs $0.048/min for Google)
- No built-in diarization (would need post-processing)
- Designed for voice AI, not pure transcription
- Newer API, less battle-tested

Recommendation: Google STT for live (specialized for transcription), Whisper for batch (best accuracy).

---

## Acceptance Criteria

- [ ] Host can start a live session from a room
- [ ] Browser captures microphone audio (with permission)
- [ ] Live transcript appears in <500ms latency
- [ ] Speaker changes are detected and labeled ("Speaker 1", "Speaker 2")
- [ ] Host can end session, transcript persists
- [ ] User can upload audio file for transcription
- [ ] User can upload video file for transcription
- [ ] User can import YouTube URL for transcription
- [ ] Uploaded content shows processing status
- [ ] Completed transcripts are viewable and scrollable
- [ ] Guests (anonymous) can view live transcript
- [ ] Segments have timestamps and speaker labels
