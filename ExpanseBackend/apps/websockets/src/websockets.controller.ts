import { Controller, Get } from '@nestjs/common';
import { WebsocketsService } from './websockets.service';

@Controller()
export class WebsocketsController {
  constructor(private readonly websocketsService: WebsocketsService) {}

  @Get()
  getHello(): string {
    return this.websocketsService.getHello();
  }
}
