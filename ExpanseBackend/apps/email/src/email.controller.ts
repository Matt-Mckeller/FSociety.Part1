import { Controller, Get } from '@nestjs/common';
import { AuthEmailService } from './auth-email.service';
import { EventPattern } from '@nestjs/microservices';
import { NEW_USER_SIGNUP } from '@libs/event-types';
import { UserService } from 'apps/user/src/user.service';

@Controller()
export class EmailController {
  constructor(
    private readonly authEmailService: AuthEmailService,
    private readonly userService: UserService,
  ) {}

  @EventPattern(NEW_USER_SIGNUP)
  async handleSendEmail(userId: string) {
    console.log('send email reached!');
    console.log({ userId });
    const user = await this.userService.findUserById(userId);
    // @ts-expect-error temp
    user.email = 'matt@expanseservices.com';
    await this.authEmailService.sendSignUpSuccessEmail(user);
  }
}
