# F5 — Recordings

> Start/stop/save audio recordings, Google Cloud Storage, playback with synced transcript, recording history.

**Status:** Planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md) | [decisions.md](../decisions.md)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         RECORDING SOURCES                                │
├─────────────────────────────────────────────────────────────────────────┤
│   Live Session             │   Uploaded Audio           │               │
│   (Host records during)    │   (Post-session import)    │               │
│   WebM/Opus → MP3          │   Any format → MP3         │               │
└───────────┬────────────────────────────┬────────────────────────────────┘
            │                            │
            ▼                            ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         RECORDING SERVICE                               │
├─────────────────────────────────────────────────────────────────────────┤
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐              │
│   │   Capture    │───▶│  Transcode   │───▶│   Upload     │              │
│   │   (Browser)  │    │  (FFmpeg)    │    │ (Signed URL) │              │
│   └──────────────┘    └──────────────┘    └──────────────┘              │
│                                                  │                      │
│                                                  ▼                      │
│                            ┌──────────────────────────────┐             │
│                            │   Google Cloud Storage       │             │
│                            │   (gs://4eye-recordings/)    │             │
│                            └──────────────────────────────┘             │
└─────────────────────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                            PLAYBACK                                     │
├─────────────────────────────────────────────────────────────────────────┤
│   ┌────────────────────────────────────────────────────────────┐        │
│   │                 Recording Player                            │       │
│   │   ┌─────────────────────────────────────────────────────┐   │       │
│   │   │  [▶]  ●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━░░░  12:34   │   │      │
│   │   └─────────────────────────────────────────────────────┘   │       │
│   │                                                              │      │
│   │   ┌─────────────────────────────────────────────────────┐   │       │
│   │   │  [00:12] Speaker 1: "Today we gather to discuss..."  │   │        │
│   │   │  [00:34] Speaker 1: "The importance of compassion..." │◀─┤ synced │
│   │   │  [01:02] Speaker 2: "As noted in the scripture..."   │   │        │
│   │   └─────────────────────────────────────────────────────┘   │        │
│   └────────────────────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Design Decisions

### Key Choices

| Decision | Choice | Alternatives Considered | Rationale |
|----------|--------|-------------------------|-----------|
| Upload method | **Signed URLs (direct to GCS)** | Server-side upload, tus protocol | No server bandwidth, scales better, simpler than resumable |
| Live capture format | **WebM/Opus** | WAV, MP3 | Native MediaRecorder output, excellent compression |
| Storage format | **MP3 (128kbps)** | AAC, original WebM | Universal playback, good file size (~58MB/hr) |
| Playback sync | **Segment-level timestamps** | Word-level, no sync | Good UX without word-level complexity |
| Access control | **Per-session consent + plan tier** | Room-level only | GDPR compliance, flexible |

### Why Signed URLs?

1. **No server bandwidth** — Client uploads directly to GCS
2. **Scales infinitely** — GCS handles concurrent uploads
3. **Faster** — No double-hop through backend
4. **Cost-effective** — Less compute on our servers
5. **Simple** — No chunking or resume logic needed for <1GB files

### Storage Architecture

```
gs://4eye-recordings/
├── live/
│   └── {sessionId}/
│       ├── raw/                    # Original WebM chunks (deleted after processing)
│       │   ├── chunk_000.webm
│       │   └── chunk_001.webm
│       └── final/
│           └── recording.mp3       # Processed final file
│
├── uploaded/
│   └── {sessionId}/
│       └── recording.mp3           # User-uploaded (already processed)
│
└── thumbnails/                     # Optional waveform images
    └── {recordingId}.png
```

**Lifecycle:**
1. **Standard storage** (0-30 days): $0.020/GB/mo — active playback
2. **Nearline storage** (30+ days): $0.010/GB/mo — archival
3. **Deletion** per retention policy: `Organization.transcriptRetentionDays`

---

## Project Structure

```
backend/
├── src/
│   └── modules/
│       └── recordings/
│           ├── recordings.module.ts
│           ├── recordings.resolver.ts
│           ├── recordings.service.ts
│           ├── entities/
│           │   └── recording.entity.ts         # From C6
│           ├── dto/
│           │   ├── start-recording.dto.ts
│           │   ├── complete-recording.dto.ts
│           │   └── get-recording-url.dto.ts
│           └── services/
│               ├── gcs-storage.service.ts      # GCS signed URLs, uploads
│               └── transcoding.service.ts      # FFmpeg processing (Phase 2)

frontend/
├── src/
│   ├── features/
│   │   └── recordings/
│   │       ├── components/
│   │       │   ├── RecordingControls.tsx       # Start/stop for hosts
│   │       │   ├── RecordingPlayer.tsx         # Playback with transcript
│   │       │   ├── RecordingList.tsx           # History list
│   │       │   ├── RecordingCard.tsx           # List item
│   │       │   ├── WaveformVisualization.tsx   # Audio viz (optional)
│   │       │   └── TranscriptSync.tsx          # Synced transcript panel
│   │       ├── hooks/
│   │       │   ├── useRecordingCapture.ts      # Browser MediaRecorder
│   │       │   ├── useRecordingPlayback.ts     # Audio element + sync
│   │       │   └── useRecordingUpload.ts       # Signed URL upload
│   │       └── context/
│   │           └── RecordingContext.tsx
```

---

## Data Model (from C6)

### Recording
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| sessionId | UUID | FK → Session |
| storageUrl | string | GCS URL (gs://4eye-recordings/...) |
| publicUrl | string? | Signed public URL (cached, expires) |
| mimeType | string | audio/mpeg, video/mp4, etc. |
| durationSeconds | int | Calculated on upload complete |
| fileSizeBytes | bigint | From GCS metadata |
| status | enum | RECORDING, UPLOADING, PROCESSING, READY, FAILED |
| recordingStartOffset | decimal | Seconds from session start when recording began |
| createdAt | datetime | Auto |
| deletedAt | datetime? | Soft delete |

### Recording Status Flow

```
           ┌─────────────┐
     Host  │  RECORDING  │  Live capture in progress
  starts   └──────┬──────┘
             Host │ stops
                  ▼
           ┌─────────────┐
           │  UPLOADING  │  Chunks uploading to GCS
           └──────┬──────┘
                  │ Upload complete
                  ▼
           ┌─────────────┐
           │ PROCESSING  │  Transcoding (if needed)
           └──────┬──────┘
                  │ Done
                  ▼
           ┌─────────────┐
           │    READY    │  Available for playback
           └─────────────┘
                  
           ┌─────────────┐
           │   FAILED    │  Error at any step
           └─────────────┘
```

---

## API Surface

### Mutations

```graphql
type Mutation {
  # Host starts recording during live session
  startRecording(input: StartRecordingInput!): Recording!
  
  # Host stops recording, triggers upload
  stopRecording(recordingId: ID!): Recording!
  
  # Get signed URL for upload (chunked)
  getRecordingUploadUrl(input: GetUploadUrlInput!): SignedUploadUrl!
  
  # Mark upload complete, trigger processing
  completeRecordingUpload(recordingId: ID!): Recording!
  
  # Soft delete (admin/host only)
  deleteRecording(recordingId: ID!): Boolean!
}

input StartRecordingInput {
  sessionId: ID!
}

input GetUploadUrlInput {
  recordingId: ID!
  chunkIndex: Int!
  contentType: String!  # audio/webm
}

type SignedUploadUrl {
  url: String!
  expiresAt: DateTime!
}
```

### Queries

```graphql
type Query {
  # Get single recording with playback URL
  recording(id: ID!): Recording
  
  # Get recordings for a session
  sessionRecordings(sessionId: ID!): [Recording!]!
  
  # Get user's accessible recordings (with pagination)
  myRecordings(
    first: Int
    after: String
    filter: RecordingFilter
  ): RecordingConnection!
  
  # Get signed playback URL (expires in 1 hour)
  getRecordingPlaybackUrl(recordingId: ID!): SignedPlaybackUrl!
}

input RecordingFilter {
  sessionId: ID
  roomId: ID
  dateFrom: DateTime
  dateTo: DateTime
}

type SignedPlaybackUrl {
  url: String!
  expiresAt: DateTime!
}
```

### Subscriptions

```graphql
type Subscription {
  # Recording status updates (for upload progress, processing status)
  onRecordingStatusChange(sessionId: ID!): Recording!
}
```

---

## Recording Flow Details

### Live Session Recording

#### 1. Host Starts Recording

```typescript
// Frontend: RecordingControls.tsx
const { startRecording, stopRecording, isRecording, recording } = useRecordingCapture(sessionId);

// On "Start Recording" click:
await startRecording();
// 1. Calls mutation: startRecording(sessionId)
// 2. Backend creates Recording entity (status: RECORDING)
// 3. Frontend starts MediaRecorder capture
// 4. Publishes to subscription: onRecordingStatusChange
```

#### 2. Audio Capture (Browser)

```typescript
// hooks/useRecordingCapture.ts
export function useRecordingCapture(sessionId: string) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startCapture = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        sampleRate: 48000,        // High quality for recording
        channelCount: 2,          // Stereo
        echoCancellation: true,
        noiseSuppression: true,
      }
    });

    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'audio/webm;codecs=opus',
      audioBitsPerSecond: 128000,
    });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    // Request data every 10 seconds (for chunked upload)
    mediaRecorder.start(10000);
    mediaRecorderRef.current = mediaRecorder;
  };

  // ... stopCapture, upload logic
}
```

#### 3. Chunked Upload (During Recording)

```typescript
// Upload chunks as they become available
const uploadChunk = async (chunk: Blob, chunkIndex: number) => {
  // Get signed URL from backend
  const { url, expiresAt } = await getUploadUrl({
    recordingId,
    chunkIndex,
    contentType: 'audio/webm',
  });

  // Direct upload to GCS
  await fetch(url, {
    method: 'PUT',
    body: chunk,
    headers: {
      'Content-Type': 'audio/webm',
    },
  });
};
```

#### 4. Complete Upload & Process

```typescript
// On stop recording:
const stopRecording = async () => {
  mediaRecorderRef.current?.stop();
  
  // Upload any remaining chunks
  await uploadRemainingChunks();
  
  // Tell backend we're done
  await completeRecordingUpload({ recordingId });
  // Backend:
  // 1. Updates status to PROCESSING
  // 2. Merges chunks (if needed)
  // 3. Transcodes to MP3
  // 4. Calculates duration/size
  // 5. Sets status to READY
  // 6. Publishes onRecordingStatusChange
};
```

### Uploaded Session Recording

For file uploads (non-live):

```typescript
// User selects file
const handleFileUpload = async (file: File) => {
  // 1. Create recording entry
  const { recording } = await createRecordingFromUpload({
    sessionId,
    fileName: file.name,
    mimeType: file.type,
    fileSize: file.size,
  });

  // 2. Get signed upload URL
  const { url } = await getUploadUrl({
    recordingId: recording.id,
    chunkIndex: 0,  // Single chunk for uploaded files
    contentType: file.type,
  });

  // 3. Upload directly to GCS
  await uploadWithProgress(url, file, (progress) => {
    setUploadProgress(progress);
  });

  // 4. Complete upload
  await completeRecordingUpload({ recordingId: recording.id });
};
```

---

## Playback with Synced Transcript

### RecordingPlayer Component

```typescript
// components/RecordingPlayer.tsx
export function RecordingPlayer({ recordingId }: Props) {
  const { recording, playbackUrl } = useRecordingPlayback(recordingId);
  const { segments } = useTranscriptSegments(recording?.sessionId);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSegmentId, setCurrentSegmentId] = useState<string | null>(null);

  // Sync transcript with audio position
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !segments.length) return;

    const handleTimeUpdate = () => {
      const currentTime = audio.currentTime + (recording?.recordingStartOffset || 0);
      
      // Find segment that contains current time
      const activeSegment = segments.find(
        (seg) => currentTime >= seg.startTime && currentTime < seg.endTime
      );
      
      if (activeSegment?.id !== currentSegmentId) {
        setCurrentSegmentId(activeSegment?.id || null);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, [segments, recording?.recordingStartOffset, currentSegmentId]);

  // Click segment to seek
  const handleSegmentClick = (segment: TranscriptSegment) => {
    if (audioRef.current && recording) {
      audioRef.current.currentTime = segment.startTime - (recording.recordingStartOffset || 0);
      audioRef.current.play();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Audio Player */}
      <Paper sx={{ p: 2 }}>
        <audio
          ref={audioRef}
          src={playbackUrl}
          controls
          style={{ width: '100%' }}
        />
        <Typography variant="caption" color="text.secondary">
          {formatDuration(recording?.durationSeconds || 0)}
        </Typography>
      </Paper>

      {/* Synced Transcript */}
      <Paper sx={{ p: 2, maxHeight: 400, overflow: 'auto' }}>
        {segments.map((segment) => (
          <TranscriptSegmentRow
            key={segment.id}
            segment={segment}
            isActive={segment.id === currentSegmentId}
            onClick={() => handleSegmentClick(segment)}
          />
        ))}
      </Paper>
    </Box>
  );
}
```

### TranscriptSegmentRow

```typescript
// components/TranscriptSync.tsx
function TranscriptSegmentRow({ segment, isActive, onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // Auto-scroll to active segment
  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isActive]);

  return (
    <Box
      ref={ref}
      onClick={onClick}
      sx={{
        p: 1,
        cursor: 'pointer',
        borderRadius: 1,
        bgcolor: isActive ? 'action.selected' : 'transparent',
        '&:hover': { bgcolor: 'action.hover' },
        transition: 'background-color 0.2s',
      }}
    >
      <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
        [{formatTime(segment.startTime)}]
      </Typography>
      <Typography variant="caption" color="primary" sx={{ fontWeight: 500, mr: 1 }}>
        {segment.diarizationLabel || 'Speaker'}:
      </Typography>
      <Typography variant="body2" component="span">
        {segment.text}
      </Typography>
    </Box>
  );
}
```

---

## Backend Services

### GCS Storage Service

```typescript
// services/gcs-storage.service.ts
@Injectable()
export class GcsStorageService {
  private storage: Storage;
  private bucket: Bucket;

  constructor(private config: ConfigService) {
    this.storage = new Storage({
      projectId: config.get('GCP_PROJECT_ID'),
      keyFilename: config.get('GCP_KEY_FILE'),
    });
    this.bucket = this.storage.bucket(config.get('GCS_RECORDINGS_BUCKET'));
  }

  /**
   * Generate signed URL for upload
   */
  async getSignedUploadUrl(
    recordingId: string,
    chunkIndex: number,
    contentType: string,
  ): Promise<{ url: string; expiresAt: Date }> {
    const filename = `live/${recordingId}/raw/chunk_${String(chunkIndex).padStart(4, '0')}.webm`;
    const file = this.bucket.file(filename);

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    const [url] = await file.getSignedUrl({
      version: 'v4',
      action: 'write',
      expires: expiresAt,
      contentType,
    });

    return { url, expiresAt };
  }

  /**
   * Generate signed URL for playback (1 hour)
   */
  async getSignedPlaybackUrl(storageUrl: string): Promise<{ url: string; expiresAt: Date }> {
    const filePath = storageUrl.replace(`gs://${this.bucket.name}/`, '');
    const file = this.bucket.file(filePath);

    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    const [url] = await file.getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: expiresAt,
    });

    return { url, expiresAt };
  }

  /**
   * Merge chunks and move to final location
   */
  async finalizeRecording(recordingId: string): Promise<{
    storageUrl: string;
    fileSizeBytes: number;
    durationSeconds: number;
  }> {
    const chunksPrefix = `live/${recordingId}/raw/`;
    const [chunkFiles] = await this.bucket.getFiles({ prefix: chunksPrefix });

    // Sort by chunk index
    const sortedChunks = chunkFiles.sort((a, b) => a.name.localeCompare(b.name));

    // Merge chunks (for now, just use first chunk if single)
    // Phase 2: Use Cloud Functions + FFmpeg to merge and transcode to MP3
    const finalPath = `live/${recordingId}/final/recording.webm`;
    
    if (sortedChunks.length === 1) {
      // Single chunk: just move it
      await sortedChunks[0].copy(this.bucket.file(finalPath));
    } else {
      // Multiple chunks: compose (GCS compose has 32 limit, may need multiple passes)
      await this.bucket.combine(
        sortedChunks.map(f => f.name),
        finalPath,
      );
    }

    // Get metadata
    const [metadata] = await this.bucket.file(finalPath).getMetadata();
    
    // Delete raw chunks
    await Promise.all(sortedChunks.map(f => f.delete()));

    return {
      storageUrl: `gs://${this.bucket.name}/${finalPath}`,
      fileSizeBytes: parseInt(metadata.size as string, 10),
      durationSeconds: 0, // Will be calculated by transcoding service in Phase 2
    };
  }

  /**
   * Move to Nearline storage after retention period
   */
  async moveToArchive(storageUrl: string): Promise<void> {
    const filePath = storageUrl.replace(`gs://${this.bucket.name}/`, '');
    const file = this.bucket.file(filePath);

    await file.setStorageClass('NEARLINE');
  }

  /**
   * Delete recording file
   */
  async deleteFile(storageUrl: string): Promise<void> {
    const filePath = storageUrl.replace(`gs://${this.bucket.name}/`, '');
    await this.bucket.file(filePath).delete();
  }
}
```

### Recordings Service

```typescript
// recordings.service.ts
@Injectable()
export class RecordingsService {
  constructor(
    @InjectRepository(Recording)
    private recordingRepo: Repository<Recording>,
    private gcsStorage: GcsStorageService,
    @Inject(PUB_SUB) private pubSub: PubSub,
  ) {}

