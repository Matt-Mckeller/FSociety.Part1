import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Room } from './entities/room.entity';
import { CreateRoomInput, UpdateRoomInput } from './dto/room.input';
import { OrganizationsService } from '../organizations/organizations.service';
import { OrgRole } from '../../common/enums';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    private readonly orgsService: OrganizationsService,
  ) {}

  async findById(id: string): Promise<Room | null> {
    return this.roomRepository.findOne({
      where: { id } as FindOptionsWhere<Room>,
      relations: ['organizations'],
    });
  }

  async findByInviteCode(inviteCode: string): Promise<Room | null> {
    return this.roomRepository.findOne({
      where: { inviteCode: inviteCode.toUpperCase(), isActive: true },
      relations: ['organizations'],
    });
  }

  async findByOrganization(organizationId: string): Promise<Room[]> {
    return this.roomRepository
      .createQueryBuilder('room')
      .innerJoin('room.organizations', 'org')
      .where('org.id = :organizationId', { organizationId })
      .andWhere('room.isActive = :isActive', { isActive: true })
      .getMany();
  }

  async findByCreator(userId: string): Promise<Room[]> {
    return this.roomRepository.find({
      where: { createdById: userId },
      relations: ['organizations'],
    });
  }

  async create(input: CreateRoomInput, creatorId: string): Promise<Room> {
    // If org specified, verify user can create rooms in it
    if (input.organizationId) {
      await this.orgsService.requireRole(input.organizationId, creatorId, [
        OrgRole.HOST,
        OrgRole.ADMIN,
      ]);
    }

    const room = this.roomRepository.create({
      name: input.name,
      description: input.description,
      isRecordingEnabled: input.isRecordingEnabled ?? true,
      isChatEnabled: input.isChatEnabled ?? true,
      inviteCode: Room.generateInviteCode(),
      createdById: creatorId,
    });

    const savedRoom = await this.roomRepository.save(room);

    // Link to organization if specified
    if (input.organizationId) {
      const org = await this.orgsService.findById(input.organizationId);
      if (org) {
        savedRoom.organizations = [org];
        await this.roomRepository.save(savedRoom);
      }
    }

    return savedRoom;
  }

  async update(id: string, input: UpdateRoomInput, userId: string): Promise<Room> {
    const room = await this.findById(id);
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    // Must be creator or org admin to update
    if (room.createdById !== userId) {
      const hasOrgAccess = await this.checkOrgAccess(room, userId, [OrgRole.ADMIN]);
      if (!hasOrgAccess) {
        throw new ForbiddenException('Not authorized to update this room');
      }
    }

    Object.assign(room, input);
    return this.roomRepository.save(room);
  }

  async regenerateInviteCode(id: string, userId: string): Promise<Room> {
    const room = await this.findById(id);
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    if (room.createdById !== userId) {
      const hasOrgAccess = await this.checkOrgAccess(room, userId, [OrgRole.ADMIN, OrgRole.HOST]);
      if (!hasOrgAccess) {
        throw new ForbiddenException('Not authorized to regenerate invite code');
      }
    }

    room.inviteCode = Room.generateInviteCode();
    return this.roomRepository.save(room);
  }

  async deactivate(id: string, userId: string): Promise<boolean> {
    const room = await this.findById(id);
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    if (room.createdById !== userId) {
      const hasOrgAccess = await this.checkOrgAccess(room, userId, [OrgRole.ADMIN]);
      if (!hasOrgAccess) {
        throw new ForbiddenException('Not authorized to delete this room');
      }
    }

    room.isActive = false;
    await this.roomRepository.save(room);
    return true;
  }

  private async checkOrgAccess(room: Room, userId: string, roles: OrgRole[]): Promise<boolean> {
    if (!room.organizations?.length) return false;

    for (const org of room.organizations) {
      try {
        await this.orgsService.requireRole(org.id, userId, roles);
        return true;
      } catch {
        continue;
      }
    }
    return false;
  }
}
