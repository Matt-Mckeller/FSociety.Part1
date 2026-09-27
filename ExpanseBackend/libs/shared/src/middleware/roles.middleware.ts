import { Edlink, IntegrationTokenSet, TokenSetType } from '@edlink/typescript';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthenticationService } from 'apps/expanse-edu-backend/src/services/authentication.service';
import { Request, Response, NextFunction } from 'express';
import { Role } from '../enums/role.enum';
import { EdLinkService } from '../../../../apps/expanse-edu-backend/src/services/edLink.service';

@Injectable()
export class RolesMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthenticationService,
    private edLinkService: EdLinkService,
  ) {} // Inject your service

  async use(req: Request | any, res: Response, next: NextFunction) {
    req.roles = [Role.ExpanseGuest];
    console.log('Roles middleware called');
    console.log('req.expansePerson:', req.expansePerson);
    console.log('req.expansePerson.roles:', req.expansePerson?.roles);
    // actually the roles from edlink are not being set, only have the expanse roles
    // should I sync the roles from edlink to expanse? or should i call edlink to get the roles?
    // I don't want to make an http request every time a middleware is called
    // Don't really want to make a db call every time either but I'm already making one
    // Relying on a JWT for authorization is probably not as secure
    // Turns out the roles aren't necessarily up to date in edlink, guess it needs to be based on enrollments
    if (req.expansePerson) {
      console.log('inside if statement of roles middleware');
      // req.roles = [...req.roles];
      // delete req.expansePerson.roles;

      const [edLinkProfile, { expanseRoles, enrollmentRoles }] =
        await Promise.all([
          req.edLinkAccessToken
            ? this.edLinkService.getProfile(req.edLinkAccessToken)
            : Promise.resolve(null),
          this.authService.getRolesForExpansePerson(req.expansePerson.id),
        ]);

      if (edLinkProfile) {
        // todo uppercase first character of role
        req.roles = [
          ...req.roles,
          ...edLinkProfile.roles.map((role) => Role[role] || role),
        ];
        console.log('edLinkRoles:', edLinkProfile.roles);
      }

      if (expanseRoles) {
        // todo uppercase first character of role, also account for enrollment roles

        req.roles = [
          ...req.roles,
          ...expanseRoles.map(
            (expanseRole) => Role[expanseRole.role] || expanseRole.role,
          ),
          ...enrollmentRoles,
        ];
        console.log({ expanseRoles });
      }
    }
    console.log('Roles:', req.roles);
    next();
  }
}
