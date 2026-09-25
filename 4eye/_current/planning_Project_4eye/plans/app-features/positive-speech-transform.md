# F11 — Positive Speech Transform

> Detect negative/hateful speech in transcripts and generate positive alternative versions. Includes audit log for transparency.

**Status:** Planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md) | [decisions.md](../decisions.md)
**Related:** [F1 — Audio-to-Text](audio-to-text.md) | [C8 — Typed AI Responses](../core/typed-ai-responses.md)

**Vision:** "A world without harmful speech, violence and hatred — a world without conflict over differences in opinion, belief, or background. A world where people better understand each other and different perspectives."

---

## ⚠️ Key Decisions (Do Not Overwrite)

1. **Typed AI Responses** — Detection and transformation use typed response system. See [C8](../core/typed-ai-responses.md)
2. **Two-Stage Pipeline** — Detection first, then transformation (only if flagged)
3. **Audit Log** — All transformations logged for transparency
4. **User Display Options** — Configurable: show transformed only, show both, or show original with warning

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                   POSITIVE SPEECH TRANSFORM PIPELINE                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   Transcript Segment (F1)                                                │
│        │                                                                 │
│        ▼                                                                 │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │  DETECTION LAYER (Claude 4.5 Opus)                                │  │
│   │                                                                    │  │
│   │  Analyzes speech for:                                             │  │
│   │  ├── Intolerance toward others                                     │  │
│   │  ├── Dehumanizing language                                       │  │
│   │  ├── "Us vs them" divisive rhetoric                              │  │
│   │  ├── Calls to exclusion or harm                                  │  │
│   │  └── Unnecessarily harsh judgment                                 │  │
│   │                                                                    │  │
│   │  NOT flagged:                                                     │  │
│   │  ├── Disagreement (normal in discourse)                         │  │
│   │  ├── Strong positions on topics                                 │  │
│   │  ├── Vertical-appropriate concepts (see config)                  │  │
│   │  └── Historical references to conflicts                          │  │
│   │                                                                    │  │
│   │  Output: { flagged: boolean, severity: LOW|MEDIUM|HIGH, reason } │  │
│   └────────────────────────────┬─────────────────────────────────────┘  │
│                                │                                         │
│                ┌───────────────┴───────────────┐                        │
│                │ flagged?                       │                        │
│                ▼ YES                            ▼ NO                     │
│   ┌────────────────────────────┐   ┌───────────────────────────────┐   │
│   │  TRANSFORMATION LAYER      │   │  Pass through unchanged        │   │
│   │  (Claude 4.5 Opus)         │   │  (No log entry created)       │   │
│   │                            │   └───────────────────────────────┘   │
│   │  Generates positive        │                                        │
│   │  alternative while         │                                        │
│   │  preserving:               │                                        │
│   │  ├── Core teaching         │                                        │
│   │  ├── Speaker's intent      │                                        │
│   │  └── Religious context     │                                        │
│   │                            │                                        │
│   └────────────────────────────┘                                        │
│                │                                                         │
│                ▼                                                         │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │  SpeechTransformLog                                               │  │
│   │  ├── originalText: "Those people are enemies of our faith..."    │  │
│   │  ├── transformedText: "While we hold different beliefs, we..."   │  │
│   │  ├── reason: "Dehumanizing language toward other faiths"         │  │
│   │  └── severity: MEDIUM                                            │  │
│   └──────────────────────────────────────────────────────────────────┘  │
│                │                                                         │
│                ▼                                                         │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │  USER DISPLAY OPTIONS (Configurable per Room)                     │  │
│   │                                                                    │  │
│   │  [A] Show transformed only (default for audiences)               │  │
│   │      "While we hold different beliefs, we can still..."          │  │
│   │                                                                    │  │
│   │  [B] Show both with indicator (for hosts)                        │  │
│   │      ⚠️ "Those people are enemies..." → "While we hold..."       │  │
│   │                                                                    │  │
│   │  [C] Show original only with warning (review mode)               │  │
│   │      ⚠️ "Those people are enemies of our faith..."               │  │
│   │                                                                    │  │
│   └──────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Design Decisions

### Core Philosophy

This feature walks a delicate line:

1. **Not censorship** — We're offering a *transformed view*, not removing content
2. **Full transparency** — Hosts see exactly what was changed and why
3. **Audience protection** — Members can choose to see the inclusive version
4. **Religious respect** — We don't flag theological positions, only harmful rhetoric

