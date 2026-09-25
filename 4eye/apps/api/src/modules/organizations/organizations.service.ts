import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Organization } from './entities/organization.entity';
import { OrganizationUser } from './entities/organization-user.entity';
import { CreateOrganizationInput, UpdateOrganizationInput } from './dto/organization.input';
import { OrgRole, VerticalType } from '../../common/enums';
import { User } from '../users/entities/user.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private readonly orgRepository: Repository<Organization>,
    @InjectRepository(OrganizationUser)
    private readonly orgUserRepository: Repository<OrganizationUser>,
  ) {}

  async findById(id: string): Promise<Organization | null> {
    return this.orgRepository.findOne({ where: { id } as FindOptionsWhere<Organization> });
  }

  async findBySlug(slug: string): Promise<Organization | null> {
    return this.orgRepository.findOne({ where: { slug } });
  }

  async findUserOrganizations(userId: string): Promise<Organization[]> {
    const orgUsers = await this.orgUserRepository.find({
      where: { userId },
      relations: ['organization'],
    });
    return orgUsers.map(ou => ou.organization);
  }

  async create(input: CreateOrganizationInput, creatorId: string): Promise<Organization> {
    const existing = await this.findBySlug(input.slug);
    if (existing) {
      throw new ConflictException('Organization slug already in use');
    }

    const org = this.orgRepository.create({
      ...input,
      verticalType: input.verticalType || VerticalType.LEARNING,
    });
    const savedOrg = await this.orgRepository.save(org);

    // Add creator as admin
    await this.addMember(savedOrg.id, creatorId, OrgRole.ADMIN);

    return savedOrg;
  }

  async update(id: string, input: UpdateOrganizationInput, userId: string): Promise<Organization> {
    await this.requireRole(id, userId, [OrgRole.ADMIN]);

    const org = await this.findById(id);
    if (!org) {
      throw new NotFoundException('Organization not found');
    }

    if (input.slug && input.slug !== org.slug) {
      const existing = await this.findBySlug(input.slug);
      if (existing) {
        throw new ConflictException('Organization slug already in use');
      }
    }

    Object.assign(org, input);
    return this.orgRepository.save(org);
  }

  async addMember(orgId: string, userId: string, role: OrgRole = OrgRole.MEMBER): Promise<OrganizationUser> {
    const existing = await this.orgUserRepository.findOne({
      where: { organizationId: orgId, userId },
    });

    if (existing) {
      existing.role = role;
      return this.orgUserRepository.save(existing);
    }

    const orgUser = this.orgUserRepository.create({
      organizationId: orgId,
      userId,
      role,
      joinedAt: new Date(),
    });
    return this.orgUserRepository.save(orgUser);
  }

  async removeMember(orgId: string, userId: string, requesterId: string): Promise<boolean> {
    await this.requireRole(orgId, requesterId, [OrgRole.ADMIN]);

    // Can't remove the last admin
    if (userId !== requesterId) {
      const adminCount = await this.orgUserRepository.count({
        where: { organizationId: orgId, role: OrgRole.ADMIN },
      });
      const targetUser = await this.orgUserRepository.findOne({
        where: { organizationId: orgId, userId },
      });
      if (targetUser?.role === OrgRole.ADMIN && adminCount <= 1) {
        throw new ForbiddenException('Cannot remove the last admin');
      }
    }

    await this.orgUserRepository.delete({ organizationId: orgId, userId });
    return true;
  }

  async updateMemberRole(orgId: string, userId: string, role: OrgRole, requesterId: string): Promise<OrganizationUser> {
    await this.requireRole(orgId, requesterId, [OrgRole.ADMIN]);

    const orgUser = await this.orgUserRepository.findOne({
      where: { organizationId: orgId, userId },
    });

    if (!orgUser) {
      throw new NotFoundException('Member not found');
    }

    orgUser.role = role;
    return this.orgUserRepository.save(orgUser);
  }

  async getMembers(orgId: string): Promise<OrganizationUser[]> {
    return this.orgUserRepository.find({
      where: { organizationId: orgId },
      relations: ['user'],
    });
  }

  async getMembership(orgId: string, userId: string): Promise<OrganizationUser | null> {
    return this.orgUserRepository.findOne({
      where: { organizationId: orgId, userId },
    });
  }

  async requireRole(orgId: string, userId: string, roles: OrgRole[]): Promise<OrganizationUser> {
    const membership = await this.getMembership(orgId, userId);
    if (!membership) {
      throw new ForbiddenException('Not a member of this organization');
    }
    if (!roles.includes(membership.role)) {
      throw new ForbiddenException('Insufficient permissions');
    }
    return membership;
  }

  async softDelete(id: string, userId: string): Promise<void> {
    await this.requireRole(id, userId, [OrgRole.ADMIN]);
    await this.orgRepository.softDelete(id);
  }
}
