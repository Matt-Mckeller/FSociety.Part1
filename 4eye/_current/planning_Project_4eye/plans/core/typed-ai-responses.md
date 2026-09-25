# C8 — Typed AI Response System

> Type-driven AI prompting system where TypeScript interfaces with JSDoc documentation serve as the single source of truth for AI response structure, validation, and developer guidance.

**Status:** Planned — *Core Infrastructure*
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md)
**Reference Implementation:** `/ExpanseFrontend/apps/playground/src/app/api/lottie-naming/generate-element-names/`
**Related:** [C5 — AI Provider](ai-provider-layer.md) | [F2 — Translation](../app-features/live-translation.md) | [F4 — Chat](../app-features/chat-interactivity.md) | [F6 — Summaries](../app-features/summaries.md) | [F7 — Recaps](../app-features/recaps.md) | [F10 — Comparison](../app-features/cross-source-comparison.md) | [F11 — Transform](../app-features/positive-speech-transform.md) | [F12 — Visual](../app-features/visual-generation.md) | [F13 — Feedback](../app-features/speaker-feedback.md) | [F14 — Learning](../app-features/learning-modes.md) | [F15 — Quizzes](../app-features/quizzes-exercises.md) | [F16 — Live Session](../app-features/live-session-display.md)

---

## ⚠️ Key Decisions (Do Not Overwrite)

1. **Types ARE the prompt** — JSDoc documentation in TypeScript files tells AI how to respond
2. **Runtime type reading** — Types read from filesystem at runtime, not regenerated
3. **Three parts to every prompt** — Instructions + Type definitions (with JSDoc) + Examples
4. **Zod validates at runtime** — TypeScript checks at compile time, Zod checks AI responses
5. **Single source of truth** — Change the type file, AI automatically gets new instructions
6. **PostgreSQL with migrations** — We trust our data; accept migrations over NoSQL complexity
7. **Prompts stay private** — Type definitions are safe to share; full prompts are server-only

---

## 🤖 AI Quick Reference (TL;DR for Implementation)

This section summarizes what AI assistants need to implement this pattern.

### What This Pattern Does
- TypeScript interfaces with JSDoc → read at runtime → injected into AI prompts
- AI responds with JSON matching the interface
- Zod validates the response before use

### Core Files to Create/Edit

| File | Purpose |
|------|---------|
| `libs/4eye-types/ai/{feature}/{Feature}Response.ts` | TypeScript interface + JSDoc |
| `libs/4eye-types/ai/{feature}/{Feature}Response.schema.ts` | Zod schema (mirrors interface) |
| `backend/src/modules/ai/type-reader/type-reader.service.ts` | Add to type config |
| `backend/src/modules/ai/prompts/{feature}/{feature}-prompt.builder.ts` | Prompt builder |

### The 5-Step Pattern

```typescript
// 1. DEFINE TYPE (libs/4eye-types/ai/chat/ChatResponse.ts)
export interface ChatResponseData {
  /** Main message. @example "Here's the summary:" */
  message: string;
}

// 2. ADD TO TYPE READER CONFIG (type-reader.service.ts)
chat: { name: 'Chat', files: ['chat/ChatResponse.ts'] }

// 3. BUILD PROMPT (chat-prompt.builder.ts)
const typeDoc = this.typeReader.getTypeDoc('chat');
const prompt = `Respond with JSON matching:\n${typeDoc}`;

// 4. CALL AI + VALIDATE (chat.service.ts)
const raw = await this.aiService.generateText(prompt);
const result = validateResponse(raw, ChatResponseDataSchema);

// 5. USE TYPED DATA
return result.data; // Fully typed ChatResponseData
```

### Which Features Need Typed Responses?

Every feature that generates structured AI output should follow this pattern:

| Feature | Response Type | File |
|---------|--------------|------|
| F4 — Chat | `ChatResponseData` | chat/ChatResponse.ts |
| F6 — Summaries | `SummaryResponseData` | summaries/SummaryResponse.ts |
| F7 — Recaps | `RecapResponseData` | recaps/RecapResponse.ts |
| F10 — Comparison | `ComparisonResponseData` | comparison/ComparisonResponse.ts |
| F11 — Transform | `TransformResponseData` | transform/TransformResponse.ts |
| F12 — Visual | `VisualPromptData` | visual/VisualPromptResponse.ts |
| F13 — Feedback | `FeedbackResponseData` | feedback/FeedbackResponse.ts |
| F14 — Learning | `{Mode}ResponseData` | learning/{Mode}Response.ts |
| F15 — Quizzes | `QuizResponseData` | quizzes/QuizResponse.ts |

