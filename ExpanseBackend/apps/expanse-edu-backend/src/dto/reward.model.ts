import { RewardInterface } from '@app/shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { Reward, Submission } from '../entities';
import { RewardableEvent } from '../entities/RewardableEvent.entity';

@ObjectType()
export class RewardDto {
  @Field()
  id: string;

  @Field((type) => Number, { nullable: true })
  quantity?: number;

  @Field((type) => String)
  category: string;

  @Field((type) => String)
  variant: string | { type: string; value: string };

  @Field((type) => String, { nullable: true })
  description?: string;

  @Field((type) => String, { nullable: true })
  name?: string;

  @Field((type) => String, { nullable: true })
  creatorId?: string;

  @Field((type) => String, { nullable: true })
  coinId?: string;

  @Field((type) => String, { nullable: true })
  classStoreId?: string;

  @Field((type) => String, { nullable: true })
  createdAt?: string;

  @Field((type) => String, { nullable: true })
  updatedAt?: string;

  @Field((type) => Number, { nullable: true })
  cost?: number;

  @Field((type) => Boolean, { nullable: false })
  limitMaxPurchase: boolean;

  @Field((type) => Number, { nullable: true })
  maxPurchaseQuantity: number;

  @Field((type) => [String], { nullable: true })
  sharedIdentityIds?: string[];

  static fromReward(reward: Reward, quantity?: number): RewardDto {
    const rewardDto = new RewardDto();
    rewardDto.category = reward.category;
    rewardDto.variant = reward.variant;
    rewardDto.description = reward.description;
    rewardDto.name = reward.name;
    rewardDto.cost = reward.cost;
    rewardDto.limitMaxPurchase = reward.limitMaxPurchase;
    rewardDto.maxPurchaseQuantity = reward.maxPurchaseQuantity;
    rewardDto.id = reward.id;
    rewardDto.creatorId = reward?.creator?.id;
    rewardDto.coinId = reward?.coin?.id;
    rewardDto.createdAt = reward.createdAt?.toISOString();
    rewardDto.updatedAt = reward.updatedAt?.toISOString();
    rewardDto.classStoreId = reward?.classStore?.id;
    rewardDto.quantity = quantity ? quantity : undefined;
    rewardDto.sharedIdentityIds = reward?.sharedIdentity?.map(
      (sharedIdentity) => sharedIdentity.id,
    );

    return rewardDto;
  }
}

@ObjectType()
export class RewardableEventDto {
  @Field()
  id: string;

  @Field((type) => String, { nullable: true })
  status?: string;

  @Field((type) => String, { nullable: true })
  submissionElId?: string;

  @Field((type) => String, { nullable: true })
  studentElId?: string;

  @Field((type) => String, { nullable: true })
  elAssignmentId?: string;

  @Field((type) => String, { nullable: true })
  assignmentId?: string;

  // comes from submission, idk if its relevant to return value but is relevant to calculations probably
  // @Field((type) => Number, { nullable: true })
  // grade_points?: number;

  // @Field((type) => String, { nullable: true })
  // grade?: string;

  static fromEntity(
    rewardEvent: RewardableEvent,
    elAssignmentId?: string,
    expanseAssignmentId?: string,
  ): RewardableEventDto {
    const rewardEventDto = new RewardableEventDto();
    rewardEventDto.id = rewardEvent.id;
    rewardEventDto.status = rewardEvent.status;
    rewardEventDto.submissionElId = rewardEvent.submission?.edLinkID;
    rewardEventDto.studentElId = rewardEvent.student?.edLinkID;
    rewardEventDto.elAssignmentId = elAssignmentId;
    rewardEventDto.assignmentId = expanseAssignmentId;

    return rewardEventDto;
  }
}
