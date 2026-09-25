# F2 — Live Translation

> Real-time translation of transcript segments to target languages and reading levels.

**Status:** Planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md) | [decisions.md](../decisions.md)
**Related:** [F1 — Audio-to-Text](audio-to-text.md) | [F16 — Live Session](live-session-display.md) | [C8 — Typed AI Responses](../core/typed-ai-responses.md)

---

## ⚠️ Key Decisions (Do Not Overwrite)

1. **Typed AI Responses** — Reading level adaptation uses typed response system. See [C8](../core/typed-ai-responses.md)
2. **Two-Step Translation** — Google Translate (fast) + AI rewrite for non-standard reading levels
3. **Caching** — Store translations in database for reuse

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    NEW TRANSCRIPT SEGMENT EVENT                          │
│                    (from F1 onTranscriptUpdate)                         │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      TRANSLATION REQUEST HANDLER                         │
├─────────────────────────────────────────────────────────────────────────┤
│   1. Check user's targetLanguage + readingLevel                         │
│   2. Check cache: Translation exists for segment+lang+level?            │
│   3. If cached → return immediately                                     │
│   4. If not → generate via AI provider                                  │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         AI TRANSLATION LAYER                             │
├─────────────────────────────────────────────────────────────────────────┤
│   Google Translate API (fast, cheap)                                    │
│        ↓ (if reading level ≠ STANDARD)                                  │
│   GPT-4 / Claude (reading level adaptation)                             │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    TRANSLATION STORAGE & PUB/SUB                         │
├─────────────────────────────────────────────────────────────────────────┤
│   Store: Translation → (segmentId, language, readingLevel, text)        │
│   Publish: onTranslationReady → clients subscribed to session           │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Technology Decisions

| Component | Choice | Rationale |
|-----------|--------|-----------|
| Primary Translation | Google Cloud Translation | Fast (<100ms), cheap ($20/1M chars) |
| Reading Level Adaptation | GPT-5.2-mini via C5 | Fast, nuanced language simplification |
| Caching | Database (Translation table) | Reuse across users |
| Real-time delivery | GraphQL Subscriptions | Consistent with F1 |

### Translation Strategy

1. **STANDARD reading level** → Google Translate only (fast)
2. **CHILD / ACADEMIC levels** → Google Translate + GPT-5.2-mini rewrite

This two-step approach balances speed and quality:
- Most users use STANDARD → gets fastest path
- CHILD/ACADEMIC users get adapted text with slight delay

---

## Supported Languages (MVP)

| Code | Language | Direction |
|------|----------|-----------|
| en | English | LTR |
| es | Spanish | LTR |
| pt | Portuguese | LTR |
| fr | French | LTR |
| ar | Arabic | RTL |
| zh | Mandarin Chinese | LTR |

> Source language is typically English (or auto-detected). Users select target language.

---

## Reading Levels

| Level | Description | Example |
|-------|-------------|---------|
| CHILD | Simple words, short sentences (age 8-12) | "Learning helps everyone. It makes us stronger and kinder." |
| STANDARD | Clear everyday language | "Continuous learning shapes who we become, guiding us toward growth." |
| ACADEMIC | Formal, scholarly terms | "The iterative process of knowledge acquisition serves as the foundational principle for personal and collective development." |

---

## Project Structure

```
backend/
├── src/
│   └── modules/
│       └── translation/
│           ├── translation.module.ts
│           ├── translation.resolver.ts
│           ├── translation.service.ts
│           ├── entities/
│           │   └── translation.entity.ts
│           ├── dto/
│           │   └── translate-segment.dto.ts
│           └── services/
│               ├── google-translate.service.ts
│               └── reading-level-adapter.service.ts

frontend/
├── src/
│   ├── features/
│   │   └── session/
│   │       ├── components/
│   │       │   ├── TranslatedTranscript.tsx
│   │       │   ├── LanguageSelector.tsx
│   │       │   └── ReadingLevelSelector.tsx
│   │       ├── hooks/
│   │       │   ├── useTranslationSubscription.ts
│   │       │   └── useUserPreferences.ts
│   │       └── context/
│   │           └── TranslationContext.tsx
```

---

## Data Model (from C6)

