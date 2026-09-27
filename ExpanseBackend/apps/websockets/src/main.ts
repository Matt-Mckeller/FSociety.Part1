import { NestFactory } from '@nestjs/core';
import { WebsocketsModule } from './websockets.module';
// import { RedisIoAdapter } from './redis-io.adapter';
// import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(WebsocketsModule);

  // const redisIoAdapter = new RedisIoAdapter(app);
  // await redisIoAdapter.connectToRedis();
  // app.useWebSocketAdapter(redisIoAdapter);

  // const configService = app.get(ConfigService);
  app.enableCors({
    // origin: 'http://localhost:3000', // Allow all origins or specify a specific origin
    origin: '*', // Allow all origins or specify a specific origin
    // origin: configService.get<string>('CORS_ORIGIN') || '*', // Allow all origins or specify a specific origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    // credentials: true,
  });

  await app.listen(3385);
}
bootstrap();
