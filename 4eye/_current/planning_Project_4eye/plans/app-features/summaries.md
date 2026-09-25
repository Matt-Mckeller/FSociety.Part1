# F6 — Summaries

> AI-generated session summaries from transcript content, adapted for language and reading level.

**Status:** Planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md) | [decisions.md](../decisions.md)
**Related:** [F7 — Recaps](recaps.md) | [F16 — Live Session](live-session-display.md) | [C8 — Typed AI Responses](../core/typed-ai-responses.md)

---

## ⚠️ Key Decisions (Do Not Overwrite)

1. **Typed AI Responses** — Summary generation uses typed response system. See [C8](../core/typed-ai-responses.md)
2. **Hybrid Generation** — Auto-generate default, allow customization
3. **Variant Strategy** — Translate summary (not re-summarize) for language variants

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         SUMMARY GENERATION PIPELINE                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   Session Ends                                                           │
│        │                                                                 │
│        ▼                                                                 │
│   ┌──────────────────┐                                                   │
│   │  Transcript Data │  Full text from TranscriptSegments               │
│   │  (~4,000 tokens) │                                                   │
│   └────────┬─────────┘                                                   │
│            │                                                             │
│            ▼                                                             │
│   ┌──────────────────┐    ┌────────────────────────────────────────┐    │
│   │  Summary Service │───▶│  AI Provider (C5)                      │    │
│   │                  │    │  Primary: GPT-5.2 | Fallback: Claude   │    │
│   └────────┬─────────┘    └────────────────────────────────────────┘    │
│            │                                                             │
│            ▼                                                             │
│   ┌──────────────────┐                                                   │
│   │  Summary Entity  │  Stored: language, readingLevel, content         │
│   │  (~500 tokens)   │                                                   │
│   └──────────────────┘                                                   │
│            │                                                             │
│            ▼                                                             │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │                    VARIANT GENERATION (on-demand)                 │  │
│   │                                                                    │  │
│   │   Source Summary ──┬──▶ Translate to Spanish (STANDARD)           │  │
│   │   (EN, STANDARD)   ├──▶ Translate to Korean (CHILD)               │  │
│   │                    └──▶ Adapt to ACADEMIC reading level           │  │
│   │                                                                    │  │
│   └──────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Design Decisions

### Key Choices

| Decision | Choice | Alternatives Considered | Rationale |
|----------|--------|-------------------------|-----------|
| Generation trigger | **Hybrid** (auto + on-demand) | Auto-only, on-demand only | Auto-generate default; allow customization |
| Source for variants | **Translate summary** (not re-summarize) | Re-summarize in each language | 10x cheaper, consistent meaning |
| Storage strategy | **Cache all generated** | Generate on-demand, no cache | Avoid redundant API calls |
| Model selection | **GPT-5.2** | Claude 4.5 Opus, Gemini 2 Pro | Best quality for prose summaries |
| Summary length | **~200-400 words** | Fixed length, variable | Proportional to session length |

### Summary vs Recap Distinction

| Aspect | Summary (F6) | Recap (F7) |
|--------|--------------|------------|
| **Format** | Prose narrative | Structured highlights |
| **Purpose** | "What was discussed" | "Key moments to revisit" |
| **Output** | Single text block | List of timestamped items |
| **Use case** | Quick overview | Jump to specific points |
| **Tokens** | ~500 output | ~1,000 output |
| **Cost** | $0.009/session | $0.012/session |

### Reading Level Adaptation

| Level | Target Audience | Vocabulary | Sentence Structure |
|-------|-----------------|------------|-------------------|
| **CHILD** | Ages 8-12 | Simple, common words | Short sentences, active voice |
| **STANDARD** | General adult | Clear, accessible | Mixed complexity |
| **ACADEMIC** | Experts, specialists | Technical terms, citations | Complex, formal |

---

## Project Structure

```
backend/
├── src/
│   └── modules/
│       └── summaries/
│           ├── summaries.module.ts
│           ├── summaries.resolver.ts
│           ├── summaries.service.ts
│           ├── entities/
│           │   └── summary.entity.ts
│           ├── dto/
│           │   ├── generate-summary.dto.ts
│           │   └── get-summary.dto.ts
│           └── prompts/
│               ├── summary.prompt.ts         # Base summary prompt
│               └── reading-level.prompt.ts   # Adaptation prompts

frontend/
├── src/
│   ├── features/
│   │   └── summaries/
│   │       ├── components/
│   │       │   ├── SummaryView.tsx           # Full summary display
│   │       │   ├── SummaryCard.tsx           # Compact preview
│   │       │   ├── SummaryOptions.tsx        # Language/level selector
│   │       │   └── SummaryLoading.tsx        # Generation skeleton
│   │       ├── hooks/
│   │       │   ├── useSummary.ts             # Fetch/generate summary
│   │       │   └── useSummaryVariant.ts      # Get translated/adapted
│   │       └── context/
│   │           └── SummaryContext.tsx
```