### Quick Commands

```bash
# Read type file for debugging
cat libs/4eye-types/ai/chat/ChatResponse.ts

# Test schema validation
npx jest --testPathPattern="typed-ai" --verbose

# Check type-schema sync
npm run test:types
```

---

## Overview

The typed AI response system ensures:
- AI responses match expected TypeScript interfaces
- Developers and AI both read the same documentation
- Changes to types automatically propagate to AI prompts
- Runtime validation catches format errors before data is stored
- Prompt builder functions are typed end-to-end

---

## Benefits & Tradeoffs

### Benefits

| Benefit | Description |
|---------|-------------|
| **Single Source of Truth** | Types, AI instructions, and developer docs are the SAME file. No drift. |
| **Change Propagation** | Update a type file → AI automatically gets new instructions at runtime. |
| **Compile-Time Safety** | TypeScript catches downstream breakage when response shapes change. |
| **Runtime Validation** | Zod catches malformed AI responses before they corrupt the database. |
| **Debuggability** | Every prompt is auditable — you see exactly what type definition the AI received. |
| **Refactor-Safe** | Rename a field? TypeScript shows every place that needs updating. |
| **Testable Contracts** | Schemas can be tested independently of AI. |
| **JSDoc Dual Purpose** | Same docs serve developers AND tell AI how to respond. |
| **Explicit Contracts** | Response shapes are clearly defined, not implicit in prompt text. |

### Tradeoffs / Cons

| Tradeoff | Mitigation |
|----------|------------|
| **Upfront Infrastructure** | TypeReaderService, validators, schemas require initial setup. But this is one-time work that pays dividends. |
| **Context Window Usage** | TypeScript definitions add tokens to prompt. Mitigation: Type files are typically small (50-100 lines). |
| **More Files to Maintain** | Each response type needs: `Type.ts` + `Type.schema.ts` + examples. Tradeoff for type safety. |
| **Type ↔ Schema Drift Risk** | TypeScript interface and Zod schema are separate files. Mitigation: Unit tests verify they match (see Testing section). Can also use `ts-to-zod` to auto-generate. |
| **JSDoc Discipline Required** | Poor JSDoc = poor AI instructions. Code review must enforce quality JSDoc. |
| **Runtime File Reading** | Slight I/O overhead. Mitigated with caching; types change rarely. |
| **Learning Curve** | Developers must understand the pattern. Mitigated by comprehensive examples in this doc. |

### Will AI Assistants Struggle to Implement This?

**No — implement this in Phase 1 (MVP).**

This pattern may *look* novel, but it composes entirely standard, well-documented pieces:

| Component | AI Training Coverage |
|-----------|---------------------|
| TypeScript interfaces | Extremely common |
| JSDoc documentation | Extremely common |
| fs.readFileSync | Extremely common |
| Zod schemas | Very common (popular validation library) |
| String template assembly | Extremely common |
| NestJS services | Very common |

Each piece is standard; only the *composition* is project-specific. The detailed implementation examples in this document provide all the context an AI assistant needs. In fact, having this documented so explicitly **helps** AI assistants — they can follow the established pattern exactly.

**Why this is MVP-appropriate:**      
1. **Prevents tech debt** — Without typed responses from day one, you'll accumulate ad-hoc prompt strings and unvalidated responses that are painful to migrate later.
2. **Catches errors early** — Validation failures during development show prompt issues before users see them.
3. **Enables iteration** — Changing response formats is trivial: update the type, schema follows, AI adapts automatically.   
4. **Clear ownership** — Developers know exactly where AI contracts live: `libs/4eye-types/ai/`.