  async startRecording(sessionId: string, userId: string): Promise<Recording> {
    // Verify user is host of this session
    const session = await this.sessionRepo.findOne({
      where: { id: sessionId, hostId: userId },
    });
    if (!session) throw new ForbiddenException('Only host can start recording');

    // Check if already recording
    const existing = await this.recordingRepo.findOne({
      where: { sessionId, status: RecordingStatus.RECORDING },
    });
    if (existing) throw new BadRequestException('Recording already in progress');

    // Create recording entry
    const recording = this.recordingRepo.create({
      sessionId,
      status: RecordingStatus.RECORDING,
      recordingStartOffset: this.calculateOffset(session),
    });

    const saved = await this.recordingRepo.save(recording);

    // Notify subscribers
    await this.pubSub.publish(`recording.${sessionId}`, {
      onRecordingStatusChange: saved,
    });

    return saved;
  }

  async stopRecording(recordingId: string, userId: string): Promise<Recording> {
    const recording = await this.findOneOrFail(recordingId);
    
    // Update status
    recording.status = RecordingStatus.UPLOADING;
    const saved = await this.recordingRepo.save(recording);

    await this.pubSub.publish(`recording.${recording.sessionId}`, {
      onRecordingStatusChange: saved,
    });

    return saved;
  }

