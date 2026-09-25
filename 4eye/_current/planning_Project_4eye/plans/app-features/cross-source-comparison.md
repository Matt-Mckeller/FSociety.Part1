# F10 — Cross-Source Comparison

> Optional comparative perspective mode showing how different sources discuss similar topics. This is for Religion Mode only, which is likely a seperate white label version of this application, however some aspects may apply to Religious study in educational environments.

**Status:** Planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md) | [decisions.md](../decisions.md)
**Related:** [F6 — Summaries](summaries.md) | [F7 — Recaps](recaps.md) | [C8 — Typed AI Responses](../core/typed-ai-responses.md)

**Vision:** "A world where people better understand each other and different perspectives."

**User Story:** "A user enables comparative perspective mode and sees how a similar topic is discussed by other sources"

> **Important:** This feature is available to users who opt in. The focus is on enhancing understanding within one's own context first.

---

## ⚠️ Key Decisions (Do Not Overwrite)

1. **Typed AI Responses** — Comparison generation uses typed response system. See [C8](../core/typed-ai-responses.md)
2. **Opt-In Only** — Not default; users explicitly enable
3. **Cross-Vertical** — Different implementations per vertical (religion, edu, professional)

---

## Vertical Implementations

| Vertical | Comparison Type | Example |
|----------|-----------------|---------|
| **Education** | Cross-discipline synthesis | How physics and philosophy explain causation |
| **Professional** | Cross-industry benchmarking | How tech and finance approach remote work |
| **Learning** | Cross-source perspective | How different speakers discuss the same concept |
| **Religion** | Cross-faith comparison | How Buddhism and Christianity discuss forgiveness |

For Religion-specific implementation details, see [verticals/religion.md](../verticals/religion.md).

---

## Architecture Overview (Religion Vertical Example)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      CROSS-SOURCE COMPARISON PIPELINE                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │  User Enables Comparative Mode                                    │  │
│   │  ⚙️ Settings > "Show how other sources discuss these topics"     │  │
│   │  ※ Explicit opt-in, not default                                  │  │
│   └──────────────────────────────────────────────────────────────────┘  │
│                │                                                         │
│                ▼                                                         │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │  TOPIC EXTRACTION (from Recap/Summary)                           │  │
│   │                                                                    │  │
│   │  Session topics already extracted in F6/F7:                      │  │
│   │  ├── "Forgiveness"                                               │  │
│   │  ├── "The afterlife"                                             │  │
│   │  ├── "Prayer and meditation"                                     │  │
│   │  └── "Love thy neighbor"                                         │  │
│   └────────────────────────────┬─────────────────────────────────────┘  │
│                                │                                         │
│                                ▼                                         │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │  COMPARISON GENERATION (GPT-5.2)                                  │  │
│   │                                                                    │  │
│   │  For each extractable topic:                                      │  │
│   │                                                                    │  │
│   │  "How do major world religions approach [forgiveness]?"          │  │
│   │                                                                    │  │
│   │  Output: Structured perspectives from 3-5 sources                │  │
│   │                                                                    │  │
│   └────────────────────────────┬─────────────────────────────────────┘  │
│                                │                                         │
│                                ▼                                         │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │  ComparisonResult                                                 │  │
│   │                                                                    │  │
│   │  Topic: "Forgiveness"                                            │  │
│   │                                                                    │  │
│   │  ┌────────────────────────────────────────────────────────────┐  │  │
│   │  │ Christianity                                                │  │  │
│   │  │ "Forgiveness is central to Christian teaching..."          │  │  │
│   │  │ Key texts: Matthew 6:14-15, Lord's Prayer                  │  │  │
│   │  └────────────────────────────────────────────────────────────┘  │  │
│   │                                                                    │  │
│   │  ┌────────────────────────────────────────────────────────────┐  │  │
│   │  │ Islam                                                       │  │  │
│   │  │ "In Islam, Allah is Al-Ghaffar (The Forgiving)..."         │  │  │
│   │  │ Key texts: Quran 39:53, 42:40                              │  │  │
│   │  └────────────────────────────────────────────────────────────┘  │  │
│   │                                                                    │  │
│   │  ┌────────────────────────────────────────────────────────────┐  │  │
│   │  │ Judaism                                                     │  │  │
│   │  │ "Teshuvah (repentance) and forgiveness are..."             │  │  │
│   │  │ Key texts: Leviticus 19:18, Yom Kippur traditions          │  │  │
│   │  └────────────────────────────────────────────────────────────┘  │  │
│   │                                                                    │  │
│   │  ┌────────────────────────────────────────────────────────────┐  │  │
│   │  │ Buddhism                                                    │  │  │
│   │  │ "Forgiveness is tied to the concept of letting go..."      │  │  │
│   │  │ Key texts: Dhammapada, Metta Sutta                         │  │  │
│   │  └────────────────────────────────────────────────────────────┘  │  │
│   │                                                                    │  │
│   │  ⚠️ AI DISCLAIMER                                                │  │
│   │  "This comparison is AI-generated for educational purposes.     │  │
│   │   Consult authoritative sources for accuracy."                  │  │
│   │                                                                    │  │
│   └──────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Design Decisions