**Cost of deferring:** Implementing this later means migrating existing prompts, adding validation to already-working code, and risking production with unvalidated AI responses. This is **more work**, not less.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     TYPED AI RESPONSE SYSTEM                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  1. TYPE DEFINITION (libs/4eye-types/ai/)                            │   │
│   │                                                                       │   │
│   │  TypeScript Interface + JSDoc                                        │   │
│   │  ├── @property descriptions → Tell AI what each field means         │   │
│   │  ├── @example annotations  → Show AI exact formatting               │   │
│   │  └── Type constraints      → Enforce structure                       │   │
│   └─────────────────────────────────┬───────────────────────────────────┘   │
│                                     │                                        │
│                                     │ read at runtime                        │
│                                     ▼                                        │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  2. TYPE READER (backend/src/modules/ai/type-reader/)                │   │
│   │                                                                       │   │
│   │  - Reads .ts files from libs/4eye-types/                            │   │
│   │  - Wraps in markdown code blocks                                    │   │
│   │  - Caches for performance                                           │   │
│   │  - Returns formatted string for prompt injection                    │   │
│   └─────────────────────────────────┬───────────────────────────────────┘   │
│                                     │                                        │
│                                     │ inject into                            │
│                                     ▼                                        │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  3. PROMPT BUILDER (backend/src/modules/ai/prompts/)                 │   │
│   │                                                                       │   │
│   │  buildPrompt<TResponse>(input, context): TypedPrompt<TResponse>     │   │
│   │                                                                       │   │
│   │  Assembles three parts:                                              │   │
│   │  ├── System instructions (what to do, rules, context)               │   │
│   │  ├── Type definitions (from typeReader — the shape/format)          │   │
│   │  └── Few-shot examples (concrete input → output samples)            │   │
│   │                                                                       │   │
│   │  The function's return type knows which response type to expect     │   │
│   └─────────────────────────────────┬───────────────────────────────────┘   │
│                                     │                                        │
│                                     │ send to                                │
│                                     ▼                                        │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  4. AI PROVIDER (C5)                                                 │   │
│   │                                                                       │   │
│   │  sendPrompt<T>(prompt: TypedPrompt<T>): Promise<AIResponse<T>>      │   │
│   │                                                                       │   │
│   │  - Sends to OpenAI/Anthropic/etc                                    │   │
│   │  - Receives raw response                                            │   │
│   │  - Passes to validator                                              │   │
│   └─────────────────────────────────┬───────────────────────────────────┘   │
│                                     │                                        │
│                                     │ validate                               │
│                                     ▼                                        │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  5. VALIDATOR (libs/4eye-types/ai/validators/)                       │   │
│   │                                                                       │   │
│   │  Zod schemas that mirror TypeScript interfaces                      │   │
│   │  ├── Parse AI response JSON                                         │   │
│   │  ├── Validate against schema                                        │   │
│   │  ├── Return typed object or throw validation error                  │   │
│   │  └── Log validation failures for prompt improvement                 │   │
│   └─────────────────────────────────┬───────────────────────────────────┘   │
│                                     │                                        │
│                                     │ return                                 │
│                                     ▼                                        │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  6. TYPED RESPONSE                                                   │   │
│   │                                                                       │   │
│   │  Fully typed object matching the TypeScript interface               │   │
│   │  Ready for use in application code                                  │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
libs/4eye-types/
├── ai/
│   ├── index.ts                    # Re-exports all AI types
│   │
│   ├── base/
│   │   ├── AIResponseBase.ts       # Common fields for all AI responses
│   │   ├── AIRequestContext.ts     # Intent, learner, environment context
│   │   └── index.ts
│   │
│   ├── chat/
│   │   ├── ChatResponse.ts         # Chat message response type
│   │   ├── ChatResponse.schema.ts  # Zod validator for ChatResponse
│   │   └── index.ts
│   │
│   ├── learning/
│   │   ├── TriadicAssociationResponse.ts     # Neural-net style 3-word associations
│   │   ├── TriadicAssociationResponse.schema.ts
│   │   ├── TriangleResponse.ts               # Full learning mode triangles
│   │   ├── TriangleResponse.schema.ts
│   │   ├── SimplifyResponse.ts               # Simplification response
│   │   ├── SimplifyResponse.schema.ts
│   │   └── index.ts
│   │
│   └── validation/
│       ├── validateResponse.ts     # Generic validation function
│       └── index.ts

