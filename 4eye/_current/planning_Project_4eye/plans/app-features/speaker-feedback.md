# F13 — Speaker Feedback

> AI-generated feedback and improvement suggestions for hosts/speakers after sessions.

**Status:** Planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md) | [decisions.md](../decisions.md)
**Related:** [F9 — Speakers](speakers.md) | [C8 — Typed AI Responses](../core/typed-ai-responses.md)

**User Story:** "A host views feedback and improvement suggestions on their session after completion"

---

## ⚠️ Key Decisions (Do Not Overwrite)

1. **Typed AI Responses** — Feedback generation uses typed response system. See [C8](../core/typed-ai-responses.md)
2. **Multi-Category Analysis** — Clarity, pacing, engagement, inclusivity, tone
3. **Evidence-Based** — Feedback includes exact quotes as evidence
4. **Historical Trends** — Track improvement over time

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       SPEAKER FEEDBACK PIPELINE                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   Session Completed                                                      │
│        │                                                                 │
│        ▼                                                                 │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │  Transcript + Speaker Attribution (F9)                           │  │
│   │  ├── Segments grouped by speakerId                               │  │
│   │  └── Each speaker's contribution isolated for analysis           │  │
│   └────────────────────────────┬─────────────────────────────────────┘  │
│                                │                                         │
│                                ▼                                         │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │  Feedback Analysis (Claude 4.5 Opus)                              │  │
│   │                                                                    │  │
│   │  1. Assess multiple categories (clarity, pacing, engagement...)  │  │
│   │  2. Generate specific, actionable suggestions                    │  │
│   │  3. Include exact quotes as evidence                             │  │
│   │  4. Optionally mark timestamps for context                       │  │
│   │                                                                    │  │
│   │  Input: ~10K tokens (transcript)                                 │  │
│   │  Output: ~2K tokens (structured feedback)                        │  │
│   │                                                                    │  │
│   └────────────────────────────┬─────────────────────────────────────┘  │
│                                │                                         │
│                                ▼                                         │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │  FeedbackReport Entity                                            │  │
│   │  ├── sessionId, speakerId                                        │  │
│   │  ├── categories: { clarity: 8.2, pacing: 7.5, engagement: 9.0 } │  │
│   │  ├── suggestions: [...]                                          │  │
│   │  ├── overallScore: 8.1                                           │  │
│   │  └── evidenceQuotes: [{ text, timestamp, category }]             │  │
│   └──────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│                                                                          │
│  Historical Trends                                                       │
│  ═════════════════                                                       │
│                                                                          │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │  Speaker Dashboard: Trends Over Time                              │  │
│   │                                                                    │  │
│   │  Clarity   ████████░░ 8.2 (+0.5 from last month)                 │  │
│   │  Pacing    ███████░░░ 7.5 (consistent)                           │  │
│   │  Engage    █████████░ 9.0 (+1.2 from last month)                 │  │
│   │  Incl.     ████████░░ 8.0 (new metric)                           │  │
│   │  Tone      ████████░░ 8.5 (consistent)                           │  │
│   │                                                                    │  │
│   │  📈 Growth Areas:                                                 │  │
│   │  • Engagement improved significantly                              │  │
│   │  • More varied pacing recommended                                 │  │
│   └──────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Design Decisions

### Why Claude 4.5 Opus for Feedback?

| Aspect | Claude 4.5 Opus | GPT-5.2 | Gemini 2 |
|--------|-----------------|---------|----------|
| Nuanced critique | ✅ Best | Good | Good |
| Constructive tone | ✅ Best | Good | OK |
| Religious sensitivity | ✅ Excellent | Good | Good |
| Evidence-based feedback | ✅ Excellent | Good | OK |
| Cost | $2.00/$10.00 | $1.50/$6.00 | $0.03/$0.12 |

**Decision:** Claude 4.5 Opus for feedback — its nuanced, constructive, empathetic output is worth the premium for this sensitive use case.

### Alternatives Considered

| Approach | Description | Pros | Cons | Decision |
|----------|-------------|------|------|----------|
| **Automatic feedback** | Generate after every session | Consistent, no extra action | May feel intrusive, cost | ✅ Default for Org Pro |
| **On-demand feedback** | Host requests feedback | Control, lower cost | May forget to request | ✅ Option for all |
| **Peer feedback** | Other hosts review | Human insight | Time-consuming, inconsistent | ❌ Phase 2 |
| **Audience feedback** | Congregation rates | Real reactions | Privacy concerns, bias | ❌ Out of scope |
| **Single overall score** | Just one number | Simple | Not actionable | ❌ Rejected |
| **Multi-category scores** | Breakdown by area | Actionable insights | More complex | ✅ Chosen |