### Core Philosophy

1. **Understanding, not debate** — Show perspectives neutrally, don't rank or judge them
2. **Educational, not authoritative** — Always disclaim AI limitations
3. **Opt-in only** — Never shown by default; user must enable
4. **Complement, not compete** — Focus remains on user's own faith first
5. **Respectful representation** — Present each faith charitably and accurately

### What Topics Are Suitable For Comparison

| Suitable Topics | NOT Suitable |
|-----------------|--------------|
| Universal themes (love, forgiveness, peace) | Specific doctrinal debates |
| Spiritual practices (prayer, meditation) | Controversial interfaith conflicts |
| Moral teachings (kindness, honesty) | Superiority claims |
| Life events (death, marriage, community) | Proselytizing content |
| Shared values (service, charity) | Historical grievances |

### Faiths Included

| Primary Tier | Secondary Tier | Future Expansion |
|--------------|----------------|------------------|
| Christianity | Hinduism | Sikhism |
| Islam | Buddhism | Jainism |
| Judaism | | Baha'i |
| | | Indigenous traditions |

**Philosophy:** Start with Abrahamic faiths (most 4eye users) + major Eastern traditions. Expand based on user demand.

### Alternatives Considered

| Approach | Description | Pros | Cons | Decision |
|----------|-------------|------|------|----------|
| **Live comparison** | Generate during session | Immediate | Distracting, costly | ❌ |
| **Post-session** | Generate after session ends | Thoughtful, non-intrusive | User must return | ✅ Chosen |
| **On-demand only** | User explicitly requests | Full control | May forget feature exists | ✅ Option |
| **Pre-built library** | Static content per topic | Fast, accurate | Limited topics, stale | ❌ |
| **AI-generated** | GPT generates per topic | Flexible, comprehensive | Accuracy concerns | ✅ Chosen (with disclaimers) |

### Why GPT-5.2 for Comparisons?

| Requirement | GPT-5.2 | Claude 4.5 | Gemini 2 |
|-------------|---------|------------|----------|
| Religious knowledge | ✅ Excellent | Good | Good |
| Neutral presentation | ✅ Good | ✅ Better | OK |
| Multi-faith accuracy | ✅ Best | Good | OK |
| Structured output | ✅ Excellent | Good | Good |

**Decision:** GPT-5.2 for breadth of knowledge across verticals. Claude considered but GPT's training data includes more diverse source material.

---

## Data Model

### ComparisonResult (from C6, extended)
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| sessionId | UUID | FK → Session |
| userId | UUID | FK → User (who requested) |
| topic | string | Extracted topic |
| currentFaith | string | User's/session's faith context |
| perspectives | FaithPerspective[] | JSON array |
| comparisonType | enum | TOPIC, SCRIPTURE, PRACTICE |
| modelUsed | string | e.g., "gpt-5.2" |
| generatedAt | datetime | |

### FaithPerspective (embedded JSON)
```typescript
interface FaithPerspective {
  faith: string;              // "Christianity", "Islam", etc.
  tradition?: string;         // "Catholic", "Sunni" (optional specificity)
  summary: string;            // 2-3 sentence overview
  keyTexts: string[];         // Scripture references
  practices?: string[];       // Related practices
  commonGround: string;       // What's shared with user's faith
  uniqueAspects: string;      // What's distinctive
}
```

