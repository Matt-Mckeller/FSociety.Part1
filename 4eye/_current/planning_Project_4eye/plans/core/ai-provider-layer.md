# C5 — AI Provider Abstraction Layer

> Multi-provider AI service supporting OpenAI, Anthropic, Gemini, X (Grok), and DeepSeek. Provider switching, fallback, and unified interface.

**Status:** Planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md) | [decisions.md](../decisions.md)
**Related:** [C8 — Typed AI Responses](typed-ai-responses.md) — Full typed response system documentation

---

## ⚠️ Key Decisions (Do Not Overwrite)

1. **Typed AI Responses** — See [C8](typed-ai-responses.md) for full type system details
2. **Intent Tracking** — Every AI request includes context: learner identity, environment, goals
3. **Prompt Privacy** — Prompt templates are server-side only, never exposed to client
4. **Provider Agnostic** — Business logic never depends on specific provider
5. **Secrets Ready** — API keys via config service, ready for Secret Manager migration

---

## Technology Stack

| Component | Choice | Notes |
|-----------|--------|-------|
| Architecture | Adapter pattern | One adapter per provider |
| Primary provider | Configurable | Per task type |
| Fallback | Automatic | On failure, try next provider |

---

## Supported Providers

| Provider | Text Generation | Translation | Image Generation | STT |
|----------|----------------|-------------|------------------|-----|
| OpenAI | ✅ GPT-5.2, GPT-5.2-mini | ✅ GPT-5.2-mini | ✅ DALL-E 3 | ✅ Whisper |
| Anthropic | ✅ Claude 4.5 Opus, Haiku | ✅ Claude 4.5 Haiku | ❌ | ❌ |
| Google | ✅ Gemini 2 Pro/Flash | ✅ Cloud Translation | ✅ Imagen 3 | ✅ Cloud STT |
| X (Grok) | ✅ Grok 3 | ✅ Grok 3 | ❌ | ❌ |
| DeepSeek | ✅ DeepSeek V3, R1 | ✅ DeepSeek V3 | ❌ | ❌ |

### Model Selection by Task

| Task | Primary Model | Fallback | Notes |
|------|---------------|----------|-------|
| Chat (high volume) | GPT-5.2-mini | DeepSeek V3 | Cost-optimized |
| Summaries | GPT-5.2 | Claude 4.5 Opus | Quality-focused |
| Feedback | Claude 4.5 Opus | GPT-5.2 | Best nuanced analysis |
| Reading level adaptation | GPT-5.2-mini | DeepSeek V3 | Fast + cheap |
| Reasoning tasks | DeepSeek R1 | Claude 4.5 Opus | Strong reasoning |
| Image generation | DALL-E 3 | Imagen 3 | Visual context |

---

## Project Structure

```
backend/
├── src/
│   └── modules/
│       └── ai/
│           ├── ai.module.ts
│           ├── ai.service.ts           # Main orchestrator
│           ├── interfaces/
│           │   ├── ai-provider.interface.ts
│           │   ├── text-generation.interface.ts
│           │   ├── translation.interface.ts
│           │   ├── image-generation.interface.ts
│           │   └── speech-to-text.interface.ts
│           ├── adapters/
│           │   ├── openai.adapter.ts
│           │   ├── anthropic.adapter.ts
│           │   ├── google.adapter.ts
│           │   ├── grok.adapter.ts
│           │   └── deepseek.adapter.ts
│           ├── config/
│           │   └── ai-config.service.ts
│           └── dto/
│               ├── generate-text.dto.ts
│               ├── translate.dto.ts
│               └── generate-image.dto.ts
```

---

## Interfaces

### Base Provider Interface
```typescript
export interface AIProvider {
  name: string;
  isAvailable(): Promise<boolean>;
}

export interface TextGenerationProvider extends AIProvider {
  generateText(prompt: string, options?: TextGenerationOptions): Promise<TextGenerationResult>;
}

export interface TranslationProvider extends AIProvider {
  translate(text: string, targetLanguage: string, options?: TranslationOptions): Promise<TranslationResult>;
}

export interface ImageGenerationProvider extends AIProvider {
  generateImage(prompt: string, options?: ImageGenerationOptions): Promise<ImageGenerationResult>;
}

export interface SpeechToTextProvider extends AIProvider {
  transcribe(audio: Buffer, options?: TranscriptionOptions): Promise<TranscriptionResult>;
}
```

