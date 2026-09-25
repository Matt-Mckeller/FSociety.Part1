# F4 — MVP Chat with Learning Mode Integration

> AI-powered conversational interface that integrates learning modes, accessibility features, translation, and tracks user learning progress.

**Status:** Planned — *Core MVP Feature*
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md) | ExpanseFrontend LearningChat components
**Related:** [F16 — Live Session Display](live-session-display.md) | [C5 — AI Provider](../core/ai-provider-layer.md) | [C8 — Typed AI Responses](../core/typed-ai-responses.md) | [F14 — Learning Modes](learning-modes.md)

---

## ⚠️ Key Decisions (Do Not Overwrite)

1. **Chat is Primary** — This is the user's first and main interaction with 4eye
2. **Distinct from Live Display** — This is conversational AI chat, NOT the live transcription view (see F16)
3. **Typed AI Responses** — Uses typed response system from [C8](../core/typed-ai-responses.md)
4. **Intent Tracking** — Every chat request includes learner identity, environment, and goals
5. **Context-Aware** — Settings vary by domain (religion, education, organizational)
6. **More Sub-Features TBD** — Chat will be broken into sub-modules as complexity grows

---

## 📝 Pending Discussion

The following aspects need further input before implementation:
- [ ] Additional chat sub-features and how to break them down
- [ ] Specific learning modes and their chat integrations
- [ ] Domain-specific chat behaviors (religion vs edu vs org)
- [ ] Voice input priority and approach

---

## Overview

The chat is the **primary interaction surface** of 4eye. Users ask questions, explore content, and engage with learning modes through natural conversation. The AI adapts its responses based on:
- User's accessibility mode (ADHD, Autism, Dyslexia, etc.)
- Preferred language (translation)
- Reading level
- Learning style preferences
- Context from transcripts/sessions

---

## Core Features

### MVP Features (Phase 1)

| Feature | Description | Priority |
|---------|-------------|----------|
| **AI Chat** | Conversational interface with session/transcript context | P0 |
| **Learning Mode Actions** | Action buttons to trigger learning transformations | P0 |
| **Accessibility Modes** | ADHD, Autism, Dyslexia prompts | P0 |
| **Translation** | Respond in user's preferred language | P0 |
| **Read Aloud (TTS)** | Text-to-speech for responses | P0 |
| **Learning Progress Tracking** | Track which modes used per concept | P0 |
| **Suggested Prompts** | Context-aware suggested questions | P1 |
| **Message Reactions** | React to messages (helpful, confusing, etc.) | P1 |

### Future Features (Phase 2+)

| Feature | Description |
|---------|-------------|
| **Voice Input** | Speech-to-text input |
| **Chat Export** | Download as Markdown, PDF |
| **Chat Search** | Search within conversation |
| **Persistent History** | Save/resume conversations |
| **Time Travel** | Jump to any point in conversation |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           CHAT SYSTEM                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │  FRONTEND (Next.js)                                              │   │
│   │                                                                   │   │
│   │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │   │
│   │  │ ChatPanel    │  │ MessageList  │  │ ChatInput    │           │   │
│   │  └──────────────┘  └──────────────┘  └──────────────┘           │   │
│   │                                                                   │   │
│   │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │   │
│   │  │ ActionButtons│  │ TTSControls  │  │ Suggested    │           │   │
│   │  │ (Learning)   │  │ (Read Aloud) │  │ Prompts      │           │   │
│   │  └──────────────┘  └──────────────┘  └──────────────┘           │   │
│   │                                                                   │   │
│   │  ┌─────────────────────────────────────────────────┐            │   │
│   │  │  AccessibilityModeSelector                       │            │   │
│   │  │  [Default] [ADHD] [Autism] [Dyslexia] [Custom]  │            │   │
│   │  └─────────────────────────────────────────────────┘            │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                │                                         │
│                                │ GraphQL                                 │
│                                ▼                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │  BACKEND (NestJS)                                                │   │
│   │                                                                   │   │
│   │  ┌────────────────────────────────────────────────────────────┐ │   │
│   │  │  CHAT MODULE                                                │ │   │
│   │  │                                                              │ │   │
│   │  │  • ChatResolver       → Handle mutations/queries            │ │   │
│   │  │  • ChatService        → Orchestrate chat logic              │ │   │
│   │  │  • PromptBuilder      → Build prompts with accessibility    │ │   │
│   │  │  • LearningTracker    → Track learning mode usage           │ │   │
│   │  │  • TranslationService → Translate responses                 │ │   │
│   │  └────────────────────────────────────────────────────────────┘ │   │
│   │                                │                                 │   │
│   │                                ▼                                 │   │
│   │  ┌────────────────────────────────────────────────────────────┐ │   │
│   │  │  AI PROVIDER LAYER (C5)                                     │ │   │
│   │  │  OpenAI | Anthropic | DeepSeek | Gemini | Grok             │ │   │
│   │  └────────────────────────────────────────────────────────────┘ │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Learning Mode Action Buttons

