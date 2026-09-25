# F12 — Visual Generation

> AI-generated images from spoken content for improved comprehension and memory retention.

**Status:** Planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md) | [decisions.md](../decisions.md)
**Related:** [F16 — Live Session](live-session-display.md) | [C8 — Typed AI Responses](../core/typed-ai-responses.md)

---

## ⚠️ Key Decisions (Do Not Overwrite)

1. **Typed AI Responses** — Concept extraction and prompt engineering use typed response system. See [C8](../core/typed-ai-responses.md)
2. **Two-Stage Pipeline** — Concept extraction (GPT) → Image generation (DALL-E/Imagen)
3. **Selective Generation** — AI decides when to generate visuals (not every segment)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      VISUAL GENERATION PIPELINE                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   Transcript Segments (F1)                                               │
│        │                                                                 │
│        ▼                                                                 │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │  CONCEPT EXTRACTION (GPT-5.2-mini)                                │  │
│   │                                                                    │  │
│   │  Analyzes transcript for visualizable concepts:                   │  │
│   │  ├── Stories/parables ("A scientist discovering DNA structure")  │  │
│   │  ├── Metaphors ("The cell as a city")                            │  │
│   │  ├── Historical scenes ("Newton under the apple tree")           │  │
│   │  ├── Abstract concepts ("Energy flowing through a system")       │  │
│   │  └── Educational imagery ("Ecosystem cycles")                    │  │
│   │                                                                    │  │
│   │  Output: { shouldGenerate: boolean, concept: string, timing }    │  │
│   └────────────────────────────┬─────────────────────────────────────┘  │
│                                │                                         │
│                ┌───────────────┴───────────────┐                        │
│                │ shouldGenerate?                │                        │
│                ▼ YES                            ▼ NO                     │
│   ┌────────────────────────────┐   ┌───────────────────────────────┐   │
│   │  PROMPT ENGINEERING        │   │  Skip (no visual)              │   │
│   │  (GPT-5.2-mini)            │   └───────────────────────────────┘   │
│   │                            │                                        │
│   │  "Create a serene,         │                                        │
│   │   respectful illustration  │                                        │
│   │   depicting [concept]..."  │                                        │
│   │                            │                                        │
│   └────────────────────────────┘                                        │
│                │                                                         │
│                ▼                                                         │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │  IMAGE GENERATION (DALL-E 3 / Imagen 3)                          │  │
│   │                                                                    │  │
│   │  ┌───────────────────────────────────────────────────────────┐   │  │
│   │  │                                                             │   │  │
│   │  │      [Generated 1024x1024 Image]                           │   │  │
│   │  │                                                             │   │  │
│   │  │      "A cell interior with mitochondria producing          │   │  │
│   │  │       energy, proteins being assembled,                     │   │  │
│   │  │       soft scientific illustration style..."               │   │  │
│   │  │                                                             │   │  │
│   │  └───────────────────────────────────────────────────────────┘   │  │
│   │                                                                    │  │
│   │  → Upload to GCS                                                  │  │
│   │  → Store in GeneratedVisual entity                                │  │
│   │  → Broadcast via WebSocket subscription                           │  │
│   └──────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│                                                                          │
│   LIVE DISPLAY                                                           │
│   ═══════════════                                                        │
│                                                                          │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │  VisualPanel (alongside transcript)                               │  │
│   │                                                                    │  │
│   │  ┌─────────────────────────┐  ┌───────────────────────────────┐  │  │
│   │  │                         │  │ 💬 Transcript                  │  │  │
│   │  │  [Current Visual]       │  │                                │  │  │
│   │  │                         │  │ "The mitochondria is the      │  │  │
│   │  │  🖼️                     │  │  powerhouse of the cell..."   │  │  │
│   │  │                         │  │                                │  │  │
│   │  │  ⏱️ 05:23               │  │  ⏱️ 05:20 - 05:45             │  │  │
│   │  └─────────────────────────┘  └───────────────────────────────┘  │  │
│   │                                                                    │  │
│   │  📷 Gallery: 3 visuals generated this session                     │  │
│   └──────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Design Decisions

