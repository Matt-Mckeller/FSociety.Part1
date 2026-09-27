import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { RewardDto } from '../dto/reward.model';
import { NewRewardInput } from '../dto/new-reward.input';
import { DeleteStoreRewardOptionInput } from '../dto/delete-reward.input';
import { BuyStoreRewardInput } from '../dto/buy-store-reward.input';
import { RewardService } from '../services/reward.service';
import { Context } from '@nestjs/graphql';
import { Request } from 'express';
import { EdLinkService } from '../services/edLink.service';
import { ClassroomStoreDto } from '../dto/store.model';
import { Class as EdLinkClass } from '@edlink/typescript';
import { Coin, Reward, RewardToOwner } from '../entities';
import { WalletService } from '../services/wallet.service';
import { RedeemEventRewardsDto } from '../dto/reward-response.dto';
import { ExperienceService } from '../services/experienceService';

// @Resolver((of) => RewardDto)
@Resolver()
export class RewardResolver {
  constructor(
    private readonly rewardService: RewardService,
    private edLinkService: EdLinkService,
    private walletService: WalletService,
    private experienceService: ExperienceService,
  ) {}

  // @Query((returns) => [CreatedRewardDto])
  // async rewards(): Promise<CreatedRewardDto[]> {
  //   return (await this.rewardService.findAll()).map(
  //     CreatedRewardDto.fromReward,
  //   );
  // }

  // Returns rewards that the current user created
  @Query((returns) => [RewardDto])
  async myCreatedRewards(
    @Context('req') req: Request | any,
  ): Promise<RewardDto[]> {
    const expansePerson = req.expansePerson;
    if (!expansePerson || !expansePerson.id) {
      throw new Error('Unable to find current user');
    }

    const rewards = await this.rewardService.findCreatedRewards(
      expansePerson.id,
    );
    return rewards.map(RewardDto.fromReward);
  }

  @Query((returns) => [RewardDto])
  async myOwnedRewards(
    @Context('req') req: Request | any,
  ): Promise<RewardDto[]> {
    const expansePerson = req.expansePerson;
    if (!expansePerson || !expansePerson.id) {
      throw new Error('Unable to find current user');
    }

    const { rewards, rewardToOwner } =
      await this.rewardService.findOwnedRewards(expansePerson.id);

    // convert rewards to rewardDtos and include quantity from rewardToOwner
    const rewardResponse: RewardDto[] = [];
    rewards.forEach((reward) => {
      const rewardToOwnerForReward = rewardToOwner.filter(
        (rto) => rto.reward.id === reward.id,
      );

      const rewardQuantity = rewardToOwnerForReward.length;
      const rewardDto = RewardDto.fromReward(reward, rewardQuantity);

      rewardResponse.push(rewardDto);
    });

    return rewardResponse;
  }

  /**
   * returns a list of all classes and associated rewards if they have any
   * probably will rename it again, still not clear enough for what it does, but is working
   */
  @Query((returns) => [ClassroomStoreDto])
  async myClassroomStoreRewards(
    @Context('req') req: Request | any,
  ): Promise<ClassroomStoreDto[]> {
    // get all classrooms
    const edLinkToken = req.edLinkAccessToken;
    const expansePerson = req.expansePerson;
    if (
      !edLinkToken ||
      !expansePerson ||
      !expansePerson.id ||
      !expansePerson.edLinkID
    ) {
      throw new Error('Missing authentication credentials');
    }
    const classes = await this.edLinkService.getStudentClasses(
      edLinkToken,
      expansePerson.edLinkID,
    );
    if (!classes || !classes.length) {
      throw new Error('No classes found');
    }

    const classesWithRewards =
      await this.rewardService.getClassroomStoreRewards(classes);

    // This just checks if there are at least some classes still in the list
    // If there are no rewards for any of the classes the frontend can handle that
    if (!classesWithRewards || classesWithRewards.length === 0) {
      throw new Error('Unable to find classes with rewards');
    }

    const response: ClassroomStoreDto[] = classes.map(
      (edLinkClass: EdLinkClass) => {
        const expanseClass = classesWithRewards.find(
          (c) => c.edLinkID === edLinkClass.id,
        );
        return ClassroomStoreDto.fromClass(edLinkClass, expanseClass);
      },
    );

    // todo: determine if the reward is purchasable by the student ( max purchases, etc )
    return response;
  }

