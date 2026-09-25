import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { HealthModule } from './health/health.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { AIModule } from './modules/ai/ai.module';
import { EmailModule } from './modules/email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
    }),

    EventEmitterModule.forRoot(),

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isProduction = config.get<string>('NODE_ENV') === 'production';
        return {
          autoSchemaFile: true,
          playground: !isProduction, // Disable in production
          introspection: !isProduction, // Disable in production
          // Pass req/res to context for throttling and auth
          context: ({ req, res }: { req: any; res: any }) => ({ req, res }),
          subscriptions: {
            'graphql-ws': true,
          },
          // Mask errors in production
          formatError: (error) => {
            if (isProduction) {
              // Don't expose internal errors to clients
              const originalError = error.extensions?.originalError as any;
              if (originalError?.statusCode >= 500) {
                return {
                  message: 'Internal server error',
                  extensions: { code: 'INTERNAL_SERVER_ERROR' },
                };
              }
            }
            return error;
          },
        };
      },
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres' as const,
        url: config.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: config.get<string>('NODE_ENV') === 'development',
        logging: config.get<string>('NODE_ENV') === 'development',
        retryAttempts: 5,
        retryDelay: 3000,
      }),
    }),

    // Rate limiting - 100 requests per minute per IP
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000, // 1 second
        limit: 10, // 10 requests per second
      },
      {
        name: 'medium',
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests per minute
      },
      {
        name: 'long',
        ttl: 3600000, // 1 hour
        limit: 1000, // 1000 requests per hour
      },
    ]),

    HealthModule,
    EmailModule,
    UsersModule,
    AuthModule,
    OrganizationsModule,
    RoomsModule,
    SessionsModule,
    AIModule,
  ],
})
export class AppModule {}
