import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UpdateUserInput } from './dto/user.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'me', description: 'Get current authenticated user' })
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @Query(() => User, { nullable: true, name: 'user' })
  @UseGuards(GqlAuthGuard)
  async getUser(@Args('id') id: string): Promise<User | null> {
    return this.usersService.findById(id);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateProfile(
    @CurrentUser() user: User,
    @Args('input') input: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update(user.id, input);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteAccount(@CurrentUser() user: User): Promise<boolean> {
    await this.usersService.softDelete(user.id);
    return true;
  }
}