### Feedback Categories

| Category | Definition | What AI Looks For |
|----------|------------|-------------------|
| **Clarity** | Message coherence | Logical flow, clear thesis, accessibility |
| **Pacing** | Speech rhythm | Varied tempo, appropriate pauses, not rushed |
| **Engagement** | Audience connection | Questions, stories, calls to action |
| **Inclusivity** | Welcoming language | Diverse pronouns, avoiding exclusionary terms |
| **Tone** | Emotional delivery | Warmth, authenticity, appropriate gravity |
| **Scripture Use** | Textual foundation | Accurate citations, contextual explanation |
| **Structure** | Organization | Intro/body/conclusion, transitions |
| **Takeaway** | Practical application | Clear action items, memorable points |

**MVP Categories:** Clarity, Pacing, Engagement, Tone, Takeaway (5 categories)
**Phase 2:** Add Inclusivity, Scripture Use, Structure (8 categories)

### Visibility & Privacy

| Role | Can View | Can Delete |
|------|----------|------------|
| **Speaker (self)** | ✓ Own feedback | ✓ Own feedback |
| **Host (of session)** | ✓ All speakers | ❌ (admin can) |
| **Org Admin** | ✓ All org feedback | ✓ Any |
| **Member** | ❌ | ❌ |
| **Guest** | ❌ | ❌ |

**Key privacy principle:** Feedback is sensitive. Only the speaker themselves, session host, and org admin can access it.

---

## Data Model

### FeedbackReport
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| sessionId | UUID | FK → Session |
| speakerId | UUID | FK → Speaker |
| categories | json | `{clarity: 8.2, pacing: 7.5, ...}` |
| suggestions | FeedbackSuggestion[] | Structured suggestions (see below) |
| overallScore | decimal | 0-10, weighted average |
| modelUsed | string | e.g., "claude-4.5-opus" |
| generatedAt | datetime | |
| deletedAt | datetime? | Soft delete |

### FeedbackSuggestion (embedded in json)
```typescript
interface FeedbackSuggestion {
  category: FeedbackCategory;
  suggestion: string;          // The actionable advice
  evidenceQuote?: string;      // Direct quote from transcript
  evidenceTimestamp?: number;  // Seconds, for linking to recording
  priority: 'low' | 'medium' | 'high';
}
```

### FeedbackCategory (enum)
```typescript
enum FeedbackCategory {
  CLARITY = 'clarity',
  PACING = 'pacing',
  ENGAGEMENT = 'engagement',
  INCLUSIVITY = 'inclusivity',
  TONE = 'tone',
  SCRIPTURE_USE = 'scripture_use',
  STRUCTURE = 'structure',
  TAKEAWAY = 'takeaway',
}
```

---

## Project Structure

```
backend/
├── src/
│   └── modules/
│       └── feedback/
│           ├── feedback.module.ts
│           ├── feedback.resolver.ts
│           ├── feedback.service.ts
│           ├── entities/
│           │   └── feedback-report.entity.ts
│           ├── dto/
│           │   ├── generate-feedback.dto.ts
│           │   └── get-feedback.dto.ts
│           ├── prompts/
│           │   └── speaker-feedback.prompt.ts
│           └── services/
│               └── feedback-trends.service.ts

frontend/
├── src/
│   ├── features/
│   │   └── feedback/
│   │       ├── components/
│   │       │   ├── FeedbackReport.tsx        # Full report view
│   │       │   ├── FeedbackScoreCard.tsx     # Single category score
│   │       │   ├── FeedbackSuggestionCard.tsx # Single suggestion
│   │       │   ├── FeedbackTrends.tsx        # Historical trends
│   │       │   ├── FeedbackRadarChart.tsx    # Categories visualization
│   │       │   └── FeedbackComparison.tsx    # Compare to org average
│   │       ├── hooks/
│   │       │   ├── useFeedbackReport.ts
│   │       │   ├── useFeedbackTrends.ts
│   │       │   └── useGenerateFeedback.ts
│   │       └── context/
│   │           └── FeedbackContext.tsx
```

---

## API Surface

### Queries