### UserComparisonPreferences
| Field | Type | Notes |
|-------|------|-------|
| userId | UUID | FK → User (PK) |
| comparativeEnabled | boolean | Feature opt-in (default: false) |
| faithsToShow | string[] | Which faiths to include |
| autoGenerateAfterSession | boolean | Auto-generate on session end |
| lastViewedAt | datetime? | |

---

## Project Structure

```
backend/
├── src/
│   └── modules/
│       └── comparison/
│           ├── comparison.module.ts
│           ├── comparison.resolver.ts
│           ├── comparison.service.ts
│           ├── entities/
│           │   ├── comparison-result.entity.ts
│           │   └── user-comparison-preferences.entity.ts
│           ├── dto/
│           │   ├── generate-comparison.dto.ts
│           │   ├── get-comparisons.dto.ts
│           │   └── update-preferences.dto.ts
│           ├── prompts/
│           │   └── faith-comparison.prompt.ts
│           └── services/
│               └── topic-matcher.service.ts

frontend/
├── src/
│   ├── features/
│   │   └── comparison/
│   │       ├── components/
│   │       │   ├── ComparisonPanel.tsx           # Post-session panel
│   │       │   ├── ComparisonToggle.tsx          # Enable/disable toggle
│   │       │   ├── FaithPerspectiveCard.tsx      # Single faith view
│   │       │   ├── ComparisonDisclaimer.tsx      # AI disclaimer
│   │       │   ├── TopicComparisonView.tsx       # Full comparison
│   │       │   ├── FaithSelector.tsx             # Choose faiths to show
│   │       │   └── ComparisonPreferences.tsx     # User settings
│   │       ├── hooks/
│   │       │   ├── useComparisons.ts
│   │       │   ├── useComparisonPreferences.ts
│   │       │   └── useGenerateComparison.ts
│   │       └── context/
│   │           └── ComparisonContext.tsx
```

---

## API Surface

### Queries

```graphql
type Query {
  # Get comparisons for a session
  sessionComparisons(
    sessionId: ID!
    topic: String
  ): [ComparisonResult!]!
  
  # Get single comparison
  comparison(id: ID!): ComparisonResult
  
  # Get user's comparison preferences
  myComparisonPreferences: UserComparisonPreferences!
  
  # Get available topics for comparison from a session
  comparableTopics(sessionId: ID!): [ComparableTopic!]!
}

type ComparisonResult {
  id: ID!
  session: Session!
  topic: String!
  currentFaith: String!
  perspectives: [FaithPerspective!]!
  comparisonType: ComparisonType!
  generatedAt: DateTime!
}

type FaithPerspective {
  faith: String!
  tradition: String
  summary: String!
  keyTexts: [String!]!
  practices: [String!]
  commonGround: String!
  uniqueAspects: String!
}

type ComparableTopic {
  topic: String!
  relevance: Float!          # How relevant to the session
  alreadyGenerated: Boolean! # Has comparison been created?
}

type UserComparisonPreferences {
  comparativeEnabled: Boolean!
  faithsToShow: [String!]!
  autoGenerateAfterSession: Boolean!
}

enum ComparisonType {
  TOPIC         # General topic (forgiveness, prayer)
  SCRIPTURE     # Scripture passage interpretation
  PRACTICE      # Religious practice comparison
}
```

### Mutations

```graphql
type Mutation {
  # Generate comparison for a topic
  generateComparison(input: GenerateComparisonInput!): ComparisonResult!
  
  # Update user's comparison preferences
  updateComparisonPreferences(
    input: UpdateComparisonPreferencesInput!
  ): UserComparisonPreferences!
  
  # Delete a comparison
  deleteComparison(id: ID!): Boolean!
}

input GenerateComparisonInput {
  sessionId: ID!
  topic: String!
  faithsToInclude: [String!]   # Override user preferences
  comparisonType: ComparisonType = TOPIC
}

input UpdateComparisonPreferencesInput {
  comparativeEnabled: Boolean
  faithsToShow: [String!]
  autoGenerateAfterSession: Boolean
}
```

