import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsOptional, IsEnum, IsUUID, IsDateString } from 'class-validator';
import { VerticalType } from '../../../common/enums';

@InputType()
export class CreateSessionInput {
  @Field()
  @IsUUID()
  roomId!: string;

  @Field({ nullable: true })
  @IsOptional()
  title?: string;

  @Field(() => VerticalType, { nullable: true })
  @IsOptional()
  @IsEnum(VerticalType)
  verticalType?: VerticalType;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  scheduledStartAt?: string;
}

@InputType()
export class UpdateSessionInput extends PartialType(CreateSessionInput) {
  @Field({ nullable: true })
  @IsOptional()
  title?: string;
}

@InputType()
export class JoinSessionInput {
  @Field()
  @IsUUID()
  sessionId!: string;

  @Field({ nullable: true })
  @IsOptional()
  guestName?: string;
}
