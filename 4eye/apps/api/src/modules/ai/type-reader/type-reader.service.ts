/**
 * Type Reader Service (C8 — Typed AI Response System)
 * 
 * Reads TypeScript type definitions from the filesystem at runtime
 * to include in AI prompts. The JSDoc documentation in type files
 * becomes the instructions for AI responses.
 * 
 * @module ai/type-reader
 */

import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs/promises';
import * as path from 'path';

/**
 * Configuration for a type category.
 */
export interface TypeConfig {
  /** Display name for the type category */
  name: string;
  /** Type files to read (relative to types lib) */
  files: string[];
}

/**
 * Registry of all AI response type categories.
 */
export interface TypeRegistry {
  [key: string]: TypeConfig;
}

/**
 * Cached type documentation.
 */
interface TypeCache {
  content: string;
  loadedAt: Date;
}

@Injectable()
export class TypeReaderService implements OnModuleInit {
  private readonly logger = new Logger(TypeReaderService.name);
  private readonly cache = new Map<string, TypeCache>();
  private typesBasePath: string;

  /**
   * Registry of AI response types.
   * Add new types here as features are built.
   */
  private readonly typeRegistry: TypeRegistry = {
    chat: {
      name: 'Chat',
      files: ['ai/chat/ChatResponse.ts'],
    },
    summaries: {
      name: 'Summaries',
      files: ['ai/summaries/SummaryResponse.ts'],
    },
    feedback: {
      name: 'Speaker Feedback',
      files: ['ai/feedback/FeedbackResponse.ts'],
    },
    quizzes: {
      name: 'Quizzes',
      files: ['ai/quizzes/QuizResponse.ts'],
    },
    // Future types to add:
    // recaps: { name: 'Recaps', files: ['ai/recaps/RecapResponse.ts'] },
    // learning: { name: 'Learning Modes', files: ['ai/learning/LearningResponse.ts'] },
    // visual: { name: 'Visual Generation', files: ['ai/visual/VisualResponse.ts'] },
    // comparison: { name: 'Comparison', files: ['ai/comparison/ComparisonResponse.ts'] },
    // transform: { name: 'Transform', files: ['ai/transform/TransformResponse.ts'] },
  };

  constructor(private readonly configService: ConfigService) {
    // Default path - can be overridden via config
    // Note: From /app/apps/api/dist/modules/ai/type-reader we need to go up 7 levels to reach /app
    this.typesBasePath = this.configService.get<string>(
      'TYPES_LIB_PATH',
      path.resolve(__dirname, '../../../../../../packages/@4eye/types/src'),
    );
  }

  async onModuleInit(): Promise<void> {
    // Pre-load all type files on startup
    await this.preloadTypes();
  }

  /**
   * Pre-load all registered type files into cache.
   */
  private async preloadTypes(): Promise<void> {
    this.logger.log('Pre-loading AI response type definitions...');
    
    for (const [key, config] of Object.entries(this.typeRegistry)) {
      try {
        await this.loadTypeFiles(key, config.files);
        this.logger.debug(`Loaded type: ${config.name}`);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        this.logger.warn(`Failed to load type ${key}: ${message}`);
      }
    }

    this.logger.log(`Loaded ${this.cache.size} type definitions`);
  }

  /**
   * Load type files for a category.
   */
  private async loadTypeFiles(key: string, files: string[]): Promise<void> {
    const contents: string[] = [];

    for (const file of files) {
      const filePath = path.join(this.typesBasePath, file);
      const content = await fs.readFile(filePath, 'utf-8');
      contents.push(content);
    }

    this.cache.set(key, {
      content: contents.join('\n\n'),
      loadedAt: new Date(),
    });
  }

  /**
   * Get the type documentation for a category.
   * Use this in prompt builders.
   * 
   * @param key - Type category key (e.g., 'chat', 'summaries')
   * @returns The TypeScript type definition with JSDoc
   */
  getTypeDoc(key: string): string {
    const cached = this.cache.get(key);
    if (!cached) {
      throw new Error(`Type documentation not found for key: ${key}`);
    }
    return cached.content;
  }

  /**
   * Get type documentation formatted for inclusion in an AI prompt.
   * Adds context about being a response format.
   * 
   * @param key - Type category key
   * @returns Formatted type documentation for prompts
   */
  getTypeDocForPrompt(key: string): string {
    const typeDoc = this.getTypeDoc(key);
    const config = this.typeRegistry[key];

    return `
## Response Format

You MUST respond with valid JSON that matches the following TypeScript interface.
Read the JSDoc comments carefully - they are your instructions.

\`\`\`typescript
${typeDoc}
\`\`\`

Remember:
- All required fields must be present
- Follow the constraints in @minLength, @maxLength, @minimum, @maximum
- Use the exact enum values specified
- Include examples where helpful
`.trim();
  }

  /**
   * Get list of available type keys.
   */
  getAvailableTypes(): string[] {
    return Object.keys(this.typeRegistry);
  }

  /**
   * Reload a specific type (useful for development).
   */
  async reloadType(key: string): Promise<void> {
    const config = this.typeRegistry[key];
    if (!config) {
      throw new Error(`Unknown type key: ${key}`);
    }
    await this.loadTypeFiles(key, config.files);
    this.logger.log(`Reloaded type: ${config.name}`);
  }

  /**
   * Reload all types (useful for development).
   */
  async reloadAll(): Promise<void> {
    this.cache.clear();
    await this.preloadTypes();
  }
}