Action buttons appear contextually in the chat to trigger learning transformations.

### Button Categories

| Category | Actions | Description |
|----------|---------|-------------|
| **Understand** | Simplify, Explain Like I'm 5, Give Example | Comprehension helpers |
| **Visualize** | Show Associations, Concept Triangle, Knowledge Web | Visual representations |
| **Practice** | Quiz Me, Fill the Gaps, Sequence It | Active recall exercises |
| **Connect** | Compare To..., Real World Example, Historical Context | Relationship building |
| **Review** | Summarize, Key Points, What's Most Important | Consolidation |

### Action Button Component

```typescript
interface LearningAction {
  id: string;
  label: string;
  icon: string;
  category: 'understand' | 'visualize' | 'practice' | 'connect' | 'review';
  prompt: string;  // Base prompt for this action
  learningModeId?: string;  // Links to F14 learning modes
}

const LEARNING_ACTIONS: LearningAction[] = [
  {
    id: 'simplify',
    label: 'Simplify',
    icon: 'clarity',
    category: 'understand',
    prompt: 'Explain this in simpler terms:',
  },
  {
    id: 'associations',
    label: 'Show Associations',
    icon: 'network',
    category: 'visualize',
    prompt: 'Generate 3 associative words for each key term (neural-net style memory encoding):',
    learningModeId: 'TRIADIC',
  },
  {
    id: 'triangle',
    label: 'Concept Triangle',
    icon: 'triangle',
    category: 'visualize',
    prompt: 'Create a concept triangle with 3 related concepts and their relationships:',
    learningModeId: 'TRIANGLE',
  },
  {
    id: 'quiz',
    label: 'Quiz Me',
    icon: 'quiz',
    category: 'practice',
    prompt: 'Generate 3 quiz questions to test my understanding:',
  },
  // ... more actions
];
```

### Contextual Action Display

Actions shown depend on:
- Current content type (transcript, summary, concept)
- User's learning history (suggest unused modes)
- User's learning style preferences

---

## Learning Progress Tracking

Track which learning modes users engage with for each concept.

### Data Model

```typescript
// LearningProgress entity
interface LearningProgress {
  id: string;
  userId: string;
  conceptId: string;          // What concept they're learning
  sessionId?: string;         // Optional: from which session
  learningModesUsed: string[];  // ['TRIANGLE', 'QUIZ', 'SIMPLIFY']
  engagementScore: number;    // 0-100 based on depth of interaction
  lastInteractedAt: Date;
  mastered: boolean;          // AI determines if concept understood
}

// ConceptMastery (aggregated from LearningProgress)
interface ConceptMastery {
  conceptId: string;
  conceptLabel: string;
  modesUsed: {
    mode: string;
    count: number;
    lastUsed: Date;
  }[];
  overallMastery: number;     // 0-100
  suggestedNextMode: string;  // AI recommendation
}
```

### Tracking Events

```typescript
// When user uses a learning mode
await trackLearningModeUsage({
  userId,
  conceptId: 'resilience',
  learningMode: 'TRIANGLE',
  sessionId,
  inputContent: 'How to build resilience',
  resultQuality: 'high',  // Based on user feedback
});
```

### Progress Dashboard

Users can see:
- Concepts explored with learning modes used
- Recommended modes they haven't tried
- Mastery levels per concept
- Learning streaks and achievements

---

## Accessibility Modes

Accessibility modes modify how the AI responds. Each mode has specific prompt instructions.

### Supported Modes

| Mode | Target Users | Key Adaptations |
|------|--------------|-----------------|
| **Default** | General users | Standard responses |
| **ADHD** | Users with attention challenges | Shorter paragraphs, bullet points, clear breaks |
| **Autism** | Users on autism spectrum | Literal language, predictable structure, clear expectations |
| **Dyslexia** | Users with reading difficulties | Simpler vocabulary, shorter sentences, TTS encouraged |
| **Low Vision** | Users with visual impairments | High contrast descriptions, TTS primary |
| **Cognitive** | Users with cognitive load concerns | Extra simplification, step-by-step, verification checks |

### Prompt Instructions by Mode

```typescript
const ACCESSIBILITY_PROMPT_INSTRUCTIONS: Record<AccessibilityMode, string> = {
  default: '',
  
  adhd: `
