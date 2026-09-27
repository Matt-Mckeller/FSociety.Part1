import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class NewAnalyticsEventInput {
  @Field((type) => String)
  @MaxLength(255)
  name: string;
}