### What We Transform

| Category | DO Transform | DON'T Transform |
|----------|--------------|-----------------|
| **Language about others** | "Muslims are dangerous" | "Islam teaches differently than we do" |
| **Calls to action** | "Drive them out of our community" | "Hold firm to our beliefs" |
| **Dehumanization** | "They're not really human" | "They're misguided" |
| **Violence** | "They should be destroyed" | "There are consequences for harmful actions" |
| **Exclusion** | "Don't associate with those people" | "Be discerning about influences" |

### Alternatives Considered

| Approach | Description | Pros | Cons | Decision |
|----------|-------------|------|------|----------|
| **Real-time transform** | Transform as speech arrives | Immediate protection | Higher latency, more errors | ❌ Too risky |
| **Post-segment transform** | Transform after each segment confirmed | Quick feedback | Still some delay | ✅ Chosen |
| **Batch transform** | Transform after session ends | Most accurate | No live protection | ❌ Too late |
| **Keyword detection** | Flag based on word lists | Fast, cheap | Too many false positives | ❌ Rejected |
| **AI-only detection** | Claude analyzes context | Best accuracy | Higher cost | ✅ Chosen |
| **Human moderation** | Manual review | Most accurate | Doesn't scale, not real-time | ❌ Rejected |

### Why Claude 4.5 Opus for Both Detection & Transform?

| Requirement | Claude | GPT-5.2 | Gemini |
|-------------|--------|---------|--------|
| Religious nuance | ✅ Best | Good | Good |
| Context sensitivity | ✅ Best | Good | OK |
| Constructive rewriting | ✅ Best | Good | OK |
| Consistent judgment | ✅ Excellent | Good | OK |
| Safety alignment | ✅ Excellent | Good | Good |

**Decision:** Claude 4.5 Opus for both detection and transformation. The cultural nuance required justifies the premium.

### Display Mode Options

| Mode | Who Uses | Shows |
|------|----------|-------|
| **transformed** | Audience members (default) | Transformed text only |
| **comparison** | Hosts, admins | Side-by-side original + transformed |
| **original** | Review mode | Original with warning indicator |

---

## Data Model

### SpeechTransformLog (from C6)
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| segmentId | UUID | FK → TranscriptSegment |
| sessionId | UUID | FK → Session (denormalized for queries) |
| originalText | text | The flagged text |
| transformedText | text | The positive alternative |
| reason | string | Human-readable explanation |
| category | enum | INTOLERANCE, DEHUMANIZATION, VIOLENCE, EXCLUSION, HARSH_JUDGMENT |
| severity | enum | LOW, MEDIUM, HIGH |
| detectionScore | decimal | AI confidence 0-1 |
| modelUsed | string | e.g., "claude-4.5-opus" |
| reviewedBy | UUID? | FK → User (if manually reviewed) |
| reviewStatus | enum? | PENDING, APPROVED, REVERTED |
| createdAt | datetime | |

### TransformCategory (enum)
```typescript
enum TransformCategory {
  INTOLERANCE = 'intolerance',        // Hostility toward other faiths
  DEHUMANIZATION = 'dehumanization',  // Stripping humanity from groups
  VIOLENCE = 'violence',              // Calls to or glorification of harm
  EXCLUSION = 'exclusion',            // "Don't associate with..."
  HARSH_JUDGMENT = 'harsh_judgment',  // Unnecessarily condemning language
}
```

### RoomTransformSettings (Room-level config)
| Field | Type | Notes |
|-------|------|-------|
| roomId | UUID | FK → Room (PK) |
| transformEnabled | boolean | Feature on/off (default: true) |
| displayMode | enum | TRANSFORMED, COMPARISON, ORIGINAL |
| autoTransformThreshold | decimal | Min severity to auto-transform (default: 0.7) |
| notifyHostOnTransform | boolean | Send notification (default: true) |

---

## Project Structure

