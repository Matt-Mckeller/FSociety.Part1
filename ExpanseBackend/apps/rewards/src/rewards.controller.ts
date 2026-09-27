import { Controller, Get } from '@nestjs/common';

@Controller()
export class RewardsController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'hello';
  }
}
