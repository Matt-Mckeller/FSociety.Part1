import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthenticationService } from 'apps/expanse-edu-backend/src/services/authentication.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthTokenMiddleware implements NestMiddleware {
  constructor(private authService: AuthenticationService) {} // Inject your service

  async use(req: Request | any, res: Response, next: NextFunction) {
    if (req.expansePerson) {
      // Validate token is still valid and/or refresh
      // Handle queue of refresh tokens
    } else {
      console.log('else');
      console.log('req.headers.authorization:', req.headers.authorization);
      if (req.headers.authorization && !req.expansePerson) {
        const expanseAuthToken = req.headers.authorization.replace(
          'Bearer ',
          '',
        );
        // todo is there a way to optimize this to not have to call the db every time?

        const { authTokens, expansePerson } =
          await this.authService.getAuthTokensAndPerson(expanseAuthToken);
        console.log({
          authTokens,
          expansePerson,
        });
        req.expansePerson = expansePerson; // Expanse Person
        req.edLinkAccessToken = authTokens.edLinkAccessToken;
        req.edLinkRefreshToken = authTokens.edLinkRefreshToken;
        req.expanseAuthToken = expanseAuthToken;
      }
    }
    next();
  }
}
