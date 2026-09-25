import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';
import { AppModule } from './app.module.js';
import { loadConfig } from './config/config.service.js';

async function bootstrap() {
  const cfg = loadConfig();
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useWebSocketAdapter(new WsAdapter(app));
  app.setGlobalPrefix('api');
  await app.listen(cfg.apiPort, '127.0.0.1');
  console.log(`[api] http://127.0.0.1:${cfg.apiPort}/api  (gallery: ${cfg.galleryRoot})`);
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
