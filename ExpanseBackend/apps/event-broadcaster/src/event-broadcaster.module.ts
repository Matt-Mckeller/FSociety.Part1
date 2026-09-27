import { Module } from '@nestjs/common';
import { EventBroadcasterController } from './event-broadcaster.controller';
import { EventBroadcasterService } from './event-broadcaster.service';

@Module({
  imports: [],
  controllers: [EventBroadcasterController],
  providers: [EventBroadcasterService],
})
export class EventBroadcasterModule {}
