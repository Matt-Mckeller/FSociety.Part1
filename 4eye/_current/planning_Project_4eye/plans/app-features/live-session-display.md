# F16 — Live Session Display

> Real-time transcription display with multiple translations, reading levels, learning modes, and AI-triggered summaries.

**Status:** Planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md)
**Related:** [F1 — Audio-to-Text](audio-to-text.md) | [F2 — Live Translation](live-translation.md) | [F4 — Chat](chat-interactivity.md) | [C8 — Typed AI Responses](../core/typed-ai-responses.md)

---

## ⚠️ Key Decisions (Do Not Overwrite)

1. **Separate from AI Chat** — This is the live transcription display, not the conversational AI chat (F4)
2. **AI-Triggered Summaries** — During live sessions, AI determines good summary points (not manual)
3. **Toggle Modes** — Users toggle display modes (translations, reading levels) rather than seeing all at once
4. **Context-Configurable** — Settings vary by domain (religion, education, organizational)
5. **Future: Custom Configurability** — Not MVP, but architecture should support it
6. **Typed AI Responses** — Summaries use typed response system. See [C8](../core/typed-ai-responses.md)

---

## Overview

The Live Session Display shows real-time transcription of spoken content with:
- Multiple simultaneous translations (user toggles which to see)
- Different reading level versions
- Different learning mode transformations
- AI-triggered summary moments with timeline
- Context-aware defaults based on room domain (religion, edu, org)

This is **distinct from the AI Chat (F4)** — users view content here, they converse in F4.

---

## Core Features

### MVP Features

| Feature | Description | Priority |
|---------|-------------|----------|
| **Live Transcription** | Real-time text from audio | P0 |
| **Primary Translation** | User's preferred language | P0 |
| **Reading Level Toggle** | Switch between reading levels | P0 |
| **Learning Mode Toggle** | Switch display format (standard, simplified, triadic) | P0 |
| **AI Summary Moments** | AI identifies good summary points | P1 |
| **Timeline View** | Visual timeline of session with summary markers | P1 |
| **Domain Defaults** | Pre-configured settings per context | P1 |

### Post-MVP Features

| Feature | Description |
|---------|-------------|
| **Multi-Translation View** | Side-by-side translations |
| **Custom Configuration** | User creates custom display presets |
| **Speaker Attribution** | Who said what, visually distinguished |
| **Keyword Highlighting** | Important terms highlighted |
| **Concept Linking** | Link to related concepts (F14) |

---

## Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                      LIVE SESSION DISPLAY                               │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │  FRONTEND (Next.js)                                              │  │
│  │                                                                   │  │
│  │  ┌──────────────────────────────────────────────────────────┐   │  │
│  │  │  LiveSessionPanel                                         │   │  │
│  │  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐ │   │  │
│  │  │  │ ModeToggles │ │ LangSelect  │ │ ReadingLevelSelect │ │   │  │
│  │  │  └─────────────┘ └─────────────┘ └─────────────────────┘ │   │  │
│  │  └──────────────────────────────────────────────────────────┘   │  │
│  │                                                                   │  │
│  │  ┌──────────────────────────────────────────────────────────┐   │  │
│  │  │  TranscriptStream                                         │   │  │
│  │  │  • Real-time text updates                                 │   │  │
│  │  │  • Auto-scroll with manual override                       │   │  │
│  │  │  • Highlight active segment                               │   │  │
│  │  └──────────────────────────────────────────────────────────┘   │  │
│  │                                                                   │  │
│  │  ┌──────────────────────────────────────────────────────────┐   │  │
│  │  │  SessionTimeline (sidebar)                                │   │  │
│  │  │  • Timeline markers for summary moments                   │   │  │
│  │  │  • Click to jump to point                                 │   │  │
│  │  │  • AI-generated labels                                    │   │  │
│  │  └──────────────────────────────────────────────────────────┘   │  │
│  │                                                                   │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                │                                        │
│                                │ GraphQL Subscriptions                  │
│                                ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │  BACKEND (NestJS)                                                │  │
│  │                                                                   │  │
│  │  ┌────────────────────────────────────────────────────────────┐ │  │
│  │  │  LIVE SESSION MODULE                                        │ │  │
│  │  │                                                              │ │  │
│  │  │  • TranscriptStreamService  → Pushes real-time segments    │ │  │
│  │  │  • TranslationService       → Multi-language transforms    │ │  │
│  │  │  • ReadingLevelService      → Adapt complexity             │ │  │
│  │  │  • SummaryDetectorService   → AI detects summary points    │ │  │
│  │  │  • TimelineService          → Manages session timeline     │ │  │
│  │  └────────────────────────────────────────────────────────────┘ │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Display Modes

Users toggle between modes — they don't see all simultaneously (MVP).

### Reading Level Modes

