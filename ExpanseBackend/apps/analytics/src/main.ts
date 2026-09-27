import { NestFactory } from '@nestjs/core';
import { AnalyticsModule } from './analytics.module';

async function bootstrap() {
  const app = await NestFactory.create(AnalyticsModule);
  await app.listen(process.env.ANALYTICS_APP_PORT);
  console.log('Analytics started on ', process.env.ANALYTICS_APP_PORT)
}
bootstrap();