### Options & Results
```typescript
export interface TextGenerationOptions {
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
  readingLevel?: 'CHILD' | 'STANDARD' | 'ACADEMIC';
}

export interface TextGenerationResult {
  text: string;
  tokensUsed: number;
  provider: string;
  latencyMs: number;
}

export interface TranslationOptions {
  sourceLanguage?: string;  // Auto-detect if not provided
  readingLevel?: 'CHILD' | 'STANDARD' | 'ACADEMIC';
  preserveFormatting?: boolean;
}

export interface TranslationResult {
  text: string;
  detectedLanguage?: string;
  tokensUsed: number;
  provider: string;
}

export interface ImageGenerationOptions {
  size?: '256x256' | '512x512' | '1024x1024';
  style?: 'natural' | 'vivid';
  quality?: 'standard' | 'hd';
}

export interface ImageGenerationResult {
  url: string;
  provider: string;
  latencyMs: number;
}
```

---

## Adapter Implementation

### OpenAI Adapter
```typescript
import OpenAI from 'openai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenAIAdapter implements TextGenerationProvider, TranslationProvider, ImageGenerationProvider {
  name = 'openai';
  private client: OpenAI;

  constructor(private config: ConfigService) {
    this.client = new OpenAI({
      apiKey: this.config.get('OPENAI_API_KEY'),
    });
  }

  async isAvailable(): Promise<boolean> {
    try {
      await this.client.models.list();
      return true;
    } catch {
      return false;
    }
  }

  async generateText(prompt: string, options?: TextGenerationOptions): Promise<TextGenerationResult> {
    const start = Date.now();
    
    // Use GPT-5.2 for quality tasks, GPT-5.2-mini for high-volume/chat
    const model = options?.quality === 'high' ? 'gpt-5.2' : 'gpt-5.2-mini';
    
    const response = await this.client.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: options?.systemPrompt || 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: options?.maxTokens || 1000,
      temperature: options?.temperature || 0.7,
    });

    return {
      text: response.choices[0].message.content,
      tokensUsed: response.usage?.total_tokens || 0,
      provider: this.name,
      latencyMs: Date.now() - start,
    };
  }

  async translate(text: string, targetLanguage: string, options?: TranslationOptions): Promise<TranslationResult> {
    const readingLevelPrompt = this.getReadingLevelPrompt(options?.readingLevel);
    
    const prompt = `Translate the following text to ${targetLanguage}. ${readingLevelPrompt}
    
Text to translate:
${text}`;

    const result = await this.generateText(prompt, {
      systemPrompt: 'You are a professional translator. Only output the translation, nothing else.',
      temperature: 0.3,
    });

    return {
      text: result.text,
      tokensUsed: result.tokensUsed,
      provider: this.name,
    };
  }

  async generateImage(prompt: string, options?: ImageGenerationOptions): Promise<ImageGenerationResult> {
    const start = Date.now();

    const response = await this.client.images.generate({
      model: 'dall-e-3',
      prompt,
      size: options?.size || '1024x1024',
      quality: options?.quality || 'standard',
      style: options?.style || 'natural',
      n: 1,
    });

    return {
      url: response.data[0].url,
      provider: this.name,
      latencyMs: Date.now() - start,
    };
  }

  private getReadingLevelPrompt(level?: string): string {
    switch (level) {
      case 'CHILD':
        return 'Use simple words suitable for a 10-year-old child.';
      case 'ACADEMIC':
        return 'Use formal academic language.';
      default:
        return 'Use clear, everyday language.';
    }
  }
}
```

---

## AI Service (Orchestrator)

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { AIConfigService } from './config/ai-config.service';

@Injectable()
export class AIService {
  private readonly logger = new Logger(AIService.name);

  constructor(
    private config: AIConfigService,
    private openai: OpenAIAdapter,
    private anthropic: AnthropicAdapter,
    private google: GoogleAdapter,
    private grok: GrokAdapter,
    private deepseek: DeepSeekAdapter,
  ) {}

