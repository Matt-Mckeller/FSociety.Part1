import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'apps/user/src/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { EmailModule } from 'apps/email/src/email.module';
import { AnalyticsModule } from 'apps/analytics/src/analytics.module';
import { ExperienceModule } from 'apps/experience/src/experience.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'apps/user/src/entities/user.entity';
import * as Joi from 'joi';
import { LevelExperienceRequirements } from 'apps/experience/src/entities/levelExperienceRequirements.entity';
import { RewardsModule } from 'apps/rewards/src/rewards.module';
import { ScheduleModule } from '@nestjs/schedule';
import { RewardableEvent } from 'apps/rewards/src/entities/RewardableEvent.entity';
import { RewardableEventTypeTag } from 'apps/rewards/src/entities/RewardableEventTypeTag.entity';
import { RewardableEventType } from 'apps/rewards/src/entities/RewardableEventType.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'gql/backendSchema.gql'),
      playground: true,
    }),
    // AnalyticsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        MAIN_DB_HOST: Joi.string().required(),
        MAIN_DB_PORT: Joi.number().port().required(),
        MAIN_DB_USER: Joi.string().required(),
        MAIN_DB_PASSWORD: Joi.string().required(),
        MAIN_DB_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      name: 'main', // Also needs to be specified in the @InjectRepository decorator
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MAIN_DB_HOST'),
        port: configService.get<number>('MAIN_DB_PORT'),
        username: configService.get<string>('MAIN_DB_USER'),
        password: configService.get<string>('MAIN_DB_PASSWORD'),
        database: configService.get<string>('MAIN_DB_NAME'),
        // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        entities: [
          User,
          LevelExperienceRequirements,
          RewardableEvent,
          RewardableEventType,
          RewardableEventTypeTag,
        ],
        synchronize: false,
        // synchronize: configService.get<string>('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ExperienceModule,
    RewardsModule,
    // EmailModule, // No need to import at the moment, connected as a separate microservice in main.ts
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
