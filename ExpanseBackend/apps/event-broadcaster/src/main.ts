import { NestFactory } from '@nestjs/core';
import { EventBroadcasterModule } from './event-broadcaster.module';

async function bootstrap() {
  const app = await NestFactory.create(EventBroadcasterModule);
  await app.listen(3000);
}
bootstrap();