ACCESSIBILITY: ADHD Mode
- Keep paragraphs SHORT (2-3 sentences max)
- Use BULLET POINTS frequently
- Put the MOST IMPORTANT information FIRST
- Use BOLD for key terms
- Include clear SECTION BREAKS between topics
- Add one actionable takeaway at the end
- Avoid long introductions, get to the point quickly
`,
  
  autism: `
ACCESSIBILITY: Autism-Friendly Mode
- Use LITERAL, direct language (no idioms, metaphors, or sarcasm)
- Be EXPLICIT about expectations and next steps
- Use CONSISTENT structure for similar content
- Number steps clearly when giving instructions
- Avoid ambiguous pronouns (use specific names/terms)
- State assumptions explicitly
- If something has multiple interpretations, clarify which you mean
- Use predictable formatting throughout
`,
  
  dyslexia: `
ACCESSIBILITY: Dyslexia-Friendly Mode
- Use SIMPLE, common words (8th grade reading level max)
- Keep sentences SHORT (under 15 words when possible)
- Put ONE idea per sentence
- Use ACTIVE voice, not passive
- Avoid abbreviations (or explain them)
- Use numbered lists for sequences
- Leave extra space between sections
- Suggest using the READ ALOUD feature
`,
  
  lowVision: `
ACCESSIBILITY: Low Vision Mode
- Describe visual elements in detail (if any images/charts mentioned)
- Structure content for screen readers (clear headings, logical order)
- Avoid relying on visual formatting for meaning
- Always suggest using READ ALOUD feature
`,
  
  cognitive: `
ACCESSIBILITY: Cognitive Support Mode
- Use the SIMPLEST possible language
- Break everything into SMALL STEPS
- Repeat key information
- Ask "Does this make sense so far?" periodically
- Provide examples for every abstract concept
- Summarize frequently
- Offer to go slower or re-explain
`,
};
```

### Prompt Builder

```typescript
@Injectable()
export class PromptBuilder {
  buildPrompt(
    userMessage: string,
    context: ChatContext,
    userPreferences: UserPreferences,
  ): string {
    const parts: string[] = [];
    
    // System context
    parts.push(this.buildSystemContext(context));
    
    // Accessibility mode instructions
    if (userPreferences.accessibilityMode !== 'default') {
      parts.push(ACCESSIBILITY_PROMPT_INSTRUCTIONS[userPreferences.accessibilityMode]);
    }
    
    // Reading level adaptation
    parts.push(this.buildReadingLevelInstruction(userPreferences.readingLevel));
    
    // Translation instruction (if not English)
    if (userPreferences.preferredLanguage !== 'en') {
      parts.push(`\nIMPORTANT: Respond entirely in ${this.getLanguageName(userPreferences.preferredLanguage)}.`);
    }
    
    // Transcript/session context
    if (context.transcriptContext) {
      parts.push(`\nCONTEXT FROM TRANSCRIPT:\n${context.transcriptContext}`);
    }
    
    // User's message
    parts.push(`\nUSER MESSAGE:\n${userMessage}`);
    
    return parts.join('\n\n');
  }
}
```

---

## Translation

Chat supports full translation of responses to user's preferred language.

### Implementation

1. **User Preference**: `preferredLanguage` stored in user profile
2. **Real-time Selection**: Language selector in chat UI
3. **Prompt Injection**: Translation instruction added to prompt
4. **Mixed Mode**: Can request specific terms remain in original language

### Supported Languages (Initial)

| Language | Code | Notes |
|----------|------|-------|
| English | en | Default |
| Spanish | es | Full support |
| French | fr | Full support |
| German | de | Full support |
| Portuguese | pt | Full support |
| Mandarin | zh | Full support |
| Japanese | ja | Full support |
| Korean | ko | Full support |
| Arabic | ar | RTL support needed |
| Hindi | hi | Full support |

---

## Text-to-Speech (Read Aloud)

Built-in TTS for accessibility and multi-modal learning.

### Features

| Feature | Description |
|---------|-------------|
| **Read Response** | Button to read AI response aloud |
| **Auto-Read** | Option to auto-read all responses |
| **Voice Selection** | Choose from available voices |
| **Speed Control** | Adjust playback speed (0.5x - 2x) |
| **Pause/Resume** | Control playback |
| **Highlight While Reading** | Visual highlight of current sentence |

### Implementation

```typescript
// useTextToSpeech hook
interface UseTextToSpeechReturn {
  speak: (text: string) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  isSpeaking: boolean;
  isPaused: boolean;
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  setVoice: (voice: SpeechSynthesisVoice) => void;
  rate: number; // 0.5 - 2
  setRate: (rate: number) => void;
}
```

