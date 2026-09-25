import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsOptional, IsBoolean, MinLength, IsUUID } from 'class-validator';

@InputType()
export class CreateRoomInput {
  @Field()
  @MinLength(2)
  name!: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isRecordingEnabled?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isChatEnabled?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  organizationId?: string;
}

@InputType()
export class UpdateRoomInput extends PartialType(CreateRoomInput) {
  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

@InputType()
export class JoinRoomInput {
  @Field()
  inviteCode!: string;

  @Field({ nullable: true })
  @IsOptional()
  guestName?: string;
}