backend/src/modules/ai/
├── type-reader/
│   ├── type-reader.service.ts      # Reads type files, caches results
│   └── type-reader.module.ts
│
├── prompts/
│   ├── prompt-builder.service.ts   # Generic prompt assembly
│   ├── prompt-builder.module.ts
│   │
│   ├── chat/
│   │   ├── chat-prompt.builder.ts  # Chat-specific prompt builder
│   │   └── chat-examples.ts        # Few-shot examples for chat
│   │
│   └── learning/
│       ├── triadic-prompt.builder.ts
│       ├── triadic-examples.ts
│       ├── triangle-prompt.builder.ts
│       ├── triangle-examples.ts
│       └── simplify-prompt.builder.ts
│
└── ai.module.ts                    # Main AI module
```

---

## Component Details

### 1. Type Definition (with JSDoc)

The type file serves three purposes simultaneously:
- **TypeScript interface** — Compile-time type checking for developers
- **AI instructions** — JSDoc tells AI exactly what each field means
- **Documentation** — Developers read the same docs AI uses

```typescript
// libs/4eye-types/ai/chat/ChatResponse.ts

/**
 * Response from AI chat conversation.
 * 
 * This interface defines the structure AI must return for chat interactions.
 * The AI adapts responses based on accessibility mode, reading level, and language.
 * 
 * @interface ChatResponseData
 */
export interface ChatResponseData {
  /**
   * The main response message to display to the user.
   * 
   * AI should adapt this based on:
   * - Accessibility mode (ADHD: shorter, bullet points; Autism: literal language)
   * - Reading level (1-5, where 1 is child-friendly)
   * - Preferred language (translate if different from source)
   * 
   * @example "Here are the three main concepts from this passage:"
   * @example "The key idea is that resilience grows through consistent small steps."
   */
  message: string;

  /**
   * Suggested action buttons to show after this message.
   * 
   * AI should suggest 2-4 relevant next actions based on context.
   * Each action maps to a learning mode or chat continuation.
   * 
   * @example [{ type: "learning_mode", label: "Simplify", mode: "SIMPLIFY" }]
   * @example [{ type: "quiz", label: "Test my understanding" }]
   */
  suggestedActions?: SuggestedAction[];

  /**
   * Key concepts mentioned or explained in this response.
   * 
   * AI should extract 1-5 main concepts for progress tracking.
   * These link to the user's knowledge web.
   * 
   * @example ["resilience", "growth", "healing"]
   * @example ["positivity", "progression"]
   */
  conceptsReferenced?: string[];

  /**
   * Follow-up questions the user might want to ask.
   * 
   * AI should generate 2-3 natural follow-up questions.
   * These appear as clickable suggestions in the chat UI.
   * 
   * @example ["How does this connect to building habits?"]
   * @example ["Can you give me a real-world example?"]
   */
  followUpQuestions?: string[];

  /**
   * Confidence score for this response (0-1).
   * 
   * AI should indicate confidence level:
   * - 0.9+ : High confidence, well-established facts
   * - 0.7-0.9 : Moderate confidence, some interpretation
   * - <0.7 : Lower confidence, should caveat response
   * 
   * @example 0.95
   * @example 0.72
   */
  confidence?: number;
}

/**
 * Action button suggested by AI.
 */
export interface SuggestedAction {
  /**
   * Type of action.
   * 
   * @example "learning_mode" - Triggers a learning mode transformation
   * @example "quiz" - Starts a quiz on discussed concepts
   * @example "simplify" - Simplifies the last response
   * @example "translate" - Translates to another language
   * @example "continue" - Continues the conversation on a topic
   */
  type: 'learning_mode' | 'quiz' | 'simplify' | 'translate' | 'continue';

  /**
   * Button label to display.
   * 
   * @example "Show Associations"
   * @example "Quiz Me"
   * @example "Simplify"
   */
  label: string;

  /**
   * Additional parameters for the action.
   * 
   * @example { mode: "TRIADIC" }
   * @example { targetLanguage: "es" }
   */
  params?: Record<string, unknown>;
}
```

### 2. Type Reader

Reads TypeScript files at runtime and formats for prompt injection.

```typescript
// backend/src/modules/ai/type-reader/type-reader.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

interface TypeFileConfig {
  name: string;
  files: string[];  // Files to read for this type
}

@Injectable()
export class TypeReaderService implements OnModuleInit {
  private typeCache = new Map<string, string>();
  private readonly typesBasePath: string;

  constructor() {
    // Path to libs/4eye-types from backend
    this.typesBasePath = path.resolve(process.cwd(), '../../libs/4eye-types');
  }

  async onModuleInit() {
    // Pre-cache commonly used types on startup
    await this.cacheTypeFiles();
  }

