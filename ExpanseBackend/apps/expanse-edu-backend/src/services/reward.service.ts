import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, In, Repository } from 'typeorm';
import { Reward } from '../entities/Reward.entity';
import { NewRewardInput } from '../dto/new-reward.input';
import {
  Assignment,
  Class,
  Coin,
  CoinEvent,
  Enrollment,
  Experience,
  ExperienceEvent,
  ExpansePerson,
  ExpansePersonToCoin,
  School,
  Submission,
} from '../entities';
import {
  Assignment as EdLinkAssignment,
  Class as EdLinkClass,
  School as EdLinkSchool,
  Submission as EdLinkSubmission,
  SubmissionState,
} from '@edlink/typescript';
import { EdLinkService } from './edLink.service';
import { RewardToOwner } from '../entities/RewardToOwner';
import { RewardableEvent } from '../entities/RewardableEvent.entity';
import { MOCK_REWARDABLE_EVENTS } from '../mockData/mockData';
import { getUserLevelFromExperience } from '../config/levelConfig';

@Injectable()
export class RewardService {
  private entityManager: EntityManager;
  constructor(
    @InjectRepository(Reward, 'main')
    private rewardRepository: Repository<Reward>,
    private edLinkService: EdLinkService,
    @InjectDataSource('main')
    private mainDataSource: DataSource,
  ) {
    this.entityManager = this.mainDataSource.manager;
  }

  async findAll(): Promise<Reward[]> {
    return this.rewardRepository.find();
  }

  // async getExpanseSubmissionsWithRewardEvents(
  //   elAssignmentIds: string[],
  //   studentEdLinkId: string,
  // ): Promise<Submission[]> {
  //   const manager = this.mainDataSource.manager;
  //   const submissions = await manager.find(Submission, {
  //     where: {
  //       assignment: { id: In(elAssignmentIds) },
  //       student: { edLinkID: studentEdLinkId },
  //     },
  //     relations: ['assignment', 'rewardableEvent'],
  //   });
  //   return submissions;
  // }

  async getStudentRewardableEventsForAssignments(
    elAssignmentIds: string[],
    personEdLinkId: string,
  ): Promise<RewardableEvent[]> {
    const mockResponse: RewardableEvent[] = [];
    const mockItemCount = MOCK_REWARDABLE_EVENTS.length;
    let currentItemIndex = 0;
    elAssignmentIds.forEach((mapId) => {
      if (currentItemIndex <= mockItemCount) {
        const newItemIndex = currentItemIndex + 1;
        const rewardableEvent = MOCK_REWARDABLE_EVENTS[currentItemIndex];
        rewardableEvent.assignment.id = mapId;
        mockResponse.push(rewardableEvent);
        currentItemIndex = newItemIndex;
      }
    });
    return mockResponse;

    const manager = this.mainDataSource.manager;
    const rewardableEvents = await manager.find(RewardableEvent, {
      where: {
        assignment: { id: In(elAssignmentIds) },
        student: { edLinkID: personEdLinkId },
      },
      relations: [],
    });
    return rewardableEvents;
    // const mappedRewardableEvents: {
    //   [elAssignmentId: string]: RewardableEvent;
    // } = {};
    // for (const rewardableEvent of rewardableEvents) {
    //   mappedRewardableEvents[rewardableEvent.assignment.id] = rewardableEvent;
    // }
    // return mappedRewardableEvents;
  }

  async getClassroomStoreRewards(classes: EdLinkClass[]): Promise<Class[]> {
    const classIds = classes.map((cls) => cls.id);

    const manager = this.mainDataSource.manager;
    const classesWithRewards = await manager.getRepository(Class).find({
      where: { edLinkID: In(classIds) },
      relations: ['storeRewards'],
    });
    return classesWithRewards;
  }

  async findOne(id: string): Promise<Reward> {
    return this.rewardRepository.findOne({ where: { id } });
  }

  async findCreatedRewards(expansePersonId: string): Promise<Reward[]> {
    return await this.rewardRepository.find({
      where: { creator: { id: expansePersonId } },
      relations: ['sharedIdentity', 'classStore', 'coin'],
    });
  }