```
backend/
├── src/
│   └── modules/
│       └── speech-transform/
│           ├── speech-transform.module.ts
│           ├── speech-transform.resolver.ts
│           ├── speech-transform.service.ts
│           ├── entities/
│           │   ├── speech-transform-log.entity.ts
│           │   └── room-transform-settings.entity.ts
│           ├── dto/
│           │   ├── transform-segment.dto.ts
│           │   ├── get-transform-log.dto.ts
│           │   └── update-transform-settings.dto.ts
│           ├── prompts/
│           │   ├── detection.prompt.ts
│           │   └── transformation.prompt.ts
│           └── services/
│               ├── detection.service.ts
│               └── transformation.service.ts

frontend/
├── src/
│   ├── features/
│   │   └── speech-transform/
│   │       ├── components/
│   │       │   ├── TransformIndicator.tsx       # Shows ⚠️ icon when transformed
│   │       │   ├── TransformComparison.tsx      # Side-by-side view
│   │       │   ├── TransformAuditLog.tsx        # Host review dashboard
│   │       │   ├── TransformLogEntry.tsx        # Single log entry
│   │       │   ├── TransformSettings.tsx        # Room settings UI
│   │       │   └── TransformReviewDialog.tsx    # Approve/revert modal
│   │       ├── hooks/
│   │       │   ├── useTransformLog.ts
│   │       │   ├── useTransformSettings.ts
│   │       │   └── useReviewTransform.ts
│   │       └── context/
│   │           └── TransformContext.tsx
```

---

## API Surface

### Queries

```graphql
type Query {
  # Get transform log for a session
  transformLog(
    sessionId: ID!
    severity: [TransformSeverity!]
    category: [TransformCategory!]
    reviewStatus: ReviewStatus
    first: Int
    after: String
  ): TransformLogConnection!
  
  # Get single transform entry
  transformEntry(id: ID!): SpeechTransformLog
  
  # Get transform settings for a room
  roomTransformSettings(roomId: ID!): RoomTransformSettings!
  
  # Get transform stats for a session
  transformStats(sessionId: ID!): TransformStats!
  
  # Get organization-wide transform trends
  orgTransformTrends(
    organizationId: ID!
    period: TrendPeriod!
  ): TransformTrends!
}

type SpeechTransformLog {
  id: ID!
  segment: TranscriptSegment!
  session: Session!
  originalText: String!
  transformedText: String!
  reason: String!
  category: TransformCategory!
  severity: TransformSeverity!
  detectionScore: Float!
  reviewStatus: ReviewStatus
  reviewedBy: User
  createdAt: DateTime!
}

type TransformStats {
  totalSegments: Int!
  transformedCount: Int!
  bySeverity: SeverityBreakdown!
  byCategory: CategoryBreakdown!
}

type SeverityBreakdown {
  low: Int!
  medium: Int!
  high: Int!
}

type RoomTransformSettings {
  roomId: ID!
  transformEnabled: Boolean!
  displayMode: TransformDisplayMode!
  autoTransformThreshold: Float!
  notifyHostOnTransform: Boolean!
}

enum TransformCategory {
  INTOLERANCE
  DEHUMANIZATION
  VIOLENCE
  EXCLUSION
  HARSH_JUDGMENT
}

enum TransformSeverity {
  LOW
  MEDIUM
  HIGH
}

enum TransformDisplayMode {
  TRANSFORMED
  COMPARISON
  ORIGINAL
}

enum ReviewStatus {
  PENDING
  APPROVED
  REVERTED
}
```

### Mutations

```graphql
type Mutation {
  # Update room transform settings
  updateTransformSettings(
    roomId: ID!
    input: UpdateTransformSettingsInput!
  ): RoomTransformSettings!
  
  # Host reviews a transform (approve or revert)
  reviewTransform(
    id: ID!
    action: ReviewAction!
  ): SpeechTransformLog!
  
  # Manually trigger transform on a segment (for testing)
  transformSegment(segmentId: ID!): SpeechTransformLog
  
  # Bulk approve all pending transforms for a session
  approveAllTransforms(sessionId: ID!): Int!
}

input UpdateTransformSettingsInput {
  transformEnabled: Boolean
  displayMode: TransformDisplayMode
  autoTransformThreshold: Float
  notifyHostOnTransform: Boolean
}

enum ReviewAction {
  APPROVE   # Keep the transformation
  REVERT    # Show original instead
}
```

### Subscriptions

```graphql
type Subscription {
  # Real-time notification when a transform occurs
  onTransformApplied(sessionId: ID!): SpeechTransformLog!
}
```

---

## Detection & Transformation Pipeline

### Detection Service