  /**
   * Get formatted type documentation for a specific response type.
   * 
   * @param typeName - Name of the type (e.g., 'chat', 'triangle', 'simplify')
   * @returns Formatted TypeScript code with JSDoc, wrapped in markdown code block
   */
  getTypeDoc(typeName: string): string {
    const cached = this.typeCache.get(typeName);
    if (cached) {
      return cached;
    }

    const content = this.readTypeFiles(typeName);
    this.typeCache.set(typeName, content);
    return content;
  }

  /**
   * Read type files for a given type name.
   */
  private readTypeFiles(typeName: string): string {
    const config = this.getTypeConfig(typeName);
    
    const contents = config.files.map(file => {
      const filePath = path.join(this.typesBasePath, 'ai', file);
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        return `// === ${file} ===\n${content}`;
      } catch (error) {
        console.error(`[TypeReader] Failed to read: ${file}`, error);
        return `// Failed to load ${file}`;
      }
    });

    return `\`\`\`typescript
${contents.join('\n\n')}
\`\`\``;
  }

  /**
   * Configuration for which files to read per type.
   */
  private getTypeConfig(typeName: string): TypeFileConfig {
    const configs: Record<string, TypeFileConfig> = {
      chat: {
        name: 'Chat Response',
        files: ['base/AIResponseBase.ts', 'chat/ChatResponse.ts'],
      },
      triadic: {
        name: 'Triadic Associations Learning Mode',
        files: ['base/AIResponseBase.ts', 'learning/TriadicAssociationResponse.ts'],
      },
      triangle: {
        name: 'Triangle Learning Mode',
        files: ['base/AIResponseBase.ts', 'learning/TriangleResponse.ts'],
      },
      simplify: {
        name: 'Simplify Learning Mode',
        files: ['base/AIResponseBase.ts', 'learning/SimplifyResponse.ts'],
      },
      // Add more as needed
    };

    return configs[typeName] || { name: typeName, files: [`${typeName}.ts`] };
  }

  /**
   * Pre-cache type files on startup.
   */
  private async cacheTypeFiles(): Promise<void> {
    const typeNames = ['chat', 'triadic', 'triangle', 'simplify'];
    for (const typeName of typeNames) {
      this.getTypeDoc(typeName);
    }
  }

  /**
   * Clear cache (useful for development hot-reload).
   */
  clearCache(): void {
    this.typeCache.clear();
  }
}
```

### 3. Prompt Builder

Assembles the three parts of the prompt and returns a typed structure.

```typescript
// backend/src/modules/ai/prompts/prompt-builder.service.ts

import { Injectable } from '@nestjs/common';
import { TypeReaderService } from '../type-reader/type-reader.service';
import { AIRequestContext } from '@4eye/types';

/**
 * A prompt that knows its expected response type.
 */
export interface TypedPrompt<TResponse> {
  systemPrompt: string;
  userPrompt: string;
  expectedResponseType: string;  // For logging/debugging
  _responseType?: TResponse;     // Phantom type for type inference
}

@Injectable()
export class PromptBuilderService {
  constructor(private typeReader: TypeReaderService) {}

  /**
   * Build a typed prompt for chat responses.
   */
  buildChatPrompt(
    userMessage: string,
    context: AIRequestContext,
  ): TypedPrompt<ChatResponseData> {
    const typeDoc = this.typeReader.getTypeDoc('chat');
    
    const systemPrompt = this.buildSystemPrompt(context, typeDoc);
    const userPrompt = this.buildUserPrompt(userMessage, context);

    return {
      systemPrompt,
      userPrompt,
      expectedResponseType: 'ChatResponseData',
    };
  }

  private buildSystemPrompt(context: AIRequestContext, typeDoc: string): string {
    return `You are a learning assistant for 4eye.

${this.getAccessibilityInstructions(context.accessibilityMode)}

${this.getReadingLevelInstructions(context.readingLevel)}

${this.getLanguageInstructions(context.preferredLanguage)}

═══════════════════════════════════════════════════════════════════
RESPONSE FORMAT: You MUST respond with valid JSON matching this TypeScript interface.
═══════════════════════════════════════════════════════════════════

${typeDoc}

═══════════════════════════════════════════════════════════════════
CRITICAL RULES:
═══════════════════════════════════════════════════════════════════

1. Respond with ONLY valid JSON. No markdown, no explanation, no extra text.
2. First character MUST be { and last character MUST be }
3. Include ONLY fields defined in the interface above
4. Follow the @example annotations for formatting guidance
`;
  }

