import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Room } from './entities/room.entity';
import { RoomsService } from './rooms.service';
import { CreateRoomInput, UpdateRoomInput, JoinRoomInput } from './dto/room.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { Public } from '../auth/decorators/public.decorator';

@Resolver(() => Room)
export class RoomsResolver {
  constructor(private readonly roomsService: RoomsService) {}

  @Query(() => [Room], { name: 'myRooms' })
  @UseGuards(GqlAuthGuard)
  async myRooms(@CurrentUser() user: User): Promise<Room[]> {
    return this.roomsService.findByCreator(user.id);
  }

  @Query(() => Room, { nullable: true, name: 'room' })
  @UseGuards(GqlAuthGuard)
  async getRoom(@Args('id') id: string): Promise<Room | null> {
    return this.roomsService.findById(id);
  }

  @Query(() => Room, { nullable: true, name: 'roomByInviteCode' })
  @Public()
  async getRoomByInviteCode(@Args('inviteCode') inviteCode: string): Promise<Room | null> {
    return this.roomsService.findByInviteCode(inviteCode);
  }

  @Query(() => [Room], { name: 'organizationRooms' })
  @UseGuards(GqlAuthGuard)
  async organizationRooms(
    @Args('organizationId') organizationId: string,
  ): Promise<Room[]> {
    return this.roomsService.findByOrganization(organizationId);
  }

  @Mutation(() => Room)
  @UseGuards(GqlAuthGuard)
  async createRoom(
    @CurrentUser() user: User,
    @Args('input') input: CreateRoomInput,
  ): Promise<Room> {
    return this.roomsService.create(input, user.id);
  }

  @Mutation(() => Room)
  @UseGuards(GqlAuthGuard)
  async updateRoom(
    @CurrentUser() user: User,
    @Args('id') id: string,
    @Args('input') input: UpdateRoomInput,
  ): Promise<Room> {
    return this.roomsService.update(id, input, user.id);
  }

  @Mutation(() => Room)
  @UseGuards(GqlAuthGuard)
  async regenerateInviteCode(
    @CurrentUser() user: User,
    @Args('roomId') roomId: string,
  ): Promise<Room> {
    return this.roomsService.regenerateInviteCode(roomId, user.id);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteRoom(
    @CurrentUser() user: User,
    @Args('id') id: string,
  ): Promise<boolean> {
    return this.roomsService.deactivate(id, user.id);
  }
}