### Auto-Read Settings

Users with ADHD, Dyslexia, or Low Vision modes can enable auto-read:
```typescript
interface TTSPreferences {
  ttsEnabled: boolean;
  ttsAutoRead: boolean;      // Auto-read AI responses
  ttsVoice: string;          // Preferred voice ID
  ttsRate: number;           // 0.5 - 2
}
```

---

## Data Model

### ChatMessage

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| conversationId | UUID | FK → Conversation |
| userId | UUID | FK → User (null for AI) |
| role | enum | 'user' or 'assistant' |
| content | text | Message content |
| metadata | json | Learning actions, reactions, etc. |
| accessibilityMode | enum | Mode used when generating |
| language | string | Response language |
| learningAction | string? | If triggered by action button |
| conceptsDiscussed | string[] | Extracted concepts |
| createdAt | datetime | |

### Conversation

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| userId | UUID | FK → User |
| sessionId | UUID? | FK → Session (if session-scoped) |
| title | string | Auto-generated or user-set |
| summary | text? | AI-generated summary |
| conceptsExplored | json | List of concepts discussed |
| learningModesUsed | json | Modes used in this convo |
| createdAt | datetime | |
| updatedAt | datetime | |

### LearningModeUsage

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| userId | UUID | FK → User |
| conversationId | UUID | FK → Conversation |
| messageId | UUID | FK → ChatMessage |
| conceptId | string | What concept |
| learningMode | enum | TRIADIC, TRIANGLE, QUIZ, SIMPLIFY, etc. |
| userFeedback | enum? | helpful, confusing, neutral |
| createdAt | datetime | |

---

## GraphQL API

### Mutations

```graphql
type Mutation {
  sendMessage(input: SendMessageInput!): ChatMessage!
  triggerLearningAction(conversationId: ID!, action: LearningActionType!, targetContent: String): ChatMessage!
  reactToMessage(messageId: ID!, reaction: MessageReaction!): ChatMessage!
  updateChatPreferences(input: ChatPreferencesInput!): UserPreferences!
}

input SendMessageInput {
  conversationId: ID
  sessionId: ID
  content: String!
  accessibilityMode: AccessibilityMode
  language: String
}

enum LearningActionType {
  SIMPLIFY
  EXPLAIN_LIKE_5
  TRIADIC_ASSOCIATIONS
  TRIANGLE
  MIND_MAP
  KNOWLEDGE_WEB
  QUIZ_ME
  FILL_GAPS
  COMPARE
  SUMMARIZE
  KEY_POINTS
}

enum MessageReaction {
  HELPFUL
  CONFUSING
  NEEDS_MORE
  PERFECT
}
```

### Subscriptions

```graphql
type Subscription {
  messageStream(conversationId: ID!): MessageStreamEvent!
}

type MessageStreamEvent {
  token: String
  isComplete: Boolean
  messageId: ID
}
```

---

## Frontend Components

| Component | Responsibility |
|-----------|---------------|
| `ChatPanel` | Main container, manages conversation state |
| `AccessibilityModeSelector` | Toggle ADHD/Autism/Dyslexia modes |
| `LearningActionButtons` | Display contextual learning actions |
| `TTSControls` | Voice selection, speed, play/pause |
| `MessageContent` | Render markdown with accessibility |
| `LearningProgressBadge` | Show mastery level for concepts |
| `LanguageSelector` | Choose response language |
| `SuggestedPrompts` | Context-aware prompt suggestions |

---

## Dependencies

- **C2** (Authentication) — User identity for preferences and history
- **C4** (Real-time) — Message streaming via GraphQL subscriptions
- **C5** (AI Provider) — LLM integration for chat responses
- **C7** (CMS) — Content for suggested prompts, action labels
- **F14** (Learning Modes) — Triadic associations, concept triangles, quiz generation
- **X2** (Accessibility) — Mode definitions and guidelines
- **X4** (Analytics) — Track learning mode usage events

---

## Acceptance Criteria

### MVP
- [ ] User can send messages and receive AI responses
- [ ] Accessibility modes (ADHD, Autism, Dyslexia) modify response style
- [ ] Learning action buttons appear contextually
- [ ] Clicking action triggers learning mode transformation
- [ ] TTS reads responses aloud
- [ ] Language selector changes response language
- [ ] Learning mode usage tracked per concept
- [ ] Conversation history persisted

### Phase 2
- [ ] Voice input (speech-to-text)
- [ ] Chat export (Markdown, PDF)
- [ ] Search within conversation
- [ ] Message reactions affect AI learning
- [ ] Suggested prompts based on context
