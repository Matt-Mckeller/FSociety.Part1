# F7 — Recaps

> Post-session recaps with structured highlights, key moments, and timestamp-linked content for easy revisiting.

**Status:** Planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md) | [decisions.md](../decisions.md)
**Related:** [F6 — Summaries](summaries.md) | [C8 — Typed AI Responses](../core/typed-ai-responses.md)

**User Story:** "A member reviews a past session's recap, saves highlights, and revisits key moments"

---

## ⚠️ Key Decisions (Do Not Overwrite)

1. **Typed AI Responses** — Recap generation uses typed response system. See [C8](../core/typed-ai-responses.md)
2. **Structured Output** — Timestamped highlights, not prose (contrast with F6 Summaries)
3. **User Saves** — Users can save individual highlights

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         RECAP GENERATION PIPELINE                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   Session Ends                                                           │
│        │                                                                 │
│        ▼                                                                 │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │  Transcript Segments with Timestamps                              │  │
│   │  [00:00] "Today we gather..." → [05:23] "The parable of..." → ...│  │
│   └────────────────────────────┬─────────────────────────────────────┘  │
│                                │                                         │
│                                ▼                                         │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │  Recap Service + AI Provider (GPT-5.2)                           │  │
│   │                                                                    │  │
│   │  1. Extract key moments (quotes, concepts, references)            │  │
│   │  2. Identify topic transitions                                    │  │
│   │  3. Generate titles and descriptions for each highlight           │  │
│   │  4. Link each highlight to source TranscriptSegment               │  │
│   │                                                                    │  │
│   └────────────────────────────┬─────────────────────────────────────┘  │
│                                │                                         │
│                                ▼                                         │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │  Recap Entity                                                     │  │
│   │  └── RecapHighlight[] (5-15 per session)                         │  │
│   │      ├── title: "Understanding the Scientific Method"             │  │
│   │      ├── description: "Professor explains..."                      │  │
│   │      ├── topic: "methodology"                                     │  │
│   │      ├── startTime: 324.5 (seconds)                              │  │
│   │      └── segmentId → links to exact transcript moment            │  │
│   └──────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                            USER INTERACTION                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌────────────────────────────────────────────────────────────────┐    │
│   │  RecapView Component                                            │    │
│   │                                                                  │    │
│   │  ┌────────────────────────────────────────────────────────┐    │    │
│   │  │  ⏱️ 05:23  The Discovery of DNA Structure              │◀───┼────┤ Click to play
│   │  │  Professor explains Watson and Crick's breakthrough    │    │    │ from this
│   │  │  #biology #discovery                         [💾 Save] │    │    │ timestamp
│   │  └────────────────────────────────────────────────────────┘    │    │
│   │                                                                  │    │
│   │  ┌────────────────────────────────────────────────────────┐    │    │
│   │  │  ⏱️ 12:47  Reference: Nature Journal 1953              │    │    │
│   │  │  Direct reading with detailed explanation              │    │    │
│   │  │  #reference #research                        [💾 Save] │    │    │
│   │  └────────────────────────────────────────────────────────┘    │    │
│   │                                                                  │    │
│   │  ┌───────────────────────────────────────────────────────────┐ │    │
│   │  │  📚 My Saved Highlights (3)                               │ │    │
│   │  │  • The Scientific Method (Session: March 10)             │ │    │
│   │  │  • Key Experiment (Session: March 3)                     │ │    │
│   │  └───────────────────────────────────────────────────────────┘ │    │
│   └────────────────────────────────────────────────────────────────┘    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Summary vs Recap: Clear Distinction

| Aspect | Summary (F6) | Recap (F7) |
|--------|--------------|------------|
| **Format** | Prose narrative (200-400 words) | Structured list (5-15 highlights) |
| **Purpose** | "What was the overall message?" | "What were the key moments to revisit?" |
| **Linkage** | No timestamps | Each highlight links to timestamp |
| **Interaction** | Read-only | Click to seek, save favorites |
| **Output tokens** | ~500 | ~1,000 (more structured data) |
| **Cost** | $0.009/session | $0.012/session |
| **Use case** | Quick overview before deciding to watch | Navigate directly to interesting parts |

**They complement each other:** Summary tells you if you want to engage; Recap helps you navigate once you do.

---

## Design Decisions

