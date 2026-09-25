/**
 * AI Service - Core Gemini Client
 *
 * Provides configured Gemini model instances for all AI operations.
 * Includes JSON parsing utilities and error handling.
 */

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI, GenerativeModel, GenerationConfig } from '@google/generative-ai';

// Configuration constants
const GEMINI_MODEL = 'gemini-2.5-pro';
const GEMINI_MAX_OUTPUT_TOKENS = 65536;

/**
 * Enhanced prompt prefix - adds thoughtful approach to all AI operations
 * Per user requirements: "spend time thinking, and get it perfect"
 */
export const ENHANCED_PROMPT_PREFIX = `
IMPORTANT: Spend time thinking through this carefully, and get it perfect. 
Quality matters more than speed. Take your time to analyze thoroughly.
`;

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI | null = null;

  constructor(private configService: ConfigService) {}

  /**
   * Get or create the Gemini AI instance
   */
  private getGenAI(): GoogleGenerativeAI {
    if (!this.genAI) {
      const apiKey = this.configService.get<string>('GOOGLE_API_KEY');
      if (!apiKey) {
        throw new Error('GOOGLE_API_KEY environment variable is not set');
      }
      this.genAI = new GoogleGenerativeAI(apiKey);
    }
    return this.genAI;
  }

  /**
   * Create a Gemini model configured for JSON output
   */
  createJsonModel(options?: {
    temperature?: number;
    systemInstruction?: string;
    maxOutputTokens?: number;
  }): GenerativeModel {
    const genAI = this.getGenAI();

    const generationConfig: GenerationConfig = {
      responseMimeType: 'application/json',
      maxOutputTokens: options?.maxOutputTokens ?? GEMINI_MAX_OUTPUT_TOKENS,
      temperature: options?.temperature ?? 0.7,
    };

    const modelOptions: Parameters<typeof genAI.getGenerativeModel>[0] = {
      model: GEMINI_MODEL,
      generationConfig,
    };

    if (options?.systemInstruction) {
      modelOptions.systemInstruction = options.systemInstruction;
    }

    return genAI.getGenerativeModel(modelOptions);
  }

  /**
   * Create a Gemini model for general text output
   */
  createTextModel(options?: {
    temperature?: number;
    systemInstruction?: string;
  }): GenerativeModel {
    const genAI = this.getGenAI();

    const generationConfig: GenerationConfig = {
      maxOutputTokens: GEMINI_MAX_OUTPUT_TOKENS,
      temperature: options?.temperature ?? 0.7,
    };

    const modelOptions: Parameters<typeof genAI.getGenerativeModel>[0] = {
      model: GEMINI_MODEL,
      generationConfig,
    };

    if (options?.systemInstruction) {
      modelOptions.systemInstruction = options.systemInstruction;
    }

    return genAI.getGenerativeModel(modelOptions);
  }

  /**
   * Generate content from a model
   */
  async generateContent(model: GenerativeModel, prompt: string): Promise<string> {
    // Add enhanced thinking prefix to all prompts
    const enhancedPrompt = ENHANCED_PROMPT_PREFIX + prompt;
    
    const result = await model.generateContent(enhancedPrompt);
    const response = result.response;
    return response.text();
  }

  /**
   * Extract JSON from a response that may contain markdown code blocks
   */
  extractJsonFromResponse(text: string): string {
    const trimmed = text.trim();

    // If already pure JSON, return as-is
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      return trimmed;
    }

    // Try to extract from markdown code block
    const jsonBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonBlockMatch) {
      return jsonBlockMatch[1].trim();
    }

    // Try to find JSON object/array anywhere in text
    const jsonMatch = text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (jsonMatch) {
      return jsonMatch[1];
    }

    return trimmed;
  }

  /**
   * Safely parse JSON with error context
   */
  safeJsonParse<T>(text: string, context?: string): T {
    try {
      const jsonText = this.extractJsonFromResponse(text);
      return JSON.parse(jsonText) as T;
    } catch (error) {
      const contextMsg = context ? ` (${context})` : '';
      const preview = text.substring(0, 200);
      throw new Error(
        `Failed to parse JSON response${contextMsg}. Preview: ${preview}...`,
      );
    }
  }

  /**
   * Get nested value from object using dot notation
   */
  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  /**
   * Set nested value in object using dot notation
   */
  setNestedValue(obj: any, path: string, value: any): void {
    const keys = path.split('.');
    const lastKey = keys.pop()!;
    const target = keys.reduce((current, key) => {
      if (current[key] === undefined) {
        current[key] = {};
      }
      return current[key];
    }, obj);
    target[lastKey] = value;
  }

  /**
   * Parse nested JSON strings within an object
   */
  parseNestedJsonStrings<T extends Record<string, any>>(
    obj: T,
    fields: string[],
  ): T {
    const result = { ...obj };

    for (const field of fields) {
      const value = this.getNestedValue(result, field);
      if (typeof value === 'string' && value.trim()) {
        try {
          this.setNestedValue(result, field, JSON.parse(value));
        } catch (e) {
          console.warn(`Failed to parse nested JSON field: ${field}`, e);
        }
      }
    }

    return result;
  }

  /**
   * Get the current Gemini model name
   */
  getModelName(): string {
    return GEMINI_MODEL;
  }
}