  async generateText(prompt: string, options?: TextGenerationOptions): Promise<TextGenerationResult> {
    const providers = this.config.getProvidersForTask('text-generation');
    return this.executeWithFallback(providers, (p) => p.generateText(prompt, options));
  }

  async translate(text: string, targetLanguage: string, options?: TranslationOptions): Promise<TranslationResult> {
    const providers = this.config.getProvidersForTask('translation');
    return this.executeWithFallback(providers, (p) => p.translate(text, targetLanguage, options));
  }

  async generateImage(prompt: string, options?: ImageGenerationOptions): Promise<ImageGenerationResult> {
    const providers = this.config.getProvidersForTask('image-generation');
    return this.executeWithFallback(providers, (p) => p.generateImage(prompt, options));
  }

  async transcribe(audio: Buffer, options?: TranscriptionOptions): Promise<TranscriptionResult> {
    // Whisper is primary, Google STT as fallback
    const providers = this.config.getProvidersForTask('speech-to-text');
    return this.executeWithFallback(providers, (p) => p.transcribe(audio, options));
  }

  private async executeWithFallback<T>(
    providers: AIProvider[],
    operation: (provider: any) => Promise<T>,
  ): Promise<T> {
    let lastError: Error;

    for (const provider of providers) {
      try {
        if (await provider.isAvailable()) {
          return await operation(provider);
        }
      } catch (error) {
        this.logger.warn(`Provider ${provider.name} failed: ${error.message}`);
        lastError = error;
      }
    }

    throw new Error(`All AI providers failed. Last error: ${lastError?.message}`);
  }
}
```

---

## Configuration

### ai-config.service.ts
```typescript
@Injectable()
export class AIConfigService {
  private taskConfig: Record<string, string[]> = {
    'text-generation': ['openai', 'anthropic', 'deepseek', 'google', 'grok'],
    'translation': ['openai', 'deepseek', 'google', 'anthropic'],
    'image-generation': ['openai', 'google'],
    'speech-to-text': ['openai', 'google'],  // Whisper first
    'summary': ['anthropic', 'openai', 'deepseek'],
    'positive-transform': ['anthropic', 'openai'],
    'reasoning': ['deepseek', 'anthropic', 'openai'],  // DeepSeek R1 for reasoning
  };

  getProvidersForTask(task: string): AIProvider[] {
    const providerNames = this.taskConfig[task] || ['openai'];
    return providerNames.map(name => this.getProvider(name));
  }

  getProvider(name: string): AIProvider {
    // Return the appropriate adapter instance
  }
}
```

### Environment Variables
```env
# OpenAI
OPENAI_API_KEY=sk-...

# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# Google
GOOGLE_AI_API_KEY=...
GOOGLE_PROJECT_ID=...

# X (Grok)
GROK_API_KEY=...

# DeepSeek
DEEPSEEK_API_KEY=...
```

---

## Usage Tracking

```typescript
@Injectable()
export class AIUsageService {
  constructor(private usageRepo: Repository<AIUsageLog>) {}

  async logUsage(
    subscriptionId: string,
    provider: string,
    task: string,
    tokensUsed: number,
    cost: number,
  ) {
    await this.usageRepo.save({
      subscriptionId,
      provider,
      task,
      tokensUsed,
      estimatedCost: cost,
      timestamp: new Date(),
    });
  }
}
```

---

## Prompt Templates

### Prompt Registry
```typescript
export const PROMPTS = {
  TRANSLATE: (targetLang: string, readingLevel: string, text: string) => `
Translate to ${targetLang}. ${readingLevel}

${text}
  `,

  SUMMARIZE: (transcript: string) => `
Create a concise summary of this session transcript.
Focus on the main message, key concepts, and actionable takeaways.

${transcript}
  `,

  POSITIVE_TRANSFORM: (text: string, verticalContext: string) => `
Rewrite the following text to remove any negative, divisive, or hateful content
while preserving the core message. Make it inclusive and uplifting.
Context: ${verticalContext}

Original: ${text}

Transformed:
  `,

  IMAGE_PROMPT: (concept: string, styleContext: string) => `
Create a serene, respectful illustration depicting: ${concept}
Style: ${styleContext}
  `,
};
```

---

## Typed AI Responses

All AI responses are typed to enable:
- Response validation against expected structure
- IDE autocomplete and type safety
- Knowing when to update prompts if types change
- Consistent handling across features

### Response Type Location

```
libs/4eye-types/
├── ai/
│   ├── index.ts
│   ├── base-response.ts        # Common fields (provider, latency, tokens)
│   ├── text-response.ts        # Text generation responses
│   ├── translation-response.ts # Translation responses
│   ├── chat-response.ts        # Chat/conversational responses
│   ├── learning-response.ts    # Learning mode transforms
│   ├── summary-response.ts     # Summary responses
│   └── validation.ts           # Runtime validators
```

### Base Response Interface

```typescript
// libs/4eye-types/ai/base-response.ts

