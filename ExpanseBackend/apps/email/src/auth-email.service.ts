import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SMTPTransport } from 'nodemailer';
import { getPasswordResetEmail } from './emailTemplates/content/password-reset';
import { getSignUpSuccessEmail } from './emailTemplates/content/sign-up-success';
import { getPasswordUpdateSuccessEmail } from './emailTemplates/content';

@Injectable()
export class AuthEmailService {
  constructor(
    @Inject('NODE_MAILER') private nodeMailer: SMTPTransport,
    @Inject(ConfigService) private configService: ConfigService,
  ) {}

  async sendSignUpSuccessEmail(_User) {
    console.log('Should send sign up success email.');
    console.log(
      'should send email?',
      this.configService.get('SEND_MAIL'),
      this.configService.get('SEND_MAIL') === 'true',
    );
    const email = getSignUpSuccessEmail({
      browserTabTitle: 'Sign Up Successful!',
    });

    if (this.configService.get('SEND_MAIL') === 'true') {
      await this.nodeMailer.sendMail({
        from: this.configService.get('AUTH_EMAIL_FROM'),
        bcc: this.configService.get('AUTH_TEST_SENDING_EMAIL_ADDRESS'),
        to:
          this.configService.get('SEND_MAIL_TO_USERS') === 'true'
            ? _User.email
            : this.configService.get('AUTH_TEST_SENDING_EMAIL_ADDRESS'),
        subject: _User.fullName + ', your sign up was successful!',
        html: email,
      });
      console.log('Sign up success email sent successfully.');
      return true;
    }
    return true;
  }

  async sendResetPasscodeEmail(_User) {
    const email = getPasswordResetEmail({
      fullName: _User.fullName,
      userEmailAddress: _User.email,
      resetPasscode: _User.resetPasswordPasscode,
      browserTabTitle: 'Expanse Reset Email',
    });

    if (this.configService.get('SEND_MAIL') === 'true') {
      await this.nodeMailer.sendMail({
        from: this.configService.get('AUTH_EMAIL_FROM'),
        bcc: this.configService.get('AUTH_TEST_SENDING_EMAIL_ADDRESS'),
        to:
          this.configService.get('SEND_MAIL_TO_USERS') === 'true'
            ? _User.email
            : this.configService.get('AUTH_TEST_SENDING_EMAIL_ADDRESS'),
        subject: 'Your password reset code',
        html: email,
      });
      console.log('Password updated email sent successfully');
      return true;
    }

    console.log(
      'Password update email not sent - SENDMAIL Disabled via env config',
    );

    return true;
  }

  async sendPasswordUpdatedEmail(_User) {
    const email = getPasswordUpdateSuccessEmail({
      fullName: _User.fullName,
      browserTabTitle: 'Expanse Password Updated',
    });

    if (this.configService.get('SEND_MAIL') === 'true') {
      await this.nodeMailer.sendMail({
        from: this.configService.get('AUTH_EMAIL_FROM'),
        bcc: this.configService.get('AUTH_TEST_SENDING_EMAIL_ADDRESS'),
        to:
          this.configService.get('SEND_MAIL_TO_USERS') === 'true'
            ? _User.email
            : this.configService.get('AUTH_TEST_SENDING_EMAIL_ADDRESS'),
        subject: 'Password update successful',
        html: email,
      });
      console.log('Reset passcode sent');
      return true;
    }

    console.log('Reset passcode not sent - SENDMAIL Disabled via env config');
    return true;
  }
}