```typescript
// detection.service.ts
@Injectable()
export class DetectionService {
  constructor(
    private aiService: AIService,
  ) {}

  async detectHarmfulContent(
    text: string,
    context: DetectionContext,
  ): Promise<DetectionResult> {
    const prompt = buildDetectionPrompt(text, context);
    
    const result = await this.aiService.generateText(prompt, {
      taskType: 'speech-detection',
      model: 'claude-4.5-opus',
      maxTokens: 500,
      temperature: 0.1,  // Low for consistent detection
      responseFormat: 'json',
    });
    
    const parsed = JSON.parse(result.text);
    
    return {
      flagged: parsed.flagged,
      category: parsed.category,
      severity: parsed.severity,
      reason: parsed.reason,
      detectionScore: parsed.confidence,
    };
  }
}

interface DetectionContext {
  speakerRole?: string;        // "speaker", "host", "guest"
  verticalType?: string;       // "learning", "religion", "education", "professional"
  sessionType?: string;        // "lecture", "sermon", "meeting", "discussion"
}

interface DetectionResult {
  flagged: boolean;
  category?: TransformCategory;
  severity?: TransformSeverity;
  reason?: string;
  detectionScore: number;
}
```

### Detection Prompt

```typescript
// prompts/detection.prompt.ts
export function buildDetectionPrompt(
  text: string, 
  context: DetectionContext,
  verticalConfig: VerticalConfig,
): string {
  // Vertical-specific detection context:
  // - RELIGION: "religious discourse", "other faiths or groups"
  // - EDUCATION: "educational discourse", "other viewpoints or groups"
  // - PROFESSIONAL: "professional discourse", "colleagues or groups"
  const { discourseType, harmContext, acceptableContent } = verticalConfig.prompts.speechTransform;

  return `
You are an expert in ${discourseType} analysis. Analyze the following speech segment for potentially harmful content.

CONTEXT:
- Speaker role: ${context.speakerRole || 'unknown'}
- Vertical: ${context.verticalType || 'unspecified'}
- Session type: ${context.sessionType || 'session'}

TEXT TO ANALYZE:
"${text}"

DETECTION CATEGORIES:
1. INTOLERANCE — Hostility, hatred, or contempt toward ${harmContext}
2. DEHUMANIZATION — Language that strips humanity from people or groups
3. VIOLENCE — Calls to harm, glorification of violence, or threats
4. EXCLUSION — Calls to shun, isolate, or not associate with groups
5. HARSH_JUDGMENT — Unnecessarily cruel or condemning language

WHAT IS NOT HARMFUL (do not flag):
${acceptableContent}
- Strong but respectful critique of ideas
- Calls to avoid certain behaviors (not people)

RESPOND WITH JSON:
{
  "flagged": true/false,
  "category": "INTOLERANCE" | "DEHUMANIZATION" | "VIOLENCE" | "EXCLUSION" | "HARSH_JUDGMENT" | null,
  "severity": "LOW" | "MEDIUM" | "HIGH" | null,
  "reason": "Brief explanation of why flagged (or null if not flagged)",
  "confidence": 0.0-1.0
}

SEVERITY GUIDE:
- LOW: Mildly divisive language, easily softened
- MEDIUM: Clearly negative rhetoric about a group
- HIGH: Dehumanization, violence advocacy, or explicit hate
`.trim();
}
```

### Transformation Service

```typescript
// transformation.service.ts
@Injectable()
export class TransformationService {
  constructor(
    private aiService: AIService,
    @InjectRepository(SpeechTransformLog)
    private transformLogRepo: Repository<SpeechTransformLog>,
  ) {}

  async transformText(
    text: string,
    detection: DetectionResult,
    context: TransformContext,
  ): Promise<string> {
    const prompt = buildTransformationPrompt(text, detection, context);
    
    const result = await this.aiService.generateText(prompt, {
      taskType: 'positive-transform',
      model: 'claude-4.5-opus',
      maxTokens: 500,
      temperature: 0.3,  // Some creativity for natural phrasing
    });
    
    return result.text.trim();
  }

  async processSegment(
    segment: TranscriptSegment,
    roomSettings: RoomTransformSettings,
  ): Promise<SpeechTransformLog | null> {
    // Skip if disabled
    if (!roomSettings.transformEnabled) return null;
    
    // Detect
    const verticalConfig = this.verticalConfigService.getConfig(
      segment.session.organization.verticalType
    );
    const detection = await this.detectionService.detectHarmfulContent(
      segment.text,
      { verticalType: segment.session.organization.verticalType },
      verticalConfig,
    );
    
    // Skip if not flagged or below threshold
    if (!detection.flagged || detection.detectionScore < roomSettings.autoTransformThreshold) {
      return null;
    }
    
    // Transform
    const transformedText = await this.transformText(
      segment.text,
      detection,
      { preserveLength: true },
    );
    
    // Log
    const log = this.transformLogRepo.create({
      segmentId: segment.id,
      sessionId: segment.transcript.sessionId,
      originalText: segment.text,
      transformedText,
      reason: detection.reason,
      category: detection.category,
      severity: detection.severity,
      detectionScore: detection.detectionScore,
      modelUsed: 'claude-4.5-opus',
      reviewStatus: 'PENDING',
    });
    
    const saved = await this.transformLogRepo.save(log);
    
    // Notify via subscription
    this.pubSub.publish('onTransformApplied', { 
      onTransformApplied: saved,
      sessionId: segment.transcript.sessionId,
    });
    
    // Notify host if enabled
    if (roomSettings.notifyHostOnTransform) {
      await this.notificationService.notifyHost(
        segment.session.roomId,
        `Speech transformed: ${detection.reason}`,
      );
    }
    
    return saved;
  }
}
```