---

## Comparison Generation Service

```typescript
// comparison.service.ts
@Injectable()
export class ComparisonService {
  constructor(
    @InjectRepository(ComparisonResult)
    private comparisonRepo: Repository<ComparisonResult>,
    @InjectRepository(UserComparisonPreferences)
    private prefsRepo: Repository<UserComparisonPreferences>,
    private recapService: RecapService,
    private aiService: AIService,
  ) {}

  async generateComparison(
    input: GenerateComparisonInput,
    userId: string,
  ): Promise<ComparisonResult> {
    const { sessionId, topic, faithsToInclude, comparisonType } = input;
    
    // Get user preferences
    const prefs = await this.prefsRepo.findOne({ where: { userId } });
    if (!prefs?.comparativeEnabled) {
      throw new ForbiddenException('Comparative mode not enabled');
    }
    
    // Determine faiths to include
    const faiths = faithsToInclude || prefs.faithsToShow || [
      'Christianity', 'Islam', 'Judaism', 'Buddhism', 'Hinduism'
    ];
    
    // Get session context
    const session = await this.sessionService.getSession(sessionId);
    const verticalConfig = this.verticalConfigService.getConfig(
      session.organization.verticalType
    );
    const currentSource = session.metadata?.primarySource || verticalConfig.defaultSource;
    
    // Generate comparison (using vertical-specific prompt)
    const prompt = buildSourceComparisonPrompt({
      topic,
      currentFaith,
      faithsToCompare: faiths.filter(f => f !== currentFaith),
      comparisonType,
    });
    
    const result = await this.aiService.generateText(prompt, {
      taskType: 'comparison',
      model: 'gpt-5.2',
      maxTokens: 2000,
      temperature: 0.3,
      responseFormat: 'json',
    });
    
    const parsed = JSON.parse(result.text);
    
    // Create comparison record
    const comparison = this.comparisonRepo.create({
      sessionId,
      userId,
      topic,
      currentFaith,
      perspectives: parsed.perspectives,
      comparisonType,
      modelUsed: 'gpt-5.2',
    });
    
    return this.comparisonRepo.save(comparison);
  }

  async getComparableTopics(sessionId: string): Promise<ComparableTopic[]> {
    // Get topics from recap/summary
    const recap = await this.recapService.getRecap(sessionId);
    
    if (!recap) {
      return [];
    }
    
    // Extract unique topics from highlights
    const topics = new Set<string>();
    recap.highlights.forEach(h => {
      h.topics.forEach(t => topics.add(t));
    });
    
    // Get existing comparisons
    const existing = await this.comparisonRepo.find({ where: { sessionId } });
    const existingTopics = new Set(existing.map(e => e.topic.toLowerCase()));
    
    return Array.from(topics).map(topic => ({
      topic,
      relevance: this.calculateTopicRelevance(topic, recap),
      alreadyGenerated: existingTopics.has(topic.toLowerCase()),
    }));
  }
}
```

### Comparison Prompt

```typescript
// prompts/faith-comparison.prompt.ts
export function buildFaithComparisonPrompt(params: {
  topic: string;
  currentFaith: string;
  faithsToCompare: string[];
  comparisonType: ComparisonType;
}): string {
  // Vertical-specific comparison context:
  // - RELIGION: "comparative religion scholar", "faith traditions"
  // - EDUCATION: "academic researcher", "scholarly perspectives"
  // - PROFESSIONAL: "industry analyst", "methodologies and frameworks"
  const { scholarContext, sourcesLabel, citationLabel } = verticalConfig.prompts.comparison;

  return `
You are a ${scholarContext} providing educational content about how different ${sourcesLabel} approach common topics.

TASK: Create a balanced, respectful comparison of how different sources approach the topic.

TOPIC: "${params.topic}"
PRIMARY SOURCE CONTEXT: ${params.currentSource}
SOURCES TO COMPARE: ${params.sourcesToCompare.join(', ')}
COMPARISON TYPE: ${params.comparisonType}

