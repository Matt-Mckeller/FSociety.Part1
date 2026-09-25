import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsOptional, IsEnum, Matches, MinLength } from 'class-validator';
import { VerticalType, OrgRole } from '../../../common/enums';

@InputType()
export class CreateOrganizationInput {
  @Field()
  @MinLength(2)
  name!: string;

  @Field()
  @Matches(/^[a-z0-9-]+$/, { message: 'Slug must be lowercase alphanumeric with hyphens' })
  slug!: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  logoUrl?: string;

  @Field(() => VerticalType, { nullable: true })
  @IsOptional()
  @IsEnum(VerticalType)
  verticalType?: VerticalType;
}

@InputType()
export class UpdateOrganizationInput extends PartialType(CreateOrganizationInput) {}

@InputType()
export class InviteToOrganizationInput {
  @Field()
  email!: string;

  @Field(() => OrgRole, { nullable: true })
  @IsOptional()
  @IsEnum(OrgRole)
  role?: OrgRole;
}

@InputType()
export class UpdateMemberRoleInput {
  @Field()
  userId!: string;

  @Field(() => OrgRole)
  @IsEnum(OrgRole)
  role!: OrgRole;
}