### Transformation Prompt

```typescript
// prompts/transformation.prompt.ts
export function buildTransformationPrompt(
  text: string,
  detection: DetectionResult,
  context: TransformContext,
  verticalConfig: VerticalConfig,
): string {
  // Vertical-specific transformation guidance:
  // - RELIGION: "religious communicator", "core religious message"
  // - EDUCATION: "educator", "core educational message"
  // - PROFESSIONAL: "professional communicator", "core business message"
  const { communicatorRole, messageType } = verticalConfig.prompts.speechTransform;

  return `
You are a skilled ${communicatorRole}. Rewrite the following text to remove harmful content while preserving the ${messageType}.

ORIGINAL TEXT:
"${text}"

ISSUE DETECTED:
- Category: ${detection.category}
- Severity: ${detection.severity}
- Reason: ${detection.reason}

TRANSFORMATION GUIDELINES:
1. Preserve the speaker's core message
2. Remove dehumanizing, exclusionary, or violent language
3. Replace "us vs them" with inclusive framing
4. Maintain similar length and tone (minus the harmful parts)
5. Keep the substantive content
6. Use affirming rather than condemning language where possible

EXAMPLES:
- "Those people are enemies" → "While we hold different views, we can respect each other"
- "Don't associate with them" → "Be mindful of the influences in your life"
- "They deserve punishment" → "Consequences follow our choices"

Write ONLY the transformed text, nothing else:
`.trim();
}
```

---

## Integration with Transcript Display

```typescript
// hooks/useTranscriptWithTransforms.ts
export function useTranscriptWithTransforms(sessionId: string) {
  const { segments } = useTranscript(sessionId);
  const { transformLog } = useTransformLog(sessionId);
  const { settings } = useTransformSettings();
  
  // Build lookup map: segmentId → transform
  const transformMap = useMemo(() => {
    const map = new Map<string, SpeechTransformLog>();
    transformLog.forEach(t => map.set(t.segment.id, t));
    return map;
  }, [transformLog]);
  
  // Merge segments with transforms based on display mode
  const displaySegments = useMemo(() => {
    return segments.map(segment => {
      const transform = transformMap.get(segment.id);
      
      if (!transform) {
        return { ...segment, isTransformed: false };
      }
      
      switch (settings.displayMode) {
        case 'TRANSFORMED':
          return {
            ...segment,
            text: transform.transformedText,
            isTransformed: true,
            transform,
          };
        case 'COMPARISON':
          return {
            ...segment,
            originalText: segment.text,
            text: transform.transformedText,
            isTransformed: true,
            transform,
          };
        case 'ORIGINAL':
        default:
          return {
            ...segment,
            isTransformed: true,
            transform,
          };
      }
    });
  }, [segments, transformMap, settings.displayMode]);
  
  return { segments: displaySegments };
}
```

---

## Frontend Components

### TransformIndicator

```typescript
// components/TransformIndicator.tsx
export function TransformIndicator({ transform }: { transform: SpeechTransformLog }) {
  const severityColors = {
    LOW: 'info',
    MEDIUM: 'warning',
    HIGH: 'error',
  };

  return (
    <Tooltip title={`Transformed: ${transform.reason}`}>
      <Badge
        badgeContent={<AutoFixHighIcon fontSize="small" />}
        color={severityColors[transform.severity]}
        sx={{ cursor: 'pointer' }}
      >
        <Box component="span" sx={{ cursor: 'help' }}>
          ⚠️
        </Box>
      </Badge>
    </Tooltip>
  );
}
```

