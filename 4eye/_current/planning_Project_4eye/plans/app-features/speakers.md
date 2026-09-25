# F9 — Speakers

> Speaker diarization, identification, and attribution within transcripts.

**Status:** Planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md) | [decisions.md](../decisions.md)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       SPEAKER IDENTIFICATION PIPELINE                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Phase 1: DIARIZATION (Auto-detect speaker changes)                     │
│  ═══════════════════════════════════════════════════                    │
│                                                                          │
│   Live Session                        Uploaded Audio                     │
│        │                                   │                             │
│        ▼                                   ▼                             │
│   ┌──────────────────────┐     ┌─────────────────────────────┐          │
│   │ Google Cloud STT     │     │ Whisper STT (transcript)    │          │
│   │ + Diarization        │     │         +                   │          │
│   │ (real-time)          │     │ pyannote-audio (diarization)│          │
│   └──────────┬───────────┘     └──────────────┬──────────────┘          │
│              │                                │                          │
│              └───────────────┬────────────────┘                          │
│                              ▼                                           │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │ TranscriptSegment                                                │   │
│   │ ├── text: "Today we gather to reflect on..."                    │   │
│   │ ├── diarizationLabel: "Speaker 1"  ← AI-assigned               │   │
│   │ ├── speakerId: NULL                 ← Human labels later        │   │
│   │ └── timestamps: 0.0 → 4.5                                       │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  Phase 2: MANUAL LABELING (Host assigns identity)                       │
│  ═══════════════════════════════════════════════                        │
│                                                                          │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │  Host UI: Label Speakers                                          │  │
│   │                                                                    │  │
│   │  "Speaker 1" appears 47 times                                     │  │
│   │  ┌──────────────────────────────────────────────────┐            │  │
│   │  │ Assign to: [Pastor John Martinez ▼]              │            │  │
│   │  │            ├─ Pastor John Martinez (frequent)    │            │  │
│   │  │            ├─ Deacon Sarah Williams              │            │  │
│   │  │            ├─ + Create New Speaker               │            │  │
│   │  └──────────────────────────────────────────────────┘            │  │
│   │                                                                    │  │
│   │  "Speaker 2" appears 12 times                                     │  │
│   │  ┌──────────────────────────────────────────────────┐            │  │
│   │  │ Assign to: [Guest Speaker ▼]                     │            │  │
│   │  └──────────────────────────────────────────────────┘            │  │
│   └──────────────────────────────────────────────────────────────────┘  │
│              │                                                           │
│              ▼                                                           │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │ TranscriptSegment (updated)                                      │   │
│   │ ├── text: "Today we gather to reflect on..."                    │   │
│   │ ├── diarizationLabel: "Speaker 1"   ← preserved                 │   │
│   │ ├── speakerId: "pastor-john-id"     ← NOW ASSIGNED              │   │
│   │ └── timestamps: 0.0 → 4.5                                       │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  Phase 3 (Future): VOICE FINGERPRINTING                                 │
│  ══════════════════════════════════════                                 │
│                                                                          │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │ Speaker enrolls 30-second voice sample → voice embedding stored │  │
│   │ Future sessions: auto-match voice → known speaker                 │  │
│   │ (Falls back to "Unknown Speaker" for new voices)                  │  │
│   └──────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Design Decisions

### Alternatives Considered

| Approach | Description | Pros | Cons | Decision |
|----------|-------------|------|------|----------|
| **Real-time labeling** | Host labels speakers during session | Immediate attribution | Distracting, host has many duties | ❌ Rejected |
| **Post-session labeling** | Host labels after session ends | Non-interruptive, can review | Delay before speakers identified | ✅ **Chosen** |
| **Voice fingerprint only** | Auto-identify via voice enrollment | Fully automatic | Complex, privacy concerns, no guest support | ❌ Phase 2 |
| **No labeling** | Keep diarization labels only | Simple | "Speaker 1" meaningless to viewers | ❌ Rejected |
| **Hybrid** | Auto-suggest + manual confirm | Best of both worlds | More complexity | ✅ **Chosen** (suggestions) |

### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Diarization (live) | **Google Cloud STT built-in** | Real-time, 100ms latency, no extra processing |
| Diarization (uploaded) | **pyannote-audio** | Open source, best accuracy for batch |
| Labeling timing | **Post-session or during live (optional)** | Host can focus on session first |
| Speaker storage | **Per-organization + per-room suggestions** | Reuse across sessions, context-aware |
| Voice fingerprint | **Deferred to Phase 2** | Technical complexity, privacy concerns |
| Guest speakers | **Named entity without account** | Support "Guest Speaker John" without user signup |

### Why Not Real-Time Voice ID?

1. **Technical complexity**: Requires voice embedding infrastructure
2. **Privacy concerns**: Storing voice biometrics raises GDPR/consent issues
3. **Guest speakers**: New voices at every session wouldn't match
4. **Host preference**: Religious leaders often prefer manual control over attribution
5. **Accuracy**: Current voice ID has ~85% accuracy; manual is 100%

**Phase 2 approach**: Offer optional voice enrollment for regular speakers, auto-suggest with confidence score, always allow manual override.

---

## Data Model

### Speaker
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| organizationId | UUID | FK → Organization (speakers belong to orgs) |
| userId | UUID? | FK → User (optional — linked if speaker has account) |
| name | string | Display name ("Pastor John Martinez") |
| title | string? | Role/title ("Senior Pastor", "Deacon") |
| bio | string? | Short biography |
| avatarUrl | string? | Profile image |
| isActive | boolean | Can appear in suggestions (default true) |
| voiceEmbedding | bytes? | Phase 2: voice fingerprint for auto-ID |
| createdAt | datetime | |
| updatedAt | datetime | |

### RoomSpeakerHistory (Suggestion Engine)
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| roomId | UUID | FK → Room |
| speakerId | UUID | FK → Speaker |
| diarizationLabel | string | e.g., "Speaker 1" — typical label for this speaker |
| occurrenceCount | int | How often this speaker appears in this room |
| lastSeenAt | datetime | Most recent session |

**Purpose:** When "Speaker 1" appears in Room X, suggest speakers who historically appear as "Speaker 1" in that room.

### TranscriptSegment (extended)
| Field | Type | Notes |
|-------|------|-------|
| ... existing fields ... | | |
| diarizationLabel | string? | AI-detected: "Speaker 1", "Speaker 2" |
| speakerId | UUID? | FK → Speaker (NULL until labeled) |
| speakerConfidence | decimal? | Phase 2: voice ID confidence 0-1 |

---

## Project Structure

```
backend/
├── src/
│   └── modules/
│       └── speakers/
│           ├── speakers.module.ts
│           ├── speakers.resolver.ts
│           ├── speakers.service.ts
│           ├── entities/
│           │   ├── speaker.entity.ts
│           │   └── room-speaker-history.entity.ts
│           ├── dto/
│           │   ├── create-speaker.dto.ts
│           │   ├── update-speaker.dto.ts
│           │   ├── assign-speaker.dto.ts
│           │   └── merge-speakers.dto.ts
│           └── services/
│               ├── diarization.service.ts       # Process uploaded audio
│               └── speaker-suggestion.service.ts # Auto-suggest based on history

frontend/
├── src/
│   ├── features/
│   │   └── speakers/
│   │       ├── components/
│   │       │   ├── SpeakerLabel.tsx            # Inline in transcript
│   │       │   ├── SpeakerAvatar.tsx           # Avatar with tooltip
│   │       │   ├── SpeakerList.tsx             # Manage org speakers
│   │       │   ├── SpeakerForm.tsx             # Create/edit speaker
│   │       │   ├── SpeakerAssignModal.tsx      # Label "Speaker 1" → named
│   │       │   ├── SpeakerSuggestions.tsx      # Auto-complete dropdown
│   │       │   ├── UnlabeledSpeakersPanel.tsx  # Shows all unlabeled in session
│   │       │   └── SpeakerMergeDialog.tsx      # Merge duplicate speakers
│   │       ├── hooks/
│   │       │   ├── useSpeakers.ts              # Fetch org speakers
│   │       │   ├── useSpeakerSuggestions.ts    # Get suggestions for room/label
│   │       │   └── useAssignSpeaker.ts         # Mutation hook
│   │       └── context/
│   │           └── SpeakerContext.tsx
```