GUIDELINES:
1. Present each source charitably and accurately
2. Use neutral, academic language
3. Include specific ${citationLabel} where relevant
4. Highlight both common ground AND unique perspectives
5. Do not rank, judge, or declare any source "better"
6. Acknowledge internal diversity within sources
7. Keep each perspective concise (2-3 sentences for summary)

RESPOND WITH JSON:
{
  "topic": "${params.topic}",
  "introduction": "A brief introduction to how this topic appears across religions...",
  "perspectives": [
    {
      "faith": "Christianity",
      "tradition": null,  // or "Catholic", "Protestant", etc. if relevant
      "summary": "In Christianity, forgiveness is central to salvation. Jesus teaches that forgiving others is a prerequisite for receiving God's forgiveness.",
      "keyTexts": ["Matthew 6:14-15", "Lord's Prayer", "Parable of the Unforgiving Servant"],
      "practices": ["Confession", "Communion as reconciliation"],
      "commonGround": "Shared emphasis on divine and human forgiveness",
      "uniqueAspects": "Forgiveness tied to Christ's sacrifice and atonement"
    },
    {
      "faith": "Islam",
      "tradition": null,
      "summary": "Allah is Al-Ghaffar (The Forgiving). Muslims believe God forgives all sins if one sincerely repents. Forgiving others is highly virtuous.",
      "keyTexts": ["Quran 39:53", "Quran 42:40", "Hadith on forgiveness"],
      "practices": ["Tawbah (repentance)", "Seeking forgiveness during Ramadan"],
      "commonGround": "God as ultimately forgiving, human duty to forgive",
      "uniqueAspects": "Emphasis on God's direct forgiveness without intermediary"
    }
    // ... more faiths
  ],
  "conclusion": "A brief reflection on the shared human concern with forgiveness and reconciliation..."
}

Remember: This is for education and understanding, not debate or conversion.
`.trim();
}
```

---

## Frontend Components

### ComparisonPanel (Post-Session View)

```typescript
// components/ComparisonPanel.tsx
export function ComparisonPanel({ sessionId }: { sessionId: string }) {
  const { comparisons, isLoading } = useComparisons(sessionId);
  const { topics } = useComparableTopics(sessionId);
  const { preferences } = useComparisonPreferences();
  
  if (!preferences.comparativeEnabled) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" gutterBottom>
          Explore Other Perspectives
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          See how other faith traditions discuss similar topics
        </Typography>
        <ComparisonToggle />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Comparative Perspectives
      </Typography>
      
      <ComparisonDisclaimer />
      
      {/* Existing comparisons */}
      {comparisons.map((comparison) => (
        <TopicComparisonView key={comparison.id} comparison={comparison} />
      ))}
      
      {/* Available topics */}
      {topics.filter(t => !t.alreadyGenerated).length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Generate comparisons for:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {topics.filter(t => !t.alreadyGenerated).map(({ topic }) => (
              <GenerateComparisonChip key={topic} sessionId={sessionId} topic={topic} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
```

### ComparisonDisclaimer

```typescript
// components/ComparisonDisclaimer.tsx
export function ComparisonDisclaimer() {
  return (
    <Alert severity="info" sx={{ mb: 3 }} icon={<InfoIcon />}>
      <AlertTitle>AI-Generated Content</AlertTitle>
      <Typography variant="body2">
        These comparisons are generated by AI for educational purposes only. 
        They represent general perspectives and may not reflect all viewpoints. 
        For authoritative information, consult official sources and experts.
      </Typography>
    </Alert>
  );
}
```

### TopicComparisonView

```typescript
// components/TopicComparisonView.tsx
export function TopicComparisonView({ comparison }: { comparison: ComparisonResult }) {
  const [expandedFaith, setExpandedFaith] = useState<string | null>(null);

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {comparison.topic}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {comparison.introduction}
        </Typography>
        
        <Grid container spacing={2}>
          {comparison.perspectives.map((perspective) => (
            <Grid item xs={12} md={6} key={perspective.faith}>
              <FaithPerspectiveCard
                perspective={perspective}
                isCurrentFaith={perspective.faith === comparison.currentFaith}
                expanded={expandedFaith === perspective.faith}
                onToggle={() => setExpandedFaith(
                  expandedFaith === perspective.faith ? null : perspective.faith
                )}
              />
            </Grid>
          ))}
        </Grid>
        
        {comparison.conclusion && (
          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="body2" fontStyle="italic">
              {comparison.conclusion}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
```