  async validateRewardableEventsOwnership(
    rewardableEventIds: string[],
    expansePersonId: string,
  ): Promise<boolean> {
    const rewardableEvents = await this.mainDataSource.manager.find(
      RewardableEvent,
      {
        where: {
          id: In(rewardableEventIds),
        },
        relations: ['student'],
      },
    );

    if (rewardableEvents.length !== rewardableEventIds.length) {
      return false;
    }

    return rewardableEvents.every(
      (event) => event.student && event.student.id === expansePersonId,
    );
  }

  async findOwnedRewards(
    expansePersonId: string,
  ): Promise<{ rewardToOwner: RewardToOwner[]; rewards: Reward[] }> {
    // Have to query for rewardToOwner in order to get the count of rewards
    // If querying for rewards you may just get one but have multiple instances of rewardToOwner
    // Alternatively populate rewardToOwner but that may be multiple users

    const rewardToOwner = await this.mainDataSource.manager.find(
      RewardToOwner,
      {
        where: { owner: { id: expansePersonId } },
        relations: ['reward'],
      },
    );
    const rewards = await this.rewardRepository.find({
      where: { owners: { owner: { id: expansePersonId } } },
      relations: ['classStore', 'coin'],
    });

    return { rewardToOwner, rewards };
  }

  async buyReward(
    expansePerson: ExpansePerson,
    rewardId: string,
    quantity: number,
  ): Promise<RewardToOwner[]> {
    // todo, make sure relationships saved properly, also
    // Validation to ensure that the reward max purchase amount is not exceeded
    // that the student is in the right class to buy a reward, or is buying a reward from the right family etc
    //    ( perhaps having the coin for the classroom is enough validation there? )
    //    but family/expanse purchases may need to be validated
    // should be done beforehand, this function deals with the transactional aspect of the purchase
    // and the actual assignment of the reward
    // or should this be done here as well to ensure its handled properly?
    // could return to this aspect, first make sure its working

    // Determine necessary coin
    // Get persons wallet
    // Transactionally remove currency from wallet, add event
    // Validate that the reward max purchase amount is not exceeded
    // Add the item to the persons iventory / associate the reward with the person
    //   as a rewardToOwner
    // Food for thought: should coin events be one per quantity or quantity grouped, probably fine for now grouped

    // probably all within this function in order to keep it in a transaction
    // it does feel like the logic may be reused in other places but the transactional aspect is important
    // so i could either pass around the entity manager or just keep it in this function
    // i think i will keep it in this function for now
    // does seem like a lot to keep in one function but idk, tbd, guess its okay?
    // depends on if the other functions are needed later too i suppose

    let response: RewardToOwner[] = [];
    await this.mainDataSource.manager.transaction(async (entityManager) => {
      const personFromTransaction = await entityManager.findOne(ExpansePerson, {
        where: { id: expansePerson.id },
        relations: ['expansePersonToCoins', 'expansePersonToCoins.coin'],
      });

      const reward = await entityManager.findOne(Reward, {
        where: { id: rewardId },
        relations: ['coin'],
      });

      const requiredCoin = reward.coin;
      const cost = parseInt(reward.cost.toString(), 10);
      const purchaseAmountRequired = cost * quantity;

      const expansePersonToCoinRequiredCoin =
        personFromTransaction.expansePersonToCoins.find(
          (expansePersonToCoin) =>
            expansePersonToCoin.coin.id === requiredCoin.id,
        );

      if (!expansePersonToCoinRequiredCoin) {
        throw new Error('Person does not own the required coin');
      }

      if (
        !expansePersonToCoinRequiredCoin.quantity ||
        expansePersonToCoinRequiredCoin.quantity < purchaseAmountRequired
      ) {
        throw new Error(
          'Person does not have enough currency to purchase reward',
        );
      }

      expansePersonToCoinRequiredCoin.quantity -= purchaseAmountRequired;
      await entityManager.save(expansePersonToCoinRequiredCoin);

      const rewardsToOwner = [];
      for (let i = 0; i < quantity; i++) {
        const rewardToOwner = new RewardToOwner();
        rewardToOwner.reward = reward;
        rewardToOwner.owner = expansePerson;
        rewardToOwner.coin = requiredCoin;
        await entityManager.save(RewardToOwner, rewardToOwner);
        rewardsToOwner.push(rewardToOwner);
      }

      let coinEvent = new CoinEvent();
      coinEvent.changeAmount = purchaseAmountRequired;
      coinEvent.newValue = expansePersonToCoinRequiredCoin.quantity;
      coinEvent.eventType = 'purchase';
      coinEvent.expansePersonToCoin = expansePersonToCoinRequiredCoin;
      coinEvent.rewardToOwner = [...rewardsToOwner];
      coinEvent = await entityManager.save(CoinEvent, coinEvent);

      response = rewardsToOwner;
    });

    return response;
  }