  async completeUpload(recordingId: string): Promise<Recording> {
    const recording = await this.findOneOrFail(recordingId);

    // Update status to processing
    recording.status = RecordingStatus.PROCESSING;
    await this.recordingRepo.save(recording);

    // Finalize in GCS
    try {
      const { storageUrl, fileSizeBytes, durationSeconds } = 
        await this.gcsStorage.finalizeRecording(recordingId);

      recording.storageUrl = storageUrl;
      recording.fileSizeBytes = fileSizeBytes;
      recording.durationSeconds = durationSeconds || await this.calculateDuration(storageUrl);
      recording.status = RecordingStatus.READY;
    } catch (error) {
      recording.status = RecordingStatus.FAILED;
      this.logger.error(`Recording finalization failed: ${error.message}`, error.stack);
    }

    const saved = await this.recordingRepo.save(recording);

    await this.pubSub.publish(`recording.${recording.sessionId}`, {
      onRecordingStatusChange: saved,
    });

    return saved;
  }

  async getPlaybackUrl(recordingId: string, userId: string): Promise<SignedPlaybackUrl> {
    const recording = await this.findOneOrFail(recordingId);
    
    // Check access (via session → room → org membership or individual plan)
    await this.verifyAccess(recording, userId);

    // Generate signed URL (or use cached)
    if (recording.publicUrl && new Date(recording.publicUrlExpires) > new Date()) {
      return { url: recording.publicUrl, expiresAt: recording.publicUrlExpires };
    }

    const { url, expiresAt } = await this.gcsStorage.getSignedPlaybackUrl(recording.storageUrl);
    
    // Cache the URL (optional optimization)
    // recording.publicUrl = url;
    // recording.publicUrlExpires = expiresAt;
    // await this.recordingRepo.save(recording);

    return { url, expiresAt };
  }