```graphql
type Query {
  # Get feedback for a specific session + speaker
  feedbackReport(
    sessionId: ID!
    speakerId: ID!
  ): FeedbackReport
  
  # Get all feedback for a speaker (for trends)
  speakerFeedbackHistory(
    speakerId: ID!
    first: Int
    after: String
    startDate: DateTime
    endDate: DateTime
  ): FeedbackReportConnection!
  
  # Get aggregated trends for a speaker
  speakerFeedbackTrends(
    speakerId: ID!
    period: TrendPeriod!  # WEEKLY, MONTHLY, QUARTERLY
  ): FeedbackTrends!
  
  # Get org-wide feedback averages (for comparison)
  organizationFeedbackAverages(
    organizationId: ID!
    period: TrendPeriod!
  ): CategoryAverages!
}

type FeedbackReport {
  id: ID!
  session: Session!
  speaker: Speaker!
  categories: CategoryScores!
  suggestions: [FeedbackSuggestion!]!
  overallScore: Float!
  generatedAt: DateTime!
}

type CategoryScores {
  clarity: Float
  pacing: Float
  engagement: Float
  inclusivity: Float
  tone: Float
  scriptureUse: Float
  structure: Float
  takeaway: Float
}

type FeedbackSuggestion {
  id: ID!
  category: FeedbackCategory!
  suggestion: String!
  evidenceQuote: String
  evidenceTimestamp: Float
  priority: SuggestionPriority!
}

enum FeedbackCategory {
  CLARITY
  PACING
  ENGAGEMENT
  INCLUSIVITY
  TONE
  SCRIPTURE_USE
  STRUCTURE
  TAKEAWAY
}

enum SuggestionPriority {
  LOW
  MEDIUM
  HIGH
}

type FeedbackTrends {
  speaker: Speaker!
  period: TrendPeriod!
  dataPoints: [TrendDataPoint!]!
  categoryTrends: [CategoryTrend!]!
  overallTrend: TrendDirection!
}

type TrendDataPoint {
  date: DateTime!
  overallScore: Float!
  categories: CategoryScores!
}

type CategoryTrend {
  category: FeedbackCategory!
  currentAverage: Float!
  previousAverage: Float!
  change: Float!
  direction: TrendDirection!
}

enum TrendDirection {
  UP
  DOWN
  STABLE
}

type CategoryAverages {
  clarity: Float!
  pacing: Float!
  engagement: Float!
  tone: Float!
  takeaway: Float!
  sampleSize: Int!
}
```

### Mutations

```graphql
type Mutation {
  # Generate feedback for a session (one per speaker)
  generateFeedback(input: GenerateFeedbackInput!): FeedbackReport!
  
  # Batch generate for all speakers in a session
  generateAllFeedback(sessionId: ID!): [FeedbackReport!]!
  
  # Delete feedback (soft delete)
  deleteFeedback(id: ID!): Boolean!
  
  # Regenerate feedback with different model/prompt
  regenerateFeedback(id: ID!, force: Boolean): FeedbackReport!
}

input GenerateFeedbackInput {
  sessionId: ID!
  speakerId: ID!
  categories: [FeedbackCategory!]  # Optional: limit to specific categories
  force: Boolean                   # Regenerate even if exists
}
```

---

## Feedback Generation Service

```typescript
// feedback.service.ts
@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(FeedbackReport)
    private feedbackRepo: Repository<FeedbackReport>,
    private transcriptService: TranscriptService,
    private speakerService: SpeakerService,
    private aiService: AIService,
  ) {}

  async generateFeedback(input: GenerateFeedbackInput): Promise<FeedbackReport> {
    const { sessionId, speakerId, force } = input;
    
    // Check for existing
    if (!force) {
      const existing = await this.feedbackRepo.findOne({
        where: { sessionId, speakerId },
      });
      if (existing) return existing;
    }
    
    // Get speaker's segments from transcript
    const segments = await this.transcriptService.getSegmentsBySpeaker(
      sessionId,
      speakerId,
    );
    
    if (segments.length < 10) {
      throw new BadRequestException('Insufficient content for feedback (need 10+ segments)');
    }
    
    // Get speaker info for context
    const speaker = await this.speakerService.getSpeaker(speakerId);
    
    // Build prompt and call AI
    const prompt = this.buildFeedbackPrompt(segments, speaker);
    const result = await this.aiService.generateText(prompt, {
      taskType: 'feedback',
      model: 'claude-4.5-opus',  // Explicitly use Claude for nuanced feedback
      maxTokens: 2500,
      temperature: 0.3,
      responseFormat: 'json',
    });
    
    const parsed = JSON.parse(result.text);
    
    // Calculate overall score (weighted average)
    const overallScore = this.calculateOverallScore(parsed.categories);
    
    // Create report
    const report = this.feedbackRepo.create({
      sessionId,
      speakerId,
      categories: parsed.categories,
      suggestions: parsed.suggestions,
      overallScore,
      modelUsed: 'claude-4.5-opus',
    });
    
    return this.feedbackRepo.save(report);
  }

  private buildFeedbackPrompt(
    segments: TranscriptSegment[],
    speaker: Speaker,
  ): string {
    const transcript = segments
      .map(s => `[${this.formatTime(s.startTime)}] ${s.text}`)
      .join('\n');
    
    return buildSpeakerFeedbackPrompt({
      speakerName: speaker.name,
      speakerTitle: speaker.title,
      transcript,
    });
  }

  private calculateOverallScore(categories: CategoryScores): number {
    const weights = {
      clarity: 0.20,
      pacing: 0.15,
      engagement: 0.20,
      tone: 0.15,
      takeaway: 0.30,  // Highest weight: did they leave with something?
    };
    
    let total = 0;
    let weightSum = 0;
    
    for (const [category, weight] of Object.entries(weights)) {
      if (categories[category] != null) {
        total += categories[category] * weight;
        weightSum += weight;
      }
    }
    
    return weightSum > 0 ? total / weightSum : 0;
  }
}
```

