// apps/user/src/user.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.model';
import { ClientProxy } from '@nestjs/microservices';
import { NewUserInput } from './dto/new-user.input';
import { NEW_USER_SIGNUP } from '@libs/event-types';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, 'main')
    private usersRepository: Repository<User>,
    @Inject('EMAIL_SERVICE') private emailService: ClientProxy,
  ) {}

  // Example method to find a user by ID
  async findUserById(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<UserDto[]> {
    return this.usersRepository
      .find()
      .then((users) => users.map((user) => new UserDto(user)));
  }

  async addUser(userInput: NewUserInput): Promise<UserDto> {
    const user = await this.usersRepository.save(userInput);
    const userDTO = new UserDto(user);
    console.log(
      'emitting email event from user service for analytics to pick up',
    );
    this.emailService.emit(NEW_USER_SIGNUP, user.id);
    // this.emailService.emit('send_email', user);
    return userDTO;
  }

  getHello(): string {
    return 'hello';
  }

  // Add other methods as needed
}