  private calculateOffset(session: Session): number {
    if (!session.startedAt) return 0;
    return (Date.now() - session.startedAt.getTime()) / 1000;
  }
}
```

---

## Access Control

| Role | Start/Stop | View Own | View Room | Delete |
|------|------------|----------|-----------|--------|
| Guest (no account) | ❌ | ❌ | ❌ | ❌ |
| Guest (org invite) | ❌ | ❌ | ✓ (if consented) | ❌ |
| Chat tier | ❌ | ❌ | ✓ (with org) | ❌ |
| Plus/Pro tier | ❌ | ✓ | ✓ | Own only |
| Host | ✓ | ✓ | ✓ | Room's |
| Org Admin | ✓ | ✓ | ✓ | Org's |

**Consent Requirement:**
- Recording only starts if `Room.isRecordingEnabled = true`
- All attendees see "This session is being recorded" notice
- `SessionUser.consentedToRecording` tracked per user
- Users who don't consent can still attend but won't appear in speaker diarization metadata

---

## Cost Analysis

| Component | Cost | Notes |
|-----------|------|-------|
| **Storage (Standard)** | $0.020/GB/mo | ~58 MB/hr = $0.0012/hr/mo |
| **Storage (Nearline)** | $0.010/GB/mo | After 30 days |
| **Signed URL operations** | $0.05/10K | Negligible |
| **Egress** | $0.12/GB | First 1TB free/mo |

**Per-hour recording cost:**
- Storage (58 MB × $0.02): ~$0.001/mo
- Retrieval (1 play/mo): ~$0.007
- **Total: ~$0.01/hr-recording/mo**

---

## Phase 2 Enhancements

| Feature | Description | Complexity |
|---------|-------------|------------|
| **MP3 transcoding** | FFmpeg via Cloud Functions | Medium |
| **Waveform visualization** | Generate waveform image on upload | Low |
| **Multiple quality levels** | HLS streaming for bandwidth adaptation | High |
| **Download option** | Direct download vs stream-only | Low |
| **Video support** | Screen share + audio recording | High |
| **Clip creation** | Save excerpts from recordings | Medium |

---

## Dependencies

| Dependency | Direction | Notes |
|------------|-----------|-------|
| **C1 (Database)** | ← uses | Recording entity |
| **C2 (Auth)** | ← uses | Host verification |
| **C4 (Realtime)** | ← uses | Status subscriptions |
| **F1 (Audio-to-Text)** | ← uses | Session context, audio capture shares code |
| **F7 (Recaps)** | uses → | Links to recordings |
| **W6 (Host Dashboard)** | uses → | Recording management |
| **W7 (Member Dashboard)** | uses → | Recording history |

---

## Acceptance Criteria

### MVP (Phase 1)
- [ ] Host can start/stop recording during live session
- [ ] Recording chunks upload directly to GCS via signed URLs
- [ ] Recording status updates in real-time (subscription)
- [ ] Playback works with synced transcript (segment-level)
- [ ] Users can access recordings based on their plan tier
- [ ] Recordings list shows duration, date, session info
- [ ] Soft delete works for hosts/admins

### Phase 2
- [ ] Transcode WebM → MP3 for universal playback
- [ ] Move to Nearline storage after 30 days
- [ ] Waveform visualization
- [ ] Download button (vs stream only)
- [ ] Clip creation (save excerpt with start/end times)

---

## Environment Variables

```env
# GCS Configuration
GCS_PROJECT_ID=4eye-prod
GCS_RECORDINGS_BUCKET=4eye-recordings
GCS_KEY_FILE=/secrets/gcs-service-account.json

# Recording defaults
RECORDING_CHUNK_INTERVAL_MS=10000
RECORDING_MAX_DURATION_HOURS=4
RECORDING_SIGNED_URL_EXPIRY_MINUTES=15
PLAYBACK_SIGNED_URL_EXPIRY_MINUTES=60

# Storage lifecycle
RECORDING_ARCHIVE_AFTER_DAYS=30
RECORDING_DELETE_AFTER_DAYS=null  # Use org retention policy
```