export interface AIResponseBase {
  provider: string;
  model: string;
  tokensUsed: number;
  latencyMs: number;
  requestId: string;
}

export interface StructuredAIResponse<T> extends AIResponseBase {
  data: T;
  parseSuccess: boolean;
  rawResponse?: string;  // For debugging when parse fails
}
```

### Example: Chat Response Types

```typescript
// libs/4eye-types/ai/chat-response.ts

export interface ChatResponseData {
  message: string;
  suggestedActions?: SuggestedAction[];
  conceptsReferenced?: string[];
  followUpQuestions?: string[];
}

export interface SuggestedAction {
  type: 'learning_mode' | 'quiz' | 'simplify' | 'translate';
  label: string;
  params?: Record<string, unknown>;
}

export type ChatAIResponse = StructuredAIResponse<ChatResponseData>;
```

### Response Validation

```typescript
// libs/4eye-types/ai/validation.ts

import { z } from 'zod';

export const ChatResponseSchema = z.object({
  message: z.string(),
  suggestedActions: z.array(z.object({
    type: z.enum(['learning_mode', 'quiz', 'simplify', 'translate']),
    label: z.string(),
    params: z.record(z.unknown()).optional(),
  })).optional(),
  conceptsReferenced: z.array(z.string()).optional(),
  followUpQuestions: z.array(z.string()).optional(),
});

export function validateChatResponse(raw: unknown): ChatResponseData | null {
  const result = ChatResponseSchema.safeParse(raw);
  return result.success ? result.data : null;
}
```

### Passing Types to AI Prompts

Types are embedded in prompts to guide AI response structure:

```typescript
// backend/src/modules/ai/prompt-builder.ts

export class PromptBuilder {
  buildChatPrompt(userMessage: string, context: AIRequestContext): string {
    const responseFormat = this.getResponseTypeDescription('chat');
    
    return `
${context.systemPrompt}

User message: ${userMessage}

Respond with a JSON object matching this TypeScript interface:
${responseFormat}
`;
  }

  private getResponseTypeDescription(type: string): string {
    // Read from libs/4eye-types or embed directly
    // Keep in sync with actual TypeScript types
  }
}
```

---

## Intent Tracking & Context

Every AI request includes learner context for personalization.

### AIRequestContext Interface

```typescript
// libs/4eye-types/ai/context.ts

export interface AIRequestContext {
  // Learner Identity
  userId?: string;
  isGuest: boolean;
  accessibilityMode: 'default' | 'adhd' | 'autism' | 'dyslexia' | 'low_vision' | 'cognitive';
  preferredLanguage: string;
  readingLevel: number;  // 1-5
  
  // Environment
  sessionId?: string;
  roomId?: string;
  domain: 'religion' | 'education' | 'professional' | 'general';
  
  // Goals & Intent
  currentIntent?: 'learn' | 'review' | 'practice' | 'explore' | 'ask';
  learningGoals?: string[];
  recentConcepts?: string[];  // Concepts user has engaged with
  
  // Feature context
  featureId: string;  // Which feature initiated request (F4, F14, etc.)
  timestamp: Date;
}
```

### Context Builder

```typescript
// backend/src/modules/ai/context-builder.service.ts

@Injectable()
export class ContextBuilderService {
  constructor(
    private userService: UserService,
    private sessionService: SessionService,
  ) {}