### Key Choices

| Decision | Choice | Alternatives Considered | Rationale |
|----------|--------|-------------------------|-----------|
| Highlight count | **5-15 per session** | Fixed count, unlimited | Proportional to content, manageable list |
| Topic extraction | **AI-generated tags** | Manual tags, predefined list | Flexible for any content |
| Timestamp linking | **Link to TranscriptSegment** | Store raw timestamp only | Enables synced playback + translation |
| User saves | **Per-user bookmark** | Copy highlight, shared saves | Personal curation, no duplication |
| Generation trigger | **Auto (with Summary)** | On-demand only | Users expect it ready |

### Highlight Types

| Type | Description | Example |
|------|-------------|---------|
| **Reference** | Citation of source material | \"Key passage referenced\" |
| **Key Concept** | Core message or lesson | \"Key insight about the topic\" |
| **Story/Example** | Narrative illustration | \"Real-world example\" |
| **Call to Action** | Practical application | \"This week, try this...\" |
| **Quote** | Memorable phrasing | \"Key memorable statement\" |
| **Topic Transition** | Shift in subject matter | \"Moving to the next concept...\" |

---

## Project Structure

```
backend/
├── src/
│   └── modules/
│       └── recaps/
│           ├── recaps.module.ts
│           ├── recaps.resolver.ts
│           ├── recaps.service.ts
│           ├── entities/
│           │   ├── recap.entity.ts
│           │   └── recap-highlight.entity.ts
│           ├── dto/
│           │   ├── generate-recap.dto.ts
│           │   ├── save-highlight.dto.ts
│           │   └── get-recap.dto.ts
│           └── prompts/
│               └── recap-extraction.prompt.ts

frontend/
├── src/
│   ├── features/
│   │   └── recaps/
│   │       ├── components/
│   │       │   ├── RecapView.tsx             # Full recap with all highlights
│   │       │   ├── RecapHighlightCard.tsx    # Single highlight item
│   │       │   ├── SaveHighlightButton.tsx   # Bookmark toggle
│   │       │   ├── SavedHighlightsList.tsx   # User's saved highlights
│   │       │   ├── TopicFilter.tsx           # Filter by topic tags
│   │       │   └── RecapTimeline.tsx         # Visual timeline of highlights
│   │       ├── hooks/
│   │       │   ├── useRecap.ts               # Fetch recap for session
│   │       │   ├── useSavedHighlights.ts     # User's bookmarked highlights
│   │       │   └── useHighlightSeek.ts       # Jump to timestamp in player
│   │       └── context/
│   │           └── RecapContext.tsx
```

---

## Data Model (extended from C6)

### Recap
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| sessionId | UUID | FK → Session (unique) |
| language | string | Source language |
| highlightCount | int | Denormalized count |
| modelUsed | string | e.g., "gpt-5.2" |
| generatedAt | datetime | |

### RecapHighlight
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| recapId | UUID | FK → Recap |
| segmentId | UUID | FK → TranscriptSegment |
| sequenceIndex | int | Order in recap (0-based) |
| type | enum | SCRIPTURE, TEACHING, STORY, CALL_TO_ACTION, QUOTE, TRANSITION |
| title | string | Short title (3-10 words) |
| description | string? | 1-2 sentence explanation |
| quote | string? | Direct quote from transcript |
| topics | string[] | AI-generated tags |
| startTime | decimal | Seconds (denormalized from segment) |
| endTime | decimal | Seconds (denormalized from segment) |

### UserSavedHighlight (join table)
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| userId | UUID | FK → User |
| highlightId | UUID | FK → RecapHighlight |
| savedAt | datetime | |
| note | string? | User's personal note |

**Unique constraint:** `(userId, highlightId)`

---

## API Surface

### Mutations

```graphql
type Mutation {
  # Generate recap for a session (auto-called with summary)
  generateRecap(input: GenerateRecapInput!): Recap!
  
  # User saves/unsaves a highlight
  toggleSaveHighlight(highlightId: ID!): UserSavedHighlight
  
  # User adds note to saved highlight
  updateSavedHighlightNote(highlightId: ID!, note: String): UserSavedHighlight!
  
  # Delete recap (admin only)
  deleteRecap(id: ID!): Boolean!
}

input GenerateRecapInput {
  sessionId: ID!
  force: Boolean  # Regenerate even if exists
}
```

