import { Response } from 'express';
import { randomBytes } from 'crypto';

export interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  maxAge?: number;
  path?: string;
}

export class CookieHelper {
  private static isProduction = process.env.NODE_ENV === 'production';

  /**
   * Set httpOnly access token cookie (15 min expiry)
   */
  static setAccessTokenCookie(res: Response, token: string): void {
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: this.isProduction,
      sameSite: this.isProduction ? 'strict' : 'lax',
      maxAge: 15 * 60 * 1000, // 15 minutes
      path: '/',
    });
  }

  /**
   * Set httpOnly refresh token cookie (7 days expiry)
   */
  static setRefreshTokenCookie(res: Response, token: string): void {
    res.cookie('refreshToken', token, {
      httpOnly: true,
      secure: this.isProduction,
      sameSite: this.isProduction ? 'strict' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });
  }

  /**
   * Set CSRF token cookie (readable by client for double-submit pattern)
   */
  static setCSRFTokenCookie(res: Response): string {
    const csrfToken = randomBytes(32).toString('hex');
    res.cookie('csrf_token', csrfToken, {
      httpOnly: false, // Client needs to read this
      secure: this.isProduction,
      sameSite: this.isProduction ? 'strict' : 'lax',
      maxAge: 15 * 60 * 1000, // Match access token expiry
      path: '/',
    });
    return csrfToken;
  }

  /**
   * Clear all auth cookies
   */
  static clearAuthCookies(res: Response): void {
    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: this.isProduction,
      sameSite: this.isProduction ? 'strict' : 'lax',
      path: '/',
    };

    res.clearCookie('accessToken', cookieOptions);
    res.clearCookie('refreshToken', cookieOptions);
    res.clearCookie('csrf_token', { ...cookieOptions, httpOnly: false });
  }
}