### Prompt Engineering

```typescript
// prompts/speaker-feedback.prompt.ts
export function buildSpeakerFeedbackPrompt(params: {
  speakerName: string;
  speakerTitle?: string;
  transcript: string;
  verticalConfig: VerticalConfig;
}): string {
  // Vertical-specific coaching context:
  // - RELIGION: "religious leaders", "sermon/message"
  // - EDUCATION: "educators", "lecture/lesson"
  // - PROFESSIONAL: "presenters", "presentation/meeting"
  const { coachContext, sessionType } = params.verticalConfig.prompts.feedback;

  return `
You are a compassionate communication coach for ${coachContext}. Provide constructive, actionable feedback on this ${sessionType}.

SPEAKER: ${params.speakerName}${params.speakerTitle ? ` (${params.speakerTitle})` : ''}

TRANSCRIPT (with timestamps):
${params.transcript}

ANALYZE AND SCORE (0-10) these categories:

1. **Clarity** (0-10): How clear and coherent was the message?
   - Logical flow of ideas
   - Central thesis identifiable
   - Accessible language
   
2. **Pacing** (0-10): How was the speech rhythm?
   - Varied tempo
   - Strategic pauses
   - Not rushed or dragging
   
3. **Engagement** (0-10): How well did they connect with the audience?
   - Use of questions
   - Stories and illustrations
   - Calls to action
   
4. **Tone** (0-10): How was the emotional delivery?
   - Warmth and authenticity
   - Appropriate gravity
   - Encouraging vs. condemning
   
5. **Takeaway** (0-10): Was there a clear, actionable message?
   - Memorable points
   - Practical application
   - Clear call to action

RESPOND WITH JSON:
{
  "categories": {
    "clarity": 8.5,
    "pacing": 7.0,
    "engagement": 9.0,
    "tone": 8.5,
    "takeaway": 7.5
  },
  "suggestions": [
    {
      "category": "pacing",
      "suggestion": "Consider pausing after major points to let them sink in. Around the 12:30 mark, there were 3 important ideas back-to-back that could benefit from breathing room.",
      "evidenceQuote": "God is love. Love is patient. Patience is a virtue.",
      "evidenceTimestamp": 750,
      "priority": "medium"
    },
    {
      "category": "takeaway",
      "suggestion": "The closing was strong but could include a specific action step. Instead of 'be more loving,' try 'this week, reach out to one person you've been meaning to call.'",
      "evidenceQuote": "So go out and be more loving to those around you.",
      "evidenceTimestamp": 1823,
      "priority": "high"
    }
  ]
}

RULES:
1. Be encouraging but honest
2. Provide specific, actionable suggestions (not vague critiques)
3. Include exact quotes as evidence
4. Include timestamps for suggestions (so speaker can review)
5. Prioritize suggestions (high = impactful and easy, medium = impactful, low = polish)
6. Generate 3-6 suggestions total
7. Scores should use full range (not all 8s)
8. Be culturally sensitive to the session context
`.trim();
}
```

---

## Trends Service

