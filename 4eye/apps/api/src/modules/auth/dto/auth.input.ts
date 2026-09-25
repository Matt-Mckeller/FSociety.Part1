import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, MinLength, MaxLength, IsOptional, IsEnum, IsString, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { OAuthProvider } from '../../../common/enums';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email!: string;

  @Field()
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password!: string;
}

@InputType()
export class SignupInput {
  @Field()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email!: string;

  @Field()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0, // Optional: set to 1 for stricter policy
    },
    { message: 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number' },
  )
  @MaxLength(128)
  password!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  name!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  preferredLanguage?: string;
}

@InputType()
export class OAuthLoginInput {
  @Field(() => OAuthProvider)
  @IsEnum(OAuthProvider)
  provider!: OAuthProvider;

  @Field()
  @IsString()
  @IsNotEmpty()
  idToken!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  nonce?: string;
}

@InputType()
export class RefreshTokenInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  refreshToken!: string;
}

@InputType()
export class ForgotPasswordInput {
  @Field()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email!: string;
}

@InputType()
export class ResetPasswordInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  token!: string;

  @Field()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    },
    { message: 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number' },
  )
  @MaxLength(128)
  newPassword!: string;
}
