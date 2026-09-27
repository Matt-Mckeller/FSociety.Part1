import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { NewUserInput } from './dto/new-user.input';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getHello(): Promise<User[]> {
    // Generate a fake user with hard-coded data
    const fakeUser: NewUserInput = {
      // id: 1,
      fullName: 'John Doe',
      // active: true,
    };

    // Add the fake user to the database through the userservice
    this.userService.addUser(fakeUser);

    // this.userService.addUser()
    // return this.userService.getHello();
    // return JSON.stringify(await this.userService.findAll(), null, 2);
    return await this.userService.findAll();
  }
}
