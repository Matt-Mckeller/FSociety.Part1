import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class AuthPayload {
  @Field(() => User)
  user!: User;

  // Note: Tokens are now set as httpOnly cookies, not returned in response
  // accessToken cookie: 15 min expiry
  // refreshToken cookie: 7 days expiry
  // csrf_token cookie: readable by client for CSRF protection
}

@ObjectType()
export class TokenPayload {
  @Field()
  sub!: string; // user id

  @Field()
  email!: string;

  @Field()
  role!: string;

  @Field()
  iat!: number;

  @Field()
  exp!: number;
}

export interface JwtPayloadData {
  sub: string;
  email: string;
  role: string;
}

export interface RefreshTokenPayload extends JwtPayloadData {
  tokenVersion: number; // For token invalidation
}