### TransformComparison

```typescript
// components/TransformComparison.tsx
export function TransformComparison({ transform }: { transform: SpeechTransformLog }) {
  return (
    <Box sx={{ display: 'flex', gap: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
      {/* Original */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="caption" color="error.main" fontWeight={600}>
          Original
        </Typography>
        <Typography
          variant="body2"
          sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
        >
          {transform.originalText}
        </Typography>
      </Box>
      
      <Divider orientation="vertical" flexItem />
      
      {/* Transformed */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="caption" color="success.main" fontWeight={600}>
          Transformed
        </Typography>
        <Typography variant="body2">
          {transform.transformedText}
        </Typography>
      </Box>
    </Box>
  );
}
```

### TransformAuditLog (Host Dashboard)

```typescript
// components/TransformAuditLog.tsx
export function TransformAuditLog({ sessionId }: { sessionId: string }) {
  const { transformLog, isLoading, stats } = useTransformLog(sessionId);
  const [reviewTransform] = useReviewTransform();
  const [filter, setFilter] = useState<TransformSeverity | null>(null);

  const filteredLog = useMemo(() => {
    if (!filter) return transformLog;
    return transformLog.filter(t => t.severity === filter);
  }, [transformLog, filter]);

  if (isLoading) return <Skeleton />;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          Speech Transform Log ({stats.transformedCount} transformations)
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip
            label={`High: ${stats.bySeverity.high}`}
            color="error"
            variant={filter === 'HIGH' ? 'filled' : 'outlined'}
            onClick={() => setFilter(filter === 'HIGH' ? null : 'HIGH')}
          />
          <Chip
            label={`Medium: ${stats.bySeverity.medium}`}
            color="warning"
            variant={filter === 'MEDIUM' ? 'filled' : 'outlined'}
            onClick={() => setFilter(filter === 'MEDIUM' ? null : 'MEDIUM')}
          />
          <Chip
            label={`Low: ${stats.bySeverity.low}`}
            color="info"
            variant={filter === 'LOW' ? 'filled' : 'outlined'}
            onClick={() => setFilter(filter === 'LOW' ? null : 'LOW')}
          />
        </Box>
      </Box>
      
      {filteredLog.length === 0 ? (
        <Alert severity="success">
          No speech transformations in this session.
        </Alert>
      ) : (
        <Stack spacing={2}>
          {filteredLog.map((transform) => (
            <TransformLogEntry
              key={transform.id}
              transform={transform}
              onApprove={() => reviewTransform(transform.id, 'APPROVE')}
              onRevert={() => reviewTransform(transform.id, 'REVERT')}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}
```

### TransformLogEntry

```typescript
// components/TransformLogEntry.tsx
export function TransformLogEntry({
  transform,
  onApprove,
  onRevert,
}: Props) {
  const categoryLabels = {
    INTOLERANCE: 'Intolerance',
    DEHUMANIZATION: 'Dehumanization',
    VIOLENCE: 'Violence',
    EXCLUSION: 'Exclusion',
    HARSH_JUDGMENT: 'Harsh Judgment',
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
              label={transform.severity}
              size="small"
              color={
                transform.severity === 'HIGH' ? 'error' :
                transform.severity === 'MEDIUM' ? 'warning' : 'info'
              }
            />
            <Chip
              label={categoryLabels[transform.category]}
              size="small"
              variant="outlined"
            />
          </Box>
          
          <Typography variant="caption" color="text.secondary">
            {formatTime(transform.createdAt)}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Reason:</strong> {transform.reason}
        </Typography>
        
        <TransformComparison transform={transform} />
        
        {transform.reviewStatus === 'PENDING' && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
            <Button
              size="small"
              color="success"
              startIcon={<CheckIcon />}
              onClick={onApprove}
            >
              Approve
            </Button>
            <Button
              size="small"
              color="error"
              startIcon={<UndoIcon />}
              onClick={onRevert}
            >
              Revert to Original
            </Button>
          </Box>
        )}
        
        {transform.reviewStatus !== 'PENDING' && (
          <Chip
            label={transform.reviewStatus === 'APPROVED' ? 'Approved' : 'Reverted'}
            size="small"
            color={transform.reviewStatus === 'APPROVED' ? 'success' : 'default'}
            sx={{ mt: 2 }}
          />
        )}
      </CardContent>
    </Card>
  );
}
```

