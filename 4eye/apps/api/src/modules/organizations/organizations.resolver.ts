import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Organization } from './entities/organization.entity';
import { OrganizationUser } from './entities/organization-user.entity';
import { OrganizationsService } from './organizations.service';
import {
  CreateOrganizationInput,
  UpdateOrganizationInput,
  UpdateMemberRoleInput,
} from './dto/organization.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { OrgRole } from '../../common/enums';

@Resolver(() => Organization)
export class OrganizationsResolver {
  constructor(private readonly orgsService: OrganizationsService) {}

  @Query(() => [Organization], { name: 'myOrganizations' })
  @UseGuards(GqlAuthGuard)
  async myOrganizations(@CurrentUser() user: User): Promise<Organization[]> {
    return this.orgsService.findUserOrganizations(user.id);
  }

  @Query(() => Organization, { nullable: true, name: 'organization' })
  @UseGuards(GqlAuthGuard)
  async getOrganization(@Args('id') id: string): Promise<Organization | null> {
    return this.orgsService.findById(id);
  }

  @Query(() => Organization, { nullable: true, name: 'organizationBySlug' })
  @UseGuards(GqlAuthGuard)
  async getOrganizationBySlug(@Args('slug') slug: string): Promise<Organization | null> {
    return this.orgsService.findBySlug(slug);
  }

  @Mutation(() => Organization)
  @UseGuards(GqlAuthGuard)
  async createOrganization(
    @CurrentUser() user: User,
    @Args('input') input: CreateOrganizationInput,
  ): Promise<Organization> {
    return this.orgsService.create(input, user.id);
  }

  @Mutation(() => Organization)
  @UseGuards(GqlAuthGuard)
  async updateOrganization(
    @CurrentUser() user: User,
    @Args('id') id: string,
    @Args('input') input: UpdateOrganizationInput,
  ): Promise<Organization> {
    return this.orgsService.update(id, input, user.id);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteOrganization(
    @CurrentUser() user: User,
    @Args('id') id: string,
  ): Promise<boolean> {
    await this.orgsService.softDelete(id, user.id);
    return true;
  }

  @Query(() => [OrganizationUser], { name: 'organizationMembers' })
  @UseGuards(GqlAuthGuard)
  async organizationMembers(
    @Args('organizationId') organizationId: string,
  ): Promise<OrganizationUser[]> {
    return this.orgsService.getMembers(organizationId);
  }

  @Mutation(() => OrganizationUser)
  @UseGuards(GqlAuthGuard)
  async updateMemberRole(
    @CurrentUser() user: User,
    @Args('organizationId') organizationId: string,
    @Args('input') input: UpdateMemberRoleInput,
  ): Promise<OrganizationUser> {
    return this.orgsService.updateMemberRole(
      organizationId,
      input.userId,
      input.role,
      user.id,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async removeMember(
    @CurrentUser() user: User,
    @Args('organizationId') organizationId: string,
    @Args('userId') userId: string,
  ): Promise<boolean> {
    return this.orgsService.removeMember(organizationId, userId, user.id);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async leaveOrganization(
    @CurrentUser() user: User,
    @Args('organizationId') organizationId: string,
  ): Promise<boolean> {
    return this.orgsService.removeMember(organizationId, user.id, user.id);
  }
}
