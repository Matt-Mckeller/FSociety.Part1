import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class BuyStoreRewardInput {
  @Field((type) => String)
  @MaxLength(255)
  id: string;

  @Field((type) => Number)
  quantity: number;
}
