import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { AuthEmailService } from './auth-email.service';
import { UserModule } from 'apps/user/src/user.module';
import * as nodemailer from 'nodemailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

const NodeMailerProvider = {
  provide: 'NODE_MAILER',
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return nodemailer.createTransport({
      host: configService.get('AUTH_EMAIL_HOST'),
      port: configService.get('AUTH_EMAIL_PORT'),
      secure: true,
      auth: {
        user: configService.get('AUTH_EMAIL_USER'),
        pass: configService.get('AUTH_EMAIL_PASSWORD'),
      },
    });
  },
};

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        AUTH_EMAIL_HOST: Joi.string().required(),
        AUTH_EMAIL_PORT: Joi.number().port().required(),
        AUTH_EMAIL_USER: Joi.string().required(),
        AUTH_EMAIL_PASSWORD: Joi.string().required(),
      }),
    }),
  ],
  controllers: [EmailController],
  providers: [AuthEmailService, NodeMailerProvider],
})
export class EmailModule {}
