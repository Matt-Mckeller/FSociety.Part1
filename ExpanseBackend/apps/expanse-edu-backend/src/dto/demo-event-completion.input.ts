import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class DemoEventCompletionInput {
  @Field(() => String)
  @MaxLength(255)
  eventType: string;
}