```typescript
// feedback-trends.service.ts
@Injectable()
export class FeedbackTrendsService {
  constructor(
    @InjectRepository(FeedbackReport)
    private feedbackRepo: Repository<FeedbackReport>,
  ) {}

  async getSpeakerTrends(
    speakerId: string,
    period: TrendPeriod,
  ): Promise<FeedbackTrends> {
    const { startDate, groupBy } = this.getPeriodConfig(period);
    
    const reports = await this.feedbackRepo.find({
      where: {
        speakerId,
        generatedAt: MoreThan(startDate),
      },
      order: { generatedAt: 'ASC' },
    });
    
    // Group by time period
    const grouped = this.groupByPeriod(reports, groupBy);
    
    // Calculate averages per period
    const dataPoints = grouped.map(group => ({
      date: group.date,
      overallScore: this.average(group.reports.map(r => r.overallScore)),
      categories: this.averageCategories(group.reports),
    }));
    
    // Calculate category trends (compare first half to second half)
    const categoryTrends = this.calculateCategoryTrends(reports);
    
    // Calculate overall direction
    const overallTrend = this.calculateOverallTrend(dataPoints);
    
    return {
      speakerId,
      period,
      dataPoints,
      categoryTrends,
      overallTrend,
    };
  }
  
  async getOrganizationAverages(
    organizationId: string,
    period: TrendPeriod,
  ): Promise<CategoryAverages> {
    const { startDate } = this.getPeriodConfig(period);
    
    const reports = await this.feedbackRepo
      .createQueryBuilder('f')
      .innerJoin('f.speaker', 's')
      .where('s.organizationId = :organizationId', { organizationId })
      .andWhere('f.generatedAt > :startDate', { startDate })
      .getMany();
    
    return {
      ...this.averageCategories(reports),
      sampleSize: reports.length,
    };
  }

  private calculateCategoryTrends(reports: FeedbackReport[]): CategoryTrend[] {
    if (reports.length < 4) {
      return []; // Not enough data for trends
    }
    
    const midpoint = Math.floor(reports.length / 2);
    const firstHalf = reports.slice(0, midpoint);
    const secondHalf = reports.slice(midpoint);
    
    const categories: FeedbackCategory[] = ['clarity', 'pacing', 'engagement', 'tone', 'takeaway'];
    
    return categories.map(category => {
      const prevAvg = this.average(firstHalf.map(r => r.categories[category] || 0));
      const currAvg = this.average(secondHalf.map(r => r.categories[category] || 0));
      const change = currAvg - prevAvg;
      
      return {
        category,
        currentAverage: currAvg,
        previousAverage: prevAvg,
        change,
        direction: change > 0.5 ? 'UP' : change < -0.5 ? 'DOWN' : 'STABLE',
      };
    });
  }
}
```

---

## Frontend Components

### FeedbackReport

```typescript
// components/FeedbackReport.tsx
export function FeedbackReport({ sessionId, speakerId }: Props) {
  const { report, isLoading } = useFeedbackReport(sessionId, speakerId);
  const { orgAverages } = useOrganizationAverages();
  const { seekTo } = useRecordingPlayback();

  if (isLoading) return <FeedbackSkeleton />;
  if (!report) return <GenerateFeedbackPrompt sessionId={sessionId} speakerId={speakerId} />;

  return (
    <Box>
      {/* Header with overall score */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
        <Box sx={{ position: 'relative', width: 120, height: 120 }}>
          <CircularProgress
            variant="determinate"
            value={report.overallScore * 10}
            size={120}
            thickness={4}
            sx={{ color: getScoreColor(report.overallScore) }}
          />
          <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h3" fontWeight={600}>
              {report.overallScore.toFixed(1)}
            </Typography>
          </Box>
        </Box>
        
        <Box>
          <Typography variant="h5" gutterBottom>
            Overall Score
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Based on {report.suggestions.length} areas analyzed
          </Typography>
        </Box>
      </Box>
      
      {/* Category breakdown */}
      <Typography variant="h6" gutterBottom>
        Category Scores
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {Object.entries(report.categories).map(([category, score]) => (
          <Grid item xs={6} md={4} key={category}>
            <FeedbackScoreCard
              category={category}
              score={score}
              orgAverage={orgAverages?.[category]}
            />
          </Grid>
        ))}
      </Grid>
      
      {/* Radar chart visualization */}
      <FeedbackRadarChart categories={report.categories} orgAverages={orgAverages} />
      
      {/* Suggestions */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Suggestions for Improvement
      </Typography>
      <Stack spacing={2}>
        {report.suggestions
          .sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
          .map((suggestion, index) => (
            <FeedbackSuggestionCard
              key={index}
              suggestion={suggestion}
              onSeekTo={suggestion.evidenceTimestamp ? () => seekTo(suggestion.evidenceTimestamp) : undefined}
            />
          ))}
      </Stack>
    </Box>
  );
}
```