### When to Generate a Visual

| Trigger | Description | Example |
|---------|-------------|---------|
| **Story/Narrative** | Narrative illustration | "The hero returned home..." |
| **Source imagery** | Scene from referenced material | "The historical moment when..." |
| **Powerful metaphor** | Abstract concepts visualized | "Ideas spread like seeds" |
| **Topic shift** | Major transition moment | "Now let's turn to our next concept..." |
| **Host trigger** | Manual "generate visual" button | Host clicks during key moment |

### Generation Frequency

| Session Duration | Target Visuals | Rationale |
|------------------|----------------|-----------|
| < 15 min | 1-2 | One per major point |
| 15-30 min | 2-4 | Key moments |
| 30-60 min | 4-8 | Major topics |
| > 60 min | 8-12 | Cap for cost |

**Default:** ~1 visual per 7-10 minutes, max 12 per session.

### Alternatives Considered

| Approach | Description | Pros | Cons | Decision |
|----------|-------------|------|------|----------|
| **Always visible** | Large panel always shown | Engaging | Distracting from session | ❌ |
| **Thumbnail gallery** | Small panel, click to expand | Non-intrusive | May miss visuals | ✅ Chosen |
| **Full-screen moments** | Brief full-screen on generation | Impactful | Interrupts flow | ❌ |
| **Generate all at end** | Batch after session | Cheaper | No live engagement | ❌ |
| **Generate during live** | Real-time as concepts appear | Engaging | Higher latency sensitivity | ✅ Chosen |

### Image Generation Provider

| Provider | Model | Cost | Quality | Speed | Decision |
|----------|-------|------|---------|-------|----------|
| **OpenAI** | DALL-E 3 | $0.04/image | Excellent | 5-10s | ✅ Primary |
| **Google** | Imagen 3 | $0.02/image | Good | 3-6s | Fallback |
| **Stability** | SDXL | $0.006/image | Good | 2-4s | ❌ Less safety |

**Choice:** DALL-E 3 primary (best quality, strong safety), Imagen 3 fallback.

### Imagery Guidelines

| Guideline | Rationale |
|-----------|-----------|
| **Symbolic over literal** | Abstract representations enhance understanding |
| **Inclusive aesthetic** | Suitable for all viewers |
| **Serene, respectful tone** | Gentle, not dramatic or violent |
| **Age-appropriate** | Suitable for all ages |
| **Vertical-aware** | Religion: avoid deity faces; Education: academic; Professional: corporate |

---

## Data Model

### GeneratedVisual (from C6)
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| sessionId | UUID | FK → Session |
| segmentId | UUID? | FK → TranscriptSegment (can be null for manual) |
| imageUrl | string | GCS public URL |
| thumbnailUrl | string? | Smaller version for gallery |
| prompt | text | Full prompt used |
| concept | string | Extracted concept description |
| triggerType | enum | AUTO, MANUAL, TOPIC_CHANGE |
| generationTimeMs | int | How long generation took |
| modelUsed | string | e.g., "dall-e-3" |
| status | enum | GENERATING, READY, FAILED |
| generatedAt | datetime | |

### VisualTriggerType (enum)
```typescript
enum VisualTriggerType {
  AUTO = 'auto',              // AI-detected concept
  MANUAL = 'manual',          // Host triggered
  TOPIC_CHANGE = 'topic_change', // Major transition
}
```

---

## Project Structure

