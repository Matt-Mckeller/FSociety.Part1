import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@ObjectType()
export class DemoEventCompletionResponse {
  @Field()
  @IsBoolean()
  success: boolean;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  errorMessage?: string;
}