| Level | Label | Description |
|-------|-------|-------------|
| 1 | Child (8-10) | Simple vocabulary, short sentences |
| 2 | Teen (13-15) | Moderate vocabulary, clear structure |
| 3 | Adult (General) | Standard vocabulary |
| 4 | Academic | Technical vocabulary, complex sentences |
| 5 | Original | Exact transcription, no adaptation |

### Learning Mode Transforms

| Mode | Display Format |
|------|----------------|
| **Standard** | Clean paragraph text |
| **Simplified** | Bullet points, key ideas extracted |
| **Triadic** | Three-concept triangles (from F14) |
| **Visual** | Text with inline AI image suggestions |

---

## AI Summary Detection

Rather than manual "summarize" buttons during live sessions, AI detects good summary points.

### Triggering Conditions
- Topic shift detected
- Long segment completed (natural break)
- Key conclusion or definition stated
- Time-based (every N minutes of content)

### Summary Moment Data

```typescript
interface SummaryMoment {
  id: string;
  sessionId: string;
  timestamp: number;        // Seconds from session start
  triggerReason: 'topic_shift' | 'natural_break' | 'conclusion' | 'time_based';
  summaryText: string;      // AI-generated summary
  keyPoints: string[];      // Extracted key points
  conceptsIntroduced: string[];
}
```

### Timeline Integration
- Summary moments appear as markers on timeline
- Users click to jump to that point
- Hover shows summary preview
- Can be reviewed post-session

---

## Domain Configuration

Settings vary by room domain/context. Host configures, users can override.

### Domain Presets

| Domain | Default Reading Level | Default Mode | Special Features |
|--------|----------------------|--------------|------------------|
| **Religion** | Adult | Standard | Scripture references enabled |
| **Education** | Teen | Simplified | Quiz prompts, note-taking |
| **Professional** | Adult | Standard | Action item detection |
| **General** | Adult | Standard | None |

### Room-Level Settings

```typescript
interface LiveSessionSettings {
  domain: 'religion' | 'education' | 'professional' | 'general';
  defaultReadingLevel: number;
  defaultLearningMode: string;
  enableSummaryMoments: boolean;
  summaryFrequency: 'auto' | 'frequent' | 'minimal';
  translationsEnabled: string[];  // Language codes available
  // Future: custom configuration
}
```

---

## Data Model

### TranscriptSegment (extends F1)

```typescript
interface TranscriptSegment {
  id: string;
  sessionId: string;
  sequence: number;
  startTime: number;
  endTime: number;
  originalText: string;
  speakerId?: string;
  
  // Computed/cached transforms
  translations: Record<string, string>;      // lang -> text
  readingLevels: Record<number, string>;     // level -> text
  learningModes: Record<string, string>;     // mode -> text
}
```

### LiveSessionState (client-side)

```typescript
interface LiveSessionState {
  sessionId: string;
  isLive: boolean;
  
  // User preferences (toggle state)
  selectedLanguage: string;
  selectedReadingLevel: number;
  selectedLearningMode: string;
  
  // Content
  segments: TranscriptSegment[];
  summaryMoments: SummaryMoment[];
  
  // UI state
  autoScroll: boolean;
  timelineVisible: boolean;
  currentTimestamp: number;
}
```

---

## GraphQL API

### Subscriptions

```graphql
# Real-time transcript updates
subscription OnTranscriptUpdate($sessionId: ID!) {
  transcriptUpdate(sessionId: $sessionId) {
    segment {
      id
      sequence
      startTime
      endTime
      originalText
      speakerId
    }
  }
}

# Summary moment detected
subscription OnSummaryMoment($sessionId: ID!) {
  summaryMoment(sessionId: $sessionId) {
    id
    timestamp
    triggerReason
    summaryText
    keyPoints
  }
}
```

### Queries

```graphql
# Get transformed text (on-demand)
query GetTransformedSegment(
  $segmentId: ID!
  $language: String
  $readingLevel: Int
  $learningMode: String
) {
  transformedSegment(
    segmentId: $segmentId
    language: $language
    readingLevel: $readingLevel
    learningMode: $learningMode
  ) {
    text
    cached: Boolean
  }
}

# Get session timeline
query GetSessionTimeline($sessionId: ID!) {
  sessionTimeline(sessionId: $sessionId) {
    summaryMoments {
      id
      timestamp
      summaryText
    }
    duration
    segmentCount
  }
}
```

---

## Frontend Components

### LiveSessionPanel
- Main container for live session view
- Manages mode toggles, language selection
- Coordinates stream and timeline

### TranscriptStream
- Displays real-time text segments
- Auto-scrolls with manual override
- Highlights active/current segment
- Applies selected transforms

### SessionTimeline
- Visual timeline (vertical or horizontal)
- Summary moment markers
- Click-to-jump functionality
- Expand/collapse for more detail