---

## Data Model (from C6)

### Summary
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| sessionId | UUID | FK → Session |
| language | string | ISO 639-1 (e.g., "en", "es") |
| readingLevel | enum | CHILD, STANDARD, ACADEMIC |
| content | text | Generated summary (~200-400 words) |
| tokenCount | int | Tokens used for generation |
| modelUsed | string | e.g., "gpt-5.2" |
| generatedAt | datetime | When created |
| isAutoGenerated | boolean | True if auto-generated post-session |

### Composite Key Strategy

A session can have multiple summaries (different language/level combinations):

```
Session "abc-123"
├── Summary (EN, STANDARD) ← auto-generated
├── Summary (EN, CHILD)    ← on-demand
├── Summary (ES, STANDARD) ← on-demand
└── Summary (KO, ACADEMIC) ← on-demand
```

**Unique constraint:** `(sessionId, language, readingLevel)`

---

## API Surface

### Mutations

```graphql
type Mutation {
  # Generate (or regenerate) summary for a session
  # Returns existing if already generated (unless force=true)
  generateSummary(input: GenerateSummaryInput!): Summary!
  
  # Delete a summary (admin only)
  deleteSummary(id: ID!): Boolean!
}

input GenerateSummaryInput {
  sessionId: ID!
  language: String      # ISO 639-1, defaults to session.sourceLanguage
  readingLevel: ReadingLevel  # Defaults to STANDARD
  force: Boolean        # Regenerate even if exists
}

enum ReadingLevel {
  CHILD
  STANDARD
  ACADEMIC
}
```

### Queries

```graphql
type Query {
  # Get summary for a session (specific language/level)
  summary(
    sessionId: ID!
    language: String
    readingLevel: ReadingLevel
  ): Summary
  
  # Get all summaries for a session (all variants)
  sessionSummaries(sessionId: ID!): [Summary!]!
  
  # Check if summary exists (without fetching content)
  summaryExists(
    sessionId: ID!
    language: String!
    readingLevel: ReadingLevel!
  ): Boolean!
}

type Summary {
  id: ID!
  sessionId: ID!
  session: Session!
  language: String!
  readingLevel: ReadingLevel!
  content: String!
  tokenCount: Int!
  modelUsed: String!
  generatedAt: DateTime!
  isAutoGenerated: Boolean!
}
```

---

## Summary Generation Flow

### 1. Auto-Generation (Post-Session)

```typescript
// Triggered when session status changes to COMPLETED
@OnEvent('session.completed')
async handleSessionCompleted(event: SessionCompletedEvent) {
  const { sessionId } = event;
  
  // Check if Pro tier or Org plan (summaries are premium feature)
  const hasAccess = await this.planService.hasFeature(sessionId, 'summaries');
  if (!hasAccess) return;
  
  // Generate default summary (source language, STANDARD level)
  const session = await this.sessionService.findOne(sessionId);
  await this.summaryService.generateSummary({
    sessionId,
    language: session.sourceLanguage,
    readingLevel: ReadingLevel.STANDARD,
    isAutoGenerated: true,
  });
}
```

### 2. On-Demand Generation

```typescript
// summaries.service.ts
@Injectable()
export class SummariesService {
  constructor(
    @InjectRepository(Summary)
    private summaryRepo: Repository<Summary>,
    private transcriptService: TranscriptService,
    private aiService: AIService,
  ) {}

  async generateSummary(input: GenerateSummaryInput): Promise<Summary> {
    const { sessionId, language, readingLevel, force } = input;
    
    // Check for existing
    if (!force) {
      const existing = await this.findOne(sessionId, language, readingLevel);
      if (existing) return existing;
    }
    
    // Get transcript text
    const transcript = await this.transcriptService.getFullText(sessionId);
    if (!transcript || transcript.length < 100) {
      throw new BadRequestException('Insufficient transcript content');
    }
    
    // Determine generation strategy
    const session = await this.sessionService.findOne(sessionId);
    const isSourceLanguage = language === session.sourceLanguage;
    
    let summaryContent: string;
    let tokensUsed: number;
    let modelUsed: string;
    
    if (isSourceLanguage) {
      // Generate directly from transcript
      const result = await this.generateFromTranscript(transcript, readingLevel);
      summaryContent = result.text;
      tokensUsed = result.tokensUsed;
      modelUsed = result.provider;
    } else {
      // Translate existing summary (cheaper than re-summarizing)
      const sourceSummary = await this.getOrGenerateSource(sessionId, session.sourceLanguage);
      const result = await this.translateSummary(sourceSummary.content, language, readingLevel);
      summaryContent = result.text;
      tokensUsed = result.tokensUsed;
      modelUsed = result.provider;
    }
    
    // Save and return
    const summary = this.summaryRepo.create({
      sessionId,
      language,
      readingLevel,
      content: summaryContent,
      tokenCount: tokensUsed,
      modelUsed,
      isAutoGenerated: false,
    });
    
    return this.summaryRepo.save(summary);
  }
  
  private async generateFromTranscript(
    transcript: string,
    readingLevel: ReadingLevel,
  ): Promise<TextGenerationResult> {
    const prompt = this.buildSummaryPrompt(transcript, readingLevel);
    
    return this.aiService.generateText(prompt, {
      taskType: 'summary',  // Routes to GPT-5.2
      maxTokens: 600,
      temperature: 0.3,     // Lower = more consistent
    });
  }
}
```

