import { ExpansePerson } from 'apps/expanse-edu-backend/src/entities';
import { AuthTokens } from 'apps/expanse-edu-backend/src/entities';

declare global {
  namespace Express {
    interface Request {
      person?: ExpansePerson;
      authTokens?: AuthTokens;
      expanseAuthToken?: string;
    }
  }
}
