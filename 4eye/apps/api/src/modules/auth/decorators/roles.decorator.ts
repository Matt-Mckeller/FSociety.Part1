import { SetMetadata } from '@nestjs/common';
import { UserRole, OrgRole } from '../../../common/enums';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: (UserRole | OrgRole)[]) => SetMetadata(ROLES_KEY, roles);