---

## API Surface

### Queries

```graphql
type Query {
  # Get all speakers for an organization
  speakers(
    organizationId: ID!
    search: String           # Name search
    isActive: Boolean        # Filter active/inactive
    first: Int
    after: String
  ): SpeakerConnection!
  
  # Get single speaker
  speaker(id: ID!): Speaker
  
  # Get suggested speakers for a diarization label in a room
  speakerSuggestions(
    roomId: ID!
    diarizationLabel: String!
    limit: Int = 5
  ): [SpeakerSuggestion!]!
  
  # Get unlabeled diarization labels for a session
  unlabeledSpeakers(sessionId: ID!): [UnlabeledSpeaker!]!
}

type Speaker {
  id: ID!
  organizationId: ID!
  organization: Organization!
  user: User                  # Optional linked user account
  name: String!
  title: String
  bio: String
  avatarUrl: String
  isActive: Boolean!
  segmentCount: Int!          # Total segments attributed to this speaker
  sessionCount: Int!          # Total sessions this speaker appeared in
  createdAt: DateTime!
  updatedAt: DateTime!
}

type SpeakerSuggestion {
  speaker: Speaker!
  confidence: Float!          # 0-1 based on history
  reason: String!             # "Frequently appears as Speaker 1 in this room"
}

type UnlabeledSpeaker {
  diarizationLabel: String!   # "Speaker 1"
  segmentCount: Int!          # How many segments have this label
  sampleText: String!         # First segment text (for context)
  suggestions: [SpeakerSuggestion!]!
}
```

### Mutations

```graphql
type Mutation {
  # Create a new speaker in the organization
  createSpeaker(input: CreateSpeakerInput!): Speaker!
  
  # Update speaker details
  updateSpeaker(id: ID!, input: UpdateSpeakerInput!): Speaker!
  
  # Soft delete (set isActive = false)
  deactivateSpeaker(id: ID!): Speaker!
  
  # Assign a speaker to all segments with a diarization label
  assignSpeakerToLabel(input: AssignSpeakerInput!): AssignSpeakerResult!
  
  # Assign speaker to specific segments (fine-grained)
  assignSpeakerToSegments(
    speakerId: ID!
    segmentIds: [ID!]!
  ): Int!  # Returns count of updated segments
  
  # Merge two speakers (when duplicates are created)
  mergeSpeakers(
    keepSpeakerId: ID!     # Speaker to keep
    mergeSpeakerId: ID!    # Speaker to merge into keepSpeaker
  ): Speaker!
  
  # Unassign speaker from segments (revert to diarization label only)
  unassignSpeakerFromSegments(segmentIds: [ID!]!): Int!
}

input CreateSpeakerInput {
  organizationId: ID!
  name: String!
  title: String
  bio: String
  avatarUrl: String
  userId: ID              # Optional: link to existing user account
}

input UpdateSpeakerInput {
  name: String
  title: String
  bio: String
  avatarUrl: String
  isActive: Boolean
}

input AssignSpeakerInput {
  sessionId: ID!
  diarizationLabel: String!    # "Speaker 1"
  speakerId: ID!               # Speaker to assign
}

type AssignSpeakerResult {
  speaker: Speaker!
  segmentsUpdated: Int!
}
```

---

## Diarization Implementation

### Live Sessions (Google Cloud STT)