---

## Access Control

| Role | View Transforms | Configure | Review |
|------|-----------------|-----------|--------|
| Guest | ❌ | ❌ | ❌ |
| Member | ✓ (sees transformed text) | ❌ | ❌ |
| **Host** | ✓ (full log) | ✓ (own rooms) | ✓ |
| **Org Admin** | ✓ (all) | ✓ | ✓ |

---

## Cost Analysis

| Component | Cost | Notes |
|-----------|------|-------|
| **Detection** | $0.003/segment | Claude 4.5: ~100 tokens in, ~50 out |
| **Transformation** | $0.005/flagged segment | Claude 4.5: ~200 tokens in, ~100 out |
| **Per session** | ~$0.15 | Assuming 50 segments, 10% flagged |

**Monthly at scale:**
- 100 orgs × 30 sessions × $0.15 = **$450/month**

**Optimization:** Only run detection on segments with > 50 words (skip short acknowledgments).

---

## Dependencies

| Dependency | Direction | Notes |
|------------|-----------|-------|
| **C5 (AI Provider)** | ← uses | Claude 4.5 Opus for detection + transform |
| **F1 (Audio-to-Text)** | ← uses | TranscriptSegment data |
| **C2 (Realtime)** | ← uses | Pub/Sub for transform notifications |
| **W6 (Host Dashboard)** | uses → | Transform audit log |
| **Compliance (X1)** | related | Audit log for compliance |

---

## Ethical Considerations

### Transparency
- All transformations are logged
- Hosts have full access to original + transformed
- Members can request original if needed (admin approval)

### Consent
- Room-level toggle (can disable entirely)
- Clear indication when viewing transformed content
- Explanation of why transformation exists in onboarding

### False Positives
- Review workflow for hosts to revert false positives
- Feedback loop to improve detection (not MVP)
- Conservative threshold by default (0.7 confidence)

### Vertical Sensitivity
- Prompt explicitly excludes normal discourse for each vertical
- Different handling based on vertical context
- No automatic correction of controversial but non-harmful positions

---

## Acceptance Criteria

### MVP (Phase 1)
- [ ] Detection runs on each transcript segment via Claude 4.5
- [ ] Transformation generates positive alternative
- [ ] SpeechTransformLog stores all transforms with metadata
- [ ] Host dashboard shows audit log with filter by severity
- [ ] Host can approve or revert transformations
- [ ] Room settings to enable/disable and set display mode
- [ ] Real-time subscription for transform events
- [ ] Members see transformed text by default

### Phase 2
- [ ] Organization-wide transform trends/analytics
- [ ] Custom sensitivity rules per room/org
- [ ] Detection confidence calibration based on host feedback
- [ ] Export audit log for compliance
- [ ] Bulk review actions

---

## Response Types (Draft)

> These types define the AI response structure for the two-stage pipeline. See [C8 — Typed AI Responses](../core/typed-ai-responses.md) for the full pattern.

### Stage 1: SpeechDetectionResponseData

```typescript
// libs/4eye-types/ai/speech-transform/SpeechDetectionResponse.ts

/**
 * AI-generated speech detection response.
 * 
 * Analyze speech for harmful patterns that go beyond normal discourse.
 * 
 * FLAG these patterns:
 * - Intolerance toward other faiths/groups
 * - Dehumanizing language ("they're not really human")
 * - "Us vs them" divisive rhetoric
 * - Calls to exclusion or harm
 * - Unnecessarily harsh judgment
 * 
 * DO NOT FLAG:
 * - Disagreement (normal in religious discourse)
 * - Strong theological positions
 * - Historical references to conflicts
 * - "We believe differently" statements
 * 
 * @interface SpeechDetectionResponseData
 */
export interface SpeechDetectionResponseData {
  /**
   * Whether the speech contains harmful patterns requiring transformation.
   * 
   * @example true
   * @example false
   */
  flagged: boolean;

  /**
   * Severity level of the detected pattern.
   * Only meaningful when flagged is true.
   * 
   * LOW: Mild exclusion, subtle judgment
   * MEDIUM: Clear dehumanization, direct exclusion
   * HIGH: Violence, extreme dehumanization
   * 
   * @example "MEDIUM"
   */
  severity: 'LOW' | 'MEDIUM' | 'HIGH';

  /**
   * Human-readable explanation of what was detected.
   * Used for host review and audit log.
   * 
   * @example "Dehumanizing language toward members of other faiths"
   * @example "Call to social exclusion of a group"
   */
  reason: string;

  /**
   * The category of harmful speech detected.
   * 
   * INTOLERANCE: Hostility toward other faiths/groups
   * DEHUMANIZATION: Stripping humanity from groups
   * VIOLENCE: Calls to or glorification of harm
   * EXCLUSION: "Don't associate with..." rhetoric
   * HARSH_JUDGMENT: Unnecessarily condemning language
   * 
   * @example "DEHUMANIZATION"
   */
  category: 'INTOLERANCE' | 'DEHUMANIZATION' | 'VIOLENCE' | 'EXCLUSION' | 'HARSH_JUDGMENT';

  /**
   * Confidence score for the detection (0-1).
   * Used for threshold filtering.
   * 
   * @example 0.85
   */
  detectionScore: number;
}
```