  private buildUserPrompt(message: string, context: AIRequestContext): string {
    let prompt = `User message: ${message}`;

    if (context.recentConcepts?.length) {
      prompt += `\n\nRecent concepts discussed: ${context.recentConcepts.join(', ')}`;
    }

    if (context.learningGoals?.length) {
      prompt += `\n\nUser's learning goals: ${context.learningGoals.join(', ')}`;
    }

    return prompt;
  }

  private getAccessibilityInstructions(mode: string): string {
    const instructions: Record<string, string> = {
      default: '',
      adhd: `ACCESSIBILITY: ADHD MODE
- Use short paragraphs (2-3 sentences max)
- Lead with the key point, then explain
- Use bullet points liberally
- Bold important terms
- Avoid tangents`,
      autism: `ACCESSIBILITY: AUTISM MODE
- Use literal, precise language
- Avoid idioms and metaphors
- Maintain predictable structure
- Be explicit, not implied
- Use consistent terminology`,
      dyslexia: `ACCESSIBILITY: DYSLEXIA MODE
- Use simple, common vocabulary
- Short sentences
- Avoid complex word structures
- Break information into small chunks`,
    };
    return instructions[mode] || '';
  }

  private getReadingLevelInstructions(level: number): string {
    const levels: Record<number, string> = {
      1: 'READING LEVEL: Child (8-10). Use simple words, short sentences, relatable examples.',
      2: 'READING LEVEL: Teen (13-15). Moderate vocabulary, clear explanations.',
      3: 'READING LEVEL: Adult (General). Standard vocabulary, natural language.',
      4: 'READING LEVEL: Advanced. Technical terms acceptable with context.',
      5: 'READING LEVEL: Academic. Full technical vocabulary, formal structure.',
    };
    return levels[level] || levels[3];
  }

  private getLanguageInstructions(language: string): string {
    if (language === 'en') return '';
    return `LANGUAGE: Respond in ${language}. Translate all content including suggested actions.`;
  }
}
```

### 4. Zod Validator

Runtime validation to catch AI format errors.

**Important: Type-Schema Synchronization**

There are two files per response type:
1. `ChatResponse.ts` — TypeScript interface with JSDoc (sent to AI in prompts)
2. `ChatResponse.schema.ts` — Zod schema (validates AI responses at runtime)

These MUST stay in sync. Options to ensure this:

| Approach | Pros | Cons |
|----------|------|------|
| **Manual + Tests** | Simple, explicit | Must remember to update both |
| **ts-to-zod** | Auto-generate Zod from TS | Doesn't support all JSDoc patterns |
| **Zod-first + derive type** | Single source, `z.infer<>` gives type | JSDoc on Zod less readable for AI prompts |

**Recommended approach:** Manual + Tests (shown in Testing section). The TypeScript interface is optimized for AI readability (JSDoc), and tests catch drift.

If drift becomes a problem, consider [`ts-to-zod`](https://github.com/fabien0102/ts-to-zod) to generate schemas:
```bash
npx ts-to-zod libs/4eye-types/ai/chat/ChatResponse.ts libs/4eye-types/ai/chat/ChatResponse.schema.ts
```

```typescript
// libs/4eye-types/ai/chat/ChatResponse.schema.ts

import { z } from 'zod';

export const SuggestedActionSchema = z.object({
  type: z.enum(['learning_mode', 'quiz', 'simplify', 'translate', 'continue']),
  label: z.string(),
  params: z.record(z.unknown()).optional(),
});

export const ChatResponseDataSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
  suggestedActions: z.array(SuggestedActionSchema).optional(),
  conceptsReferenced: z.array(z.string()).optional(),
  followUpQuestions: z.array(z.string()).optional(),
  confidence: z.number().min(0).max(1).optional(),
});

export type ChatResponseData = z.infer<typeof ChatResponseDataSchema>;
```

```typescript
// libs/4eye-types/ai/validation/validateResponse.ts

import { z, ZodSchema } from 'zod';

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  rawResponse: string;
}

/**
 * Validate an AI response against a Zod schema.
 */
