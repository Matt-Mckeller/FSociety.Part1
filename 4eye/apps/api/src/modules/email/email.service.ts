import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

@Injectable()
export class EmailService implements OnModuleInit {
  private readonly logger = new Logger(EmailService.name);
  private transporter: Transporter | null = null;
  private sendgridApiKey: string | undefined;
  private defaultFrom: string;
  private appUrl: string;
  private isConfigured = false;

  constructor(private configService: ConfigService) {
    this.defaultFrom = this.configService.get('EMAIL_FROM') || 'noreply@4eye.ai';
    this.appUrl = this.configService.get('APP_URL') || 'http://localhost:3000';
    this.sendgridApiKey = this.configService.get('SENDGRID_API_KEY');
  }

  async onModuleInit() {
    await this.initializeTransport();
  }

  private async initializeTransport() {
    // Option 1: SendGrid (recommended for production)
    if (this.sendgridApiKey) {
      this.logger.log('Email configured with SendGrid');
      this.isConfigured = true;
      return;
    }

    // Option 2: SMTP (gmail, sendgrid, etc.)
    const smtpHost = this.configService.get('SMTP_HOST');
    const smtpPort = this.configService.get('SMTP_PORT');
    const smtpUser = this.configService.get('SMTP_USER');
    const smtpPassword = this.configService.get('SMTP_PASSWORD');

    if (smtpHost && smtpUser && smtpPassword) {
      this.transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort || '587', 10),
        secure: smtpPort === '465',
        auth: {
          user: smtpUser,
          pass: smtpPassword,
        },
      });

      try {
        await this.transporter.verify();
        this.logger.log('Email configured with SMTP');
        this.isConfigured = true;
      } catch (error) {
        this.logger.error('SMTP connection failed:', error);
        this.transporter = null;
      }
      return;
    }

    // Option 3: Development mode - log emails
    this.logger.warn('No email service configured. Emails will be logged to console.');
  }

  /**
   * Send an email
   */
  async send(options: SendEmailOptions): Promise<EmailResult> {
    const { to, subject, html, text, from, replyTo } = options;
    const fromAddress = from || this.defaultFrom;

    // Log in development when not configured
    if (!this.isConfigured) {
      const messageId = `dev-${Date.now()}`;
      await this.logEmailToFile({
        messageId,
        to: Array.isArray(to) ? to.join(', ') : to,
        from: fromAddress,
        subject,
        html,
        text,
        replyTo,
        timestamp: new Date().toISOString(),
      });
      return { success: true, messageId };
    }

    try {
      // SendGrid
      if (this.sendgridApiKey) {
        const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.sendgridApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            personalizations: [{
              to: (Array.isArray(to) ? to : [to]).map(email => ({ email })),
            }],
            from: { email: fromAddress },
            reply_to: replyTo ? { email: replyTo } : undefined,
            subject,
            content: [
              ...(text ? [{ type: 'text/plain', value: text }] : []),
              { type: 'text/html', value: html },
            ],
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'SendGrid API error');
        }

        // SendGrid returns 202 Accepted with x-message-id header
        const messageId = response.headers.get('x-message-id') || 'sendgrid-sent';
        this.logger.log(`Email sent via SendGrid: ${messageId}`);
        return { success: true, messageId };
      }

      // SMTP
      if (this.transporter) {
        const result = await this.transporter.sendMail({
          from: fromAddress,
          to: Array.isArray(to) ? to.join(', ') : to,
          subject,
          html,
          text,
          replyTo,
        });
        this.logger.log(`Email sent via SMTP: ${result.messageId}`);
        return { success: true, messageId: result.messageId };
      }

      return { success: false, error: 'No email transport configured' };
    } catch (error) {
      this.logger.error('Failed to send email:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Log email to file for development/testing
   * Emails are saved to .email-logs/ directory as HTML files
   */
  private async logEmailToFile(email: {
    messageId: string;
    to: string;
    from: string;
    subject: string;
    html: string;
    text?: string;
    replyTo?: string;
    timestamp: string;
  }): Promise<void> {
    const logsDir = path.join(process.cwd(), '.email-logs');
    
    try {
      // Ensure logs directory exists
      await fs.mkdir(logsDir, { recursive: true });
      
      // Create filename from timestamp and subject
      const safeSubject = email.subject.replace(/[^a-z0-9]/gi, '-').substring(0, 50);
      const filename = `${email.timestamp.replace(/[:.]/g, '-')}_${safeSubject}.html`;
      const filepath = path.join(logsDir, filename);
      
      // Create HTML file with email metadata header
      const content = `<!--
================== EMAIL LOG ==================
Message ID: ${email.messageId}
Timestamp:  ${email.timestamp}
To:         ${email.to}
From:       ${email.from}
Subject:    ${email.subject}
Reply-To:   ${email.replyTo || 'N/A'}
===============================================
-->
${email.html}`;
      
      await fs.writeFile(filepath, content, 'utf-8');
      
      this.logger.log(`📧 Email logged to: ${filepath}`);
      this.logger.log(`   To: ${email.to} | Subject: ${email.subject}`);
    } catch (error) {
      this.logger.error('Failed to log email to file:', error);
      // Still log to console as fallback
      this.logger.log('================== EMAIL (DEV MODE) ==================');
      this.logger.log(`To: ${email.to}`);
      this.logger.log(`Subject: ${email.subject}`);
      this.logger.log('======================================================');
    }
  }

  // ============================================
  // Auth Email Templates
  // ============================================

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(email: string, token: string, name?: string): Promise<EmailResult> {
    const resetUrl = `${this.appUrl}/reset-password?token=${token}`;
    
    return this.send({
      to: email,
      subject: 'Reset your 4eye password',
      html: this.passwordResetTemplate(resetUrl, name),
      text: `Reset your password by visiting: ${resetUrl}\n\nThis link expires in 1 hour.`,
    });
  }

  /**
   * Send email verification email
   */
  async sendVerificationEmail(email: string, token: string, name?: string): Promise<EmailResult> {
    const verifyUrl = `${this.appUrl}/verify-email?token=${token}`;
    
    return this.send({
      to: email,
      subject: 'Verify your 4eye email',
      html: this.emailVerificationTemplate(verifyUrl, name),
      text: `Verify your email by visiting: ${verifyUrl}`,
    });
  }

  /**
   * Send welcome email after signup
   */
  async sendWelcomeEmail(email: string, name: string): Promise<EmailResult> {
    return this.send({
      to: email,
      subject: 'Welcome to 4eye!',
      html: this.welcomeEmailTemplate(name),
      text: `Welcome to 4eye, ${name}! Get started at ${this.appUrl}`,
    });
  }

  // ============================================
  // Email Templates
  // ============================================

  private baseTemplate(content: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>4eye</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .card {
      background: white;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .logo {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo h1 {
      color: #1976d2;
      font-size: 28px;
      margin: 0;
    }
    .button {
      display: inline-block;
      background: #1976d2;
      color: white !important;
      padding: 14px 32px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      margin: 20px 0;
    }
    .button:hover {
      background: #1565c0;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      color: #666;
      font-size: 14px;
    }
    .footer a {
      color: #1976d2;
    }
    .small {
      font-size: 13px;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="logo">
        <h1>4eye</h1>
      </div>
      ${content}
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} 4eye. All rights reserved.</p>
      <p><a href="${this.appUrl}">4eye.ai</a></p>
    </div>
  </div>
</body>
</html>`;
  }

  private passwordResetTemplate(resetUrl: string, name?: string): string {
    return this.baseTemplate(`
      <h2>Reset Your Password</h2>
      <p>Hi${name ? ` ${name}` : ''},</p>
      <p>We received a request to reset your password. Click the button below to create a new password:</p>
      <p style="text-align: center;">
        <a href="${resetUrl}" class="button">Reset Password</a>
      </p>
      <p class="small">This link will expire in 1 hour for security reasons.</p>
      <p class="small">If you didn't request this, you can safely ignore this email. Your password won't be changed.</p>
      <p style="margin-top: 30px; font-size: 13px; color: #888;">
        Or copy and paste this link: <br>
        <a href="${resetUrl}" style="color: #1976d2; word-break: break-all;">${resetUrl}</a>
      </p>
    `);
  }

  private emailVerificationTemplate(verifyUrl: string, name?: string): string {
    return this.baseTemplate(`
      <h2>Verify Your Email</h2>
      <p>Hi${name ? ` ${name}` : ''},</p>
      <p>Thanks for signing up! Please verify your email address to get started:</p>
      <p style="text-align: center;">
        <a href="${verifyUrl}" class="button">Verify Email</a>
      </p>
      <p class="small">If you didn't create an account, you can safely ignore this email.</p>
      <p style="margin-top: 30px; font-size: 13px; color: #888;">
        Or copy and paste this link: <br>
        <a href="${verifyUrl}" style="color: #1976d2; word-break: break-all;">${verifyUrl}</a>
      </p>
    `);
  }

  private welcomeEmailTemplate(name: string): string {
    return this.baseTemplate(`
      <h2>Welcome to 4eye!</h2>
      <p>Hi ${name},</p>
      <p>Thanks for joining 4eye! We're excited to have you on board.</p>
      <p>Here's what you can do next:</p>
      <ul>
        <li>Join or create a room for live sessions</li>
        <li>Follow along with AI-powered transcriptions</li>
        <li>Generate summaries and highlights</li>
        <li>Track your learning progress</li>
      </ul>
      <p style="text-align: center;">
        <a href="${this.appUrl}/dashboard" class="button">Get Started</a>
      </p>
      <p>If you have any questions, just reply to this email. We're here to help!</p>
    `);
  }
}
