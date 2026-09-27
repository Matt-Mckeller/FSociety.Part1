import { NestFactory } from '@nestjs/core';
import { UserModuleLocal } from './user.module.local';

async function bootstrap() {
  const app = await NestFactory.create(UserModuleLocal);
  await app.listen(process.env.USER_APP_PORT);
  console.log('Started user on', process.env.USER_APP_PORT);
}
bootstrap();