export function validateResponse<T>(
  rawResponse: string,
  schema: ZodSchema<T>,
): ValidationResult<T> {
  try {
    // Extract JSON from response (handle markdown code blocks, etc.)
    const jsonText = extractJson(rawResponse);
    const parsed = JSON.parse(jsonText);
    
    // Validate against schema
    const result = schema.safeParse(parsed);
    
    if (result.success) {
      return {
        success: true,
        data: result.data,
        rawResponse,
      };
    } else {
      return {
        success: false,
        error: formatZodError(result.error),
        rawResponse,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: `JSON parse error: ${error.message}`,
      rawResponse,
    };
  }
}

function extractJson(text: string): string {
  const trimmed = text.trim();
  
  // Already JSON
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    return trimmed;
  }
  
  // Extract from markdown code block
  const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    return codeBlockMatch[1].trim();
  }
  
  // Find JSON object/array in text
  const jsonMatch = text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
  if (jsonMatch) {
    return jsonMatch[1];
  }
  
  return trimmed;
}

function formatZodError(error: z.ZodError): string {
  return error.errors
    .map(e => `${e.path.join('.')}: ${e.message}`)
    .join('; ');
}
```

### 5. Full Integration Example

```typescript
// backend/src/modules/ai/chat/chat.service.ts

import { Injectable } from '@nestjs/common';
import { AIService } from '../ai.service';
import { PromptBuilderService, TypedPrompt } from '../prompts/prompt-builder.service';
import { validateResponse } from '@4eye/types/ai/validation';
import { ChatResponseDataSchema, ChatResponseData } from '@4eye/types/ai/chat';
import { AIRequestContext } from '@4eye/types';

@Injectable()
export class ChatService {
  constructor(
    private aiService: AIService,
    private promptBuilder: PromptBuilderService,
  ) {}

  async chat(
    userMessage: string,
    context: AIRequestContext,
  ): Promise<ChatResponseData> {
    // 1. Build typed prompt
    const prompt: TypedPrompt<ChatResponseData> = 
      this.promptBuilder.buildChatPrompt(userMessage, context);

    // 2. Send to AI provider
    const rawResponse = await this.aiService.generateText(
      prompt.systemPrompt,
      prompt.userPrompt,
    );

    // 3. Validate response
    const validation = validateResponse(rawResponse.text, ChatResponseDataSchema);

    if (!validation.success) {
      // Log for prompt improvement
      console.error('[Chat] Validation failed:', validation.error);
      console.error('[Chat] Raw response:', validation.rawResponse);
      
      // Option: Retry with stricter instructions, or throw
      throw new Error(`AI response validation failed: ${validation.error}`);
    }

    // 4. Return typed data
    return validation.data;
  }
}
```

---

## Adding a New Response Type

Step-by-step process for adding a new AI response type:

### Step 1: Create Type File with JSDoc

```typescript
// libs/4eye-types/ai/learning/SimplifyResponse.ts

/**
 * Response from AI for simplifying content.
 * 
 * @interface SimplifyResponseData
 */
export interface SimplifyResponseData {
  /**
   * The simplified version of the content.
   * Should be significantly shorter and use simpler vocabulary.
   * 
   * @example "Small steps each day build lasting strength. This is called progression."
   */
  simplified: string;

  /**
   * Key terms extracted and defined simply.
   * 
   * @example [{ term: "resilience", definition: "The ability to recover and grow stronger from challenges" }]
   */
  keyTerms?: Array<{
    term: string;
    definition: string;
  }>;

  /**
   * Complexity reduction percentage (estimate).
   * 
   * @example 0.65 — Content reduced by 65%
   */
  reductionPercent?: number;
}
```

### Step 2: Create Zod Schema

```typescript
// libs/4eye-types/ai/learning/SimplifyResponse.schema.ts

import { z } from 'zod';

export const SimplifyResponseDataSchema = z.object({
  simplified: z.string().min(1),
  keyTerms: z.array(z.object({
    term: z.string(),
    definition: z.string(),
  })).optional(),
  reductionPercent: z.number().min(0).max(1).optional(),
});

export type SimplifyResponseData = z.infer<typeof SimplifyResponseDataSchema>;
```

### Step 3: Create Prompt Builder

```typescript
// backend/src/modules/ai/prompts/learning/simplify-prompt.builder.ts

import { Injectable } from '@nestjs/common';
import { TypeReaderService } from '../../type-reader/type-reader.service';
import { TypedPrompt } from '../prompt-builder.service';
import { SimplifyResponseData } from '@4eye/types/ai/learning';
import { AIRequestContext } from '@4eye/types';