### Translation
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| segmentId | UUID | FK → TranscriptSegment |
| language | string | Target language ISO 639-1 |
| readingLevel | enum | CHILD, STANDARD, ACADEMIC |
| text | text | Translated text |
| createdAt | datetime | Auto |

**Unique constraint**: (segmentId, language, readingLevel)

---

## Translation Flow

### 1. User Sets Preferences
```typescript
// hooks/useUserPreferences.ts
export function useUserPreferences() {
  const [updatePreferences] = useMutation(UPDATE_USER_PREFERENCES);
  
  const setLanguage = (language: string) => {
    updatePreferences({ variables: { preferredLanguage: language } });
  };

  const setReadingLevel = (level: ReadingLevel) => {
    updatePreferences({ variables: { readingLevel: level } });
  };

  return { setLanguage, setReadingLevel };
}
```

### 2. Backend Listens to Transcript Events
```typescript
// translation.service.ts
@Injectable()
export class TranslationService {
  constructor(
    @Inject(PUB_SUB) private pubSub: PubSub,
    private googleTranslate: GoogleTranslateService,
    private aiService: AIService,
    private translationRepo: Repository<Translation>,
  ) {
    // Subscribe to new transcript segments
    this.pubSub.subscribe('transcript.*', this.onNewSegment.bind(this));
  }

  private async onNewSegment(payload: { onTranscriptUpdate: TranscriptSegment }) {
    const segment = payload.onTranscriptUpdate;
    
    // Get active users in this session and their language preferences
    const activeUsers = await this.sessionService.getActiveUsers(segment.sessionId);
    
    // Collect unique language+level combinations needed
    const combos = new Set(
      activeUsers.map(u => `${u.preferredLanguage}:${u.readingLevel}`)
    );

    // Generate translations in parallel
    await Promise.all(
      [...combos].map(combo => {
        const [language, level] = combo.split(':');
        return this.translateSegment(segment.id, language, level as ReadingLevel);
      })
    );
  }
}
```

### 3. Translation Logic
```typescript
// translation.service.ts
async translateSegment(
  segmentId: string,
  targetLanguage: string,
  readingLevel: ReadingLevel
): Promise<Translation> {
  // 1. Check cache
  const cached = await this.translationRepo.findOne({
    where: { segmentId, language: targetLanguage, readingLevel },
  });
  if (cached) return cached;

  // 2. Get original segment
  const segment = await this.segmentRepo.findOne({ where: { id: segmentId } });

  // 3. Skip if same language and STANDARD level
  if (segment.language === targetLanguage && readingLevel === 'STANDARD') {
    return this.saveAndPublish(segmentId, targetLanguage, readingLevel, segment.text);
  }

  // 4. Translate via Google
  let translatedText = await this.googleTranslate.translate(
    segment.text,
    segment.language, // source
    targetLanguage    // target
  );

  // 5. Adapt reading level if not STANDARD
  if (readingLevel !== 'STANDARD') {
    translatedText = await this.adaptReadingLevel(translatedText, readingLevel, targetLanguage);
  }

  // 6. Save and publish
  return this.saveAndPublish(segmentId, targetLanguage, readingLevel, translatedText);
}

private async adaptReadingLevel(
  text: string,
  level: ReadingLevel,
  language: string
): Promise<string> {
  const prompt = this.buildReadingLevelPrompt(text, level, language);
  
  const result = await this.aiService.generateText(prompt, {
    systemPrompt: `You are adapting text for a ${level.toLowerCase()} reading level. 
                   Output only the adapted text in ${language}.`,
    temperature: 0.3,
    maxTokens: 500,
  });

  return result.text;
}

private buildReadingLevelPrompt(text: string, level: ReadingLevel, language: string): string {
  if (level === 'CHILD') {
    return `Rewrite this for a child (age 10). Use simple words, short sentences, be friendly:

"${text}"`;
  } else {
    return `Rewrite this in formal academic ${language}. Use precise theological and philosophical terminology:

"${text}"`;
  }
}

private async saveAndPublish(
  segmentId: string,
  language: string,
  readingLevel: ReadingLevel,
  text: string
): Promise<Translation> {
  const translation = await this.translationRepo.save({
    segmentId,
    language,
    readingLevel,
    text,
  });

  // Get session ID for publishing
  const segment = await this.segmentRepo.findOne({
    where: { id: segmentId },
    relations: ['transcript', 'transcript.session'],
  });

  await this.pubSub.publish(`translation.${segment.transcript.session.id}`, {
    onTranslationReady: translation,
  });

  return translation;
}
```

