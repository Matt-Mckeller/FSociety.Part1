/**
 * Transcript GraphQL Resolver
 * 
 * Exposes transcript queries, mutations, and subscriptions via GraphQL.
 */

import { Resolver, Query, Mutation, Args, Subscription, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { TranscriptService } from './transcript.service';
import { Transcript } from './entities/transcript.entity';
import { TranscriptSegment } from './entities/transcript-segment.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

// PubSub instance for subscriptions
// In production, use Redis-based PubSub for scalability
const pubSub = new PubSub();

// Event names
const TRANSCRIPT_SEGMENT_ADDED = 'transcriptSegmentAdded';
const TRANSCRIPT_COMPLETED = 'transcriptCompleted';

@Resolver(() => Transcript)
export class TranscriptResolver {
  constructor(private readonly transcriptService: TranscriptService) {}

  // ========================================
  // QUERIES
  // ========================================

  @Query(() => Transcript, { nullable: true, description: 'Get transcript by session ID' })
  @UseGuards(GqlAuthGuard)
  async transcriptBySession(
    @Args('sessionId', { type: () => ID }) sessionId: string,
    @CurrentUser() user: User,
  ): Promise<Transcript | null> {
    // TODO: Add authorization check - user must be participant or room owner
    return this.transcriptService.getBySessionId(sessionId);
  }

  @Query(() => Transcript, { nullable: true, description: 'Get transcript by ID' })
  @UseGuards(GqlAuthGuard)
  async transcript(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User,
  ): Promise<Transcript | null> {
    // TODO: Add authorization check
    return this.transcriptService.getById(id);
  }

  @Query(() => String, { description: 'Get full transcript text' })
  @UseGuards(GqlAuthGuard)
  async transcriptFullText(
    @Args('transcriptId', { type: () => ID }) transcriptId: string,
    @CurrentUser() user: User,
  ): Promise<string> {
    // TODO: Add authorization check
    return this.transcriptService.getFullText(transcriptId);
  }

  // ========================================
  // MUTATIONS
  // ========================================

  @Mutation(() => Transcript, { description: 'Create a new transcript for a session' })
  @UseGuards(GqlAuthGuard)
  async createTranscript(
    @Args('sessionId', { type: () => ID }) sessionId: string,
    @Args('language', { nullable: true }) language?: string,
    @CurrentUser() user?: User,
  ): Promise<Transcript> {
    // TODO: Add authorization check - user must be session host
    return this.transcriptService.createTranscript({
      sessionId,
      language,
    });
  }

  @Mutation(() => TranscriptSegment, { description: 'Add a segment to an existing transcript' })
  @UseGuards(GqlAuthGuard)
  async addTranscriptSegment(
    @Args('transcriptId', { type: () => ID }) transcriptId: string,
    @Args('startTimeMs') startTimeMs: number,
    @Args('endTimeMs') endTimeMs: number,
    @Args('text') text: string,
    @Args('speakerLabel', { nullable: true }) speakerLabel?: string,
    @Args('confidence', { nullable: true }) confidence?: number,
    @CurrentUser() user?: User,
  ): Promise<TranscriptSegment> {
    // TODO: Add authorization check
    const segment = await this.transcriptService.addSegment({
      transcriptId,
      startTimeMs,
      endTimeMs,
      text,
      speakerLabel,
      confidence,
    });

    // Publish to subscriptions
    const transcript = await this.transcriptService.getById(transcriptId);
    pubSub.publish(TRANSCRIPT_SEGMENT_ADDED, {
      transcriptSegmentAdded: segment,
      sessionId: transcript?.sessionId,
    });

    return segment;
  }

  @Mutation(() => Boolean, { description: 'Delete a transcript' })
  @UseGuards(GqlAuthGuard)
  async deleteTranscript(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    // TODO: Add authorization check - user must be session host or admin
    return this.transcriptService.deleteTranscript(id);
  }

  // ========================================
  // SUBSCRIPTIONS
  // ========================================

  @Subscription(() => TranscriptSegment, {
    description: 'Subscribe to new transcript segments for a session',
    filter: (payload, variables) => {
      return payload.sessionId === variables.sessionId;
    },
  })
  transcriptSegmentAdded(
    @Args('sessionId', { type: () => ID }) sessionId: string,
  ) {
    return pubSub.asyncIterator(TRANSCRIPT_SEGMENT_ADDED);
  }

  @Subscription(() => Transcript, {
    description: 'Subscribe to transcript completion event',
    filter: (payload, variables) => {
      return payload.transcriptCompleted.sessionId === variables.sessionId;
    },
  })
  transcriptCompleted(
    @Args('sessionId', { type: () => ID }) sessionId: string,
  ) {
    return pubSub.asyncIterator(TRANSCRIPT_COMPLETED);
  }
}

/**
 * Event listener to publish to GraphQL subscriptions
 * This bridges the EventEmitter events to GraphQL PubSub
 */
export function publishTranscriptEvents() {
  // This would typically be set up in the module's onModuleInit
  // For now, the transcriptService emits events that can be listened to
}
