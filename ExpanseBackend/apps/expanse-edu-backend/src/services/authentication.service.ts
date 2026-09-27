import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { AuthTokens, Enrollment, ExpansePerson } from '../entities';
import * as crypto from 'crypto';
import { ExpanseRole } from '../entities/ExpanseRole';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(ExpansePerson, 'main')
    private personRepository: Repository<ExpansePerson>,
    @InjectDataSource('main')
    private mainDataSource: DataSource,
  ) {}

  async refreshTokenForUser(userId: string) {
    // to be continued
    // const entityManager = this.mainDataSource.manager;
    // const person = await entityManager.findOne(Person, {
    //   where: { id: userId },
    //   relations: { authTokens: true },
    // });
    // console.log('refresh tokens for user', { person });
    // const refreshToken = person?.edLinkAuthTokens?.refreshToken;
    // if (!refreshToken) {
    //   throw new Error('No refresh token found');
    // }
  }

  async saveTokensForUser(
    edLinkUserId: string,
    edLinkAccessToken: string,
    refreshToken: string,
  ) {
    const entityManager = this.mainDataSource.manager;
    const expansePerson = await entityManager.findOne(ExpansePerson, {
      where: { edLinkID: edLinkUserId },
    });

    if (!expansePerson) {
      throw new NotFoundException(
        'Expanse Person not found, person must first be synced before logging in.',
      );
    }

    const existingAuthTokens = await entityManager.findOne(AuthTokens, {
      where: { expansePerson: { id: expansePerson.id } },
    });

    const authTokens = existingAuthTokens?.id
      ? existingAuthTokens
      : new AuthTokens();

    const generateRandomString = (length: number) => {
      return crypto.randomBytes(length).toString('hex').slice(0, length);
    };

    const expanseAccessToken = generateRandomString(64);

    authTokens.edLinkAccessToken = edLinkAccessToken;
    authTokens.edLinkRefreshToken = refreshToken;
    authTokens.expanseAccessToken = expanseAccessToken;
    authTokens.expansePerson = expansePerson;
    await entityManager.save(AuthTokens, authTokens);
    return authTokens;
  }

  async getAuthTokensAndPerson(expanseAccessToken: string) {
    // retrieve from db, based on expanse access token or something
    const manager = this.mainDataSource.manager;
    const authTokens = await manager.findOne(AuthTokens, {
      where: { expanseAccessToken },
      relations: ['expansePerson'],
    });
    if (!authTokens) {
      throw new NotFoundException('Auth tokens not found');
    }
    if (!authTokens.expansePerson) {
      throw new NotFoundException('Person not found');
    }
    return { authTokens: authTokens, expansePerson: authTokens?.expansePerson };
  }

  /*
    Returns expanse roles and enrollment roles for a given expanse person
  */
  async getRolesForExpansePerson(
    expansePersonId: string,
  ): Promise<{ expanseRoles: ExpanseRole[]; enrollmentRoles: string[] }> {
    const manager = this.mainDataSource.manager;
    const [expanseRoles, enrollmentRoles] = await Promise.all([
      manager.find(ExpanseRole, {
        where: { expansePerson: { id: expansePersonId } },
      }),
      manager
        .createQueryBuilder(Enrollment, 'enrollment')
        .select('DISTINCT enrollment.role', 'role')
        .where('enrollment.expansePersonId = :expansePersonId', {
          expansePersonId,
        })
        .andWhere(
          'CURRENT_TIMESTAMP BETWEEN enrollment.startDate AND enrollment.endDate',
        )
        .getRawMany(),
    ]);

    if (!expanseRoles || expanseRoles.length === 0) {
      throw new NotFoundException('No roles found for expanse person.');
    }

    return {
      expanseRoles,
      enrollmentRoles: enrollmentRoles.map((roleObj) => roleObj.role),
    };
  }

  async getEdLinkAccessTokenFromRedirectToken(edLinkRedirectToken: string) {
    // codes to .env
    // redirect uri to .env
    const request = {
      method: 'post',
      body: JSON.stringify({
        code: edLinkRedirectToken,
        client_id: 'd86f22ff-8853-4ceb-ac1d-7b6f6a096c5d',
        client_secret:
          'uuYBIbvzTcCMenvQtBpg1fTVGCzDg1dGXfDI9eZn8VSKycOTNAcuK2GAyQ0HvUPn',
        redirect_uri: 'https://localhost:3007/ssoLogin',
        grant_type: 'authorization_code',
      }),
      headers: {
        'content-type': 'application/json',
      },
    };

    const response = await fetch(
      'https://ed.link/api/authentication/token',
      request,
    );
    const { $data } = await response.json();
    const edLinkAccessToken = $data?.access_token;
    const edLinkRefreshToken = $data?.access_token;
    return { edLinkAccessToken, edLinkRefreshToken };
  }

  // todo jwt token & auth token to use
}