### 3. Prompt Engineering

```typescript
// prompts/summary.prompt.ts
export function buildSummaryPrompt(
  transcript: string,
  readingLevel: ReadingLevel,
  verticalConfig: VerticalConfig,
  sessionTitle?: string,
): string {
  const levelInstructions = {
    CHILD: `
      Write for children ages 8-12.
      - Use simple, everyday words
      - Keep sentences short (under 15 words)
      - Avoid jargon; explain concepts simply
      - Use active voice
      - Be encouraging and warm in tone
    `,
    STANDARD: `
      Write for a general adult audience.
      - Use clear, accessible language
      - Balance detail with readability
      - Include key references naturally
      - Maintain a respectful, engaging tone
    `,
    ACADEMIC: `
      Write for experts and professionals.
      - Use precise domain terminology
      - Include direct citations where applicable
      - Reference relevant concepts and frameworks
      - Maintain formal, analytical tone
      - Connect to broader scholarship
    `,
  };

  // Vertical-specific prompts (from verticalConfig)
  // Examples:
  // - RELIGION: "religious sermons and teachings", "Scripture References"
  // - EDUCATION: "educational lectures and lessons", "Key Concepts"
  // - PROFESSIONAL: "meetings and presentations", "Action Items"
  const { summaryExpertise, referenceLabel } = verticalConfig.prompts.summary;

  return `
You are an expert at summarizing ${summaryExpertise}.

${sessionTitle ? `Session: "${sessionTitle}"` : ''}

TRANSCRIPT:
${transcript}

INSTRUCTIONS:
Create a comprehensive summary of this session.
${levelInstructions[readingLevel]}

Structure your summary as follows:
1. Opening (1-2 sentences): The main theme or message
2. Key Points (3-5 bullet points): Core concepts discussed
3. ${referenceLabel}: Key references mentioned
4. Closing (1-2 sentences): The call to action or takeaway

Keep the total summary between 200-400 words.
Write in flowing prose (not bullet points) except for Key Points section.
`.trim();
}
```

---

## Frontend Components

### SummaryView

```typescript
// components/SummaryView.tsx
export function SummaryView({ sessionId }: Props) {
  const { user } = useAuth();
  const [language, setLanguage] = useState(user?.preferredLanguage || 'en');
  const [readingLevel, setReadingLevel] = useState<ReadingLevel>(
    user?.readingLevel || ReadingLevel.STANDARD
  );
  
  const { summary, isLoading, generate } = useSummary(sessionId, language, readingLevel);
  
  // Auto-generate if not exists
  useEffect(() => {
    if (!summary && !isLoading) {
      generate();
    }
  }, [sessionId, language, readingLevel]);

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Summary</Typography>
        <SummaryOptions
          language={language}
          readingLevel={readingLevel}
          onLanguageChange={setLanguage}
          onReadingLevelChange={setReadingLevel}
        />
      </Box>
      
      {isLoading ? (
        <SummaryLoading />
      ) : summary ? (
        <>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {summary.content}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
            Generated {formatRelativeTime(summary.generatedAt)} using {summary.modelUsed}
          </Typography>
        </>
      ) : (
        <Alert severity="info">
          No summary available. Click generate to create one.
        </Alert>
      )}
    </Paper>
  );
}
```

### SummaryCard (Compact)