  async saveStoreClassroomReward(
    rewardInput: NewRewardInput,
    expansePerson: ExpansePerson,
  ): Promise<Reward[]> {
    // Input should be verified as a teacher's class before coming to this function
    const response: Reward[] = [];

    await this.mainDataSource.manager.transaction(async (entityManager) => {
      const rewardEntities = NewRewardInput.toEntities(rewardInput);
      const savedRewardEntities: Reward[] = [];

      for await (const reward of rewardEntities) {
        const existingClass = await this.rewardRepository.manager.findOne(
          Class,
          {
            where: { edLinkID: reward.classStore.edLinkID },
            relations: ['coin'],
          },
        );

        if (!existingClass) {
          throw new Error(
            'Can not save a reward for a class that has not yet been synced to Expanse',
          );
        }

        reward.classStore = existingClass;
        reward.coin = existingClass.coin;
        reward.creator = expansePerson;
        const savedEntity = await entityManager.save(reward);
        savedRewardEntities.push(savedEntity);
      }
      for await (const reward of savedRewardEntities) {
        reward.sharedIdentity = [...savedRewardEntities].filter(
          (sharedReward) => sharedReward.id !== reward.id,
        );
        response.push(await entityManager.save(reward));
      }
    });

    return response;
  }

  private calculateRewardableEventStatusForSubmission(submission: Submission) {
    return submission.state === SubmissionState.Returned
      ? 'CLAIMABLE'
      : 'NOT_READY';
  }

  async createRewardEventForSubmission(
    expanseSubmission: Submission,
    student: ExpansePerson,
    assignment: Assignment,
    cls: Class,
    school: School,
    teachers: ExpansePerson[],
  ) {
    // todo will eventually need to handle a submission being submit then returned then submit again
    // note: may not always want to have this here, may at some point have multiple reward events per submission?
    // i.e. updates
    const existingRewardEvent = await this.mainDataSource.manager.findOne(
      RewardableEvent,
      {
        where: { submission: { id: expanseSubmission.id } },
      },
    );
    if (existingRewardEvent) {
      console.log('Rewardable event already exists for submission', {
        existingRewardEvent,
      });
      return existingRewardEvent;
    } else {
      console.log('Creating rewardable event for submission', {
        expanseSubmission,
      });
    }

    const eventType = 'assignment';
    const status =
      this.calculateRewardableEventStatusForSubmission(expanseSubmission);

    const rewardableEvent = new RewardableEvent();
    rewardableEvent.assignment = assignment;
    rewardableEvent.class = cls;
    rewardableEvent.school = school;
    rewardableEvent.student = student;
    rewardableEvent.teachers = teachers;
    rewardableEvent.eventType = eventType;
    rewardableEvent.status = status;
    rewardableEvent.submission = expanseSubmission;
    return await this.mainDataSource.manager.save(rewardableEvent);
  }

  async updateRewardableEventForSubmission(
    expanseSubmission: Submission,
    assignment: Assignment,
    student: ExpansePerson,
  ) {
    const existingRewardEvent = await this.mainDataSource.manager.findOne(
      RewardableEvent,
      {
        where: { submission: { id: expanseSubmission.id } },
      },
    );
    if (!existingRewardEvent) {
      const cls = await this.mainDataSource.manager.findOne(Class, {
        where: {
          assignments: { id: assignment.id },
        },
        relations: ['school'],
      });
      const teachers = await this.mainDataSource.manager.find(ExpansePerson, {
        where: { enrollments: { role: 'teacher', class: { id: cls.id } } },
      });
      console.log('creating new reward event for submission', {
        cls,
        teachers,
      });
      if (
        !cls ||
        !cls.school ||
        !(Array.isArray(teachers) && teachers.length > 0)
      ) {
        throw new Error(
          'Class, school, or teachers not found for assignment with expanse id ' +
            assignment.id,
        );
      }
      return await this.createRewardEventForSubmission(
        expanseSubmission,
        student,
        assignment,
        cls,
        cls.school,
        teachers,
      );
    }

    // check for needed updates of submission vs new submission status
    const statusTheRewardableEventShouldBe =
      this.calculateRewardableEventStatusForSubmission(expanseSubmission);
    const statusTheRewardableEventIs = existingRewardEvent.status;
    if (statusTheRewardableEventShouldBe !== statusTheRewardableEventIs) {
      existingRewardEvent.status = statusTheRewardableEventShouldBe;
      return await this.mainDataSource.manager.save(existingRewardEvent);
    }
    return existingRewardEvent;
  }

