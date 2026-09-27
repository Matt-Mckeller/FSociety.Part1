import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    // transport: Transport.RMQ,
    options: {
      transport: Transport.TCP,
      options: {
        host: process.env.EMAIL_SERVICE_HOST || 'localhost',
        port: parseInt(process.env.EMAIL_SERVICE_PORT),
        retryAttempts: 3,
        retryDelay: 3000,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.BACKEND_APP_PORT);
  console.log('Expanse backend started on ', process.env.BACKEND_APP_PORT);
}
bootstrap();
