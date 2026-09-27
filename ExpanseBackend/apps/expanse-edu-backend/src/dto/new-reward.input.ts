import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';
import { Reward } from '../entities/Reward.entity';
import { ArrayNotEmpty, IsArray } from 'class-validator';
import { Class } from '../entities';

@InputType()
export class NewRewardInput {
  @Field((type) => String)
  @MaxLength(255)
  description: string;

  @Field((type) => String)
  @IsOptional()
  @Length(3, 50)
  name: string;

  @Field((type) => Number)
  cost: number;

  @Field((type) => Boolean)
  limitMaxPurchase: boolean;

  @Field((type) => Number, { nullable: true })
  maxPurchaseQuantity: number;

  @Field((type) => String)
  @IsOptional()
  @MaxLength(100)
  category: string;

  @Field((type) => String)
  @IsOptional()
  @MaxLength(100)
  variant: string;

  @Field((type) => [String])
  @IsArray()
  @ArrayNotEmpty()
  elClassIds: string[];

  static toEntities(newRewardInput: NewRewardInput): Reward[] {
    const rewards: Reward[] = [];
    newRewardInput.elClassIds.forEach((classId) => {
      const reward = new Reward();
      reward.category = newRewardInput.category;
      reward.variant = newRewardInput.variant;
      reward.description = newRewardInput.description;
      reward.name = newRewardInput.name;
      reward.cost = newRewardInput.cost;
      reward.classStore = new Class();
      reward.classStore.edLinkID = classId;
      rewards.push(reward);
    });

    return rewards;
  }
}
