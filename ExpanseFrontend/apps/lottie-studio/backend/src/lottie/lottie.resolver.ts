/**
 * Lottie GraphQL Resolver
 *
 * Provides GraphQL queries, mutations, and subscriptions for
 * Lottie animation processing.
 */

import { Resolver, Query, Mutation, Subscription, Args, ID } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { LottieService } from './lottie.service';
import {
  AnimationDto,
  ProcessingProgressDto,
  UploadAnimationInput,
  GenerateThemesInput,
} from './dto';

const PROCESSING_PROGRESS = 'processingProgress';

@Resolver('Animation')
export class LottieResolver {
  constructor(
    private lottieService: LottieService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  // =========================================================================
  // Queries
  // =========================================================================

  @Query('animation')
  async getAnimation(@Args('id', { type: () => ID }) id: string): Promise<AnimationDto | null> {
    const animation = this.lottieService.getAnimation(id);
    return animation ? this.toDto(animation) : null;
  }

  @Query('animations')
  async getAnimations(): Promise<AnimationDto[]> {
    const animations = this.lottieService.getAllAnimations();
    return animations.map((a) => this.toDto(a));
  }

  // =========================================================================
  // Mutations
  // =========================================================================

  @Mutation('uploadAnimation')
  async uploadAnimation(@Args('input') input: UploadAnimationInput): Promise<AnimationDto> {
    const json = JSON.parse(input.json);
    const hints = input.hints
      ? {
          name: input.hints.name,
          description: input.hints.description,
          purpose: input.hints.purpose,
          tags: input.hints.tags,
        }
      : undefined;

    const animation = await this.lottieService.uploadAnimation(json, input.name, hints);
    return this.toDto(animation);
  }

  @Mutation('generateMetadata')
  async generateMetadata(
    @Args('animationId', { type: () => ID }) animationId: string,
  ): Promise<AnimationDto> {
    const animation = await this.lottieService.generateMetadata(animationId);
    return this.toDto(animation);
  }

  @Mutation('generateElements')
  async generateElements(
    @Args('animationId', { type: () => ID }) animationId: string,
  ): Promise<AnimationDto> {
    const animation = await this.lottieService.generateElements(animationId);
    return this.toDto(animation);
  }

  @Mutation('generateThemes')
  async generateThemes(
    @Args('animationId', { type: () => ID }) animationId: string,
    @Args('input') input: GenerateThemesInput,
  ): Promise<AnimationDto> {
    const animation = await this.lottieService.generateThemes(animationId, input.palettes as any);
    return this.toDto(animation);
  }

  @Mutation('processFullPipeline')
  async processFullPipeline(
    @Args('animationId', { type: () => ID }) animationId: string,
    @Args('input') input: GenerateThemesInput,
  ): Promise<AnimationDto> {
    const animation = await this.lottieService.processFullPipeline(animationId, input.palettes as any);
    return this.toDto(animation);
  }

  // =========================================================================
  // Subscriptions
  // =========================================================================

  @Subscription('processingProgress', {
    filter: (payload, variables) => {
      return payload.processingProgress.animationId === variables.animationId;
    },
  })
  processingProgress(
    @Args('animationId', { type: () => ID }) animationId: string,
  ): AsyncIterator<ProcessingProgressDto> {
    return this.pubSub.asyncIterator(PROCESSING_PROGRESS);
  }

  // =========================================================================
  // Helpers
  // =========================================================================

  private toDto(animation: any): AnimationDto {
    return {
      id: animation.id,
      name: animation.name,
      status: animation.status,
      metadata: animation.metadata,
      elements: animation.elements,
      themes: animation.themes,
      createdAt: animation.createdAt.toISOString(),
      updatedAt: animation.updatedAt.toISOString(),
    };
  }
}