---

## Google Translate Integration

```typescript
// services/google-translate.service.ts
import { TranslationServiceClient } from '@google-cloud/translate';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleTranslateService {
  private client: TranslationServiceClient;
  private projectId: string;

  constructor(private config: ConfigService) {
    this.client = new TranslationServiceClient();
    this.projectId = config.get('GCP_PROJECT_ID');
  }

  async translate(
    text: string,
    sourceLanguage: string,
    targetLanguage: string
  ): Promise<string> {
    const [response] = await this.client.translateText({
      parent: `projects/${this.projectId}/locations/global`,
      contents: [text],
      mimeType: 'text/plain',
      sourceLanguageCode: sourceLanguage,
      targetLanguageCode: targetLanguage,
    });

    return response.translations[0].translatedText;
  }

  async detectLanguage(text: string): Promise<string> {
    const [response] = await this.client.detectLanguage({
      parent: `projects/${this.projectId}/locations/global`,
      content: text,
    });

    return response.languages[0].languageCode;
  }
}
```

---

## API Surface

### Mutations
```graphql
type Mutation {
  # Manually request translation (rare — usually automatic)
  requestTranslation(
    segmentId: ID!
    language: String!
    readingLevel: ReadingLevel!
  ): Translation!
  
  # Update user language/reading preferences (stored on User)
  updatePreferences(input: UpdatePreferencesInput!): User!
}

input UpdatePreferencesInput {
  preferredLanguage: String
  readingLevel: ReadingLevel
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
  # Get translations for a segment
  translations(segmentId: ID!): [Translation!]!
  
  # Get user's translated transcript (all segments translated)
  translatedTranscript(
    sessionId: ID!
    language: String!
    readingLevel: ReadingLevel!
  ): [TranslatedSegment!]!
}

type TranslatedSegment {
  id: ID!
  originalText: String!
  translatedText: String!
  startTime: Float!
  endTime: Float!
  diarizationLabel: String
}
```

### Subscriptions
```graphql
type Subscription {
  # Real-time translation updates for user's preferred language/level
  onTranslationReady(
    sessionId: ID!
    language: String!
    readingLevel: ReadingLevel!
  ): Translation!
}
```

---

## Frontend Components

### TranslatedTranscript
```tsx
// components/TranslatedTranscript.tsx
interface Props {
  sessionId: string;
}

export const TranslatedTranscript = ({ sessionId }: Props) => {
  const { preferredLanguage, readingLevel } = useUserPreferences();
  const { segments } = useTranscriptSubscription(sessionId);
  const { translations } = useTranslationSubscription(sessionId, preferredLanguage, readingLevel);

  // Merge segments with translations
  const displaySegments = useMemo(() => {
    return segments.map(segment => {
      const translation = translations.find(t => t.segmentId === segment.id);
      return {
        ...segment,
        displayText: translation?.text || segment.text,
        isTranslated: !!translation,
      };
    });
  }, [segments, translations]);

  return (
    <Box>
      {displaySegments.map(segment => (
        <TranscriptSegment
          key={segment.id}
          segment={segment}
          showOriginalToggle
        />
      ))}
    </Box>
  );
};
```

### LanguageSelector
```tsx
// components/LanguageSelector.tsx
const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

export const LanguageSelector = () => {
  const { preferredLanguage, setLanguage } = useUserPreferences();

  return (
    <FormControl size="small">
      <InputLabel>Language</InputLabel>
      <Select
        value={preferredLanguage}
        onChange={(e) => setLanguage(e.target.value)}
        label="Language"
      >
        {LANGUAGES.map(lang => (
          <MenuItem key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
```

### ReadingLevelSelector
```tsx
// components/ReadingLevelSelector.tsx
const LEVELS = [
  { value: 'CHILD', label: 'Simple', description: 'Easy to understand (ages 8-12)' },
  { value: 'STANDARD', label: 'Standard', description: 'Everyday language' },
  { value: 'ACADEMIC', label: 'Academic', description: 'Formal theological terms' },
];

export const ReadingLevelSelector = () => {
  const { readingLevel, setReadingLevel } = useUserPreferences();

  return (
    <ToggleButtonGroup
      value={readingLevel}
      exclusive
      onChange={(_, value) => value && setReadingLevel(value)}
      size="small"
    >
      {LEVELS.map(level => (
        <Tooltip key={level.value} title={level.description}>
          <ToggleButton value={level.value}>
            {level.label}
          </ToggleButton>
        </Tooltip>
      ))}
    </ToggleButtonGroup>
  );
};
```

