/**
 * Text Generation Provider Interface
 * 
 * Provider-agnostic abstraction for LLM services.
 * Adapters implement this interface for each provider (OpenAI, Anthropic, etc.)
 */

export interface TextGenerationOptions {
  /** Model to use (provider-specific) */
  model?: string;
  /** Maximum tokens to generate */
  maxTokens?: number;
  /** Temperature (0.0-2.0) */
  temperature?: number;
  /** Top-p sampling */
  topP?: number;
  /** Stop sequences */
  stopSequences?: string[];
  /** System message/prompt */
  systemPrompt?: string;
  /** Response format hint */
  responseFormat?: 'text' | 'json';
  /** JSON schema for structured output (if supported) */
  jsonSchema?: Record<string, unknown>;
}

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface TextGenerationResult {
  text: string;
  finishReason: 'stop' | 'length' | 'content_filter' | 'error';
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  provider: string;
  model: string;
}

export interface StreamingTextCallbacks {
  onToken: (token: string) => void;
  onComplete: (result: TextGenerationResult) => void;
  onError: (error: Error) => void;
}

/**
 * Abstract base interface for text generation providers
 */
export interface TextGenerationProvider {
  /** Provider identifier (e.g., 'openai', 'anthropic') */
  readonly name: string;
  
  /** Check if provider is available (API key configured, etc.) */
  isAvailable(): Promise<boolean>;
  
  /** List available models for this provider */
  listModels(): string[];
  
  /**
   * Generate text from a prompt
   * @param prompt - User prompt
   * @param options - Generation options
   */
  generateText(
    prompt: string,
    options?: TextGenerationOptions,
  ): Promise<TextGenerationResult>;
  
  /**
   * Generate text with full message history
   * @param messages - Conversation history
   * @param options - Generation options
   */
  chat(
    messages: Message[],
    options?: TextGenerationOptions,
  ): Promise<TextGenerationResult>;
  
  /**
   * Stream text generation
   * @param prompt - User prompt
   * @param callbacks - Streaming callbacks
   * @param options - Generation options
   */
  streamText?(
    prompt: string,
    callbacks: StreamingTextCallbacks,
    options?: TextGenerationOptions,
  ): Promise<void>;
  
  /** Whether this provider supports streaming */
  supportsStreaming(): boolean;
  
  /** Whether this provider supports JSON mode / structured output */
  supportsStructuredOutput(): boolean;
}
