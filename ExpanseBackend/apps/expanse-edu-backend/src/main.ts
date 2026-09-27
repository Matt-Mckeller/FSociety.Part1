import { NestFactory } from '@nestjs/core';
import { ExpanseEduBackendModule } from './expanse-edu-backend.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(ExpanseEduBackendModule);
  // const server = app.getHttpAdapter().getInstance();
  // server.setTimeout(3000000); // 50 minutes (in milliseconds)

  console.log(
    'Expanse edu backend started on ',
    process.env.EDU_BACKEND_APP_PORT,
  );

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN') || '*', // Allow all origins or specify a specific origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(helmet());

  await app.listen(process.env.EDU_BACKEND_APP_PORT);
}
bootstrap();
