import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { AuthPayload, JwtPayloadData, RefreshTokenPayload } from './types/auth.types';
import { LoginInput, SignupInput, OAuthLoginInput } from './dto/auth.input';
import { OAuthProvider } from '../../common/enums';
import { OAuth2Client } from 'google-auth-library';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {
    this.googleClient = new OAuth2Client(
      this.configService.get<string>('GOOGLE_CLIENT_ID'),
    );
  }

  async login(input: LoginInput): Promise<AuthPayload> {
    const user = await this.usersService.findByEmail(input.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await this.usersService.validatePassword(user, input.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.createAuthPayload(user);
  }

  async signup(input: SignupInput): Promise<AuthPayload> {
    const user = await this.usersService.create({
      email: input.email,
      password: input.password,
      name: input.name,
      preferredLanguage: input.preferredLanguage,
    });

    // Send welcome email (don't await - fire and forget)
    this.emailService.sendWelcomeEmail(user.email, user.name).catch(err => {
      console.error('Failed to send welcome email:', err);
    });

    return this.createAuthPayload(user);
  }

  async oauthLogin(input: OAuthLoginInput): Promise<AuthPayload> {
    let oauthUser: { email: string; name: string; avatarUrl?: string; providerId: string };

    switch (input.provider) {
      case OAuthProvider.GOOGLE:
        oauthUser = await this.verifyGoogleToken(input.idToken);
        break;
      case OAuthProvider.APPLE:
        oauthUser = await this.verifyAppleToken(input.idToken, input.nonce);
        break;
      default:
        throw new BadRequestException('Unsupported OAuth provider');
    }

    // Check if user exists by OAuth provider
    let user = await this.usersService.findByOAuthProvider(input.provider, oauthUser.providerId);

    if (!user) {
      // Check if user exists by email (link accounts)
      user = await this.usersService.findByEmail(oauthUser.email);

      if (user) {
        // Link OAuth to existing account
        await this.usersService.update(user.id, {
          // Note: We'd need to add oauthProvider fields to update
        });
      } else {
        // Create new user
        user = await this.usersService.create({
          email: oauthUser.email,
          name: oauthUser.name,
          avatarUrl: oauthUser.avatarUrl,
        });
      }
    }

    return this.createAuthPayload(user);
  }

  async validateUser(userId: string): Promise<User | null> {
    return this.usersService.findById(userId);
  }

  async forgotPassword(email: string): Promise<boolean> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      // Don't reveal if user exists - always return success
      return true;
    }

    const token = await this.usersService.createPasswordResetToken(user);
    
    // Send password reset email
    await this.emailService.sendPasswordResetEmail(user.email, token, user.name);

    return true;
  }

  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    const resetToken = await this.usersService.validatePasswordResetToken(token);
    if (!resetToken) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    await this.usersService.updatePassword(resetToken.userId, newPassword);
    await this.usersService.usePasswordResetToken(token);

    return true;
  }

  private async verifyGoogleToken(idToken: string): Promise<{
    email: string;
    name: string;
    avatarUrl?: string;
    providerId: string;
  }> {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience: this.configService.get<string>('GOOGLE_CLIENT_ID'),
      });
      const payload = ticket.getPayload();
      
      if (!payload || !payload.email) {
        throw new UnauthorizedException('Invalid Google token');
      }

      return {
        email: payload.email,
        name: payload.name || payload.email.split('@')[0],
        avatarUrl: payload.picture,
        providerId: payload.sub,
      };
    } catch (error) {
      throw new UnauthorizedException('Failed to verify Google token');
    }
  }

  private async verifyAppleToken(
    idToken: string,
    nonce?: string,
  ): Promise<{
    email: string;
    name: string;
    avatarUrl?: string;
    providerId: string;
  }> {
    // Apple Sign In verification
    // TODO: Implement Apple token verification using apple-signin-auth package
    // For now, return a placeholder that will be implemented
    throw new BadRequestException('Apple Sign In not yet implemented');
  }

  private createAuthPayload(user: User): AuthPayload {
    // Tokens are now set as httpOnly cookies by the resolver
    // This payload only returns user data
    return {
      user,
    };
  }

  /**
   * Generate access token (15 min expiry)
   */
  generateAccessToken(user: User): string {
    const payload: JwtPayloadData = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return this.jwtService.sign(payload, {
      expiresIn: '15m',
    });
  }

  /**
   * Generate refresh token (7 days expiry)
   */
  generateRefreshToken(user: User): string {
    const payload: RefreshTokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      tokenVersion: user.tokenVersion || 0,
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET') || this.configService.get<string>('JWT_SECRET'),
      expiresIn: '7d',
    });
  }

  /**
   * Verify refresh token and return user
   */
  async verifyRefreshToken(token: string): Promise<User> {
    try {
      const payload = this.jwtService.verify<RefreshTokenPayload>(token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET') || this.configService.get<string>('JWT_SECRET'),
      });

      const user = await this.validateUser(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Check token version for invalidation support
      if (user.tokenVersion !== undefined && payload.tokenVersion !== user.tokenVersion) {
        throw new UnauthorizedException('Token has been revoked');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
