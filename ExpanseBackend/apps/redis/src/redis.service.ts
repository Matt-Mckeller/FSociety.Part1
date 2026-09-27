// redis.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private publisher: Redis;
  private subscriber: Redis;

  onModuleInit() {
    // this.publisher = new Redis(); // default localhost:6379
    // this.subscriber = new Redis();
    // this.subscriber.subscribe('notifications', () => {
    //   console.log('Subscribed to notifications');
    // });
    // this.subscriber.on('message', (channel, message) => {
    //   console.log(`Received message on ${channel}: ${message}`);
    // });
  }

  async publish(channel: string, message: string) {
    // await this.publisher.publish(channel, message);
  }

  onModuleDestroy() {
    // this.publisher?.disconnect();
    // this.subscriber?.disconnect();
  }
}
