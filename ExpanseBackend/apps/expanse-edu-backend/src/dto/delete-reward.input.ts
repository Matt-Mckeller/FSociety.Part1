import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DeleteStoreRewardOptionInput {
  @Field()
  id: string;

  @Field((type) => Boolean, { nullable: true })
  deleteSet?: boolean;
}
