import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class RedeemEventRewardsDto {
  @Field(() => Int)
  experienceIncrease: number;

  @Field(() => Int)
  userLevel: number;

  @Field(() => [RewardedCoinDto])
  rewardedCoins: RewardedCoinDto[];
}

@ObjectType()
export class RewardedCoinDto {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  addedCoins: number;
}
