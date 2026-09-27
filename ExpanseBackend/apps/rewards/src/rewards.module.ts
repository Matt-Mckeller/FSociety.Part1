import { Module } from '@nestjs/common';
import { RewardsController } from './rewards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { RewardResolver } from './resolvers/reward.resolver';
import { RewardService } from './services/reward.service';
import { Reward } from './entities/Reward.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { WalletResolver } from './resolvers/wallet.resolver';
import { CurrencyService } from './services/currency.service';
import { CurrencyTypes } from './entities/currency.entity';
import { WalletService } from './services/wallet.service';
import { Coin } from './entities/coin.entity';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'gql/rewardsSchema.gql'),
      playground: true,
    }),
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
        entities: [Reward],
        synchronize: true,
        // synchronize: configService.get<string>('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    // TypeOrmModule.forFeature([RewardableEventType], 'main'),
    // TypeOrmModule.forFeature([RewardableEvent], 'main'),
    TypeOrmModule.forFeature([Reward], 'main'),
    TypeOrmModule.forFeature([CurrencyTypes], 'main'),
    TypeOrmModule.forFeature([Coin], 'main'),
  ],
  controllers: [RewardsController],
  providers: [
    RewardService,
    RewardResolver,
    WalletResolver,
    CurrencyService,
    WalletService,
    // RewardActionManagerResolver,
    // RewardActionManagerService,
  ],
  exports: [
    // RewardActionManagerService,
    TypeOrmModule,
  ],
})
export class RewardsModule {}

// Local requirements: Scheduler