```
backend/
├── src/
│   └── modules/
│       └── visuals/
│           ├── visuals.module.ts
│           ├── visuals.resolver.ts
│           ├── visuals.service.ts
│           ├── entities/
│           │   └── generated-visual.entity.ts
│           ├── dto/
│           │   ├── generate-visual.dto.ts
│           │   └── get-visuals.dto.ts
│           ├── prompts/
│           │   ├── concept-extraction.prompt.ts
│           │   └── image-prompt.prompt.ts
│           └── services/
│               ├── concept-extractor.service.ts
│               └── image-generator.service.ts

frontend/
├── src/
│   ├── features/
│   │   └── visuals/
│   │       ├── components/
│   │       │   ├── VisualPanel.tsx           # Live session panel
│   │       │   ├── VisualGallery.tsx         # Thumbnail grid
│   │       │   ├── VisualCard.tsx            # Single visual display
│   │       │   ├── VisualLightbox.tsx        # Full-screen view
│   │       │   ├── GenerateVisualButton.tsx  # Host manual trigger
│   │       │   └── VisualLoading.tsx         # Shimmer placeholder
│   │       ├── hooks/
│   │       │   ├── useSessionVisuals.ts
│   │       │   ├── useVisualSubscription.ts
│   │       │   └── useGenerateVisual.ts
│   │       └── context/
│   │           └── VisualContext.tsx
```

---

## API Surface

### Queries

```graphql
type Query {
  # Get all visuals for a session
  sessionVisuals(
    sessionId: ID!
    status: VisualStatus
  ): [GeneratedVisual!]!
  
  # Get single visual
  visual(id: ID!): GeneratedVisual
  
  # Get visual generation stats for a session
  visualStats(sessionId: ID!): VisualStats!
}

type GeneratedVisual {
  id: ID!
  session: Session!
  segment: TranscriptSegment
  imageUrl: String!
  thumbnailUrl: String
  prompt: String!
  concept: String!
  triggerType: VisualTriggerType!
  generationTimeMs: Int!
  status: VisualStatus!
  generatedAt: DateTime!
}

type VisualStats {
  totalGenerated: Int!
  byTriggerType: TriggerTypeBreakdown!
  averageGenerationTime: Float!
  totalCost: Float!
}

enum VisualTriggerType {
  AUTO
  MANUAL
  TOPIC_CHANGE
}

enum VisualStatus {
  GENERATING
  READY
  FAILED
}
```

### Mutations

```graphql
type Mutation {
  # Host manually triggers visual generation
  generateVisual(input: GenerateVisualInput!): GeneratedVisual!
  
  # Regenerate a failed or unsatisfactory visual
  regenerateVisual(id: ID!): GeneratedVisual!
  
  # Delete a visual
  deleteVisual(id: ID!): Boolean!
}

input GenerateVisualInput {
  sessionId: ID!
  segmentId: ID         # Optional: link to specific segment
  concept: String       # Optional: override auto-extracted concept
}
```

### Subscriptions

```graphql
type Subscription {
  # Real-time notification when a visual is ready
  onVisualReady(sessionId: ID!): GeneratedVisual!
  
  # Visual generation started (show loading state)
  onVisualGenerating(sessionId: ID!): GeneratedVisual!
}
```

---

## Concept Extraction & Prompt Engineering

### Concept Extraction Service

```typescript
// concept-extractor.service.ts
@Injectable()
export class ConceptExtractorService {
  constructor(private aiService: AIService) {}

  async analyzeForVisual(
    recentSegments: TranscriptSegment[],
    sessionContext: SessionContext,
  ): Promise<ConceptExtractionResult> {
    // Get last ~2 minutes of transcript
    const transcript = recentSegments.map(s => s.text).join(' ');
    
    const prompt = buildConceptExtractionPrompt(transcript, sessionContext);
    
    const result = await this.aiService.generateText(prompt, {
      taskType: 'concept-extraction',
      model: 'gpt-5.2-mini',  // Fast + cheap for extraction
      maxTokens: 200,
      temperature: 0.2,
      responseFormat: 'json',
    });
    
    return JSON.parse(result.text);
  }
}

interface ConceptExtractionResult {
  shouldGenerate: boolean;
  concept: string | null;
  confidence: number;
  visualType: 'scene' | 'symbol' | 'abstract' | 'nature';
  elements: string[];  // Key elements to include
}
```

### Concept Extraction Prompt

