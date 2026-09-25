import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { UseGuards, UnauthorizedException } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthPayload } from './types/auth.types';
import {
  LoginInput,
  SignupInput,
  OAuthLoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from './dto/auth.input';
import { User } from '../users/entities/user.entity';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { Public } from './decorators/public.decorator';
import { GqlThrottlerGuard } from '../../common/guards/gql-throttler.guard';
import { CookieHelper } from './utils/cookie.helper';

@Resolver()
@UseGuards(GqlThrottlerGuard)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 attempts per minute
  @Mutation(() => AuthPayload, { description: 'Login with email and password' })
  async login(
    @Args('input') input: LoginInput,
    @Context() context: { res: Response },
  ): Promise<AuthPayload> {
    const payload = await this.authService.login(input);
    
    // Set httpOnly cookies for tokens
    const accessToken = this.authService.generateAccessToken(payload.user);
    const refreshToken = this.authService.generateRefreshToken(payload.user);
    
    CookieHelper.setAccessTokenCookie(context.res, accessToken);
    CookieHelper.setRefreshTokenCookie(context.res, refreshToken);
    CookieHelper.setCSRFTokenCookie(context.res);
    
    return payload;
  }

  @Public()
  @Throttle({ default: { limit: 3, ttl: 60000 } }) // 3 signups per minute per IP
  @Mutation(() => AuthPayload, { description: 'Create a new account' })
  async signup(
    @Args('input') input: SignupInput,
    @Context() context: { res: Response },
  ): Promise<AuthPayload> {
    const payload = await this.authService.signup(input);
    
    // Set httpOnly cookies for tokens
    const accessToken = this.authService.generateAccessToken(payload.user);
    const refreshToken = this.authService.generateRefreshToken(payload.user);
    
    CookieHelper.setAccessTokenCookie(context.res, accessToken);
    CookieHelper.setRefreshTokenCookie(context.res, refreshToken);
    CookieHelper.setCSRFTokenCookie(context.res);
    
    return payload;
  }

  @Public()
  @Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 attempts per minute
  @Mutation(() => AuthPayload, { description: 'Login with OAuth provider' })
  async oauthLogin(
    @Args('input') input: OAuthLoginInput,
    @Context() context: { res: Response },
  ): Promise<AuthPayload> {
    const payload = await this.authService.oauthLogin(input);
    
    // Set httpOnly cookies for tokens
    const accessToken = this.authService.generateAccessToken(payload.user);
    const refreshToken = this.authService.generateRefreshToken(payload.user);
    
    CookieHelper.setAccessTokenCookie(context.res, accessToken);
    CookieHelper.setRefreshTokenCookie(context.res, refreshToken);
    CookieHelper.setCSRFTokenCookie(context.res);
    
    return payload;
  }

  @Public()
  @Throttle({ default: { limit: 3, ttl: 300000 } }) // 3 requests per 5 minutes
  @Mutation(() => Boolean, { description: 'Request password reset email' })
  async forgotPassword(@Args('input') input: ForgotPasswordInput): Promise<boolean> {
    return this.authService.forgotPassword(input.email);
  }

  @Public()
  @Throttle({ default: { limit: 3, ttl: 300000 } }) // 3 attempts per 5 minutes
  @Mutation(() => Boolean, { description: 'Reset password with token' })
  async resetPassword(@Args('input') input: ResetPasswordInput): Promise<boolean> {
    return this.authService.resetPassword(input.token, input.newPassword);
  }

  @Mutation(() => Boolean, { description: 'Logout current session' })
  @UseGuards(GqlAuthGuard)
  async logout(
    @CurrentUser() user: User,
    @Context() context: { res: Response },
  ): Promise<boolean> {
    // Clear all auth cookies
    CookieHelper.clearAuthCookies(context.res);
    return true;
  }

  @Public()
  @Mutation(() => AuthPayload, { description: 'Refresh access token using refresh token' })
  async refreshToken(@Context() context: { req: Request; res: Response }): Promise<AuthPayload> {
    const refreshToken = (context.req as any).cookies?.refreshToken;
    
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }

    const user = await this.authService.verifyRefreshToken(refreshToken);
    
    // Generate new access token
    const newAccessToken = this.authService.generateAccessToken(user);
    CookieHelper.setAccessTokenCookie(context.res, newAccessToken);
    
    // Refresh CSRF token
    CookieHelper.setCSRFTokenCookie(context.res);
    
    return { user };
  }

  @Query(() => User, { name: 'me', description: 'Get current user' })
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