```typescript
// Diarization comes free with Google STT streaming
// See F1 audio-to-text.md for full implementation

// Google STT config with diarization enabled
const config: protos.google.cloud.speech.v1.IStreamingRecognitionConfig = {
  config: {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
    enableAutomaticPunctuation: true,
    diarizationConfig: {
      enableSpeakerDiarization: true,
      minSpeakerCount: 1,
      maxSpeakerCount: 6,  // Religious services: 1-6 speakers typical
    },
  },
  interimResults: true,
};

// Result processing
function processStreamingResult(result: StreamingRecognitionResult) {
  const alternative = result.alternatives?.[0];
  if (!alternative) return;
  
  // Each word includes speaker tag
  for (const word of alternative.words || []) {
    const segment = {
      text: word.word,
      diarizationLabel: `Speaker ${word.speakerTag}`,
      startTime: parseTime(word.startTime),
      endTime: parseTime(word.endTime),
    };
    // Aggregate words into segments by speaker
  }
}
```

### Uploaded Audio (pyannote-audio)

```typescript
// diarization.service.ts
@Injectable()
export class DiarizationService {
  async processUploadedAudio(recordingId: string): Promise<DiarizationResult[]> {
    const recording = await this.recordingRepo.findOne(recordingId);
    const audioUrl = recording.storageUrl;
    
    // Call Python worker for pyannote processing
    const result = await this.pythonWorker.execute('diarize', {
      audioUrl,
      minSpeakers: 1,
      maxSpeakers: 6,
    });
    
    return result.segments; // [{start: 0.0, end: 4.5, speaker: "SPEAKER_00"}, ...]
  }
  
  async mergeDiarizationWithTranscript(
    transcriptId: string,
    diarizationResults: DiarizationResult[],
  ): Promise<void> {
    const segments = await this.segmentRepo.find({ transcriptId });
    
    // For each transcript segment, find overlapping diarization
    for (const segment of segments) {
      const diarization = this.findOverlappingDiarization(
        segment.startTime,
        segment.endTime,
        diarizationResults,
      );
      
      if (diarization) {
        segment.diarizationLabel = this.normalizeSpeakerLabel(diarization.speaker);
        await this.segmentRepo.save(segment);
      }
    }
  }
  
  private normalizeSpeakerLabel(pyannoteLabel: string): string {
    // pyannote: "SPEAKER_00" → "Speaker 1"
    const num = parseInt(pyannoteLabel.replace('SPEAKER_', ''), 10);
    return `Speaker ${num + 1}`;
  }
}
```

### Python Worker (pyannote)

```python
# workers/diarization_worker.py
from pyannote.audio import Pipeline
import torch

# Load pre-trained pipeline (requires Hugging Face token)
pipeline = Pipeline.from_pretrained(
    "pyannote/speaker-diarization-3.1",
    use_auth_token="YOUR_HF_TOKEN"
)

# Use GPU if available
if torch.cuda.is_available():
    pipeline.to(torch.device("cuda"))

def diarize(audio_url: str, min_speakers: int = 1, max_speakers: int = 6):
    """Process audio file and return speaker segments."""
    diarization = pipeline(audio_url, min_speakers=min_speakers, max_speakers=max_speakers)
    
    segments = []
    for turn, _, speaker in diarization.itertracks(yield_label=True):
        segments.append({
            "start": turn.start,
            "end": turn.end,
            "speaker": speaker
        })
    
    return {"segments": segments}
```

---

## Speaker Suggestion Engine