  async updateExperienceAndAddCoins(
    experienceAmount: number,
    coins: (Coin & { addedCoins: number })[],
    expansePersonId: string,
    rewardableEventId: string,
    eventType: string,
  ): Promise<{
    totalExperience: number;
    levelChange: number;
    userLevel: number;
  }> {
    return await this.entityManager.transaction(
      async (transactionalEntityManager) => {
        // Fetch the rewardable event from the rewardable event id
        const rewardableEvent = await transactionalEntityManager.findOne(
          RewardableEvent,
          {
            where: { id: rewardableEventId },
            relations: [
              'experienceEvents',
              'experienceEvents.experience',
              'experienceEvents.experience.expansePerson',
            ],
          },
        );

        if (!rewardableEvent) {
          throw new Error(
            `RewardableEvent with ID ${rewardableEventId} not found`,
          );
        }

        // Ensure the rewardable event does not already have experience events associated with the person's experience
        const hasExpansePersonExperienceEvent =
          rewardableEvent.experienceEvents?.some(
            (event) => event.experience?.expansePerson.id === expansePersonId,
          );

        if (hasExpansePersonExperienceEvent) {
          throw new Error(
            `RewardableEvent with ID ${rewardableEventId} already has experience events associated with the person`,
          );
        }

        // Fetch the current experience for the person
        const experienceRecord = await transactionalEntityManager.findOne(
          Experience,
          {
            where: { expansePerson: { id: expansePersonId } },
          },
        );

        console.log({ experienceRecord });
        if (!experienceRecord) {
          throw new Error('Experience record not found for the person');
        }

        // Calculate new total experience
        const previousExperience = experienceRecord.totalExperience || 0;
        const newTotalExperience = previousExperience + experienceAmount;

        // Determine the user's new level
        const previousLevel = getUserLevelFromExperience(previousExperience);
        const userLevel = getUserLevelFromExperience(newTotalExperience);

        // Update the experience record
        experienceRecord.totalExperience = newTotalExperience;
        experienceRecord.level = userLevel;
        await transactionalEntityManager.save(Experience, experienceRecord);

        // Create a new experience history event
        const experienceHistoryEvent = transactionalEntityManager.create(
          ExperienceEvent,
          {
            experienceChange: experienceAmount,
            eventType,
            newValue: newTotalExperience,
            person: experienceRecord.expansePerson,
            experience: experienceRecord,
          },
        );

        // Save the experience history event
        const savedExperienceHistoryEvent =
          await transactionalEntityManager.save(experienceHistoryEvent);

        // Associate the experience history event with the experience
        await transactionalEntityManager
          .createQueryBuilder()
          .relation(Experience, 'experienceEvents')
          .of(experienceRecord)
          .add(savedExperienceHistoryEvent);

        // Calculate level change
        const levelChange = userLevel - previousLevel;

        // Handle coin additions
        for (const { id, addedCoins } of coins) {
          const expansePersonToCoin = await transactionalEntityManager.findOne(
            ExpansePersonToCoin,
            {
              where: { expansePerson: { id: expansePersonId }, coin: { id } },
            },
          );

          if (!expansePersonToCoin) {
            throw new Error(
              'Add coins can not be used to initialize a new coin to person relationship',
            );
          }

          expansePersonToCoin.quantity += addedCoins;
          await transactionalEntityManager.save(expansePersonToCoin);

          const coinEvent = new CoinEvent();
          coinEvent.changeAmount = addedCoins;
          coinEvent.eventType = eventType;
          coinEvent.expansePersonToCoin = expansePersonToCoin;
          coinEvent.newValue = expansePersonToCoin.quantity;
          await transactionalEntityManager.save(coinEvent);
        }

        return {
          totalExperience: newTotalExperience,
          levelChange,
          userLevel,
        };
      },
    );
  }

  async update(id: string, reward: Reward): Promise<Reward> {
    await this.rewardRepository.update(id, reward);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.rewardRepository.delete(id);
  }
}