```typescript
// prompts/concept-extraction.prompt.ts
export function buildConceptExtractionPrompt(
  transcript: string,
  context: SessionContext,
  verticalConfig: VerticalConfig,
): string {
  // Vertical-specific extraction guidance:
  // - RELIGION: "religious sermons", "Scripture with vivid imagery"
  // - EDUCATION: "educational lectures", "diagrams and processes"
  // - PROFESSIONAL: "presentations", "data and workflows"
  const { contentType, sourceDescription } = verticalConfig.prompts.visual;

  return `
You are an expert at identifying visual concepts in ${contentType}.

RECENT TRANSCRIPT (~2 minutes):
"${transcript}"

CONTEXT:
- Vertical: ${context.verticalType || 'general'}
- Time since last visual: ${context.minutesSinceLastVisual} minutes

TASK:
Determine if a visual should be generated for enhanced comprehension.

GENERATE VISUAL FOR:
✅ Stories or narratives being told
✅ ${sourceDescription} with vivid imagery
✅ Powerful metaphors or analogies
✅ Major topic transitions
✅ Key teaching moments

DO NOT GENERATE FOR:
❌ Abstract discussion without visual elements
❌ Administrative announcements
❌ Similar concept to recent visual
❌ Less than 5 minutes since last visual (unless very strong)

RESPOND WITH JSON:
{
  "shouldGenerate": true/false,
  "concept": "A cell diagram showing energy production in the mitochondria" | null,
  "confidence": 0.0-1.0,
  "visualType": "scene" | "symbol" | "abstract" | "nature",
  "elements": ["cell", "mitochondria", "energy", "ATP"]
}

VISUAL TYPE GUIDE:
- scene: Narrative illustration with characters/action
- symbol: Meaningful symbols (icons, representations)
- abstract: Concepts visualized (growth, connection, flow)
- nature: Natural imagery (river, mountain, garden)
`.trim();
}
```

### Image Prompt Builder

```typescript
// prompts/image-prompt.prompt.ts
export function buildImagePrompt(
  concept: string,
  visualType: string,
  verticalConfig: VerticalConfig,
): string {
  // Vertical-specific style:
  // - RELIGION: "Serene, respectful, inclusive religious art" + deity restrictions
  // - EDUCATION: "Clean, academic, diagram-friendly illustration"
  // - PROFESSIONAL: "Modern, corporate, clean business aesthetic"
  const { styleGuidelines, restrictions } = verticalConfig.prompts.visual;
  
  return `
Create a beautiful, serene illustration depicting:

${concept}

Visual type: ${visualType}

${styleGuidelines}

${restrictions || ''}
  `.trim();
}
```

### Image Generation Service