```typescript
// speaker-suggestion.service.ts
@Injectable()
export class SpeakerSuggestionService {
  constructor(
    @InjectRepository(RoomSpeakerHistory)
    private historyRepo: Repository<RoomSpeakerHistory>,
    @InjectRepository(Speaker)
    private speakerRepo: Repository<Speaker>,
  ) {}

  async getSuggestions(
    roomId: string,
    diarizationLabel: string,
    limit = 5,
  ): Promise<SpeakerSuggestion[]> {
    // Strategy 1: History-based (who was "Speaker 1" in this room before?)
    const historyBased = await this.historyRepo.find({
      where: { roomId, diarizationLabel },
      relations: ['speaker'],
      order: { occurrenceCount: 'DESC' },
      take: limit,
    });
    
    // Strategy 2: Organization-wide frequency
    const orgSpeakers = await this.speakerRepo.find({
      where: { 
        organization: { rooms: { id: roomId } },
        isActive: true,
      },
      order: { updatedAt: 'DESC' },
      take: limit,
    });
    
    // Combine and score
    const suggestions: SpeakerSuggestion[] = [];
    
    for (const history of historyBased) {
      suggestions.push({
        speaker: history.speaker,
        confidence: Math.min(0.95, 0.5 + (history.occurrenceCount * 0.1)),
        reason: `Appeared as ${diarizationLabel} ${history.occurrenceCount} times in this room`,
      });
    }
    
    // Add org speakers not already suggested
    const suggestedIds = new Set(suggestions.map(s => s.speaker.id));
    for (const speaker of orgSpeakers) {
      if (!suggestedIds.has(speaker.id)) {
        suggestions.push({
          speaker,
          confidence: 0.3,
          reason: `Active speaker in your organization`,
        });
      }
    }
    
    return suggestions.slice(0, limit);
  }

  async recordAssignment(
    roomId: string,
    speakerId: string,
    diarizationLabel: string,
  ): Promise<void> {
    // Update or create history record
    let history = await this.historyRepo.findOne({
      where: { roomId, speakerId, diarizationLabel },
    });
    
    if (history) {
      history.occurrenceCount += 1;
      history.lastSeenAt = new Date();
    } else {
      history = this.historyRepo.create({
        roomId,
        speakerId,
        diarizationLabel,
        occurrenceCount: 1,
        lastSeenAt: new Date(),
      });
    }
    
    await this.historyRepo.save(history);
  }
}
```

---

## Frontend Components

### SpeakerLabel (Inline in Transcript)

```typescript
// components/SpeakerLabel.tsx
export function SpeakerLabel({ segment }: { segment: TranscriptSegment }) {
  const speaker = segment.speaker;
  
  if (!speaker && !segment.diarizationLabel) {
    return null;
  }
  
  // Labeled speaker
  if (speaker) {
    return (
      <Chip
        avatar={
          speaker.avatarUrl 
            ? <Avatar src={speaker.avatarUrl} />
            : <Avatar>{speaker.name[0]}</Avatar>
        }
        label={speaker.name}
        size="small"
        color="primary"
        variant="outlined"
      />
    );
  }
  
  // Unlabeled (diarization only)
  return (
    <Chip
      label={segment.diarizationLabel}
      size="small"
      color="default"
      variant="outlined"
      sx={{ fontStyle: 'italic' }}
    />
  );
}
```

### SpeakerAssignModal

