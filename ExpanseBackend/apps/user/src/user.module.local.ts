import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';

import { UserResolver } from './user/user.resolver';
import * as Joi from 'joi';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'gql/userSchema.gql'),
      playground: true,
    }),
    ClientsModule.registerAsync([
      {
        name: 'EMAIL_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('EMAIL_SERVICE_HOST'),
            port: configService.get<number>('EMAIL_SERVICE_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
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
        entities: [User],
        synchronize: false,
        // synchronize: configService.get<string>('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User], 'main'),
  ],
  controllers: [UserController],
  providers: [UserService, UserResolver],
  exports: [UserService, TypeOrmModule],
})
export class UserModuleLocal {}