### FaithPerspectiveCard

```typescript
// components/FaithPerspectiveCard.tsx
export function FaithPerspectiveCard({
  perspective,
  isCurrentFaith,
  expanded,
  onToggle,
}: Props) {
  const faithIcons: Record<string, string> = {
    'Christianity': '✝️',
    'Islam': '☪️',
    'Judaism': '✡️',
    'Buddhism': '☸️',
    'Hinduism': '🕉️',
  };

  return (
    <Card
      variant={isCurrentFaith ? 'elevation' : 'outlined'}
      sx={{
        bgcolor: isCurrentFaith ? 'primary.50' : 'background.paper',
        border: isCurrentFaith ? 2 : 1,
        borderColor: isCurrentFaith ? 'primary.main' : 'divider',
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Typography variant="h3" component="span">
            {faithIcons[perspective.faith] || '🙏'}
          </Typography>
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              {perspective.faith}
            </Typography>
            {perspective.tradition && (
              <Typography variant="caption" color="text.secondary">
                {perspective.tradition}
              </Typography>
            )}
          </Box>
          {isCurrentFaith && (
            <Chip label="Your Faith" size="small" color="primary" sx={{ ml: 'auto' }} />
          )}
        </Box>
        
        <Typography variant="body2" sx={{ mb: 2 }}>
          {perspective.summary}
        </Typography>
        
        <Collapse in={expanded}>
          {/* Key Texts */}
          {perspective.keyTexts.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                Key Texts
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                {perspective.keyTexts.map((text, i) => (
                  <Chip key={i} label={text} size="small" variant="outlined" />
                ))}
              </Box>
            </Box>
          )}
          
          {/* Common Ground */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="success.main" fontWeight={600}>
              Common Ground
            </Typography>
            <Typography variant="body2">
              {perspective.commonGround}
            </Typography>
          </Box>
          
          {/* Unique Aspects */}
          <Box>
            <Typography variant="caption" color="info.main" fontWeight={600}>
              Distinctive Approach
            </Typography>
            <Typography variant="body2">
              {perspective.uniqueAspects}
            </Typography>
          </Box>
        </Collapse>
        
        <Button
          size="small"
          onClick={onToggle}
          endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          sx={{ mt: 1 }}
        >
          {expanded ? 'Less' : 'More'}
        </Button>
      </CardContent>
    </Card>
  );
}
```

### ComparisonPreferences

```typescript
// components/ComparisonPreferences.tsx
export function ComparisonPreferences() {
  const { preferences, updatePreferences } = useComparisonPreferences();

  const availableFaiths = [
    'Christianity', 'Islam', 'Judaism', 'Buddhism', 'Hinduism'
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Comparative Perspective Settings
      </Typography>
      
      <FormControlLabel
        control={
          <Switch
            checked={preferences.comparativeEnabled}
            onChange={(e) => updatePreferences({ comparativeEnabled: e.target.checked })}
          />
        }
        label="Enable comparative perspective mode"
      />
      
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        When enabled, you can explore how other faith traditions discuss similar topics.
      </Typography>
      
      <Collapse in={preferences.comparativeEnabled}>
        <Box sx={{ pl: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Faiths to include in comparisons
          </Typography>
          
          <FormGroup>
            {availableFaiths.map((faith) => (
              <FormControlLabel
                key={faith}
                control={
                  <Checkbox
                    checked={preferences.faithsToShow.includes(faith)}
                    onChange={(e) => {
                      const newFaiths = e.target.checked
                        ? [...preferences.faithsToShow, faith]
                        : preferences.faithsToShow.filter(f => f !== faith);
                      updatePreferences({ faithsToShow: newFaiths });
                    }}
                  />
                }
                label={faith}
              />
            ))}
          </FormGroup>
          
          <Divider sx={{ my: 2 }} />
          
          <FormControlLabel
            control={
              <Switch
                checked={preferences.autoGenerateAfterSession}
                onChange={(e) => updatePreferences({ 
                  autoGenerateAfterSession: e.target.checked 
                })}
              />
            }
            label="Automatically generate comparisons after sessions"
          />
        </Box>
      </Collapse>
    </Box>
  );
}
```