```typescript
// components/SpeakerAssignModal.tsx
export function SpeakerAssignModal({
  open,
  onClose,
  sessionId,
  diarizationLabel,
}: Props) {
  const { suggestions, isLoading } = useSpeakerSuggestions(sessionId, diarizationLabel);
  const { speakers } = useSpeakers();
  const [assignSpeaker] = useAssignSpeakerToLabel();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filteredSpeakers = useMemo(() => {
    if (!searchQuery) return speakers;
    return speakers.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [speakers, searchQuery]);

  const handleAssign = async (speakerId: string) => {
    await assignSpeaker({
      sessionId,
      diarizationLabel,
      speakerId,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Assign "{diarizationLabel}" to Speaker
      </DialogTitle>
      
      <DialogContent>
        {/* Suggestions Section */}
        {suggestions.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Suggested
            </Typography>
            <Stack spacing={1}>
              {suggestions.map(({ speaker, confidence, reason }) => (
                <Card
                  key={speaker.id}
                  sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                  onClick={() => handleAssign(speaker.id)}
                >
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5 }}>
                    <Avatar src={speaker.avatarUrl}>{speaker.name[0]}</Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1">{speaker.name}</Typography>
                      {speaker.title && (
                        <Typography variant="caption" color="text.secondary">
                          {speaker.title}
                        </Typography>
                      )}
                    </Box>
                    <Chip
                      label={`${Math.round(confidence * 100)}%`}
                      size="small"
                      color={confidence > 0.7 ? 'success' : 'default'}
                    />
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        )}
        
        {/* Search All Speakers */}
        <TextField
          fullWidth
          placeholder="Search speakers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
          }}
          sx={{ mb: 2 }}
        />
        
        <List>
          {filteredSpeakers.map((speaker) => (
            <ListItemButton key={speaker.id} onClick={() => handleAssign(speaker.id)}>
              <ListItemAvatar>
                <Avatar src={speaker.avatarUrl}>{speaker.name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={speaker.name} secondary={speaker.title} />
            </ListItemButton>
          ))}
        </List>
        
        {/* Create New Speaker */}
        <Divider sx={{ my: 2 }} />
        
        {showCreateForm ? (
          <SpeakerForm
            onSave={(newSpeaker) => {
              handleAssign(newSpeaker.id);
            }}
            onCancel={() => setShowCreateForm(false)}
          />
        ) : (
          <Button
            startIcon={<AddIcon />}
            onClick={() => setShowCreateForm(true)}
            fullWidth
          >
            Create New Speaker
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
```

### UnlabeledSpeakersPanel (Host Dashboard)

```typescript
// components/UnlabeledSpeakersPanel.tsx
export function UnlabeledSpeakersPanel({ sessionId }: { sessionId: string }) {
  const { unlabeledSpeakers, isLoading } = useUnlabeledSpeakers(sessionId);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  if (isLoading) return <Skeleton />;
  
  if (unlabeledSpeakers.length === 0) {
    return (
      <Alert severity="success">
        All speakers have been labeled for this session.
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Unlabeled Speakers ({unlabeledSpeakers.length})
      </Typography>
      
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Click to assign each speaker to a named person
      </Typography>
      
      <Stack spacing={2}>
        {unlabeledSpeakers.map(({ diarizationLabel, segmentCount, sampleText, suggestions }) => (
          <Card key={diarizationLabel}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {diarizationLabel}
                </Typography>
                <Chip label={`${segmentCount} segments`} size="small" />
              </Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Sample: "{sampleText.substring(0, 100)}..."
              </Typography>
              
              {/* Quick suggestions */}
              {suggestions.length > 0 && (
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {suggestions.slice(0, 3).map(({ speaker }) => (
                    <Chip
                      key={speaker.id}
                      avatar={<Avatar src={speaker.avatarUrl}>{speaker.name[0]}</Avatar>}
                      label={speaker.name}
                      onClick={() => {/* Quick assign */}}
                      clickable
                    />
                  ))}
                </Box>
              )}
              
              <Button
                variant="outlined"
                size="small"
                sx={{ mt: 2 }}
                onClick={() => setSelectedLabel(diarizationLabel)}
              >
                Assign Speaker
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>
      
      <SpeakerAssignModal
        open={!!selectedLabel}
        onClose={() => setSelectedLabel(null)}
        sessionId={sessionId}
        diarizationLabel={selectedLabel || ''}
      />
    </Box>
  );
}
```

---

## Access Control

| Role | View Speakers | Create/Edit | Assign Labels | Merge/Delete |
|------|---------------|-------------|---------------|--------------|
| Guest | ✓ (labels only) | ❌ | ❌ | ❌ |
| Member | ✓ | ❌ | ❌ | ❌ |
| **Host** | ✓ | ✓ | ✓ (own sessions) | ❌ |
| **Org Admin** | ✓ | ✓ | ✓ | ✓ |
| Individual (Pro) | ✓ | ✓ (own speakers) | ✓ | ✓ |

---

## Cost Analysis

