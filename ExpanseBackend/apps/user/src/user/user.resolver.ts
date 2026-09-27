import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserDto } from '../dto/user.model';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';
import { NotFoundException } from '@nestjs/common';
import { NewUserInput } from '../dto/new-user.input';

@Resolver((of) => UserDto)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => [UserDto])
  async getUsers(): Promise<UserDto[]> {
    // Logic to fetch user by ID from the database
    // Replace this with your actual implementation
    const user = await this.userService.findAll();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Mutation(() => UserDto)
  async insertUser(@Args('input') input: NewUserInput): Promise<User> {
    // Logic to insert a new user into the database
    // Replace this with your actual implementation
    const user = await this.userService.addUser(input);
    return user;
  }
}
