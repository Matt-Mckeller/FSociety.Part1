import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsEmail, IsOptional, MinLength, IsEnum } from 'class-validator';
import { ReadingLevel } from '../../../common/enums';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email!: string;

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(8)
  password?: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  @IsOptional()
  avatarUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  preferredLanguage?: string;

  @Field(() => ReadingLevel, { nullable: true })
  @IsOptional()
  @IsEnum(ReadingLevel)
  readingLevel?: ReadingLevel;
}

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  avatarUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  preferredLanguage?: string;

  @Field(() => ReadingLevel, { nullable: true })
  @IsOptional()
  @IsEnum(ReadingLevel)
  readingLevel?: ReadingLevel;
}