```typescript
// image-generator.service.ts
@Injectable()
export class ImageGeneratorService {
  constructor(
    private aiService: AIService,
    private storageService: StorageService,
    @InjectRepository(GeneratedVisual)
    private visualRepo: Repository<GeneratedVisual>,
    private pubSub: PubSub,
  ) {}

  async generateVisual(input: GenerateVisualInput): Promise<GeneratedVisual> {
    const { sessionId, segmentId, concept: overrideConcept } = input;
    
    // Get session context
    const session = await this.sessionService.getSession(sessionId);
    const recentSegments = await this.transcriptService.getRecentSegments(sessionId, 120); // Last 2 min
    
    // Extract concept if not provided
    let concept = overrideConcept;
    let visualType = 'scene';
    
    if (!concept) {
      const extraction = await this.conceptExtractor.analyzeForVisual(recentSegments, {
        verticalType: session.organization.verticalType,
        minutesSinceLastVisual: await this.getMinutesSinceLastVisual(sessionId),
      }, this.verticalConfigService.getConfig(session.organization.verticalType));
      
      if (!extraction.shouldGenerate) {
        throw new BadRequestException('No visualizable concept detected');
      }
      
      concept = extraction.concept;
      visualType = extraction.visualType;
    }
    
    // Create record with GENERATING status
    const visual = this.visualRepo.create({
      sessionId,
      segmentId,
      concept,
      triggerType: overrideConcept ? 'MANUAL' : 'AUTO',
      status: 'GENERATING',
      prompt: '', // Will be set after prompt generation
    });
    const savedVisual = await this.visualRepo.save(visual);
    
    // Notify clients generation started
    this.pubSub.publish('onVisualGenerating', {
      onVisualGenerating: savedVisual,
      sessionId,
    });
    
    // Build image prompt
    const verticalConfig = this.verticalConfigService.getConfig(session.organization.verticalType);
    const imagePrompt = buildImagePrompt(
      concept,
      visualType,
      verticalConfig,
    );
    
    // Generate image
    const start = Date.now();
    try {
      const result = await this.aiService.generateImage(imagePrompt, {
        size: '1024x1024',
        quality: 'standard',
        style: 'natural',
      });
      
      // Upload to GCS
      const imageUrl = await this.storageService.uploadFromUrl(
        result.url,
        `visuals/${sessionId}/${savedVisual.id}.png`,
      );
      
      // Generate thumbnail
      const thumbnailUrl = await this.storageService.generateThumbnail(
        imageUrl,
        256,
      );
      
      // Update record
      savedVisual.imageUrl = imageUrl;
      savedVisual.thumbnailUrl = thumbnailUrl;
      savedVisual.prompt = imagePrompt;
      savedVisual.status = 'READY';
      savedVisual.generationTimeMs = Date.now() - start;
      savedVisual.modelUsed = result.provider === 'openai' ? 'dall-e-3' : 'imagen-3';
      
      await this.visualRepo.save(savedVisual);
      
      // Notify clients visual is ready
      this.pubSub.publish('onVisualReady', {
        onVisualReady: savedVisual,
        sessionId,
      });
      
      return savedVisual;
    } catch (error) {
      savedVisual.status = 'FAILED';
      await this.visualRepo.save(savedVisual);
      throw error;
    }
  }
}
```

---

## Auto-Generation Logic

```typescript
// visual-auto-generator.service.ts
@Injectable()
export class VisualAutoGeneratorService {
  private sessionTimers = new Map<string, NodeJS.Timer>();
  
  @OnEvent('session.started')
  handleSessionStarted(event: SessionStartedEvent) {
    const { sessionId } = event;
    
    // Check if room has visuals enabled
    const room = await this.roomService.getRoom(event.roomId);
    if (!room.visualsEnabled) return;
    
    // Start periodic check (every 30 seconds)
    const timer = setInterval(async () => {
      await this.checkForVisualTrigger(sessionId);
    }, 30000);
    
    this.sessionTimers.set(sessionId, timer);
  }
  
  @OnEvent('session.ended')
  handleSessionEnded(event: SessionEndedEvent) {
    const timer = this.sessionTimers.get(event.sessionId);
    if (timer) {
      clearInterval(timer);
      this.sessionTimers.delete(event.sessionId);
    }
  }
  
  private async checkForVisualTrigger(sessionId: string): Promise<void> {
    // Get session stats
    const stats = await this.visualService.getVisualStats(sessionId);
    const session = await this.sessionService.getSession(sessionId);
    
    // Check caps
    if (stats.totalGenerated >= 12) return; // Max 12 per session
    
    const minutesSinceStart = (Date.now() - session.startedAt.getTime()) / 60000;
    const expectedVisuals = Math.floor(minutesSinceStart / 8); // ~1 per 8 min
    
    if (stats.totalGenerated >= expectedVisuals + 1) {
      return; // Already ahead of schedule
    }
    
    // Check for concept
    const recentSegments = await this.transcriptService.getRecentSegments(sessionId, 120);
    const extraction = await this.conceptExtractor.analyzeForVisual(recentSegments, {
      minutesSinceLastVisual: stats.minutesSinceLastVisual,
    });
    
    if (extraction.shouldGenerate && extraction.confidence > 0.7) {
      try {
        await this.imageGenerator.generateVisual({ sessionId });
      } catch (error) {
        this.logger.error('Auto visual generation failed', error);
      }
    }
  }
}
```

---