### Queries

```graphql
type Query {
  # Get recap for a session
  recap(sessionId: ID!): Recap
  
  # Get all highlights for a recap (with user save status)
  recapHighlights(
    recapId: ID!
    type: HighlightType
    topics: [String!]
  ): [RecapHighlight!]!
  
  # Get user's saved highlights across all sessions
  mySavedHighlights(
    first: Int
    after: String
    sessionId: ID  # Filter to specific session
  ): SavedHighlightConnection!
  
  # Search highlights by topic across sessions
  searchHighlights(
    query: String!
    topics: [String!]
    first: Int
  ): [RecapHighlight!]!
}

type Recap {
  id: ID!
  sessionId: ID!
  session: Session!
  language: String!
  highlightCount: Int!
  highlights: [RecapHighlight!]!
  generatedAt: DateTime!
}

type RecapHighlight {
  id: ID!
  recapId: ID!
  recap: Recap!
  segment: TranscriptSegment!
  sequenceIndex: Int!
  type: HighlightType!
  title: String!
  description: String
  quote: String
  topics: [String!]!
  startTime: Float!
  endTime: Float!
  isSavedByMe: Boolean!  # Computed for current user
}

enum HighlightType {
  SCRIPTURE
  TEACHING
  STORY
  CALL_TO_ACTION
  QUOTE
  TRANSITION
}

type UserSavedHighlight {
  id: ID!
  highlight: RecapHighlight!
  savedAt: DateTime!
  note: String
}
```

---

## Recap Generation Flow

### 1. Auto-Generation (with Summary)

```typescript
// Triggered together with summary
@OnEvent('session.completed')
async handleSessionCompleted(event: SessionCompletedEvent) {
  const { sessionId } = event;
  
  // Check access (Pro tier or Org plan)
  const hasAccess = await this.planService.hasFeature(sessionId, 'recaps');
  if (!hasAccess) return;
  
  // Generate both in parallel
  await Promise.all([
    this.summaryService.generateSummary({ sessionId }),
    this.recapService.generateRecap({ sessionId }),
  ]);
}
```

### 2. Recap Service Implementation

```typescript
// recaps.service.ts
@Injectable()
export class RecapsService {
  constructor(
    @InjectRepository(Recap)
    private recapRepo: Repository<Recap>,
    @InjectRepository(RecapHighlight)
    private highlightRepo: Repository<RecapHighlight>,
    private transcriptService: TranscriptService,
    private aiService: AIService,
  ) {}

  async generateRecap(input: GenerateRecapInput): Promise<Recap> {
    const { sessionId, force } = input;
    
    // Check for existing
    if (!force) {
      const existing = await this.recapRepo.findOne({ where: { sessionId } });
      if (existing) return existing;
    }
    
    // Get transcript segments with timestamps
    const segments = await this.transcriptService.getSegmentsWithTimestamps(sessionId);
    if (segments.length < 5) {
      throw new BadRequestException('Insufficient content for recap');
    }
    
    // Prepare transcript with timestamps for AI
    const transcriptWithTimestamps = this.formatTranscriptForExtraction(segments);
    
    // Extract highlights via AI
    const extractedHighlights = await this.extractHighlights(transcriptWithTimestamps);
    
    // Create recap entity
    const recap = this.recapRepo.create({
      sessionId,
      language: segments[0].transcript.language,
      highlightCount: extractedHighlights.length,
      modelUsed: 'gpt-5.2',
    });
    const savedRecap = await this.recapRepo.save(recap);
    
    // Create highlight entities, linking to actual segments
    const highlights = await Promise.all(
      extractedHighlights.map(async (h, index) => {
        // Find the segment closest to the extracted timestamp
        const segment = this.findClosestSegment(segments, h.timestamp);
        
        return this.highlightRepo.create({
          recapId: savedRecap.id,
          segmentId: segment.id,
          sequenceIndex: index,
          type: h.type,
          title: h.title,
          description: h.description,
          quote: h.quote,
          topics: h.topics,
          startTime: segment.startTime,
          endTime: segment.endTime,
        });
      })
    );
    
    await this.highlightRepo.save(highlights);
    
    return savedRecap;
  }

  private formatTranscriptForExtraction(segments: TranscriptSegment[]): string {
    return segments.map(s => 
      `[${this.formatTime(s.startTime)}] ${s.diarizationLabel || 'Speaker'}: ${s.text}`
    ).join('\n');
  }

  private async extractHighlights(transcript: string): Promise<ExtractedHighlight[]> {
    const prompt = this.buildExtractionPrompt(transcript);
    
    const result = await this.aiService.generateText(prompt, {
      taskType: 'recap',
      maxTokens: 2000,
      temperature: 0.2,  // Low for consistent extraction
      responseFormat: 'json',
    });
    
    return JSON.parse(result.text).highlights;
  }
}
```