@Injectable()
export class SimplifyPromptBuilder {
  constructor(private typeReader: TypeReaderService) {}

  build(
    content: string,
    targetLevel: number,
    context: AIRequestContext,
  ): TypedPrompt<SimplifyResponseData> {
    const typeDoc = this.typeReader.getTypeDoc('simplify');

    const systemPrompt = `You are an expert at simplifying complex content while preserving meaning.

Target Reading Level: ${targetLevel} (1=child, 5=academic)
Current User Level: ${context.readingLevel}

Your task: Simplify the given content to the target reading level.
- Use simpler vocabulary
- Shorter sentences
- Remove unnecessary details
- Keep the core meaning intact

RESPONSE FORMAT:
${typeDoc}

Respond with ONLY valid JSON. No other text.`;

    const userPrompt = `Simplify this content:\n\n${content}`;

    return {
      systemPrompt,
      userPrompt,
      expectedResponseType: 'SimplifyResponseData',
    };
  }
}
```

### Step 4: Add to Type Reader Config

```typescript
// In type-reader.service.ts, add to configs:
simplify: {
  name: 'Simplify Learning Mode',
  files: ['base/AIResponseBase.ts', 'learning/SimplifyResponse.ts'],
},
```

### Step 5: Re-export from Index

```typescript
// libs/4eye-types/ai/learning/index.ts
export * from './SimplifyResponse';
export * from './SimplifyResponse.schema';
```

---

## Error Handling & Retry

```typescript
// backend/src/modules/ai/validation/retry-strategy.ts

export interface RetryConfig {
  maxRetries: number;
  onValidationFail: 'retry' | 'fallback' | 'throw';
  fallbackMessage?: string;
}

export async function executeWithValidation<T>(
  generateFn: () => Promise<string>,
  schema: z.ZodSchema<T>,
  config: RetryConfig,
): Promise<T> {
  let lastError: string;

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    const rawResponse = await generateFn();
    const validation = validateResponse(rawResponse, schema);

    if (validation.success) {
      return validation.data;
    }

    lastError = validation.error;
    console.warn(`[AI] Validation failed (attempt ${attempt + 1}):`, lastError);
  }

  if (config.onValidationFail === 'throw') {
    throw new Error(`AI validation failed after ${config.maxRetries + 1} attempts: ${lastError}`);
  }

  // Return fallback or throw
  throw new Error(`AI validation failed: ${lastError}`);
}
```

---

## Testing Strategy

```typescript
// Test that types and schemas stay in sync
describe('Type-Schema Sync', () => {
  it('ChatResponseDataSchema matches ChatResponseData interface', () => {
    // Create valid object matching interface
    const validResponse: ChatResponseData = {
      message: 'Test message',
      suggestedActions: [{ type: 'quiz', label: 'Quiz Me' }],
      conceptsReferenced: ['concept1'],
      followUpQuestions: ['What about...?'],
      confidence: 0.9,
    };

    // Schema should accept it
    expect(ChatResponseDataSchema.safeParse(validResponse).success).toBe(true);
  });

  it('Schema rejects invalid data', () => {
    const invalid = {
      message: '', // Too short
      confidence: 2, // Out of range
    };
    expect(ChatResponseDataSchema.safeParse(invalid).success).toBe(false);
  });
});
```

---

## Observability

Track validation failures to improve prompts:

```typescript
interface ValidationFailureLog {
  timestamp: Date;
  promptType: string;
  error: string;
  rawResponse: string;
  context: {
    userId?: string;
    accessibilityMode: string;
    readingLevel: number;
  };
}

// Store in DB for analysis
// Use to improve prompts, add examples, clarify JSDoc
```

---

## Dependencies

| Dependency | Purpose |
|------------|---------|
| C5 — AI Provider | Sends prompts to AI providers |
| zod | Runtime validation |
| TypeScript | Compile-time types |
| fs (Node.js) | Reading type files |

---

## Acceptance Criteria

- [ ] Type files with comprehensive JSDoc created for all MVP response types
- [ ] TypeReaderService reads and caches type files
- [ ] PromptBuilderService assembles typed prompts
- [ ] Zod schemas exist for all response types
- [ ] Validation catches AI format errors
- [ ] Retry strategy handles validation failures
- [ ] Error logging captures failures for prompt improvement
- [ ] Tests verify type-schema sync
