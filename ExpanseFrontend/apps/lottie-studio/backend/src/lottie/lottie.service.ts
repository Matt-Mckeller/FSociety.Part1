/**
 * Lottie Service
 *
 * Orchestrates the Lottie animation processing pipeline:
 * 1. Metadata generation
 * 2. Element naming
 * 3. Theme generation
 *
 * Provides progress updates via PubSub for GraphQL subscriptions.
 */

import { Injectable, Inject, Logger } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { v4 as uuidv4 } from 'uuid';

import { MetadataService } from '../ai/metadata.service';
import { ElementNamingService } from '../ai/element-naming.service';
import { ThemeService, ThemeGenerationRequest } from '../ai/theme.service';
import {
  LottieAnimation,
  LottieHints,
  ProcessingStatus,
  ProcessingPhase,
  ProcessingProgress,
  ColorPalette,
} from '@/types';

// PubSub events
const PROCESSING_PROGRESS = 'processingProgress';

@Injectable()
export class LottieService {
  private readonly logger = new Logger(LottieService.name);
  
  // In-memory storage for animations (could be replaced with database)
  private animations: Map<string, LottieAnimation> = new Map();

  constructor(
    private metadataService: MetadataService,
    private elementNamingService: ElementNamingService,
    private themeService: ThemeService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  /**
   * Upload a new Lottie animation
   */
  async uploadAnimation(
    json: Record<string, any>,
    name?: string,
    hints?: LottieHints,
  ): Promise<LottieAnimation> {
    const id = uuidv4();
    const animationName = name || json.nm || `Animation_${id.slice(0, 8)}`;

    const animation: LottieAnimation = {
      id,
      name: animationName,
      json,
      status: 'UPLOADED',
      hints,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.animations.set(id, animation);
    this.logger.log(`Animation uploaded: ${animationName} (${id})`);

    return animation;
  }

  /**
   * Get an animation by ID
   */
  getAnimation(id: string): LottieAnimation | undefined {
    return this.animations.get(id);
  }

  /**
   * Get all animations
   */
  getAllAnimations(): LottieAnimation[] {
    return Array.from(this.animations.values());
  }

  /**
   * Generate metadata for an animation
   */
  async generateMetadata(animationId: string): Promise<LottieAnimation> {
    const animation = this.animations.get(animationId);
    if (!animation) {
      throw new Error(`Animation not found: ${animationId}`);
    }

    this.updateStatus(animationId, 'ANALYZING_METADATA');
    this.emitProgress(animationId, 'METADATA_ANALYSIS', 0, 'Starting metadata analysis...');

    try {
      this.emitProgress(animationId, 'METADATA_ANALYSIS', 25, 'Analyzing animation structure...');

      const result = await this.metadataService.generateMetadata(
        animation.json,
        animation.hints,
      );

      if (!result.success || !result.metadata) {
        throw new Error(result.error || 'Failed to generate metadata');
      }

      animation.metadata = result.metadata;
      animation.name = result.metadata.animationName || animation.name;
      this.updateStatus(animationId, 'METADATA_COMPLETE');
      this.emitProgress(animationId, 'METADATA_ANALYSIS', 100, 'Metadata analysis complete!');

      return animation;
    } catch (error) {
      this.updateStatus(animationId, 'ERROR');
      this.emitProgress(
        animationId,
        'ERROR',
        0,
        error instanceof Error ? error.message : 'Metadata generation failed',
      );
      throw error;
    }
  }

  /**
   * Generate element names for an animation
   */
  async generateElements(animationId: string): Promise<LottieAnimation> {
    const animation = this.animations.get(animationId);
    if (!animation) {
      throw new Error(`Animation not found: ${animationId}`);
    }

    this.updateStatus(animationId, 'NAMING_ELEMENTS');
    this.emitProgress(animationId, 'ELEMENT_NAMING', 0, 'Starting element naming...');

    try {
      this.emitProgress(animationId, 'ELEMENT_NAMING', 25, 'Analyzing element structure...');

      const result = await this.elementNamingService.generateElementNames(
        animation.json,
        animation.metadata,
      );

      if (!result.success || !result.elements) {
        throw new Error(result.error || 'Failed to generate element names');
      }

      // Convert Record to array of elements
      animation.elements = Object.values(result.elements);
      this.updateStatus(animationId, 'ELEMENTS_COMPLETE');
      this.emitProgress(
        animationId,
        'ELEMENT_NAMING',
        100,
        `Element naming complete! Found ${animation.elements.length} elements.`,
      );

      return animation;
    } catch (error) {
      this.updateStatus(animationId, 'ERROR');
      this.emitProgress(
        animationId,
        'ERROR',
        0,
        error instanceof Error ? error.message : 'Element naming failed',
      );
      throw error;
    }
  }

  /**
   * Generate themes for an animation
   */
  async generateThemes(
    animationId: string,
    palettes: ColorPalette[],
  ): Promise<LottieAnimation> {
    const animation = this.animations.get(animationId);
    if (!animation) {
      throw new Error(`Animation not found: ${animationId}`);
    }

    if (!animation.elements || animation.elements.length === 0) {
      throw new Error('Elements must be generated before themes');
    }

    this.updateStatus(animationId, 'GENERATING_THEMES');
    this.emitProgress(animationId, 'THEME_GENERATION', 0, 'Starting theme generation...');

    try {
      // Convert elements array to Record
      const elementsRecord: Record<string, typeof animation.elements[0]> = {};
      for (const element of animation.elements) {
        elementsRecord[element.name] = element;
      }

      const request: ThemeGenerationRequest = {
        animationName: animation.name,
        description: animation.metadata?.description || '',
        elements: elementsRecord,
        lottieJson: animation.json,
        palettes,
        variant: 'default',
        allowCreativeColors: true,
      };

      // Track progress for each theme
      const totalThemes = palettes.length;
      for (let i = 0; i < totalThemes; i++) {
        const progress = Math.round((i / totalThemes) * 100);
        this.emitProgress(
          animationId,
          'THEME_GENERATION',
          progress,
          `Generating theme ${i + 1} of ${totalThemes}: ${palettes[i].name}...`,
        );
      }

      const result = await this.themeService.generateThemes(request);

      if (!result.success) {
        throw new Error('Failed to generate themes');
      }

      animation.themes = result.themes;
      this.updateStatus(animationId, 'THEMES_COMPLETE');
      this.emitProgress(
        animationId,
        'THEME_GENERATION',
        100,
        `Theme generation complete! Generated ${result.themes.length} themes.`,
      );

      return animation;
    } catch (error) {
      this.updateStatus(animationId, 'ERROR');
      this.emitProgress(
        animationId,
        'ERROR',
        0,
        error instanceof Error ? error.message : 'Theme generation failed',
      );
      throw error;
    }
  }

  /**
   * Process full pipeline for an animation
   */
  async processFullPipeline(
    animationId: string,
    palettes: ColorPalette[],
  ): Promise<LottieAnimation> {
    this.logger.log(`Starting full pipeline for animation: ${animationId}`);

    // Step 1: Metadata
    await this.generateMetadata(animationId);

    // Step 2: Elements
    await this.generateElements(animationId);

    // Step 3: Themes
    await this.generateThemes(animationId, palettes);

    const animation = this.animations.get(animationId);
    if (!animation) {
      throw new Error(`Animation not found: ${animationId}`);
    }

    this.emitProgress(animationId, 'COMPLETE', 100, 'Full pipeline complete!');

    return animation;
  }

  /**
   * Update animation status
   */
  private updateStatus(animationId: string, status: ProcessingStatus): void {
    const animation = this.animations.get(animationId);
    if (animation) {
      animation.status = status;
      animation.updatedAt = new Date();
    }
  }

  /**
   * Emit progress update via PubSub
   */
  private emitProgress(
    animationId: string,
    phase: ProcessingPhase,
    progress: number,
    message: string,
    details?: Record<string, any>,
  ): void {
    const update: ProcessingProgress = {
      animationId,
      phase,
      progress,
      message,
      details,
    };

    this.pubSub.publish(PROCESSING_PROGRESS, { processingProgress: update });
  }
}
