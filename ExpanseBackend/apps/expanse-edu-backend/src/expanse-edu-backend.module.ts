import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { ScheduleModule } from '@nestjs/schedule';

import { Agreements } from './entities/Agreements';
import { Assignment } from './entities/Assignment';
import { Class } from './entities/Class';
import { Course } from './entities/Course';
import { Enrollment } from './entities/Enrollment';
import { ExperienceEvent } from './entities/ExperienceEvent';
import { District } from './entities/District';
import { Integration } from './entities/Integration';
import { School } from './entities/School';
import { Section } from './entities/Section';
import { Session } from './entities/Session';
import { Submission } from './entities/Submission';
import { LootBox } from './entities/LootBox';
import { ExpansePerson } from './entities/ExpansePerson';
import { Reward } from './entities/Reward.entity';
import { Coin, Experience } from './entities';
import { RewardService } from './services/reward.service';
import { RewardResolver } from './resolvers/reward.resolver';
import { WalletResolver } from './resolvers/wallet.resolver';
import { WalletService } from './services/wallet.service';
import { ExpanseEduBackendController } from './expanse-edu-backend.controller';
import { AuthenticationService } from './services/authentication.service';
import { AuthTokens } from './entities/AuthTokens';
import { LoggerMiddleware } from '@app/shared/middleware/logger.middleware';
import { AuthTokenMiddleware } from '@app/shared/middleware/authToken.middleware';
import { EdLinkService } from './services/edLink.service';
import { ExpansePersonToCoin } from './entities/ExpansePersonToCoin';
import { CoinEvent } from './entities/CoinEvent';
import { RewardToOwner } from './entities/RewardToOwner';
import { ProfileResolver } from './resolvers/profile.resolver';
import { RewardableEvent } from './entities/RewardableEvent.entity';
import { EducationService } from './services/education.service';
import { ExperienceService } from './services/experienceService';
import { ExpanseRole } from './entities/ExpanseRole';
import { SyncAndSetupService } from './services/syncAndSetup.service';
import { RolesMiddleware } from '../../../libs/shared/src/middleware/roles.middleware';

const entities = [
  AuthTokens,
  Agreements,
  Assignment,
  Class,
  Coin,
  Course,
  District,
  Enrollment,
  Experience,
  ExperienceEvent,
  Integration,
  LootBox,
  ExpansePerson,
  Reward,
  RewardableEvent,
  School,
  Section,
  Session,
  Submission,
  ExpansePersonToCoin,
  CoinEvent,
  RewardToOwner,
  ExpanseRole,
];

// Todo provide an instantiated version of edlink here?
@Module({
  imports: [
    ScheduleModule.forRoot(), // cron
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'gql/eduSchema.gql'),
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
        entities: [...entities],
        synchronize: process.env.TYPEORM_SYNC_ENABLED === 'true',
        // synchronize: configService.get<string>('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    // RewardsModule,
    // EmailModule, // No need to import at the moment, connected as a separate microservice in main.ts
    TypeOrmModule.forFeature([...entities], 'main'),
  ],
  controllers: [ExpanseEduBackendController],
  providers: [
    EdLinkService,
    RewardService,
    RewardResolver,
    WalletResolver,
    ProfileResolver,
    WalletService,
    AuthenticationService,
    EducationService,
    ExperienceService,
    SyncAndSetupService,
  ],
})
export class ExpanseEduBackendModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    // Creating multiple instances to avoid the options request method
    consumer
      .apply(AuthTokenMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.GET });
    consumer
      .apply(AuthTokenMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.POST });
    consumer
      .apply(AuthTokenMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.PUT });
    consumer
      .apply(AuthTokenMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.DELETE });
    consumer
      .apply(AuthTokenMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.PATCH });
    consumer
      .apply(RolesMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.GET });
    consumer
      .apply(RolesMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.POST });
    consumer
      .apply(RolesMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.PUT });
    consumer
      .apply(RolesMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.DELETE });
    consumer
      .apply(RolesMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.PATCH });
  }
}