| Component | Cost | Notes |
|-----------|------|-------|
| **Google STT diarization** | +$0 | Included in STT price |
| **pyannote (uploaded)** | +$0 | Self-hosted, open source |
| **Speaker storage** | ~$0 | Minimal DB rows |

**Net impact:** $0 marginal cost (diarization bundled with STT).

---

## Phase 2: Voice Fingerprinting (Future)

### Overview
- Speaker enrolls by recording 30-second sample
- Voice embedding generated via embedding model (e.g., SpeechBrain, Resemblyzer)
- Stored as `Speaker.voiceEmbedding` (binary blob)
- During diarization, compare voice segments to known embeddings
- Auto-suggest speaker with confidence score

### Technical Approach
```python
# Phase 2: Voice embedding generation
from resemblyzer import VoiceEncoder, preprocess_wav

encoder = VoiceEncoder()

def enroll_speaker(audio_path: str) -> bytes:
    wav = preprocess_wav(audio_path)
    embedding = encoder.embed_utterance(wav)
    return embedding.tobytes()

def match_speaker(segment_audio: bytes, known_embeddings: List[tuple]) -> tuple:
    segment_embedding = encoder.embed_utterance(preprocess_wav(segment_audio))
    
    best_match = None
    best_score = 0.0
    
    for speaker_id, known_embedding in known_embeddings:
        similarity = np.dot(segment_embedding, known_embedding)
        if similarity > best_score:
            best_score = similarity
            best_match = speaker_id
    
    return (best_match, best_score) if best_score > 0.75 else (None, 0)
```

### Privacy Considerations
- Voice embeddings are biometric data (GDPR special category)
- Explicit consent required for voice enrollment
- Option to delete voice embedding (revoke enrollment)
- Embeddings not reversible to audio

---

## Dependencies

| Dependency | Direction | Notes |
|------------|-----------|-------|
| **C1 (Database)** | ← uses | Speaker, RoomSpeakerHistory tables |
| **F1 (Audio-to-Text)** | ← uses | TranscriptSegment with diarization |
| **F5 (Recordings)** | related | Recordings needed for pyannote processing |
| **F13 (Speaker Feedback)** | uses → | Feedback linked to Speaker |
| **W6 (Host Dashboard)** | uses → | Speaker labeling UI |

---

## Acceptance Criteria

### MVP (Phase 1)
- [ ] Google STT diarization labels segments during live sessions
- [ ] pyannote diarization processes uploaded audio
- [ ] Host can view unlabeled speakers per session
- [ ] Host can create new speakers (name, title, avatar)
- [ ] Host can assign speaker to all segments with diarization label
- [ ] Speaker suggestions based on room history
- [ ] Transcript displays speaker names inline
- [ ] Speakers persist per organization

### Phase 1.5
- [ ] Fine-grained segment assignment (override single segments)
- [ ] Merge duplicate speakers
- [ ] Speaker profiles (bio, avatar)
- [ ] Search speakers across organization

### Phase 2 (Voice Fingerprinting)
- [ ] Voice enrollment (30-second sample)
- [ ] Auto-suggest speaker with confidence during playback
- [ ] Consent flow for biometric data
- [ ] Embedding deletion capability

---

## Environment Variables

```env
# Diarization
DIARIZATION_ENABLED=true
DIARIZATION_MIN_SPEAKERS=1
DIARIZATION_MAX_SPEAKERS=6

# pyannote (for uploaded audio)
PYANNOTE_HF_TOKEN=hf_xxxxxxxxxxxxx

# Phase 2: Voice fingerprinting
VOICE_FINGERPRINT_ENABLED=false
VOICE_MATCH_THRESHOLD=0.75
```
- Diarization tool (pyannote or API)

## Acceptance Criteria
- [ ] Diarization auto-labels speaker changes in transcripts
- [ ] Host can assign names to diarization labels
- [ ] Speaker labels persist and are suggested in future sessions
- [ ] Speakers can be linked to User accounts (optional)
- [ ] Multiple speakers per session handled correctly