## Frontend Components

### VisualPanel (Live Session)

```typescript
// components/VisualPanel.tsx
export function VisualPanel({ sessionId }: { sessionId: string }) {
  const { visuals, isLoading } = useSessionVisuals(sessionId);
  const currentVisual = visuals.find(v => v.status === 'READY')?.slice(-1)[0];
  const generatingVisual = visuals.find(v => v.status === 'GENERATING');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedVisual, setSelectedVisual] = useState<GeneratedVisual | null>(null);
  
  // Subscribe to real-time updates
  useVisualSubscription(sessionId);

  return (
    <Box sx={{ width: 300, borderLeft: 1, borderColor: 'divider', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Visual Moments
      </Typography>
      
      {/* Current/Loading Visual */}
      <Box sx={{ mb: 2, position: 'relative' }}>
        {generatingVisual && (
          <Box sx={{ position: 'absolute', inset: 0, zIndex: 1 }}>
            <VisualLoading concept={generatingVisual.concept} />
          </Box>
        )}
        
        {currentVisual && (
          <Card
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setSelectedVisual(currentVisual);
              setLightboxOpen(true);
            }}
          >
            <CardMedia
              component="img"
              image={currentVisual.imageUrl}
              alt={currentVisual.concept}
              sx={{ aspectRatio: '1/1' }}
            />
            <CardContent sx={{ py: 1 }}>
              <Typography variant="caption" noWrap>
                {currentVisual.concept}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>
      
      {/* Gallery */}
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Gallery ({visuals.filter(v => v.status === 'READY').length})
      </Typography>
      <VisualGallery
        visuals={visuals.filter(v => v.status === 'READY')}
        onSelect={(v) => {
          setSelectedVisual(v);
          setLightboxOpen(true);
        }}
      />
      
      {/* Lightbox */}
      <VisualLightbox
        open={lightboxOpen}
        visual={selectedVisual}
        onClose={() => setLightboxOpen(false)}
      />
    </Box>
  );
}
```

### VisualGallery

```typescript
// components/VisualGallery.tsx
export function VisualGallery({ visuals, onSelect }: Props) {
  return (
    <Grid container spacing={1}>
      {visuals.map((visual) => (
        <Grid item xs={4} key={visual.id}>
          <Box
            component="img"
            src={visual.thumbnailUrl || visual.imageUrl}
            alt={visual.concept}
            onClick={() => onSelect(visual)}
            sx={{
              width: '100%',
              aspectRatio: '1/1',
              objectFit: 'cover',
              borderRadius: 1,
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8,
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s',
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
}
```

### GenerateVisualButton (Host Control)

```typescript
// components/GenerateVisualButton.tsx
export function GenerateVisualButton({ sessionId }: { sessionId: string }) {
  const [generateVisual, { loading }] = useGenerateVisual();
  const [concept, setConcept] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleQuickGenerate = async () => {
    await generateVisual({ sessionId });
  };

  const handleCustomGenerate = async () => {
    await generateVisual({ sessionId, concept });
    setDialogOpen(false);
    setConcept('');
  };

  return (
    <>
      <ButtonGroup variant="outlined">
        <Button
          startIcon={<ImageIcon />}
          onClick={handleQuickGenerate}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Visual'}
        </Button>
        <Button onClick={() => setDialogOpen(true)}>
          <MoreVertIcon />
        </Button>
      </ButtonGroup>
      
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Custom Visual</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Describe the visual"
            placeholder="A peaceful garden with flowing water..."
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            multiline
            rows={2}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCustomGenerate}
            disabled={loading || !concept.trim()}
          >
            Generate
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
```

### VisualLoading

```typescript
// components/VisualLoading.tsx
export function VisualLoading({ concept }: { concept: string }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'grey.100',
        }}
      >
        <CircularProgress size={40} sx={{ mb: 2 }} />
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Creating visual...
        </Typography>
        <Typography variant="caption" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
          {concept}
        </Typography>
      </CardContent>
    </Card>
  );
}
```

---

## Access Control