### FeedbackScoreCard

```typescript
// components/FeedbackScoreCard.tsx
export function FeedbackScoreCard({ category, score, orgAverage }: Props) {
  const diff = orgAverage != null ? score - orgAverage : null;
  
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {formatCategoryName(category)}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography variant="h4" fontWeight={600} color={getScoreColor(score)}>
            {score.toFixed(1)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            / 10
          </Typography>
        </Box>
        
        {/* Progress bar */}
        <LinearProgress
          variant="determinate"
          value={score * 10}
          sx={{ mt: 1, height: 8, borderRadius: 4, bgcolor: 'grey.200' }}
        />
        
        {/* Comparison to org average */}
        {diff != null && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            {diff > 0 ? (
              <TrendingUpIcon fontSize="small" color="success" />
            ) : diff < 0 ? (
              <TrendingDownIcon fontSize="small" color="error" />
            ) : (
              <TrendingFlatIcon fontSize="small" color="action" />
            )}
            <Typography variant="caption" color={diff > 0 ? 'success.main' : diff < 0 ? 'error.main' : 'text.secondary'}>
              {diff > 0 ? '+' : ''}{diff.toFixed(1)} vs org avg
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
```

### FeedbackSuggestionCard

```typescript
// components/FeedbackSuggestionCard.tsx
export function FeedbackSuggestionCard({ suggestion, onSeekTo }: Props) {
  const priorityColors = {
    high: 'error',
    medium: 'warning',
    low: 'info',
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          {/* Priority badge */}
          <Chip
            label={suggestion.priority.toUpperCase()}
            size="small"
            color={priorityColors[suggestion.priority]}
          />
          
          {/* Category */}
          <Chip
            label={formatCategoryName(suggestion.category)}
            size="small"
            variant="outlined"
          />
          
          <Box sx={{ flex: 1 }} />
          
          {/* Timestamp link */}
          {onSeekTo && suggestion.evidenceTimestamp && (
            <Button
              startIcon={<PlayArrowIcon />}
              size="small"
              onClick={onSeekTo}
            >
              {formatTime(suggestion.evidenceTimestamp)}
            </Button>
          )}
        </Box>
        
        {/* Suggestion text */}
        <Typography variant="body1" sx={{ mt: 2 }}>
          {suggestion.suggestion}
        </Typography>
        
        {/* Evidence quote */}
        {suggestion.evidenceQuote && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: 'grey.50',
              borderLeft: 3,
              borderColor: 'primary.main',
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" fontStyle="italic">
              "{suggestion.evidenceQuote}"
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
```

### FeedbackTrends

```typescript
// components/FeedbackTrends.tsx
export function FeedbackTrends({ speakerId }: { speakerId: string }) {
  const [period, setPeriod] = useState<TrendPeriod>('MONTHLY');
  const { trends, isLoading } = useFeedbackTrends(speakerId, period);

  if (isLoading) return <Skeleton height={300} />;
  if (!trends || trends.dataPoints.length < 2) {
    return (
      <Alert severity="info">
        Need at least 2 sessions with feedback to show trends.
      </Alert>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">Performance Trends</Typography>
        <ToggleButtonGroup
          value={period}
          exclusive
          onChange={(_, v) => v && setPeriod(v)}
          size="small"
        >
          <ToggleButton value="WEEKLY">Weekly</ToggleButton>
          <ToggleButton value="MONTHLY">Monthly</ToggleButton>
          <ToggleButton value="QUARTERLY">Quarterly</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      
      {/* Line chart showing overall score over time */}
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={trends.dataPoints}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={formatDate} />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Line type="monotone" dataKey="overallScore" stroke="#1976d2" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Category trends */}
      <Typography variant="subtitle1" sx={{ mt: 4, mb: 2 }}>
        Category Trends
      </Typography>
      <Grid container spacing={2}>
        {trends.categoryTrends.map((ct) => (
          <Grid item xs={6} md={4} key={ct.category}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {ct.direction === 'UP' && <TrendingUpIcon color="success" />}
              {ct.direction === 'DOWN' && <TrendingDownIcon color="error" />}
              {ct.direction === 'STABLE' && <TrendingFlatIcon color="action" />}
              <Typography variant="body2">
                {formatCategoryName(ct.category)}: {ct.currentAverage.toFixed(1)}
              </Typography>
              <Typography variant="caption" color={ct.change > 0 ? 'success.main' : ct.change < 0 ? 'error.main' : 'text.secondary'}>
                ({ct.change > 0 ? '+' : ''}{ct.change.toFixed(1)})
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
```