### ModeToggles
- Reading level selector (1-5)
- Learning mode selector (dropdown or tabs)
- Quick-access to user defaults

---

## Events Tracked (X4)

| Event | Properties | Trigger |
|-------|------------|---------|
| `live_session_viewed` | sessionId, domain | User opens live session |
| `reading_level_changed` | sessionId, from, to | Toggle reading level |
| `learning_mode_changed` | sessionId, from, to | Toggle learning mode |
| `language_changed` | sessionId, from, to | Change translation |
| `summary_moment_viewed` | sessionId, momentId | Click timeline marker |
| `timeline_jump` | sessionId, timestamp | Jump to point in timeline |

---

## Response Types (Draft)

> These types define the AI response structure for live session features. See [C8 — Typed AI Responses](../core/typed-ai-responses.md) for the full pattern.

### SummaryMomentResponseData

```typescript
// libs/4eye-types/ai/live-session/SummaryMomentResponse.ts

/**
 * AI-detected summary moment response.
 * 
 * Analyze recent transcript segments to detect summary-worthy moments
 * and generate concise summaries.
 * 
 * Trigger summary when:
 * - Topic shift detected
 * - Natural break (pause, transition phrase)
 * - Key conclusion or definition stated
 * - Time threshold reached (configurable)
 * 
 * Guidelines:
 * - Keep summaries concise (1-2 sentences)
 * - Extract 2-4 key points
 * - Identify new concepts introduced
 * - Label the trigger reason accurately
 * 
 * @interface SummaryMomentResponseData
 */
export interface SummaryMomentResponseData {
  /**
   * Whether a summary moment should be created.
   * 
   * @example true
   */
  shouldCreateMoment: boolean;

  /**
   * Why this moment was triggered.
   * 
   * @example "topic_shift"
   */
  triggerReason: 'topic_shift' | 'natural_break' | 'conclusion' | 'time_based';

  /**
   * Concise summary text (1-2 sentences).
   * 
   * @example "The speaker concluded the discussion on forgiveness by emphasizing its connection to personal peace and freedom."
   */
  summaryText: string;

  /**
   * Extracted key points from this segment.
   * 2-4 bullet points.
   * 
   * @example ["Forgiveness releases resentment", "Personal peace requires letting go", "This applies to self-compassion too"]
   */
  keyPoints: string[];

  /**
   * New concepts introduced in this segment.
   * Used for learning mode integration.
   * 
   * @example ["self-compassion", "inner peace"]
   */
  conceptsIntroduced: string[];

  /**
   * Label for the timeline marker.
   * Short, descriptive (3-5 words).
   * 
   * @example "Forgiveness & Peace"
   */
  timelineLabel: string;

  /**
   * Confidence score for this detection (0-1).
   * 
   * @example 0.85
   */
  confidence: number;
}
```

### Zod Schema

```typescript
// libs/4eye-types/ai/live-session/SummaryMomentResponse.schema.ts

import { z } from 'zod';

export const SummaryMomentResponseDataSchema = z.object({
  shouldCreateMoment: z.boolean(),
  triggerReason: z.enum(['topic_shift', 'natural_break', 'conclusion', 'time_based']),
  summaryText: z.string().max(300),
  keyPoints: z.array(z.string().max(100)).min(1).max(5),
  conceptsIntroduced: z.array(z.string()),
  timelineLabel: z.string().max(50),
  confidence: z.number().min(0).max(1),
});

export type SummaryMomentResponseData = z.infer<typeof SummaryMomentResponseDataSchema>;
```

### Example Response

```json
{
  "shouldCreateMoment": true,
  "triggerReason": "conclusion",
  "summaryText": "The speaker concluded the discussion on forgiveness by emphasizing its essential connection to personal peace and freedom from resentment.",
  "keyPoints": [
    "Forgiveness releases the holder from resentment",
    "Personal peace requires letting go of past hurts",
    "Self-compassion is equally important"
  ],
  "conceptsIntroduced": ["self-compassion", "inner peace", "release"],
  "timelineLabel": "Forgiveness & Peace",
  "confidence": 0.88
}
```

---

## Dependencies

| Dependency | Plan | Required For |
|------------|------|--------------|
| Audio-to-Text | F1 | Raw transcription input |
| Live Translation | F2 | Translation transforms |
| Real-time Infra | C4 | WebSocket subscriptions |
| Learning Modes | F14 | Learning mode transforms |
| AI Provider | C5 | Summary detection, transforms |
| Analytics | X4 | Event tracking |

---

## Implementation Notes

### Performance Considerations
- Cache transformed segments (don't re-transform on every toggle)
- Lazy-load timeline on scroll
- Batch translation requests

### Accessibility
- Screen reader announces new segments
- Keyboard navigation for timeline
- High contrast mode for segments

### Mobile Considerations
- Simplified timeline for small screens
- Swipe gestures for mode switching
- Reduced simultaneous transforms