| Role | View Visuals | Generate (Manual) | Auto-Generation |
|------|--------------|-------------------|-----------------|
| Guest | ✓ | ❌ | N/A |
| Member | ✓ | ❌ | N/A |
| **Host** | ✓ | ✓ | ✓ (room setting) |
| **Org Admin** | ✓ | ✓ | ✓ |
| Individual Pro | ✓ | ✓ | ✓ |

**Feature availability:** Pro tier / Organization only (per pricing-analysis.md)

---

## Cost Analysis

| Component | Cost | Notes |
|-----------|------|-------|
| **Concept extraction** | $0.0003 | GPT-5.2-mini: ~200 tokens |
| **Prompt generation** | $0.0001 | GPT-5.2-mini: ~100 tokens |
| **Image generation** | $0.04 | DALL-E 3 standard |
| **Storage** | ~$0.001/image/mo | GCS standard |

**Per visual:** ~$0.04
**Per session (8 visuals avg):** ~$0.32
**Monthly at scale:** 100 orgs × 30 sessions × $0.32 = **$960/month**

---

## Dependencies

| Dependency | Direction | Notes |
|------------|-----------|-------|
| **C5 (AI Provider)** | ← uses | GPT-5.2-mini (extraction), DALL-E 3 (generation) |
| **F1 (Audio-to-Text)** | ← uses | TranscriptSegment for context |
| **C2 (Realtime)** | ← uses | WebSocket subscriptions |
| **GCS Storage** | ← uses | Image hosting |

---

## Acceptance Criteria

### MVP (Phase 1)
- [ ] Auto-generate visuals during live sessions (~1 per 8 min)
- [ ] Host can manually trigger visual generation
- [ ] Visual panel displays latest image alongside transcript
- [ ] Gallery of all visuals in session
- [ ] Real-time WebSocket updates for generating/ready states
- [ ] Lightbox for full-screen viewing
- [ ] Max 12 visuals per session (cost cap)

### Phase 2
- [ ] Download visuals (PNG)
- [ ] Share individual visuals (social media optimized)
- [ ] Custom style preferences per room
- [ ] Visual archive (searchable across sessions)
- [ ] Saved visuals collection (like saved highlights)

---

## Response Types (Draft)

> These types define the AI response structure for the two-stage visual pipeline. See [C8 — Typed AI Responses](../core/typed-ai-responses.md) for the full pattern.

### Stage 1: ConceptExtractionResponseData

```typescript
// libs/4eye-types/ai/visuals/ConceptExtractionResponse.ts

/**
 * AI-generated concept extraction response.
 * 
 * Analyze transcript segments for visualizable concepts.
 * Generate visuals for:
 * - Stories and narratives (parables, examples)
 * - Powerful metaphors and symbols
 * - Referenced scenes (historical, scriptural)
 * - Abstract concepts with visual potential
 * - Major topic transitions
 * 
 * SKIP generation for:
 * - Administrative announcements
 * - Lists of names or dates
 * - Already-visualized concepts
 * - Segments too brief for meaningful content
 * 
 * Target ~1 visual per 7-10 minutes, max 12 per session.
 * 
 * @interface ConceptExtractionResponseData
 */
export interface ConceptExtractionResponseData {
  /**
   * Whether this segment warrants visual generation.
   * 
   * @example true
   * @example false
   */
  shouldGenerate: boolean;

  /**
   * The visualizable concept extracted.
   * Clear, concise description of what to depict.
   * Required when shouldGenerate is true.
   * 
   * @example "A diagram showing water cycle with evaporation and precipitation"
   * @example "A scientist discovering the structure of DNA"
   */
  concept: string;

  /**
   * Why this concept is worth visualizing.
   * Used for logging and debugging.
   * 
   * @example "Core metaphor of the teaching, highly visual imagery"
   * @example "Narrative climax of the story"
   */
  reason: string;

  /**
   * Confidence score for this extraction (0-1).
   * Used for threshold filtering.
   * 
   * @example 0.85
   */
  confidence: number;
}
```