### 3. Prompt Engineering

```typescript
// prompts/recap-extraction.prompt.ts
export function buildRecapExtractionPrompt(
  transcript: string,
  verticalConfig: VerticalConfig,
): string {
  // Vertical-specific highlight types:
  // - RELIGION: SCRIPTURE, TEACHING, STORY, etc.
  // - EDUCATION: CONCEPT, EXAMPLE, DEFINITION, etc.
  // - PROFESSIONAL: DECISION, ACTION_ITEM, INSIGHT, etc.
  const { expertiseContext, highlightTypes } = verticalConfig.prompts.recap;

  return `
You are an expert at analyzing ${expertiseContext} and extracting key moments.

TRANSCRIPT (with timestamps):
${transcript}

TASK:
Extract 5-15 key highlights from this session. Each highlight should be a notable moment worth revisiting.

HIGHLIGHT TYPES:
${highlightTypes}

RESPOND WITH JSON:
{
  "highlights": [
    {
      "timestamp": 323.5,        // Seconds from start
      "type": "KEY_CONCEPT",
      "title": "Core Concept Title",
      "description": "Brief description of what's covered at this moment",
      "quote": "A key quote from this segment...",
      "topics": ["topic-1", "topic-2", "topic-3"]
    }
  ]
}

RULES:
1. Extract 5-15 highlights (more for longer sessions)
2. Space them throughout the session (not all clustered)
3. Each highlight should be distinct and valuable
4. Titles should be 3-10 words, descriptive
5. Include direct quotes when impactful
6. Topics should be lowercase, hyphenated tags
7. Timestamps must match actual moments in transcript
`.trim();
}
```

---

## Frontend Components

### RecapView

```typescript
// components/RecapView.tsx
export function RecapView({ sessionId }: Props) {
  const { recap, isLoading } = useRecap(sessionId);
  const { seekTo } = useRecordingPlayback();
  const [typeFilter, setTypeFilter] = useState<HighlightType | null>(null);
  const [topicFilter, setTopicFilter] = useState<string | null>(null);

  const filteredHighlights = useMemo(() => {
    if (!recap?.highlights) return [];
    return recap.highlights.filter(h => {
      if (typeFilter && h.type !== typeFilter) return false;
      if (topicFilter && !h.topics.includes(topicFilter)) return false;
      return true;
    });
  }, [recap?.highlights, typeFilter, topicFilter]);

  // Extract all unique topics
  const allTopics = useMemo(() => {
    if (!recap?.highlights) return [];
    const topics = new Set<string>();
    recap.highlights.forEach(h => h.topics.forEach(t => topics.add(t)));
    return Array.from(topics).sort();
  }, [recap?.highlights]);

  if (isLoading) return <RecapSkeleton />;
  if (!recap) return <Alert severity="info">No recap available</Alert>;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Key Moments ({recap.highlightCount})
      </Typography>
      
      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TypeFilter value={typeFilter} onChange={setTypeFilter} />
        <TopicFilter topics={allTopics} value={topicFilter} onChange={setTopicFilter} />
      </Box>
      
      {/* Timeline visualization */}
      <RecapTimeline 
        highlights={recap.highlights}
        sessionDuration={recap.session.durationSeconds}
        onHighlightClick={(h) => seekTo(h.startTime)}
      />
      
      {/* Highlight cards */}
      <Stack spacing={2}>
        {filteredHighlights.map((highlight) => (
          <RecapHighlightCard
            key={highlight.id}
            highlight={highlight}
            onSeek={() => seekTo(highlight.startTime)}
          />
        ))}
      </Stack>
    </Box>
  );
}
```

### RecapHighlightCard

