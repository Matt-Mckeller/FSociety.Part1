import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Enable CORS for frontend
  app.enableCors({
    origin: ['http://localhost:3020', 'http://localhost:3000'],
    credentials: true,
  });

  const port = process.env.PORT || 4000;
  await app.listen(port);
  
  logger.log(`🚀 Lottie Studio Backend running on http://localhost:${port}`);
  logger.log(`📊 GraphQL Playground: http://localhost:${port}/graphql`);
}

bootstrap();