```typescript
// components/SummaryCard.tsx
export function SummaryCard({ sessionId, maxLength = 200 }: Props) {
  const { user } = useAuth();
  const { summary } = useSummary(
    sessionId,
    user?.preferredLanguage || 'en',
    user?.readingLevel || ReadingLevel.STANDARD
  );

  if (!summary) return null;

  const truncated = summary.content.length > maxLength
    ? summary.content.slice(0, maxLength) + '...'
    : summary.content;

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          Summary
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {truncated}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/sessions/${sessionId}/summary`}>
          Read Full Summary
        </Button>
      </CardActions>
    </Card>
  );
}
```

### SummaryOptions (Language/Level Selector)

```typescript
// components/SummaryOptions.tsx
export function SummaryOptions({
  language,
  readingLevel,
  onLanguageChange,
  onReadingLevelChange,
}: Props) {
  const { supportedLanguages } = useAppConfig();

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Language</InputLabel>
        <Select
          value={language}
          label="Language"
          onChange={(e) => onLanguageChange(e.target.value)}
        >
          {supportedLanguages.map((lang) => (
            <MenuItem key={lang.code} value={lang.code}>
              {lang.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Reading Level</InputLabel>
        <Select
          value={readingLevel}
          label="Reading Level"
          onChange={(e) => onReadingLevelChange(e.target.value as ReadingLevel)}
        >
          <MenuItem value="CHILD">Child (8-12)</MenuItem>
          <MenuItem value="STANDARD">Standard</MenuItem>
          <MenuItem value="ACADEMIC">Academic</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
```

---

## Access Control

| Role | View | Generate | Regenerate | Delete |
|------|------|----------|------------|--------|
| Guest (no account) | ❌ | ❌ | ❌ | ❌ |
| Guest (org invite) | ❌ | ❌ | ❌ | ❌ |
| Chat tier | ❌ | ❌ | ❌ | ❌ |
| Plus tier | ❌ | ❌ | ❌ | ❌ |
| **Pro tier** | ✓ | ✓ | ✓ | ❌ |
| Host (org) | ✓ | ✓ | ✓ | ❌ |
| Org Admin | ✓ | ✓ | ✓ | ✓ |

**Note:** Summaries are a Pro-tier / Organization feature per [decisions.md](../decisions.md).

---

## Cost Analysis

| Component | Cost | Notes |
|-----------|------|-------|
| **Source summary** | $0.009 | GPT-5.2: 4K in + 500 out |
| **Translated variant** | $0.002 | GPT-5.2-mini: 500 in + 500 out |
| **Reading level adaptation** | $0.002 | GPT-5.2-mini: 500 in + 500 out |

**Typical usage per session:**
- 1 auto-generated summary: $0.009
- 2 translated variants (on-demand): $0.004
- **Total: ~$0.013/session**

**Monthly cost at scale:**
- 100 orgs × 30 sessions × $0.013 = **$39/month**

---

## Caching Strategy

```typescript
// Cache key pattern: summary:{sessionId}:{language}:{readingLevel}
// TTL: Indefinite (invalidate on regeneration)

async findOne(
  sessionId: string,
  language: string,
  readingLevel: ReadingLevel,
): Promise<Summary | null> {
  // Check database (canonical source)
  return this.summaryRepo.findOne({
    where: { sessionId, language, readingLevel },
  });
}

// Invalidation happens only on:
// 1. force=true in generateSummary
// 2. Transcript modification (rare, triggers re-summary)
// 3. Manual deletion by admin
```

---

## Long Context Handling

For sessions longer than GPT-5.2's context window (~128K tokens):

```typescript
async generateFromTranscript(
  sessionId: string,
  readingLevel: ReadingLevel,
): Promise<TextGenerationResult> {
  const fullTranscript = await this.transcriptService.getFullText(sessionId);
  const tokenCount = this.tokenizer.count(fullTranscript);
  
  if (tokenCount > 100000) {
    // Use chunked summarization
    return this.generateChunkedSummary(fullTranscript, readingLevel);
  }
  
  return this.generateSinglePass(fullTranscript, readingLevel);
}

private async generateChunkedSummary(
  transcript: string,
  readingLevel: ReadingLevel,
): Promise<TextGenerationResult> {
  // Split into ~30K token chunks with overlap
  const chunks = this.splitWithOverlap(transcript, 30000, 1000);
  
  // Summarize each chunk
  const chunkSummaries = await Promise.all(
    chunks.map(chunk => this.generateSinglePass(chunk, readingLevel))
  );
  
  // Synthesize final summary from chunk summaries
  const combinedSummaries = chunkSummaries.map(r => r.text).join('\n\n---\n\n');
  
  return this.aiService.generateText(
    `Synthesize these partial summaries into one cohesive summary:\n\n${combinedSummaries}`,
    { taskType: 'summary', maxTokens: 600 }
  );
}
```

---

## Dependencies

| Dependency | Direction | Notes |
|------------|-----------|-------|
| **C5 (AI Provider)** | ← uses | GPT-5.2 for generation |
| **F1 (Audio-to-Text)** | ← uses | Transcript data source |
| **F3 (i18n)** | ← uses | Language codes, translation |
| **F7 (Recaps)** | related | Complementary feature |
| **W6 (Host Dashboard)** | uses → | Display summaries |
| **W7 (Member Dashboard)** | uses → | Display summaries |

---

## Acceptance Criteria

### MVP (Phase 1)
- [ ] Auto-generate summary when session completes (Pro/Org only)
- [ ] Summary in source language, STANDARD reading level
- [ ] Display summary on session detail page
- [ ] On-demand generation for other languages/levels
- [ ] Proper access control (Pro tier, Org members)
- [ ] Error handling for failed generation

### Phase 2
- [ ] Regenerate button (force=true)
- [ ] Summary sharing (copy link, export)
- [ ] Email summary to attendees
- [ ] Compare summaries across sessions (same speaker/topic)
- [ ] Summary analytics (most viewed, engagement)

---

## Response Types (Draft)

> These types define the AI response structure. See [C8 — Typed AI Responses](../core/typed-ai-responses.md) for the full pattern.

### SummaryResponseData

```typescript
// libs/4eye-types/ai/summaries/SummaryResponse.ts

/**
 * AI-generated session summary response.
 * 
 * The summary should be a prose narrative (~200-400 words) that captures
 * the essence of what was discussed. Adapt vocabulary and sentence structure
 * to the reading level.
 * 
 * @interface SummaryResponseData
 */
export interface SummaryResponseData {
  /**
   * The prose summary of the session.
   * Should be 200-400 words, readable as a single narrative.
   * 
   * Reading level adaptation:
   * - CHILD: Simple words, short sentences, relatable examples
   * - STANDARD: Clear everyday language, mixed complexity
   * - ACADEMIC: Formal structure, technical terms acceptable
   * 
   * @example "Today's session explored the concept of forgiveness through three transformative perspectives..."
   */
  content: string;

  /**
   * Estimated reading time in seconds.
   * Calculate based on ~200 words per minute.
   * 
   * @example 90
   */
  estimatedReadingTimeSeconds: number;

  /**
   * Key topics covered in the session.
   * Extract 3-5 main themes for tagging/filtering.
   * 
   * @example ["forgiveness", "healing", "personal growth"]
   */
  topics: string[];

  /**
   * One-sentence takeaway (≤25 words).
   * The single most important point from the session.
   * 
   * @example "Forgiveness is a choice that benefits the forgiver as much as anyone else."
   */
  keyTakeaway: string;
}
```

### Zod Schema

```typescript
// libs/4eye-types/ai/summaries/SummaryResponse.schema.ts

import { z } from 'zod';

export const SummaryResponseDataSchema = z.object({
  content: z.string().min(100, 'Summary too short').max(3000, 'Summary too long'),
  estimatedReadingTimeSeconds: z.number().int().min(30).max(300),
  topics: z.array(z.string()).min(1).max(10),
  keyTakeaway: z.string().max(200),
});

export type SummaryResponseData = z.infer<typeof SummaryResponseDataSchema>;
```

### Example Response

```json
{
  "content": "Today's session centered on the transformative power of forgiveness, exploring both its personal and relational dimensions. The speaker began by distinguishing between forgiveness and reconciliation, emphasizing that forgiveness is an internal choice that doesn't require the other party's participation.\n\nThree key insights emerged: First, holding onto resentment often harms the holder more than the offender. Second, forgiveness is a process rather than a single moment—it may need to be renewed repeatedly. Third, forgiveness creates space for healing and growth that bitterness would otherwise prevent.\n\nThe session concluded with practical steps for beginning the forgiveness journey, including acknowledging the hurt, choosing to release the weight, and finding support in community.",
  "estimatedReadingTimeSeconds": 75,
  "topics": ["forgiveness", "healing", "personal growth", "resilience"],
  "keyTakeaway": "Forgiveness is a choice that frees the forgiver, regardless of the other person's response."
}
```

---

## Environment Variables

```env
# Summary generation
SUMMARY_AUTO_GENERATE=true
SUMMARY_MAX_TOKENS=600
SUMMARY_TEMPERATURE=0.3
SUMMARY_DEFAULT_READING_LEVEL=STANDARD

# Long content handling
SUMMARY_CHUNK_SIZE_TOKENS=30000
SUMMARY_CHUNK_OVERLAP_TOKENS=1000
```