```typescript
// components/RecapHighlightCard.tsx
export function RecapHighlightCard({ highlight, onSeek }: Props) {
  const [toggleSave] = useToggleSaveHighlight();

  const typeIcons: Record<HighlightType, ReactNode> = {
    SCRIPTURE: <MenuBookIcon />,
    TEACHING: <SchoolIcon />,
    STORY: <AutoStoriesIcon />,
    CALL_TO_ACTION: <CampaignIcon />,
    QUOTE: <FormatQuoteIcon />,
    TRANSITION: <SwapHorizIcon />,
  };

  return (
    <Card 
      sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
      onClick={onSeek}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          {/* Timestamp */}
          <Chip
            icon={<AccessTimeIcon />}
            label={formatTime(highlight.startTime)}
            size="small"
            color="primary"
            variant="outlined"
          />
          
          {/* Type icon */}
          <Tooltip title={highlight.type.toLowerCase().replace('_', ' ')}>
            <Box sx={{ color: 'text.secondary' }}>
              {typeIcons[highlight.type]}
            </Box>
          </Tooltip>
          
          {/* Content */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {highlight.title}
            </Typography>
            
            {highlight.description && (
              <Typography variant="body2" color="text.secondary">
                {highlight.description}
              </Typography>
            )}
            
            {highlight.quote && (
              <Typography 
                variant="body2" 
                sx={{ 
                  fontStyle: 'italic', 
                  borderLeft: 2, 
                  borderColor: 'primary.main',
                  pl: 2,
                  mt: 1,
                }}
              >
                "{highlight.quote}"
              </Typography>
            )}
            
            {/* Topics */}
            <Box sx={{ display: 'flex', gap: 0.5, mt: 1, flexWrap: 'wrap' }}>
              {highlight.topics.map((topic) => (
                <Chip key={topic} label={`#${topic}`} size="small" variant="outlined" />
              ))}
            </Box>
          </Box>
          
          {/* Save button */}
          <IconButton 
            onClick={(e) => {
              e.stopPropagation();
              toggleSave(highlight.id);
            }}
            color={highlight.isSavedByMe ? 'primary' : 'default'}
          >
            {highlight.isSavedByMe ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}