  async buildContext(userId: string | null, sessionId: string | null, featureId: string): Promise<AIRequestContext> {
    const user = userId ? await this.userService.findById(userId) : null;
    const session = sessionId ? await this.sessionService.findById(sessionId) : null;
    
    return {
      userId: user?.id,
      isGuest: !user,
      accessibilityMode: user?.accessibilityMode || 'default',
      preferredLanguage: user?.preferredLanguage || 'en',
      readingLevel: user?.readingLevel || 3,
      
      sessionId: session?.id,
      roomId: session?.roomId,
      domain: session?.room?.domain || 'general',
      
      currentIntent: this.inferIntent(featureId),
      learningGoals: user?.learningGoals,
      recentConcepts: await this.getRecentConcepts(userId),
      
      featureId,
      timestamp: new Date(),
    };
  }
  
  private inferIntent(featureId: string): string {
    const intentMap = {
      'F4': 'ask',      // Chat
      'F14': 'learn',   // Learning modes
      'F15': 'practice', // Quizzes
      'F6': 'review',   // Summaries
    };
    return intentMap[featureId] || 'explore';
  }
}
```

---

## Prompt Privacy

### Security Considerations

- **Prompt templates are server-side only** — Never sent to client
- **No proprietary prompts in logs** — Log intent/context, not full prompts
- **Environment-based templates** — Can vary by deployment (dev vs prod)

### Implementation

```typescript
// backend/src/modules/ai/prompts/prompt-registry.ts

// This file is NEVER exported to frontend packages
// Prompts are internal implementation details

export const PROMPTS = {
  // ... prompt templates
};

// Only export prompt IDs to frontend, not content
export type PromptId = keyof typeof PROMPTS;
```

### What Gets Logged

```typescript
interface AIRequestLog {
  requestId: string;
  userId?: string;
  featureId: string;
  promptId: string;           // ✅ Log which prompt was used
  // promptContent: string;   // ❌ NEVER log full prompt
  contextSummary: {
    domain: string;
    readingLevel: number;
    accessibilityMode: string;
  };
  responseTokens: number;
  latencyMs: number;
}
```

---

## Secrets Management

### Current (Development)

```typescript
// backend/src/config/ai.config.ts

export default registerAs('ai', () => ({
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  anthropic: {
    apiKey: process.env.ANTHROPIC_API_KEY,
  },
  // ... other providers
}));
```

### Future (Production — GCP Secret Manager)

```typescript
// backend/src/config/ai.config.ts

import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

export class SecretsService {
  private client = new SecretManagerServiceClient();
  
  async getSecret(name: string): Promise<string> {
    const [version] = await this.client.accessSecretVersion({
      name: `projects/${process.env.GCP_PROJECT}/secrets/${name}/versions/latest`,
    });
    return version.payload.data.toString();
  }
}

// Config service abstraction — works with both .env and Secret Manager
@Injectable()
export class ConfigService {
  constructor(
    private config: NestConfigService,
    @Optional() private secrets?: SecretsService,
  ) {}
  
  async get(key: string): Promise<string> {
    // Try Secret Manager first in production
    if (this.secrets && process.env.NODE_ENV === 'production') {
      return this.secrets.getSecret(key);
    }
    return this.config.get(key);
  }
}
```

### Migration Path

1. **Phase 0-1:** Environment variables in `.env`, Docker Compose
2. **Phase 8 (Cloud Infra):** Migrate to GCP Secret Manager
3. **No code changes needed** — Config service abstraction handles both

---

## Dependencies

- C1 (Database) — Usage logging
- C3 (GraphQL) — API exposure
- `openai`
- `@anthropic-ai/sdk`
- `@google-cloud/aiplatform`

---

## Acceptance Criteria

- [ ] All 4 providers implemented (OpenAI, Anthropic, Google, Grok)
- [ ] Provider automatically falls back on failure
- [ ] Translation supports 5 languages + 3 reading levels
- [ ] Image generation works via DALL-E 3
- [ ] Whisper transcription integrated
- [ ] Usage tracked per subscription
- [ ] API keys configurable via environment
- [ ] Prompt templates centralized and reusable
