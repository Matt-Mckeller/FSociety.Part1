import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Session } from './entities/session.entity';
import { SessionParticipant } from './entities/session-participant.entity';
import { SessionsService } from './sessions.service';
import { CreateSessionInput, UpdateSessionInput, JoinSessionInput } from './dto/session.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { Public } from '../auth/decorators/public.decorator';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => Session)
export class SessionsResolver {
  constructor(private readonly sessionsService: SessionsService) {}

  @Query(() => Session, { nullable: true, name: 'session' })
  @UseGuards(GqlAuthGuard)
  async getSession(@Args('id') id: string): Promise<Session | null> {
    return this.sessionsService.findById(id);
  }

  @Query(() => [Session], { name: 'roomSessions' })
  @UseGuards(GqlAuthGuard)
  async roomSessions(@Args('roomId') roomId: string): Promise<Session[]> {
    return this.sessionsService.findByRoom(roomId);
  }

  @Query(() => Session, { nullable: true, name: 'liveSession' })
  @Public()
  async liveSession(@Args('roomId') roomId: string): Promise<Session | null> {
    return this.sessionsService.findLiveSession(roomId);
  }

  @Query(() => [SessionParticipant], { name: 'sessionParticipants' })
  @UseGuards(GqlAuthGuard)
  async sessionParticipants(
    @Args('sessionId') sessionId: string,
  ): Promise<SessionParticipant[]> {
    return this.sessionsService.getParticipants(sessionId);
  }

  @Mutation(() => Session)
  @UseGuards(GqlAuthGuard)
  async createSession(
    @CurrentUser() user: User,
    @Args('input') input: CreateSessionInput,
  ): Promise<Session> {
    const session = await this.sessionsService.create(input, user.id);
    pubSub.publish('sessionStarted', { sessionStarted: session });
    return session;
  }

  @Mutation(() => Session)
  @UseGuards(GqlAuthGuard)
  async updateSession(
    @CurrentUser() user: User,
    @Args('id') id: string,
    @Args('input') input: UpdateSessionInput,
  ): Promise<Session> {
    return this.sessionsService.update(id, input, user.id);
  }

  @Mutation(() => Session)
  @UseGuards(GqlAuthGuard)
  async startSession(
    @CurrentUser() user: User,
    @Args('id') id: string,
  ): Promise<Session> {
    const session = await this.sessionsService.startSession(id, user.id);
    pubSub.publish('sessionStarted', { sessionStarted: session });
    return session;
  }

  @Mutation(() => Session)
  @UseGuards(GqlAuthGuard)
  async endSession(
    @CurrentUser() user: User,
    @Args('id') id: string,
  ): Promise<Session> {
    const session = await this.sessionsService.endSession(id, user.id);
    pubSub.publish('sessionEnded', { sessionEnded: session });
    return session;
  }

  @Mutation(() => SessionParticipant)
  @UseGuards(GqlAuthGuard)
  async joinSession(
    @CurrentUser() user: User,
    @Args('input') input: JoinSessionInput,
  ): Promise<SessionParticipant> {
    const participant = await this.sessionsService.addParticipant(
      input.sessionId,
      user.id,
    );
    pubSub.publish('participantJoined', { participantJoined: participant });
    return participant;
  }

  @Mutation(() => SessionParticipant)
  @Public()
  async joinSessionAsGuest(
    @Args('input') input: JoinSessionInput,
  ): Promise<SessionParticipant> {
    if (!input.guestName) {
      throw new Error('Guest name is required');
    }
    const participant = await this.sessionsService.addParticipant(
      input.sessionId,
      undefined,
      undefined,
      input.guestName,
    );
    pubSub.publish('participantJoined', { participantJoined: participant });
    return participant;
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async leaveSession(
    @Args('sessionId') sessionId: string,
    @Args('participantId') participantId: string,
  ): Promise<boolean> {
    await this.sessionsService.removeParticipant(sessionId, participantId);
    pubSub.publish('participantLeft', { participantLeft: { sessionId, participantId } });
    return true;
  }

  @Subscription(() => Session, {
    filter: (payload, variables) => payload.sessionStarted.roomId === variables.roomId,
  })
  sessionStarted(@Args('roomId') _roomId: string) {
    return pubSub.asyncIterator('sessionStarted');
  }

  @Subscription(() => Session, {
    filter: (payload, variables) => payload.sessionEnded.roomId === variables.roomId,
  })
  sessionEnded(@Args('roomId') _roomId: string) {
    return pubSub.asyncIterator('sessionEnded');
  }

  @Subscription(() => SessionParticipant, {
    filter: (payload, variables) => payload.participantJoined.sessionId === variables.sessionId,
  })
  participantJoined(@Args('sessionId') _sessionId: string) {
    return pubSub.asyncIterator('participantJoined');
  }
}
