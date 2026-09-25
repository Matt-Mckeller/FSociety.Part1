import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import * as winston from 'winston';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.printf(({ timestamp, level, message, ...meta }) => {
              const metaStr = Object.keys(meta).length
                ? ` ${JSON.stringify(meta)}`
                : '';
              return `${timestamp} [${level}]: ${message}${metaStr}`;
            }),
          ),
        }),
      ],
    }),
  });

  // Security middleware
  const isProduction = process.env.NODE_ENV === 'production';
  
  app.use(helmet({
    crossOriginEmbedderPolicy: false, // Required for GraphQL Playground
    contentSecurityPolicy: isProduction ? undefined : false, // Disable CSP in dev for playground
  }));

  // Cookie parser middleware
  app.use(cookieParser());

  // Global validation pipe with security settings
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip unknown properties
      forbidNonWhitelisted: true, // Throw on unknown properties
      transform: true,
      transformOptions: {
        enableImplicitConversion: false, // Explicit type conversion only
      },
    }),
  );

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
  });

  const port = process.env.API_PORT || 3001;
  await app.listen(port);
  console.log(`API running on http://localhost:${port}/graphql`);
}
bootstrap();