---

## Performance Considerations

### Latency Budget
| Step | Target | Notes |
|------|--------|-------|
| Google Translate | <100ms | Very fast |
| Reading level adaptation | <500ms | GPT-4 call |
| Total for STANDARD | <200ms | Acceptable |
| Total for CHILD/ACADEMIC | <700ms | "Translating..." indicator |

### Caching Strategy
1. **Database cache** (Translation table) — persists, reusable
2. **In-memory cache** (optional) — for hot segments during live session
3. **Pre-warming** — when user joins, pre-fetch recent translations

---

## Dependencies

| Dependency | Why |
|------------|-----|
| F1 Audio-to-Text | Needs TranscriptSegments to translate |
| C4 Real-time | Subscriptions for live translation delivery |
| C5 AI Provider | GPT-4 for reading level adaptation |
| C2 Auth | User.preferredLanguage, User.readingLevel |

---

## Environment Variables

```env
# Google Cloud Translation
GCP_PROJECT_ID=your_project
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json

# AI (for reading level adaptation)
OPENAI_API_KEY=your_key  # Via C5
```

---

## Acceptance Criteria

- [ ] User can select target language from 6 options
- [ ] User can select reading level (Child/Standard/Academic)
- [ ] Translations appear automatically during live session
- [ ] Translation latency <200ms for STANDARD level
- [ ] Translation latency <700ms for CHILD/ACADEMIC levels
- [ ] Translations are cached and reused across users
- [ ] User can toggle between original and translated text
- [ ] RTL languages (Arabic) display correctly
- [ ] Translations persist with transcript for replay
- [ ] Guests can set language preference (stored in session)

---

## Response Types (Draft)

> These types define the AI response structure for reading level adaptation. See [C8 — Typed AI Responses](../core/typed-ai-responses.md) for the full pattern.

### ReadingLevelAdaptationResponseData

```typescript
// libs/4eye-types/ai/translation/ReadingLevelAdaptationResponse.ts

/**
 * AI response for adapting text to a specific reading level.
 * 
 * Used when translating text for CHILD or ACADEMIC reading levels.
 * STANDARD level uses direct translation (no AI adaptation needed).
 * 
 * @interface ReadingLevelAdaptationResponseData
 */
export interface ReadingLevelAdaptationResponseData {
  /**
   * The adapted text at the target reading level.
   * 
   * CHILD (ages 8-12):
   * - Simple, common words
   * - Short sentences
   * - Active voice
   * - Concrete examples
   * 
   * ACADEMIC:
   * - Formal structure
   * - Technical/theological terms with context
   * - Complex sentence structures
   * - Nuanced explanations
   * 
   * @example "Learning helps everyone. It makes us stronger and kinder."
   * @example "The iterative process of growth extends to all areas of life."
   */
  adaptedText: string;

  /**
   * Key terms that were simplified or elevated.
   * Useful for learning context.
   * 
   * @example [{ original: "omnipotent", adapted: "all-powerful" }]
   */
  termChanges?: Array<{
    original: string;
    adapted: string;
  }>;
}
```

### Zod Schema

```typescript
// libs/4eye-types/ai/translation/ReadingLevelAdaptationResponse.schema.ts

import { z } from 'zod';

export const ReadingLevelAdaptationResponseDataSchema = z.object({
  adaptedText: z.string().min(1),
  termChanges: z.array(z.object({
    original: z.string(),
    adapted: z.string(),
  })).optional(),
});

export type ReadingLevelAdaptationResponseData = z.infer<typeof ReadingLevelAdaptationResponseDataSchema>;
```

### Example Response (CHILD level)

```json
{
  "adaptedText": "Learning helps everyone. It teaches us to be kind to each other, just like a good friend would be.",
  "termChanges": [
    { "original": "continuous growth", "adapted": "Learning helps" },
    { "original": "compassion", "adapted": "being kind" }
  ]
}
```