---

## Access Control

| Role | Enable Feature | View Comparisons | Generate |
|------|----------------|------------------|----------|
| Guest | ❌ | ❌ | ❌ |
| Member | ✓ (opt-in) | ✓ (own) | ❌ |
| Host | ✓ (opt-in) | ✓ | ✓ |
| **Pro tier** | ✓ (opt-in) | ✓ | ✓ |
| Org Admin | ✓ (opt-in) | ✓ (org) | ✓ |

**Feature availability:** Pro tier / Organization only

---

## Cost Analysis

| Component | Cost | Notes |
|-----------|------|-------|
| **Comparison generation** | $0.015 | GPT-5.2: ~2K in + 1.5K out |
| **Per topic** | $0.015 | One comparison per topic |
| **Per session (3 topics avg)** | ~$0.045 | |

**Monthly at scale:** 100 orgs × 30 sessions × $0.045 = **$135/month**

**Note:** Low usage expected — opt-in feature, not default.

---

## Dependencies

| Dependency | Direction | Notes |
|------------|-----------|-------|
| **C5 (AI Provider)** | ← uses | GPT-5.2 for generation |
| **F7 (Recaps)** | ← uses | Topic extraction from highlights |
| **F6 (Summaries)** | ← uses | Additional topic context |

---

## Ethical Considerations

### Accuracy
- Always include AI disclaimer
- Use neutral academic language
- Acknowledge diversity within traditions
- Provide source citations for verification

### Respect
- Present each faith charitably
- No ranking or judgment
- Highlight commonalities alongside differences
- Avoid controversial interpretations

### User Agency
- Explicit opt-in required
- User controls which faiths to see
- Can disable at any time
- No automatic generation by default

---

## Acceptance Criteria

### MVP (Phase 1)
- [ ] User can enable/disable comparative mode in settings
- [ ] Comparisons generated from session topics
- [ ] 5 major faiths supported (Christianity, Islam, Judaism, Buddhism, Hinduism)
- [ ] Each perspective includes summary, key texts, common ground
- [ ] AI disclaimer shown on all comparisons
- [ ] User can select which faiths to include

