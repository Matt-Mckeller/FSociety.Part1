import { RewardInterface } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { Reward } from '../entities';

@ObjectType()
export class StoreRewardDto implements RewardInterface {
  @Field()
  id: string;

  @Field((type) => String)
  category: string;

  @Field((type) => String)
  variant: string | { type: string; value: string };

  @Field((type) => String, { nullable: true })
  description?: string;

  @Field((type) => String, { nullable: true })
  name?: string;

  @Field((type) => Number, { nullable: true })
  cost?: number;

  @Field((type) => Boolean, { nullable: false })
  limitMaxPurchase: boolean;

  @Field((type) => Number, { nullable: true })
  maxPurchaseQuantity: number;

  static fromReward(reward: Reward): StoreRewardDto {
    const rewardDto = new StoreRewardDto();
    rewardDto.category = reward.category;
    rewardDto.variant = reward.variant;
    rewardDto.description = reward.description;
    rewardDto.name = reward.name;
    rewardDto.cost = reward.cost;
    rewardDto.limitMaxPurchase = reward.limitMaxPurchase;
    rewardDto.maxPurchaseQuantity = reward.maxPurchaseQuantity;
    rewardDto.id = reward.id;

    return rewardDto;
  }
}