### Stage 2: SpeechTransformResponseData

```typescript
// libs/4eye-types/ai/speech-transform/SpeechTransformResponse.ts

/**
 * AI-generated positive speech transformation response.
 * 
 * Transform flagged speech into a positive alternative that:
 * - Preserves the speaker's core teaching/intent
 * - Maintains the religious/spiritual context
 * - Removes harmful rhetoric while keeping the message
 * - Uses inclusive, bridge-building language
 * 
 * NEVER:
 * - Change the speaker's theological position
 * - Add content they didn't mean to convey
 * - Make the transformation sound sarcastic
 * 
 * @interface SpeechTransformResponseData
 */
export interface SpeechTransformResponseData {
  /**
   * The transformed version of the speech.
   * Should flow naturally and preserve the speaker's voice.
   * 
   * @example "While we hold different beliefs, we can still show respect for one another as fellow human beings."
   */
  transformedText: string;

  /**
   * Brief note on the transformation approach.
   * Helps hosts understand what changed.
   * 
   * @example "Replaced dehumanizing 'enemies' framing with recognition of shared humanity"
   */
  transformationNote: string;
}
```

### Zod Schemas

```typescript
// libs/4eye-types/ai/speech-transform/SpeechDetectionResponse.schema.ts

import { z } from 'zod';

export const SpeechDetectionResponseDataSchema = z.object({
  flagged: z.boolean(),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  reason: z.string().max(500),
  category: z.enum([
    'INTOLERANCE',
    'DEHUMANIZATION', 
    'VIOLENCE',
    'EXCLUSION',
    'HARSH_JUDGMENT'
  ]),
  detectionScore: z.number().min(0).max(1),
});

export type SpeechDetectionResponseData = z.infer<typeof SpeechDetectionResponseDataSchema>;
```

```typescript
// libs/4eye-types/ai/speech-transform/SpeechTransformResponse.schema.ts

import { z } from 'zod';

export const SpeechTransformResponseDataSchema = z.object({
  transformedText: z.string().min(1),
  transformationNote: z.string().max(300),
});

export type SpeechTransformResponseData = z.infer<typeof SpeechTransformResponseDataSchema>;
```

### Example Responses

**Detection (flagged):**
```json
{
  "flagged": true,
  "severity": "MEDIUM",
  "reason": "Dehumanizing language toward members of other faiths",
  "category": "DEHUMANIZATION",
  "detectionScore": 0.87
}
```

**Detection (not flagged):**
```json
{
  "flagged": false,
  "severity": "LOW",
  "reason": "",
  "category": "INTOLERANCE",
  "detectionScore": 0.12
}
```

**Transformation:**
```json
{
  "transformedText": "While we hold different beliefs than those of other faiths, we can recognize our shared humanity and treat one another with dignity.",
  "transformationNote": "Replaced 'enemies of our faith' framing with recognition of shared humanity while preserving the speaker's distinction between belief systems"
}
```

---

## Environment Variables

```env
# Speech Transform
TRANSFORM_ENABLED=true
TRANSFORM_MODEL=claude-4.5-opus
TRANSFORM_DETECTION_THRESHOLD=0.7
TRANSFORM_DEFAULT_DISPLAY_MODE=transformed
TRANSFORM_NOTIFY_HOST=true
```