### Phase 2
- [ ] Scripture passage comparison (compare interpretations)
- [ ] Practice comparison (prayer, meditation, fasting)
- [ ] Export comparisons (PDF for study groups)
- [ ] More faiths (Sikhism, Jainism, Baha'i)
- [ ] Internal tradition variants (Catholic vs Protestant, Sunni vs Shia)

---

## Response Types (Draft)

> These types define the AI response structure. See [C8 — Typed AI Responses](../core/typed-ai-responses.md) for the full pattern.

### ComparisonResponseData

```typescript
// libs/4eye-types/ai/comparison/ComparisonResponse.ts

/**
 * AI-generated cross-source comparison response.
 * 
 * Generate neutral, educational perspectives from multiple sources on a topic.
 * Focus on understanding, not debate. Present each perspective charitably.
 * 
 * IMPORTANT:
 * - Be respectful and accurate about each source/faith
 * - Include authoritative textual references
 * - Highlight both common ground and unique aspects
 * - Never rank or judge perspectives
 * 
 * @interface ComparisonResponseData
 */
export interface ComparisonResponseData {
  /**
   * The topic being compared across sources.
   * 
   * @example "Forgiveness"
   * @example "The meaning of suffering"
   */
  topic: string;

  /**
   * Array of perspectives from different sources.
   * Include 3-5 sources for comprehensive comparison.
   * 
   * @example See SourcePerspective interface
   */
  perspectives: SourcePerspective[];

  /**
   * What all perspectives share in common.
   * 1-2 sentences identifying universal themes.
   * 
   * @example "All traditions emphasize forgiveness as essential for personal peace and community harmony."
   */
  commonGround: string;

  /**
   * AI-generated disclaimer about limitations.
   * Always include to set appropriate expectations.
   * 
   * @example "This comparison is AI-generated for educational purposes. Consult authoritative sources for accuracy."
   */
  disclaimer: string;
}

/**
 * A single source's perspective on the topic.
 */
export interface SourcePerspective {
  /**
   * The source/faith/tradition.
   * 
   * @example "Christianity"
   * @example "Buddhism"
   */
  source: string;

  /**
   * Specific tradition within the source (optional).
   * 
   * @example "Catholic"
   * @example "Theravada"
   */
  tradition?: string;

  /**
   * 2-4 sentence summary of this source's perspective.
   * Present charitably and accurately.
   * 
   * @example "In Christianity, forgiveness is central to the faith, modeled by Christ's sacrifice..."
   */
  summary: string;

  /**
   * Key textual references (scripture, authoritative texts).
   * 
   * @example ["Matthew 6:14-15", "The Lord's Prayer"]
   * @example ["Quran 39:53", "Hadith on mercy"]
   */
  keyTexts: string[];

  /**
   * What's distinctive about this perspective.
   * What does this source uniquely emphasize?
   * 
   * @example "Christianity uniquely emphasizes forgiveness as modeled through divine sacrifice."
   */
  uniqueAspects: string;
}
```

### Zod Schema

```typescript
// libs/4eye-types/ai/comparison/ComparisonResponse.schema.ts

import { z } from 'zod';

export const SourcePerspectiveSchema = z.object({
  source: z.string(),
  tradition: z.string().optional(),
  summary: z.string().min(50).max(500),
  keyTexts: z.array(z.string()).min(1).max(5),
  uniqueAspects: z.string().min(20).max(300),
});

export const ComparisonResponseDataSchema = z.object({
  topic: z.string(),
  perspectives: z.array(SourcePerspectiveSchema).min(2).max(6),
  commonGround: z.string().min(20).max(300),
  disclaimer: z.string(),
});

export type SourcePerspective = z.infer<typeof SourcePerspectiveSchema>;
export type ComparisonResponseData = z.infer<typeof ComparisonResponseDataSchema>;
```

### Example Response

```json
{
  "topic": "Forgiveness",
  "perspectives": [
    {
      "source": "Christianity",
      "summary": "Forgiveness is central to Christian teaching, modeled by Christ's sacrifice on the cross. Christians are called to forgive others as God has forgiven them, releasing the debt of wrong.",
      "keyTexts": ["Matthew 6:14-15", "Ephesians 4:32", "The Lord's Prayer"],
      "uniqueAspects": "Christianity uniquely emphasizes forgiveness as modeled through divine sacrifice and as a condition for receiving God's forgiveness."
    },
    {
      "source": "Islam",
      "summary": "In Islam, Allah is Al-Ghaffar (The Forgiving). Forgiveness is both a divine attribute to emulate and a practical virtue. While justice is important, mercy and forgiveness are preferred.",
      "keyTexts": ["Quran 39:53", "Quran 42:40", "Hadith on the virtue of forgiveness"],
      "uniqueAspects": "Islam balances forgiveness with justice, encouraging forgiveness but recognizing the right to fair recompense."
    },
    {
      "source": "Buddhism",
      "summary": "Buddhist forgiveness centers on letting go of attachment to anger and resentment. It's understood as freeing oneself from suffering rather than pardoning the offender.",
      "keyTexts": ["Dhammapada", "Metta Sutta", "Teachings on non-attachment"],
      "uniqueAspects": "Buddhism frames forgiveness primarily as self-liberation from harmful mental states rather than a transaction between parties."
    }
  ],
  "commonGround": "All traditions recognize that holding onto resentment harms the one who holds it, and that forgiveness brings peace to the forgiver.",
  "disclaimer": "This comparison is AI-generated for educational purposes. Consult authoritative sources and qualified teachers for accuracy."
}
```

---

## Environment Variables

```env
# Cross-Faith Comparison
COMPARISON_ENABLED=true
COMPARISON_MODEL=gpt-5.2
COMPARISON_DEFAULT_FAITHS=Christianity,Islam,Judaism,Buddhism,Hinduism
COMPARISON_MAX_PER_SESSION=5
```
