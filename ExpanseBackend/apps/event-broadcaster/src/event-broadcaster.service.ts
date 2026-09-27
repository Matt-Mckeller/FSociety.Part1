import { Injectable } from '@nestjs/common';

@Injectable()
export class EventBroadcasterService {
  getHello(): string {
    return 'Hello World!';
  }
}
