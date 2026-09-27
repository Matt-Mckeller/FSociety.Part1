import { Controller, Get } from '@nestjs/common';
import { EventBroadcasterService } from './event-broadcaster.service';

@Controller()
export class EventBroadcasterController {
  constructor(private readonly eventBroadcasterService: EventBroadcasterService) {}

  @Get()
  getHello(): string {
    return this.eventBroadcasterService.getHello();
  }
}