```

### RecapTimeline

```typescript
// components/RecapTimeline.tsx
export function RecapTimeline({ highlights, sessionDuration, onHighlightClick }: Props) {
  return (
    <Box sx={{ position: 'relative', height: 60, mb: 3 }}>
      {/* Timeline bar */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: 4,
          bgcolor: 'grey.300',
          borderRadius: 2,
        }}
      />
      
      {/* Highlight markers */}
      {highlights.map((highlight) => {
        const position = (highlight.startTime / sessionDuration) * 100;
        return (
          <Tooltip key={highlight.id} title={highlight.title}>
            <Box
              onClick={() => onHighlightClick(highlight)}
              sx={{
                position: 'absolute',
                top: '50%',
                left: `${position}%`,
                transform: 'translate(-50%, -50%)',
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: getTypeColor(highlight.type),
                cursor: 'pointer',
                border: '2px solid white',
                boxShadow: 1,
                '&:hover': {
                  transform: 'translate(-50%, -50%) scale(1.3)',
                },
                transition: 'transform 0.2s',
              }}
            />
          </Tooltip>
        );
      })}
    </Box>
  );
}
```

### SavedHighlightsList (Member Dashboard)

```typescript
// components/SavedHighlightsList.tsx
export function SavedHighlightsList() {
  const { savedHighlights, isLoading } = useSavedHighlights();
  
  // Group by session
  const groupedBySession = useMemo(() => {
    const groups = new Map<string, UserSavedHighlight[]>();
    savedHighlights.forEach(sh => {
      const sessionId = sh.highlight.recap.sessionId;
      if (!groups.has(sessionId)) groups.set(sessionId, []);
      groups.get(sessionId)!.push(sh);
    });
    return groups;
  }, [savedHighlights]);

  if (isLoading) return <Skeleton />;
  if (savedHighlights.length === 0) {
    return (
      <Alert severity="info">
        No saved highlights yet. Browse recaps and click the bookmark icon to save moments.
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        My Saved Highlights ({savedHighlights.length})
      </Typography>
      
      {Array.from(groupedBySession.entries()).map(([sessionId, highlights]) => (
        <Accordion key={sessionId}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              {highlights[0].highlight.recap.session.title || 'Session'} 
              ({highlights.length} saved)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={1}>
              {highlights.map(sh => (
                <SavedHighlightItem key={sh.id} savedHighlight={sh} />
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
```

---

## Integration with Recording Playback (F5)

```typescript
// hooks/useHighlightSeek.ts
export function useHighlightSeek(recordingId: string) {
  const { audioRef, recording } = useRecordingPlayback(recordingId);

  const seekToHighlight = useCallback((highlight: RecapHighlight) => {
    if (!audioRef.current || !recording) return;
    
    // Account for recording start offset
    const seekTime = highlight.startTime - (recording.recordingStartOffset || 0);
    
    audioRef.current.currentTime = Math.max(0, seekTime);
    audioRef.current.play();
    
    // Scroll transcript to this segment
    document.getElementById(`segment-${highlight.segmentId}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [audioRef, recording]);

  return { seekToHighlight };
}
```

---

## Access Control

| Role | View Recap | Save Highlights | Generate | Delete |
|------|------------|-----------------|----------|--------|
| Guest (no account) | ❌ | ❌ | ❌ | ❌ |
| Guest (org invite) | ❌ | ❌ | ❌ | ❌ |
| Chat tier | ❌ | ❌ | ❌ | ❌ |
| Plus tier | ❌ | ❌ | ❌ | ❌ |
| **Pro tier** | ✓ | ✓ | ✓ | ❌ |
| Host (org) | ✓ | ✓ | ✓ | ❌ |
| Org Admin | ✓ | ✓ | ✓ | ✓ |

**Note:** Like summaries, recaps are a Pro-tier / Organization feature.

---

## Cost Analysis

| Component | Cost | Notes |
|-----------|------|-------|
| **Recap extraction** | $0.012 | GPT-5.2: 4K in + 1K out (JSON) |
| **Per saved highlight** | $0 | Just a database join |

**Per session:** $0.012
**Monthly at scale:** 100 orgs × 30 sessions × $0.012 = **$36/month**

---

## Dependencies

| Dependency | Direction | Notes |
|------------|-----------|-------|
| **C5 (AI Provider)** | ← uses | GPT-5.2 for extraction |
| **F1 (Audio-to-Text)** | ← uses | TranscriptSegment data |
| **F5 (Recordings)** | ← uses | Timestamp sync for playback |
| **F6 (Summaries)** | related | Generated together |
| **W6 (Host Dashboard)** | uses → | View recaps |
| **W7 (Member Dashboard)** | uses → | View recaps, saved highlights |

---

## Acceptance Criteria

### MVP (Phase 1)
- [ ] Auto-generate recap when session completes (Pro/Org only)
- [ ] 5-15 highlights extracted with types, titles, descriptions
- [ ] Timestamps linked to TranscriptSegments
- [ ] Click highlight to seek recording playback
- [ ] Save/unsave highlights (per user)
- [ ] View saved highlights in dashboard
- [ ] Filter by type and topic

### Phase 2
- [ ] Timeline visualization
- [ ] Personal notes on saved highlights
- [ ] Cross-session search by topic
- [ ] Export saved highlights (PDF/markdown)
- [ ] Share individual highlights (deep link)

---

## Response Types (Draft)

> These types define the AI response structure. See [C8 — Typed AI Responses](../core/typed-ai-responses.md) for the full pattern.

### RecapResponseData

```typescript
// libs/4eye-types/ai/recaps/RecapResponse.ts

/**
 * AI-generated recap response with structured highlights.
 * 
 * Generate 5-15 highlights based on session length. Each highlight should:
 * - Have a clear, actionable title (3-10 words)
 * - Include timestamp linking to source transcript
 * - Be categorized by type
 * - Include relevant topic tags
 * 
 * @interface RecapResponseData
 */
export interface RecapResponseData {
  /**
   * Array of key moments from the session.
   * Order by timestamp (chronological).
   * Target 5-15 highlights proportional to session length.
   * 
   * @example See RecapHighlight interface
   */
  highlights: RecapHighlight[];

  /**
   * Overall session duration in seconds.
   * Used for context when displaying timeline.
   * 
   * @example 1800
   */
  sessionDurationSeconds: number;
}

/**
 * A single highlight/key moment from the session.
 */
export interface RecapHighlight {
  /**
   * Type of highlight.
   * 
   * @example "TEACHING" for a key lesson
   * @example "SCRIPTURE" for a textual reference
   * @example "STORY" for a narrative illustration
   * @example "CALL_TO_ACTION" for practical application
   * @example "QUOTE" for a memorable statement
   * @example "TRANSITION" for a major topic shift
   */
  type: 'SCRIPTURE' | 'TEACHING' | 'STORY' | 'CALL_TO_ACTION' | 'QUOTE' | 'TRANSITION';

  /**
   * Short, descriptive title (3-10 words).
   * Should be scannable and meaningful without context.
   * 
   * @example "The Power of Letting Go"
   * @example "Key Insight: Problem-Solving Framework"
   */
  title: string;

  /**
   * 1-2 sentence explanation of this moment.
   * Provide enough context to decide whether to revisit.
   * 
   * @example "Speaker explains how releasing resentment creates space for peace and new growth."
   */
  description: string;

  /**
   * Direct quote from the transcript (if applicable).
   * Capture the exact memorable phrasing.
   * 
   * @example "Understanding this principle will change how you approach complex problems."
   */
  quote?: string;

  /**
   * Topic tags for filtering and discovery.
   * 2-4 lowercase single-word tags.
   * 
   * @example ["methodology", "analysis", "process"]
   */
  topics: string[];

  /**
   * Start timestamp in seconds from session start.
   * 
   * @example 323.5
   */
  startTimeSeconds: number;

  /**
   * End timestamp in seconds (extent of this highlight).
   * 
   * @example 385.2
   */
  endTimeSeconds: number;
}
```

### Zod Schema

```typescript
// libs/4eye-types/ai/recaps/RecapResponse.schema.ts

import { z } from 'zod';

export const RecapHighlightSchema = z.object({
  type: z.enum(['SCRIPTURE', 'TEACHING', 'STORY', 'CALL_TO_ACTION', 'QUOTE', 'TRANSITION']),
  title: z.string().min(5).max(100),
  description: z.string().min(20).max(500),
  quote: z.string().max(300).optional(),
  topics: z.array(z.string()).min(1).max(5),
  startTimeSeconds: z.number().min(0),
  endTimeSeconds: z.number().min(0),
});

export const RecapResponseDataSchema = z.object({
  highlights: z.array(RecapHighlightSchema).min(3).max(20),
  sessionDurationSeconds: z.number().min(0),
});

export type RecapHighlight = z.infer<typeof RecapHighlightSchema>;
export type RecapResponseData = z.infer<typeof RecapResponseDataSchema>;
```

### Example Response

```json
{
  "highlights": [
    {
      "type": "TEACHING",
      "title": "Forgiveness vs Reconciliation",
      "description": "Clear distinction drawn between internal forgiveness (a personal choice) and reconciliation (requires both parties). Emphasizes you can forgive without restoring the relationship.",
      "topics": ["forgiveness", "boundaries", "healing"],
      "startTimeSeconds": 124.5,
      "endTimeSeconds": 198.3
    },
    {
      "type": "QUOTE",
      "title": "The Weight of Resentment",
      "description": "Powerful metaphor about how holding onto anger affects the holder more than the offender.",
      "quote": "Resentment is like drinking poison and waiting for the other person to get sick.",
      "topics": ["resentment", "freedom", "letting go"],
      "startTimeSeconds": 312.0,
      "endTimeSeconds": 425.8
    },
    {
      "type": "CALL_TO_ACTION",
      "title": "This Week's Challenge",
      "description": "Practical invitation to identify one resentment you're carrying and take a first step toward releasing it.",
      "quote": "Start small. Acknowledge the hurt. That's step one.",
      "topics": ["action", "forgiveness", "practice"],
      "startTimeSeconds": 1654.2,
      "endTimeSeconds": 1720.0
    }
  ],
  "sessionDurationSeconds": 1800
}
```

---

## Environment Variables

```env
# Recap generation
RECAP_AUTO_GENERATE=true
RECAP_MIN_HIGHLIGHTS=5
RECAP_MAX_HIGHLIGHTS=15
RECAP_EXTRACTION_TEMPERATURE=0.2
```