---

## Access Control

| Role | View Own Feedback | View Others' | Generate | Delete |
|------|-------------------|--------------|----------|--------|
| Speaker (self) | ✓ | ❌ | ✓ | ✓ (own) |
| Host | ✓ (own session speakers) | ❌ | ✓ | ❌ |
| Org Admin | ✓ (all org) | ✓ | ✓ | ✓ |
| Member | ❌ | ❌ | ❌ | ❌ |
| Individual Pro | ✓ (own) | N/A | ✓ | ✓ |

---

## Cost Analysis

| Component | Cost | Notes |
|-----------|------|-------|
| **Feedback generation** | ~$0.04 | Claude 4.5 Opus: 10K in × $0.002/K + 2K out × $0.01/K = $0.02 + $0.02 |
| **Per speaker per session** | ~$0.04 | One feedback report per speaker |
| **Monthly at scale** | ~$120/mo | 100 orgs × 30 sessions × 1 speaker × $0.04 |

**Cost justification:** ~$0.04 per comprehensive, nuanced feedback report is high value. Speakers get actionable insights to improve their craft.

---

## Dependencies

| Dependency | Direction | Notes |
|------------|-----------|-------|
| **C5 (AI Provider)** | ← uses | Claude 4.5 Opus for feedback generation |
| **F1 (Audio-to-Text)** | ← uses | TranscriptSegment data |
| **F9 (Speakers)** | ← uses | Speaker identity, segments filtered by speaker |
| **F5 (Recordings)** | ← uses | Timestamp links for evidence |
| **W6 (Host Dashboard)** | uses → | View feedback reports |

---

## Acceptance Criteria

### MVP (Phase 1)
- [ ] Generate feedback for a speaker after session completion
- [ ] Score 5 categories: clarity, pacing, engagement, tone, takeaway
- [ ] Generate 3-6 actionable suggestions with evidence quotes
- [ ] Suggestions link to recording timestamps
- [ ] Host/speaker can view their own feedback
- [ ] Feedback visible only to speaker, host, and org admin

### Phase 2
- [ ] Add 3 more categories: inclusivity, scripture use, structure
- [ ] Historical trends visualization (line chart, category breakdown)
- [ ] Comparison to organization averages
- [ ] Export feedback report (PDF)
- [ ] Automatic generation toggle (auto vs. on-demand)

### Phase 3
- [ ] Peer feedback (other hosts can optionally review)
- [ ] Goal setting (speaker sets improvement goals)
- [ ] Progress tracking against goals

---

## Response Types (Draft)

> These types define the AI response structure for speaker feedback. See [C8 — Typed AI Responses](../core/typed-ai-responses.md) for the full pattern.

### FeedbackResponseData

```typescript
// libs/4eye-types/ai/feedback/FeedbackResponse.ts

/**
 * AI-generated speaker feedback response.
 * 
 * Analyze transcript to provide constructive feedback on speaking effectiveness.
 * 
 * Guidelines:
 * - Be constructive and encouraging, never harsh
 * - Include specific quotes as evidence (with timestamps when available)
 * - Provide actionable suggestions, not just observations
 * - Acknowledge strengths before suggesting improvements
 * - Be sensitive to religious/cultural context
 * 
 * Score each category 1-10:
 * - 1-3: Significant room for improvement
 * - 4-6: Developing, with specific areas to address
 * - 7-8: Solid performance with minor refinements
 * - 9-10: Exceptional, exemplary in this area
 * 
 * @interface FeedbackResponseData
 */
export interface FeedbackResponseData {
  /**
   * Scores for each feedback category (1-10).
   * 
   * @example { "clarity": 8.2, "pacing": 7.5, "engagement": 9.0, "tone": 8.5, "takeaway": 8.0 }
   */
  categories: FeedbackCategoryScores;

  /**
   * Overall weighted score (1-10).
   * Typically average of category scores.
   * 
   * @example 8.1
   */
  overallScore: number;

  /**
   * Actionable improvement suggestions.
   * 3-6 suggestions, prioritized by impact.
   * 
   * @example See FeedbackSuggestion interface
   */
  suggestions: FeedbackSuggestion[];

  /**
   * One-sentence summary of overall feedback.
   * Start with something positive.
   * 
   * @example "Strong engagement throughout with excellent storytelling; consider varying pacing to create more dramatic moments."
   */
  summary: string;
}

/**
 * Scores for each feedback category.
 * All scores are 1-10.
 */
export interface FeedbackCategoryScores {
  /** Message coherence, logical flow, accessibility. */
  clarity: number;
  
  /** Speech rhythm, varied tempo, appropriate pauses. */
  pacing: number;
  
  /** Audience connection, questions, stories, calls to action. */
  engagement: number;
  
  /** Warmth, authenticity, appropriate gravity. */
  tone: number;
  
  /** Clear action items, memorable points. */
  takeaway: number;
}

/**
 * A single actionable suggestion.
 */
export interface FeedbackSuggestion {
  /**
   * Which category this suggestion addresses.
   * 
   * @example "pacing"
   */
  category: 'clarity' | 'pacing' | 'engagement' | 'tone' | 'takeaway';

  /**
   * The actionable advice.
   * Specific and constructive.
   * 
   * @example "Consider pausing for 2-3 seconds after key points to let them sink in."
   */
  suggestion: string;

  /**
   * Direct quote from transcript illustrating the point.
   * Helps the speaker understand the context.
   * 
   * @example "...and so we must remember that love conquers all, which reminds me of another point..."
   */
  evidenceQuote?: string;

  /**
   * Timestamp in seconds for the evidence quote.
   * Allows linking to recording.
   * 
   * @example 423
   */
  evidenceTimestamp?: number;

  /**
   * Priority level for this suggestion.
   * 
   * @example "high"
   */
  priority: 'low' | 'medium' | 'high';
}
```

