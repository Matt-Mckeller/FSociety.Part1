import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { AnalyticsResolver } from './analytics.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AnalyticsEvent } from './entities/AnalyticsEvent.entity';
import * as Joi from 'joi';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    // GraphQLModule.forRoot({
    //   driver: ApolloDriver,
    //   autoSchemaFile: join(process.cwd(), 'gql/analyticsSchema.gql'),
    //   playground: true,
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        ANALYTICS_DB_HOST: Joi.string().required(),
        ANALYTICS_DB_PORT: Joi.number().required(),
        ANALYTICS_DB_USER: Joi.string().required(),
        ANALYTICS_DB_PASSWORD: Joi.string().required(),
        ANALYTICS_DB_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      name: 'analytics',
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('ANALYTICS_DB_HOST'),
        port: configService.get<number>('ANALYTICS_DB_PORT'),
        username: configService.get<string>('ANALYTICS_DB_USER'),
        password: configService.get<string>('ANALYTICS_DB_PASSWORD'),
        database: configService.get<string>('ANALYTICS_DB_NAME'),
        // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        entities: [AnalyticsEvent],
        synchronize: configService.get<string>('NODE_ENV') === 'development',
      }),

      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([AnalyticsEvent], 'analytics'),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, AnalyticsResolver],
  exports: [],
})
export class AnalyticsModule {}
