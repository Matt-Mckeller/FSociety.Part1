import { Test, TestingModule } from '@nestjs/testing';
import { EventBroadcasterController } from './event-broadcaster.controller';
import { EventBroadcasterService } from './event-broadcaster.service';

describe('EventBroadcasterController', () => {
  let eventBroadcasterController: EventBroadcasterController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EventBroadcasterController],
      providers: [EventBroadcasterService],
    }).compile();

    eventBroadcasterController = app.get<EventBroadcasterController>(EventBroadcasterController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(eventBroadcasterController.getHello()).toBe('Hello World!');
    });
  });
});