  @Mutation((returns) => [RewardDto])
  async createReward(
    @Args('reward') rewardInput: NewRewardInput,
    @Context('req') req: Request | any,
  ): Promise<RewardDto[]> {
    const person = req?.expansePerson;
    if (!person || !person.id || !req.edLinkAccessToken) {
      throw new Error('Unable to find current user');
    }
    const edLinkAccessToken = req.edLinkAccessToken;

    // Verify the class exists in edlink and that this teacher teaches it
    const validated =
      await this.edLinkService.validateClassesAreTaughtByTeacher(
        edLinkAccessToken,
        rewardInput.elClassIds,
        person.edLinkID,
      );

    if (!validated) {
      throw new Error(
        'Validation error, unable to determine if all classes were taught by user',
      );
    }
    const createdRewards: Reward[] =
      await this.rewardService.saveStoreClassroomReward(rewardInput, person);
    const rewardDtos: RewardDto[] = createdRewards.map((createdReward) =>
      RewardDto.fromReward(createdReward),
    );
    return rewardDtos;
  }

  @Mutation((returns) => Boolean)
  async buyStoreReward(
    @Args('reward') rewardInput: BuyStoreRewardInput,
    @Context('req') req: Request | any,
  ): Promise<boolean> {
    if (!req.edLinkAccessToken || !req.expansePerson?.id) {
      throw new Error('Missing authentication credentials');
    }

    // where should this logic take place? is a controlelr good enough? probably
    // i dont want my services all depending on each other

    const wallet = this.walletService.getWallet(req.expansePerson.id);
    if (!wallet) {
      throw new Error('Wallet not found');
    }
    // const reward = await this.rewardService.findOne(reward.id);

    // determine reward coin type
    // determine if theres enough currency to purchase
    // initiate purchase
    // add item to inventory
    // throw errors if any of the above fail

    const rewardToOwner: RewardToOwner[] = await this.rewardService.buyReward(
      req.expansePerson,
      rewardInput.id,
      rewardInput.quantity,
    );
    if (rewardToOwner.length && rewardToOwner[0].id) {
      return true;
    } else {
      throw new Error('Reward does not exist');
    }
  }

  @Mutation((returns) => Boolean)
  async deleteStoreRewardOption(
    @Args('deleteStoreRewardOptionInput')
    deleteStoreRewardOptionInput: DeleteStoreRewardOptionInput,
  ): Promise<boolean> {
    try {
      await this.rewardService.delete(deleteStoreRewardOptionInput.id);
    } catch (e) {
      return false;
    }
    return true;
  }

  @Mutation(() => RedeemEventRewardsDto)
  async redeemEventRewards(
    @Args('rewardableEventIds', { type: () => [String] })
    rewardableEventIds: string[],
    @Context('req') req: Request | any,
  ): Promise<RedeemEventRewardsDto> {
    const expansePerson = req.expansePerson;
    if (!expansePerson || !expansePerson.id) {
      throw new Error('Unable to find current user');
    }
    // todo prevent multiple simultaneous updates
    await this.rewardService.validateRewardableEventsOwnership(
      rewardableEventIds,
      expansePerson.id,
    );

    if (!rewardableEventIds || !rewardableEventIds.length) {
      throw new Error('No rewardable events provided');
    }

    let experienceIncrease = 0;
    const indexedCoins: (Coin & { addedCoins: number })[] = [];
    let userLevelAfterAllUpdates;

    for (const rewardableEventId of rewardableEventIds) {
      const experienceReward =
        this.experienceService.calculateExperienceReward(rewardableEventId);
      experienceIncrease += experienceReward;

      const { coins } =
        await this.walletService.calculateRewardCoins(rewardableEventId);

      const { userLevel, totalExperience } =
        await this.rewardService.updateExperienceAndAddCoins(
          experienceReward,
          coins,
          expansePerson.id,
          rewardableEventId,
          'RedeemEventRewards',
        );
      coins.forEach((coin) => {
        if (indexedCoins[coin.id]) {
          indexedCoins[coin.id].addedCoins += coin.addedCoins;
        } else {
          indexedCoins[coin.id] = [];
          indexedCoins[coin.id].push(coin);
        }
      });
      userLevelAfterAllUpdates = userLevel;
    }

    return {
      experienceIncrease,
      userLevel: userLevelAfterAllUpdates,
      rewardedCoins: indexedCoins,
    };
  }
}
