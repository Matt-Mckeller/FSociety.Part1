import { NestFactory } from '@nestjs/core';
import { EmailModule } from './email.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    EmailModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.EMAIL_SERVICE_HOST || 'localhost',
        port: parseInt(process.env.EMAIL_SERVICE_PORT),
        retryAttempts: 3,
        retryDelay: 3000,
      },
    },
  );
  await app.listen();
  console.log('Email service started on ', process.env.EMAIL_SERVICE_PORT);
}
bootstrap();
