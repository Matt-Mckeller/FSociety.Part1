import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthService } from '../auth.service';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

/**
 * Custom JWT extractor - checks cookies first, then Authorization header
 * Allows for graceful migration from header-based to cookie-based auth
 */
function extractJwtFromCookieOrHeader(req: Request): string | null {
  if (req.cookies && req.cookies.accessToken) {
    return req.cookies.accessToken;
  }
  return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    const nodeEnv = configService.get<string>('NODE_ENV');
    
    if (!secret && nodeEnv === 'production') {
      throw new Error('JWT_SECRET must be set in production environment');
    }
    
    super({
      jwtFromRequest: extractJwtFromCookieOrHeader,
      ignoreExpiration: false,
      secretOrKey: secret || 'dev-jwt-secret-DO-NOT-USE-IN-PRODUCTION',
      issuer: '4eye.ai',
      audience: '4eye-app',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUser(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
