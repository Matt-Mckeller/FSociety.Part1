import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';
import { SessionParticipant } from './entities/session-participant.entity';
import { CreateSessionInput, UpdateSessionInput, JoinSessionInput } from './dto/session.input';
import { RoomsService } from '../rooms/rooms.service';
import { SessionStatus, VerticalType, ParticipantRole } from '../../common/enums';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    @InjectRepository(SessionParticipant)
    private readonly participantRepository: Repository<SessionParticipant>,
    private readonly roomsService: RoomsService,
  ) {}

  async findById(id: string): Promise<Session | null> {
    return this.sessionRepository.findOne({
      where: { id },
      relations: ['room', 'host'],
    });
  }

  async findByRoom(roomId: string): Promise<Session[]> {
    return this.sessionRepository.find({
      where: { roomId },
      order: { createdAt: 'DESC' },
    });
  }

  async findLiveSession(roomId: string): Promise<Session | null> {
    return this.sessionRepository.findOne({
      where: { roomId, status: SessionStatus.LIVE },
    });
  }

  async create(input: CreateSessionInput, hostId: string): Promise<Session> {
    const room = await this.roomsService.findById(input.roomId);
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    // Check if there's already a live session
    const existingLive = await this.findLiveSession(input.roomId);
    if (existingLive) {
      throw new BadRequestException('Room already has a live session');
    }

    const session = this.sessionRepository.create({
      roomId: input.roomId,
      hostId,
      title: input.title,
      verticalType: input.verticalType || VerticalType.LEARNING,
      scheduledStartAt: input.scheduledStartAt ? new Date(input.scheduledStartAt) : undefined,
      status: input.scheduledStartAt ? SessionStatus.SCHEDULED : SessionStatus.LIVE,
      startedAt: input.scheduledStartAt ? undefined : new Date(),
    });

    const savedSession = await this.sessionRepository.save(session);

    // Add host as participant
    await this.addParticipant(savedSession.id, hostId, ParticipantRole.HOST);

    return savedSession;
  }

  async update(id: string, input: UpdateSessionInput, userId: string): Promise<Session> {
    const session = await this.findById(id);
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.hostId !== userId) {
      throw new ForbiddenException('Only host can update session');
    }

    Object.assign(session, input);
    return this.sessionRepository.save(session);
  }

  async startSession(id: string, userId: string): Promise<Session> {
    const session = await this.findById(id);
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.hostId !== userId) {
      throw new ForbiddenException('Only host can start session');
    }

    if (session.status === SessionStatus.LIVE) {
      throw new BadRequestException('Session is already live');
    }

    session.status = SessionStatus.LIVE;
    session.startedAt = new Date();
    return this.sessionRepository.save(session);
  }

  async endSession(id: string, userId: string): Promise<Session> {
    const session = await this.findById(id);
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.hostId !== userId) {
      throw new ForbiddenException('Only host can end session');
    }

    session.status = SessionStatus.ENDED;
    session.endedAt = new Date();

    // Mark all participants as left
    await this.participantRepository.update(
      { sessionId: id, isActive: true },
      { isActive: false, leftAt: new Date() },
    );

    return this.sessionRepository.save(session);
  }

  async addParticipant(
    sessionId: string,
    userId: string | undefined,
    role: ParticipantRole = ParticipantRole.PARTICIPANT,
    guestName?: string,
  ): Promise<SessionParticipant> {
    const session = await this.findById(sessionId);
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.status !== SessionStatus.LIVE) {
      throw new BadRequestException('Session is not live');
    }

    // Check if already a participant
    if (userId) {
      const existing = await this.participantRepository.findOne({
        where: { sessionId, userId },
      });

      if (existing) {
        existing.isActive = true;
        existing.joinedAt = new Date();
        existing.leftAt = undefined;
        return this.participantRepository.save(existing);
      }
    }

    const participant = this.participantRepository.create({
      sessionId,
      userId,
      guestName,
      role,
      joinedAt: new Date(),
      isActive: true,
    });

    const saved = await this.participantRepository.save(participant);

    // Update participant count
    await this.updateParticipantCount(sessionId);

    return saved;
  }

  async removeParticipant(sessionId: string, participantId: string): Promise<void> {
    await this.participantRepository.update(participantId, {
      isActive: false,
      leftAt: new Date(),
    });
    await this.updateParticipantCount(sessionId);
  }

  async getParticipants(sessionId: string): Promise<SessionParticipant[]> {
    return this.participantRepository.find({
      where: { sessionId, isActive: true },
      relations: ['user'],
    });
  }

  private async updateParticipantCount(sessionId: string): Promise<void> {
    const count = await this.participantRepository.count({
      where: { sessionId, isActive: true },
    });
    await this.sessionRepository.update(sessionId, { participantCount: count });
  }
}