### Stage 2: ImagePromptResponseData

```typescript
// libs/4eye-types/ai/visuals/ImagePromptResponse.ts

/**
 * AI-generated image prompt response.
 * 
 * Transform extracted concept into an optimized image generation prompt.
 * 
 * Guidelines:
 * - Use symbolic/abstract over literal depictions
 * - Serene, respectful, gentle tone
 * - Inclusive aesthetic suitable for all viewers
 * - Age-appropriate (all ages)
 * - For religious content: avoid deity faces, use light/symbols
 * 
 * @interface ImagePromptResponseData
 */
export interface ImagePromptResponseData {
  /**
   * The full prompt for image generation.
   * Optimized for DALL-E 3 / Imagen 3.
   * Should include style, mood, composition.
   * 
   * @example "A detailed scientific illustration showing a cross-section of a cell with labeled organelles. Soft educational illustration style, clear colors, glowing mitochondria producing ATP energy."
   */
  prompt: string;

  /**
   * Visual style to apply.
   * 
   * @example "watercolor"
   * @example "soft illustration"
   * @example "gentle photorealism"
   */
  style: string;

  /**
   * Negative prompt (what to avoid).
   * Important for safety and appropriateness.
   * 
   * @example "violence, blood, scary, disturbing, deity faces, religious figures, graphic content"
   */
  negativePrompt: string;

  /**
   * Aspect ratio recommendation.
   * 
   * @example "1:1"
   * @example "16:9"
   */
  aspectRatio: '1:1' | '16:9' | '9:16';
}
```

### Zod Schemas

```typescript
// libs/4eye-types/ai/visuals/ConceptExtractionResponse.schema.ts

import { z } from 'zod';

export const ConceptExtractionResponseDataSchema = z.object({
  shouldGenerate: z.boolean(),
  concept: z.string().max(500),
  reason: z.string().max(300),
  confidence: z.number().min(0).max(1),
});

export type ConceptExtractionResponseData = z.infer<typeof ConceptExtractionResponseDataSchema>;
```

```typescript
// libs/4eye-types/ai/visuals/ImagePromptResponse.schema.ts

import { z } from 'zod';

export const ImagePromptResponseDataSchema = z.object({
  prompt: z.string().min(20).max(1000),
  style: z.string().max(100),
  negativePrompt: z.string().max(500),
  aspectRatio: z.enum(['1:1', '16:9', '9:16']),
});

export type ImagePromptResponseData = z.infer<typeof ImagePromptResponseDataSchema>;
```

### Example Responses

**Concept Extraction (should generate):**
```json
{
  "shouldGenerate": true,
  "concept": "A diagram showing energy production in cellular mitochondria",
  "reason": "Core concept of the lecture with complex process visualization",
  "confidence": 0.92
}
```

**Concept Extraction (skip):**
```json
{
  "shouldGenerate": false,
  "concept": "",
  "reason": "Administrative announcements, no visualizable content",
  "confidence": 0.15
}
```

**Image Prompt:**
```json
{
  "prompt": "A detailed scientific illustration showing cellular respiration inside a mitochondrion. Energy molecules (ATP) glowing, electron transport chain visible, soft educational illustration style, clear labeling, blue and green color scheme, cross-section view.",
  "style": "scientific illustration",
  "negativePrompt": "violence, blood, scary, disturbing, cartoon, unprofessional, dark atmosphere",
  "aspectRatio": "16:9"
}
```

---

## Environment Variables

```env
# Visual Generation
VISUALS_ENABLED=true
VISUALS_AUTO_GENERATE=true
VISUALS_MAX_PER_SESSION=12
VISUALS_MIN_INTERVAL_MINUTES=5
VISUALS_GENERATION_CONFIDENCE=0.7

# Image Provider
IMAGE_PROVIDER=openai
IMAGE_SIZE=1024x1024
IMAGE_QUALITY=standard
IMAGE_STYLE=natural

# Storage
VISUALS_GCS_BUCKET=4eye-visuals
```