### Zod Schema

```typescript
// libs/4eye-types/ai/feedback/FeedbackResponse.schema.ts

import { z } from 'zod';

const FeedbackCategoryScoresSchema = z.object({
  clarity: z.number().min(1).max(10),
  pacing: z.number().min(1).max(10),
  engagement: z.number().min(1).max(10),
  tone: z.number().min(1).max(10),
  takeaway: z.number().min(1).max(10),
});

const FeedbackSuggestionSchema = z.object({
  category: z.enum(['clarity', 'pacing', 'engagement', 'tone', 'takeaway']),
  suggestion: z.string().min(10).max(500),
  evidenceQuote: z.string().max(300).optional(),
  evidenceTimestamp: z.number().int().min(0).optional(),
  priority: z.enum(['low', 'medium', 'high']),
});

export const FeedbackResponseDataSchema = z.object({
  categories: FeedbackCategoryScoresSchema,
  overallScore: z.number().min(1).max(10),
  suggestions: z.array(FeedbackSuggestionSchema).min(1).max(10),
  summary: z.string().min(20).max(300),
});

export type FeedbackCategoryScores = z.infer<typeof FeedbackCategoryScoresSchema>;
export type FeedbackSuggestion = z.infer<typeof FeedbackSuggestionSchema>;
export type FeedbackResponseData = z.infer<typeof FeedbackResponseDataSchema>;
```

### Example Response

```json
{
  "categories": {
    "clarity": 8.2,
    "pacing": 7.5,
    "engagement": 9.0,
    "tone": 8.5,
    "takeaway": 8.0
  },
  "overallScore": 8.2,
  "suggestions": [
    {
      "category": "pacing",
      "suggestion": "Consider pausing for 2-3 seconds after key points to let them sink in. Several powerful statements were followed immediately by the next thought.",
      "evidenceQuote": "...and so we must remember that love conquers all, which reminds me of another point I wanted to share...",
      "evidenceTimestamp": 423,
      "priority": "high"
    },
    {
      "category": "engagement",
      "suggestion": "Your storytelling is excellent! Consider incorporating one more rhetorical question mid-session to maintain attention during longer teaching portions.",
      "priority": "low"
    },
    {
      "category": "takeaway",
      "suggestion": "Repeat the main action item at the very end. The takeaway was clear at the 25-minute mark but wasn't reinforced in the closing.",
      "evidenceQuote": "...and that's what I want you to remember this week.",
      "evidenceTimestamp": 1523,
      "priority": "medium"
    }
  ],
  "summary": "Strong engagement throughout with excellent storytelling and warm, authentic tone. Consider varying pacing with strategic pauses for even greater impact."
}
```

---

## Environment Variables

```env
# Feedback generation
FEEDBACK_AUTO_GENERATE=true           # Auto-generate for Org Pro plans
FEEDBACK_MODEL=claude-4.5-opus
FEEDBACK_MIN_SEGMENTS=10              # Minimum segments to generate feedback
FEEDBACK_CATEGORIES=clarity,pacing,engagement,tone,takeaway

# Privacy
FEEDBACK_RETENTION_DAYS=365           # How long to keep feedback
```
